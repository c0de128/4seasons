import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, mkdir, access, readdir, stat, unlink } from 'fs/promises';
import { join, dirname } from 'path';
import { format } from 'date-fns';
import { logger } from '../logger';
import { redisService } from './redis';

const execAsync = promisify(exec);

interface BackupConfig {
  databaseUrl: string;
  backupPath: string;
  retentionDays: number;
  s3Bucket?: string;
  s3Region?: string;
  s3AccessKey?: string;
  s3SecretKey?: string;
}

interface BackupResult {
  success: boolean;
  filename: string;
  size?: number;
  duration?: number;
  error?: string;
}

class BackupService {
  private config: BackupConfig;
  private isBackupRunning = false;

  constructor() {
    this.config = {
      databaseUrl: process.env.DATABASE_URL || '',
      backupPath: process.env.BACKUP_PATH || './backups',
      retentionDays: parseInt(process.env.BACKUP_RETENTION_DAYS || '30'),
      s3Bucket: process.env.AWS_S3_BACKUP_BUCKET,
      s3Region: process.env.AWS_S3_REGION || 'us-east-1',
      s3AccessKey: process.env.AWS_ACCESS_KEY_ID,
      s3SecretKey: process.env.AWS_SECRET_ACCESS_KEY
    };

    this.ensureBackupDirectory();
  }

  /**
   * Ensure backup directory exists
   */
  private async ensureBackupDirectory(): Promise<void> {
    try {
      await access(this.config.backupPath);
    } catch {
      try {
        await mkdir(this.config.backupPath, { recursive: true });
        logger.info(`Backup directory created: ${this.config.backupPath}`);
      } catch (error) {
        logger.error('Failed to create backup directory', error);
      }
    }
  }

  /**
   * Check if backup service is configured
   */
  isConfigured(): boolean {
    return !!this.config.databaseUrl;
  }

  /**
   * Check if S3 backup is configured
   */
  isS3Configured(): boolean {
    return !!(this.config.s3Bucket && this.config.s3AccessKey && this.config.s3SecretKey);
  }

  /**
   * Create database backup
   */
  async createDatabaseBackup(): Promise<BackupResult> {
    if (!this.isConfigured()) {
      return {
        success: false,
        filename: '',
        error: 'Database URL not configured'
      };
    }

    if (this.isBackupRunning) {
      return {
        success: false,
        filename: '',
        error: 'Backup already in progress'
      };
    }

    this.isBackupRunning = true;
    const startTime = Date.now();

    try {
      const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
      const filename = `database_backup_${timestamp}.sql`;
      const filepath = join(this.config.backupPath, filename);

      // Ensure directory exists
      await mkdir(dirname(filepath), { recursive: true });

      // Create PostgreSQL dump
      logger.info('Starting database backup', { filename });

      const dumpCommand = `pg_dump "${this.config.databaseUrl}" --no-password --clean --if-exists --create`;
      
      const { stdout, stderr } = await execAsync(dumpCommand, {
        timeout: 30 * 60 * 1000, // 30 minutes timeout
        maxBuffer: 100 * 1024 * 1024 // 100MB buffer
      });

      if (stderr && !stderr.includes('NOTICE:')) {
        throw new Error(`pg_dump stderr: ${stderr}`);
      }

      // Write backup to file
      await writeFile(filepath, stdout, 'utf8');

      // Get file size
      const stats = await stat(filepath);
      const duration = Date.now() - startTime;

      logger.info('Database backup completed', {
        filename,
        size: `${(stats.size / 1024 / 1024).toFixed(2)}MB`,
        duration: `${duration}ms`
      });

      const result: BackupResult = {
        success: true,
        filename,
        size: stats.size,
        duration
      };

      // Upload to S3 if configured
      if (this.isS3Configured()) {
        try {
          await this.uploadToS3(filepath, filename);
          logger.info('Backup uploaded to S3', { filename });
        } catch (error) {
          logger.warn('Failed to upload backup to S3', { error, filename });
        }
      }

      return result;
    } catch (error) {
      logger.error('Database backup failed', error);
      return {
        success: false,
        filename: '',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    } finally {
      this.isBackupRunning = false;
    }
  }

  /**
   * Create Redis backup
   */
  async createRedisBackup(): Promise<BackupResult> {
    if (!redisService.isReady()) {
      return {
        success: false,
        filename: '',
        error: 'Redis not available'
      };
    }

    const startTime = Date.now();

    try {
      const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
      const filename = `redis_backup_${timestamp}.json`;
      const filepath = join(this.config.backupPath, filename);

      // Get all Redis keys and their data
      const client = redisService.getClient();
      if (!client) {
        throw new Error('Redis client not available');
      }

      logger.info('Starting Redis backup', { filename });

      // Get all keys
      const keys = await client.keys('*');
      const backupData: Record<string, any> = {};

      // Export each key with its type and data
      for (const key of keys) {
        try {
          const type = await client.type(key);
          
          switch (type) {
            case 'string':
              backupData[key] = {
                type: 'string',
                value: await client.get(key),
                ttl: await client.ttl(key)
              };
              break;
            
            case 'hash':
              backupData[key] = {
                type: 'hash',
                value: await client.hgetall(key),
                ttl: await client.ttl(key)
              };
              break;
              
            case 'list':
              backupData[key] = {
                type: 'list',
                value: await client.lrange(key, 0, -1),
                ttl: await client.ttl(key)
              };
              break;
              
            case 'set':
              backupData[key] = {
                type: 'set',
                value: await client.smembers(key),
                ttl: await client.ttl(key)
              };
              break;
              
            case 'zset':
              backupData[key] = {
                type: 'zset',
                value: await client.zrange(key, 0, -1, 'WITHSCORES'),
                ttl: await client.ttl(key)
              };
              break;
              
            default:
              logger.warn('Unsupported Redis key type', { key, type });
          }
        } catch (error) {
          logger.warn('Failed to backup Redis key', { key, error });
        }
      }

      const backupContent = JSON.stringify({
        timestamp: new Date().toISOString(),
        keyCount: keys.length,
        data: backupData
      }, null, 2);

      await writeFile(filepath, backupContent, 'utf8');

      const stats = await stat(filepath);
      const duration = Date.now() - startTime;

      logger.info('Redis backup completed', {
        filename,
        keyCount: keys.length,
        size: `${(stats.size / 1024).toFixed(2)}KB`,
        duration: `${duration}ms`
      });

      return {
        success: true,
        filename,
        size: stats.size,
        duration
      };
    } catch (error) {
      logger.error('Redis backup failed', error);
      return {
        success: false,
        filename: '',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Upload backup to S3
   */
  private async uploadToS3(filepath: string, filename: string): Promise<void> {
    if (!this.isS3Configured()) {
      throw new Error('S3 not configured');
    }

    // Use AWS CLI if available, otherwise skip S3 upload
    try {
      const s3Path = `s3://${this.config.s3Bucket}/backups/${filename}`;
      const awsCommand = `aws s3 cp "${filepath}" "${s3Path}" --region ${this.config.s3Region}`;
      
      // Set AWS credentials as environment variables for this command
      const env = {
        ...process.env,
        AWS_ACCESS_KEY_ID: this.config.s3AccessKey,
        AWS_SECRET_ACCESS_KEY: this.config.s3SecretKey,
        AWS_DEFAULT_REGION: this.config.s3Region
      };

      await execAsync(awsCommand, { env, timeout: 10 * 60 * 1000 }); // 10 minutes timeout
    } catch (error) {
      if (error instanceof Error && error.message.includes('aws: command not found')) {
        throw new Error('AWS CLI not installed. Install AWS CLI to enable S3 backups.');
      }
      throw error;
    }
  }

  /**
   * Clean up old backups
   */
  async cleanupOldBackups(): Promise<{
    deleted: number;
    errors: number;
  }> {
    try {
      const files = await readdir(this.config.backupPath);
      const cutoffDate = new Date(Date.now() - (this.config.retentionDays * 24 * 60 * 60 * 1000));
      
      let deleted = 0;
      let errors = 0;

      for (const file of files) {
        if (!file.endsWith('.sql') && !file.endsWith('.json')) {
          continue; // Skip non-backup files
        }

        try {
          const filepath = join(this.config.backupPath, file);
          const stats = await stat(filepath);
          
          if (stats.mtime < cutoffDate) {
            await unlink(filepath);
            deleted++;
            logger.info('Deleted old backup', { file, age: stats.mtime });
          }
        } catch (error) {
          errors++;
          logger.warn('Failed to delete old backup', { file, error });
        }
      }

      if (deleted > 0 || errors > 0) {
        logger.info('Backup cleanup completed', { deleted, errors, retentionDays: this.config.retentionDays });
      }

      return { deleted, errors };
    } catch (error) {
      logger.error('Backup cleanup failed', error);
      return { deleted: 0, errors: 1 };
    }
  }

  /**
   * List existing backups
   */
  async listBackups(): Promise<Array<{
    filename: string;
    type: 'database' | 'redis';
    size: number;
    created: Date;
  }>> {
    try {
      const files = await readdir(this.config.backupPath);
      const backups = [];

      for (const file of files) {
        if (!file.endsWith('.sql') && !file.endsWith('.json')) {
          continue;
        }

        try {
          const filepath = join(this.config.backupPath, file);
          const stats = await stat(filepath);
          
          backups.push({
            filename: file,
            type: file.endsWith('.sql') ? 'database' : 'redis',
            size: stats.size,
            created: stats.birthtime
          });
        } catch (error) {
          logger.warn('Failed to stat backup file', { file, error });
        }
      }

      return backups.sort((a, b) => b.created.getTime() - a.created.getTime());
    } catch (error) {
      logger.error('Failed to list backups', error);
      return [];
    }
  }

  /**
   * Run full backup (database + Redis)
   */
  async runFullBackup(): Promise<{
    database: BackupResult;
    redis: BackupResult;
    cleanup: { deleted: number; errors: number };
  }> {
    logger.info('Starting full backup process');
    
    const [databaseResult, redisResult] = await Promise.all([
      this.createDatabaseBackup(),
      this.createRedisBackup()
    ]);

    // Clean up old backups
    const cleanupResult = await this.cleanupOldBackups();

    logger.info('Full backup process completed', {
      databaseSuccess: databaseResult.success,
      redisSuccess: redisResult.success,
      cleanupDeleted: cleanupResult.deleted
    });

    return {
      database: databaseResult,
      redis: redisResult,
      cleanup: cleanupResult
    };
  }

  /**
   * Schedule automated backups
   */
  startScheduler(): void {
    if (!this.isConfigured()) {
      logger.warn('Backup scheduler not started - database not configured');
      return;
    }

    // Run backup every day at 2 AM
    const backupInterval = 24 * 60 * 60 * 1000; // 24 hours
    
    // Calculate time until next 2 AM
    const now = new Date();
    const next2AM = new Date(now);
    next2AM.setHours(2, 0, 0, 0);
    
    if (next2AM <= now) {
      next2AM.setDate(next2AM.getDate() + 1);
    }
    
    const timeUntilNext2AM = next2AM.getTime() - now.getTime();
    
    // Initial backup at 2 AM
    setTimeout(() => {
      this.runFullBackup();
      
      // Then run every 24 hours
      setInterval(() => {
        this.runFullBackup();
      }, backupInterval);
      
    }, timeUntilNext2AM);

    logger.info('Backup scheduler started', {
      nextBackup: next2AM.toISOString(),
      intervalHours: 24
    });
  }

  /**
   * Health check for backup service
   */
  async healthCheck(): Promise<{
    status: 'healthy' | 'unhealthy';
    configured: boolean;
    lastBackup?: string;
    backupCount: number;
    errors?: string[];
  }> {
    const errors: string[] = [];
    
    if (!this.isConfigured()) {
      errors.push('Database URL not configured');
    }

    try {
      // Check if backup directory is accessible
      await access(this.config.backupPath);
    } catch {
      errors.push('Backup directory not accessible');
    }

    // Check for recent backups
    const backups = await this.listBackups();
    const recentBackups = backups.filter(b => 
      Date.now() - b.created.getTime() < 25 * 60 * 60 * 1000 // 25 hours
    );

    let lastBackup: string | undefined;
    if (backups.length > 0) {
      lastBackup = backups[0].created.toISOString();
    }

    return {
      status: errors.length === 0 ? 'healthy' : 'unhealthy',
      configured: this.isConfigured(),
      lastBackup,
      backupCount: backups.length,
      errors: errors.length > 0 ? errors : undefined
    };
  }
}

// Export singleton instance
export const backupService = new BackupService();
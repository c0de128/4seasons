import { Router } from 'express';
import { backupService } from '../services/backup';
import { logger } from '../logger';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

// Apply authentication middleware - only admin users can access backup routes
router.use(requireAuth);
router.use(requireRole('admin'));

/**
 * Get backup service health status
 */
router.get('/health', async (req, res) => {
  try {
    const health = await backupService.healthCheck();
    res.json(health);
  } catch (error) {
    logger.error('Backup health check failed', error);
    res.status(500).json({ error: 'Health check failed' });
  }
});

/**
 * List existing backups
 */
router.get('/list', async (req, res) => {
  try {
    const backups = await backupService.listBackups();
    res.json({
      backups,
      total: backups.length,
      configured: backupService.isConfigured(),
      s3Configured: backupService.isS3Configured()
    });
  } catch (error) {
    logger.error('Failed to list backups', error);
    res.status(500).json({ error: 'Failed to list backups' });
  }
});

/**
 * Create database backup
 */
router.post('/database', async (req, res) => {
  try {
    logger.info('Manual database backup requested', { user: req.user?.id });
    
    const result = await backupService.createDatabaseBackup();
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Database backup created successfully',
        backup: result
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    logger.error('Manual database backup failed', error);
    res.status(500).json({ error: 'Database backup failed' });
  }
});

/**
 * Create Redis backup
 */
router.post('/redis', async (req, res) => {
  try {
    logger.info('Manual Redis backup requested', { user: req.user?.id });
    
    const result = await backupService.createRedisBackup();
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Redis backup created successfully',
        backup: result
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    logger.error('Manual Redis backup failed', error);
    res.status(500).json({ error: 'Redis backup failed' });
  }
});

/**
 * Run full backup (database + Redis + cleanup)
 */
router.post('/full', async (req, res) => {
  try {
    logger.info('Manual full backup requested', { user: req.user?.id });
    
    const result = await backupService.runFullBackup();
    
    res.json({
      success: true,
      message: 'Full backup process completed',
      results: result
    });
  } catch (error) {
    logger.error('Manual full backup failed', error);
    res.status(500).json({ error: 'Full backup failed' });
  }
});

/**
 * Clean up old backups
 */
router.post('/cleanup', async (req, res) => {
  try {
    logger.info('Manual backup cleanup requested', { user: req.user?.id });
    
    const result = await backupService.cleanupOldBackups();
    
    res.json({
      success: true,
      message: 'Backup cleanup completed',
      deleted: result.deleted,
      errors: result.errors
    });
  } catch (error) {
    logger.error('Manual backup cleanup failed', error);
    res.status(500).json({ error: 'Backup cleanup failed' });
  }
});

export default router;
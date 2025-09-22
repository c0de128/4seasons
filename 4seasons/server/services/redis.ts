import Redis from 'ioredis';
import { logger } from '../logger';

interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
  keyPrefix?: string;
  retryDelayOnFailover?: number;
  maxRetriesPerRequest?: number;
}

class RedisService {
  private client: Redis | null = null;
  private isConnected = false;
  private config: RedisConfig;

  constructor() {
    this.config = {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
      keyPrefix: process.env.REDIS_PREFIX || '4seasons:',
      retryDelayOnFailover: process.env.NODE_ENV === 'development' ? 5000 : 100,
      maxRetriesPerRequest: process.env.NODE_ENV === 'development' ? 1 : 3
    };
  }

  /**
   * Initialize Redis connection
   */
  async connect(): Promise<boolean> {
    if (this.isConnected && this.client) {
      return true;
    }

    try {
      // Handle different Redis connection scenarios
      if (process.env.REDIS_URL) {
        // Use full Redis URL (common in cloud deployments)
        this.client = new Redis(process.env.REDIS_URL, {
          keyPrefix: this.config.keyPrefix,
          retryDelayOnFailover: this.config.retryDelayOnFailover,
          maxRetriesPerRequest: this.config.maxRetriesPerRequest,
          lazyConnect: true,
          enableOfflineQueue: process.env.NODE_ENV !== 'development'
        });
      } else {
        // Use individual Redis config options
        this.client = new Redis({
          ...this.config,
          lazyConnect: true,
          enableOfflineQueue: process.env.NODE_ENV !== 'development'
        });
      }

      // Set up event handlers
      this.client.on('connect', () => {
        logger.info('Redis: Connected successfully');
        this.isConnected = true;
      });

      this.client.on('ready', () => {
        logger.info('Redis: Ready to receive commands');
      });

      this.client.on('error', (error) => {
        if (process.env.NODE_ENV !== 'development') {
          logger.error('Redis: Connection error', error);
        }
        this.isConnected = false;
      });

      this.client.on('close', () => {
        if (process.env.NODE_ENV !== 'development') {
          logger.warn('Redis: Connection closed');
        }
        this.isConnected = false;
      });

      this.client.on('reconnecting', () => {
        if (process.env.NODE_ENV !== 'development') {
          logger.info('Redis: Attempting to reconnect...');
        }
      });

      // Test connection
      await this.client.connect();
      await this.client.ping();
      
      logger.info('Redis: Service initialized successfully', {
        host: this.config.host,
        port: this.config.port,
        db: this.config.db,
        prefix: this.config.keyPrefix
      });

      return true;
    } catch (error) {
      logger.error('Redis: Failed to connect', error);
      this.client = null;
      this.isConnected = false;
      return false;
    }
  }

  /**
   * Disconnect from Redis
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      try {
        await this.client.quit();
        logger.info('Redis: Disconnected gracefully');
      } catch (error) {
        logger.error('Redis: Error during disconnect', error);
      } finally {
        this.client = null;
        this.isConnected = false;
      }
    }
  }

  /**
   * Get the Redis client instance
   */
  getClient(): Redis | null {
    if (!this.isConnected || !this.client) {
      logger.warn('Redis: Client not available - attempting to reconnect');
      // Attempt reconnection in background
      this.connect().catch(() => {});
      return null;
    }
    return this.client;
  }

  /**
   * Check if Redis is connected
   */
  isReady(): boolean {
    return this.isConnected && this.client !== null;
  }

  /**
   * Get a value by key
   */
  async get(key: string): Promise<string | null> {
    const client = this.getClient();
    if (!client) return null;

    try {
      const value = await client.get(key);
      return value;
    } catch (error) {
      logger.error('Redis: GET operation failed', { error, key });
      return null;
    }
  }

  /**
   * Set a value with optional TTL
   */
  async set(key: string, value: string, ttlSeconds?: number): Promise<boolean> {
    const client = this.getClient();
    if (!client) return false;

    try {
      if (ttlSeconds) {
        await client.setex(key, ttlSeconds, value);
      } else {
        await client.set(key, value);
      }
      return true;
    } catch (error) {
      logger.error('Redis: SET operation failed', { error, key });
      return false;
    }
  }

  /**
   * Delete a key
   */
  async del(key: string): Promise<boolean> {
    const client = this.getClient();
    if (!client) return false;

    try {
      await client.del(key);
      return true;
    } catch (error) {
      logger.error('Redis: DEL operation failed', { error, key });
      return false;
    }
  }

  /**
   * Check if a key exists
   */
  async exists(key: string): Promise<boolean> {
    const client = this.getClient();
    if (!client) return false;

    try {
      const result = await client.exists(key);
      return result === 1;
    } catch (error) {
      logger.error('Redis: EXISTS operation failed', { error, key });
      return false;
    }
  }

  /**
   * Set expiration on a key
   */
  async expire(key: string, seconds: number): Promise<boolean> {
    const client = this.getClient();
    if (!client) return false;

    try {
      await client.expire(key, seconds);
      return true;
    } catch (error) {
      logger.error('Redis: EXPIRE operation failed', { error, key });
      return false;
    }
  }

  /**
   * Get multiple keys at once
   */
  async mget(keys: string[]): Promise<(string | null)[]> {
    const client = this.getClient();
    if (!client) return keys.map(() => null);

    try {
      const values = await client.mget(keys);
      return values;
    } catch (error) {
      logger.error('Redis: MGET operation failed', { error, keys });
      return keys.map(() => null);
    }
  }

  /**
   * Set multiple key-value pairs
   */
  async mset(keyValues: Record<string, string>): Promise<boolean> {
    const client = this.getClient();
    if (!client) return false;

    try {
      const pairs = Object.entries(keyValues).flat();
      await client.mset(...pairs);
      return true;
    } catch (error) {
      logger.error('Redis: MSET operation failed', { error, keyValues });
      return false;
    }
  }

  /**
   * Increment a numeric value
   */
  async incr(key: string): Promise<number | null> {
    const client = this.getClient();
    if (!client) return null;

    try {
      const result = await client.incr(key);
      return result;
    } catch (error) {
      logger.error('Redis: INCR operation failed', { error, key });
      return null;
    }
  }

  /**
   * Hash operations
   */
  async hset(key: string, field: string, value: string): Promise<boolean> {
    const client = this.getClient();
    if (!client) return false;

    try {
      await client.hset(key, field, value);
      return true;
    } catch (error) {
      logger.error('Redis: HSET operation failed', { error, key, field });
      return false;
    }
  }

  async hget(key: string, field: string): Promise<string | null> {
    const client = this.getClient();
    if (!client) return null;

    try {
      const value = await client.hget(key, field);
      return value;
    } catch (error) {
      logger.error('Redis: HGET operation failed', { error, key, field });
      return null;
    }
  }

  async hgetall(key: string): Promise<Record<string, string> | null> {
    const client = this.getClient();
    if (!client) return null;

    try {
      const result = await client.hgetall(key);
      return result;
    } catch (error) {
      logger.error('Redis: HGETALL operation failed', { error, key });
      return null;
    }
  }

  /**
   * List operations
   */
  async lpush(key: string, ...values: string[]): Promise<number | null> {
    const client = this.getClient();
    if (!client) return null;

    try {
      const result = await client.lpush(key, ...values);
      return result;
    } catch (error) {
      logger.error('Redis: LPUSH operation failed', { error, key });
      return null;
    }
  }

  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    const client = this.getClient();
    if (!client) return [];

    try {
      const result = await client.lrange(key, start, stop);
      return result;
    } catch (error) {
      logger.error('Redis: LRANGE operation failed', { error, key });
      return [];
    }
  }

  /**
   * Cache with JSON serialization
   */
  async setJSON(key: string, value: any, ttlSeconds?: number): Promise<boolean> {
    try {
      const jsonString = JSON.stringify(value);
      return await this.set(key, jsonString, ttlSeconds);
    } catch (error) {
      logger.error('Redis: JSON serialization failed', { error, key });
      return false;
    }
  }

  async getJSON<T = any>(key: string): Promise<T | null> {
    try {
      const jsonString = await this.get(key);
      if (!jsonString) return null;
      
      const parsed = JSON.parse(jsonString);
      return parsed as T;
    } catch (error) {
      logger.error('Redis: JSON parsing failed', { error, key });
      return null;
    }
  }

  /**
   * Get Redis info and statistics
   */
  async getInfo(): Promise<any> {
    const client = this.getClient();
    if (!client) return null;

    try {
      const info = await client.info();
      return this.parseRedisInfo(info);
    } catch (error) {
      logger.error('Redis: INFO operation failed', error);
      return null;
    }
  }

  /**
   * Parse Redis INFO command output
   */
  private parseRedisInfo(info: string): Record<string, any> {
    const sections: Record<string, any> = {};
    const lines = info.split('\r\n');
    let currentSection = 'general';

    for (const line of lines) {
      if (line.startsWith('# ')) {
        currentSection = line.substring(2).toLowerCase();
        sections[currentSection] = {};
        continue;
      }

      if (line && !line.startsWith('#') && line.includes(':')) {
        const [key, value] = line.split(':');
        sections[currentSection] = sections[currentSection] || {};
        sections[currentSection][key] = isNaN(Number(value)) ? value : Number(value);
      }
    }

    return sections;
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{
    status: 'healthy' | 'unhealthy';
    connected: boolean;
    latency?: number;
    error?: string;
  }> {
    if (!this.isReady()) {
      return {
        status: 'unhealthy',
        connected: false,
        error: 'Redis client not connected'
      };
    }

    try {
      const start = Date.now();
      await this.client!.ping();
      const latency = Date.now() - start;

      return {
        status: 'healthy',
        connected: true,
        latency
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Flush all data (development/testing only)
   */
  async flushAll(): Promise<boolean> {
    if (process.env.NODE_ENV === 'production') {
      logger.warn('Redis: FLUSHALL blocked in production');
      return false;
    }

    const client = this.getClient();
    if (!client) return false;

    try {
      await client.flushall();
      logger.info('Redis: All data flushed');
      return true;
    } catch (error) {
      logger.error('Redis: FLUSHALL operation failed', error);
      return false;
    }
  }

  /**
   * JWT Token Blacklisting Methods
   */

  /**
   * Add a JWT token to the blacklist
   * @param token - The JWT token to blacklist
   * @param expiresAt - Unix timestamp when the token expires (in seconds)
   */
  async addToBlacklist(token: string, expiresAt: number): Promise<boolean> {
    if (!token) return false;

    const key = `blacklist:jwt:${token}`;
    const now = Math.floor(Date.now() / 1000);
    const ttl = Math.max(expiresAt - now, 0);

    if (ttl <= 0) {
      // Token already expired, no need to blacklist
      return true;
    }

    try {
      // Store token in blacklist with TTL matching its expiration
      const success = await this.set(key, '1', ttl);
      if (success) {
        logger.info('Redis: Token added to blacklist', { tokenPrefix: token.substring(0, 20) });
      }
      return success;
    } catch (error) {
      logger.error('Redis: Failed to blacklist token', error);
      // Fall back to in-memory Set if Redis fails
      return false;
    }
  }

  /**
   * Check if a JWT token is blacklisted
   * @param token - The JWT token to check
   */
  async isBlacklisted(token: string): Promise<boolean> {
    if (!token) return false;

    const key = `blacklist:jwt:${token}`;

    try {
      const exists = await this.exists(key);
      return exists;
    } catch (error) {
      logger.error('Redis: Failed to check blacklist', error);
      // In case of Redis failure, assume token is not blacklisted
      // This ensures availability over strict security
      return false;
    }
  }

  /**
   * Remove a token from the blacklist (rarely needed)
   * @param token - The JWT token to remove from blacklist
   */
  async removeFromBlacklist(token: string): Promise<boolean> {
    if (!token) return false;

    const key = `blacklist:jwt:${token}`;

    try {
      const success = await this.del(key);
      if (success) {
        logger.info('Redis: Token removed from blacklist', { tokenPrefix: token.substring(0, 20) });
      }
      return success;
    } catch (error) {
      logger.error('Redis: Failed to remove token from blacklist', error);
      return false;
    }
  }

  /**
   * Get count of blacklisted tokens (for monitoring)
   */
  async getBlacklistCount(): Promise<number> {
    const client = this.getClient();
    if (!client) return 0;

    try {
      const keys = await client.keys('blacklist:jwt:*');
      return keys.length;
    } catch (error) {
      logger.error('Redis: Failed to count blacklisted tokens', error);
      return 0;
    }
  }
}

// Export singleton instance
export const redisService = new RedisService();

// Graceful shutdown handler
process.on('SIGTERM', async () => {
  logger.info('Redis: Shutting down...');
  await redisService.disconnect();
});

process.on('SIGINT', async () => {
  logger.info('Redis: Shutting down...');
  await redisService.disconnect();
});
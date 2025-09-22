import { performance } from 'perf_hooks';
import { Request, Response, NextFunction } from 'express';
import { loadavg } from 'os';
import { logger } from '../logger';
import { redisService } from './redis';

interface PerformanceMetric {
  timestamp: number;
  metric: string;
  value: number;
  tags?: Record<string, string>;
  metadata?: any;
}

interface RequestMetrics {
  url: string;
  method: string;
  statusCode: number;
  duration: number;
  timestamp: number;
  userAgent?: string;
  ip?: string;
  responseSize?: number;
}

interface SystemMetrics {
  timestamp: number;
  memory: NodeJS.MemoryUsage;
  uptime: number;
  cpuUsage: NodeJS.CpuUsage;
  loadAverage: number[];
  eventLoopDelay?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private requestMetrics: RequestMetrics[] = [];
  private systemMetrics: SystemMetrics[] = [];
  private maxStoredMetrics = 1000;
  private metricsFlushInterval = 60000; // 1 minute
  private systemMetricsInterval = 30000; // 30 seconds
  private isCollecting = false;
  private intervalIds: NodeJS.Timeout[] = [];

  constructor() {
    this.startSystemMetricsCollection();
  }

  /**
   * Start collecting system metrics
   */
  private startSystemMetricsCollection(): void {
    if (this.isCollecting) return;
    
    this.isCollecting = true;
    
    // Collect system metrics periodically
    const systemMetricsTimer = setInterval(() => {
      this.collectSystemMetrics();
    }, this.systemMetricsInterval);
    
    // Flush metrics to storage periodically
    const flushTimer = setInterval(() => {
      this.flushMetrics();
    }, this.metricsFlushInterval);
    
    this.intervalIds.push(systemMetricsTimer, flushTimer);
    
    logger.info('Performance monitoring started');
  }

  /**
   * Stop collecting metrics
   */
  stop(): void {
    this.intervalIds.forEach(id => clearInterval(id));
    this.intervalIds = [];
    this.isCollecting = false;
    logger.info('Performance monitoring stopped');
  }

  /**
   * Express middleware for request monitoring
   */
  middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const startTime = performance.now();
      const startMemory = process.memoryUsage();
      
      // Track request start
      const requestId = this.generateRequestId();
      
      // Override res.end to capture response metrics
      const originalEnd = res.end;
      let responseSize = 0;
      
      const originalWrite = res.write;
      res.write = function(chunk: any, ...args: any[]) {
        if (chunk) {
          responseSize += Buffer.byteLength(chunk);
        }
        return originalWrite.apply(res, [chunk, ...args]);
      };
      
      res.end = function(chunk?: any, ...args: any[]) {
        if (chunk) {
          responseSize += Buffer.byteLength(chunk);
        }
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        const endMemory = process.memoryUsage();
        
        // Record request metrics
        const requestMetric: RequestMetrics = {
          url: req.originalUrl || req.url,
          method: req.method,
          statusCode: res.statusCode,
          duration,
          timestamp: Date.now(),
          userAgent: req.get('user-agent'),
          ip: req.ip || req.connection.remoteAddress,
          responseSize
        };
        
        // Add to metrics collection
        instance.addRequestMetric(requestMetric);
        
        // Log slow requests
        if (duration > 1000) { // > 1 second
          logger.warn('Slow request detected', {
            url: req.originalUrl,
            method: req.method,
            duration: `${duration.toFixed(2)}ms`,
            statusCode: res.statusCode
          });
        }
        
        // Log memory usage if significant change
        const memoryDelta = endMemory.heapUsed - startMemory.heapUsed;
        if (Math.abs(memoryDelta) > 10 * 1024 * 1024) { // > 10MB
          logger.info('Significant memory usage change', {
            url: req.originalUrl,
            memoryDelta: `${(memoryDelta / 1024 / 1024).toFixed(2)}MB`
          });
        }
        
        return originalEnd.apply(res, [chunk, ...args]);
      };
      
      next();
    };
  }

  /**
   * Add a custom performance metric
   */
  addMetric(metric: string, value: number, tags?: Record<string, string>, metadata?: any): void {
    const performanceMetric: PerformanceMetric = {
      timestamp: Date.now(),
      metric,
      value,
      tags,
      metadata
    };

    this.metrics.push(performanceMetric);
    this.limitStoredMetrics();
  }

  /**
   * Record a performance event (cache hits, misses, etc.)
   */
  recordEvent(type: string, category: string, data?: Record<string, any>): void {
    // Convert event to metric for consistent storage
    this.addMetric(`${category}_${type}`, 1, {
      type,
      category,
      ...data
    });

    // Log cache events for debugging
    if (category === 'cache' || category === 'redis' || category === 'memory') {
      logger.debug('Performance event recorded', {
        type,
        category,
        data,
        timestamp: Date.now()
      });
    }
  }

  /**
   * Add request metric
   */
  private addRequestMetric(metric: RequestMetrics): void {
    this.requestMetrics.push(metric);
    this.limitStoredMetrics();
  }

  /**
   * Collect system metrics
   */
  private collectSystemMetrics(): void {
    const systemMetric: SystemMetrics = {
      timestamp: Date.now(),
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      cpuUsage: process.cpuUsage(),
      loadAverage: loadavg()
    };
    
    this.systemMetrics.push(systemMetric);
    this.limitStoredMetrics();
  }

  /**
   * Limit stored metrics to prevent memory issues
   */
  private limitStoredMetrics(): void {
    if (this.metrics.length > this.maxStoredMetrics) {
      this.metrics.splice(0, this.metrics.length - this.maxStoredMetrics);
    }
    
    if (this.requestMetrics.length > this.maxStoredMetrics) {
      this.requestMetrics.splice(0, this.requestMetrics.length - this.maxStoredMetrics);
    }
    
    if (this.systemMetrics.length > this.maxStoredMetrics) {
      this.systemMetrics.splice(0, this.systemMetrics.length - this.maxStoredMetrics);
    }
  }

  /**
   * Flush metrics to persistent storage (Redis)
   */
  private async flushMetrics(): Promise<void> {
    if (!redisService.isReady()) {
      logger.debug('Redis not available, skipping metrics flush');
      return;
    }
    
    try {
      const timestamp = Date.now();
      const batchKey = `metrics:batch:${timestamp}`;
      
      // Store all metrics in Redis with TTL
      await redisService.setJSON(batchKey, {
        timestamp,
        metrics: this.metrics,
        requestMetrics: this.requestMetrics,
        systemMetrics: this.systemMetrics
      }, 7 * 24 * 60 * 60); // 7 days TTL
      
      // Update aggregated stats
      await this.updateAggregatedStats();
      
      // Clear in-memory metrics after successful flush
      this.metrics = [];
      this.requestMetrics = [];
      this.systemMetrics = [];
      
      logger.debug('Performance metrics flushed to Redis');
    } catch (error) {
      logger.error('Failed to flush performance metrics', error);
    }
  }

  /**
   * Update aggregated performance statistics
   */
  private async updateAggregatedStats(): Promise<void> {
    try {
      // Calculate averages and percentiles for recent requests
      const recentRequests = this.requestMetrics.slice(-100); // Last 100 requests
      
      if (recentRequests.length > 0) {
        const durations = recentRequests.map(r => r.duration);
        const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
        const p95Duration = this.calculatePercentile(durations, 95);
        const p99Duration = this.calculatePercentile(durations, 99);
        
        const stats = {
          timestamp: Date.now(),
          requestCount: recentRequests.length,
          avgResponseTime: avgDuration,
          p95ResponseTime: p95Duration,
          p99ResponseTime: p99Duration,
          errorRate: recentRequests.filter(r => r.statusCode >= 400).length / recentRequests.length * 100,
          memory: process.memoryUsage(),
          uptime: process.uptime()
        };
        
        await redisService.setJSON('metrics:current', stats, 300); // 5 minutes TTL
      }
    } catch (error) {
      logger.error('Failed to update aggregated stats', error);
    }
  }

  /**
   * Calculate percentile from array of numbers
   */
  private calculatePercentile(values: number[], percentile: number): number {
    const sorted = values.slice().sort((a, b) => a - b);
    const index = Math.ceil(sorted.length * percentile / 100) - 1;
    return sorted[index] || 0;
  }

  /**
   * Generate unique request ID
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get cache performance statistics
   */
  getCacheStats(): {
    hits: number;
    misses: number;
    hitRate: number;
    totalRequests: number;
    redisCacheHits: number;
    memoryCacheHits: number;
  } {
    const cacheMetrics = this.metrics.filter(m =>
      m.metric.includes('cache_hit') || m.metric.includes('cache_miss')
    );

    const hits = cacheMetrics.filter(m => m.metric.includes('cache_hit')).length;
    const misses = cacheMetrics.filter(m => m.metric.includes('cache_miss')).length;
    const totalRequests = hits + misses;
    const hitRate = totalRequests > 0 ? (hits / totalRequests) * 100 : 0;

    const redisCacheHits = cacheMetrics.filter(m =>
      m.metric === 'redis_cache_hit'
    ).length;

    const memoryCacheHits = cacheMetrics.filter(m =>
      m.metric === 'memory_cache_hit'
    ).length;

    return {
      hits,
      misses,
      hitRate: Math.round(hitRate * 100) / 100,
      totalRequests,
      redisCacheHits,
      memoryCacheHits
    };
  }

  /**
   * Get current performance statistics
   */
  async getCurrentStats(): Promise<any> {
    try {
      // Try to get from Redis first
      const redisStats = await redisService.getJSON('metrics:current');
      if (redisStats) {
        return redisStats;
      }
    } catch (error) {
      logger.error('Failed to get stats from Redis', error);
    }

    // Fallback to in-memory calculation
    const recentRequests = this.requestMetrics.slice(-100);
    
    if (recentRequests.length === 0) {
      const cacheStats = this.getCacheStats();
      return {
        timestamp: Date.now(),
        requestCount: 0,
        avgResponseTime: 0,
        p95ResponseTime: 0,
        p99ResponseTime: 0,
        errorRate: 0,
        memory: process.memoryUsage(),
        uptime: process.uptime(),
        cache: cacheStats
      };
    }

    const durations = recentRequests.map(r => r.duration);
    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    const p95Duration = this.calculatePercentile(durations, 95);
    const p99Duration = this.calculatePercentile(durations, 99);

    const cacheStats = this.getCacheStats();

    return {
      timestamp: Date.now(),
      requestCount: recentRequests.length,
      avgResponseTime: avgDuration,
      p95ResponseTime: p95Duration,
      p99ResponseTime: p99Duration,
      errorRate: recentRequests.filter(r => r.statusCode >= 400).length / recentRequests.length * 100,
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      cache: cacheStats
    };
  }

  /**
   * Get historical metrics from Redis
   */
  async getHistoricalMetrics(hours: number = 24): Promise<any[]> {
    if (!redisService.isReady()) {
      return [];
    }

    try {
      const client = redisService.getClient();
      if (!client) return [];

      // Get metric batch keys from the last N hours
      const cutoffTime = Date.now() - (hours * 60 * 60 * 1000);
      const keys = await client.keys('metrics:batch:*');
      
      const recentKeys = keys.filter(key => {
        const timestamp = parseInt(key.split(':')[2]);
        return timestamp > cutoffTime;
      });

      if (recentKeys.length === 0) return [];

      // Fetch all recent metric batches
      const batches = await redisService.mget(recentKeys);
      const metrics = [];

      for (const batch of batches) {
        if (batch) {
          try {
            const parsed = JSON.parse(batch);
            metrics.push(parsed);
          } catch (error) {
            logger.warn('Failed to parse metric batch', error);
          }
        }
      }

      return metrics.sort((a, b) => a.timestamp - b.timestamp);
    } catch (error) {
      logger.error('Failed to get historical metrics', error);
      return [];
    }
  }

  /**
   * Get performance alerts
   */
  getAlerts(): Array<{
    type: 'warning' | 'error';
    message: string;
    value: number;
    threshold: number;
  }> {
    const alerts: Array<{
      type: 'warning' | 'error';
      message: string;
      value: number;
      threshold: number;
    }> = [];

    const memory = process.memoryUsage();
    const memoryUsagePercent = (memory.heapUsed / memory.heapTotal) * 100;

    // Memory alerts
    if (memoryUsagePercent > 90) {
      alerts.push({
        type: 'error',
        message: 'High memory usage detected',
        value: memoryUsagePercent,
        threshold: 90
      });
    } else if (memoryUsagePercent > 75) {
      alerts.push({
        type: 'warning',
        message: 'Memory usage is elevated',
        value: memoryUsagePercent,
        threshold: 75
      });
    }

    // Response time alerts
    const recentRequests = this.requestMetrics.slice(-50);
    if (recentRequests.length > 0) {
      const avgResponseTime = recentRequests.reduce((sum, req) => sum + req.duration, 0) / recentRequests.length;
      
      if (avgResponseTime > 2000) { // > 2 seconds
        alerts.push({
          type: 'error',
          message: 'High average response time',
          value: avgResponseTime,
          threshold: 2000
        });
      } else if (avgResponseTime > 1000) { // > 1 second
        alerts.push({
          type: 'warning',
          message: 'Elevated average response time',
          value: avgResponseTime,
          threshold: 1000
        });
      }
    }

    // Error rate alerts
    const errorRequests = recentRequests.filter(r => r.statusCode >= 500);
    const errorRate = recentRequests.length > 0 ? (errorRequests.length / recentRequests.length) * 100 : 0;
    
    if (errorRate > 5) { // > 5% error rate
      alerts.push({
        type: 'error',
        message: 'High error rate detected',
        value: errorRate,
        threshold: 5
      });
    } else if (errorRate > 1) { // > 1% error rate
      alerts.push({
        type: 'warning',
        message: 'Elevated error rate',
        value: errorRate,
        threshold: 1
      });
    }

    return alerts;
  }

  /**
   * Clean up old metrics
   */
  async cleanup(): Promise<void> {
    if (!redisService.isReady()) return;

    try {
      const client = redisService.getClient();
      if (!client) return;

      // Remove metrics older than 7 days
      const cutoffTime = Date.now() - (7 * 24 * 60 * 60 * 1000);
      const keys = await client.keys('metrics:batch:*');
      
      const oldKeys = keys.filter(key => {
        const timestamp = parseInt(key.split(':')[2]);
        return timestamp < cutoffTime;
      });

      if (oldKeys.length > 0) {
        await Promise.all(oldKeys.map(key => redisService.del(key)));
        logger.info(`Cleaned up ${oldKeys.length} old metric batches`);
      }
    } catch (error) {
      logger.error('Failed to cleanup old metrics', error);
    }
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Graceful shutdown
const instance = performanceMonitor;
process.on('SIGTERM', () => instance.stop());
process.on('SIGINT', () => instance.stop());

// Cleanup old metrics daily
setInterval(() => {
  instance.cleanup();
}, 24 * 60 * 60 * 1000); // 24 hours
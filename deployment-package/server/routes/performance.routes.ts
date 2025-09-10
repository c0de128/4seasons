import { Router, Request, Response } from 'express';
import { performanceMonitor } from '../services/performance';
import { requireAuth, requireRole } from '../middleware/session.middleware';
import { logger } from '../logger';

const router = Router();

/**
 * GET /api/performance/stats
 * Get current performance statistics
 * Requires admin role
 */
router.get('/stats', requireRole(['admin', 'moderator']), async (req: Request, res: Response) => {
  try {
    const stats = await performanceMonitor.getCurrentStats();
    const alerts = performanceMonitor.getAlerts();
    
    res.json({
      success: true,
      data: {
        ...stats,
        alerts,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error: any) {
    logger.error('Failed to get performance stats', error);
    res.status(500).json({
      error: 'Failed to retrieve performance statistics',
      message: error.message
    });
  }
});

/**
 * GET /api/performance/metrics
 * Get historical performance metrics
 * Requires admin role
 */
router.get('/metrics', requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const hours = parseInt(req.query.hours as string) || 24;
    const maxHours = 168; // 7 days max
    const requestedHours = Math.min(hours, maxHours);
    
    const metrics = await performanceMonitor.getHistoricalMetrics(requestedHours);
    
    res.json({
      success: true,
      data: {
        metrics,
        timeRange: `${requestedHours} hours`,
        totalBatches: metrics.length
      }
    });
  } catch (error: any) {
    logger.error('Failed to get historical metrics', error);
    res.status(500).json({
      error: 'Failed to retrieve historical metrics',
      message: error.message
    });
  }
});

/**
 * GET /api/performance/alerts
 * Get current performance alerts
 * Requires admin role
 */
router.get('/alerts', requireRole(['admin', 'moderator']), async (req: Request, res: Response) => {
  try {
    const alerts = performanceMonitor.getAlerts();
    
    res.json({
      success: true,
      data: {
        alerts,
        count: alerts.length,
        hasErrors: alerts.some(alert => alert.type === 'error'),
        hasWarnings: alerts.some(alert => alert.type === 'warning')
      }
    });
  } catch (error: any) {
    logger.error('Failed to get performance alerts', error);
    res.status(500).json({
      error: 'Failed to retrieve performance alerts',
      message: error.message
    });
  }
});

/**
 * POST /api/performance/metric
 * Add a custom performance metric
 * Requires authentication
 */
router.post('/metric', requireAuth, async (req: Request, res: Response) => {
  try {
    const { metric, value, tags, metadata } = req.body;
    
    // Validate input
    if (!metric || typeof value !== 'number') {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'metric (string) and value (number) are required'
      });
    }
    
    // Add the metric
    performanceMonitor.addMetric(metric, value, tags, metadata);
    
    logger.info('Custom metric added', { metric, value, tags });
    
    res.json({
      success: true,
      message: 'Metric recorded successfully'
    });
  } catch (error: any) {
    logger.error('Failed to record custom metric', error);
    res.status(500).json({
      error: 'Failed to record metric',
      message: error.message
    });
  }
});

/**
 * GET /api/performance/dashboard
 * Get comprehensive dashboard data
 * Requires admin role
 */
router.get('/dashboard', requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const [currentStats, alerts, recentMetrics] = await Promise.all([
      performanceMonitor.getCurrentStats(),
      Promise.resolve(performanceMonitor.getAlerts()),
      performanceMonitor.getHistoricalMetrics(1) // Last hour
    ]);
    
    // Calculate additional dashboard metrics
    const dashboardData = {
      overview: {
        status: alerts.some(a => a.type === 'error') ? 'error' : 
                alerts.some(a => a.type === 'warning') ? 'warning' : 'healthy',
        uptime: formatUptime(currentStats.uptime),
        totalRequests: currentStats.requestCount,
        averageResponseTime: Math.round(currentStats.avgResponseTime),
        errorRate: Number(currentStats.errorRate.toFixed(2)),
        memoryUsage: formatMemoryUsage(currentStats.memory)
      },
      performance: {
        responseTime: {
          avg: Math.round(currentStats.avgResponseTime),
          p95: Math.round(currentStats.p95ResponseTime),
          p99: Math.round(currentStats.p99ResponseTime)
        },
        throughput: calculateThroughput(recentMetrics),
        memory: currentStats.memory,
        uptime: currentStats.uptime
      },
      alerts: {
        items: alerts,
        counts: {
          total: alerts.length,
          errors: alerts.filter(a => a.type === 'error').length,
          warnings: alerts.filter(a => a.type === 'warning').length
        }
      },
      trends: calculateTrends(recentMetrics)
    };
    
    res.json({
      success: true,
      data: dashboardData,
      lastUpdated: new Date().toISOString()
    });
  } catch (error: any) {
    logger.error('Failed to get dashboard data', error);
    res.status(500).json({
      error: 'Failed to retrieve dashboard data',
      message: error.message
    });
  }
});

/**
 * POST /api/performance/cleanup
 * Manually trigger metrics cleanup
 * Requires admin role
 */
router.post('/cleanup', requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    await performanceMonitor.cleanup();
    
    logger.info('Manual performance metrics cleanup triggered');
    
    res.json({
      success: true,
      message: 'Metrics cleanup completed successfully'
    });
  } catch (error: any) {
    logger.error('Failed to cleanup metrics', error);
    res.status(500).json({
      error: 'Failed to cleanup metrics',
      message: error.message
    });
  }
});

// Helper functions

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function formatMemoryUsage(memory: NodeJS.MemoryUsage) {
  return {
    used: Math.round(memory.heapUsed / 1024 / 1024), // MB
    total: Math.round(memory.heapTotal / 1024 / 1024), // MB
    usage: Math.round((memory.heapUsed / memory.heapTotal) * 100), // %
    external: Math.round(memory.external / 1024 / 1024), // MB
    rss: Math.round(memory.rss / 1024 / 1024) // MB
  };
}

function calculateThroughput(metrics: any[]): number {
  if (metrics.length === 0) return 0;
  
  const totalRequests = metrics.reduce((sum, batch) => {
    return sum + (batch.requestMetrics?.length || 0);
  }, 0);
  
  const timeSpanHours = metrics.length > 0 ? 1 : 0; // Since we're getting 1 hour of data
  
  return timeSpanHours > 0 ? Math.round(totalRequests / timeSpanHours) : 0;
}

function calculateTrends(metrics: any[]): any {
  if (metrics.length < 2) {
    return {
      responseTime: 'stable',
      throughput: 'stable',
      errorRate: 'stable',
      memoryUsage: 'stable'
    };
  }
  
  // Calculate trends based on first vs last metrics in the period
  // This is a simplified trend calculation
  const first = metrics[0];
  const last = metrics[metrics.length - 1];
  
  return {
    responseTime: compareTrend(first.avgResponseTime, last.avgResponseTime, 0.1),
    throughput: compareTrend(last.requestCount, first.requestCount, 0.1),
    errorRate: compareTrend(first.errorRate, last.errorRate, 0.05, true), // Inverse for error rate
    memoryUsage: compareTrend(first.memory?.heapUsed || 0, last.memory?.heapUsed || 0, 0.05)
  };
}

function compareTrend(oldValue: number, newValue: number, threshold: number, inverse = false): 'improving' | 'degrading' | 'stable' {
  if (!oldValue || !newValue) return 'stable';
  
  const changePercent = Math.abs(newValue - oldValue) / oldValue;
  
  if (changePercent < threshold) return 'stable';
  
  const isImproving = inverse ? newValue < oldValue : newValue > oldValue;
  return isImproving ? 'improving' : 'degrading';
}

export default router;
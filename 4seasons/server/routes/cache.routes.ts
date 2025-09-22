import { Router, Request, Response } from 'express';
import { memoryCache, invalidateCache, cacheStats } from '../middleware/cache.middleware';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Cache statistics endpoint
router.get('/stats', authenticate, (req: Request, res: Response) => {
  try {
    cacheStats(req, res);
  } catch (error) {
    console.error('Cache stats error:', error);
    res.status(500).json({ error: 'Failed to retrieve cache stats' });
  }
});

// Cache health check
router.get('/health', (req: Request, res: Response) => {
  try {
    const stats = memoryCache.getStats();
    const isHealthy = stats.size < stats.maxSize * 0.9; // Consider unhealthy if >90% full

    res.status(isHealthy ? 200 : 503).json({
      status: isHealthy ? 'healthy' : 'warning',
      cache: {
        size: stats.size,
        maxSize: stats.maxSize,
        utilization: Math.round((stats.size / stats.maxSize) * 100)
      },
      memory: process.memoryUsage(),
      uptime: process.uptime()
    });
  } catch (error) {
    console.error('Cache health check error:', error);
    res.status(500).json({
      status: 'error',
      error: 'Failed to check cache health'
    });
  }
});

// Clear entire cache
router.delete('/clear', authenticate, (req: Request, res: Response) => {
  try {
    const statsBefore = memoryCache.getStats();
    memoryCache.clear();
    const statsAfter = memoryCache.getStats();

    console.log(`Cache cleared: ${statsBefore.size} items removed`);

    res.json({
      message: 'Cache cleared successfully',
      itemsRemoved: statsBefore.size,
      remainingItems: statsAfter.size
    });
  } catch (error) {
    console.error('Cache clear error:', error);
    res.status(500).json({ error: 'Failed to clear cache' });
  }
});

// Invalidate cache by pattern
router.delete('/invalidate', authenticate, (req: Request, res: Response) => {
  try {
    const { pattern, type = 'string' } = req.body;

    if (!pattern) {
      return res.status(400).json({ error: 'Pattern is required' });
    }

    const statsBefore = memoryCache.getStats();
    let searchPattern: string | RegExp;

    if (type === 'regex') {
      try {
        searchPattern = new RegExp(pattern);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid regex pattern' });
      }
    } else {
      searchPattern = pattern;
    }

    // Find matching keys
    const keysToDelete = statsBefore.keys.filter(key => {
      if (typeof searchPattern === 'string') {
        return key.includes(searchPattern);
      }
      return searchPattern.test(key);
    });

    // Delete matching keys
    keysToDelete.forEach(key => memoryCache.delete(key));

    const statsAfter = memoryCache.getStats();

    console.log(`Cache invalidated: ${keysToDelete.length} items removed for pattern: ${pattern}`);

    res.json({
      message: 'Cache invalidated successfully',
      pattern,
      type,
      itemsRemoved: keysToDelete.length,
      keysRemoved: keysToDelete,
      remainingItems: statsAfter.size
    });
  } catch (error) {
    console.error('Cache invalidation error:', error);
    res.status(500).json({ error: 'Failed to invalidate cache' });
  }
});

// Invalidate specific cache key
router.delete('/key/:key', authenticate, (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const decodedKey = decodeURIComponent(key);

    const existed = memoryCache.get(decodedKey) !== null;
    memoryCache.delete(decodedKey);

    console.log(`Cache key deleted: ${decodedKey} (existed: ${existed})`);

    res.json({
      message: existed ? 'Cache key deleted successfully' : 'Cache key not found',
      key: decodedKey,
      existed
    });
  } catch (error) {
    console.error('Cache key deletion error:', error);
    res.status(500).json({ error: 'Failed to delete cache key' });
  }
});

// Preload cache for specific routes
router.post('/preload', authenticate, async (req: Request, res: Response) => {
  try {
    const { routes } = req.body;

    if (!Array.isArray(routes)) {
      return res.status(400).json({ error: 'Routes must be an array' });
    }

    const results = [];

    for (const route of routes) {
      try {
        // Make internal request to preload cache
        const response = await fetch(`http://localhost:${process.env.PORT || 5000}${route}`, {
          headers: {
            'User-Agent': 'Cache-Preloader'
          }
        });

        results.push({
          route,
          status: response.status,
          cached: response.headers.get('X-Cache') === 'MISS'
        });
      } catch (error) {
        results.push({
          route,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    console.log(`Cache preload completed for ${routes.length} routes`);

    res.json({
      message: 'Cache preload completed',
      results
    });
  } catch (error) {
    console.error('Cache preload error:', error);
    res.status(500).json({ error: 'Failed to preload cache' });
  }
});

// Get cache entries (for debugging)
router.get('/entries', authenticate, (req: Request, res: Response) => {
  try {
    const { limit = 50, search } = req.query;
    const stats = memoryCache.getStats();

    let keys = stats.keys;

    if (search && typeof search === 'string') {
      keys = keys.filter(key => key.includes(search));
    }

    const limitNum = parseInt(limit as string, 10);
    const entries = keys.slice(0, limitNum).map(key => {
      const cached = memoryCache.get(key);
      return {
        key,
        timestamp: cached?.timestamp,
        ttl: cached?.ttl,
        etag: cached?.etag,
        age: cached ? Math.floor((Date.now() - cached.timestamp) / 1000) : null
      };
    });

    res.json({
      total: keys.length,
      showing: entries.length,
      entries
    });
  } catch (error) {
    console.error('Cache entries error:', error);
    res.status(500).json({ error: 'Failed to retrieve cache entries' });
  }
});

// Cache warming endpoints for specific sections
router.post('/warm/city-guides', authenticate, async (req: Request, res: Response) => {
  try {
    const cityGuides = [
      '/allen-city-guide',
      '/plano-city-guide',
      '/frisco-city-guide',
      '/mckinney-city-guide',
      '/richardson-city-guide'
    ];

    const results = [];
    for (const guide of cityGuides) {
      try {
        const response = await fetch(`http://localhost:${process.env.PORT || 5000}${guide}`, {
          headers: { 'User-Agent': 'Cache-Warmer' }
        });
        results.push({ route: guide, status: response.status });
      } catch (error) {
        results.push({ route: guide, error: error instanceof Error ? error.message : 'Unknown error' });
      }
    }

    res.json({
      message: 'City guides cache warming completed',
      results
    });
  } catch (error) {
    console.error('City guides cache warming error:', error);
    res.status(500).json({ error: 'Failed to warm city guides cache' });
  }
});

export default router;
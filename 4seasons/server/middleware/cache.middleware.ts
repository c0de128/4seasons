import { Request, Response, NextFunction } from 'express';
import { redisService } from '../services/redis';
import { performanceMonitor } from '../services/performance';
import crypto from 'crypto';

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  key?: (req: Request) => string; // Custom key generator
  condition?: (req: Request, res: Response) => boolean; // Cache condition
  vary?: string[]; // Vary headers
  staleWhileRevalidate?: number; // SWR in seconds
}

// In-memory cache with LRU eviction
class MemoryCache {
  private cache = new Map<string, {
    data: any;
    timestamp: number;
    ttl: number;
    etag: string;
    headers: Record<string, string>;
    contentType: string;
    isJson: boolean;
  }>();
  private maxSize: number;
  private accessOrder = new Map<string, number>();
  private accessCounter = 0;

  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
  }

  set(key: string, data: any, ttl: number, etag: string, headers: Record<string, string> = {}, contentType = 'application/json', isJson = true) {
    const cacheItem = {
      data,
      timestamp: Date.now(),
      ttl,
      etag,
      headers,
      contentType,
      isJson
    };

    // Try to write to Redis first (non-blocking)
    redisService.setJSON(key, cacheItem, ttl).catch(error => {
      console.warn('Redis cache set failed, using memory cache only:', error);
    });

    // Always write to memory cache as backup
    // LRU eviction if cache is full
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const oldestKey = this.getOldestKey();
      if (oldestKey) {
        this.cache.delete(oldestKey);
        this.accessOrder.delete(oldestKey);
      }
    }

    this.cache.set(key, cacheItem);
    this.updateAccess(key);
  }

  async get(key: string) {
    // Try Redis first if available
    try {
      const redisItem = await redisService.getJSON(key);
      if (redisItem) {
        // Check TTL
        if (Date.now() - redisItem.timestamp > redisItem.ttl * 1000) {
          // Expired, remove from Redis
          await redisService.del(key);
        } else {
          performanceMonitor.recordEvent('cache_hit', 'redis', { key, source: 'redis' });
          return redisItem;
        }
      }
    } catch (error) {
      console.warn('Redis cache get failed, falling back to memory:', error);
    }

    // Fallback to memory cache
    const item = this.cache.get(key);
    if (!item) {
      performanceMonitor.recordEvent('cache_miss', 'cache', { key });
      return null;
    }

    // Check TTL
    if (Date.now() - item.timestamp > item.ttl * 1000) {
      this.cache.delete(key);
      this.accessOrder.delete(key);
      performanceMonitor.recordEvent('cache_miss', 'cache', { key, reason: 'expired' });
      return null;
    }

    this.updateAccess(key);
    performanceMonitor.recordEvent('cache_hit', 'memory', { key, source: 'memory' });
    return item;
  }

  delete(key: string) {
    this.cache.delete(key);
    this.accessOrder.delete(key);
  }

  clear() {
    this.cache.clear();
    this.accessOrder.clear();
    this.accessCounter = 0;
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      keys: Array.from(this.cache.keys())
    };
  }

  private updateAccess(key: string) {
    this.accessOrder.set(key, ++this.accessCounter);
  }

  private getOldestKey(): string | undefined {
    let oldestKey: string | undefined;
    let oldestAccess = Infinity;

    for (const [key, access] of this.accessOrder) {
      if (access < oldestAccess) {
        oldestAccess = access;
        oldestKey = key;
      }
    }

    return oldestKey;
  }
}

// Global cache instance
const memoryCache = new MemoryCache(1000);

// Generate ETag from content
function generateETag(content: any, isJson = true): string {
  const hash = crypto.createHash('md5');

  if (isJson) {
    hash.update(JSON.stringify(content));
  } else {
    // For non-JSON content, use raw bytes
    if (Buffer.isBuffer(content)) {
      hash.update(content);
    } else if (typeof content === 'string') {
      hash.update(Buffer.from(content, 'utf8'));
    } else {
      // Fallback for other types
      hash.update(Buffer.from(String(content), 'utf8'));
    }
  }

  return `"${hash.digest('hex')}"`;
}

// Default cache key generator
function defaultKeyGenerator(req: Request): string {
  const { method } = req;

  // Parse URL to avoid double query string
  const parsedUrl = new URL(req.originalUrl, 'http://localhost');
  const path = parsedUrl.pathname;

  // Rebuild query string in sorted order
  const sortedParams = Array.from(parsedUrl.searchParams.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${method}:${path}${sortedParams ? '?' + sortedParams : ''}`;
}

// Cache middleware factory
export function createCacheMiddleware(options: CacheOptions = {}) {
  const {
    ttl = 300, // 5 minutes default
    key = defaultKeyGenerator,
    condition = () => true,
    vary = ['Accept-Encoding'],
    staleWhileRevalidate = 0
  } = options;

  return async (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Check cache condition
    if (!condition(req, res)) {
      return next();
    }

    const cacheKey = key(req);
    const cached = await memoryCache.get(cacheKey);

    // Handle conditional requests
    if (cached && req.headers['if-none-match'] === cached.etag) {
      // Set cache headers for 304 response
      Object.entries(cached.headers).forEach(([header, value]) => {
        res.setHeader(header, value);
      });
      res.setHeader('ETag', cached.etag);
      res.setHeader('Cache-Control', `max-age=${Math.max(0, ttl - Math.floor((Date.now() - cached.timestamp) / 1000))}`);
      if (vary.length > 0) {
        res.setHeader('Vary', vary.join(', '));
      }
      return res.status(304).end();
    }

    // Serve from cache if available and fresh
    if (cached) {
      const age = Math.floor((Date.now() - cached.timestamp) / 1000);
      const isStale = age > ttl;
      const canUseStale = staleWhileRevalidate > 0 && age <= (ttl + staleWhileRevalidate);

      // If stale but within stale-while-revalidate window, serve stale and revalidate in background
      if (isStale && canUseStale) {
        // Set cache headers for stale response
        Object.entries(cached.headers).forEach(([header, value]) => {
          res.setHeader(header, value);
        });

        res.setHeader('X-Cache', 'STALE');
        res.setHeader('Age', age.toString());
        res.setHeader('Cache-Control', `max-age=0, stale-while-revalidate=${staleWhileRevalidate}`);
        res.setHeader('ETag', cached.etag);

        if (vary.length > 0) {
          res.setHeader('Vary', vary.join(', '));
        }

        // Trigger background revalidation without blocking the response
        setImmediate(() => {
          // Background revalidation logic would go here
          // For now, we'll just remove the stale cache entry to force fresh fetch on next request
          memoryCache.delete(cacheKey);
        });

        // Send stale response immediately
        if (cached.isJson) {
          return res.json(cached.data);
        } else {
          return res.type(cached.contentType).send(cached.data);
        }
      }

      // If fresh or expired beyond stale window, handle normally
      if (!isStale) {
        // Set cache headers for fresh response
        Object.entries(cached.headers).forEach(([header, value]) => {
          res.setHeader(header, value);
        });

        res.setHeader('X-Cache', 'HIT');
        res.setHeader('Age', age.toString());
        res.setHeader('Cache-Control', `max-age=${Math.max(0, ttl - age)}`);
        res.setHeader('ETag', cached.etag);

        if (vary.length > 0) {
          res.setHeader('Vary', vary.join(', '));
        }

        // Send fresh response
        if (cached.isJson) {
          return res.json(cached.data);
        } else {
          return res.type(cached.contentType).send(cached.data);
        }
      }

      // If expired beyond stale window, delete and proceed to cache miss
      memoryCache.delete(cacheKey);
    }

    // Cache miss - intercept response
    const originalJson = res.json.bind(res);
    const originalSend = res.send.bind(res);

    res.json = function(data: any) {
      // Only cache successful responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const etag = generateETag(data, true); // JSON content
        const headers: Record<string, string> = {};

        // Store important headers
        ['Content-Type', 'Content-Language'].forEach(header => {
          const value = res.getHeader(header);
          if (value) {
            headers[header] = String(value);
          }
        });

        // Cache the data (remove await since this is not an async function)
        memoryCache.set(cacheKey, data, ttl, etag, headers, 'application/json', true);

        // Set cache headers for response
        res.setHeader('X-Cache', 'MISS');
        res.setHeader('Cache-Control', `max-age=${ttl}${staleWhileRevalidate ? `, stale-while-revalidate=${staleWhileRevalidate}` : ''}`);
        res.setHeader('ETag', etag);

        if (vary.length > 0) {
          res.setHeader('Vary', vary.join(', '));
        }
      }

      return originalJson(data);
    };

    res.send = function(data: any) {
      // Handle non-JSON responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const contentType = res.getHeader('Content-Type')?.toString() || 'text/plain';

        // Reuse existing ETag if available, otherwise generate new one
        let etag = res.getHeader('ETag')?.toString();
        if (!etag) {
          etag = generateETag(data, false); // Non-JSON content
          res.setHeader('ETag', etag);
        }

        const headers: Record<string, string> = {};

        // Store important headers
        ['Content-Language'].forEach(header => {
          const value = res.getHeader(header);
          if (value) {
            headers[header] = String(value);
          }
        });

        memoryCache.set(cacheKey, data, ttl, etag, headers, contentType, false);

        res.setHeader('X-Cache', 'MISS');
        res.setHeader('Cache-Control', `max-age=${ttl}`);
      }

      return originalSend(data);
    };

    next();
  };
}

// Specific cache middleware for different use cases
export const apiCache = createCacheMiddleware({
  ttl: 300, // 5 minutes
  condition: (req) => !req.headers.authorization && req.method === 'GET'
});

export const staticCache = createCacheMiddleware({
  ttl: 86400, // 24 hours
  condition: (req) => {
    // Only cache specific static asset file types to avoid conflicts with express.static
    const isStaticAsset = req.path.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|webp|avif|mp4|webm)$/i) !== null;
    // Don't cache if this is likely an express.static served file
    const isApiRoute = req.path.startsWith('/api/');
    return isStaticAsset && !isApiRoute;
  }
});

export const cityGuideCache = createCacheMiddleware({
  ttl: 1800, // 30 minutes
  condition: (req) => req.path.includes('/api/city-guides') || req.path.includes('/city-guides')
});

export const homePageCache = createCacheMiddleware({
  ttl: 900, // 15 minutes
  condition: (req) => req.path === '/' || req.path === '/api/home'
});

// Cache invalidation middleware
export function invalidateCache(pattern?: string | RegExp) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (pattern) {
      const stats = memoryCache.getStats();
      const keysToDelete = stats.keys.filter(key => {
        if (typeof pattern === 'string') {
          return key.includes(pattern);
        }
        return pattern.test(key);
      });

      keysToDelete.forEach(key => memoryCache.delete(key));
    } else {
      memoryCache.clear();
    }

    next();
  };
}

// Cache stats endpoint middleware
export function cacheStats(req: Request, res: Response) {
  const stats = memoryCache.getStats();
  res.json({
    ...stats,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage()
  });
}

// Export cache instance for direct access
export { memoryCache };
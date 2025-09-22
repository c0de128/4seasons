import { Request, Response, NextFunction, Express } from 'express';

/**
 * Performance Optimization Middleware for GoDaddy Hosting
 * Optimizes the application for shared hosting environment
 */

const isGoDaddyHosting = process.env.HOSTING_PROVIDER === 'godaddy';
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Memory usage monitoring and cleanup
 */
export function memoryOptimizationMiddleware(req: Request, res: Response, next: NextFunction) {
  if (isGoDaddyHosting && isProduction) {
    // Force garbage collection periodically on shared hosting
    const random = Math.random();
    if (random < 0.001) { // 0.1% chance per request
      if (global.gc) {
        try {
          global.gc();
          console.log('🧹 Memory cleanup performed');
        } catch (error) {
          // GC not available, ignore
        }
      }
    }

    // Monitor memory usage and log warnings
    const memUsage = process.memoryUsage();
    const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
    
    if (heapUsedMB > 400) { // Warn if using more than 400MB on shared hosting
      console.warn(`⚠️  High memory usage: ${heapUsedMB}MB`);
    }
  }
  
  next();
}

/**
 * Request timeout middleware for shared hosting
 */
export function requestTimeoutMiddleware(req: Request, res: Response, next: NextFunction) {
  if (isGoDaddyHosting) {
    // Set shorter timeout for shared hosting to prevent resource hogging
    const timeout = parseInt(process.env.REQUEST_TIMEOUT || '30000', 10);
    
    const timeoutId = setTimeout(() => {
      if (!res.headersSent) {
        res.status(408).json({
          error: 'Request timeout',
          message: 'Request took too long to process'
        });
      }
    }, timeout);

    // Clear timeout when response is sent
    res.on('finish', () => {
      clearTimeout(timeoutId);
    });
  }
  
  next();
}

/**
 * Response compression optimization
 */
export function responseOptimizationMiddleware(req: Request, res: Response, next: NextFunction) {
  if (isGoDaddyHosting) {
    // Optimize JSON responses for shared hosting
    const originalJson = res.json.bind(res);
    res.json = function(obj: any) {
      // Remove undefined values to reduce payload size
      if (obj && typeof obj === 'object') {
        obj = JSON.parse(JSON.stringify(obj));
      }
      
      // Set appropriate content-type and encoding
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      
      return originalJson(obj);
    };
  }
  
  next();
}

/**
 * Static file serving optimization for GoDaddy
 */
export function staticFileOptimizationMiddleware(req: Request, res: Response, next: NextFunction) {
  if (isGoDaddyHosting && req.url.includes('/assets/')) {
    // Add GoDaddy-specific optimizations for static files
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // X-Frame-Options handled by security middleware (avoid conflicts)
    
    // Optimize caching for different file types
    if (req.url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day for images
    } else if (req.url.match(/\.(css|js)$/i)) {
      res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour for CSS/JS
    }
    
    // Add Content-Disposition for downloads
    if (req.url.match(/\.(pdf|doc|docx)$/i)) {
      res.setHeader('Content-Disposition', 'attachment');
    }
  }
  
  next();
}

/**
 * Database connection pooling optimization
 */
export function databaseOptimizationMiddleware(req: Request, res: Response, next: NextFunction) {
  if (isGoDaddyHosting) {
    // Add request ID for tracing
    req.requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Log slow requests for optimization
    const startTime = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      if (duration > 5000) { // Log requests taking more than 5 seconds
        console.warn(`🐌 Slow request detected: ${req.method} ${req.url} took ${duration}ms [${req.requestId}]`);
      }
    });
  }
  
  next();
}

/**
 * Apply all performance optimizations to Express app
 */
export function applyPerformanceMiddleware(app: Express): void {
  console.log('🚀 Applying performance optimizations...');
  
  if (isGoDaddyHosting) {
    console.log('🏠 GoDaddy hosting optimizations enabled');
    
    // Apply GoDaddy-specific middleware
    app.use(memoryOptimizationMiddleware);
    app.use(requestTimeoutMiddleware);
    app.use(responseOptimizationMiddleware);
    app.use(staticFileOptimizationMiddleware);
    app.use(databaseOptimizationMiddleware);
    
    console.log('✅ GoDaddy performance optimizations applied');
  } else {
    console.log('ℹ️  Standard performance configuration');
  }
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private requestCounts: { [key: string]: number } = {};
  private responseTimes: number[] = [];
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }
  
  recordRequest(method: string, url: string, responseTime: number): void {
    const key = `${method} ${url}`;
    this.requestCounts[key] = (this.requestCounts[key] || 0) + 1;
    this.responseTimes.push(responseTime);
    
    // Keep only last 1000 response times to prevent memory leaks
    if (this.responseTimes.length > 1000) {
      this.responseTimes = this.responseTimes.slice(-1000);
    }
  }
  
  getStats(): any {
    const avgResponseTime = this.responseTimes.length > 0 
      ? this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length 
      : 0;
      
    return {
      totalRequests: Object.values(this.requestCounts).reduce((a, b) => a + b, 0),
      averageResponseTime: Math.round(avgResponseTime),
      topEndpoints: Object.entries(this.requestCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([endpoint, count]) => ({ endpoint, count }))
    };
  }
  
  middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const startTime = Date.now();
      
      res.on('finish', () => {
        const responseTime = Date.now() - startTime;
        this.recordRequest(req.method, req.route?.path || req.url, responseTime);
      });
      
      next();
    };
  }
}

// Add type declaration for request ID
declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}
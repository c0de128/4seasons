import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupSitemapRoutes } from "./sitemap";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import performanceRoutes from "./routes/performance.routes";
import backupRoutes from "./routes/backup.routes";
import securityRoutes from "./routes/security.routes";
import uploadRoutes from "./routes/upload.routes";
import formsRoutes from "./routes/forms.routes";
import emailTestRoutes from "./routes/email-test.routes";
import cacheRoutes from "./routes/cache.routes";
import mlsRoutes from "./routes/mls.routes";
import { validateContactForm } from "./middleware/validation.middleware";
import { contactLimiter } from "./middleware/security.middleware";
import { logger } from "./logger";
import { redisService } from "./services/redis";
import { sessionHealthCheck } from "./middleware/session.middleware";
import { setCSRFToken, verifyCSRFToken, getCSRFToken } from "./middleware/csrf.middleware";
import { performanceMonitor } from "./services/performance";
import { emailService } from "./services/email";
import { backupService } from "./services/backup";
import express from "express";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup SEO-friendly sitemap routes
  setupSitemapRoutes(app);

  // API Routes
  // CSRF token endpoint (before CSRF protection)
  app.get("/api/csrf-token", setCSRFToken, (req, res) => {
    getCSRFToken(req, res);
  });
  
  // Apply CSRF protection to all API routes (except auth)
  app.use("/api", (req, res, next) => {
    const p = req.path;
    const isSafeMethod = req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS';
    const isAuthOrHealth = p.startsWith('/auth/') || p === '/health' || p === '/csrf-token';

    // Always set CSRF token for all requests (so clients can get it)
    setCSRFToken(req, res, () => {
      // Only verify CSRF for unsafe methods on non-exempt routes
      if (isSafeMethod || isAuthOrHealth) {
        return next();
      }
      verifyCSRFToken(req, res, next);
    });
  });
  
  // Authentication routes
  app.use("/api/auth", authRoutes);

  // Admin routes (requires admin role)
  app.use("/api/admin", adminRoutes);

  // Performance monitoring routes
  app.use("/api/performance", performanceRoutes);
  
  // Backup management routes (admin only)
  app.use("/api/backup", backupRoutes);
  
  // Security testing routes (admin only)
  app.use("/api/security", securityRoutes);
  
  // File upload routes
  app.use("/api/upload", uploadRoutes);
  
  // Form processing routes
  app.use("/api/forms", formsRoutes);
  
  // Email testing routes (for GoDaddy SMTP configuration)
  app.use("/api/email", emailTestRoutes);

  // Cache management routes (admin only)
  app.use("/api/cache", cacheRoutes);

  // MLS proxy routes
  app.use("/api/mls", mlsRoutes);

  // Serve uploaded files with security middleware
  app.use("/uploads", (req, res, next) => {
    // Add security headers for file serving
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', "default-src 'none'; img-src 'self'; object-src 'none';");
    
    // Prevent direct access to sensitive file types
    const fileExt = path.extname(req.path).toLowerCase();
    const dangerousExts = ['.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', '.jar', '.php', '.asp', '.aspx'];
    
    if (dangerousExts.includes(fileExt)) {
      logger.warn('Attempt to access dangerous file type blocked', {
        path: req.path,
        ext: fileExt,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      return res.status(403).json({ error: 'File type not allowed' });
    }
    
    next();
  }, express.static(path.join(process.cwd(), 'uploads'), {
    maxAge: '1d', // Cache for 1 day
    etag: true,
    lastModified: true,
    setHeaders: (res, filepath) => {
      // Set appropriate MIME types and prevent execution
      const ext = path.extname(filepath).toLowerCase();
      
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
        res.setHeader('Content-Disposition', 'inline');
      } else if (['.pdf'].includes(ext)) {
        res.setHeader('Content-Disposition', 'inline');
      } else {
        // For other file types, force download
        res.setHeader('Content-Disposition', 'attachment');
      }
    }
  }));

  // Legacy contact form endpoint - proxy to forms router for backward compatibility
  app.all("/api/contact*", (req, res, next) => {
    // Rewrite the URL to forward to forms router
    req.url = req.url.replace('/api/contact', '/forms/contact');
    next();
  });

  // API health check with Redis, session, performance, email, and backup status
  app.get("/api/health", async (req, res) => {
    try {
      const [redisHealth, sessionHealth, performanceStats, emailHealth, backupHealth] = await Promise.all([
        redisService.healthCheck(),
        sessionHealthCheck(),
        performanceMonitor.getCurrentStats(),
        emailService.healthCheck(),
        backupService.healthCheck()
      ]);
      
      const performanceAlerts = performanceMonitor.getAlerts();
      
      const health = {
        status: "healthy",
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version,
        uptime: process.uptime(),
        services: {
          redis: redisHealth,
          sessions: sessionHealth,
          email: emailHealth,
          backup: backupHealth,
          performance: {
            status: performanceAlerts.some(a => a.type === 'error') ? 'error' : 
                    performanceAlerts.some(a => a.type === 'warning') ? 'warning' : 'healthy',
            responseTime: Math.round(performanceStats.avgResponseTime),
            memoryUsage: Math.round((performanceStats.memory.heapUsed / performanceStats.memory.heapTotal) * 100),
            errorRate: Number(performanceStats.errorRate.toFixed(2)),
            alertCount: performanceAlerts.length
          }
        }
      };

      // Overall status based on critical services
      if (redisHealth.status === 'unhealthy' && process.env.NODE_ENV === 'production') {
        health.status = "degraded";
      }
      
      if (performanceAlerts.some(a => a.type === 'error')) {
        health.status = "degraded";
      }

      const statusCode = health.status === "healthy" ? 200 : 503;
      res.status(statusCode).json(health);
    } catch (error) {
      logger.error('Health check failed', error);
      res.status(503).json({
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Health check failed"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

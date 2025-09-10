import express, { type Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { applySecurityMiddleware } from "./middleware/security.middleware";
import { applyPerformanceMiddleware, PerformanceMonitor } from "./middleware/performance.middleware";
import { setupHttpLogging, logger, errorLogger } from "./logger";
import { createSessionMiddleware, validateSessionMiddleware } from "./middleware/session.middleware";
import { redisService } from "./services/redis";
import { performanceMonitor } from "./services/performance";
import { backupService } from "./services/backup";
import { cleanupOldFiles } from "./middleware/upload.middleware";

// Load environment variables
dotenv.config();

// GoDaddy-specific optimizations
const isGoDaddyHosting = process.env.HOSTING_PROVIDER === 'godaddy' || process.env.NODE_ENV === 'production';

if (isGoDaddyHosting) {
  // Optimize for GoDaddy hosting environment
  process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || '') + ' --max-old-space-size=512';
  
  // Disable unnecessary features for shared hosting
  process.env.DISABLE_CLUSTER = 'true';
  
  // Set optimal timeouts for shared hosting
  process.env.REQUEST_TIMEOUT = process.env.REQUEST_TIMEOUT || '30000';
  process.env.KEEP_ALIVE_TIMEOUT = process.env.KEEP_ALIVE_TIMEOUT || '15000';
}

// Validate critical environment variables
if (process.env.NODE_ENV === "production") {
  const requiredEnvVars = ["JWT_SECRET", "SESSION_SECRET"];
  const missing = requiredEnvVars.filter(v => !process.env[v]);
  if (missing.length > 0) {
    logger.error(`Missing required environment variables: ${missing.join(", ")}`);
    process.exit(1);
  }
  
  // GoDaddy-specific production validations
  if (isGoDaddyHosting) {
    const godaddyRequiredVars = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"];
    const godaddyMissing = godaddyRequiredVars.filter(v => !process.env[v]);
    if (godaddyMissing.length > 0) {
      logger.warn(`GoDaddy-specific environment variables not set: ${godaddyMissing.join(", ")}`);
      logger.warn(`Email functionality may not work properly`);
    }
  }
}

const app = express();

// Apply security middleware first
applySecurityMiddleware(app);

// Apply performance optimizations
applyPerformanceMiddleware(app);

// Setup HTTP request logging
setupHttpLogging(app);

// Add performance monitoring middleware
const perfMonitor = PerformanceMonitor.getInstance();
app.use(perfMonitor.middleware());
app.use(performanceMonitor.middleware());

// Initialize session middleware (will be added after routes are registered)
let sessionMiddleware: any = null;

// Body parsing middleware with limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

// Health check endpoint (before rate limiting)
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

(async () => {
  // Initialize session middleware first
  try {
    sessionMiddleware = await createSessionMiddleware();
    app.use(sessionMiddleware);
    
    // Add session validation middleware after session is initialized
    app.use(validateSessionMiddleware);
    
    logger.info('Session middleware initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize session middleware', error);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }

  const server = await registerRoutes(app);

  // Error logging middleware
  app.use(errorLogger);

  // Error handling middleware
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = process.env.NODE_ENV === "production" 
      ? "Internal Server Error" 
      : err.message || "Internal Server Error";

    // Log the error
    logger.error("Unhandled error", {
      error: err,
      request: {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
      },
    });

    res.status(status).json({ 
      error: message,
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
    });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  const host = process.env.NODE_ENV === 'development' ? 'localhost' : '0.0.0.0';
  
  // GoDaddy-specific server optimizations
  if (isGoDaddyHosting) {
    // Set keep-alive timeout for GoDaddy's load balancer
    server.keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT || '15000', 10);
    server.headersTimeout = server.keepAliveTimeout + 5000;
    
    // Set request timeout for shared hosting
    server.timeout = parseInt(process.env.REQUEST_TIMEOUT || '30000', 10);
    
    // Limit concurrent connections for shared hosting
    server.maxConnections = 100;
  }
  
  server.listen(port, host, () => {
    logger.info(`Server started`, {
      environment: process.env.NODE_ENV,
      hostingProvider: isGoDaddyHosting ? 'GoDaddy' : 'Generic',
      port,
      host,
      url: `http://${host}:${port}`,
      optimizations: isGoDaddyHosting ? 'GoDaddy optimizations enabled' : 'Standard configuration',
    });
    console.log(`🚀 Server running at http://${host}:${port}`);
    console.log(`🔒 Security middleware enabled`);
    console.log(`📝 Logging to ./logs directory`);
    
    if (isGoDaddyHosting) {
      console.log(`🏠 GoDaddy hosting optimizations enabled`);
      console.log(`⚡ Memory limit: 512MB`);
      console.log(`⏱️  Request timeout: ${server.timeout}ms`);
      console.log(`🔗 Keep-alive timeout: ${server.keepAliveTimeout}ms`);
    }
    
    // Start backup scheduler in production (but not on shared hosting)
    if (process.env.NODE_ENV === 'production' && !isGoDaddyHosting) {
      backupService.startScheduler();
      console.log(`💾 Automated backup scheduler started`);
    } else if (isGoDaddyHosting) {
      console.log(`💾 Backup scheduler disabled for shared hosting`);
    }
    
    // Start file cleanup scheduler (runs every 24 hours)
    setInterval(async () => {
      try {
        const maxAgeHours = parseInt(process.env.FILE_CLEANUP_AGE_HOURS || '168'); // 7 days default
        await cleanupOldFiles(maxAgeHours);
      } catch (error) {
        logger.error('Scheduled file cleanup failed', error);
      }
    }, 24 * 60 * 60 * 1000); // 24 hours
    
    console.log(`🗑️  Automated file cleanup scheduler started`);
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    logger.info("SIGTERM received, closing server gracefully");
    server.close(() => {
      logger.info("Server closed");
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    logger.info("SIGINT received, closing server gracefully");
    server.close(() => {
      logger.info("Server closed");
      process.exit(0);
    });
  });
})();
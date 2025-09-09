import express, { type Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { applySecurityMiddleware } from "./middleware/security.middleware";
import { setupHttpLogging, logger, errorLogger } from "./logger";
import { createSessionMiddleware } from "./middleware/session.middleware";
import { redisService } from "./services/redis";
import { performanceMonitor } from "./services/performance";
import { backupService } from "./services/backup";

// Load environment variables
dotenv.config();

// Validate critical environment variables
if (process.env.NODE_ENV === "production") {
  const requiredEnvVars = ["JWT_SECRET", "SESSION_SECRET"];
  const missing = requiredEnvVars.filter(v => !process.env[v]);
  if (missing.length > 0) {
    logger.error(`Missing required environment variables: ${missing.join(", ")}`);
    process.exit(1);
  }
}

const app = express();

// Apply security middleware first
applySecurityMiddleware(app);

// Setup HTTP request logging
setupHttpLogging(app);

// Add performance monitoring middleware
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
  
  server.listen(port, host, () => {
    logger.info(`Server started`, {
      environment: process.env.NODE_ENV,
      port,
      host,
      url: `http://${host}:${port}`,
    });
    console.log(`🚀 Server running at http://${host}:${port}`);
    console.log(`🔒 Security middleware enabled`);
    console.log(`📝 Logging to ./logs directory`);
    
    // Start backup scheduler in production
    if (process.env.NODE_ENV === 'production') {
      backupService.startScheduler();
      console.log(`💾 Automated backup scheduler started`);
    }
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
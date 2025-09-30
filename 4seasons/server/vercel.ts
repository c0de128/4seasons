import express from "express";
import dotenv from "dotenv";
import { registerRoutes } from "./routes";
import { applySecurityMiddleware } from "./middleware/security.middleware";
import { applyPerformanceMiddleware } from "./middleware/performance.middleware";
import { setupHttpLogging, errorLogger } from "./logger";
import { createSessionMiddleware, validateSessionMiddleware } from "./middleware/session.middleware";
import { apiCache, staticCache, cityGuideCache, homePageCache } from "./middleware/cache.middleware";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Apply security middleware first
applySecurityMiddleware(app);

// Performance middleware
applyPerformanceMiddleware(app);

// Setup HTTP logging
setupHttpLogging(app);

// Initialize the app asynchronously
async function initializeApp() {
  try {
    // Initialize session middleware
    const sessionMiddleware = await createSessionMiddleware();
    app.use(sessionMiddleware);
    app.use(validateSessionMiddleware);

    // Apply cache middleware for different routes
    app.use('/api/city-guides', cityGuideCache);
    app.use(/.*city-guide.*/, cityGuideCache);
    app.use('/', homePageCache);
    app.use('/api', apiCache);

    // Register all routes
    await registerRoutes(app);

    // Error logging middleware
    app.use(errorLogger);

    // Error handling middleware
    app.use((err: any, req: any, res: any, _next: any) => {
      const status = err.status || err.statusCode || 500;

      // Sanitize error message
      const sanitizeErrorMessage = (message: string): string => {
        if (!message) return "Internal Server Error";
        return message
          .replace(/postgres:\/\/[^@]*@[^\s]*/g, 'postgres://[REDACTED]')
          .replace(/mysql:\/\/[^@]*@[^\s]*/g, 'mysql://[REDACTED]')
          .replace(/password[=:][^\s]*/gi, 'password=[REDACTED]');
      };

      const clientErrorMessage = status < 500
        ? sanitizeErrorMessage(err.message)
        : "Internal Server Error";

      console.error(`Error ${status}:`, {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        userAgent: req.get('User-Agent')
      });

      if (!res.headersSent) {
        res.status(status).json({ error: clientErrorMessage });
      }
    });

    return app;
  } catch (error) {
    console.error('Failed to initialize app:', error);
    throw error;
  }
}

// Initialize the app and export it
let initializedApp: express.Application | null = null;

export default async function getApp() {
  if (!initializedApp) {
    initializedApp = await initializeApp();
  }
  return initializedApp;
}
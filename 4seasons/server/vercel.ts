import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { registerRoutes } from "./routes.js";
import { applySecurityMiddleware } from "./middleware/security.middleware.js";
import { createSessionMiddleware } from "./middleware/session.middleware.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createServer() {
  const app = express();

  // Apply security middleware
  applySecurityMiddleware(app);

  // JSON and URL encoded body parsing
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Session middleware (with fallback for serverless)
  try {
    const sessionMiddleware = await createSessionMiddleware();
    app.use(sessionMiddleware);
  } catch (error) {
    console.warn('Session middleware initialization failed in serverless environment');
  }

  // Static file serving - serve from dist in Vercel
  const staticPath = process.env.VERCEL
    ? path.join(process.cwd(), 'dist')
    : path.resolve('./dist');

  app.use(express.static(staticPath, {
    maxAge: '1y',
    etag: false,
    index: false
  }));

  // Register all routes
  await registerRoutes(app);

  // SPA fallback - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(staticPath, 'index.html'));
    } else {
      res.status(404).json({ error: 'API endpoint not found' });
    }
  });

  // Error handling middleware
  app.use((err: any, req: any, res: any, _next: any) => {
    const status = err.status || err.statusCode || 500;

    // Sanitize error message for security
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
}

// Legacy export for compatibility
export default createServer;
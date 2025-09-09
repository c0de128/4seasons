import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupSitemapRoutes } from "./sitemap";
import authRoutes from "./routes/auth.routes";
import performanceRoutes from "./routes/performance.routes";
import backupRoutes from "./routes/backup.routes";
import securityRoutes from "./routes/security.routes";
import { validateContactForm } from "./middleware/validation.middleware";
import { contactLimiter } from "./middleware/security.middleware";
import { logger } from "./logger";
import { redisService } from "./services/redis";
import { sessionHealthCheck } from "./middleware/session.middleware";
import { performanceMonitor } from "./services/performance";
import { emailService } from "./services/email";
import { backupService } from "./services/backup";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup SEO-friendly sitemap routes
  setupSitemapRoutes(app);

  // API Routes
  // Authentication routes
  app.use("/api/auth", authRoutes);
  
  // Performance monitoring routes
  app.use("/api/performance", performanceRoutes);
  
  // Backup management routes (admin only)
  app.use("/api/backup", backupRoutes);
  
  // Security testing routes (admin only)
  app.use("/api/security", securityRoutes);

  // Contact form endpoint
  app.post("/api/contact", contactLimiter, validateContactForm, async (req, res) => {
    try {
      const { name, email, phone, message, propertyInterest } = req.body;
      
      // Log contact form submission
      logger.info("Contact form submitted", { name, email, propertyInterest });
      
      // Prepare contact form data
      const contactData = {
        name,
        email,
        phone,
        message,
        propertyInterest
      };
      
      // Send emails if email service is configured
      if (emailService.isReady()) {
        // Send email to the business
        const businessEmailSent = await emailService.sendContactFormEmail(contactData);
        
        // Send confirmation email to the customer
        const confirmationEmailSent = await emailService.sendContactConfirmationEmail(contactData);
        
        logger.info("Contact form emails sent", {
          businessEmailSent,
          confirmationEmailSent,
          name,
          email
        });
        
        res.json({
          success: true,
          message: "Thank you for contacting us. We'll get back to you soon!",
          emailSent: businessEmailSent
        });
      } else {
        // Email service not configured - still accept the form but log warning
        logger.warn("Contact form submitted but email service not configured");
        
        res.json({
          success: true,
          message: "Thank you for contacting us. We'll get back to you soon!",
          emailSent: false
        });
      }
    } catch (error: any) {
      logger.error("Contact form error", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
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

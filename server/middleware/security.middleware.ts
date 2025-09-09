import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import { Express } from 'express';

// CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || ['https://4seasonsrealestate.com']
    : ['http://localhost:5000', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  maxAge: 86400, // 24 hours
};

// Rate limiting configurations (optimized for GoDaddy shared hosting)
const isGoDaddyHosting = process.env.HOSTING_PROVIDER === 'godaddy';

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isGoDaddyHosting ? 50 : 100, // More restrictive on shared hosting
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  // Use memory store on shared hosting to avoid external dependencies
  store: isGoDaddyHosting ? undefined : undefined,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  skipSuccessfulRequests: true,
});

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 API requests per minute
  message: 'API rate limit exceeded, please slow down.',
});

// Contact form rate limiter (strict)
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 contact form submissions per hour
  message: 'Too many contact form submissions, please try again later.',
});

/**
 * Apply all security middleware to Express app
 */
export function applySecurityMiddleware(app: Express): void {
  // Helmet for security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
        ],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: [
          "'self'",
          "https://www.google-analytics.com",
          "https://api.4seasonsrealestate.com",
        ],
        frameSrc: [
          "'self'", 
          "https://matrix.ntreis.net", 
          "https://*.ntreis.net",
          "https://ntreis.net",
          "http://localhost:*"
        ],
        frameAncestors: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
      },
    },
    crossOriginEmbedderPolicy: false, // Disable in development for iframe compatibility
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }));

  // CORS
  app.use(cors(corsOptions));

  // Compression (optimized for GoDaddy shared hosting)
  app.use(compression({
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
    // Lower compression level on shared hosting to reduce CPU usage
    level: isGoDaddyHosting ? 4 : 6,
    // Set compression threshold (only compress files larger than this)
    threshold: 1024, // 1KB
    // Memory limit for compression (important on shared hosting)
    memLevel: isGoDaddyHosting ? 7 : 8, // Lower memory usage on shared hosting
  }));

  // General rate limiting
  app.use('/api/', generalLimiter);
  
  // Specific rate limiting for auth endpoints
  app.use('/api/auth/login', authLimiter);
  app.use('/api/auth/register', authLimiter);
  
  // Contact form rate limiting
  app.use('/api/contact', contactLimiter);

  // Additional security headers (GoDaddy optimized)
  app.use((req, res, next) => {
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    
    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Enable XSS filter
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Referrer policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Permissions policy
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    // GoDaddy-specific optimizations
    if (isGoDaddyHosting) {
      // Trust proxy headers from GoDaddy's load balancer
      res.setHeader('X-Forwarded-Proto', req.headers['x-forwarded-proto'] || 'https');
      
      // Optimize for shared hosting environment
      res.setHeader('Server-Timing', 'cache;desc="GoDaddy Optimized"');
      
      // Enable keep-alive for better performance on shared hosting
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('Keep-Alive', 'timeout=15, max=100');
    }
    
    // Cache control for security
    if (req.url.includes('/api/')) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    } else if (req.url.includes('/assets/')) {
      // Optimize static asset caching for GoDaddy
      const cacheMaxAge = isGoDaddyHosting ? 86400 : 31536000; // 1 day vs 1 year
      res.setHeader('Cache-Control', `public, max-age=${cacheMaxAge}, immutable`);
    }
    
    next();
  });
}

/**
 * CSRF protection token generator
 */
export function generateCSRFToken(): string {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Validate CSRF token middleware
 */
export function validateCSRFToken(req: any, res: any, next: any): void {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const token = req.headers['x-csrf-token'] || req.body._csrf;
    const sessionToken = req.session?.csrfToken;
    
    if (!token || token !== sessionToken) {
      res.status(403).json({ error: 'Invalid CSRF token' });
      return;
    }
  }
  next();
}
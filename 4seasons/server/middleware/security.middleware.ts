import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import crypto from 'crypto';
import { Express } from 'express';

// CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || ['https://4seasonsrealestate.com']
    : ['http://localhost:5000', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  maxAge: 86400, // 24 hours
};

// Rate limiting configurations (optimized for GoDaddy shared hosting)
const isGoDaddyHosting = process.env.HOSTING_PROVIDER === 'godaddy';

// Redis store for rate limiting in production
let redisStore: any = null;
// Disabled Redis for development to avoid ES module compatibility issues
if (false && process.env.REDIS_URL && process.env.NODE_ENV === 'production') {
  try {
    // Redis functionality disabled for ES module compatibility
    console.warn('Redis rate limiter setup disabled, using memory store');
  } catch (error) {
    console.warn('Redis rate limiter setup failed, using memory store:', error);
  }
}

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isGoDaddyHosting ? 50 : 100, // More restrictive on shared hosting
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  store: redisStore || undefined, // Use Redis in production, memory otherwise
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  skipSuccessfulRequests: true,
  store: redisStore || undefined, // Use Redis in production, memory otherwise
});

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 API requests per minute
  message: 'API rate limit exceeded, please slow down.',
  store: redisStore || undefined, // Use Redis in production, memory otherwise
});

// Contact form rate limiter (strict)
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 contact form submissions per hour
  message: 'Too many contact form submissions, please try again later.',
  store: redisStore || undefined, // Use Redis in production, memory otherwise
});

/**
 * Generate a cryptographically secure nonce for CSP
 */
function generateCSPNonce(): string {
  return crypto.randomBytes(16).toString('base64');
}

/**
 * Helper function to get CSP nonce for templates
 */
export function getCSPNonce(res: any): string {
  return res.locals.nonce || '';
}

/**
 * Apply all security middleware to Express app
 */
export function applySecurityMiddleware(app: Express): void {
  // CSP nonce middleware - generates a unique nonce per request
  app.use((req: any, res: any, next: any) => {
    res.locals.nonce = generateCSPNonce();
    next();
  });
  // Helmet for security headers with nonce-based CSP
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: process.env.NODE_ENV === 'production'
          ? ["'self'", (req: any, res: any) => `'nonce-${res.locals.nonce}'`, "https://fonts.googleapis.com"]
          : ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        scriptSrc: process.env.NODE_ENV === 'production'
          ? [
              "'self'",
              (req: any, res: any) => `'nonce-${res.locals.nonce}'`,
              "https://www.googletagmanager.com",
              "https://www.google-analytics.com",
              "https://matrix.ntreis.net",
              "https://*.ntreis.net",
              "https://www.gstatic.com",
              "https://maps.googleapis.com",
              "https://maps.gstatic.com",
              "'unsafe-hashes'",
              "'sha256-YII3g0mxKW4fLePjm5RTFdzQFCd3xjyxjDra07L6Snc='"
            ]
          : [
              "'self'",
              "'unsafe-inline'",
              "https://www.googletagmanager.com",
              "https://www.google-analytics.com",
              "https://matrix.ntreis.net",
              "https://*.ntreis.net",
              "https://www.gstatic.com",
              "https://maps.googleapis.com",
              "https://maps.gstatic.com",
              "'unsafe-hashes'"
            ],
        scriptSrcAttr: [
              "'unsafe-hashes'",
              "'unsafe-inline'",
              "'sha256-YII3g0mxKW4fLePjm5RTFdzQFCd3xjyxjDra07L6Snc='",
              "'sha256-MMVuWs7THTh9xev3rCcF4h9A6GqJa4CpxZj2IN/M8gg='",
              "'sha256-OtMPQCSChVNouOQhkVqNRnSmzS29ng3k1opRUPZq9aA='",
              "'sha256-5aJUhIJVsExQ4Qtm2d/gO+PH4nBeJFnLHymZ/B0IEN8='",
              "'sha256-u2lKrGV1iyrNzco55+a/09ZldlolPFSA6bV2Kx4B7a8='",
              "'sha256-VAkP1/Mr4XpxSyLHtXy5FRh18xrYULOc5tExT/NuWpU='",
              "'sha256-uDePbro9hlpTPAcH+9+4RLbTPcyG54T4OnVlFlD/5Zw='",
              "'sha256-KteFbIvG6nQ7jdAGnjj/Bs++cbBFS8ivzH3O7bGWaJc='",
              "'sha256-wsrPUfrp4hIgbU4ijF2qkMnDcnJ+8JQuMMF6WdUZzW8='",
              "'sha256-i3nZOWsB2E8TvUZB+KsJwTWVCUpFzrQUWtdTwxqnE/w='",
              "'sha256-5f/ctfy8L8IjnhPktM9JWSkLnQ5j0RD7Y8W688HLMZ8='",
              "'sha256-H1QNzQ2fUjuFkFsLXKzm2BzX/b3Ch6/pHWLURy+vmp0='",
              "'sha256-Cg4UhVNhtxGtWuXgFBMG9M3pvBQYKIc7YcDpRNNIbCE='",
              "'sha256-3gNs0EzKbTxWMo7U5ub4FRv4WTHKBkQuuRaas9Yrd8Y='",
              "'sha256-uOpm+owJjWYS54t+9jpaH1LHQIK35IfMOlyvTb1slhc='",
              "'sha256-K4oHIOKnP6+sNr0SIfzUxqAm2dzVrwwvF6s/6vak8Ko='",
              "'sha256-3hChORQf6/ZI34cIrNcvKegPCXWV1SiiKgFIcm93Kp8='",
              "'sha256-N4kuDLiwmbxApdwAWwFWPMYsQMR1Q6dzmlwWzZjjdHo='",
              "'sha256-i4kCQP+dqT3fI5V65Gw+fCarPTbfNPz+slNmMB/pRAY='",
              "'sha256-omj5NUdgZhR/hmzt7uBClBs7hafR7jvwws/Oi5NEaLM='",
              "'sha256-9s8BIDG6n0SXPqisPSZrZSet0sT4YADcXI5U9+4kZgs='",
              "'sha256-u3CoeH9YuO1DrX2RzxP1BXH8qw6NifxW4HemgNh3vTk='",
              "'sha256-YZBkn0D7C/xoXuIGBZNWhSQJnRcCczKoBotGz4Wo0WE='",
              "'sha256-fUUukTQLu8ODjr5kxB9P/2gIfBf4Qz+H3HElvqwWChc='"
            ],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: [
          "'self'",
          "https://www.google-analytics.com",
          "https://api.4seasonsrealestate.com",
          "https://matrix.ntreis.net",
          "https://*.ntreis.net",
          "https://maps.googleapis.com",
          "https://maps.gstatic.com",
          "https://www.gstatic.com",
          "https://khms0.googleapis.com",
          "https://khms1.googleapis.com",
          "https://khms2.googleapis.com",
          "https://khms3.googleapis.com"
        ],
        frameSrc: [
          "'self'",
          "https://matrix.ntreis.net",
          "https://*.ntreis.net",
          "https://ntreis.net",
          "http://localhost:*",
          "data:" // Allow data URIs for iframe content
        ],
        frameAncestors: [
          "'self'",
          "https://matrix.ntreis.net",
          "https://*.ntreis.net",
          "https://ntreis.net"
        ],
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
    // Conditional X-Frame-Options for MLS proxy routes
    if (req.path.startsWith('/api/mls/')) {
      // Allow framing for MLS proxy content (NTREIS iframe support)
      res.setHeader('X-Frame-Options', 'ALLOWALL');
    } else {
      // Prevent clickjacking for all other routes
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    }
    
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


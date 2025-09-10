import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { redisService } from '../services/redis';
import { logger } from '../logger';
import crypto from 'crypto';

// Redis session store
let redisStore: any = null;

// Initialize Redis store if available
async function initializeRedisStore() {
  try {
    const isRedisConnected = await redisService.connect();
    
    if (isRedisConnected) {
      const redisClient = redisService.getClient();
      if (redisClient) {
        redisStore = new RedisStore({
          client: redisClient,
          prefix: 'sess:',
          ttl: 24 * 60 * 60, // 24 hours in seconds
          disableTouch: false,
          disableTTL: false
        });
        
        logger.info('Session: Redis store initialized successfully');
        return redisStore;
      }
    }
  } catch (error) {
    logger.error('Session: Failed to initialize Redis store', error);
  }
  
  return null;
}

// Validate session secret
function validateSessionSecret(secret: string | undefined): string {
  if (!secret) {
    throw new Error('SESSION_SECRET environment variable is required');
  }
  
  // Minimum length requirement
  if (secret.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters long');
  }
  
  // Check for common weak patterns
  const weakPatterns = [
    'password', 'secret', 'changeme', 'default', '123456', 
    'development', 'test', 'admin', 'root', 'fallback'
  ];
  
  const lowerSecret = secret.toLowerCase();
  for (const pattern of weakPatterns) {
    if (lowerSecret.includes(pattern)) {
      throw new Error(`SESSION_SECRET contains weak pattern: ${pattern}`);
    }
  }
  
  return secret;
}

const VALIDATED_SESSION_SECRET = validateSessionSecret(process.env.SESSION_SECRET);

// Session configuration
const sessionConfig = {
  // Session settings
  name: process.env.SESSION_NAME || 'sid',
  secret: VALIDATED_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true, // Reset expiration on activity
  
  // Security settings
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS
    maxAge: parseInt(process.env.SESSION_MAX_AGE || '3600000'), // Default 1 hour
    sameSite: 'strict' as const, // CSRF protection
    domain: process.env.COOKIE_DOMAIN || undefined,
    path: '/' // Restrict cookie path
  },
  
  // Additional security
  genid: () => {
    // Generate cryptographically secure session IDs
    return crypto.randomBytes(32).toString('hex');
  },
  
  // Store will be set dynamically
  store: undefined as any
};

// Create session middleware
export async function createSessionMiddleware() {
  try {
    // Try to initialize Redis store first
    const redisStore = await initializeRedisStore();
    
    if (redisStore) {
      sessionConfig.store = redisStore;
      logger.info('Session: Using Redis store for sessions');
    } else {
      // Fallback to default memory store (development only)
      if (process.env.NODE_ENV === 'development') {
        // Don't set a store - express-session will use its default MemoryStore
        logger.warn('Session: Using default memory store (development only)');
      } else {
        logger.error('Session: No session store available in production');
        throw new Error('Session store required in production');
      }
    }
    
    return session(sessionConfig);
  } catch (error) {
    logger.error('Session: Failed to create session middleware', error);
    throw error;
  }
}

// Session utilities
export class SessionManager {
  /**
   * Get user session data
   */
  static getUser(req: any): any {
    return req.session?.user || null;
  }

  /**
   * Set user session data with fixation protection
   */
  static async setUser(req: any, user: any): Promise<void> {
    if (!req.session) {
      throw new Error('Session not available');
    }
    
    // Regenerate session ID to prevent fixation attacks
    await this.regenerateSession(req);
    
    // Set user data with login timestamp
    req.session.user = {
      ...user,
      loginAt: new Date(),
      lastActivity: new Date(),
      ipAddress: this.getClientIP(req),
      userAgent: req.headers['user-agent'] || 'unknown'
    };
  }

  /**
   * Clear user session
   */
  static clearUser(req: any): void {
    if (req.session) {
      delete req.session.user;
    }
  }

  /**
   * Destroy session completely
   */
  static async destroySession(req: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!req.session) {
        resolve();
        return;
      }
      
      req.session.destroy((error: any) => {
        if (error) {
          logger.error('Session: Failed to destroy session', error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Regenerate session ID (after login)
   */
  static async regenerateSession(req: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!req.session) {
        resolve();
        return;
      }
      
      req.session.regenerate((error: any) => {
        if (error) {
          logger.error('Session: Failed to regenerate session', error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Update session activity timestamp
   */
  static touchSession(req: any): void {
    if (req.session && req.session.user) {
      req.session.user.lastActivity = new Date();
      req.session.touch();
    }
  }

  /**
   * Get client IP address
   */
  static getClientIP(req: any): string {
    return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
           req.headers['x-real-ip'] ||
           req.connection?.remoteAddress ||
           req.socket?.remoteAddress ||
           req.ip ||
           'unknown';
  }

  /**
   * Validate session security (IP, timeout, etc.)
   */
  static validateSession(req: any): { valid: boolean; reason?: string } {
    if (!req.session?.user) {
      return { valid: false, reason: 'No user session' };
    }

    const user = req.session.user;
    const now = new Date();

    // Check session timeout (configurable, default 8 hours)
    const maxSessionAge = parseInt(process.env.SESSION_TIMEOUT || '28800000'); // 8 hours in ms
    const sessionAge = now.getTime() - new Date(user.loginAt).getTime();
    
    if (sessionAge > maxSessionAge) {
      return { valid: false, reason: 'Session expired (max age)' };
    }

    // Check inactivity timeout (configurable, default 2 hours)
    const maxInactivity = parseInt(process.env.SESSION_INACTIVITY_TIMEOUT || '7200000'); // 2 hours in ms
    const inactivityTime = now.getTime() - new Date(user.lastActivity).getTime();
    
    if (inactivityTime > maxInactivity) {
      return { valid: false, reason: 'Session expired (inactivity)' };
    }

    // Optional: Check IP consistency (can be disabled with env var)
    if (process.env.SESSION_STRICT_IP === 'true') {
      const currentIP = this.getClientIP(req);
      if (user.ipAddress && user.ipAddress !== currentIP) {
        return { valid: false, reason: 'IP address mismatch' };
      }
    }

    return { valid: true };
  }

  /**
   * Extend session expiration
   */
  static extendSession(req: any, additionalTime: number = 3600000): boolean {
    if (!req.session?.user) {
      return false;
    }

    try {
      const newMaxAge = (req.session.cookie.maxAge || 0) + additionalTime;
      req.session.cookie.maxAge = newMaxAge;
      this.touchSession(req);
      return true;
    } catch (error) {
      logger.error('Session: Failed to extend session', error);
      return false;
    }
  }

  /**
   * Check if session is authenticated
   */
  static isAuthenticated(req: any): boolean {
    return !!(req.session?.user);
  }

  /**
   * Get session statistics (admin only)
   */
  static async getSessionStats(): Promise<{
    storeType: string;
    sessionCount?: number;
    error?: string;
  }> {
    if (!RedisStore) {
      return {
        storeType: 'memory',
        sessionCount: -1
      };
    }

    try {
      const redisClient = redisService.getClient();
      if (!redisClient) {
        throw new Error('Redis client not available');
      }

      // Count sessions in Redis
      const keys = await redisClient.keys('sess:*');
      
      return {
        storeType: 'redis',
        sessionCount: keys.length
      };
    } catch (error) {
      return {
        storeType: 'redis',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Clean expired sessions (if using memory store)
   */
  static async cleanExpiredSessions(): Promise<number> {
    if (RedisStore) {
      // Redis handles TTL automatically
      return 0;
    }

    // For memory store, this would be handled by memorystore itself
    return 0;
  }
}

// Express session type extension
declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
      username: string;
      email: string;
      role?: string;
      loginAt: Date;
      lastActivity: Date;
      ipAddress: string;
      userAgent: string;
      sessionVersion?: number;
    };
    returnTo?: string;
    twoFactorPending?: boolean;
    csrfToken?: string;
  }
}

// Middleware for requiring authentication with security validation
export function requireAuth(req: any, res: any, next: any): void {
  if (!SessionManager.isAuthenticated(req)) {
    return res.status(401).json({
      error: 'Authentication required',
      message: 'Please log in to access this resource'
    });
  }

  // Validate session security
  const validation = SessionManager.validateSession(req);
  if (!validation.valid) {
    // Log security event
    logger.warn('Session validation failed', {
      userId: req.session?.user?.id,
      reason: validation.reason,
      ip: SessionManager.getClientIP(req),
      userAgent: req.headers['user-agent']
    });

    // Destroy invalid session
    req.session?.destroy(() => {});
    
    return res.status(401).json({
      error: 'Session invalid',
      message: 'Your session has expired. Please log in again.',
      reason: validation.reason
    });
  }

  // Update activity timestamp
  SessionManager.touchSession(req);
  next();
}

// Middleware for requiring specific roles
export function requireRole(roles: string | string[]) {
  const requiredRoles = Array.isArray(roles) ? roles : [roles];
  
  return (req: any, res: any, next: any): void => {
    if (!SessionManager.isAuthenticated(req)) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'Please log in to access this resource'
      });
    }

    const user = SessionManager.getUser(req);
    const userRole = user.role || 'user';

    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        message: 'You do not have permission to access this resource'
      });
    }

    SessionManager.touchSession(req);
    next();
  };
}

// Middleware to save return URL for redirect after login
export function saveReturnTo(req: any, res: any, next: any): void {
  if (!SessionManager.isAuthenticated(req) && req.method === 'GET') {
    if (req.session) {
      req.session.returnTo = req.originalUrl;
    }
  }
  next();
}

// Middleware to validate all sessions (can be used globally)
export function validateSessionMiddleware(req: any, res: any, next: any): void {
  // Skip validation for public endpoints
  const publicPaths = [
    '/health',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/logout',
    '/favicon.ico'
  ];

  const isPublicPath = publicPaths.some(path => req.path.startsWith(path));
  if (isPublicPath || !req.session?.user) {
    return next();
  }

  // Validate existing session
  const validation = SessionManager.validateSession(req);
  if (!validation.valid) {
    logger.warn('Session validation failed in middleware', {
      userId: req.session?.user?.id,
      reason: validation.reason,
      path: req.path,
      ip: SessionManager.getClientIP(req)
    });

    // Destroy invalid session
    req.session?.destroy(() => {});
  } else {
    // Update activity for valid sessions
    SessionManager.touchSession(req);
  }

  next();
}

// Middleware to prevent concurrent sessions (optional)
export function preventConcurrentSessions(req: any, res: any, next: any): void {
  if (!req.session?.user || process.env.ALLOW_CONCURRENT_SESSIONS === 'true') {
    return next();
  }

  // This would require additional implementation to track sessions per user
  // For now, just pass through
  next();
}

// Health check for session store
export async function sessionHealthCheck(): Promise<{
  status: 'healthy' | 'unhealthy';
  store: string;
  details?: any;
}> {
  try {
    if (RedisStore) {
      const redisHealth = await redisService.healthCheck();
      return {
        status: redisHealth.status,
        store: 'redis',
        details: redisHealth
      };
    } else {
      return {
        status: 'healthy',
        store: 'memory'
      };
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      store: RedisStore ? 'redis' : 'memory',
      details: { error: error instanceof Error ? error.message : 'Unknown error' }
    };
  }
}
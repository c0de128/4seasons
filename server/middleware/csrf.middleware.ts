import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger';

// CSRF token configuration
const CSRF_TOKEN_LENGTH = 32;
const CSRF_TOKEN_HEADER = 'x-csrf-token';
const CSRF_COOKIE_NAME = 'csrf-token';
const CSRF_SESSION_KEY = 'csrfToken';

// HTTP methods that require CSRF protection
const PROTECTED_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

// Routes that should be excluded from CSRF protection
const CSRF_EXEMPT_ROUTES = [
  '/api/auth/login',
  '/api/auth/register',
  '/health',
  '/api/health'
];

interface CSRFOptions {
  secret?: string;
  cookieName?: string;
  headerName?: string;
  exemptRoutes?: string[];
  sameSite?: 'strict' | 'lax' | 'none';
  secure?: boolean;
  httpOnly?: boolean;
  maxAge?: number;
}

export class CSRFProtection {
  private secret: string;
  private cookieName: string;
  private headerName: string;
  private exemptRoutes: string[];
  private cookieOptions: {
    sameSite: 'strict' | 'lax' | 'none';
    secure: boolean;
    httpOnly: boolean;
    maxAge: number;
  };

  constructor(options: CSRFOptions = {}) {
    this.secret = options.secret || process.env.CSRF_SECRET || this.generateSecret();
    this.cookieName = options.cookieName || CSRF_COOKIE_NAME;
    this.headerName = options.headerName || CSRF_TOKEN_HEADER;
    this.exemptRoutes = options.exemptRoutes || CSRF_EXEMPT_ROUTES;
    
    this.cookieOptions = {
      sameSite: options.sameSite || 'strict',
      secure: options.secure ?? (process.env.NODE_ENV === 'production'),
      httpOnly: options.httpOnly ?? false, // Must be false for client-side access
      maxAge: options.maxAge || 3600000 // 1 hour
    };

    // Validate secret
    if (!this.secret || this.secret.length < 32) {
      throw new Error('CSRF secret must be at least 32 characters long');
    }
  }

  /**
   * Generate a cryptographically secure secret
   */
  private generateSecret(): string {
    return crypto.randomBytes(64).toString('hex');
  }

  /**
   * Generate a CSRF token
   */
  generateToken(sessionId?: string): string {
    const timestamp = Date.now().toString();
    const randomBytes = crypto.randomBytes(CSRF_TOKEN_LENGTH / 2).toString('hex');
    const payload = `${timestamp}:${randomBytes}:${sessionId || 'anonymous'}`;
    
    const hmac = crypto.createHmac('sha256', this.secret);
    hmac.update(payload);
    const signature = hmac.digest('hex');
    
    // Combine payload and signature
    const token = Buffer.from(`${payload}:${signature}`).toString('base64');
    return token;
  }

  /**
   * Verify a CSRF token
   */
  verifyToken(token: string, sessionId?: string): { valid: boolean; reason?: string } {
    if (!token) {
      return { valid: false, reason: 'No CSRF token provided' };
    }

    try {
      // Decode token
      const decoded = Buffer.from(token, 'base64').toString('utf8');
      const parts = decoded.split(':');
      
      if (parts.length !== 4) {
        return { valid: false, reason: 'Invalid token format' };
      }

      const [timestamp, randomBytes, tokenSessionId, signature] = parts;
      
      // Verify signature
      const payload = `${timestamp}:${randomBytes}:${tokenSessionId}`;
      const hmac = crypto.createHmac('sha256', this.secret);
      hmac.update(payload);
      const expectedSignature = hmac.digest('hex');
      
      if (!crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedSignature, 'hex'))) {
        return { valid: false, reason: 'Invalid token signature' };
      }

      // Check session ID match (if provided)
      if (sessionId && tokenSessionId !== 'anonymous' && tokenSessionId !== sessionId) {
        return { valid: false, reason: 'Token session mismatch' };
      }

      // Check token age (tokens expire after maxAge)
      const tokenTime = parseInt(timestamp);
      const now = Date.now();
      const maxAge = this.cookieOptions.maxAge;
      
      if (now - tokenTime > maxAge) {
        return { valid: false, reason: 'Token expired' };
      }

      return { valid: true };
    } catch (error) {
      return { valid: false, reason: 'Token validation error' };
    }
  }

  /**
   * Check if route should be exempt from CSRF protection
   */
  private isExemptRoute(path: string): boolean {
    return this.exemptRoutes.some(route => {
      // Support wildcard matching
      if (route.endsWith('*')) {
        return path.startsWith(route.slice(0, -1));
      }
      return path === route || path.startsWith(route + '/');
    });
  }

  /**
   * Get CSRF token from request
   */
  private getTokenFromRequest(req: Request): string | null {
    // Check header first
    let token = req.get(this.headerName);
    
    if (!token) {
      // Check body (for form submissions)
      token = req.body?._csrf || req.body?.csrfToken;
    }
    
    if (!token) {
      // Check query parameters (as fallback)
      token = req.query._csrf as string || req.query.csrfToken as string;
    }
    
    return token || null;
  }

  /**
   * Middleware to set CSRF token
   */
  setToken = (req: any, res: Response, next: NextFunction): void => {
    try {
      const sessionId = req.session?.id || req.sessionID;
      
      // Generate new token
      const token = this.generateToken(sessionId);
      
      // Set cookie
      res.cookie(this.cookieName, token, this.cookieOptions);
      
      // Store in session for validation
      if (req.session) {
        req.session[CSRF_SESSION_KEY] = token;
      }
      
      // Make token available to response
      res.locals.csrfToken = token;
      
      next();
    } catch (error) {
      logger.error('CSRF token generation failed', error);
      res.status(500).json({ error: 'Failed to generate CSRF token' });
    }
  };

  /**
   * Middleware to verify CSRF token
   */
  verifyToken = (req: any, res: Response, next: NextFunction): void => {
    const method = req.method.toUpperCase();
    
    // Skip verification for non-protected methods
    if (!PROTECTED_METHODS.includes(method)) {
      return next();
    }
    
    // Skip verification for exempt routes
    if (this.isExemptRoute(req.path)) {
      return next();
    }
    
    try {
      const sessionId = req.session?.id || req.sessionID;
      const providedToken = this.getTokenFromRequest(req);
      
      if (!providedToken) {
        logger.warn('CSRF protection: No token provided', {
          method,
          path: req.path,
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          userId: req.user?.id
        });
        
        return res.status(403).json({
          error: 'CSRF token required',
          message: 'This request requires a valid CSRF token'
        });
      }
      
      // Verify token
      const verification = this.verifyToken(providedToken, sessionId);
      
      if (!verification.valid) {
        logger.warn('CSRF protection: Invalid token', {
          method,
          path: req.path,
          reason: verification.reason,
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          userId: req.user?.id
        });
        
        return res.status(403).json({
          error: 'Invalid CSRF token',
          message: verification.reason || 'CSRF token validation failed'
        });
      }
      
      // Optionally rotate token after successful verification
      if (process.env.CSRF_ROTATE_TOKENS === 'true') {
        const newToken = this.generateToken(sessionId);
        res.cookie(this.cookieName, newToken, this.cookieOptions);
        
        if (req.session) {
          req.session[CSRF_SESSION_KEY] = newToken;
        }
        
        res.locals.csrfToken = newToken;
      }
      
      next();
    } catch (error) {
      logger.error('CSRF token verification error', {
        error,
        method,
        path: req.path,
        userId: req.user?.id
      });
      
      res.status(500).json({
        error: 'CSRF verification failed',
        message: 'Unable to verify CSRF token'
      });
    }
  };

  /**
   * Get token for client-side use
   */
  getToken = (req: any, res: Response): void => {
    const token = res.locals.csrfToken || req.session?.[CSRF_SESSION_KEY];
    
    if (!token) {
      return res.status(400).json({
        error: 'No CSRF token available',
        message: 'CSRF token not found. Please refresh the page.'
      });
    }
    
    res.json({
      csrfToken: token,
      headerName: this.headerName,
      cookieName: this.cookieName
    });
  };
}

// Create default CSRF protection instance
export const csrfProtection = new CSRFProtection();

// Convenience middlewares
export const setCSRFToken = csrfProtection.setToken;
export const verifyCSRFToken = csrfProtection.verifyToken;
export const getCSRFToken = csrfProtection.getToken;
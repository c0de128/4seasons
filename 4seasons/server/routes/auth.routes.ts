import { Router, Request, Response } from 'express';
import { authService } from '../auth';
import { authenticate } from '../middleware/auth.middleware';
import { validateLogin, validateRegister } from '../middleware/validation.middleware';
import { authLimiter } from '../middleware/security.middleware';
import { logger, auditLog } from '../logger';

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', authLimiter, validateRegister, async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body);
    
    // Log successful registration
    logger.info('New user registered', { username: result.user.username });
    auditLog('USER_REGISTERED', result.user.id, { username: result.user.username });
    
    res.status(201).json({
      success: true,
      user: result.user,
      token: result.token,
    });
  } catch (error: any) {
    logger.warn('Registration failed', { error: error.message, username: req.body.username });
    
    if (error.message === 'Username already exists') {
      res.status(409).json({ error: error.message });
    } else if (error.message.includes('Password')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Registration failed' });
    }
  }
});

/**
 * POST /api/auth/login
 * Login a user
 */
router.post('/login', authLimiter, validateLogin, async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    
    // Log successful login
    logger.info('User logged in', { username: result.user.username });
    auditLog('USER_LOGIN', result.user.id, { username: result.user.username });
    
    res.json({
      success: true,
      user: result.user,
      token: result.token,
    });
  } catch (error: any) {
    logger.warn('Login failed', { error: error.message, username: req.body.username });
    
    // Don't reveal whether username or password was wrong
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

/**
 * POST /api/auth/refresh
 * Refresh JWT token
 */
router.post('/refresh', authenticate, async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const newToken = await authService.refreshToken(token);

    res.json({
      success: true,
      token: newToken,
    });
  } catch (error: any) {
    logger.warn('Token refresh failed', { error: error.message });
    res.status(401).json({ error: 'Token refresh failed' });
  }
});

/**
 * GET /api/auth/me
 * Get current user information
 */
router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }
    
    const user = await authService.validateToken(token);
    
    if (!user) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    
    res.json({
      success: true,
      user,
    });
  } catch (error: any) {
    logger.error('Failed to get user info', error);
    res.status(500).json({ error: 'Failed to get user information' });
  }
});

/**
 * POST /api/auth/logout
 * Logout a user and blacklist their token
 */
router.post('/logout', authenticate, async (req: Request, res: Response) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      // Blacklist the token
      await authService.logout(token);
    }

    // Log logout
    if (req.user) {
      logger.info('User logged out', { userId: req.user.id });
      auditLog('USER_LOGOUT', req.user.id, { username: req.user.username });
    }

    // Destroy session if exists
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          logger.error('Failed to destroy session during logout', err);
        }
      });
    }

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error: any) {
    logger.error('Logout error', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

export default router;
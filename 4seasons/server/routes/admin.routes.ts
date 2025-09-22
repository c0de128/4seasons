import { Router, Request, Response } from 'express';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { UserRole } from '@shared/schema';
import { storage } from '../storage';
import { logger, auditLog } from '../logger';
import { redisService } from '../services/redis';

const router = Router();

/**
 * All admin routes require authentication and admin role
 */
router.use(authenticate);
router.use(requireRole(UserRole.ADMIN));

/**
 * GET /api/admin/users
 * List all users (admin only)
 */
router.get('/users', async (req: Request, res: Response) => {
  try {
    // Audit admin action
    auditLog('ADMIN_VIEW_USERS', req.user!.id, { action: 'list_users' });

    // In a real app, implement pagination and filtering
    // For now, return placeholder response
    res.json({
      success: true,
      message: 'User list endpoint - implement storage.getAllUsers()',
      users: [],
      total: 0,
      page: 1,
      pageSize: 20
    });
  } catch (error) {
    logger.error('Failed to list users', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

/**
 * GET /api/admin/users/:id
 * Get specific user details (admin only)
 */
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    // Audit admin action
    auditLog('ADMIN_VIEW_USER', req.user!.id, { targetUserId: userId });

    const user = await storage.getUser(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    res.json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    logger.error('Failed to get user', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

/**
 * PATCH /api/admin/users/:id/role
 * Update user role (admin only)
 */
router.patch('/users/:id/role', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    // Validate role
    if (!Object.values(UserRole).includes(role)) {
      res.status(400).json({
        error: 'Invalid role',
        validRoles: Object.values(UserRole)
      });
      return;
    }

    // Prevent admin from changing their own role
    if (userId === req.user!.id) {
      res.status(403).json({ error: 'Cannot change your own role' });
      return;
    }

    // Audit admin action
    auditLog('ADMIN_CHANGE_USER_ROLE', req.user!.id, {
      targetUserId: userId,
      newRole: role
    });

    // In a real app, implement storage.updateUserRole()
    res.json({
      success: true,
      message: 'Role update endpoint - implement storage.updateUserRole()',
      userId,
      newRole: role
    });
  } catch (error) {
    logger.error('Failed to update user role', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

/**
 * POST /api/admin/users/:id/deactivate
 * Deactivate user account (admin only)
 */
router.post('/users/:id/deactivate', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    // Prevent admin from deactivating themselves
    if (userId === req.user!.id) {
      res.status(403).json({ error: 'Cannot deactivate your own account' });
      return;
    }

    // Audit admin action
    auditLog('ADMIN_DEACTIVATE_USER', req.user!.id, {
      targetUserId: userId
    });

    // In a real app, implement storage.deactivateUser()
    res.json({
      success: true,
      message: 'User deactivation endpoint - implement storage.deactivateUser()',
      userId
    });
  } catch (error) {
    logger.error('Failed to deactivate user', error);
    res.status(500).json({ error: 'Failed to deactivate user' });
  }
});

/**
 * GET /api/admin/system/stats
 * Get system statistics (admin only)
 */
router.get('/system/stats', async (req: Request, res: Response) => {
  try {
    // Audit admin action
    auditLog('ADMIN_VIEW_STATS', req.user!.id, {});

    // Get Redis stats if available
    const redisHealth = await redisService.healthCheck();
    const blacklistCount = await redisService.getBlacklistCount();

    res.json({
      success: true,
      stats: {
        redis: redisHealth,
        blacklistedTokens: blacklistCount,
        // Add more system stats as needed
      }
    });
  } catch (error) {
    logger.error('Failed to get system stats', error);
    res.status(500).json({ error: 'Failed to retrieve system statistics' });
  }
});

/**
 * POST /api/admin/cache/clear
 * Clear application cache (admin only)
 */
router.post('/cache/clear', async (req: Request, res: Response) => {
  try {
    // Audit admin action
    auditLog('ADMIN_CLEAR_CACHE', req.user!.id, {});

    if (process.env.NODE_ENV === 'production') {
      res.status(403).json({ error: 'Cache clearing disabled in production' });
      return;
    }

    // Clear Redis cache
    const success = await redisService.flushAll();

    res.json({
      success,
      message: success ? 'Cache cleared successfully' : 'Failed to clear cache'
    });
  } catch (error) {
    logger.error('Failed to clear cache', error);
    res.status(500).json({ error: 'Failed to clear cache' });
  }
});

/**
 * Moderator routes - accessible by both admin and moderator
 */
const moderatorRouter = Router();
moderatorRouter.use(authenticate);
moderatorRouter.use(requireRole([UserRole.ADMIN, UserRole.MODERATOR]));

/**
 * GET /api/admin/audit-logs
 * View audit logs (admin and moderator)
 */
moderatorRouter.get('/audit-logs', async (req: Request, res: Response) => {
  try {
    // Audit the audit log access
    auditLog('VIEW_AUDIT_LOGS', req.user!.id, {});

    // In a real app, implement audit log retrieval
    res.json({
      success: true,
      message: 'Audit logs endpoint - implement audit log retrieval',
      logs: [],
      total: 0
    });
  } catch (error) {
    logger.error('Failed to get audit logs', error);
    res.status(500).json({ error: 'Failed to retrieve audit logs' });
  }
});

// Mount moderator routes
router.use('/', moderatorRouter);

export default router;
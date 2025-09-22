import { Router } from 'express';
import { securityScanner } from '../services/security-scanner';
import { logger } from '../logger';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

// Apply authentication middleware - only admin users can access security routes
router.use(requireAuth);
router.use(requireRole('admin'));

/**
 * Run comprehensive security scan
 */
router.post('/scan', async (req, res) => {
  try {
    logger.info('Security scan requested', { user: req.user?.id });
    
    const result = await securityScanner.runFullScan();
    
    if (result.success) {
      const totalIssues = result.scans.reduce((sum, scan) => sum + scan.summary.total, 0);
      const criticalIssues = result.scans.reduce((sum, scan) => sum + scan.summary.critical, 0);
      
      logger.info('Security scan completed', {
        totalIssues,
        criticalIssues,
        scanTypes: result.scans.length
      });
      
      res.json({
        success: true,
        message: 'Security scan completed',
        summary: {
          totalScans: result.scans.length,
          totalIssues,
          criticalIssues,
          highIssues: result.scans.reduce((sum, scan) => sum + scan.summary.high, 0),
          mediumIssues: result.scans.reduce((sum, scan) => sum + scan.summary.medium, 0),
          lowIssues: result.scans.reduce((sum, scan) => sum + scan.summary.low, 0)
        },
        scans: result.scans
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    logger.error('Security scan failed', error);
    res.status(500).json({ error: 'Security scan failed' });
  }
});

/**
 * Generate security report
 */
router.post('/report', async (req, res) => {
  try {
    logger.info('Security report requested', { user: req.user?.id });
    
    const result = await securityScanner.runFullScan();
    
    if (result.success) {
      const report = securityScanner.generateSecurityReport(result.scans);
      
      res.set({
        'Content-Type': 'text/markdown',
        'Content-Disposition': `attachment; filename="security-report-${new Date().toISOString().split('T')[0]}.md"`
      });
      
      res.send(report);
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    logger.error('Security report generation failed', error);
    res.status(500).json({ error: 'Security report generation failed' });
  }
});

/**
 * Get security scan status/history
 */
router.get('/status', async (req, res) => {
  try {
    // This would typically fetch from a database or cache
    // For now, return basic status
    res.json({
      scannerReady: true,
      lastScan: null, // Would be populated from database
      scheduledScans: {
        daily: process.env.NODE_ENV === 'production',
        enabled: true
      },
      availableScans: [
        'dependency-vulnerabilities',
        'code-security',
        'environment-security',
        'configuration-security',
        'docker-security'
      ]
    });
  } catch (error) {
    logger.error('Security status check failed', error);
    res.status(500).json({ error: 'Security status check failed' });
  }
});

/**
 * Run specific security scan type
 */
router.post('/scan/:type', async (req, res) => {
  try {
    const { type } = req.params;
    
    logger.info('Specific security scan requested', { 
      user: req.user?.id, 
      scanType: type 
    });
    
    let result;
    
    switch (type) {
      case 'dependencies':
        result = await securityScanner.scanDependencyVulnerabilities();
        break;
      case 'code':
        result = await securityScanner.scanCodeSecurityIssues();
        break;
      case 'environment':
        result = await securityScanner.scanEnvironmentSecurity();
        break;
      case 'configuration':
        result = await securityScanner.scanConfigurationSecurity();
        break;
      case 'docker':
        result = await securityScanner.scanDockerSecurity();
        break;
      default:
        return res.status(400).json({ 
          error: 'Invalid scan type',
          availableTypes: ['dependencies', 'code', 'environment', 'configuration', 'docker']
        });
    }
    
    res.json({
      success: true,
      scan: result
    });
  } catch (error) {
    logger.error('Specific security scan failed', error);
    res.status(500).json({ error: 'Security scan failed' });
  }
});

export default router;
import express from 'express';
import { Request, Response } from 'express';
import { NativeEmailService } from '../services/email-native';
import { logger } from '../logger';

const router = express.Router();

/**
 * Test email configuration and send test email
 * This endpoint helps verify GoDaddy SMTP setup
 */
router.get('/test-connection', async (req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Only allow in development or if explicitly enabled
  if (isProduction && process.env.ENABLE_EMAIL_TEST !== 'true') {
    return res.status(403).json({
      error: 'Email testing disabled in production',
      message: 'Set ENABLE_EMAIL_TEST=true to enable'
    });
  }

  try {
    const emailService = new NativeEmailService();
    const isConnected = await emailService.testConnection();

    res.json({
      success: isConnected,
      message: isConnected 
        ? 'SMTP connection successful - GoDaddy email is configured correctly!'
        : 'SMTP connection failed - check your GoDaddy email credentials',
      config: {
        host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
        port: process.env.SMTP_PORT || '465',
        user: process.env.SMTP_USER || 'Not configured',
        secure: process.env.SMTP_SECURE || 'true',
        hosting: process.env.HOSTING_PROVIDER || 'Unknown'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    logger.error('Email connection test error', error);
    res.status(500).json({
      success: false,
      error: 'Email test failed',
      message: error.message
    });
  }
});

/**
 * Send a test email to verify full email delivery
 */
router.post('/send-test', async (req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Only allow in development or if explicitly enabled
  if (isProduction && process.env.ENABLE_EMAIL_TEST !== 'true') {
    return res.status(403).json({
      error: 'Email testing disabled in production',
      message: 'Set ENABLE_EMAIL_TEST=true to enable'
    });
  }

  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({
      error: 'Email address required',
      message: 'Please provide an email address to send test email to'
    });
  }

  try {
    const emailService = new NativeEmailService();
    
    // Create test email data
    const testData = {
      name: 'Test User',
      email: email,
      phone: '555-0123',
      subject: 'GoDaddy SMTP Test Email',
      message: `This is a test email sent from your 4 Seasons Real Estate application.

If you received this email, your GoDaddy SMTP configuration is working correctly!

Configuration Details:
- SMTP Host: ${process.env.SMTP_HOST || 'smtpout.secureserver.net'}
- SMTP Port: ${process.env.SMTP_PORT || '465'}
- From Email: ${process.env.SMTP_FROM || process.env.SMTP_USER}
- Hosting Provider: ${process.env.HOSTING_PROVIDER || 'Generic'}

Test sent at: ${new Date().toISOString()}`,
      timestamp: new Date()
    };

    const sent = await emailService.sendContactForm(testData);

    if (sent) {
      res.json({
        success: true,
        message: `Test email sent successfully to ${email}`,
        details: 'Check your inbox (and spam folder) for the test email',
        timestamp: new Date().toISOString()
      });
      
      logger.info('Test email sent successfully', { to: email });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to send test email',
        message: 'Check server logs for detailed error information'
      });
    }
  } catch (error: any) {
    logger.error('Send test email error', error);
    res.status(500).json({
      success: false,
      error: 'Test email failed',
      message: error.message
    });
  }
});

/**
 * Get email service status and configuration info
 */
router.get('/status', async (req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Only allow in development or if explicitly enabled
  if (isProduction && process.env.ENABLE_EMAIL_TEST !== 'true') {
    return res.status(403).json({
      error: 'Email status disabled in production',
      message: 'Set ENABLE_EMAIL_TEST=true to enable'
    });
  }

  const config = {
    configured: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
    host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
    port: process.env.SMTP_PORT || '465',
    user: process.env.SMTP_USER ? 
      process.env.SMTP_USER.replace(/(.{2}).*@(.*)/, '$1***@$2') : 
      'Not configured',
    secure: process.env.SMTP_SECURE === 'true',
    fromEmail: process.env.SMTP_FROM || 'Not configured',
    fromName: process.env.SMTP_FROM_NAME || '4 Seasons Real Estate',
    contactEmail: process.env.CONTACT_EMAIL || 'Not configured',
    hostingProvider: process.env.HOSTING_PROVIDER || 'Generic',
    environment: process.env.NODE_ENV || 'development'
  };

  const recommendations = [];
  
  if (!config.configured) {
    recommendations.push('Configure SMTP_USER and SMTP_PASS in your .env file');
  }
  
  if (config.host !== 'smtpout.secureserver.net' && process.env.HOSTING_PROVIDER === 'godaddy') {
    recommendations.push('For GoDaddy hosting, use SMTP_HOST=smtpout.secureserver.net');
  }
  
  if (config.port !== '465' && config.secure) {
    recommendations.push('For secure SMTP, use port 465 with SMTP_SECURE=true');
  }

  res.json({
    status: config.configured ? 'configured' : 'not-configured',
    configuration: config,
    recommendations: recommendations.length > 0 ? recommendations : ['Email configuration looks good!'],
    nextSteps: [
      'Test connection: GET /api/email/test-connection',
      'Send test email: POST /api/email/send-test with {"email": "test@example.com"}'
    ],
    timestamp: new Date().toISOString()
  });
});

export default router;
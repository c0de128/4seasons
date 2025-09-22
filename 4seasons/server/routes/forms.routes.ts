import express from 'express';
import { body, validationResult } from 'express-validator';
import { requireAuth } from '../middleware/session.middleware';
import { contactLimiter, generalLimiter } from '../middleware/security.middleware';
import { nativeEmailService, ContactFormData, PropertyInquiryData } from '../services/email-native';
import { logger } from '../logger';

const router = express.Router();

// Validation middleware for contact form
const contactFormValidation = [
  body('name')
    .trim()
    .escape()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Name contains invalid characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('message')
    .trim()
    .escape()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  
  body('subject')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 200 })
    .withMessage('Subject must not exceed 200 characters'),
  
  body('propertyInterest')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 200 })
    .withMessage('Property interest must not exceed 200 characters'),
  
  body('honeypot')
    .isEmpty()
    .withMessage('Bot detection triggered')
];

// Validation middleware for property inquiry form
const propertyInquiryValidation = [
  body('name')
    .trim()
    .escape()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Name contains invalid characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('propertyId')
    .trim()
    .escape()
    .isLength({ min: 1, max: 50 })
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Property ID contains invalid characters'),
  
  body('propertyAddress')
    .trim()
    .escape()
    .isLength({ min: 5, max: 200 })
    .withMessage('Property address must be between 5 and 200 characters'),
  
  body('message')
    .trim()
    .escape()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  
  body('requestType')
    .isIn(['viewing', 'information', 'offer', 'callback'])
    .withMessage('Invalid request type'),
  
  body('preferredContact')
    .isIn(['email', 'phone', 'both'])
    .withMessage('Invalid preferred contact method'),
  
  body('honeypot')
    .isEmpty()
    .withMessage('Bot detection triggered')
];

// Validation middleware for newsletter signup
const newsletterValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name must not exceed 100 characters'),
  
  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array'),
  
  body('interests.*')
    .optional()
    .isIn(['buying', 'selling', 'renting', 'investing', 'market-updates'])
    .withMessage('Invalid interest selected'),
  
  body('honeypot')
    .isEmpty()
    .withMessage('Bot detection triggered')
];

/**
 * Handle general contact form submissions
 * POST /api/forms/contact
 */
router.post('/contact', contactLimiter, contactFormValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Contact form validation failed', {
        errors: errors.array(),
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const formData: ContactFormData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
      propertyInterest: req.body.propertyInterest,
      source: 'contact-form',
      timestamp: new Date()
    };

    // Attempt to send emails
    const promises = [
      nativeEmailService.sendContactForm(formData),
      nativeEmailService.sendConfirmation(formData)
    ];

    const [businessEmailSent, confirmationSent] = await Promise.all(promises);

    // Log the submission
    logger.info('Contact form submitted', {
      name: formData.name,
      email: formData.email,
      businessEmailSent,
      confirmationSent,
      ip: req.ip
    });

    res.json({
      success: true,
      message: 'Thank you for your message. We\'ll get back to you within 24 hours!',
      emailSent: businessEmailSent,
      confirmationSent
    });

  } catch (error) {
    logger.error('Contact form processing error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      ip: req.ip,
      body: req.body
    });

    res.status(500).json({
      success: false,
      error: 'Failed to process contact form',
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
});

/**
 * Handle property inquiry form submissions
 * POST /api/forms/property-inquiry
 */
router.post('/property-inquiry', generalLimiter, propertyInquiryValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Property inquiry validation failed', {
        errors: errors.array(),
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const inquiryData: PropertyInquiryData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      propertyId: req.body.propertyId,
      propertyAddress: req.body.propertyAddress,
      message: req.body.message,
      requestType: req.body.requestType,
      preferredContact: req.body.preferredContact,
      timestamp: new Date()
    };

    // Attempt to send emails
    const promises = [
      nativeEmailService.sendPropertyInquiry(inquiryData),
      nativeEmailService.sendConfirmation(inquiryData)
    ];

    const [inquiryEmailSent, confirmationSent] = await Promise.all(promises);

    // Log the submission
    logger.info('Property inquiry submitted', {
      name: inquiryData.name,
      email: inquiryData.email,
      propertyId: inquiryData.propertyId,
      requestType: inquiryData.requestType,
      inquiryEmailSent,
      confirmationSent,
      ip: req.ip
    });

    res.json({
      success: true,
      message: 'Thank you for your property inquiry. We\'ll contact you soon!',
      emailSent: inquiryEmailSent,
      confirmationSent
    });

  } catch (error) {
    logger.error('Property inquiry processing error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      ip: req.ip,
      body: req.body
    });

    res.status(500).json({
      success: false,
      error: 'Failed to process property inquiry',
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
});

/**
 * Handle newsletter signup
 * POST /api/forms/newsletter
 */
router.post('/newsletter', generalLimiter, newsletterValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Newsletter signup validation failed', {
        errors: errors.array(),
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const newsletterData = {
      email: req.body.email,
      name: req.body.name || '',
      interests: req.body.interests || [],
      timestamp: new Date(),
      ip: req.ip,
      userAgent: req.get('User-Agent')
    };

    // For now, we'll just log the signup (in production, you'd save to database)
    logger.info('Newsletter signup', newsletterData);

    // TODO: In production, save to database or integrate with email marketing service
    // await saveNewsletterSignup(newsletterData);

    res.json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });

  } catch (error) {
    logger.error('Newsletter signup processing error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      ip: req.ip,
      body: req.body
    });

    res.status(500).json({
      success: false,
      error: 'Failed to process newsletter signup',
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
});

/**
 * Handle home valuation form
 * POST /api/forms/home-valuation
 */
router.post('/home-valuation', generalLimiter, [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('address')
    .trim()
    .escape()
    .isLength({ min: 5, max: 200 })
    .withMessage('Property address must be between 5 and 200 characters'),
  
  body('bedrooms')
    .isInt({ min: 1, max: 20 })
    .withMessage('Bedrooms must be between 1 and 20'),
  
  body('bathrooms')
    .isFloat({ min: 0.5, max: 20 })
    .withMessage('Bathrooms must be between 0.5 and 20'),
  
  body('sqft')
    .optional()
    .isInt({ min: 100, max: 50000 })
    .withMessage('Square feet must be between 100 and 50,000'),
  
  body('yearBuilt')
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() + 1 })
    .withMessage('Year built must be valid'),
  
  body('propertyType')
    .isIn(['single-family', 'condo', 'townhouse', 'duplex', 'land', 'other'])
    .withMessage('Invalid property type'),
  
  body('condition')
    .isIn(['excellent', 'good', 'fair', 'needs-work'])
    .withMessage('Invalid condition'),
  
  body('timeline')
    .isIn(['immediate', '3-months', '6-months', '1-year', 'just-curious'])
    .withMessage('Invalid timeline'),
  
  body('honeypot')
    .isEmpty()
    .withMessage('Bot detection triggered')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const valuationData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      sqft: req.body.sqft,
      yearBuilt: req.body.yearBuilt,
      propertyType: req.body.propertyType,
      condition: req.body.condition,
      timeline: req.body.timeline,
      timestamp: new Date()
    };

    // Log the valuation request
    logger.info('Home valuation request submitted', {
      name: valuationData.name,
      email: valuationData.email,
      address: valuationData.address,
      ip: req.ip
    });

    // Send notification email about the valuation request
    const contactData: ContactFormData = {
      name: valuationData.name,
      email: valuationData.email,
      phone: valuationData.phone,
      message: `Home Valuation Request for ${valuationData.address}\n\nProperty Details:\n- Bedrooms: ${valuationData.bedrooms}\n- Bathrooms: ${valuationData.bathrooms}\n- Square Feet: ${valuationData.sqft || 'Not provided'}\n- Year Built: ${valuationData.yearBuilt || 'Not provided'}\n- Property Type: ${valuationData.propertyType}\n- Condition: ${valuationData.condition}\n- Timeline: ${valuationData.timeline}`,
      subject: 'Home Valuation Request',
      source: 'home-valuation',
      timestamp: new Date()
    };

    const emailSent = await nativeEmailService.sendContactForm(contactData);
    const confirmationSent = await nativeEmailService.sendConfirmation(contactData);

    res.json({
      success: true,
      message: 'Thank you for your home valuation request. We\'ll prepare a detailed analysis and contact you within 24 hours!',
      emailSent,
      confirmationSent
    });

  } catch (error) {
    logger.error('Home valuation processing error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      ip: req.ip,
      body: req.body
    });

    res.status(500).json({
      success: false,
      error: 'Failed to process home valuation request',
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
});

/**
 * Get form submission statistics (admin only)
 * GET /api/forms/stats
 */
router.get('/stats', requireAuth, async (req: any, res) => {
  try {
    // Check if user is admin
    if (req.session?.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required'
      });
    }

    // TODO: Implement actual statistics from database
    // For now, return mock data
    const stats = {
      totalSubmissions: 0,
      contactForms: 0,
      propertyInquiries: 0,
      newsletterSignups: 0,
      homeValuations: 0,
      last30Days: {
        contactForms: 0,
        propertyInquiries: 0,
        newsletterSignups: 0,
        homeValuations: 0
      }
    };

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    logger.error('Form stats error', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve form statistics'
    });
  }
});

/**
 * Test email service
 * POST /api/forms/test-email (admin only)
 */
router.post('/test-email', requireAuth, async (req: any, res) => {
  try {
    // Check if user is admin
    if (req.session?.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required'
      });
    }

    const testResult = await nativeEmailService.testConnection();
    const healthCheck = await nativeEmailService.healthCheck();

    res.json({
      success: true,
      message: 'Email service test completed',
      connectionTest: testResult,
      healthCheck
    });

  } catch (error) {
    logger.error('Email test error', error);
    res.status(500).json({
      success: false,
      error: 'Email test failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
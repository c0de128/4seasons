import { body, param, query, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to handle validation errors
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array() 
    });
    return;
  }
  next();
};

/**
 * Authentication validation rules
 */
export const validateLogin = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  handleValidationErrors,
];

export const validateRegister = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  handleValidationErrors,
];

/**
 * Contact form validation
 */
export const validateContactForm = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('Name contains invalid characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim()
    .matches(/^[\d\s()+-]+$/).withMessage('Invalid phone number format')
    .isLength({ min: 10, max: 20 }).withMessage('Phone number must be between 10 and 20 characters'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters')
    .escape(), // Escape HTML to prevent XSS
  body('propertyInterest')
    .optional()
    .trim()
    .isIn(['buy', 'sell', 'rent', 'invest']).withMessage('Invalid property interest'),
  handleValidationErrors,
];

/**
 * Property search validation
 */
export const validatePropertySearch = [
  query('city')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('City name too long')
    .matches(/^[a-zA-Z\s-]+$/).withMessage('Invalid city name'),
  query('minPrice')
    .optional()
    .isInt({ min: 0, max: 100000000 }).withMessage('Invalid minimum price'),
  query('maxPrice')
    .optional()
    .isInt({ min: 0, max: 100000000 }).withMessage('Invalid maximum price'),
  query('bedrooms')
    .optional()
    .isInt({ min: 0, max: 20 }).withMessage('Invalid number of bedrooms'),
  query('bathrooms')
    .optional()
    .isFloat({ min: 0, max: 20 }).withMessage('Invalid number of bathrooms'),
  query('propertyType')
    .optional()
    .isIn(['house', 'condo', 'townhouse', 'land', 'multi-family'])
    .withMessage('Invalid property type'),
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Invalid page number'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Invalid limit'),
  handleValidationErrors,
];

/**
 * City guide validation
 */
export const validateCityGuide = [
  param('cityName')
    .trim()
    .notEmpty().withMessage('City name is required')
    .matches(/^[a-zA-Z\s-]+$/).withMessage('Invalid city name')
    .isLength({ max: 50 }).withMessage('City name too long'),
  handleValidationErrors,
];

/**
 * Newsletter subscription validation
 */
export const validateNewsletterSubscription = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('preferences')
    .optional()
    .isArray().withMessage('Preferences must be an array')
    .custom((value) => {
      const validPreferences = ['market-updates', 'new-listings', 'price-drops', 'tips'];
      return value.every((pref: string) => validPreferences.includes(pref));
    }).withMessage('Invalid preferences'),
  handleValidationErrors,
];

/**
 * Generic ID validation
 */
export const validateId = [
  param('id')
    .trim()
    .notEmpty().withMessage('ID is required')
    .isUUID().withMessage('Invalid ID format'),
  handleValidationErrors,
];

/**
 * Sanitize HTML input (for rich text fields)
 */
export const sanitizeHtml = (html: string): string => {
  // Basic HTML sanitization - in production, use a library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/on\w+\s*=\s*'[^']*'/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '');
};

/**
 * Custom sanitization middleware for specific fields
 */
export const sanitizeInput = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fields.forEach(field => {
      if (req.body[field]) {
        // Remove any potential XSS vectors
        req.body[field] = String(req.body[field])
          .replace(/[<>]/g, '') // Remove angle brackets
          .trim(); // Remove leading/trailing whitespace
      }
    });
    next();
  };
};
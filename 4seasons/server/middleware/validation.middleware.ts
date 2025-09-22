import { body, param, query, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import DOMPurify from 'isomorphic-dompurify';

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
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
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
 * Sanitize HTML input using DOMPurify
 */
export const sanitizeHtml = (html: string): string => {
  // Configure DOMPurify for safe HTML sanitization
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre'
    ],
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'input', 'object', 'embed'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
    SANITIZE_DOM: true,
    KEEP_CONTENT: true,
    SAFE_FOR_TEMPLATES: true,
    WHOLE_DOCUMENT: false,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    FORCE_BODY: true,
    IN_PLACE: false
  });

  return clean;
};

/**
 * Custom sanitization middleware for specific fields
 */
export const sanitizeInput = (fields: string[], options: { allowHtml?: boolean } = {}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fields.forEach(field => {
      if (req.body[field]) {
        const input = String(req.body[field]);

        if (options.allowHtml) {
          // Sanitize HTML content with DOMPurify
          req.body[field] = sanitizeHtml(input);
        } else {
          // For non-HTML fields, strip all HTML and sanitize
          req.body[field] = DOMPurify.sanitize(input, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: [],
            KEEP_CONTENT: true
          }).trim();
        }
      }
    });
    next();
  };
};
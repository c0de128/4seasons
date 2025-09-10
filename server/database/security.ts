import { logger } from '../logger';
import crypto from 'crypto';

// SQL injection detection patterns
const SQL_INJECTION_PATTERNS = [
  // Union-based injections
  /\bunion\s+select\b/i,
  /\bunion\s+all\s+select\b/i,
  
  // Boolean-based injections
  /\bor\s+1\s*=\s*1\b/i,
  /\band\s+1\s*=\s*1\b/i,
  /\bor\s+1\s*=\s*0\b/i,
  /\band\s+1\s*=\s*0\b/i,
  /\bor\s+true\b/i,
  /\band\s+false\b/i,
  
  // Time-based injections
  /\bsleep\s*\(/i,
  /\bwaitfor\s+delay\b/i,
  /\bbenchmark\s*\(/i,
  /\bpg_sleep\s*\(/i,
  
  // Information schema queries
  /\binformation_schema\b/i,
  /\bsys\.\b/i,
  /\bmaster\.\./i,
  
  // Database functions
  /\bversion\s*\(\)/i,
  /\buser\s*\(\)/i,
  /\bdatabase\s*\(\)/i,
  /\bconcat\s*\(/i,
  /\bchar\s*\(/i,
  /\bascii\s*\(/i,
  /\bsubstring\s*\(/i,
  /\bmid\s*\(/i,
  /\bleft\s*\(/i,
  /\bright\s*\(/i,
  
  // Comment indicators
  /--/,
  /\/\*/,
  /\*\//,
  /#/,
  
  // SQL commands
  /\bdrop\s+table\b/i,
  /\bdrop\s+database\b/i,
  /\btruncate\s+table\b/i,
  /\bdelete\s+from\b/i,
  /\binsert\s+into\b/i,
  /\bupdate\s+.*\bset\b/i,
  /\balter\s+table\b/i,
  /\bcreate\s+table\b/i,
  /\bexec\s*\(/i,
  /\bexecute\s*\(/i,
  /\bsp_\w+/i,
  /\bxp_\w+/i,
  
  // NoSQL injection patterns
  /\$where\b/i,
  /\$regex\b/i,
  /\$ne\b/i,
  /\$gt\b/i,
  /\$lt\b/i,
  /\$in\b/i,
  /\$nin\b/i,
  /\$exists\b/i,
  /\$elemMatch\b/i,
  
  // LDAP injection patterns
  /\(\|\(/,
  /\)\(\|/,
  /\(\&\(/,
  /\)\(\&/,
  
  // XPath injection patterns
  /\bor\s+1\s*=\s*1\s+or\b/i,
  /\band\s+1\s*=\s*1\s+and\b/i,
];

// Dangerous SQL keywords that should be monitored
const DANGEROUS_KEYWORDS = [
  'drop', 'truncate', 'delete', 'update', 'insert', 'alter', 'create',
  'exec', 'execute', 'sp_', 'xp_', 'union', 'select', 'script',
  'javascript', 'vbscript', 'onload', 'onerror', 'expression'
];

// Input validation rules
interface ValidationRule {
  type: 'length' | 'pattern' | 'whitelist' | 'blacklist' | 'custom';
  value: number | RegExp | string[] | ((value: any) => boolean);
  message: string;
}

interface QuerySecurityOptions {
  enableInjectionDetection?: boolean;
  logSuspiciousQueries?: boolean;
  blockSuspiciousQueries?: boolean;
  maxQueryLength?: number;
  rateLimitQueries?: boolean;
  auditTrail?: boolean;
}

export class DatabaseSecurity {
  private options: QuerySecurityOptions;
  private queryCount: Map<string, number> = new Map();
  private queryResetTime: Map<string, number> = new Map();
  
  constructor(options: QuerySecurityOptions = {}) {
    this.options = {
      enableInjectionDetection: true,
      logSuspiciousQueries: true,
      blockSuspiciousQueries: true,
      maxQueryLength: 10000,
      rateLimitQueries: true,
      auditTrail: true,
      ...options
    };
  }

  /**
   * Validate input parameters for SQL injection
   */
  validateInput(input: any, rules?: ValidationRule[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (input === null || input === undefined) {
      return { valid: true, errors: [] };
    }
    
    const inputString = String(input);
    
    // Basic SQL injection detection
    if (this.options.enableInjectionDetection) {
      for (const pattern of SQL_INJECTION_PATTERNS) {
        if (pattern.test(inputString)) {
          errors.push(`Potential SQL injection detected: pattern matched ${pattern.source}`);
          
          if (this.options.logSuspiciousQueries) {
            logger.warn('SQL injection attempt detected', {
              input: inputString.substring(0, 200),
              pattern: pattern.source,
              timestamp: new Date().toISOString()
            });
          }
          
          if (this.options.blockSuspiciousQueries) {
            break; // Exit early if blocking
          }
        }
      }
    }
    
    // Length validation
    if (this.options.maxQueryLength && inputString.length > this.options.maxQueryLength) {
      errors.push(`Input exceeds maximum length of ${this.options.maxQueryLength} characters`);
    }
    
    // Custom validation rules
    if (rules) {
      for (const rule of rules) {
        const ruleResult = this.applyValidationRule(inputString, rule);
        if (!ruleResult.valid) {
          errors.push(ruleResult.message);
        }
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Apply a single validation rule
   */
  private applyValidationRule(input: string, rule: ValidationRule): { valid: boolean; message: string } {
    switch (rule.type) {
      case 'length':
        const maxLength = rule.value as number;
        return {
          valid: input.length <= maxLength,
          message: input.length > maxLength ? rule.message : ''
        };
        
      case 'pattern':
        const pattern = rule.value as RegExp;
        return {
          valid: pattern.test(input),
          message: !pattern.test(input) ? rule.message : ''
        };
        
      case 'whitelist':
        const whitelist = rule.value as string[];
        return {
          valid: whitelist.includes(input),
          message: !whitelist.includes(input) ? rule.message : ''
        };
        
      case 'blacklist':
        const blacklist = rule.value as string[];
        return {
          valid: !blacklist.some(item => input.toLowerCase().includes(item.toLowerCase())),
          message: blacklist.some(item => input.toLowerCase().includes(item.toLowerCase())) ? rule.message : ''
        };
        
      case 'custom':
        const customValidator = rule.value as (value: any) => boolean;
        return {
          valid: customValidator(input),
          message: !customValidator(input) ? rule.message : ''
        };
        
      default:
        return { valid: true, message: '' };
    }
  }

  /**
   * Sanitize input for database queries
   */
  sanitizeInput(input: any): any {
    if (input === null || input === undefined) {
      return input;
    }
    
    if (typeof input === 'string') {
      // Remove dangerous characters and patterns
      let sanitized = input
        .replace(/['\";\\]/g, '') // Remove quotes and backslashes
        .replace(/--.*$/gm, '') // Remove SQL comments
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/#.*$/gm, '') // Remove hash comments
        .trim();
      
      // Escape remaining special characters
      sanitized = sanitized.replace(/'/g, "''"); // Escape single quotes
      
      return sanitized;
    }
    
    if (typeof input === 'object' && !Array.isArray(input)) {
      // Recursively sanitize object properties
      const sanitizedObj: any = {};
      for (const [key, value] of Object.entries(input)) {
        sanitizedObj[this.sanitizeInput(key)] = this.sanitizeInput(value);
      }
      return sanitizedObj;
    }
    
    if (Array.isArray(input)) {
      return input.map(item => this.sanitizeInput(item));
    }
    
    return input;
  }

  /**
   * Rate limit queries per user/IP
   */
  checkRateLimit(identifier: string, maxQueries: number = 100, windowMs: number = 60000): boolean {
    if (!this.options.rateLimitQueries) {
      return true;
    }
    
    const now = Date.now();
    const windowStart = this.queryResetTime.get(identifier) || 0;
    
    // Reset window if expired
    if (now - windowStart > windowMs) {
      this.queryCount.set(identifier, 0);
      this.queryResetTime.set(identifier, now);
    }
    
    const currentCount = this.queryCount.get(identifier) || 0;
    
    if (currentCount >= maxQueries) {
      logger.warn('Query rate limit exceeded', {
        identifier,
        count: currentCount,
        maxQueries,
        windowMs
      });
      return false;
    }
    
    this.queryCount.set(identifier, currentCount + 1);
    return true;
  }

  /**
   * Generate audit log entry for database operations
   */
  auditQuery(operation: string, table: string, userId?: string, data?: any): void {
    if (!this.options.auditTrail) {
      return;
    }
    
    const auditEntry = {
      timestamp: new Date().toISOString(),
      operation,
      table,
      userId: userId || 'anonymous',
      data: data ? JSON.stringify(data).substring(0, 500) : null,
      hash: crypto.createHash('sha256').update(`${operation}${table}${userId}${Date.now()}`).digest('hex').substring(0, 16)
    };
    
    logger.info('Database audit', auditEntry);
  }

  /**
   * Validate query parameters against schema
   */
  validateQueryParams(params: Record<string, any>, schema: Record<string, ValidationRule[]>): { valid: boolean; errors: Record<string, string[]> } {
    const errors: Record<string, string[]> = {};
    
    for (const [key, value] of Object.entries(params)) {
      const rules = schema[key];
      if (rules) {
        const validation = this.validateInput(value, rules);
        if (!validation.valid) {
          errors[key] = validation.errors;
        }
      }
    }
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Create secure query wrapper
   */
  createSecureQuery<T>(
    queryFn: (...args: any[]) => Promise<T>,
    options: {
      operation: string;
      table: string;
      maxRetries?: number;
      timeout?: number;
    }
  ) {
    return async (...args: any[]): Promise<T> => {
      const startTime = Date.now();
      const { operation, table, maxRetries = 3, timeout = 10000 } = options;
      
      let retries = 0;
      let lastError: Error | null = null;
      
      while (retries <= maxRetries) {
        try {
          // Apply timeout
          const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('Query timeout')), timeout);
          });
          
          const result = await Promise.race([
            queryFn(...args),
            timeoutPromise
          ]);
          
          // Log successful query
          const duration = Date.now() - startTime;
          if (duration > 1000) { // Log slow queries
            logger.warn('Slow query detected', {
              operation,
              table,
              duration,
              retries
            });
          }
          
          return result;
          
        } catch (error) {
          lastError = error as Error;
          retries++;
          
          logger.error('Database query error', {
            operation,
            table,
            error: lastError.message,
            retries,
            args: JSON.stringify(args).substring(0, 200)
          });
          
          // Don't retry certain types of errors
          if (lastError.message.includes('syntax') || 
              lastError.message.includes('constraint') ||
              lastError.message.includes('permission')) {
            break;
          }
          
          // Exponential backoff
          if (retries <= maxRetries) {
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 100));
          }
        }
      }
      
      throw lastError || new Error('Query failed after retries');
    };
  }
}

// Export singleton instance
export const dbSecurity = new DatabaseSecurity();

// Common validation rules
export const commonValidationRules = {
  username: [
    { type: 'length' as const, value: 50, message: 'Username must be less than 50 characters' },
    { type: 'pattern' as const, value: /^[a-zA-Z0-9_-]+$/, message: 'Username contains invalid characters' }
  ],
  email: [
    { type: 'length' as const, value: 100, message: 'Email must be less than 100 characters' },
    { type: 'pattern' as const, value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
  ],
  id: [
    { type: 'pattern' as const, value: /^[a-f0-9-]{36}$/, message: 'Invalid UUID format' }
  ],
  name: [
    { type: 'length' as const, value: 100, message: 'Name must be less than 100 characters' },
    { type: 'pattern' as const, value: /^[a-zA-Z\s'-]+$/, message: 'Name contains invalid characters' }
  ]
};

// Security middleware for database operations
export function createSecureDbMiddleware(security: DatabaseSecurity = dbSecurity) {
  return {
    validateInput: (input: any, rules?: ValidationRule[]) => security.validateInput(input, rules),
    sanitizeInput: (input: any) => security.sanitizeInput(input),
    checkRateLimit: (identifier: string) => security.checkRateLimit(identifier),
    auditQuery: (operation: string, table: string, userId?: string, data?: any) => 
      security.auditQuery(operation, table, userId, data),
    secureQuery: <T>(queryFn: (...args: any[]) => Promise<T>, options: { operation: string; table: string }) =>
      security.createSecureQuery(queryFn, options)
  };
}
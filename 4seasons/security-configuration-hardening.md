# Security Configuration Hardening Guide
## Production-Ready Security Configuration for 4Seasons Application

**Version:** 1.0
**Last Updated:** September 14, 2025
**Compliance:** OWASP ASVS 4.0, CIS Controls v8

---

## Table of Contents
1. [Environment Security](#environment-security)
2. [HTTP Security Headers](#http-security-headers)
3. [Rate Limiting Optimization](#rate-limiting-optimization)
4. [Session Security](#session-security)
5. [CORS Configuration](#cors-configuration)
6. [File Upload Security](#file-upload-security)
7. [Database Security](#database-security)
8. [Logging and Monitoring](#logging-and-monitoring)

---

## Environment Security

### JWT and Session Secrets

**Current Implementation:** `c:/Users/kevin/OneDrive/Desktop/_dev/4seasons/4seasons/server/middleware/auth.middleware.ts`

#### Recommended Configuration

```typescript
// .env.production
JWT_SECRET=<64-character-random-string>  # Generate with: openssl rand -base64 48
JWT_REFRESH_SECRET=<64-character-random-string>
SESSION_SECRET=<64-character-random-string>

# Key rotation schedule
JWT_SECRET_ROTATION_DAYS=90
SESSION_SECRET_ROTATION_DAYS=30

# Token expiration
JWT_EXPIRATION=15m  # Short-lived access tokens
JWT_REFRESH_EXPIRATION=7d  # Refresh token lifespan
```

#### Secret Generation Script

```javascript
// generate-secrets.js
const crypto = require('crypto');

const generateSecrets = () => {
  return {
    JWT_SECRET: crypto.randomBytes(48).toString('base64'),
    JWT_REFRESH_SECRET: crypto.randomBytes(48).toString('base64'),
    SESSION_SECRET: crypto.randomBytes(48).toString('base64'),
    ENCRYPTION_KEY: crypto.randomBytes(32).toString('hex'),
    SIGNING_KEY: crypto.randomBytes(64).toString('hex')
  };
};

console.log('Production Secrets:');
console.log(generateSecrets());
```

### Database Credentials

```bash
# Database URL with SSL enforcement
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require&sslcert=client-cert.pem&sslkey=client-key.pem&sslrootcert=ca-cert.pem"

# Connection pool settings
DB_POOL_MIN=2
DB_POOL_MAX=10
DB_IDLE_TIMEOUT=10000
DB_CONNECTION_TIMEOUT=2000

# Query timeout
DB_STATEMENT_TIMEOUT=5000
```

### API Keys and Third-Party Services

```bash
# Use environment-specific keys
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=<sendgrid-api-key>
SMTP_SECURE=true
SMTP_TLS_CIPHERS=TLSv1.2

# Redis configuration
REDIS_URL=rediss://default:password@redis-host:6380  # Use TLS
REDIS_TLS_REJECT_UNAUTHORIZED=1
REDIS_CONNECTION_TIMEOUT=5000
REDIS_COMMAND_TIMEOUT=5000

# External services
GA_MEASUREMENT_ID=G-XXXXXXXXXX
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
SENTRY_ENVIRONMENT=production
SENTRY_TRACES_SAMPLE_RATE=0.1
```

---

## HTTP Security Headers

### Enhanced Helmet Configuration

**Location:** `c:/Users/kevin/OneDrive/Desktop/_dev/4seasons/4seasons/server/middleware/security.middleware.ts`

```typescript
// Recommended production configuration
import helmet from 'helmet';

const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'strict-dynamic'",  // Enable nonce-based CSP
        "'nonce-{NONCE}'",    // Replace with actual nonce
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",  // Consider replacing with nonce
        "https://fonts.googleapis.com"
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https:",
        "blob:"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com"
      ],
      connectSrc: [
        "'self'",
        "https://www.google-analytics.com",
        "https://matrix.ntreis.net",  // MLS integration
        "wss://",  // WebSocket connections
      ],
      frameSrc: [
        "'self'",
        "https://matrix.ntreis.net"  // MLS iframe
      ],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      manifestSrc: ["'self'"],
      workerSrc: ["'self'", "blob:"],
      childSrc: ["'self'", "blob:"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      upgradeInsecureRequests: [],
      blockAllMixedContent: [],
      reportUri: "/api/security/csp-report"
    }
  },
  strictTransportSecurity: {
    maxAge: 31536000,  // 1 year
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  },
  permissionsPolicy: {
    features: {
      accelerometer: ["'none'"],
      camera: ["'none'"],
      geolocation: ["'self'"],  // For property search
      gyroscope: ["'none'"],
      magnetometer: ["'none'"],
      microphone: ["'none'"],
      payment: ["'none'"],
      usb: ["'none'"],
      fullscreen: ["'self'"],
      vibrate: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: { policy: "require-corp" },
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "same-origin" },
  originAgentCluster: true,
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true,
  xssFilter: true
};

app.use(helmet(helmetConfig));
```

### Additional Security Headers

```typescript
// Custom security headers
app.use((req, res, next) => {
  // Cache control for security
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');

  // Additional security headers
  res.setHeader('X-Content-Security-Policy', "default-src 'self'");
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader('Expect-CT', 'max-age=86400, enforce');
  res.setHeader('Feature-Policy', "geolocation 'self'; microphone 'none'; camera 'none'");

  next();
});
```

---

## Rate Limiting Optimization

### Tiered Rate Limiting Strategy

```typescript
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Authentication endpoints - strict limits
const authLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:auth:'
  }),
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,  // 5 requests per window
  message: 'Too many authentication attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  keyGenerator: (req) => {
    return req.ip + ':' + req.body?.email;  // Rate limit per IP + email
  }
});

// API endpoints - moderate limits
const apiLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:api:'
  }),
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,  // 100 requests per window
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for authenticated admin users
    return req.user?.role === 'admin';
  }
});

// Search endpoints - relaxed limits
const searchLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:search:'
  }),
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 30,  // 30 searches per minute
  message: 'Too many search requests, please slow down',
  standardHeaders: true,
  legacyHeaders: false
});

// File upload - strict limits
const uploadLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:upload:'
  }),
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 10,  // 10 uploads per hour
  message: 'Upload limit exceeded, please try again later',
  skipSuccessfulRequests: false
});

// Distributed rate limiting for scaled deployments
const distributedLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:dist:',
    sendCommand: (...args) => redis.call(...args),
  }),
  windowMs: 15 * 60 * 1000,
  max: 1000,  // Global limit across all instances
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use user ID for authenticated requests, IP for anonymous
    return req.user?.id || req.ip;
  }
});
```

### Dynamic Rate Limiting

```typescript
// Adaptive rate limiting based on server load
const adaptiveLimiter = (req, res, next) => {
  const cpuUsage = process.cpuUsage();
  const memUsage = process.memoryUsage();

  let maxRequests = 100;

  // Reduce limits under high load
  if (memUsage.heapUsed / memUsage.heapTotal > 0.8) {
    maxRequests = 50;
  }

  if (cpuUsage.user > 80000000) {  // High CPU usage
    maxRequests = 25;
  }

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: maxRequests,
    message: 'Server under high load, please try again later'
  });

  limiter(req, res, next);
};
```

---

## Session Security

### Hardened Session Configuration

**Location:** `c:/Users/kevin/OneDrive/Desktop/_dev/4seasons/4seasons/server/middleware/session.middleware.ts`

```typescript
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';

const RedisStore = connectRedis(session);
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  tls: process.env.NODE_ENV === 'production' ? {} : undefined,
  retryStrategy: (times) => Math.min(times * 50, 2000),
  reconnectOnError: (err) => {
    const targetErrors = ['READONLY', 'ECONNRESET'];
    return targetErrors.some(e => err.message.includes(e));
  }
});

const sessionConfig = {
  store: new RedisStore({
    client: redis,
    prefix: 'sess:',
    ttl: 86400,  // 1 day
    disableTouch: false,
    logErrors: true
  }),
  secret: process.env.SESSION_SECRET!,
  name: '__Host-sessionId',  // Use __Host- prefix for additional security
  resave: false,
  saveUninitialized: false,
  rolling: true,  // Reset expiry on activity
  proxy: process.env.NODE_ENV === 'production',  // Trust proxy in production
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
    httpOnly: true,  // Prevent XSS
    maxAge: 1000 * 60 * 60 * 24,  // 1 day
    sameSite: 'strict',  // CSRF protection
    domain: process.env.COOKIE_DOMAIN,  // Set explicit domain
    path: '/',
  },
  genid: () => {
    // Use cryptographically secure session IDs
    return require('crypto').randomBytes(32).toString('hex');
  },
  unset: 'destroy'  // Destroy session on unset
};

// Session fixation protection
app.use((req, res, next) => {
  if (req.session && req.session.regenerateQueued) {
    req.session.regenerate((err) => {
      if (err) next(err);
      else next();
    });
  } else {
    next();
  }
});

// Session timeout middleware
app.use((req, res, next) => {
  if (req.session && req.session.lastActivity) {
    const idle = Date.now() - req.session.lastActivity;
    const maxIdle = 30 * 60 * 1000;  // 30 minutes

    if (idle > maxIdle) {
      req.session.destroy((err) => {
        if (err) console.error('Session destruction error:', err);
      });
      return res.status(440).json({ error: 'Session expired' });
    }
  }

  if (req.session) {
    req.session.lastActivity = Date.now();
  }

  next();
});
```

---

## CORS Configuration

### Production CORS Settings

```typescript
import cors from 'cors';

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

    // Allow requests with no origin (mobile apps, Postman)
    if (!origin && process.env.ALLOW_NO_ORIGIN === 'true') {
      return callback(null, true);
    }

    // Check against whitelist
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Allow cookies
  maxAge: 86400,  // Cache preflight for 24 hours
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-CSRF-Token',
    'X-Correlation-ID'
  ],
  exposedHeaders: [
    'X-Total-Count',
    'X-Page-Count',
    'X-Current-Page',
    'X-Rate-Limit-Remaining'
  ],
  optionsSuccessStatus: 204,  // Some legacy browsers
  preflightContinue: false
};

app.use(cors(corsOptions));

// Additional CORS security for specific routes
app.use('/api/admin', cors({
  origin: process.env.ADMIN_ORIGIN,  // Restrict admin to specific origin
  credentials: true
}));
```

---

## File Upload Security

### Enhanced Upload Validation

**Location:** `c:/Users/kevin/OneDrive/Desktop/_dev/4seasons/4seasons/server/middleware/upload.middleware.ts`

```typescript
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs/promises';
import fileType from 'file-type';
import sharp from 'sharp';  // For image processing
import clamav from 'clamscan';  // For virus scanning

// Initialize virus scanner
const clamscan = await new clamav().init({
  clamdscan: {
    host: process.env.CLAMAV_HOST || 'localhost',
    port: process.env.CLAMAV_PORT || 3310,
  }
});

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // Create user-specific directories
    const uploadDir = path.join('uploads', req.user.id, new Date().toISOString().split('T')[0]);
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate secure filename
    const uniqueSuffix = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

const fileFilter = async (req, file, cb) => {
  // Allowed MIME types
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  // Check MIME type
  if (!allowedMimes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'), false);
  }

  // Check file extension
  const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExts.includes(ext)) {
    return cb(new Error('Invalid file extension'), false);
  }

  // Additional validation for images
  if (file.mimetype.startsWith('image/')) {
    // Will validate magic bytes after upload
    req.validateImage = true;
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,  // 10MB
    files: 5,  // Max 5 files per request
    fields: 10,  // Max 10 fields
    parts: 20,  // Max 20 parts (fields + files)
    headerPairs: 100  // Max 100 header pairs
  }
});

// Post-upload validation middleware
const validateUpload = async (req, res, next) => {
  if (!req.file && !req.files) {
    return next();
  }

  const files = req.files || [req.file];

  for (const file of files) {
    try {
      // Verify file type using magic bytes
      const fileTypeResult = await fileType.fromFile(file.path);

      if (!fileTypeResult || !fileTypeResult.mime.startsWith('image/')) {
        await fs.unlink(file.path);
        return res.status(400).json({ error: 'Invalid file content' });
      }

      // Virus scanning
      const { isInfected, viruses } = await clamscan.scanFile(file.path);

      if (isInfected) {
        await fs.unlink(file.path);
        console.error(`Virus detected: ${viruses.join(', ')}`);
        return res.status(400).json({ error: 'Malicious file detected' });
      }

      // Process images to remove metadata
      if (req.validateImage) {
        const processedPath = file.path.replace(/(\.[^.]+)$/, '_processed$1');

        await sharp(file.path)
          .rotate()  // Auto-rotate based on EXIF
          .resize(2000, 2000, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ quality: 85, progressive: true })
          .toFile(processedPath);

        // Replace original with processed
        await fs.unlink(file.path);
        await fs.rename(processedPath, file.path);
      }

    } catch (error) {
      console.error('File validation error:', error);
      await fs.unlink(file.path).catch(() => {});
      return res.status(500).json({ error: 'File validation failed' });
    }
  }

  next();
};

export { upload, validateUpload };
```

---

## Database Security

### Query Validation and Monitoring

**Location:** `c:/Users/kevin/OneDrive/Desktop/_dev/4seasons/4seasons/server/database/security.ts`

```typescript
import { sql } from 'drizzle-orm';

// SQL injection detection patterns
const sqlInjectionPatterns = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC|EXECUTE)\b)/gi,
  /(--|#|\/\*|\*\/)/g,
  /(\bOR\b\s*\d+\s*=\s*\d+)/gi,
  /(\bAND\b\s*\d+\s*=\s*\d+)/gi,
  /(';|";|\\'|\\"|`)/g,
  /(\bSLEEP\b|\bBENCHMARK\b|\bWAITFOR\b)/gi,
  /(xp_cmdshell|sp_executesql)/gi
];

// Enhanced query validator
export const validateQuery = (input: string): boolean => {
  for (const pattern of sqlInjectionPatterns) {
    if (pattern.test(input)) {
      console.error(`SQL injection attempt detected: ${input}`);
      // Log to security monitoring
      logSecurityEvent({
        type: 'SQL_INJECTION_ATTEMPT',
        input,
        timestamp: new Date(),
        source: 'query_validator'
      });
      return false;
    }
  }
  return true;
};

// Parameterized query builder
export const buildSecureQuery = (table: string, conditions: Record<string, any>) => {
  const keys = Object.keys(conditions);
  const values = Object.values(conditions);

  // Validate table name
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) {
    throw new Error('Invalid table name');
  }

  // Build parameterized query
  const whereClause = keys.map((key, index) => {
    // Validate column name
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
      throw new Error(`Invalid column name: ${key}`);
    }
    return `${key} = $${index + 1}`;
  }).join(' AND ');

  return {
    query: `SELECT * FROM ${table} WHERE ${whereClause}`,
    values
  };
};

// Query timeout enforcement
export const executeWithTimeout = async (query: any, timeout = 5000) => {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Query timeout')), timeout);
  });

  try {
    return await Promise.race([query, timeoutPromise]);
  } catch (error) {
    console.error('Query execution error:', error);
    throw error;
  }
};

// Audit logging for sensitive operations
export const auditLog = async (operation: string, details: any) => {
  const log = {
    timestamp: new Date(),
    operation,
    user: details.userId,
    ip: details.ip,
    userAgent: details.userAgent,
    data: details.data,
    result: details.result
  };

  // Store in audit table
  await db.insert(auditLogs).values(log);

  // Alert on suspicious patterns
  if (operation.includes('DELETE') || operation.includes('DROP')) {
    await alertSecurityTeam(log);
  }
};
```

### Connection Security

```typescript
// Database connection with SSL
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DB_CA_CERT,
    key: process.env.DB_CLIENT_KEY,
    cert: process.env.DB_CLIENT_CERT
  },
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 10000,
  max: 10,
  min: 2,
  statement_timeout: 5000,
  query_timeout: 5000,
  application_name: '4seasons-app'
});

// Monitor connection health
pool.on('error', (err) => {
  console.error('Database connection error:', err);
  // Implement reconnection logic
});

const db = drizzle(pool);
```

---

## Logging and Monitoring

### Enhanced Security Logging

```typescript
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Security-specific logger
const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: '4seasons-security',
    environment: process.env.NODE_ENV
  },
  transports: [
    // Security events log
    new DailyRotateFile({
      filename: 'logs/security-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '100m',
      maxFiles: '90d',
      level: 'info'
    }),
    // Critical security alerts
    new DailyRotateFile({
      filename: 'logs/security-critical-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '100m',
      maxFiles: '365d',
      level: 'error'
    }),
    // Audit trail
    new DailyRotateFile({
      filename: 'logs/audit-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '200m',
      maxFiles: '7y',  // 7 years retention for compliance
      level: 'info',
      auditFile: 'logs/.audit-log-audit.json'
    })
  ]
});

// Log security events
export const logSecurityEvent = (event: any) => {
  const enrichedEvent = {
    ...event,
    timestamp: new Date().toISOString(),
    serverTime: Date.now(),
    nodeVersion: process.version,
    pid: process.pid
  };

  if (event.severity === 'critical') {
    securityLogger.error(enrichedEvent);
    // Send immediate alert
    sendSecurityAlert(enrichedEvent);
  } else {
    securityLogger.info(enrichedEvent);
  }
};

// Real-time alerting
const sendSecurityAlert = async (event: any) => {
  // Send to monitoring service
  if (process.env.SENTRY_DSN) {
    Sentry.captureMessage(`Security Alert: ${event.type}`, 'error');
  }

  // Send email alert
  if (process.env.SECURITY_ALERT_EMAIL) {
    await sendEmail({
      to: process.env.SECURITY_ALERT_EMAIL,
      subject: `[CRITICAL] Security Alert: ${event.type}`,
      text: JSON.stringify(event, null, 2)
    });
  }

  // Send to SIEM
  if (process.env.SIEM_ENDPOINT) {
    await fetch(process.env.SIEM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SIEM_TOKEN}`
      },
      body: JSON.stringify(event)
    });
  }
};
```

### Monitoring Configuration

```yaml
# monitoring-config.yaml
alerts:
  - name: high_error_rate
    condition: error_rate > 0.05
    action: email, slack

  - name: failed_auth_spike
    condition: failed_auth_count > 100 per 5m
    action: email, block_ips

  - name: sql_injection_attempt
    condition: sql_injection_detected
    action: email, log, block_request

  - name: file_upload_virus
    condition: virus_detected
    action: email, quarantine, log

  - name: rate_limit_exceeded
    condition: rate_limit_violations > 1000 per 1h
    action: investigate, possible_ddos

metrics:
  - auth_success_rate
  - auth_failure_rate
  - api_response_time_p95
  - rate_limit_hits
  - security_events_per_minute
  - active_sessions
  - database_query_time_p99
```

---

## Deployment Checklist

### Pre-Production Security Validation

```bash
#!/bin/bash
# security-check.sh

echo "🔒 Running Security Configuration Check..."

# Check environment variables
check_env_vars() {
  required_vars=(
    "JWT_SECRET"
    "SESSION_SECRET"
    "DATABASE_URL"
    "NODE_ENV"
  )

  for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
      echo "❌ Missing required env var: $var"
      exit 1
    fi
  done

  # Check secret strength
  if [ ${#JWT_SECRET} -lt 32 ]; then
    echo "❌ JWT_SECRET too short (min 32 chars)"
    exit 1
  fi
}

# Check SSL/TLS
check_ssl() {
  if [ "$NODE_ENV" = "production" ]; then
    if [ "$DATABASE_URL" != *"sslmode=require"* ]; then
      echo "❌ Database SSL not enforced"
      exit 1
    fi
  fi
}

# Check dependencies
check_dependencies() {
  npm audit --audit-level=high
  if [ $? -ne 0 ]; then
    echo "❌ High severity vulnerabilities found"
    exit 1
  fi
}

# Run checks
check_env_vars
check_ssl
check_dependencies

echo "✅ Security configuration validated"
```

---

## Next Steps

1. **Implement all hardening recommendations** in production environment
2. **Run security validation scripts** before deployment
3. **Configure monitoring and alerting** systems
4. **Schedule regular security reviews** (monthly)
5. **Document any deviations** from recommendations with justification

---

**Document Version:** 1.0
**Last Review:** September 14, 2025
**Next Review:** October 14, 2025
**Classification:** CONFIDENTIAL
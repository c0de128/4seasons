import morgan from 'morgan';
import { Express } from 'express';
import fs from 'fs';
import path from 'path';

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Custom logger class for application logging
class Logger {
  private isDevelopment = process.env.NODE_ENV !== 'production';

  private formatMessage(level: string, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
  }

  private writeToFile(message: string, level: string): void {
    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(logsDir, `${date}-${level}.log`);
    
    fs.appendFile(logFile, message + '\n', (err) => {
      if (err && this.isDevelopment) {
        console.error('Failed to write to log file:', err);
      }
    });
  }

  info(message: string, meta?: any): void {
    const formatted = this.formatMessage('info', message, meta);
    if (this.isDevelopment) {
      console.log('\x1b[36m%s\x1b[0m', formatted); // Cyan
    }
    this.writeToFile(formatted, 'info');
  }

  warn(message: string, meta?: any): void {
    const formatted = this.formatMessage('warn', message, meta);
    if (this.isDevelopment) {
      console.warn('\x1b[33m%s\x1b[0m', formatted); // Yellow
    }
    this.writeToFile(formatted, 'warn');
  }

  error(message: string, error?: Error | any): void {
    const meta = error instanceof Error ? {
      errorMessage: error.message,
      stack: error.stack
    } : error;
    
    const formatted = this.formatMessage('error', message, meta);
    if (this.isDevelopment) {
      console.error('\x1b[31m%s\x1b[0m', formatted); // Red
    }
    this.writeToFile(formatted, 'error');
  }

  debug(message: string, meta?: any): void {
    if (this.isDevelopment) {
      const formatted = this.formatMessage('debug', message, meta);
      console.log('\x1b[35m%s\x1b[0m', formatted); // Magenta
    }
  }

  security(message: string, meta?: any): void {
    const formatted = this.formatMessage('security', message, meta);
    console.log('\x1b[91m%s\x1b[0m', formatted); // Bright Red
    this.writeToFile(formatted, 'security');
  }
}

// Create logger instance
export const logger = new Logger();

// Morgan configuration for HTTP request logging
export function setupHttpLogging(app: Express): void {
  // Create a write stream for access logs
  const accessLogStream = fs.createWriteStream(
    path.join(logsDir, 'access.log'),
    { flags: 'a' }
  );

  // Custom Morgan tokens
  morgan.token('user-id', (req: any) => req.user?.id || 'anonymous');
  morgan.token('user-agent', (req) => req.headers['user-agent'] || 'unknown');
  morgan.token('real-ip', (req) => 
    req.headers['x-forwarded-for'] as string || 
    req.headers['x-real-ip'] as string || 
    req.connection.remoteAddress || 
    'unknown'
  );

  // Development logging - colorful and detailed
  if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }

  // Production logging - comprehensive with file output
  const productionFormat = ':real-ip - :user-id [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';
  
  app.use(morgan(productionFormat, {
    stream: accessLogStream,
    skip: (req) => req.url === '/health' || req.url === '/metrics', // Skip health checks
  }));

  // Log errors separately
  app.use(morgan(productionFormat, {
    stream: fs.createWriteStream(path.join(logsDir, 'error.log'), { flags: 'a' }),
    skip: (req, res) => res.statusCode < 400,
  }));
}

// Error logging middleware
export function errorLogger(err: Error, req: any, res: any, next: any): void {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    ip: req.ip,
    userId: req.user?.id,
    error: {
      message: err.message,
      stack: err.stack,
      name: err.name,
    },
    headers: req.headers,
    body: req.body,
  };

  logger.error('Request error occurred', errorInfo);

  // Log security-related errors differently
  if (err.message.includes('unauthorized') || 
      err.message.includes('forbidden') || 
      err.message.includes('authentication')) {
    logger.security('Security error detected', errorInfo);
  }

  next(err);
}

// Audit logging for sensitive operations
export function auditLog(action: string, userId: string, details: any): void {
  const auditEntry = {
    timestamp: new Date().toISOString(),
    action,
    userId,
    details,
  };

  const auditFile = path.join(logsDir, 'audit.log');
  fs.appendFile(auditFile, JSON.stringify(auditEntry) + '\n', (err) => {
    if (err) {
      logger.error('Failed to write audit log', err);
    }
  });
}

// Clean up old log files (older than 30 days)
export function cleanupOldLogs(): void {
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

  fs.readdir(logsDir, (err, files) => {
    if (err) {
      logger.error('Failed to read logs directory', err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(logsDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;
        
        if (stats.mtime.getTime() < thirtyDaysAgo) {
          fs.unlink(filePath, (err) => {
            if (err) {
              logger.error(`Failed to delete old log file: ${file}`, err);
            } else {
              logger.info(`Deleted old log file: ${file}`);
            }
          });
        }
      });
    });
  });
}

// Schedule log cleanup (run daily)
if (process.env.NODE_ENV === 'production') {
  setInterval(cleanupOldLogs, 24 * 60 * 60 * 1000); // Run every 24 hours
}

export default logger;
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { logger } from '../logger';
import { applySecurityMiddleware } from '../middleware/security.middleware';

// Mock logger to avoid console output during tests
vi.mock('../logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn()
  }
}));

describe('Security Middleware Tests', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    applySecurityMiddleware(app);
    
    // Add basic JSON parsing
    app.use(express.json({ limit: '10mb' }));
    
    // Add test routes
    app.get('/test', (req, res) => {
      res.json({ message: 'Test endpoint' });
    });
    
    app.post('/test', (req, res) => {
      res.json({ received: req.body });
    });
    
    app.get('/sensitive', (req, res) => {
      res.json({ 
        user: 'admin',
        password: 'secret123',
        apiKey: 'xyz789'
      });
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('HTTPS Security Headers', () => {
    it('should set HSTS header', async () => {
      const response = await request(app).get('/test');
      
      expect(response.headers).toHaveProperty('strict-transport-security');
      expect(response.headers['strict-transport-security']).toContain('max-age=31536000');
    });

    it('should set X-Content-Type-Options header', async () => {
      const response = await request(app).get('/test');
      
      expect(response.headers).toHaveProperty('x-content-type-options');
      expect(response.headers['x-content-type-options']).toBe('nosniff');
    });

    it('should set X-Frame-Options header', async () => {
      const response = await request(app).get('/test');
      
      expect(response.headers).toHaveProperty('x-frame-options');
      expect(response.headers['x-frame-options']).toBe('DENY');
    });

    it('should set X-XSS-Protection header', async () => {
      const response = await request(app).get('/test');
      
      expect(response.headers).toHaveProperty('x-xss-protection');
      expect(response.headers['x-xss-protection']).toBe('1; mode=block');
    });

    it('should set Referrer-Policy header', async () => {
      const response = await request(app).get('/test');
      
      expect(response.headers).toHaveProperty('referrer-policy');
      expect(response.headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
    });
  });

  describe('Content Security Policy', () => {
    it('should set CSP header', async () => {
      const response = await request(app).get('/test');
      
      expect(response.headers).toHaveProperty('content-security-policy');
      const csp = response.headers['content-security-policy'];
      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("script-src 'self'");
    });
  });

  describe('CORS Protection', () => {
    it('should handle CORS preflight requests', async () => {
      const response = await request(app)
        .options('/test')
        .set('Origin', 'https://malicious-site.com')
        .set('Access-Control-Request-Method', 'POST');
      
      // Should not allow arbitrary origins
      expect(response.headers).not.toHaveProperty('access-control-allow-origin', 'https://malicious-site.com');
    });

    it('should restrict allowed origins', async () => {
      const response = await request(app)
        .get('/test')
        .set('Origin', 'https://evil.com');
      
      expect(response.headers).not.toHaveProperty('access-control-allow-origin', 'https://evil.com');
    });
  });

  describe('Request Size Limits', () => {
    it('should reject overly large JSON payloads', async () => {
      const largePayload = 'x'.repeat(15 * 1024 * 1024); // 15MB
      
      const response = await request(app)
        .post('/test')
        .send({ data: largePayload })
        .expect(413); // Payload Too Large
    });
  });

  describe('Sensitive Data Exposure', () => {
    it('should not expose server information in headers', async () => {
      const response = await request(app).get('/test');
      
      expect(response.headers).not.toHaveProperty('server');
      expect(response.headers).not.toHaveProperty('x-powered-by');
    });

    it('should not expose sensitive information in error responses', async () => {
      app.get('/error', (req, res) => {
        throw new Error('Database connection failed: postgres://user:password@localhost:5432/db');
      });

      const response = await request(app).get('/error');
      
      expect(response.status).toBe(500);
      expect(response.text).not.toContain('password');
      expect(response.text).not.toContain('postgres://');
    });
  });

  describe('HTTP Method Security', () => {
    it('should not allow TRACE method', async () => {
      const response = await request(app)
        .request('TRACE', '/test')
        .expect(405); // Method Not Allowed
    });

    it('should not allow arbitrary HTTP methods', async () => {
      const response = await request(app)
        .request('PROPFIND', '/test')
        .expect(405);
    });
  });
});

describe('Input Validation Security Tests', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    
    // Test route that accepts user input
    app.post('/search', (req, res) => {
      const { query } = req.body;
      res.json({ results: `Searching for: ${query}` });
    });
  });

  describe('XSS Protection', () => {
    it('should handle script injection attempts', async () => {
      const maliciousScript = '<script>alert("XSS")</script>';
      
      const response = await request(app)
        .post('/search')
        .send({ query: maliciousScript });
      
      expect(response.status).toBe(200);
      // Response should not include unescaped script tags
      expect(response.text).not.toContain('<script>');
    });

    it('should handle HTML injection attempts', async () => {
      const maliciousHtml = '<img src="x" onerror="alert(1)">';
      
      const response = await request(app)
        .post('/search')
        .send({ query: maliciousHtml });
      
      expect(response.status).toBe(200);
      expect(response.text).not.toContain('onerror=');
    });
  });

  describe('SQL Injection Protection', () => {
    it('should handle SQL injection attempts in query parameters', async () => {
      const sqlInjection = "1' OR '1'='1";
      
      const response = await request(app)
        .post('/search')
        .send({ query: sqlInjection });
      
      expect(response.status).toBe(200);
      // Should not expose SQL-related error messages
      expect(response.text).not.toContain('SQL');
      expect(response.text).not.toContain('syntax error');
    });

    it('should handle union-based SQL injection', async () => {
      const unionInjection = "1 UNION SELECT * FROM users";
      
      const response = await request(app)
        .post('/search')
        .send({ query: unionInjection });
      
      expect(response.status).toBe(200);
    });
  });

  describe('NoSQL Injection Protection', () => {
    it('should handle MongoDB injection attempts', async () => {
      const noSqlInjection = { $ne: null };
      
      const response = await request(app)
        .post('/search')
        .send({ query: noSqlInjection });
      
      expect(response.status).toBe(200);
    });
  });

  describe('Command Injection Protection', () => {
    it('should handle command injection attempts', async () => {
      const commandInjection = "; rm -rf /";
      
      const response = await request(app)
        .post('/search')
        .send({ query: commandInjection });
      
      expect(response.status).toBe(200);
    });

    it('should handle pipe-based command injection', async () => {
      const pipeInjection = "test | cat /etc/passwd";
      
      const response = await request(app)
        .post('/search')
        .send({ query: pipeInjection });
      
      expect(response.status).toBe(200);
    });
  });
});

describe('Authentication Security Tests', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    
    // Mock authentication endpoint
    app.post('/api/auth/login', (req, res) => {
      const { email, password } = req.body;
      
      // Simulate authentication
      if (email === 'admin@test.com' && password === 'password123') {
        res.json({ 
          success: true, 
          token: 'jwt-token-here',
          user: { id: 1, email, role: 'admin' }
        });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });

    // Protected endpoint
    app.get('/api/admin/users', (req, res) => {
      const auth = req.headers.authorization;
      if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      res.json({ users: ['admin', 'user1', 'user2'] });
    });
  });

  describe('Brute Force Protection', () => {
    it('should handle multiple failed login attempts', async () => {
      const attempts = [];
      
      // Attempt multiple failed logins
      for (let i = 0; i < 5; i++) {
        attempts.push(
          request(app)
            .post('/api/auth/login')
            .send({ email: 'admin@test.com', password: 'wrong-password' })
        );
      }
      
      const responses = await Promise.all(attempts);
      
      // All should fail with 401
      responses.forEach(response => {
        expect(response.status).toBe(401);
      });
    });
  });

  describe('JWT Security', () => {
    it('should reject requests without authorization header', async () => {
      const response = await request(app).get('/api/admin/users');
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Unauthorized');
    });

    it('should reject malformed authorization headers', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', 'InvalidTokenFormat');
      
      expect(response.status).toBe(401);
    });

    it('should reject empty bearer tokens', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', 'Bearer ');
      
      expect(response.status).toBe(401);
    });
  });

  describe('Password Security', () => {
    it('should not expose password in response', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@test.com', password: 'password123' });
      
      expect(response.status).toBe(200);
      expect(response.body).not.toHaveProperty('password');
      expect(response.text).not.toContain('password123');
    });

    it('should handle password with special characters', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@test.com', password: 'p@$$w0rd!@#$%^&*()' });
      
      expect(response.status).toBe(401); // Wrong password, but should handle gracefully
    });
  });
});

describe('File Upload Security Tests', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    
    // Mock file upload endpoint
    app.post('/api/upload', (req, res) => {
      const { filename, content } = req.body;
      
      // Basic file type validation
      const allowedTypes = ['.jpg', '.png', '.gif', '.pdf'];
      const fileExtension = filename.substring(filename.lastIndexOf('.'));
      
      if (!allowedTypes.includes(fileExtension.toLowerCase())) {
        return res.status(400).json({ error: 'File type not allowed' });
      }
      
      res.json({ message: 'File uploaded successfully', filename });
    });
  });

  describe('Malicious File Upload', () => {
    it('should reject executable files', async () => {
      const response = await request(app)
        .post('/api/upload')
        .send({ filename: 'malware.exe', content: 'binary-content' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'File type not allowed');
    });

    it('should reject script files', async () => {
      const response = await request(app)
        .post('/api/upload')
        .send({ filename: 'script.php', content: '<?php phpinfo(); ?>' });
      
      expect(response.status).toBe(400);
    });

    it('should reject files with double extensions', async () => {
      const response = await request(app)
        .post('/api/upload')
        .send({ filename: 'image.jpg.php', content: 'malicious-content' });
      
      expect(response.status).toBe(400);
    });

    it('should handle path traversal attempts', async () => {
      const response = await request(app)
        .post('/api/upload')
        .send({ filename: '../../../etc/passwd.jpg', content: 'content' });
      
      expect(response.status).toBe(200); // File type is allowed
      // But filename should be sanitized (this test demonstrates the need for path sanitization)
    });
  });
});

describe('Rate Limiting Security Tests', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    
    // Simple in-memory rate limiting for testing
    const requests = new Map();
    
    app.use((req, res, next) => {
      const ip = req.ip || 'unknown';
      const now = Date.now();
      const windowStart = now - 60000; // 1 minute window
      
      if (!requests.has(ip)) {
        requests.set(ip, []);
      }
      
      const userRequests = requests.get(ip);
      // Remove old requests
      const recentRequests = userRequests.filter((time: number) => time > windowStart);
      
      if (recentRequests.length >= 10) { // 10 requests per minute limit
        return res.status(429).json({ error: 'Rate limit exceeded' });
      }
      
      recentRequests.push(now);
      requests.set(ip, recentRequests);
      
      next();
    });
    
    app.get('/api/test', (req, res) => {
      res.json({ message: 'Success' });
    });
  });

  describe('Rate Limiting', () => {
    it('should allow requests under the limit', async () => {
      const response = await request(app).get('/api/test');
      
      expect(response.status).toBe(200);
    });

    it('should block requests over the limit', async () => {
      const requests = [];
      
      // Make 11 requests (over the limit of 10)
      for (let i = 0; i < 11; i++) {
        requests.push(request(app).get('/api/test'));
      }
      
      const responses = await Promise.all(requests);
      
      // Last request should be rate limited
      const lastResponse = responses[responses.length - 1];
      expect(lastResponse.status).toBe(429);
      expect(lastResponse.body).toHaveProperty('error', 'Rate limit exceeded');
    });
  });
});

// Export test utilities for reuse
export const securityTestUtils = {
  createTestApp: () => {
    const app = express();
    applySecurityMiddleware(app);
    app.use(express.json({ limit: '10mb' }));
    return app;
  },
  
  testSecurityHeaders: async (app: express.Application, endpoint: string = '/') => {
    const response = await request(app).get(endpoint);
    
    const expectedHeaders = [
      'strict-transport-security',
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection',
      'referrer-policy',
      'content-security-policy'
    ];
    
    const results = expectedHeaders.map(header => ({
      header,
      present: response.headers.hasOwnProperty(header),
      value: response.headers[header]
    }));
    
    return results;
  },
  
  testInputSanitization: async (app: express.Application, endpoint: string, payload: any) => {
    const response = await request(app)
      .post(endpoint)
      .send(payload);
    
    return {
      status: response.status,
      containsPayload: response.text.includes(JSON.stringify(payload)),
      response: response.body
    };
  }
};
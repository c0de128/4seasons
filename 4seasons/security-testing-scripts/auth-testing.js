#!/usr/bin/env node

/**
 * Authentication Security Testing
 * Tests authentication mechanisms for security vulnerabilities
 */

const axios = require('axios');
const crypto = require('crypto');

class AuthenticationTester {
  constructor(baseUrl = 'http://localhost:5000') {
    this.baseUrl = baseUrl;
    this.findings = [];
    this.testCredentials = {
      validUser: { email: 'test@example.com', password: 'TestPass123!' },
      invalidUser: { email: 'invalid@example.com', password: 'wrongpass' }
    };
  }

  async runAllTests() {
    console.log('🔐 Starting authentication security tests...\n');

    try {
      // Test individual authentication components
      await this.testPasswordComplexity();
      await this.testAccountLockout();
      await this.testSessionSecurity();
      await this.testTokenValidation();
      await this.testBruteForceProtection();
      await this.testPasswordReset();
      await this.testSessionFixation();
      await this.testTimingAttacks();

      this.generateReport();
      return this.findings.filter(f => f.severity === 'HIGH' || f.severity === 'CRITICAL').length > 0 ? 1 : 0;

    } catch (error) {
      console.error('❌ Authentication testing failed:', error.message);
      return 1;
    }
  }

  async testPasswordComplexity() {
    console.log('🔑 Testing password complexity requirements...');

    const weakPasswords = [
      '123456',
      'password',
      'qwerty',
      'admin',
      '12345678',
      'abc123',
      'test',
      '111111'
    ];

    for (const weakPassword of weakPasswords) {
      try {
        const response = await this.makeRequest('POST', '/api/auth/register', {
          email: `test${Date.now()}@example.com`,
          password: weakPassword,
          name: 'Test User'
        });

        if (response.status === 200 || response.status === 201) {
          this.findings.push({
            type: 'Weak Password Accepted',
            severity: 'HIGH',
            details: `Weak password "${weakPassword}" was accepted during registration`,
            recommendation: 'Implement strong password complexity requirements',
            category: 'password-policy'
          });
        }
      } catch (error) {
        // Expected to fail with weak password
        if (error.response && error.response.status === 400) {
          console.log(`  ✅ Weak password "${weakPassword}" properly rejected`);
        }
      }
    }

    // Test minimum length
    try {
      const response = await this.makeRequest('POST', '/api/auth/register', {
        email: `test${Date.now()}@example.com`,
        password: '1234567', // 7 characters
        name: 'Test User'
      });

      if (response.status === 200 || response.status === 201) {
        this.findings.push({
          type: 'Insufficient Password Length',
          severity: 'MEDIUM',
          details: 'Password shorter than 8 characters was accepted',
          category: 'password-policy'
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('  ✅ Short password properly rejected');
      }
    }
  }

  async testAccountLockout() {
    console.log('\n🔒 Testing account lockout mechanism...');

    const testEmail = 'lockout-test@example.com';
    const wrongPassword = 'wrongpassword123';

    let consecutiveFailures = 0;
    const maxAttempts = 10;

    for (let i = 0; i < maxAttempts; i++) {
      try {
        await this.makeRequest('POST', '/api/auth/login', {
          email: testEmail,
          password: wrongPassword
        });
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            consecutiveFailures++;
          } else if (error.response.status === 429) {
            console.log(`  ✅ Account lockout triggered after ${consecutiveFailures} attempts`);

            if (consecutiveFailures > 5) {
              this.findings.push({
                type: 'Account Lockout Too Permissive',
                severity: 'MEDIUM',
                details: `Account lockout triggered after ${consecutiveFailures} attempts (recommended: 5 or fewer)`,
                category: 'account-lockout'
              });
            }
            return;
          }
        }
      }
    }

    this.findings.push({
      type: 'Missing Account Lockout',
      severity: 'HIGH',
      details: `No account lockout detected after ${maxAttempts} failed attempts`,
      recommendation: 'Implement account lockout after 5 failed login attempts',
      category: 'account-lockout'
    });
  }

  async testSessionSecurity() {
    console.log('\n🍪 Testing session security...');

    try {
      // Test login to get session cookie
      const loginResponse = await this.makeRequest('POST', '/api/auth/login', this.testCredentials.validUser);

      if (loginResponse.headers['set-cookie']) {
        const cookies = loginResponse.headers['set-cookie'];

        cookies.forEach(cookie => {
          if (cookie.includes('sessionId') || cookie.includes('connect.sid')) {
            // Check for HttpOnly flag
            if (!cookie.includes('HttpOnly')) {
              this.findings.push({
                type: 'Missing HttpOnly Flag',
                severity: 'HIGH',
                details: 'Session cookie missing HttpOnly flag',
                recommendation: 'Set HttpOnly flag on session cookies',
                category: 'session-security'
              });
            }

            // Check for Secure flag
            if (!cookie.includes('Secure')) {
              this.findings.push({
                type: 'Missing Secure Flag',
                severity: 'MEDIUM',
                details: 'Session cookie missing Secure flag',
                recommendation: 'Set Secure flag on session cookies for HTTPS',
                category: 'session-security'
              });
            }

            // Check for SameSite
            if (!cookie.includes('SameSite')) {
              this.findings.push({
                type: 'Missing SameSite Attribute',
                severity: 'MEDIUM',
                details: 'Session cookie missing SameSite attribute',
                recommendation: 'Set SameSite=Strict on session cookies',
                category: 'session-security'
              });
            }

            console.log('  ✅ Session cookie security flags checked');
          }
        });
      }
    } catch (error) {
      console.log('  ⚠️  Could not test session security - login may be required');
    }
  }

  async testTokenValidation() {
    console.log('\n🎟️  Testing JWT token validation...');

    try {
      // Get valid token
      const loginResponse = await this.makeRequest('POST', '/api/auth/login', this.testCredentials.validUser);
      const token = loginResponse.data?.token;

      if (!token) {
        console.log('  ⚠️  No JWT token returned from login');
        return;
      }

      // Test with expired token (simulate by modifying payload)
      const [header, payload, signature] = token.split('.');

      try {
        const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
        decodedPayload.exp = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago

        const expiredPayload = Buffer.from(JSON.stringify(decodedPayload)).toString('base64');
        const expiredToken = `${header}.${expiredPayload}.${signature}`;

        const response = await this.makeRequest('GET', '/api/protected/profile', null, {
          Authorization: `Bearer ${expiredToken}`
        });

        if (response.status === 200) {
          this.findings.push({
            type: 'Expired Token Accepted',
            severity: 'HIGH',
            details: 'Expired JWT token was accepted',
            recommendation: 'Validate token expiration time',
            category: 'token-validation'
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('  ✅ Expired token properly rejected');
        }
      }

      // Test with invalid signature
      const invalidToken = token.slice(0, -5) + 'XXXXX';
      try {
        const response = await this.makeRequest('GET', '/api/protected/profile', null, {
          Authorization: `Bearer ${invalidToken}`
        });

        if (response.status === 200) {
          this.findings.push({
            type: 'Invalid Token Signature Accepted',
            severity: 'CRITICAL',
            details: 'JWT token with invalid signature was accepted',
            recommendation: 'Validate JWT signature properly',
            category: 'token-validation'
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('  ✅ Invalid token signature properly rejected');
        }
      }

    } catch (error) {
      console.log('  ⚠️  Could not test token validation:', error.message);
    }
  }

  async testBruteForceProtection() {
    console.log('\n💥 Testing brute force protection...');

    const testEmail = 'bruteforce-test@example.com';
    const startTime = Date.now();
    let requestCount = 0;
    let rateLimited = false;

    // Attempt rapid requests
    for (let i = 0; i < 20; i++) {
      try {
        await this.makeRequest('POST', '/api/auth/login', {
          email: testEmail,
          password: 'wrongpassword'
        });
        requestCount++;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          rateLimited = true;
          console.log(`  ✅ Rate limiting triggered after ${requestCount} requests`);
          break;
        }
        requestCount++;
      }

      // Small delay to simulate rapid requests
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    if (!rateLimited && requestCount >= 15) {
      this.findings.push({
        type: 'Insufficient Rate Limiting',
        severity: 'HIGH',
        details: `${requestCount} login attempts allowed without rate limiting`,
        recommendation: 'Implement rate limiting for authentication endpoints',
        category: 'rate-limiting'
      });
    }

    const duration = Date.now() - startTime;
    console.log(`  Completed ${requestCount} requests in ${duration}ms`);
  }

  async testPasswordReset() {
    console.log('\n🔄 Testing password reset security...');

    try {
      // Test password reset request
      const response = await this.makeRequest('POST', '/api/auth/forgot-password', {
        email: 'test@example.com'
      });

      if (response.status === 200) {
        console.log('  ✅ Password reset endpoint accessible');

        // Check if response leaks information about account existence
        const invalidResponse = await this.makeRequest('POST', '/api/auth/forgot-password', {
          email: 'nonexistent@example.com'
        });

        if (invalidResponse.data && response.data) {
          if (JSON.stringify(invalidResponse.data) !== JSON.stringify(response.data)) {
            this.findings.push({
              type: 'User Enumeration via Password Reset',
              severity: 'MEDIUM',
              details: 'Password reset responses differ for valid vs invalid emails',
              recommendation: 'Return same response for all password reset requests',
              category: 'information-disclosure'
            });
          } else {
            console.log('  ✅ Password reset responses consistent');
          }
        }
      }
    } catch (error) {
      console.log('  ⚠️  Password reset endpoint not accessible or requires authentication');
    }
  }

  async testSessionFixation() {
    console.log('\n🔄 Testing session fixation protection...');

    try {
      // Get initial session
      const initialResponse = await this.makeRequest('GET', '/');
      const initialCookies = this.extractCookies(initialResponse.headers['set-cookie']);

      // Login
      const loginResponse = await this.makeRequest('POST', '/api/auth/login', this.testCredentials.validUser);
      const postLoginCookies = this.extractCookies(loginResponse.headers['set-cookie']);

      // Check if session ID changed after login
      if (initialCookies.sessionId && postLoginCookies.sessionId) {
        if (initialCookies.sessionId === postLoginCookies.sessionId) {
          this.findings.push({
            type: 'Session Fixation Vulnerability',
            severity: 'HIGH',
            details: 'Session ID not regenerated after login',
            recommendation: 'Regenerate session ID upon authentication',
            category: 'session-fixation'
          });
        } else {
          console.log('  ✅ Session ID properly regenerated after login');
        }
      }
    } catch (error) {
      console.log('  ⚠️  Could not test session fixation protection');
    }
  }

  async testTimingAttacks() {
    console.log('\n⏱️  Testing for timing attack vulnerabilities...');

    const validEmail = 'test@example.com';
    const invalidEmail = 'nonexistent@example.com';
    const password = 'wrongpassword';

    const validEmailTimes = [];
    const invalidEmailTimes = [];

    // Test multiple times to get average
    for (let i = 0; i < 5; i++) {
      // Test with valid email
      const start1 = Date.now();
      try {
        await this.makeRequest('POST', '/api/auth/login', {
          email: validEmail,
          password: password
        });
      } catch (error) {
        // Expected to fail
      }
      validEmailTimes.push(Date.now() - start1);

      // Test with invalid email
      const start2 = Date.now();
      try {
        await this.makeRequest('POST', '/api/auth/login', {
          email: invalidEmail,
          password: password
        });
      } catch (error) {
        // Expected to fail
      }
      invalidEmailTimes.push(Date.now() - start2);

      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const avgValidTime = validEmailTimes.reduce((a, b) => a + b, 0) / validEmailTimes.length;
    const avgInvalidTime = invalidEmailTimes.reduce((a, b) => a + b, 0) / invalidEmailTimes.length;
    const timingDifference = Math.abs(avgValidTime - avgInvalidTime);

    if (timingDifference > 100) { // More than 100ms difference
      this.findings.push({
        type: 'Timing Attack Vulnerability',
        severity: 'MEDIUM',
        details: `Significant timing difference: ${timingDifference.toFixed(2)}ms between valid and invalid emails`,
        recommendation: 'Implement constant-time comparison for authentication',
        category: 'timing-attack'
      });
    } else {
      console.log(`  ✅ Timing difference acceptable: ${timingDifference.toFixed(2)}ms`);
    }
  }

  async makeRequest(method, path, data = null, headers = {}) {
    const config = {
      method,
      url: `${this.baseUrl}${path}`,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Security-Test-Agent/1.0',
        ...headers
      },
      timeout: 5000,
      validateStatus: () => true // Don't throw on non-2xx status codes
    };

    if (data) {
      config.data = data;
    }

    return await axios(config);
  }

  extractCookies(setCookieHeaders) {
    const cookies = {};
    if (setCookieHeaders) {
      setCookieHeaders.forEach(cookie => {
        const [nameValue] = cookie.split(';');
        const [name, value] = nameValue.split('=');
        cookies[name.trim()] = value;
      });
    }
    return cookies;
  }

  generateReport() {
    console.log('\n📊 Authentication Security Test Report');
    console.log('=====================================\n');

    if (this.findings.length === 0) {
      console.log('✅ All authentication security tests passed!\n');
      return;
    }

    // Group by severity
    const bySeverity = {};
    this.findings.forEach(finding => {
      bySeverity[finding.severity] = bySeverity[finding.severity] || [];
      bySeverity[finding.severity].push(finding);
    });

    // Display summary
    console.log('Summary:');
    console.log('--------');
    const severityOrder = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
    severityOrder.forEach(severity => {
      if (bySeverity[severity]) {
        const emoji = severity === 'CRITICAL' ? '🔴' :
                     severity === 'HIGH' ? '🟠' :
                     severity === 'MEDIUM' ? '🟡' : '🟢';
        console.log(`${emoji} ${severity}: ${bySeverity[severity].length} issues`);
      }
    });

    // Display detailed findings
    console.log('\nDetailed Findings:');
    console.log('------------------');

    severityOrder.forEach(severity => {
      if (bySeverity[severity]) {
        console.log(`\n${severity} Severity Issues:`);
        bySeverity[severity].forEach((finding, index) => {
          console.log(`\n${index + 1}. ${finding.type}`);
          console.log(`   Details: ${finding.details}`);
          if (finding.recommendation) {
            console.log(`   Recommendation: ${finding.recommendation}`);
          }
          console.log(`   Category: ${finding.category}`);
        });
      }
    });

    // Save report
    const reportDir = path.join(__dirname, '..', 'security-reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(reportDir, `auth-testing-${timestamp}.json`);

    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp,
      summary: {
        total: this.findings.length,
        critical: (bySeverity.CRITICAL || []).length,
        high: (bySeverity.HIGH || []).length,
        medium: (bySeverity.MEDIUM || []).length,
        low: (bySeverity.LOW || []).length
      },
      findings: this.findings
    }, null, 2));

    console.log(`\n📁 Report saved to: ${reportPath}`);
  }
}

// Run tester if executed directly
if (require.main === module) {
  const baseUrl = process.argv[2] || 'http://localhost:5000';
  const tester = new AuthenticationTester(baseUrl);

  tester.runAllTests().then(exitCode => {
    process.exit(exitCode);
  }).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = AuthenticationTester;
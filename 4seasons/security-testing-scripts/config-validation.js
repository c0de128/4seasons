#!/usr/bin/env node

/**
 * Security Configuration Validator
 * Validates security configurations and environment setup
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class ConfigValidator {
  constructor() {
    this.findings = [];
    this.config = {};
    this.requiredEnvVars = [
      'NODE_ENV',
      'JWT_SECRET',
      'SESSION_SECRET',
      'DATABASE_URL'
    ];
  }

  async validate() {
    console.log('🔧 Starting security configuration validation...\n');

    try {
      // Load configuration
      await this.loadConfiguration();

      // Validate environment variables
      await this.validateEnvironment();

      // Validate security headers
      await this.validateSecurityHeaders();

      // Validate CORS configuration
      await this.validateCORS();

      // Validate session configuration
      await this.validateSessions();

      // Validate database configuration
      await this.validateDatabase();

      // Validate file system permissions
      await this.validateFilePermissions();

      // Validate TLS configuration
      await this.validateTLS();

      // Generate report
      this.generateReport();

      return this.findings.filter(f => f.severity === 'HIGH' || f.severity === 'CRITICAL').length > 0 ? 1 : 0;

    } catch (error) {
      console.error('❌ Configuration validation failed:', error.message);
      return 1;
    }
  }

  async loadConfiguration() {
    console.log('📋 Loading configuration...');

    // Load .env files
    const envFiles = ['.env', '.env.local', '.env.production', '.env.development'];

    for (const envFile of envFiles) {
      if (fs.existsSync(envFile)) {
        console.log(`  Found: ${envFile}`);
        const content = fs.readFileSync(envFile, 'utf8');
        this.parseEnvFile(content, envFile);
      }
    }

    // Load package.json
    if (fs.existsSync('package.json')) {
      this.config.package = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    }

    console.log(`  Loaded ${Object.keys(this.config).length} configuration files`);
  }

  parseEnvFile(content, filename) {
    const lines = content.split('\n');
    const config = {};

    lines.forEach((line, index) => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key) {
          config[key.trim()] = valueParts.join('=').replace(/^["']|["']$/g, '');
        }
      }
    });

    this.config[filename] = config;
  }

  async validateEnvironment() {
    console.log('\n🌍 Validating environment variables...');

    const allEnvVars = {};

    // Collect all env vars from all sources
    Object.values(this.config).forEach(config => {
      if (typeof config === 'object' && !Array.isArray(config)) {
        Object.assign(allEnvVars, config);
      }
    });

    // Add current process env
    Object.assign(allEnvVars, process.env);

    // Check required variables
    for (const envVar of this.requiredEnvVars) {
      if (!allEnvVars[envVar]) {
        this.findings.push({
          type: 'Missing Required Environment Variable',
          severity: 'CRITICAL',
          details: `${envVar} is required but not set`,
          recommendation: `Add ${envVar} to your environment configuration`,
          category: 'environment'
        });
      }
    }

    // Validate secret strength
    this.validateSecretStrength('JWT_SECRET', allEnvVars.JWT_SECRET);
    this.validateSecretStrength('SESSION_SECRET', allEnvVars.SESSION_SECRET);

    // Check for insecure values
    this.checkInsecureValues(allEnvVars);

    // Validate NODE_ENV
    if (allEnvVars.NODE_ENV) {
      const validEnvs = ['development', 'production', 'test', 'staging'];
      if (!validEnvs.includes(allEnvVars.NODE_ENV)) {
        this.findings.push({
          type: 'Invalid NODE_ENV Value',
          severity: 'MEDIUM',
          details: `NODE_ENV is set to '${allEnvVars.NODE_ENV}' but should be one of: ${validEnvs.join(', ')}`,
          category: 'environment'
        });
      }
    }

    console.log(`  Checked ${Object.keys(allEnvVars).length} environment variables`);
  }

  validateSecretStrength(name, value) {
    if (!value) return;

    const issues = [];

    if (value.length < 32) {
      issues.push('too short (minimum 32 characters)');
    }

    if (!/[A-Z]/.test(value) && !/[a-z]/.test(value) && !/[0-9]/.test(value)) {
      issues.push('lacks complexity (should contain letters and numbers)');
    }

    if (/^(password|secret|key|123|abc)/i.test(value)) {
      issues.push('contains common patterns');
    }

    if (issues.length > 0) {
      this.findings.push({
        type: 'Weak Secret',
        severity: 'HIGH',
        details: `${name} is ${issues.join(', ')}`,
        recommendation: `Use a cryptographically secure random string for ${name}`,
        category: 'secrets'
      });
    }
  }

  checkInsecureValues(envVars) {
    const insecurePatterns = [
      { pattern: /^(password|secret|admin|root)$/i, type: 'Common Default Value' },
      { pattern: /^(123456|password|qwerty|admin)$/i, type: 'Weak Default Password' },
      { pattern: /^(localhost|127\.0\.0\.1)$/i, type: 'Development Value in Production', prodOnly: true },
      { pattern: /^(test|debug|dev)$/i, type: 'Development Value', prodOnly: true }
    ];

    Object.entries(envVars).forEach(([key, value]) => {
      insecurePatterns.forEach(({ pattern, type, prodOnly }) => {
        if (pattern.test(value)) {
          const severity = prodOnly && envVars.NODE_ENV === 'production' ? 'HIGH' : 'MEDIUM';

          if (!prodOnly || envVars.NODE_ENV === 'production') {
            this.findings.push({
              type,
              severity,
              details: `${key} contains insecure value: ${value}`,
              recommendation: `Change ${key} to a secure value`,
              category: 'insecure-values'
            });
          }
        }
      });
    });
  }

  async validateSecurityHeaders() {
    console.log('\n🛡️  Validating security headers configuration...');

    // Look for Helmet.js configuration
    const securityMiddlewareFiles = [
      'server/middleware/security.middleware.ts',
      'server/middleware/security.js',
      'src/middleware/security.ts',
      'middleware/security.js'
    ];

    let helmetConfigFound = false;

    for (const file of securityMiddlewareFiles) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');

        if (content.includes('helmet')) {
          helmetConfigFound = true;
          this.validateHelmetConfig(content, file);
        }
      }
    }

    if (!helmetConfigFound) {
      this.findings.push({
        type: 'Missing Security Headers Configuration',
        severity: 'HIGH',
        details: 'No Helmet.js or security headers configuration found',
        recommendation: 'Implement security headers using Helmet.js',
        category: 'headers'
      });
    }
  }

  validateHelmetConfig(content, filename) {
    const requiredHeaders = [
      { name: 'contentSecurityPolicy', pattern: /contentSecurityPolicy/ },
      { name: 'hsts', pattern: /hsts|strictTransportSecurity/ },
      { name: 'noSniff', pattern: /noSniff/ },
      { name: 'frameguard', pattern: /frameguard/ },
      { name: 'xssFilter', pattern: /xssFilter/ }
    ];

    requiredHeaders.forEach(header => {
      if (!header.pattern.test(content)) {
        this.findings.push({
          type: 'Missing Security Header',
          severity: 'MEDIUM',
          details: `${header.name} configuration not found in ${filename}`,
          recommendation: `Configure ${header.name} in your Helmet.js setup`,
          category: 'headers'
        });
      }
    });

    // Check for CSP configuration
    if (content.includes('contentSecurityPolicy')) {
      if (content.includes("'unsafe-inline'") || content.includes("'unsafe-eval'")) {
        this.findings.push({
          type: 'Weak Content Security Policy',
          severity: 'MEDIUM',
          details: 'CSP allows unsafe-inline or unsafe-eval',
          recommendation: 'Remove unsafe CSP directives and use nonces or hashes instead',
          category: 'headers'
        });
      }
    }
  }

  async validateCORS() {
    console.log('\n🌐 Validating CORS configuration...');

    const corsFiles = [
      'server/middleware/cors.middleware.ts',
      'server/middleware/cors.js',
      'server/index.ts',
      'server/index.js',
      'app.js',
      'server.js'
    ];

    let corsConfigFound = false;

    for (const file of corsFiles) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');

        if (content.includes('cors')) {
          corsConfigFound = true;
          this.validateCorsConfig(content, file);
        }
      }
    }

    if (!corsConfigFound) {
      this.findings.push({
        type: 'Missing CORS Configuration',
        severity: 'MEDIUM',
        details: 'No CORS configuration found',
        recommendation: 'Configure CORS properly to prevent cross-origin attacks',
        category: 'cors'
      });
    }
  }

  validateCorsConfig(content, filename) {
    // Check for wildcard origin
    if (content.includes('origin: "*"') || content.includes("origin: '*'")) {
      this.findings.push({
        type: 'Permissive CORS Configuration',
        severity: 'HIGH',
        details: `CORS allows all origins (*) in ${filename}`,
        recommendation: 'Restrict CORS to specific trusted origins',
        category: 'cors'
      });
    }

    // Check for credentials with wildcard
    if (content.includes('credentials: true') && content.includes('*')) {
      this.findings.push({
        type: 'Insecure CORS Configuration',
        severity: 'CRITICAL',
        details: 'CORS allows credentials with wildcard origin',
        recommendation: 'Never use credentials: true with origin: "*"',
        category: 'cors'
      });
    }
  }

  async validateSessions() {
    console.log('\n🍪 Validating session configuration...');

    const sessionFiles = [
      'server/middleware/session.middleware.ts',
      'server/middleware/session.js'
    ];

    let sessionConfigFound = false;

    for (const file of sessionFiles) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        sessionConfigFound = true;
        this.validateSessionConfig(content, file);
      }
    }

    if (!sessionConfigFound) {
      this.findings.push({
        type: 'Missing Session Configuration',
        severity: 'MEDIUM',
        details: 'No session middleware configuration found',
        category: 'sessions'
      });
    }
  }

  validateSessionConfig(content, filename) {
    const sessionChecks = [
      { pattern: /httpOnly:\s*true/, name: 'httpOnly flag', severity: 'HIGH' },
      { pattern: /secure:\s*true/, name: 'secure flag (for production)', severity: 'MEDIUM' },
      { pattern: /sameSite:\s*['"]strict['"]/, name: 'sameSite: strict', severity: 'LOW' },
      { pattern: /resave:\s*false/, name: 'resave: false', severity: 'LOW' },
      { pattern: /saveUninitialized:\s*false/, name: 'saveUninitialized: false', severity: 'LOW' }
    ];

    sessionChecks.forEach(check => {
      if (!check.pattern.test(content)) {
        this.findings.push({
          type: 'Insecure Session Configuration',
          severity: check.severity,
          details: `Session configuration missing ${check.name} in ${filename}`,
          recommendation: `Set ${check.name} in your session configuration`,
          category: 'sessions'
        });
      }
    });
  }

  async validateDatabase() {
    console.log('\n🗄️  Validating database configuration...');

    const allConfig = {};
    Object.values(this.config).forEach(config => {
      if (typeof config === 'object' && !Array.isArray(config)) {
        Object.assign(allConfig, config);
      }
    });

    if (allConfig.DATABASE_URL) {
      const dbUrl = allConfig.DATABASE_URL;

      // Check for SSL requirement
      if (allConfig.NODE_ENV === 'production' && !dbUrl.includes('sslmode=require')) {
        this.findings.push({
          type: 'Database SSL Not Enforced',
          severity: 'HIGH',
          details: 'Production database connection does not enforce SSL',
          recommendation: 'Add sslmode=require to DATABASE_URL for production',
          category: 'database'
        });
      }

      // Check for credentials in URL (should be in env vars)
      if (dbUrl.includes('password=') && dbUrl.match(/password=([^&\s]+)/)) {
        this.findings.push({
          type: 'Database Credentials in Connection String',
          severity: 'MEDIUM',
          details: 'Database password visible in connection string',
          recommendation: 'Use environment variables for database credentials',
          category: 'database'
        });
      }
    }
  }

  async validateFilePermissions() {
    console.log('\n📁 Validating file permissions...');

    const sensitiveFiles = [
      '.env',
      '.env.local',
      '.env.production',
      'config/secrets.json',
      'private.key',
      'server.key'
    ];

    sensitiveFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        const mode = (stats.mode & parseInt('777', 8)).toString(8);

        if (mode !== '600' && mode !== '644') {
          this.findings.push({
            type: 'Insecure File Permissions',
            severity: 'MEDIUM',
            details: `${file} has permissions ${mode} (should be 600 or 644)`,
            recommendation: `Run: chmod 600 ${file}`,
            category: 'permissions'
          });
        }
      }
    });

    // Check for world-writable directories
    const directories = ['.', 'server', 'client', 'config'];
    directories.forEach(dir => {
      if (fs.existsSync(dir)) {
        const stats = fs.statSync(dir);
        const mode = (stats.mode & parseInt('777', 8)).toString(8);

        if (mode.endsWith('7')) {
          this.findings.push({
            type: 'World-Writable Directory',
            severity: 'HIGH',
            details: `Directory ${dir} has world-write permissions (${mode})`,
            recommendation: `Remove world-write permissions: chmod 755 ${dir}`,
            category: 'permissions'
          });
        }
      }
    });
  }

  async validateTLS() {
    console.log('\n🔒 Validating TLS configuration...');

    // Check for certificate files
    const certFiles = ['cert.pem', 'certificate.crt', 'server.crt'];
    const keyFiles = ['private.key', 'server.key', 'private-key.pem'];

    let hasCert = false;
    let hasKey = false;

    certFiles.forEach(file => {
      if (fs.existsSync(file)) hasCert = true;
    });

    keyFiles.forEach(file => {
      if (fs.existsSync(file)) hasKey = true;
    });

    if (hasCert && hasKey) {
      console.log('  ✅ TLS certificate files found');
    } else {
      this.findings.push({
        type: 'Missing TLS Configuration',
        severity: 'MEDIUM',
        details: 'No TLS certificate or key files found',
        recommendation: 'Set up TLS certificates for production deployment',
        category: 'tls'
      });
    }

    // Check for weak TLS configuration in code
    const serverFiles = ['server/index.js', 'server/index.ts', 'app.js', 'server.js'];

    serverFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');

        if (content.includes('TLS') || content.includes('https')) {
          // Check for weak TLS versions
          if (content.includes('SSLv3') || content.includes('TLSv1.0') || content.includes('TLSv1.1')) {
            this.findings.push({
              type: 'Weak TLS Version',
              severity: 'HIGH',
              details: `Weak TLS version detected in ${file}`,
              recommendation: 'Use TLS 1.2 or higher',
              category: 'tls'
            });
          }
        }
      }
    });
  }

  generateReport() {
    console.log('\n📊 Configuration Validation Report');
    console.log('==================================\n');

    if (this.findings.length === 0) {
      console.log('✅ All security configurations are properly set!\n');
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
          console.log(`   Recommendation: ${finding.recommendation}`);
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
    const reportPath = path.join(reportDir, `config-validation-${timestamp}.json`);

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

// Run validator if executed directly
if (require.main === module) {
  const validator = new ConfigValidator();

  validator.validate().then(exitCode => {
    process.exit(exitCode);
  }).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = ConfigValidator;
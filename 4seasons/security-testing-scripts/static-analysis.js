#!/usr/bin/env node

/**
 * Static Code Security Analysis
 * Detects security anti-patterns and vulnerabilities in code
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class StaticAnalyzer {
  constructor() {
    this.findings = [];
    this.patterns = {
      // Hardcoded secrets
      secrets: [
        { pattern: /api[_-]?key\s*=\s*["'][^"']+["']/gi, type: 'Hardcoded API Key' },
        { pattern: /password\s*=\s*["'][^"']+["']/gi, type: 'Hardcoded Password' },
        { pattern: /secret\s*=\s*["'][^"']+["']/gi, type: 'Hardcoded Secret' },
        { pattern: /token\s*=\s*["'][^"']+["']/gi, type: 'Hardcoded Token' },
        { pattern: /private[_-]?key\s*=\s*["'][^"']+["']/gi, type: 'Hardcoded Private Key' },
        { pattern: /AWS[A-Z0-9]{16,}/g, type: 'AWS Access Key' },
        { pattern: /sk_live_[a-zA-Z0-9]{24,}/g, type: 'Stripe Secret Key' }
      ],

      // SQL Injection vulnerabilities
      sqlInjection: [
        { pattern: /query\s*\(\s*["'`].*\$\{.*\}.*["'`]\s*\)/g, type: 'SQL Injection (template literal)' },
        { pattern: /query\s*\(\s*["'`].*\+.*["'`]\s*\)/g, type: 'SQL Injection (concatenation)' },
        { pattern: /exec\s*\(\s*["'`].*\$\{.*\}.*["'`]\s*\)/g, type: 'SQL Injection (exec)' },
        { pattern: /raw\s*\(\s*["'`].*\$\{.*\}.*["'`]\s*\)/g, type: 'SQL Injection (raw query)' }
      ],

      // XSS vulnerabilities
      xss: [
        { pattern: /innerHTML\s*=\s*[^"'`]+(?:user|input|param|query|body)/gi, type: 'XSS (innerHTML)' },
        { pattern: /document\.write\s*\([^)]*(?:user|input|param|query|body)/gi, type: 'XSS (document.write)' },
        { pattern: /eval\s*\([^)]*(?:user|input|param|query|body)/gi, type: 'XSS (eval)' },
        { pattern: /dangerouslySetInnerHTML/g, type: 'XSS (React dangerouslySetInnerHTML)' }
      ],

      // Command Injection
      commandInjection: [
        { pattern: /exec\s*\([^)]*(?:user|input|param|query|body)/gi, type: 'Command Injection (exec)' },
        { pattern: /execSync\s*\([^)]*(?:user|input|param|query|body)/gi, type: 'Command Injection (execSync)' },
        { pattern: /spawn\s*\([^)]*(?:user|input|param|query|body)/gi, type: 'Command Injection (spawn)' },
        { pattern: /system\s*\([^)]*(?:user|input|param|query|body)/gi, type: 'Command Injection (system)' }
      ],

      // Path Traversal
      pathTraversal: [
        { pattern: /readFile[^(]*\([^)]*(?:user|input|param|query|body)/gi, type: 'Path Traversal (readFile)' },
        { pattern: /createReadStream[^(]*\([^)]*(?:user|input|param|query|body)/gi, type: 'Path Traversal (createReadStream)' },
        { pattern: /sendFile[^(]*\([^)]*(?:user|input|param|query|body)/gi, type: 'Path Traversal (sendFile)' }
      ],

      // Insecure Random
      insecureRandom: [
        { pattern: /Math\.random\s*\(\s*\)/g, type: 'Insecure Random (Math.random)' },
        { pattern: /Date\.now\s*\(\s*\)/g, type: 'Weak Entropy (Date.now for security)' }
      ],

      // Weak Crypto
      weakCrypto: [
        { pattern: /createHash\s*\(\s*["']md5["']\s*\)/gi, type: 'Weak Hash (MD5)' },
        { pattern: /createHash\s*\(\s*["']sha1["']\s*\)/gi, type: 'Weak Hash (SHA1)' },
        { pattern: /createCipher\s*\(/gi, type: 'Deprecated Crypto (createCipher)' },
        { pattern: /DES|3DES|RC4/gi, type: 'Weak Encryption Algorithm' }
      ],

      // Information Disclosure
      infoDisclosure: [
        { pattern: /console\.(log|info|debug|trace)/g, type: 'Console Output (potential info leak)' },
        { pattern: /stack\s*:/g, type: 'Stack Trace Exposure' },
        { pattern: /process\.env/g, type: 'Environment Variable Access' }
      ],

      // Unsafe Regex
      unsafeRegex: [
        { pattern: /\(\.\*\)\+/g, type: 'ReDoS vulnerable pattern' },
        { pattern: /\(\.\+\)\+/g, type: 'ReDoS vulnerable pattern' },
        { pattern: /\([^)]*\|[^)]*\)\+/g, type: 'ReDoS vulnerable pattern' }
      ]
    };
  }

  async analyze(targetPath = '.') {
    console.log('🔍 Starting static code analysis...\n');

    const files = this.getFiles(targetPath);
    console.log(`Found ${files.length} files to analyze\n`);

    for (const file of files) {
      await this.analyzeFile(file);
    }

    this.generateReport();
    return this.findings.filter(f => f.severity === 'HIGH' || f.severity === 'CRITICAL').length > 0 ? 1 : 0;
  }

  getFiles(targetPath) {
    const patterns = [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.mjs'
    ];

    const ignorePatterns = [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.git/**',
      '**/vendor/**',
      '**/*.min.js'
    ];

    let files = [];
    patterns.forEach(pattern => {
      const matches = glob.sync(path.join(targetPath, pattern), {
        ignore: ignorePatterns
      });
      files = files.concat(matches);
    });

    return [...new Set(files)]; // Remove duplicates
  }

  async analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');

      // Check for security patterns
      for (const [category, patterns] of Object.entries(this.patterns)) {
        for (const { pattern, type } of patterns) {
          const matches = content.matchAll(pattern);

          for (const match of matches) {
            const lineNumber = this.getLineNumber(content, match.index);
            const line = lines[lineNumber - 1];

            // Skip if it's a comment
            if (this.isComment(line)) continue;

            // Skip test files for certain patterns
            if (filePath.includes('.test.') || filePath.includes('.spec.')) {
              if (category === 'secrets' || category === 'infoDisclosure') continue;
            }

            this.findings.push({
              file: filePath,
              line: lineNumber,
              column: match.index - content.lastIndexOf('\n', match.index),
              type,
              category,
              severity: this.getSeverity(category, type),
              code: line.trim(),
              match: match[0]
            });
          }
        }
      }

      // Additional checks
      this.checkFilePermissions(filePath);
      this.checkDependencies(filePath, content);

    } catch (error) {
      console.error(`Error analyzing ${filePath}:`, error.message);
    }
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }

  isComment(line) {
    const trimmed = line.trim();
    return trimmed.startsWith('//') ||
           trimmed.startsWith('/*') ||
           trimmed.startsWith('*') ||
           trimmed.startsWith('#');
  }

  getSeverity(category, type) {
    const severityMap = {
      secrets: 'CRITICAL',
      sqlInjection: 'CRITICAL',
      commandInjection: 'CRITICAL',
      pathTraversal: 'HIGH',
      xss: 'HIGH',
      weakCrypto: 'HIGH',
      insecureRandom: 'MEDIUM',
      infoDisclosure: 'LOW',
      unsafeRegex: 'MEDIUM'
    };

    return severityMap[category] || 'MEDIUM';
  }

  checkFilePermissions(filePath) {
    const stats = fs.statSync(filePath);
    const mode = (stats.mode & parseInt('777', 8)).toString(8);

    // Check for overly permissive files
    if (mode === '777' || mode === '666') {
      this.findings.push({
        file: filePath,
        type: 'Overly Permissive File',
        category: 'permissions',
        severity: 'MEDIUM',
        code: `File mode: ${mode}`,
        match: mode
      });
    }
  }

  checkDependencies(filePath, content) {
    // Check for unsafe dependencies
    const unsafeDeps = [
      'request', // deprecated
      'node-uuid', // deprecated
      'crypto-js', // often misused
      'js-yaml', // potential code execution
      'serialize-javascript' // potential code execution
    ];

    for (const dep of unsafeDeps) {
      const pattern = new RegExp(`require\\(['"\`]${dep}['"\`]\\)|from ['"\`]${dep}['"\`]`, 'g');
      const matches = content.matchAll(pattern);

      for (const match of matches) {
        this.findings.push({
          file: filePath,
          line: this.getLineNumber(content, match.index),
          type: `Potentially Unsafe Dependency: ${dep}`,
          category: 'dependencies',
          severity: 'MEDIUM',
          code: match[0],
          match: match[0]
        });
      }
    }
  }

  generateReport() {
    console.log('\n📊 Static Analysis Report');
    console.log('========================\n');

    if (this.findings.length === 0) {
      console.log('✅ No security issues found!\n');
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
          console.log(`   File: ${finding.file}${finding.line ? `:${finding.line}` : ''}`);
          console.log(`   Code: ${finding.code || finding.match}`);
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
    const reportPath = path.join(reportDir, `static-analysis-${timestamp}.json`);

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

    // Generate fix suggestions
    this.generateFixSuggestions();
  }

  generateFixSuggestions() {
    console.log('\n💡 Fix Suggestions:');
    console.log('------------------');

    const suggestions = {
      secrets: 'Use environment variables or a secrets management service',
      sqlInjection: 'Use parameterized queries or an ORM with prepared statements',
      xss: 'Sanitize user input and use proper output encoding',
      commandInjection: 'Avoid executing system commands with user input',
      pathTraversal: 'Validate and sanitize file paths, use a whitelist approach',
      weakCrypto: 'Use strong algorithms like SHA-256 or AES-256',
      insecureRandom: 'Use crypto.randomBytes() for security-sensitive operations',
      unsafeRegex: 'Simplify regex patterns to avoid ReDoS attacks'
    };

    const categories = [...new Set(this.findings.map(f => f.category))];
    categories.forEach(category => {
      if (suggestions[category]) {
        console.log(`• ${category}: ${suggestions[category]}`);
      }
    });
  }
}

// Run analyzer if executed directly
if (require.main === module) {
  const analyzer = new StaticAnalyzer();
  const targetPath = process.argv[2] || '.';

  analyzer.analyze(targetPath).then(exitCode => {
    process.exit(exitCode);
  }).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = StaticAnalyzer;
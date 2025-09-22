#!/usr/bin/env node

/**
 * Comprehensive Security Test Runner
 * Orchestrates all security testing scripts
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class SecurityTestRunner {
  constructor() {
    this.results = {};
    this.totalTests = 0;
    this.passedTests = 0;
    this.failedTests = 0;
  }

  async runAllTests() {
    console.log('🚀 Starting comprehensive security test suite...\n');
    console.log('=' .repeat(60));

    const startTime = Date.now();

    try {
      // Create reports directory
      this.ensureReportsDirectory();

      // Run all security tests
      await this.runDependencyScanning();
      await this.runStaticAnalysis();
      await this.runConfigValidation();
      await this.runAuthenticationTests();
      await this.runCSRFTests();
      await this.runInputValidationTests();
      await this.runFileUploadTests();

      // Generate comprehensive report
      await this.generateFinalReport(Date.now() - startTime);

      // Print summary
      this.printSummary();

      // Exit with appropriate code
      return this.failedTests > 0 ? 1 : 0;

    } catch (error) {
      console.error('❌ Test suite execution failed:', error.message);
      return 1;
    }
  }

  ensureReportsDirectory() {
    const reportDir = path.join(__dirname, '..', 'security-reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
      console.log('📁 Created security-reports directory\n');
    }
  }

  async runDependencyScanning() {
    console.log('🔍 Running dependency vulnerability scanning...');
    const result = await this.executeScript('./dependency-scan.js');
    this.processTestResult('Dependency Scanning', result);
  }

  async runStaticAnalysis() {
    console.log('\n📝 Running static code analysis...');
    const result = await this.executeScript('./static-analysis.js');
    this.processTestResult('Static Analysis', result);
  }

  async runConfigValidation() {
    console.log('\n⚙️  Running configuration validation...');
    const result = await this.executeScript('./config-validation.js');
    this.processTestResult('Configuration Validation', result);
  }

  async runAuthenticationTests() {
    console.log('\n🔐 Running authentication security tests...');
    const result = await this.executeScript('./auth-testing.js', ['http://localhost:5000']);
    this.processTestResult('Authentication Testing', result);
  }

  async runCSRFTests() {
    console.log('\n🔒 Running CSRF protection tests...');
    try {
      const result = await this.executeScript('./csrf-testing.js', ['http://localhost:5000']);
      this.processTestResult('CSRF Protection Testing', result);
    } catch (error) {
      console.log('   ⚠️  CSRF test script not found - skipping');
    }
  }

  async runInputValidationTests() {
    console.log('\n🛡️  Running input validation tests...');
    try {
      const result = await this.executeScript('./input-validation-tests.js', ['http://localhost:5000']);
      this.processTestResult('Input Validation Testing', result);
    } catch (error) {
      console.log('   ⚠️  Input validation test script not found - skipping');
    }
  }

  async runFileUploadTests() {
    console.log('\n📤 Running file upload security tests...');
    try {
      const result = await this.executeScript('./file-upload-tests.js', ['http://localhost:5000']);
      this.processTestResult('File Upload Testing', result);
    } catch (error) {
      console.log('   ⚠️  File upload test script not found - skipping');
    }
  }

  async executeScript(scriptPath, args = []) {
    return new Promise((resolve, reject) => {
      const script = path.join(__dirname, scriptPath);

      // Check if script exists
      if (!fs.existsSync(script)) {
        reject(new Error(`Script not found: ${script}`));
        return;
      }

      const child = spawn('node', [script, ...args], {
        cwd: process.cwd(),
        stdio: 'pipe'
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        const output = data.toString();
        stdout += output;
        process.stdout.write(output);
      });

      child.stderr.on('data', (data) => {
        const output = data.toString();
        stderr += output;
        process.stderr.write(output);
      });

      child.on('close', (code) => {
        resolve({
          exitCode: code,
          stdout,
          stderr,
          success: code === 0,
          duration: Date.now()
        });
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  processTestResult(testName, result) {
    this.results[testName] = result;
    this.totalTests++;

    if (result.success) {
      this.passedTests++;
      console.log(`   ✅ ${testName}: PASSED\n`);
    } else {
      this.failedTests++;
      console.log(`   ❌ ${testName}: FAILED (exit code: ${result.exitCode})\n`);
    }
  }

  async generateFinalReport(totalDuration) {
    console.log('\n📊 Generating comprehensive security report...');

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(__dirname, '..', 'security-reports', `security-test-suite-${timestamp}.json`);

    // Collect all individual test reports
    const reportDir = path.join(__dirname, '..', 'security-reports');
    const reportFiles = fs.readdirSync(reportDir).filter(file =>
      file.endsWith('.json') && file !== path.basename(reportPath)
    );

    const individualReports = {};
    reportFiles.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(reportDir, file), 'utf8');
        const report = JSON.parse(content);
        const testType = file.split('-')[0];

        if (!individualReports[testType]) {
          individualReports[testType] = [];
        }
        individualReports[testType].push(report);
      } catch (error) {
        console.log(`   ⚠️  Could not parse report: ${file}`);
      }
    });

    // Create comprehensive report
    const comprehensiveReport = {
      metadata: {
        timestamp,
        duration: totalDuration,
        testsRun: this.totalTests,
        testsPassed: this.passedTests,
        testsFailed: this.failedTests,
        successRate: ((this.passedTests / this.totalTests) * 100).toFixed(1)
      },
      summary: {
        overallStatus: this.failedTests === 0 ? 'PASS' : 'FAIL',
        criticalIssues: 0,
        highIssues: 0,
        mediumIssues: 0,
        lowIssues: 0,
        totalIssues: 0
      },
      testResults: this.results,
      detailedReports: individualReports,
      recommendations: this.generateRecommendations(),
      nextSteps: this.generateNextSteps()
    };

    // Count total issues across all reports
    Object.values(individualReports).forEach(reportArray => {
      reportArray.forEach(report => {
        if (report.summary) {
          comprehensiveReport.summary.criticalIssues += report.summary.critical || 0;
          comprehensiveReport.summary.highIssues += report.summary.high || 0;
          comprehensiveReport.summary.mediumIssues += report.summary.medium || 0;
          comprehensiveReport.summary.lowIssues += report.summary.low || 0;
          comprehensiveReport.summary.totalIssues += report.summary.total || 0;
        }
      });
    });

    // Generate HTML report
    const htmlReport = this.generateHTMLReport(comprehensiveReport);
    const htmlPath = reportPath.replace('.json', '.html');

    // Save reports
    fs.writeFileSync(reportPath, JSON.stringify(comprehensiveReport, null, 2));
    fs.writeFileSync(htmlPath, htmlReport);

    console.log(`   ✅ JSON Report: ${reportPath}`);
    console.log(`   ✅ HTML Report: ${htmlPath}`);
  }

  generateRecommendations() {
    const recommendations = [];

    if (this.results['Dependency Scanning'] && !this.results['Dependency Scanning'].success) {
      recommendations.push({
        priority: 'HIGH',
        category: 'Dependencies',
        action: 'Update vulnerable dependencies immediately',
        description: 'Run "npm audit fix" and update packages with known vulnerabilities'
      });
    }

    if (this.results['Static Analysis'] && !this.results['Static Analysis'].success) {
      recommendations.push({
        priority: 'HIGH',
        category: 'Code Quality',
        action: 'Fix static analysis findings',
        description: 'Address hardcoded secrets, injection vulnerabilities, and weak cryptography'
      });
    }

    if (this.results['Configuration Validation'] && !this.results['Configuration Validation'].success) {
      recommendations.push({
        priority: 'MEDIUM',
        category: 'Configuration',
        action: 'Harden security configurations',
        description: 'Fix environment variables, security headers, and session configurations'
      });
    }

    if (this.results['Authentication Testing'] && !this.results['Authentication Testing'].success) {
      recommendations.push({
        priority: 'CRITICAL',
        category: 'Authentication',
        action: 'Fix authentication vulnerabilities',
        description: 'Address weak passwords, missing lockouts, and session security issues'
      });
    }

    return recommendations;
  }

  generateNextSteps() {
    return [
      {
        phase: 'Immediate (0-24 hours)',
        actions: [
          'Review and address all CRITICAL and HIGH severity issues',
          'Update vulnerable dependencies',
          'Fix authentication security gaps'
        ]
      },
      {
        phase: 'Short-term (1-7 days)',
        actions: [
          'Implement missing security configurations',
          'Add comprehensive input validation',
          'Set up automated security testing in CI/CD'
        ]
      },
      {
        phase: 'Medium-term (1-4 weeks)',
        actions: [
          'Implement security monitoring and alerting',
          'Conduct penetration testing',
          'Train development team on secure coding practices'
        ]
      },
      {
        phase: 'Long-term (1-3 months)',
        actions: [
          'Establish security review process',
          'Implement advanced security features (MFA, etc.)',
          'Regular security assessments and audits'
        ]
      }
    ];
  }

  generateHTMLReport(report) {
    const statusColor = report.summary.overallStatus === 'PASS' ? '#4CAF50' : '#f44336';
    const issueTotal = report.summary.totalIssues;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Security Test Suite Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; background: #f5f5f5; }
        .header { background: #0d0d33; color: white; padding: 30px; text-align: center; }
        .container { max-width: 1200px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .section { padding: 30px; border-bottom: 1px solid #eee; }
        .section:last-child { border-bottom: none; }
        h1 { margin: 0; font-size: 2.5em; }
        h2 { color: #0d0d33; margin-bottom: 20px; font-size: 1.5em; }
        .status { font-size: 1.2em; font-weight: bold; color: ${statusColor}; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .summary-card { padding: 20px; border-radius: 8px; text-align: center; background: #f8f9fa; }
        .critical { background: #ffebee; color: #c62828; }
        .high { background: #fff3e0; color: #e65100; }
        .medium { background: #fff8e1; color: #f57c00; }
        .low { background: #f1f8e9; color: #558b2f; }
        .test-result { display: flex; align-items: center; margin: 10px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; }
        .test-result.passed { border-left: 4px solid #4CAF50; }
        .test-result.failed { border-left: 4px solid #f44336; }
        .test-name { flex: 1; font-weight: 600; }
        .test-status { font-weight: bold; }
        .passed { color: #4CAF50; }
        .failed { color: #f44336; }
        .recommendations { list-style: none; padding: 0; }
        .recommendation { margin: 15px 0; padding: 15px; border-left: 4px solid #0d0d33; background: #f8f9fa; border-radius: 4px; }
        .priority { font-weight: bold; margin-bottom: 5px; }
        .priority.HIGH { color: #e65100; }
        .priority.CRITICAL { color: #c62828; }
        .priority.MEDIUM { color: #f57c00; }
        .timestamp { color: #666; font-size: 0.9em; }
        .next-steps { margin-top: 20px; }
        .phase { margin: 20px 0; }
        .phase h4 { color: #0d0d33; margin-bottom: 10px; }
        .actions { list-style-type: disc; margin-left: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔒 Security Test Suite Report</h1>
            <div class="status">Status: ${report.summary.overallStatus}</div>
            <p class="timestamp">Generated: ${new Date(report.metadata.timestamp).toLocaleString()}</p>
        </div>

        <div class="section">
            <h2>Executive Summary</h2>
            <div class="summary-grid">
                <div class="summary-card">
                    <h3>${report.metadata.testsRun}</h3>
                    <p>Tests Run</p>
                </div>
                <div class="summary-card">
                    <h3>${report.metadata.successRate}%</h3>
                    <p>Success Rate</p>
                </div>
                <div class="summary-card">
                    <h3>${Math.round(report.metadata.duration / 1000)}s</h3>
                    <p>Duration</p>
                </div>
                <div class="summary-card">
                    <h3>${issueTotal}</h3>
                    <p>Total Issues</p>
                </div>
            </div>

            <div class="summary-grid">
                <div class="summary-card critical">
                    <h3>${report.summary.criticalIssues}</h3>
                    <p>Critical</p>
                </div>
                <div class="summary-card high">
                    <h3>${report.summary.highIssues}</h3>
                    <p>High</p>
                </div>
                <div class="summary-card medium">
                    <h3>${report.summary.mediumIssues}</h3>
                    <p>Medium</p>
                </div>
                <div class="summary-card low">
                    <h3>${report.summary.lowIssues}</h3>
                    <p>Low</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Test Results</h2>
            ${Object.entries(report.testResults).map(([testName, result]) => `
                <div class="test-result ${result.success ? 'passed' : 'failed'}">
                    <div class="test-name">${testName}</div>
                    <div class="test-status ${result.success ? 'passed' : 'failed'}">
                        ${result.success ? '✅ PASSED' : '❌ FAILED'}
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h2>Recommendations</h2>
            <div class="recommendations">
                ${report.recommendations.map(rec => `
                    <div class="recommendation">
                        <div class="priority ${rec.priority}">${rec.priority} Priority</div>
                        <div><strong>${rec.category}:</strong> ${rec.action}</div>
                        <div style="margin-top: 5px; color: #666;">${rec.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2>Next Steps</h2>
            <div class="next-steps">
                ${report.nextSteps.map(phase => `
                    <div class="phase">
                        <h4>${phase.phase}</h4>
                        <ul class="actions">
                            ${phase.actions.map(action => `<li>${action}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  printSummary() {
    console.log('\n' + '=' .repeat(60));
    console.log('🎯 SECURITY TEST SUITE SUMMARY');
    console.log('=' .repeat(60));

    console.log(`\nTests Executed: ${this.totalTests}`);
    console.log(`✅ Passed: ${this.passedTests}`);
    console.log(`❌ Failed: ${this.failedTests}`);
    console.log(`📊 Success Rate: ${((this.passedTests / this.totalTests) * 100).toFixed(1)}%`);

    if (this.failedTests === 0) {
      console.log('\n🎉 All security tests passed! Your application has a strong security posture.');
    } else {
      console.log('\n⚠️  Some security tests failed. Please review the detailed reports and address the findings.');
    }

    console.log('\n📁 Detailed reports saved in security-reports/ directory');
    console.log('=' .repeat(60));
  }
}

// Run test suite if executed directly
if (require.main === module) {
  const runner = new SecurityTestRunner();

  runner.runAllTests().then(exitCode => {
    process.exit(exitCode);
  }).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = SecurityTestRunner;
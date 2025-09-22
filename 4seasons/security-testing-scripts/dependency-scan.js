#!/usr/bin/env node

/**
 * Dependency Security Scanner
 * Performs comprehensive vulnerability scanning of project dependencies
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class DependencyScanner {
  constructor() {
    this.reportDir = path.join(__dirname, '..', 'security-reports');
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.vulnerabilities = {
      critical: [],
      high: [],
      moderate: [],
      low: []
    };
  }

  async scan() {
    console.log('🔍 Starting dependency security scan...\n');

    // Ensure reports directory exists
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }

    try {
      // Run npm audit
      await this.runNpmAudit();

      // Check for outdated packages
      await this.checkOutdated();

      // Check licenses
      await this.checkLicenses();

      // Generate report
      await this.generateReport();

      // Return exit code based on findings
      return this.getExitCode();
    } catch (error) {
      console.error('❌ Security scan failed:', error.message);
      return 1;
    }
  }

  async runNpmAudit() {
    console.log('📦 Running npm audit...');

    try {
      const auditResult = execSync('npm audit --json', { encoding: 'utf8' });
      const audit = JSON.parse(auditResult);

      // Save raw audit report
      fs.writeFileSync(
        path.join(this.reportDir, `npm-audit-${this.timestamp}.json`),
        JSON.stringify(audit, null, 2)
      );

      // Process vulnerabilities
      if (audit.metadata && audit.metadata.vulnerabilities) {
        const vulns = audit.metadata.vulnerabilities;
        console.log(`\n  Found vulnerabilities:`);
        console.log(`  - Critical: ${vulns.critical}`);
        console.log(`  - High: ${vulns.high}`);
        console.log(`  - Moderate: ${vulns.moderate}`);
        console.log(`  - Low: ${vulns.low}`);

        // Extract detailed vulnerability info
        if (audit.vulnerabilities) {
          Object.entries(audit.vulnerabilities).forEach(([pkg, data]) => {
            const severity = data.severity;
            this.vulnerabilities[severity] = this.vulnerabilities[severity] || [];
            this.vulnerabilities[severity].push({
              package: pkg,
              severity: data.severity,
              via: data.via,
              range: data.range,
              fixAvailable: data.fixAvailable
            });
          });
        }
      }
    } catch (error) {
      // npm audit returns non-zero exit code when vulnerabilities found
      if (error.stdout) {
        const audit = JSON.parse(error.stdout);
        this.processAuditResults(audit);
      } else {
        throw error;
      }
    }
  }

  async checkOutdated() {
    console.log('\n📅 Checking for outdated packages...');

    try {
      const outdated = execSync('npm outdated --json', { encoding: 'utf8' });
      const packages = JSON.parse(outdated || '{}');

      const outdatedCount = Object.keys(packages).length;
      console.log(`  Found ${outdatedCount} outdated packages`);

      if (outdatedCount > 0) {
        fs.writeFileSync(
          path.join(this.reportDir, `npm-outdated-${this.timestamp}.json`),
          JSON.stringify(packages, null, 2)
        );

        // Check for major version updates
        const majorUpdates = Object.entries(packages).filter(([name, info]) => {
          const current = info.current.split('.')[0];
          const latest = info.latest.split('.')[0];
          return current !== latest;
        });

        if (majorUpdates.length > 0) {
          console.log(`  ⚠️  ${majorUpdates.length} packages have major version updates available`);
        }
      }
    } catch (error) {
      // npm outdated returns non-zero exit code when packages are outdated
      if (error.stdout) {
        const packages = JSON.parse(error.stdout || '{}');
        console.log(`  Found ${Object.keys(packages).length} outdated packages`);
      }
    }
  }

  async checkLicenses() {
    console.log('\n📜 Checking licenses...');

    try {
      // Get all installed packages
      const ls = execSync('npm ls --json --depth=0', { encoding: 'utf8' });
      const packages = JSON.parse(ls);

      const problematicLicenses = ['GPL', 'AGPL', 'LGPL', 'UNLICENSED'];
      const licenseIssues = [];

      // Check each dependency's license
      if (packages.dependencies) {
        Object.entries(packages.dependencies).forEach(([name, info]) => {
          if (info.license) {
            problematicLicenses.forEach(problematic => {
              if (info.license.includes(problematic)) {
                licenseIssues.push({
                  package: name,
                  license: info.license,
                  issue: `Potentially problematic license: ${problematic}`
                });
              }
            });
          } else {
            licenseIssues.push({
              package: name,
              issue: 'No license information found'
            });
          }
        });
      }

      if (licenseIssues.length > 0) {
        console.log(`  ⚠️  Found ${licenseIssues.length} packages with license issues`);
        fs.writeFileSync(
          path.join(this.reportDir, `license-issues-${this.timestamp}.json`),
          JSON.stringify(licenseIssues, null, 2)
        );
      } else {
        console.log('  ✅ No license issues found');
      }
    } catch (error) {
      console.log('  ⚠️  Could not check licenses:', error.message);
    }
  }

  async generateReport() {
    console.log('\n📊 Generating security report...');

    const report = {
      timestamp: this.timestamp,
      summary: {
        critical: this.vulnerabilities.critical.length,
        high: this.vulnerabilities.high.length,
        moderate: this.vulnerabilities.moderate.length,
        low: this.vulnerabilities.low.length,
        total: Object.values(this.vulnerabilities).reduce((sum, arr) => sum + arr.length, 0)
      },
      vulnerabilities: this.vulnerabilities,
      recommendations: this.generateRecommendations()
    };

    // Save JSON report
    const reportPath = path.join(this.reportDir, `security-report-${this.timestamp}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Generate HTML report
    const htmlReport = this.generateHTMLReport(report);
    const htmlPath = path.join(this.reportDir, `security-report-${this.timestamp}.html`);
    fs.writeFileSync(htmlPath, htmlReport);

    console.log(`\n✅ Reports generated:`);
    console.log(`  - JSON: ${reportPath}`);
    console.log(`  - HTML: ${htmlPath}`);

    // Print summary
    console.log('\n📈 Scan Summary:');
    console.log('=================');
    if (report.summary.critical > 0) {
      console.log(`🔴 Critical: ${report.summary.critical}`);
    }
    if (report.summary.high > 0) {
      console.log(`🟠 High: ${report.summary.high}`);
    }
    if (report.summary.moderate > 0) {
      console.log(`🟡 Moderate: ${report.summary.moderate}`);
    }
    if (report.summary.low > 0) {
      console.log(`🟢 Low: ${report.summary.low}`);
    }
    console.log(`\nTotal vulnerabilities: ${report.summary.total}`);
  }

  generateRecommendations() {
    const recommendations = [];

    if (this.vulnerabilities.critical.length > 0) {
      recommendations.push({
        priority: 'CRITICAL',
        action: 'Immediately update or replace packages with critical vulnerabilities',
        packages: this.vulnerabilities.critical.map(v => v.package)
      });
    }

    if (this.vulnerabilities.high.length > 0) {
      recommendations.push({
        priority: 'HIGH',
        action: 'Update packages with high severity vulnerabilities within 24 hours',
        packages: this.vulnerabilities.high.map(v => v.package)
      });
    }

    // Check for packages with available fixes
    const fixablePackages = [
      ...this.vulnerabilities.critical,
      ...this.vulnerabilities.high,
      ...this.vulnerabilities.moderate
    ].filter(v => v.fixAvailable);

    if (fixablePackages.length > 0) {
      recommendations.push({
        priority: 'MEDIUM',
        action: 'Run "npm audit fix" to automatically fix available vulnerabilities',
        packages: fixablePackages.map(v => v.package)
      });
    }

    return recommendations;
  }

  generateHTMLReport(report) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Security Report - ${this.timestamp}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 3px solid #0d0d33; padding-bottom: 10px; }
        h2 { color: #0d0d33; margin-top: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .summary-card { padding: 20px; border-radius: 8px; text-align: center; }
        .critical { background: #ffebee; color: #c62828; }
        .high { background: #fff3e0; color: #e65100; }
        .moderate { background: #fff8e1; color: #f57c00; }
        .low { background: #f1f8e9; color: #558b2f; }
        .vulnerability { margin: 10px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #0d0d33; border-radius: 4px; }
        .recommendation { margin: 10px 0; padding: 15px; background: #e3f2fd; border-left: 4px solid #1976d2; border-radius: 4px; }
        .timestamp { color: #666; font-size: 0.9em; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f5f5f5; font-weight: 600; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔒 Security Scan Report</h1>
        <p class="timestamp">Generated: ${new Date(this.timestamp).toLocaleString()}</p>

        <h2>Summary</h2>
        <div class="summary">
            <div class="summary-card critical">
                <h3>${report.summary.critical}</h3>
                <p>Critical</p>
            </div>
            <div class="summary-card high">
                <h3>${report.summary.high}</h3>
                <p>High</p>
            </div>
            <div class="summary-card moderate">
                <h3>${report.summary.moderate}</h3>
                <p>Moderate</p>
            </div>
            <div class="summary-card low">
                <h3>${report.summary.low}</h3>
                <p>Low</p>
            </div>
        </div>

        <h2>Recommendations</h2>
        ${report.recommendations.map(rec => `
            <div class="recommendation">
                <strong>${rec.priority}:</strong> ${rec.action}
                ${rec.packages ? `<br><small>Affected packages: ${rec.packages.join(', ')}</small>` : ''}
            </div>
        `).join('')}

        <h2>Vulnerability Details</h2>
        ${Object.entries(report.vulnerabilities).map(([severity, vulns]) => {
          if (vulns.length === 0) return '';
          return `
            <h3 style="color: ${severity === 'critical' ? '#c62828' : severity === 'high' ? '#e65100' : severity === 'moderate' ? '#f57c00' : '#558b2f'}">
              ${severity.charAt(0).toUpperCase() + severity.slice(1)} Severity
            </h3>
            <table>
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Range</th>
                  <th>Fix Available</th>
                </tr>
              </thead>
              <tbody>
                ${vulns.map(v => `
                  <tr>
                    <td>${v.package}</td>
                    <td>${v.range || 'N/A'}</td>
                    <td>${v.fixAvailable ? '✅ Yes' : '❌ No'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `;
        }).join('')}
    </div>
</body>
</html>`;
  }

  getExitCode() {
    // Return non-zero exit code if critical or high vulnerabilities found
    if (this.vulnerabilities.critical.length > 0) {
      return 2;
    }
    if (this.vulnerabilities.high.length > 0) {
      return 1;
    }
    return 0;
  }

  processAuditResults(audit) {
    if (audit.metadata && audit.metadata.vulnerabilities) {
      const vulns = audit.metadata.vulnerabilities;
      console.log(`\n  Found vulnerabilities:`);
      console.log(`  - Critical: ${vulns.critical}`);
      console.log(`  - High: ${vulns.high}`);
      console.log(`  - Moderate: ${vulns.moderate}`);
      console.log(`  - Low: ${vulns.low}`);
    }
  }
}

// Run scanner if executed directly
if (require.main === module) {
  const scanner = new DependencyScanner();
  scanner.scan().then(exitCode => {
    process.exit(exitCode);
  }).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = DependencyScanner;
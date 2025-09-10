import { spawn } from 'child_process';
import { promisify } from 'util';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { logger } from '../logger';

// Secure command execution function
const execSecure = (command: string, args: string[], options: any = {}): Promise<{ stdout: string; stderr: string }> => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { 
      ...options,
      shell: false, // Disable shell to prevent command injection
      windowsHide: true, // Hide window on Windows
      timeout: 30000 // 30 second timeout
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout?.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr?.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(`Command failed with code ${code}: ${stderr}`));
      }
    });
    
    child.on('error', (error) => {
      reject(error);
    });
  });
};

interface SecurityScanResult {
  scanType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  issues: Array<{
    title: string;
    description: string;
    file?: string;
    line?: number;
    recommendation: string;
    cve?: string;
  }>;
  summary: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  timestamp: string;
}

interface VulnerabilityReport {
  packageName: string;
  currentVersion: string;
  vulnerableVersions: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  recommendation: string;
  cve?: string;
  references: string[];
}

class SecurityScanner {
  private projectRoot: string;

  constructor() {
    this.projectRoot = process.cwd();
  }

  /**
   * Run comprehensive security scan
   */
  async runFullScan(): Promise<{
    success: boolean;
    scans: SecurityScanResult[];
    error?: string;
  }> {
    try {
      logger.info('Starting comprehensive security scan');
      
      const scans = await Promise.allSettled([
        this.scanDependencyVulnerabilities(),
        this.scanCodeSecurityIssues(),
        this.scanEnvironmentSecurity(),
        this.scanConfigurationSecurity(),
        this.scanDockerSecurity()
      ]);

      const results: SecurityScanResult[] = [];
      const errors: string[] = [];

      scans.forEach((scan, index) => {
        if (scan.status === 'fulfilled') {
          results.push(scan.value);
        } else {
          const scanNames = ['Dependencies', 'Code', 'Environment', 'Configuration', 'Docker'];
          errors.push(`${scanNames[index]}: ${scan.reason}`);
          logger.warn(`Security scan failed: ${scanNames[index]}`, scan.reason);
        }
      });

      logger.info('Security scan completed', {
        totalScans: results.length,
        totalIssues: results.reduce((sum, scan) => sum + scan.summary.total, 0),
        criticalIssues: results.reduce((sum, scan) => sum + scan.summary.critical, 0)
      });

      return {
        success: true,
        scans: results,
        error: errors.length > 0 ? errors.join('; ') : undefined
      };
    } catch (error) {
      logger.error('Security scan failed', error);
      return {
        success: false,
        scans: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Scan for dependency vulnerabilities using npm audit
   */
  async scanDependencyVulnerabilities(): Promise<SecurityScanResult> {
    try {
      const { stdout } = await execSecure('npm', ['audit', '--json'], {
        cwd: this.projectRoot
      });

      const auditResult = JSON.parse(stdout);
      const issues: SecurityScanResult['issues'] = [];

      // Parse npm audit results
      if (auditResult.vulnerabilities) {
        Object.entries(auditResult.vulnerabilities).forEach(([packageName, vuln]: [string, any]) => {
          vuln.via.forEach((via: any) => {
            if (typeof via === 'object') {
              issues.push({
                title: `${packageName}: ${via.title}`,
                description: via.overview || 'Vulnerability in dependency',
                recommendation: `Update ${packageName} to a secure version`,
                cve: via.cve?.[0],
              });
            }
          });
        });
      }

      const summary = {
        total: issues.length,
        critical: issues.filter(i => auditResult.metadata?.vulnerabilities?.critical > 0).length || 0,
        high: issues.filter(i => auditResult.metadata?.vulnerabilities?.high > 0).length || 0,
        medium: issues.filter(i => auditResult.metadata?.vulnerabilities?.moderate > 0).length || 0,
        low: issues.filter(i => auditResult.metadata?.vulnerabilities?.low > 0).length || 0
      };

      return {
        scanType: 'dependency-vulnerabilities',
        severity: summary.critical > 0 ? 'critical' : summary.high > 0 ? 'high' : 'medium',
        issues,
        summary,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        scanType: 'dependency-vulnerabilities',
        severity: 'medium',
        issues: [{
          title: 'Dependency scan failed',
          description: 'Could not complete dependency vulnerability scan',
          recommendation: 'Run npm audit manually to check for vulnerabilities'
        }],
        summary: { total: 1, critical: 0, high: 0, medium: 1, low: 0 },
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Scan code for common security issues
   */
  async scanCodeSecurityIssues(): Promise<SecurityScanResult> {
    const issues: SecurityScanResult['issues'] = [];

    try {
      // Check for hardcoded secrets and credentials
      const secretPatterns = [
        { pattern: /password\s*=\s*['"]((?!.*placeholder|.*example|.*test).{3,})['"]/gi, title: 'Hardcoded password' },
        { pattern: /api[_-]?key\s*[=:]\s*['"]((?!.*placeholder|.*example|.*test).{10,})['"]/gi, title: 'Hardcoded API key' },
        { pattern: /secret\s*[=:]\s*['"]((?!.*placeholder|.*example|.*test).{10,})['"]/gi, title: 'Hardcoded secret' },
        { pattern: /token\s*[=:]\s*['"]((?!.*placeholder|.*example|.*test).{20,})['"]/gi, title: 'Hardcoded token' },
        { pattern: /aws[_-]?access[_-]?key[_-]?id\s*[=:]\s*['"](AKIA[0-9A-Z]{16})['"]/gi, title: 'AWS Access Key' },
        { pattern: /-----BEGIN\s+PRIVATE\s+KEY-----/gi, title: 'Private key in code' }
      ];

      // Scan TypeScript/JavaScript files
      const codeFiles = this.findCodeFiles();
      
      for (const file of codeFiles.slice(0, 50)) { // Limit to 50 files to avoid timeout
        try {
          const content = readFileSync(file, 'utf8');
          const lines = content.split('\n');

          for (const { pattern, title } of secretPatterns) {
            pattern.lastIndex = 0; // Reset regex
            let match;
            while ((match = pattern.exec(content)) !== null) {
              const lineNumber = content.substring(0, match.index).split('\n').length;
              issues.push({
                title,
                description: 'Potential hardcoded credential found in source code',
                file: file.replace(this.projectRoot, '.'),
                line: lineNumber,
                recommendation: 'Move sensitive data to environment variables'
              });
            }
          }

          // Check for dangerous functions
          const dangerousPatterns = [
            { pattern: /eval\s*\(/g, title: 'Use of eval()' },
            { pattern: /innerHTML\s*=/g, title: 'Use of innerHTML (XSS risk)' },
            { pattern: /document\.write\s*\(/g, title: 'Use of document.write' },
            { pattern: /\$\{.*\}/g, title: 'Template literal (potential injection)' }
          ];

          for (const { pattern, title } of dangerousPatterns) {
            pattern.lastIndex = 0;
            let match;
            while ((match = pattern.exec(content)) !== null) {
              const lineNumber = content.substring(0, match.index).split('\n').length;
              issues.push({
                title,
                description: 'Potentially dangerous function usage',
                file: file.replace(this.projectRoot, '.'),
                line: lineNumber,
                recommendation: 'Review usage and consider safer alternatives'
              });
            }
          }
        } catch (error) {
          // Skip files that can't be read
        }
      }

      const summary = this.categorizeSeverity(issues);

      return {
        scanType: 'code-security',
        severity: summary.critical > 0 ? 'critical' : summary.high > 0 ? 'high' : 'medium',
        issues,
        summary,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        scanType: 'code-security',
        severity: 'medium',
        issues: [{
          title: 'Code scan failed',
          description: 'Could not complete code security scan',
          recommendation: 'Manual code review recommended'
        }],
        summary: { total: 1, critical: 0, high: 0, medium: 1, low: 0 },
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Scan environment configuration for security issues
   */
  async scanEnvironmentSecurity(): Promise<SecurityScanResult> {
    const issues: SecurityScanResult['issues'] = [];

    try {
      // Check environment variables
      const sensitiveEnvVars = [
        'JWT_SECRET',
        'SESSION_SECRET',
        'DATABASE_URL',
        'SMTP_PASS',
        'AWS_SECRET_ACCESS_KEY',
        'REDIS_PASSWORD'
      ];

      for (const envVar of sensitiveEnvVars) {
        const value = process.env[envVar];
        if (value) {
          // Check for weak secrets
          if (value.length < 32) {
            issues.push({
              title: `Weak ${envVar}`,
              description: `${envVar} appears to be too short for security`,
              recommendation: 'Use a longer, more complex secret (minimum 32 characters)'
            });
          }

          // Check for common weak values
          const weakValues = ['password', 'secret', '123456', 'changeme', 'default'];
          if (weakValues.some(weak => value.toLowerCase().includes(weak))) {
            issues.push({
              title: `Weak ${envVar}`,
              description: `${envVar} contains common weak patterns`,
              recommendation: 'Use a cryptographically secure random value'
            });
          }
        } else if (process.env.NODE_ENV === 'production') {
          issues.push({
            title: `Missing ${envVar}`,
            description: `Critical environment variable ${envVar} is not set`,
            recommendation: `Set ${envVar} with a secure value`
          });
        }
      }

      // Check for NODE_ENV in production
      if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'development') {
        issues.push({
          title: 'NODE_ENV not set',
          description: 'NODE_ENV should be explicitly set to "production" or "development"',
          recommendation: 'Set NODE_ENV environment variable'
        });
      }

      // Check for debug mode in production
      if (process.env.NODE_ENV === 'production' && process.env.DEBUG) {
        issues.push({
          title: 'Debug mode enabled in production',
          description: 'DEBUG environment variable is set in production',
          recommendation: 'Disable debug mode in production by unsetting DEBUG'
        });
      }

      const summary = this.categorizeSeverity(issues);

      return {
        scanType: 'environment-security',
        severity: summary.critical > 0 ? 'critical' : summary.high > 0 ? 'high' : 'low',
        issues,
        summary,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        scanType: 'environment-security',
        severity: 'medium',
        issues: [{
          title: 'Environment scan failed',
          description: 'Could not complete environment security scan',
          recommendation: 'Manual environment review recommended'
        }],
        summary: { total: 1, critical: 0, high: 0, medium: 1, low: 0 },
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Scan configuration files for security issues
   */
  async scanConfigurationSecurity(): Promise<SecurityScanResult> {
    const issues: SecurityScanResult['issues'] = [];

    try {
      // Check package.json for security configurations
      const packageJsonPath = join(this.projectRoot, 'package.json');
      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
        
        // Check for scripts that might be security risks
        if (packageJson.scripts) {
          const riskyScripts = Object.entries(packageJson.scripts).filter(([name, script]) => 
            typeof script === 'string' && (
              script.includes('rm -rf') ||
              script.includes('sudo') ||
              script.includes('chmod 777')
            )
          );
          
          riskyScripts.forEach(([name, script]) => {
            issues.push({
              title: `Risky npm script: ${name}`,
              description: `Script "${name}" contains potentially dangerous commands`,
              file: './package.json',
              recommendation: 'Review script for security implications'
            });
          });
        }
      }

      // Check for exposed config files
      const sensitiveFiles = [
        '.env',
        'config/database.yml',
        'config/secrets.yml',
        '.aws/credentials',
        '.ssh/id_rsa'
      ];

      for (const file of sensitiveFiles) {
        const filePath = join(this.projectRoot, file);
        if (existsSync(filePath)) {
          issues.push({
            title: `Sensitive file present: ${file}`,
            description: `File ${file} contains sensitive information`,
            file,
            recommendation: 'Ensure this file is not committed to version control'
          });
        }
      }

      // Check .gitignore
      const gitignorePath = join(this.projectRoot, '.gitignore');
      if (existsSync(gitignorePath)) {
        const gitignore = readFileSync(gitignorePath, 'utf8');
        const importantIgnores = ['.env', 'node_modules', '*.log', '.DS_Store'];
        
        importantIgnores.forEach(pattern => {
          if (!gitignore.includes(pattern)) {
            issues.push({
              title: `Missing .gitignore entry: ${pattern}`,
              description: `${pattern} should be in .gitignore`,
              file: '.gitignore',
              recommendation: `Add ${pattern} to .gitignore`
            });
          }
        });
      } else {
        issues.push({
          title: 'Missing .gitignore file',
          description: 'No .gitignore file found',
          recommendation: 'Create .gitignore to exclude sensitive files'
        });
      }

      const summary = this.categorizeSeverity(issues);

      return {
        scanType: 'configuration-security',
        severity: summary.critical > 0 ? 'critical' : summary.high > 0 ? 'high' : 'low',
        issues,
        summary,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        scanType: 'configuration-security',
        severity: 'medium',
        issues: [{
          title: 'Configuration scan failed',
          description: 'Could not complete configuration security scan',
          recommendation: 'Manual configuration review recommended'
        }],
        summary: { total: 1, critical: 0, high: 0, medium: 1, low: 0 },
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Scan Docker configuration if present
   */
  async scanDockerSecurity(): Promise<SecurityScanResult> {
    const issues: SecurityScanResult['issues'] = [];

    try {
      const dockerfilePath = join(this.projectRoot, 'Dockerfile');
      if (!existsSync(dockerfilePath)) {
        return {
          scanType: 'docker-security',
          severity: 'low',
          issues: [{
            title: 'No Dockerfile found',
            description: 'Docker security scan skipped - no Dockerfile present',
            recommendation: 'No action needed if not using Docker'
          }],
          summary: { total: 0, critical: 0, high: 0, medium: 0, low: 0 },
          timestamp: new Date().toISOString()
        };
      }

      const dockerfile = readFileSync(dockerfilePath, 'utf8');
      const lines = dockerfile.split('\n');

      // Check for security best practices
      if (dockerfile.includes('FROM ubuntu') || dockerfile.includes('FROM centos')) {
        issues.push({
          title: 'Using full OS base image',
          description: 'Using full OS images increases attack surface',
          file: './Dockerfile',
          recommendation: 'Consider using minimal base images like Alpine Linux'
        });
      }

      if (dockerfile.includes('USER root') || !dockerfile.includes('USER ')) {
        issues.push({
          title: 'Running as root user',
          description: 'Container appears to run as root user',
          file: './Dockerfile',
          recommendation: 'Create and use a non-root user in the container'
        });
      }

      if (dockerfile.includes('ADD ') && dockerfile.includes('http')) {
        issues.push({
          title: 'Using ADD with remote URLs',
          description: 'ADD instruction with remote URLs can be security risk',
          file: './Dockerfile',
          recommendation: 'Use COPY instead of ADD, or download separately'
        });
      }

      // Check for exposed ports
      const exposePorts = lines.filter(line => line.trim().startsWith('EXPOSE'));
      exposePorts.forEach(line => {
        const port = line.match(/EXPOSE\s+(\d+)/)?.[1];
        if (port && ['22', '23', '3389', '5432', '3306'].includes(port)) {
          issues.push({
            title: `Exposing sensitive port: ${port}`,
            description: `Port ${port} is commonly targeted by attackers`,
            file: './Dockerfile',
            recommendation: 'Only expose necessary ports and use non-standard ports when possible'
          });
        }
      });

      const summary = this.categorizeSeverity(issues);

      return {
        scanType: 'docker-security',
        severity: summary.critical > 0 ? 'critical' : summary.high > 0 ? 'high' : 'low',
        issues,
        summary,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        scanType: 'docker-security',
        severity: 'low',
        issues: [{
          title: 'Docker scan failed',
          description: 'Could not complete Docker security scan',
          recommendation: 'Manual Docker configuration review recommended'
        }],
        summary: { total: 1, critical: 0, high: 0, medium: 0, low: 1 },
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Find code files to scan (secure implementation)
   */
  private findCodeFiles(): string[] {
    const files: string[] = [];
    const extensions = ['.ts', '.js', '.tsx', '.jsx'];
    const ignoreDirs = ['node_modules', 'dist', '.git', 'coverage', 'build'];
    
    const scanDirectory = (dir: string, depth: number = 0): void => {
      if (depth > 10) return; // Prevent infinite recursion
      
      try {
        const entries = readdirSync(dir);
        
        for (const entry of entries) {
          const fullPath = join(dir, entry);
          const stat = statSync(fullPath);
          
          if (stat.isDirectory()) {
            if (!ignoreDirs.includes(entry) && !entry.startsWith('.')) {
              scanDirectory(fullPath, depth + 1);
            }
          } else if (stat.isFile()) {
            const ext = extname(entry);
            if (extensions.includes(ext)) {
              files.push(fullPath);
            }
          }
        }
      } catch (error) {
        // Skip directories we can't read
      }
    };
    
    scanDirectory(this.projectRoot);
    return files.slice(0, 100); // Limit to 100 files
  }

  /**
   * Categorize issues by severity
   */
  private categorizeSeverity(issues: SecurityScanResult['issues']): SecurityScanResult['summary'] {
    const summary = { total: issues.length, critical: 0, high: 0, medium: 0, low: 0 };
    
    issues.forEach(issue => {
      if (issue.title.toLowerCase().includes('password') || issue.title.toLowerCase().includes('secret')) {
        summary.critical++;
      } else if (issue.title.toLowerCase().includes('api key') || issue.title.toLowerCase().includes('token')) {
        summary.high++;
      } else if (issue.title.toLowerCase().includes('eval') || issue.title.toLowerCase().includes('injection')) {
        summary.high++;
      } else {
        summary.medium++;
      }
    });

    return summary;
  }

  /**
   * Generate security report
   */
  generateSecurityReport(scans: SecurityScanResult[]): string {
    let report = '# Security Scan Report\n\n';
    report += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    // Summary
    const totalIssues = scans.reduce((sum, scan) => sum + scan.summary.total, 0);
    const criticalIssues = scans.reduce((sum, scan) => sum + scan.summary.critical, 0);
    const highIssues = scans.reduce((sum, scan) => sum + scan.summary.high, 0);
    
    report += `## Summary\n`;
    report += `- **Total Issues:** ${totalIssues}\n`;
    report += `- **Critical:** ${criticalIssues}\n`;
    report += `- **High:** ${highIssues}\n`;
    report += `- **Medium:** ${scans.reduce((sum, scan) => sum + scan.summary.medium, 0)}\n`;
    report += `- **Low:** ${scans.reduce((sum, scan) => sum + scan.summary.low, 0)}\n\n`;

    // Detailed results
    scans.forEach(scan => {
      if (scan.issues.length > 0) {
        report += `## ${scan.scanType.replace('-', ' ').toUpperCase()}\n\n`;
        
        scan.issues.forEach(issue => {
          report += `### ${issue.title}\n`;
          report += `**Description:** ${issue.description}\n`;
          if (issue.file) report += `**File:** ${issue.file}\n`;
          if (issue.line) report += `**Line:** ${issue.line}\n`;
          report += `**Recommendation:** ${issue.recommendation}\n`;
          if (issue.cve) report += `**CVE:** ${issue.cve}\n`;
          report += '\n';
        });
      }
    });

    return report;
  }
}

// Export singleton instance
export const securityScanner = new SecurityScanner();
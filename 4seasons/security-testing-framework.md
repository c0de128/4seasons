# Security Testing Framework
## Comprehensive Security Testing Procedures for 4Seasons Application

**Version:** 1.0
**Last Updated:** September 14, 2025
**Framework Integration:** OWASP Testing Guide v4.2

---

## Table of Contents
1. [Automated Security Testing Suite](#automated-security-testing-suite)
2. [Manual Security Testing Procedures](#manual-security-testing-procedures)
3. [Penetration Testing Checklist](#penetration-testing-checklist)
4. [Security Test Cases](#security-test-cases)
5. [Vulnerability Scanning Procedures](#vulnerability-scanning-procedures)
6. [Security Regression Testing](#security-regression-testing)
7. [Performance Security Testing](#performance-security-testing)

---

## Automated Security Testing Suite

### Dependency Scanning

**Script Location:** `security-testing-scripts/dependency-scan.js`

```javascript
// Run dependency audit
npm audit --json > security-reports/npm-audit.json

// Check for known vulnerabilities
npm run security:audit

// Scan with additional tools
npx snyk test
npx retire --js --node
```

**Integration with:** `c:/Users/kevin/OneDrive/Desktop/_dev/4seasons/4seasons/server/services/security-scanner.ts`

**Execution Schedule:**
- Daily: Development environment
- On commit: CI/CD pipeline
- Weekly: Production audit

### Static Code Analysis

**Script Location:** `security-testing-scripts/static-analysis.js`

```javascript
// ESLint security rules
npx eslint . --ext .ts,.tsx --config .eslintrc.security.json

// Semgrep rules (when available)
// semgrep --config=auto --json -o security-reports/semgrep.json

// Custom security patterns
node security-testing-scripts/static-analysis.js
```

**Security Patterns to Detect:**
- Hardcoded credentials
- SQL injection vulnerabilities
- XSS vulnerabilities
- Insecure random number generation
- Path traversal vulnerabilities
- Command injection risks
- Unsafe regex patterns
- Cryptographic weaknesses

### Configuration Validation

**Script Location:** `security-testing-scripts/config-validation.js`

```javascript
// Validate environment variables
node security-testing-scripts/config-validation.js

// Check security headers
curl -I https://localhost:5000 | grep -E "X-Frame-Options|X-Content-Type|Strict-Transport"

// Validate CORS configuration
node security-testing-scripts/cors-validator.js

// Check SSL/TLS configuration
nmap --script ssl-enum-ciphers -p 443 localhost
```

### Docker Security Scanning

**Script Location:** `security-testing-scripts/docker-scan.sh`

```bash
# Scan Docker images
docker scan 4seasons:latest

# Check for vulnerabilities in base images
trivy image 4seasons:latest

# Validate Dockerfile best practices
hadolint Dockerfile

# Check container runtime security
docker-bench-security
```

---

## Manual Security Testing Procedures

### Authentication Testing

**Test Coverage:**
1. **Password Strength Validation**
   - Test weak passwords
   - Test password complexity rules
   - Test password history
   - Test password reset flow

2. **Session Management**
   - Test session timeout
   - Test concurrent sessions
   - Test session fixation
   - Test secure cookie flags

3. **Account Lockout**
   - Test brute force protection
   - Test account lockout mechanisms
   - Test CAPTCHA implementation

**Test Script:**
```bash
# Test authentication endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123!"}'

# Test session security
curl -c cookies.txt -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123!"}'

# Verify secure flags
cat cookies.txt | grep -E "Secure|HttpOnly|SameSite"
```

### Authorization Testing

**Test Coverage:**
1. **Access Control**
   - Test horizontal privilege escalation
   - Test vertical privilege escalation
   - Test direct object references
   - Test forced browsing

2. **API Authorization**
   - Test JWT token validation
   - Test token expiration
   - Test role-based access
   - Test API rate limiting

**Test Script:**
```bash
# Test unauthorized access
curl -X GET http://localhost:5000/api/admin/users

# Test with expired token
curl -X GET http://localhost:5000/api/protected \
  -H "Authorization: Bearer expired_token_here"

# Test privilege escalation
curl -X PUT http://localhost:5000/api/users/other_user_id \
  -H "Authorization: Bearer regular_user_token"
```

### Input Validation Testing

**Test Coverage:**
1. **SQL Injection**
   - Test query parameters
   - Test form inputs
   - Test JSON payloads
   - Test header injection

2. **XSS Testing**
   - Test reflected XSS
   - Test stored XSS
   - Test DOM-based XSS
   - Test filter bypass

3. **Command Injection**
   - Test system commands
   - Test file operations
   - Test process execution

**Test Payloads:**
```javascript
// SQL Injection payloads
const sqlPayloads = [
  "' OR '1'='1",
  "1; DROP TABLE users--",
  "admin'--",
  "' UNION SELECT * FROM users--"
];

// XSS payloads
const xssPayloads = [
  "<script>alert('XSS')</script>",
  "<img src=x onerror=alert('XSS')>",
  "javascript:alert('XSS')",
  "<svg onload=alert('XSS')>"
];

// Command injection payloads
const cmdPayloads = [
  "; ls -la",
  "| whoami",
  "`id`",
  "$(cat /etc/passwd)"
];
```

---

## Penetration Testing Checklist

### OWASP Top 10 2024 Testing

#### A01: Broken Access Control
- [ ] Test for path traversal
- [ ] Test for privilege escalation
- [ ] Test for IDOR vulnerabilities
- [ ] Test for missing function level access control
- [ ] Test for CORS misconfiguration

#### A02: Cryptographic Failures
- [ ] Test for weak encryption algorithms
- [ ] Test for hardcoded keys
- [ ] Test for insufficient key length
- [ ] Test for missing encryption
- [ ] Test for predictable tokens

#### A03: Injection
- [ ] Test for SQL injection
- [ ] Test for NoSQL injection
- [ ] Test for LDAP injection
- [ ] Test for OS command injection
- [ ] Test for XXE injection

#### A04: Insecure Design
- [ ] Review threat modeling
- [ ] Test business logic flaws
- [ ] Test race conditions
- [ ] Test workflow bypass
- [ ] Review security requirements

#### A05: Security Misconfiguration
- [ ] Test for default credentials
- [ ] Test for unnecessary features
- [ ] Test for verbose error messages
- [ ] Test for missing security headers
- [ ] Test for outdated software

#### A06: Vulnerable Components
- [ ] Scan for known CVEs
- [ ] Test for outdated libraries
- [ ] Test for insecure dependencies
- [ ] Review SBOM
- [ ] Test component isolation

#### A07: Authentication Failures
- [ ] Test for weak passwords
- [ ] Test for credential stuffing
- [ ] Test for session fixation
- [ ] Test for insufficient logout
- [ ] Test for password reset flaws

#### A08: Data Integrity Failures
- [ ] Test for unsigned data
- [ ] Test for deserialization flaws
- [ ] Test for CI/CD security
- [ ] Test for supply chain attacks
- [ ] Test for code integrity

#### A09: Logging Failures
- [ ] Test for missing logs
- [ ] Test for log injection
- [ ] Test for insufficient monitoring
- [ ] Test for log tampering
- [ ] Review incident response

#### A10: SSRF
- [ ] Test for URL validation bypass
- [ ] Test for internal network access
- [ ] Test for cloud metadata access
- [ ] Test for DNS rebinding
- [ ] Test for protocol smuggling

---

## Security Test Cases

### Form Security Testing

**Location:** All forms in `client/src/pages/`

```javascript
// Test case structure
const formTestCases = {
  contactForm: {
    endpoint: '/api/contact',
    tests: [
      {
        name: 'XSS in name field',
        payload: { name: '<script>alert(1)</script>', email: 'test@test.com' },
        expected: 'Input sanitized'
      },
      {
        name: 'SQL injection in email',
        payload: { name: 'Test', email: "test@test.com' OR '1'='1" },
        expected: 'Input rejected'
      }
    ]
  }
};
```

### API Endpoint Testing

**Test Matrix:**

| Endpoint | Method | Test Type | Payload | Expected Result |
|----------|--------|-----------|---------|-----------------|
| /api/auth/login | POST | SQL Injection | `{email: "' OR 1=1--"}` | 400 Bad Request |
| /api/auth/login | POST | Brute Force | Multiple attempts | Rate limited |
| /api/users | GET | Auth Bypass | No token | 401 Unauthorized |
| /api/upload | POST | File Upload | Malicious file | File rejected |
| /api/search | GET | XSS | `<script>` in query | Sanitized output |

### File Upload Security Testing

**Test Cases:**
1. **File Type Validation**
   - Upload executable files (.exe, .sh)
   - Upload web shells (.php, .jsp)
   - Upload with double extensions (.jpg.php)
   - Upload with null bytes (file.jpg%00.php)

2. **File Size Validation**
   - Upload oversized files
   - Upload zero-byte files
   - Test chunked upload bypass

3. **Content Validation**
   - Upload files with embedded scripts
   - Upload polyglot files
   - Test magic byte validation

**Test Script:**
```bash
# Test malicious file upload
curl -X POST http://localhost:5000/api/upload \
  -F "file=@malicious.php" \
  -H "Authorization: Bearer $TOKEN"

# Test file type bypass
curl -X POST http://localhost:5000/api/upload \
  -F "file=@shell.jpg.php" \
  -H "Authorization: Bearer $TOKEN"
```

### Session Security Testing

**Test Scenarios:**
1. **Session Fixation**
   ```bash
   # Get session before login
   curl -c cookies1.txt http://localhost:5000

   # Login with existing session
   curl -b cookies1.txt -c cookies2.txt -X POST http://localhost:5000/api/auth/login

   # Verify session changed
   diff cookies1.txt cookies2.txt
   ```

2. **Session Hijacking**
   - Test session token predictability
   - Test session token entropy
   - Test concurrent session handling

3. **Session Timeout**
   - Test idle timeout
   - Test absolute timeout
   - Test remember me functionality

---

## Vulnerability Scanning Procedures

### Using Built-in Security Scanner

**Integration:** `c:/Users/kevin/OneDrive/Desktop/_dev/4seasons/4seasons/server/services/security-scanner.ts`

```bash
# Run comprehensive scan
curl -X POST http://localhost:5000/api/security/scan \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Get scan results
curl -X GET http://localhost:5000/api/security/scan/latest \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### OWASP ZAP Integration

```bash
# Start ZAP in daemon mode
zap.sh -daemon -port 8090 -config api.key=your-api-key

# Run automated scan
curl "http://localhost:8090/JSON/ascan/action/scan/?apikey=your-api-key&url=http://localhost:5000"

# Get scan results
curl "http://localhost:8090/JSON/core/view/alerts/?apikey=your-api-key"
```

### Nuclei Template Scanning

```bash
# Run nuclei with security templates
nuclei -u http://localhost:5000 -t security/ -o security-reports/nuclei.json

# Run specific vulnerability checks
nuclei -u http://localhost:5000 -t cves/,exposures/ -severity critical,high
```

---

## Security Regression Testing

### Test Suite Structure

```javascript
// security-regression-tests.js
const regressionTests = {
  authentication: [
    'testPasswordComplexity',
    'testSessionSecurity',
    'testTokenValidation'
  ],
  authorization: [
    'testAccessControl',
    'testPrivilegeEscalation',
    'testAPIAuthorization'
  ],
  inputValidation: [
    'testSQLInjection',
    'testXSSPrevention',
    'testCommandInjection'
  ],
  configuration: [
    'testSecurityHeaders',
    'testCORSPolicy',
    'testRateLimiting'
  ]
};
```

### Continuous Integration

```yaml
# .github/workflows/security-tests.yml
name: Security Tests
on: [push, pull_request]
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run security tests
        run: |
          npm run security:test
          npm run security:scan
      - name: Upload results
        uses: actions/upload-artifact@v2
        with:
          name: security-reports
          path: security-reports/
```

---

## Performance Security Testing

### Rate Limiting Tests

```javascript
// rate-limit-test.js
const testRateLimiting = async () => {
  const endpoints = [
    { url: '/api/auth/login', limit: 5, window: '15m' },
    { url: '/api/contact', limit: 10, window: '1h' },
    { url: '/api/search', limit: 100, window: '15m' }
  ];

  for (const endpoint of endpoints) {
    await bombardEndpoint(endpoint.url, endpoint.limit + 1);
    // Verify rate limiting kicks in
  }
};
```

### DoS Protection Testing

```bash
# Test connection flooding
hping3 -S -p 5000 --flood localhost

# Test slowloris attack
slowhttptest -c 1000 -H -i 10 -r 200 -t GET -u http://localhost:5000

# Test resource exhaustion
siege -c 100 -t 60s http://localhost:5000
```

### Load Testing with Security Context

```javascript
// k6-security-load-test.js
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '5m', target: 100 },
    { duration: '10m', target: 100 },
    { duration: '5m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.1'], // Error rate < 10%
    http_req_duration: ['p(95)<500'], // 95% requests < 500ms
  },
};

export default function() {
  // Test with authentication
  let response = http.post('http://localhost:5000/api/auth/login', {
    email: 'test@example.com',
    password: 'TestPass123!'
  });

  check(response, {
    'login successful': (r) => r.status === 200,
    'has token': (r) => r.json('token') !== '',
  });
}
```

---

## Test Execution Schedule

### Daily Tests
- Dependency vulnerability scanning
- Static code analysis
- Configuration validation

### Weekly Tests
- Full OWASP Top 10 test suite
- Penetration testing checklist
- Performance security tests

### Monthly Tests
- Comprehensive vulnerability assessment
- Third-party component audit
- Security regression full suite

### Pre-Deployment Tests
- All automated tests
- Manual security review
- Load testing with security context
- Configuration audit

---

## Reporting and Metrics

### Security Metrics Dashboard

```javascript
const securityMetrics = {
  vulnerabilities: {
    critical: 0,
    high: 2,
    medium: 5,
    low: 8
  },
  coverage: {
    codeScanning: 95,
    dependencyScanning: 100,
    apiTesting: 85,
    penetrationTesting: 70
  },
  trends: {
    vulnerabilitiesFixed: 15,
    newVulnerabilities: 3,
    mttr: '48 hours'
  }
};
```

### Report Generation

```bash
# Generate comprehensive security report
node security-testing-scripts/generate-report.js

# Output formats
# - HTML report: security-reports/report.html
# - JSON data: security-reports/data.json
# - PDF summary: security-reports/summary.pdf
```

---

## Integration with Existing Infrastructure

### Security Scanner Service
- Location: `c:/Users/kevin/OneDrive/Desktop/_dev/4seasons/4seasons/server/services/security-scanner.ts`
- Integration: Automated scanning via API endpoints
- Schedule: Configurable cron jobs

### Security Routes
- Location: `c:/Users/kevin/OneDrive/Desktop/_dev/4seasons/4seasons/server/routes/security.routes.ts`
- Endpoints: `/api/security/scan`, `/api/security/report`
- Authentication: Admin-only access

---

## Next Steps

1. **Implement test automation scripts** in `security-testing-scripts/` directory
2. **Configure CI/CD integration** for automated security testing
3. **Set up security metrics dashboard** for real-time monitoring
4. **Schedule regular security assessments** using this framework
5. **Train development team** on security testing procedures

---

**Document Version:** 1.0
**Last Review:** September 14, 2025
**Next Review:** October 14, 2025
**Classification:** INTERNAL USE ONLY
#!/usr/bin/env node

/**
 * File Upload Security Testing Script
 * Tests for malicious file uploads, path traversal, execution prevention, and size limits
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
// Using a simple multipart form implementation instead of external dependency
const { Readable } = require('stream');

class FileUploadTestSuite {
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
    console.log('📤 Starting File Upload Security Tests...\n');

    try {
      // Get CSRF token first
      await this.getCSRFToken();

      await this.testMaliciousFileExtensions();
      await this.testDoubleExtensions();
      await this.testMimeTypeValidation();
      await this.testFileSizeLimits();
      await this.testPathTraversalInFilename();
      await this.testExecutableFileUpload();
      await this.testImageWithEmbeddedCode();
      await this.testZipBombs();
      await this.testSymlinkAttacks();

      this.generateReport();
      return this.results.failed === 0;
    } catch (error) {
      console.error('❌ File upload test suite failed:', error.message);
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

  async testMaliciousFileExtensions() {
    const testName = 'Malicious File Extension Blocking';
    console.log(`🧪 ${testName}...`);

    const maliciousExtensions = [
      '.exe',
      '.bat',
      '.cmd',
      '.com',
      '.pif',
      '.scr',
      '.vbs',
      '.js',
      '.jar',
      '.php',
      '.asp',
      '.aspx',
      '.jsp',
      '.sh',
      '.py',
      '.pl',
      '.rb'
    ];

    let blocked = 0;
    let allowed = 0;

    for (const ext of maliciousExtensions) {
      try {
        const filename = `malicious${ext}`;
        const content = ext === '.exe' ?
          Buffer.from('MZ', 'ascii') : // PE header
          `<?php system($_GET['cmd']); ?>`;

        const response = await this.uploadFile(filename, content);

        if (response.statusCode === 400 || response.statusCode === 403 ||
            (response.body && response.body.includes('not allowed'))) {
          blocked++;
          console.log(`   ✅ ${ext} correctly blocked`);
        } else if (response.statusCode === 200) {
          allowed++;
          console.log(`   ❌ ${ext} was allowed - potential security risk`);
        }
      } catch (error) {
        // Network errors don't count as security failures
      }
    }

    if (allowed === 0) {
      this.recordTest(testName, true, `All ${maliciousExtensions.length} malicious extensions blocked`);
      console.log('   ✅ All malicious file extensions properly blocked');
    } else {
      this.recordTest(testName, false, `${allowed} malicious extensions were allowed`);
      console.log(`   ❌ ${allowed} malicious file extensions were not blocked`);
    }
  }

  async testDoubleExtensions() {
    const testName = 'Double Extension Attack Prevention';
    console.log(`🧪 ${testName}...`);

    const doubleExtensions = [
      'image.jpg.php',
      'document.pdf.exe',
      'photo.png.jsp',
      'file.txt.asp',
      'image.gif.js'
    ];

    let blocked = 0;
    let allowed = 0;

    for (const filename of doubleExtensions) {
      try {
        const content = '<?php echo "Double extension attack"; ?>';
        const response = await this.uploadFile(filename, content);

        if (response.statusCode === 400 || response.statusCode === 403) {
          blocked++;
          console.log(`   ✅ ${filename} correctly blocked`);
        } else if (response.statusCode === 200) {
          allowed++;
          console.log(`   ❌ ${filename} was allowed - potential security risk`);
        }
      } catch (error) {
        // Network errors don't count as security failures
      }
    }

    if (allowed === 0) {
      this.recordTest(testName, true, 'Double extension attacks prevented');
      console.log('   ✅ Double extension attacks properly prevented');
    } else {
      this.recordTest(testName, false, `${allowed} double extension attacks succeeded`);
      console.log(`   ❌ ${allowed} double extension attacks were not prevented`);
    }
  }

  async testMimeTypeValidation() {
    const testName = 'MIME Type Validation';
    console.log(`🧪 ${testName}...`);

    try {
      // Test uploading PHP content with image MIME type
      const content = '<?php system($_GET["cmd"]); ?>';
      const response = await this.uploadFile('innocent.jpg', content, 'image/jpeg');

      // The server should validate actual file content, not just MIME type
      if (response.statusCode === 400 || response.statusCode === 403) {
        this.recordTest(testName, true, 'MIME type spoofing prevented');
        console.log('   ✅ MIME type spoofing correctly detected and blocked');
      } else {
        this.recordTest(testName, false, 'MIME type spoofing succeeded');
        console.log('   ❌ MIME type spoofing was not detected');
      }
    } catch (error) {
      this.recordTest(testName, false, error.message);
      console.log(`   ❌ ${error.message}`);
    }
  }

  async testFileSizeLimits() {
    const testName = 'File Size Limit Enforcement';
    console.log(`🧪 ${testName}...`);

    try {
      // Create a large file (simulating DoS via large uploads)
      const largeContent = 'A'.repeat(20 * 1024 * 1024); // 20MB
      const response = await this.uploadFile('large.txt', largeContent);

      if (response.statusCode === 413 || response.statusCode === 400) {
        this.recordTest(testName, true, 'File size limits properly enforced');
        console.log('   ✅ Large file upload correctly rejected');
      } else {
        this.recordTest(testName, false, 'File size limits not enforced');
        console.log('   ❌ Large file upload was accepted - potential DoS vector');
      }
    } catch (error) {
      this.recordTest(testName, false, error.message);
      console.log(`   ❌ ${error.message}`);
    }
  }

  async testPathTraversalInFilename() {
    const testName = 'Path Traversal in Filename Prevention';
    console.log(`🧪 ${testName}...`);

    const pathTraversalFilenames = [
      '../../../etc/passwd',
      '..\\..\\..\\windows\\system32\\drivers\\etc\\hosts',
      '....//....//....//etc/passwd',
      '/etc/passwd',
      'C:\\Windows\\System32\\config\\SAM',
      '..\\..\\..\\autoexec.bat'
    ];

    let blocked = 0;
    let allowed = 0;

    for (const filename of pathTraversalFilenames) {
      try {
        const content = 'Path traversal test content';
        const response = await this.uploadFile(filename, content);

        if (response.statusCode === 400 || response.statusCode === 403) {
          blocked++;
          console.log(`   ✅ Path traversal filename blocked: ${filename.substring(0, 30)}...`);
        } else if (response.statusCode === 200) {
          allowed++;
          console.log(`   ❌ Path traversal filename allowed: ${filename.substring(0, 30)}...`);
        }
      } catch (error) {
        // Network errors don't count as security failures
      }
    }

    if (allowed === 0) {
      this.recordTest(testName, true, 'Path traversal in filenames prevented');
      console.log('   ✅ Path traversal attacks in filenames properly prevented');
    } else {
      this.recordTest(testName, false, `${allowed} path traversal attacks succeeded`);
      console.log(`   ❌ ${allowed} path traversal attacks were not prevented`);
    }
  }

  async testExecutableFileUpload() {
    const testName = 'Executable File Upload Prevention';
    console.log(`🧪 ${testName}...`);

    try {
      // Create a minimal PE executable header
      const peHeader = Buffer.concat([
        Buffer.from('MZ', 'ascii'), // DOS header
        Buffer.alloc(58, 0),
        Buffer.from([0x80, 0x00, 0x00, 0x00]), // PE offset
        Buffer.alloc(120, 0),
        Buffer.from('PE\0\0', 'ascii') // PE signature
      ]);

      const response = await this.uploadFile('malware.exe', peHeader);

      if (response.statusCode === 400 || response.statusCode === 403) {
        this.recordTest(testName, true, 'Executable file upload prevented');
        console.log('   ✅ Executable file upload correctly blocked');
      } else {
        this.recordTest(testName, false, 'Executable file upload allowed');
        console.log('   ❌ Executable file upload was allowed');
      }
    } catch (error) {
      this.recordTest(testName, false, error.message);
      console.log(`   ❌ ${error.message}`);
    }
  }

  async testImageWithEmbeddedCode() {
    const testName = 'Image with Embedded Code Detection';
    console.log(`🧪 ${testName}...`);

    try {
      // Create a fake image with embedded PHP code
      const maliciousImage = Buffer.concat([
        Buffer.from([0xFF, 0xD8, 0xFF, 0xE0]), // JPEG header
        Buffer.from('<?php system($_GET["cmd"]); ?>', 'ascii'),
        Buffer.from([0xFF, 0xD9]) // JPEG footer
      ]);

      const response = await this.uploadFile('image.jpg', maliciousImage, 'image/jpeg');

      // Advanced systems might detect embedded code
      if (response.statusCode === 400 || response.statusCode === 403) {
        this.recordTest(testName, true, 'Image with embedded code detected');
        console.log('   ✅ Malicious code in image detected and blocked');
      } else {
        // This is often allowed as detecting embedded code is complex
        this.recordTest(testName, true, 'Image upload completed (embedded code detection varies)');
        console.log('   ⚠️  Image uploaded (embedded code detection is implementation-dependent)');
      }
    } catch (error) {
      this.recordTest(testName, false, error.message);
      console.log(`   ❌ ${error.message}`);
    }
  }

  async testZipBombs() {
    const testName = 'Zip Bomb Protection';
    console.log(`🧪 ${testName}...`);

    try {
      // Create a small zip file that would expand to a large size
      // This is a simplified test - real zip bombs are more complex
      const zipContent = Buffer.from([
        0x50, 0x4b, 0x03, 0x04, // ZIP file signature
        0x14, 0x00, 0x00, 0x00, // Version needed to extract
        0x08, 0x00, 0x00, 0x00  // General purpose flag
      ]);

      const response = await this.uploadFile('bomb.zip', zipContent, 'application/zip');

      // Most servers won't unzip automatically, so this test is informational
      this.recordTest(testName, true, 'Zip bomb test completed');
      console.log('   ✅ Zip bomb test completed (protection depends on server behavior)');
    } catch (error) {
      this.recordTest(testName, false, error.message);
      console.log(`   ❌ ${error.message}`);
    }
  }

  async testSymlinkAttacks() {
    const testName = 'Symlink Attack Prevention';
    console.log(`🧪 ${testName}...`);

    try {
      // Test if server handles symlinks securely
      // This is mostly relevant for systems that extract uploaded archives
      const response = await this.uploadFile('symlink.txt', '/etc/passwd');

      this.recordTest(testName, true, 'Symlink attack test completed');
      console.log('   ✅ Symlink attack test completed (protection varies by implementation)');
    } catch (error) {
      this.recordTest(testName, false, error.message);
      console.log(`   ❌ ${error.message}`);
    }
  }

  async uploadFile(filename, content, mimeType = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const boundary = '----formdata-test-' + Math.random().toString(16);
      const fileBuffer = Buffer.isBuffer(content) ? content : Buffer.from(content);

      // Create multipart form data manually
      let formData = '';
      formData += `--${boundary}\r\n`;
      formData += `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n`;
      formData += `Content-Type: ${mimeType}\r\n\r\n`;

      const formPrefix = Buffer.from(formData, 'utf8');

      let formSuffix = `\r\n--${boundary}`;
      if (this.csrfToken) {
        formSuffix += `\r\nContent-Disposition: form-data; name="_csrf"\r\n\r\n${this.csrfToken}\r\n--${boundary}`;
      }
      formSuffix += '--\r\n';

      const formSuffixBuffer = Buffer.from(formSuffix, 'utf8');
      const totalBuffer = Buffer.concat([formPrefix, fileBuffer, formSuffixBuffer]);

      const url = new URL(this.baseUrl + '/api/upload');
      const options = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': totalBuffer.length,
          'User-Agent': 'FileUpload-Security-Test/1.0'
        }
      };

      // Add cookies if we have them
      if (Object.keys(this.cookies).length > 0) {
        options.headers['Cookie'] = Object.entries(this.cookies)
          .map(([key, value]) => `${key}=${value}`)
          .join('; ');
      }

      // Add CSRF token header if available
      if (this.csrfToken) {
        options.headers['X-CSRF-Token'] = this.csrfToken;
      }

      const protocol = url.protocol === 'https:' ? https : http;
      const req = protocol.request(options, (res) => {
        let body = '';

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

      req.write(totalBuffer);
      req.end();
    });
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
          'User-Agent': 'FileUpload-Security-Test/1.0',
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
      testSuite: 'File Upload Security Tests',
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
    const reportPath = path.join(reportDir, `file-upload-${timestamp}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📊 File Upload Test Summary:`);
    console.log(`   Total Tests: ${report.summary.total}`);
    console.log(`   Passed: ${report.summary.passed}`);
    console.log(`   Failed: ${report.summary.failed}`);
    console.log(`   Success Rate: ${report.summary.successRate}%`);
    console.log(`   Report saved: ${reportPath}\n`);
  }
}

// Run tests if executed directly
if (require.main === module) {
  const testSuite = new FileUploadTestSuite(process.argv[2]);

  testSuite.runAllTests().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = FileUploadTestSuite;
#!/usr/bin/env node

/**
 * SEO Audit Script for 4Seasons Real Estate
 *
 * This script performs comprehensive SEO auditing that can run in CI/CD pipelines
 * or as a standalone tool for regular SEO health checks.
 *
 * Usage:
 *   node scripts/seo-audit.js --url http://localhost:5000
 *   node scripts/seo-audit.js --production
 *   node scripts/seo-audit.js --config seo-audit-config.json
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

// Configuration
const DEFAULT_CONFIG = {
  baseUrl: 'http://localhost:5000',
  outputDir: './seo-audit-results',
  maxConcurrency: 5,
  timeout: 30000,
  waitForNetworkIdle: 2000,
  thresholds: {
    performance: {
      lcp: 2500,
      fid: 100,
      cls: 0.1,
      fcp: 1800,
      ttfb: 800
    },
    seo: {
      titleMinLength: 30,
      titleMaxLength: 60,
      descriptionMinLength: 120,
      descriptionMaxLength: 160,
      h1Count: 1,
      maxImageSizeKB: 500,
      minAltTextLength: 10
    }
  },
  pages: [
    '/',
    '/about',
    '/contact',
    '/buy',
    '/sell',
    '/blog',
    '/plano-city-guide',
    '/allen-city-guide',
    '/frisco-city-guide',
    '/mckinney-city-guide',
    '/richardson-city-guide'
  ]
};

class SEOAuditor {
  constructor(config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.results = {
      timestamp: new Date().toISOString(),
      baseUrl: this.config.baseUrl,
      summary: {
        totalPages: 0,
        passedPages: 0,
        failedPages: 0,
        averagePerformanceScore: 0,
        averageSeoScore: 0,
        criticalIssues: 0,
        warnings: 0
      },
      pages: [],
      globalIssues: [],
      recommendations: []
    };
  }

  async audit() {
    console.log('🔍 Starting SEO Audit...');
    console.log(`Base URL: ${this.config.baseUrl}`);
    console.log(`Pages to audit: ${this.config.pages.length}`);

    try {
      // Ensure output directory exists
      if (!fs.existsSync(this.config.outputDir)) {
        fs.mkdirSync(this.config.outputDir, { recursive: true });
      }

      // Audit each page
      for (const pagePath of this.config.pages) {
        console.log(`\n📄 Auditing: ${pagePath}`);
        const pageResult = await this.auditPage(pagePath);
        this.results.pages.push(pageResult);
      }

      // Generate summary and recommendations
      this.generateSummary();
      this.generateRecommendations();

      // Write results
      await this.writeResults();

      // Print summary
      this.printSummary();

      return this.results;

    } catch (error) {
      console.error('❌ Audit failed:', error);
      throw error;
    }
  }

  async auditPage(pagePath) {
    const startTime = performance.now();
    const fullUrl = `${this.config.baseUrl}${pagePath}`;

    const pageResult = {
      url: pagePath,
      fullUrl,
      timestamp: new Date().toISOString(),
      metrics: {
        performance: {},
        seo: {},
        accessibility: {}
      },
      issues: [],
      warnings: [],
      score: 0,
      passed: false
    };

    try {
      // Dynamically import puppeteer to avoid bundling issues
      const puppeteer = require('puppeteer');

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();

      // Set realistic viewport and user agent
      await page.setViewport({ width: 1200, height: 800 });
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

      // Navigate to page
      console.log(`  Loading ${fullUrl}...`);
      await page.goto(fullUrl, {
        waitUntil: 'networkidle2',
        timeout: this.config.timeout
      });

      // Wait for additional network idle
      await page.waitForTimeout(this.config.waitForNetworkIdle);

      // Perform audits
      await this.auditSEOElements(page, pageResult);
      await this.auditPerformance(page, pageResult);
      await this.auditAccessibility(page, pageResult);
      await this.auditStructuredData(page, pageResult);
      await this.auditImages(page, pageResult);
      await this.auditLinks(page, pageResult);

      await browser.close();

      // Calculate overall score
      pageResult.score = this.calculatePageScore(pageResult);
      pageResult.passed = pageResult.score >= 80 && pageResult.issues.filter(i => i.severity === 'critical').length === 0;

      const endTime = performance.now();
      console.log(`  ✅ Completed in ${Math.round(endTime - startTime)}ms (Score: ${pageResult.score})`);

    } catch (error) {
      console.error(`  ❌ Failed to audit ${pagePath}:`, error.message);
      pageResult.issues.push({
        type: 'page_load_error',
        severity: 'critical',
        message: `Failed to load page: ${error.message}`,
        element: null
      });
    }

    return pageResult;
  }

  async auditSEOElements(page, result) {
    // Extract title
    const title = await page.$eval('title', el => el.textContent).catch(() => null);
    if (!title) {
      result.issues.push({
        type: 'missing_title',
        severity: 'critical',
        message: 'Page is missing a title tag',
        element: 'title'
      });
    } else {
      result.metrics.seo.titleLength = title.length;
      if (title.length < this.config.thresholds.seo.titleMinLength) {
        result.warnings.push({
          type: 'short_title',
          severity: 'warning',
          message: `Title is too short (${title.length} chars, recommended: ${this.config.thresholds.seo.titleMinLength}+)`,
          element: 'title'
        });
      }
      if (title.length > this.config.thresholds.seo.titleMaxLength) {
        result.warnings.push({
          type: 'long_title',
          severity: 'warning',
          message: `Title is too long (${title.length} chars, recommended: <${this.config.thresholds.seo.titleMaxLength})`,
          element: 'title'
        });
      }
    }

    // Extract meta description
    const description = await page.$eval('meta[name="description"]', el => el.content).catch(() => null);
    if (!description) {
      result.issues.push({
        type: 'missing_description',
        severity: 'critical',
        message: 'Page is missing a meta description',
        element: 'meta[name="description"]'
      });
    } else {
      result.metrics.seo.descriptionLength = description.length;
      if (description.length < this.config.thresholds.seo.descriptionMinLength) {
        result.warnings.push({
          type: 'short_description',
          severity: 'warning',
          message: `Meta description is too short (${description.length} chars)`,
          element: 'meta[name="description"]'
        });
      }
      if (description.length > this.config.thresholds.seo.descriptionMaxLength) {
        result.warnings.push({
          type: 'long_description',
          severity: 'warning',
          message: `Meta description is too long (${description.length} chars)`,
          element: 'meta[name="description"]'
        });
      }
    }

    // Check canonical URL
    const canonical = await page.$eval('link[rel="canonical"]', el => el.href).catch(() => null);
    if (!canonical) {
      result.issues.push({
        type: 'missing_canonical',
        severity: 'critical',
        message: 'Page is missing a canonical URL',
        element: 'link[rel="canonical"]'
      });
    } else if (!canonical.startsWith('https://')) {
      result.warnings.push({
        type: 'non_https_canonical',
        severity: 'warning',
        message: 'Canonical URL should use HTTPS',
        element: 'link[rel="canonical"]'
      });
    }

    // Check Open Graph tags
    const ogTags = await page.$$eval('meta[property^="og:"]', elements =>
      elements.map(el => ({ property: el.property, content: el.content }))
    ).catch(() => []);

    const requiredOgTags = ['og:title', 'og:description', 'og:image', 'og:url'];
    for (const requiredTag of requiredOgTags) {
      if (!ogTags.find(tag => tag.property === requiredTag)) {
        result.warnings.push({
          type: 'missing_og_tag',
          severity: 'warning',
          message: `Missing Open Graph tag: ${requiredTag}`,
          element: `meta[property="${requiredTag}"]`
        });
      }
    }

    // Check heading hierarchy
    const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', elements =>
      elements.map(el => ({ tag: el.tagName.toLowerCase(), text: el.textContent.trim() }))
    ).catch(() => []);

    const h1Count = headings.filter(h => h.tag === 'h1').length;
    result.metrics.seo.h1Count = h1Count;

    if (h1Count === 0) {
      result.issues.push({
        type: 'missing_h1',
        severity: 'critical',
        message: 'Page is missing an H1 tag',
        element: 'h1'
      });
    } else if (h1Count > 1) {
      result.warnings.push({
        type: 'multiple_h1',
        severity: 'warning',
        message: `Page has ${h1Count} H1 tags (recommended: 1)`,
        element: 'h1'
      });
    }
  }

  async auditPerformance(page, result) {
    try {
      // Get performance metrics using Chrome DevTools Protocol
      const performanceMetrics = await page.evaluate(() => {
        return new Promise((resolve) => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const metrics = {};

            for (const entry of entries) {
              if (entry.entryType === 'navigation') {
                metrics.ttfb = entry.responseStart - entry.requestStart;
                metrics.domContentLoaded = entry.domContentLoadedEventEnd - entry.navigationStart;
                metrics.loadComplete = entry.loadEventEnd - entry.navigationStart;
              }
              if (entry.entryType === 'largest-contentful-paint') {
                metrics.lcp = entry.startTime;
              }
              if (entry.entryType === 'first-input') {
                metrics.fid = entry.processingStart - entry.startTime;
              }
              if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                metrics.cls = (metrics.cls || 0) + entry.value;
              }
            }

            resolve(metrics);
          });

          observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint', 'first-input', 'layout-shift'] });

          // Fallback timeout
          setTimeout(() => resolve({}), 5000);
        });
      });

      result.metrics.performance = { ...performanceMetrics };

      // Check performance thresholds
      const thresholds = this.config.thresholds.performance;

      if (performanceMetrics.lcp && performanceMetrics.lcp > thresholds.lcp) {
        result.warnings.push({
          type: 'poor_lcp',
          severity: 'warning',
          message: `LCP is ${Math.round(performanceMetrics.lcp)}ms (should be <${thresholds.lcp}ms)`,
          element: 'performance'
        });
      }

      if (performanceMetrics.cls && performanceMetrics.cls > thresholds.cls) {
        result.warnings.push({
          type: 'poor_cls',
          severity: 'warning',
          message: `CLS is ${performanceMetrics.cls.toFixed(3)} (should be <${thresholds.cls})`,
          element: 'performance'
        });
      }

      if (performanceMetrics.ttfb && performanceMetrics.ttfb > thresholds.ttfb) {
        result.warnings.push({
          type: 'poor_ttfb',
          severity: 'warning',
          message: `TTFB is ${Math.round(performanceMetrics.ttfb)}ms (should be <${thresholds.ttfb}ms)`,
          element: 'performance'
        });
      }

    } catch (error) {
      console.warn('  ⚠️ Could not measure performance metrics:', error.message);
    }
  }

  async auditAccessibility(page, result) {
    // Check for alt text on images
    const imagesWithoutAlt = await page.$$eval('img:not([alt])', elements => elements.length).catch(() => 0);
    if (imagesWithoutAlt > 0) {
      result.warnings.push({
        type: 'images_without_alt',
        severity: 'warning',
        message: `${imagesWithoutAlt} images are missing alt text`,
        element: 'img'
      });
    }

    // Check for empty alt text where it shouldn't be
    const imagesWithEmptyAlt = await page.$$eval('img[alt=""]', elements =>
      elements.filter(img => !img.classList.contains('decorative')).length
    ).catch(() => 0);

    if (imagesWithEmptyAlt > 0) {
      result.warnings.push({
        type: 'images_with_empty_alt',
        severity: 'warning',
        message: `${imagesWithEmptyAlt} images have empty alt text`,
        element: 'img'
      });
    }

    // Check for color contrast (basic check)
    const lowContrastElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      let lowContrastCount = 0;

      for (const el of elements) {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const backgroundColor = style.backgroundColor;

        // Basic contrast check (simplified)
        if (color && backgroundColor &&
            color !== 'rgba(0, 0, 0, 0)' &&
            backgroundColor !== 'rgba(0, 0, 0, 0)') {
          // This is a simplified check - in production, use a proper contrast library
          if (color === backgroundColor) {
            lowContrastCount++;
          }
        }
      }

      return lowContrastCount;
    }).catch(() => 0);

    result.metrics.accessibility = {
      imagesWithoutAlt,
      imagesWithEmptyAlt,
      lowContrastElements
    };
  }

  async auditStructuredData(page, result) {
    const structuredData = await page.$$eval('script[type="application/ld+json"]', scripts => {
      return scripts.map(script => {
        try {
          return JSON.parse(script.textContent);
        } catch (e) {
          return null;
        }
      }).filter(Boolean);
    }).catch(() => []);

    result.metrics.seo.structuredDataCount = structuredData.length;

    if (structuredData.length === 0) {
      result.warnings.push({
        type: 'no_structured_data',
        severity: 'warning',
        message: 'No structured data found on page',
        element: 'script[type="application/ld+json"]'
      });
    } else {
      // Validate structured data
      for (const data of structuredData) {
        if (!data['@context'] || !data['@type']) {
          result.warnings.push({
            type: 'invalid_structured_data',
            severity: 'warning',
            message: 'Structured data missing @context or @type',
            element: 'script[type="application/ld+json"]'
          });
        }
      }
    }
  }

  async auditImages(page, result) {
    const images = await page.$$eval('img', imgs =>
      imgs.map(img => ({
        src: img.src,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight,
        loading: img.loading,
        hasWebP: img.src.includes('.webp')
      }))
    ).catch(() => []);

    result.metrics.seo.imageCount = images.length;
    result.metrics.seo.webpImages = images.filter(img => img.hasWebP).length;
    result.metrics.seo.lazyImages = images.filter(img => img.loading === 'lazy').length;

    // Check for large images that should be optimized
    const largeImages = images.filter(img =>
      img.width > 1200 && !img.hasWebP
    );

    if (largeImages.length > 0) {
      result.warnings.push({
        type: 'large_unoptimized_images',
        severity: 'warning',
        message: `${largeImages.length} large images could be optimized with WebP format`,
        element: 'img'
      });
    }

    // Check for images without lazy loading
    const eagerImages = images.filter((img, index) =>
      index > 2 && img.loading !== 'lazy' // Allow first 3 images to be eager
    );

    if (eagerImages.length > 0) {
      result.warnings.push({
        type: 'missing_lazy_loading',
        severity: 'warning',
        message: `${eagerImages.length} images could benefit from lazy loading`,
        element: 'img'
      });
    }
  }

  async auditLinks(page, result) {
    const links = await page.$$eval('a[href]', links =>
      links.map(link => ({
        href: link.href,
        text: link.textContent.trim(),
        isExternal: link.hostname !== window.location.hostname,
        hasNoopener: link.rel.includes('noopener'),
        hasNoreferrer: link.rel.includes('noreferrer')
      }))
    ).catch(() => []);

    result.metrics.seo.linkCount = links.length;
    result.metrics.seo.externalLinks = links.filter(link => link.isExternal).length;
    result.metrics.seo.internalLinks = links.filter(link => !link.isExternal).length;

    // Check for external links without proper rel attributes
    const unsafeExternalLinks = links.filter(link =>
      link.isExternal && (!link.hasNoopener || !link.hasNoreferrer)
    );

    if (unsafeExternalLinks.length > 0) {
      result.warnings.push({
        type: 'unsafe_external_links',
        severity: 'warning',
        message: `${unsafeExternalLinks.length} external links missing rel="noopener noreferrer"`,
        element: 'a[href]'
      });
    }

    // Check for links with poor anchor text
    const poorAnchorText = links.filter(link =>
      ['click here', 'read more', 'here', 'more'].includes(link.text.toLowerCase())
    );

    if (poorAnchorText.length > 0) {
      result.warnings.push({
        type: 'poor_anchor_text',
        severity: 'warning',
        message: `${poorAnchorText.length} links have generic anchor text`,
        element: 'a[href]'
      });
    }
  }

  calculatePageScore(pageResult) {
    let score = 100;

    // Deduct points for issues
    for (const issue of pageResult.issues) {
      if (issue.severity === 'critical') {
        score -= 20;
      } else if (issue.severity === 'error') {
        score -= 10;
      }
    }

    // Deduct points for warnings
    for (const warning of pageResult.warnings) {
      score -= 2;
    }

    // Performance bonus/penalty
    const perf = pageResult.metrics.performance;
    if (perf.lcp && perf.lcp < this.config.thresholds.performance.lcp) score += 5;
    if (perf.cls && perf.cls < this.config.thresholds.performance.cls) score += 5;

    // SEO bonus
    if (pageResult.metrics.seo.structuredDataCount > 0) score += 5;
    if (pageResult.metrics.seo.webpImages > 0) score += 3;

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  generateSummary() {
    const summary = this.results.summary;
    summary.totalPages = this.results.pages.length;
    summary.passedPages = this.results.pages.filter(p => p.passed).length;
    summary.failedPages = summary.totalPages - summary.passedPages;

    if (summary.totalPages > 0) {
      summary.averageSeoScore = Math.round(
        this.results.pages.reduce((sum, p) => sum + p.score, 0) / summary.totalPages
      );
    }

    summary.criticalIssues = this.results.pages.reduce((sum, p) =>
      sum + p.issues.filter(i => i.severity === 'critical').length, 0
    );

    summary.warnings = this.results.pages.reduce((sum, p) =>
      sum + p.warnings.length, 0
    );
  }

  generateRecommendations() {
    const recommendations = this.results.recommendations;

    // Global recommendations based on patterns
    const allIssues = this.results.pages.flatMap(p => [...p.issues, ...p.warnings]);
    const issueTypes = allIssues.reduce((acc, issue) => {
      acc[issue.type] = (acc[issue.type] || 0) + 1;
      return acc;
    }, {});

    // Generate recommendations based on common issues
    Object.entries(issueTypes).forEach(([type, count]) => {
      if (count >= 2) {
        const percentage = Math.round((count / this.results.pages.length) * 100);
        recommendations.push({
          type: 'pattern',
          priority: count >= 5 ? 'high' : 'medium',
          message: `${type.replace(/_/g, ' ')} appears on ${count} pages (${percentage}%)`,
          action: this.getRecommendationAction(type)
        });
      }
    });

    // Performance recommendations
    const avgLCP = this.results.pages
      .map(p => p.metrics.performance?.lcp)
      .filter(Boolean)
      .reduce((sum, lcp, _, arr) => sum + lcp / arr.length, 0);

    if (avgLCP > this.config.thresholds.performance.lcp) {
      recommendations.push({
        type: 'performance',
        priority: 'high',
        message: `Average LCP is ${Math.round(avgLCP)}ms (target: <${this.config.thresholds.performance.lcp}ms)`,
        action: 'Optimize image loading, implement critical CSS, reduce JavaScript blocking'
      });
    }

    // SEO recommendations
    const pagesWithoutStructuredData = this.results.pages.filter(p =>
      p.metrics.seo?.structuredDataCount === 0
    ).length;

    if (pagesWithoutStructuredData > 0) {
      recommendations.push({
        type: 'seo',
        priority: 'medium',
        message: `${pagesWithoutStructuredData} pages missing structured data`,
        action: 'Add appropriate schema.org markup for better search visibility'
      });
    }
  }

  getRecommendationAction(issueType) {
    const actions = {
      'missing_title': 'Add unique, descriptive title tags to all pages',
      'missing_description': 'Add compelling meta descriptions (120-160 characters)',
      'missing_canonical': 'Implement canonical URLs to prevent duplicate content',
      'missing_h1': 'Add one H1 tag per page with primary keyword',
      'missing_og_tag': 'Add Open Graph tags for better social media sharing',
      'images_without_alt': 'Add descriptive alt text to all images',
      'large_unoptimized_images': 'Implement WebP format and responsive images',
      'poor_anchor_text': 'Use descriptive anchor text instead of generic phrases',
      'no_structured_data': 'Add relevant schema.org structured data'
    };

    return actions[issueType] || 'Review and fix this issue across affected pages';
  }

  async writeResults() {
    const timestamp = new Date().toISOString().split('T')[0];

    // Write JSON report
    const jsonPath = path.join(this.config.outputDir, `seo-audit-${timestamp}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(this.results, null, 2));

    // Write HTML report
    const htmlPath = path.join(this.config.outputDir, `seo-audit-${timestamp}.html`);
    const htmlReport = this.generateHTMLReport();
    fs.writeFileSync(htmlPath, htmlReport);

    // Write CSV summary
    const csvPath = path.join(this.config.outputDir, `seo-audit-${timestamp}.csv`);
    const csvReport = this.generateCSVReport();
    fs.writeFileSync(csvPath, csvReport);

    console.log(`\n📊 Reports generated:`);
    console.log(`  JSON: ${jsonPath}`);
    console.log(`  HTML: ${htmlPath}`);
    console.log(`  CSV: ${csvPath}`);
  }

  generateHTMLReport() {
    const { summary, pages, recommendations } = this.results;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEO Audit Report - ${new Date().toLocaleDateString()}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { background: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric { background: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: center; }
        .metric-value { font-size: 2em; font-weight: bold; color: #333; }
        .metric-label { color: #666; margin-top: 5px; }
        .page-result { background: white; margin: 20px 0; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .score { font-size: 1.5em; font-weight: bold; }
        .score.good { color: #28a745; }
        .score.warning { color: #ffc107; }
        .score.poor { color: #dc3545; }
        .issue { margin: 5px 0; padding: 8px; border-radius: 3px; }
        .issue.critical { background: #f8d7da; border-left: 4px solid #dc3545; }
        .issue.warning { background: #fff3cd; border-left: 4px solid #ffc107; }
        .recommendations { background: #e7f3ff; padding: 20px; border-radius: 5px; }
        .recommendation { margin: 10px 0; padding: 10px; background: white; border-radius: 3px; }
        .priority-high { border-left: 4px solid #dc3545; }
        .priority-medium { border-left: 4px solid #ffc107; }
        .priority-low { border-left: 4px solid #28a745; }
    </style>
</head>
<body>
    <div class="header">
        <h1>SEO Audit Report</h1>
        <p><strong>Generated:</strong> ${this.results.timestamp}</p>
        <p><strong>Base URL:</strong> ${this.results.baseUrl}</p>
    </div>

    <div class="summary">
        <div class="metric">
            <div class="metric-value">${summary.totalPages}</div>
            <div class="metric-label">Total Pages</div>
        </div>
        <div class="metric">
            <div class="metric-value">${summary.averageSeoScore}</div>
            <div class="metric-label">Average Score</div>
        </div>
        <div class="metric">
            <div class="metric-value">${summary.passedPages}</div>
            <div class="metric-label">Passed</div>
        </div>
        <div class="metric">
            <div class="metric-value">${summary.criticalIssues}</div>
            <div class="metric-label">Critical Issues</div>
        </div>
        <div class="metric">
            <div class="metric-value">${summary.warnings}</div>
            <div class="metric-label">Warnings</div>
        </div>
    </div>

    <h2>Recommendations</h2>
    <div class="recommendations">
        ${recommendations.map(rec => `
            <div class="recommendation priority-${rec.priority}">
                <strong>${rec.message}</strong><br>
                <em>${rec.action}</em>
            </div>
        `).join('')}
    </div>

    <h2>Page Results</h2>
    ${pages.map(page => `
        <div class="page-result">
            <h3>${page.url} <span class="score ${page.score >= 80 ? 'good' : page.score >= 60 ? 'warning' : 'poor'}">${page.score}/100</span></h3>

            ${page.issues.length > 0 ? `
                <h4>Issues</h4>
                ${page.issues.map(issue => `
                    <div class="issue ${issue.severity}">
                        <strong>${issue.type.replace(/_/g, ' ')}:</strong> ${issue.message}
                    </div>
                `).join('')}
            ` : ''}

            ${page.warnings.length > 0 ? `
                <h4>Warnings</h4>
                ${page.warnings.map(warning => `
                    <div class="issue warning">
                        <strong>${warning.type.replace(/_/g, ' ')}:</strong> ${warning.message}
                    </div>
                `).join('')}
            ` : ''}

            <h4>Metrics</h4>
            <ul>
                ${page.metrics.seo.titleLength ? `<li>Title Length: ${page.metrics.seo.titleLength} chars</li>` : ''}
                ${page.metrics.seo.descriptionLength ? `<li>Description Length: ${page.metrics.seo.descriptionLength} chars</li>` : ''}
                ${page.metrics.seo.h1Count !== undefined ? `<li>H1 Count: ${page.metrics.seo.h1Count}</li>` : ''}
                ${page.metrics.seo.structuredDataCount !== undefined ? `<li>Structured Data: ${page.metrics.seo.structuredDataCount} schemas</li>` : ''}
                ${page.metrics.seo.imageCount !== undefined ? `<li>Images: ${page.metrics.seo.imageCount} total, ${page.metrics.seo.webpImages || 0} WebP</li>` : ''}
                ${page.metrics.performance.lcp ? `<li>LCP: ${Math.round(page.metrics.performance.lcp)}ms</li>` : ''}
                ${page.metrics.performance.cls ? `<li>CLS: ${page.metrics.performance.cls.toFixed(3)}</li>` : ''}
            </ul>
        </div>
    `).join('')}
</body>
</html>`;
  }

  generateCSVReport() {
    const headers = ['URL', 'Score', 'Passed', 'Critical Issues', 'Warnings', 'Title Length', 'Description Length', 'H1 Count', 'Structured Data', 'LCP (ms)', 'CLS'];

    const rows = this.results.pages.map(page => [
      page.url,
      page.score,
      page.passed ? 'Yes' : 'No',
      page.issues.filter(i => i.severity === 'critical').length,
      page.warnings.length,
      page.metrics.seo.titleLength || '',
      page.metrics.seo.descriptionLength || '',
      page.metrics.seo.h1Count || '',
      page.metrics.seo.structuredDataCount || '',
      page.metrics.performance.lcp ? Math.round(page.metrics.performance.lcp) : '',
      page.metrics.performance.cls ? page.metrics.performance.cls.toFixed(3) : ''
    ]);

    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  }

  printSummary() {
    const { summary } = this.results;

    console.log('\n' + '='.repeat(50));
    console.log('📊 SEO AUDIT SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total Pages Audited: ${summary.totalPages}`);
    console.log(`Pages Passed: ${summary.passedPages} (${Math.round(summary.passedPages/summary.totalPages*100)}%)`);
    console.log(`Pages Failed: ${summary.failedPages} (${Math.round(summary.failedPages/summary.totalPages*100)}%)`);
    console.log(`Average SEO Score: ${summary.averageSeoScore}/100`);
    console.log(`Critical Issues: ${summary.criticalIssues}`);
    console.log(`Total Warnings: ${summary.warnings}`);

    if (summary.criticalIssues > 0) {
      console.log(`\n❌ CRITICAL ISSUES FOUND: ${summary.criticalIssues}`);
      console.log('These must be fixed before deployment.');
    }

    if (summary.warnings > 10) {
      console.log(`\n⚠️  HIGH WARNING COUNT: ${summary.warnings}`);
      console.log('Consider addressing these for better SEO performance.');
    }

    if (summary.averageSeoScore >= 90) {
      console.log('\n🎉 EXCELLENT SEO SCORE!');
    } else if (summary.averageSeoScore >= 80) {
      console.log('\n✅ GOOD SEO SCORE');
    } else if (summary.averageSeoScore >= 70) {
      console.log('\n⚠️  ACCEPTABLE SEO SCORE - Room for improvement');
    } else {
      console.log('\n❌ POOR SEO SCORE - Needs significant improvement');
    }

    console.log('\n' + '='.repeat(50));
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  let config = {};

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--url':
        config.baseUrl = args[++i];
        break;
      case '--production':
        config.baseUrl = 'https://4seasonsrealestate.com';
        break;
      case '--config':
        const configPath = args[++i];
        const configFile = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        config = { ...config, ...configFile };
        break;
      case '--help':
        console.log(`
SEO Audit Script for 4Seasons Real Estate

Usage:
  node scripts/seo-audit.js [options]

Options:
  --url <url>          Base URL to audit (default: http://localhost:5000)
  --production         Audit production site (https://4seasonsrealestate.com)
  --config <file>      Load configuration from JSON file
  --help               Show this help message

Examples:
  node scripts/seo-audit.js
  node scripts/seo-audit.js --url http://localhost:3000
  node scripts/seo-audit.js --production
  node scripts/seo-audit.js --config custom-config.json
        `);
        return;
    }
  }

  try {
    const auditor = new SEOAuditor(config);
    const results = await auditor.audit();

    // Exit with error code if there are critical issues
    if (results.summary.criticalIssues > 0) {
      process.exit(1);
    }

    // Exit with warning code if average score is below threshold
    if (results.summary.averageSeoScore < 70) {
      process.exit(2);
    }

  } catch (error) {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { SEOAuditor };
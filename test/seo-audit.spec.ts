import { test, expect, Page } from '@playwright/test';
import { readFileSync } from 'fs';
import { glob } from 'glob';
import path from 'path';

interface SEOAuditResult {
  url: string;
  title?: string;
  description?: string;
  canonical?: string;
  openGraph: Record<string, string>;
  twitterCard: Record<string, string>;
  structuredData: any[];
  breadcrumbs?: any;
  headingHierarchy: string[];
  images: { src: string; alt: string; hasOptimization: boolean }[];
  internalLinks: { href: string; text: string }[];
  issues: string[];
  performance: {
    lcp?: number;
    fid?: number;
    cls?: number;
  };
}

interface SEOReport {
  pages: SEOAuditResult[];
  summary: {
    totalPages: number;
    pagesWithIssues: number;
    commonIssues: Record<string, number>;
    performanceScores: {
      averageLCP: number;
      averageCLS: number;
      pagesAboveThresholds: number;
    };
  };
}

const BASE_URL = 'http://localhost:5000';

// Key pages to audit
const PAGES_TO_AUDIT = [
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
  '/richardson-city-guide',
  '/city-guides/plano',
  '/city-guides/allen',
  '/city-guides/frisco'
];

async function auditPage(page: Page, url: string): Promise<SEOAuditResult> {
  const fullUrl = `${BASE_URL}${url}`;
  const issues: string[] = [];

  await page.goto(fullUrl, { waitUntil: 'networkidle' });

  // Extract title
  const title = await page.locator('title').textContent();
  if (!title || title.length === 0) {
    issues.push('Missing or empty title tag');
  } else if (title.length > 60) {
    issues.push(`Title too long (${title.length} characters, should be ≤60)`);
  }

  // Extract meta description
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  if (!description || description.length === 0) {
    issues.push('Missing meta description');
  } else if (description.length > 160) {
    issues.push(`Meta description too long (${description.length} characters, should be ≤160)`);
  }

  // Extract canonical URL
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  if (!canonical) {
    issues.push('Missing canonical URL');
  } else if (!canonical.startsWith('https://')) {
    issues.push('Canonical URL should use HTTPS');
  }

  // Extract Open Graph tags
  const openGraph: Record<string, string> = {};
  const ogTags = await page.locator('meta[property^="og:"]').all();
  for (const tag of ogTags) {
    const property = await tag.getAttribute('property');
    const content = await tag.getAttribute('content');
    if (property && content) {
      openGraph[property] = content;
    }
  }

  if (!openGraph['og:title']) {
    issues.push('Missing og:title');
  }
  if (!openGraph['og:description']) {
    issues.push('Missing og:description');
  }
  if (!openGraph['og:image']) {
    issues.push('Missing og:image');
  }
  if (!openGraph['og:url']) {
    issues.push('Missing og:url');
  }

  // Extract Twitter Card tags
  const twitterCard: Record<string, string> = {};
  const twitterTags = await page.locator('meta[name^="twitter:"]').all();
  for (const tag of twitterTags) {
    const name = await tag.getAttribute('name');
    const content = await tag.getAttribute('content');
    if (name && content) {
      twitterCard[name] = content;
    }
  }

  if (!twitterCard['twitter:card']) {
    issues.push('Missing twitter:card');
  }

  // Extract structured data
  const structuredData: any[] = [];
  let breadcrumbs;
  const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
  for (const script of jsonLdScripts) {
    const content = await script.textContent();
    if (content) {
      try {
        const data = JSON.parse(content);

        // Handle @graph wrapper or direct object
        if (data['@graph'] && Array.isArray(data['@graph'])) {
          // Add each item from @graph to structuredData
          data['@graph'].forEach((item: any) => {
            structuredData.push(item);
            if (item['@type'] === 'BreadcrumbList') {
              breadcrumbs = item;
            }
          });
        } else {
          structuredData.push(data);
          if (data['@type'] === 'BreadcrumbList') {
            breadcrumbs = data;
          }
        }
      } catch (e) {
        issues.push('Invalid JSON-LD structured data');
      }
    }
  }

  if (structuredData.length === 0) {
    issues.push('No structured data found');
  }

  // Extract heading hierarchy
  const headingHierarchy: string[] = [];
  const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
  for (const heading of headings) {
    const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
    const text = await heading.textContent();
    headingHierarchy.push(`${tagName}: ${text?.substring(0, 50) || ''}`);
  }

  const h1Count = headingHierarchy.filter(h => h.startsWith('h1:')).length;
  if (h1Count === 0) {
    issues.push('Missing H1 tag');
  } else if (h1Count > 1) {
    issues.push(`Multiple H1 tags found (${h1Count})`);
  }

  // Extract images and check optimization
  const images: { src: string; alt: string; hasOptimization: boolean }[] = [];
  const imgElements = await page.locator('img').all();
  for (const img of imgElements) {
    const src = await img.getAttribute('src') || '';
    const alt = await img.getAttribute('alt') || '';
    const hasOptimization = src.includes('.webp') || await img.getAttribute('loading') === 'lazy';

    images.push({ src, alt, hasOptimization });

    if (!alt) {
      issues.push(`Image missing alt text: ${src.substring(0, 50)}`);
    }
    if (!hasOptimization) {
      issues.push(`Image not optimized: ${src.substring(0, 50)}`);
    }
  }

  // Extract internal links
  const internalLinks: { href: string; text: string }[] = [];
  const linkElements = await page.locator('a[href^="/"], a[href^="#"]').all();
  for (const link of linkElements) {
    const href = await link.getAttribute('href') || '';
    const text = await link.textContent() || '';
    internalLinks.push({ href, text: text.substring(0, 50) });
  }

  // Measure Core Web Vitals
  const performance = await page.evaluate(() => {
    return new Promise((resolve) => {
      const vitals: any = {};

      // LCP (Largest Contentful Paint)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          vitals.lcp = entries[entries.length - 1].startTime;
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // CLS (Cumulative Layout Shift)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        vitals.cls = clsValue;
      }).observe({ entryTypes: ['layout-shift'] });

      // FID would require real user interaction, skip for automated testing

      setTimeout(() => resolve(vitals), 3000);
    });
  });

  // Check performance thresholds
  if (performance.lcp && performance.lcp > 2500) {
    issues.push(`Poor LCP: ${Math.round(performance.lcp)}ms (should be ≤2500ms)`);
  }
  if (performance.cls && performance.cls > 0.1) {
    issues.push(`Poor CLS: ${performance.cls.toFixed(3)} (should be ≤0.1)`);
  }

  return {
    url,
    title: title || undefined,
    description: description || undefined,
    canonical: canonical || undefined,
    openGraph,
    twitterCard,
    structuredData,
    breadcrumbs,
    headingHierarchy,
    images,
    internalLinks,
    issues,
    performance
  };
}

test.describe('SEO Audit', () => {
  let report: SEOReport;

  test.beforeAll(async () => {
    report = {
      pages: [],
      summary: {
        totalPages: 0,
        pagesWithIssues: 0,
        commonIssues: {},
        performanceScores: {
          averageLCP: 0,
          averageCLS: 0,
          pagesAboveThresholds: 0
        }
      }
    };
  });

  test.afterAll(async () => {
    // Generate summary statistics
    report.summary.totalPages = report.pages.length;
    report.summary.pagesWithIssues = report.pages.filter(p => p.issues.length > 0).length;

    // Count common issues
    const allIssues = report.pages.flatMap(p => p.issues);
    for (const issue of allIssues) {
      const key = issue.split(':')[0]; // Group similar issues
      report.summary.commonIssues[key] = (report.summary.commonIssues[key] || 0) + 1;
    }

    // Calculate performance averages
    const lcpValues = report.pages.map(p => p.performance.lcp).filter(Boolean) as number[];
    const clsValues = report.pages.map(p => p.performance.cls).filter(Boolean) as number[];

    if (lcpValues.length > 0) {
      report.summary.performanceScores.averageLCP = lcpValues.reduce((a, b) => a + b, 0) / lcpValues.length;
    }
    if (clsValues.length > 0) {
      report.summary.performanceScores.averageCLS = clsValues.reduce((a, b) => a + b, 0) / clsValues.length;
    }

    report.summary.performanceScores.pagesAboveThresholds = report.pages.filter(p =>
      (p.performance.lcp && p.performance.lcp <= 2500) &&
      (p.performance.cls && p.performance.cls <= 0.1)
    ).length;

    // Write detailed report
    const reportPath = path.join(__dirname, '..', 'test-results', 'seo-audit-report.json');
    const fs = await import('fs');

    // Ensure directory exists
    const dir = path.dirname(reportPath);
    fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n📊 SEO Audit Summary:');
    console.log(`Total pages audited: ${report.summary.totalPages}`);
    console.log(`Pages with issues: ${report.summary.pagesWithIssues}`);
    console.log(`Average LCP: ${Math.round(report.summary.performanceScores.averageLCP)}ms`);
    console.log(`Average CLS: ${report.summary.performanceScores.averageCLS.toFixed(3)}`);
    console.log(`Pages meeting Core Web Vitals: ${report.summary.performanceScores.pagesAboveThresholds}/${report.summary.totalPages}`);

    console.log('\n🔥 Most Common Issues:');
    Object.entries(report.summary.commonIssues)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([issue, count]) => {
        console.log(`  ${issue}: ${count} pages`);
      });
  });

  for (const url of PAGES_TO_AUDIT) {
    test(`SEO audit for ${url}`, async ({ page }) => {
      const result = await auditPage(page, url);
      report.pages.push(result);

      // Assert critical SEO requirements
      expect(result.title, `Page ${url} should have a title`).toBeTruthy();
      expect(result.description, `Page ${url} should have a meta description`).toBeTruthy();
      expect(result.canonical, `Page ${url} should have a canonical URL`).toBeTruthy();
      expect(result.structuredData.length, `Page ${url} should have structured data`).toBeGreaterThan(0);

      // Assert Open Graph requirements
      expect(result.openGraph['og:title'], `Page ${url} should have og:title`).toBeTruthy();
      expect(result.openGraph['og:description'], `Page ${url} should have og:description`).toBeTruthy();

      // Assert heading hierarchy
      const h1Count = result.headingHierarchy.filter(h => h.startsWith('h1:')).length;
      expect(h1Count, `Page ${url} should have exactly one H1 tag`).toBe(1);

      // Assert performance thresholds (warnings, not failures)
      if (result.performance.lcp && result.performance.lcp > 2500) {
        console.warn(`⚠️  LCP warning for ${url}: ${Math.round(result.performance.lcp)}ms`);
      }
      if (result.performance.cls && result.performance.cls > 0.1) {
        console.warn(`⚠️  CLS warning for ${url}: ${result.performance.cls.toFixed(3)}`);
      }

      // Log critical issues
      const criticalIssues = result.issues.filter(issue =>
        issue.includes('Missing') || issue.includes('Multiple H1')
      );
      if (criticalIssues.length > 0) {
        console.warn(`🚨 Critical SEO issues found on ${url}:`, criticalIssues);
      }
    });
  }

  test('Validate structured data schemas', async ({ page }) => {
    for (const url of ['/plano-city-guide', '/allen-city-guide', '/']) {
      await page.goto(`${BASE_URL}${url}`);

      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        if (content) {
          const data = JSON.parse(content);

          // Helper function to validate a single structured data object
          const validateStructuredDataObject = (obj: any, context: string, options: { requireContext?: boolean } = { requireContext: true }) => {
            // Validate required @context (only when required) and @type
            if (options.requireContext) {
              expect(obj['@context'], `${context} should have @context`).toBeTruthy();
            }
            expect(obj['@type'], `${context} should have @type`).toBeTruthy();

            // Validate specific schema types
            if (obj['@type'] === 'LocalBusiness') {
              expect(obj.name, 'LocalBusiness should have name').toBeTruthy();
              expect(obj.address, 'LocalBusiness should have address').toBeTruthy();
              expect(obj.telephone, 'LocalBusiness should have telephone').toBeTruthy();
            }

            if (obj['@type'] === 'RealEstateAgent') {
              expect(obj.name, 'RealEstateAgent should have name').toBeTruthy();
              expect(obj.areaServed, 'RealEstateAgent should have areaServed').toBeTruthy();
            }

            if (obj['@type'] === 'BreadcrumbList') {
              expect(obj.itemListElement, 'BreadcrumbList should have itemListElement').toBeTruthy();
              expect(Array.isArray(obj.itemListElement), 'itemListElement should be array').toBe(true);
            }

            if (obj['@type'] === 'Organization') {
              expect(obj.name, 'Organization should have name').toBeTruthy();
            }

            if (obj['@type'] === 'Person') {
              expect(obj.name, 'Person should have name').toBeTruthy();
            }
          };

          // Handle @graph wrapper or direct object
          if (data['@graph'] && Array.isArray(data['@graph'])) {
            // Validate @graph wrapper has @context
            expect(data['@context'], `@graph wrapper on ${url} should have @context`).toBeTruthy();

            // Validate each item in @graph (context is provided at wrapper level)
            data['@graph'].forEach((item: any, index: number) => {
              validateStructuredDataObject(item, `@graph item ${index} on ${url}`, { requireContext: false });
            });
          } else {
            // Validate single object (should have its own @context)
            validateStructuredDataObject(data, `Structured data on ${url}`, { requireContext: true });
          }
        }
      }
    }
  });

  test('Check for duplicate meta tags', async ({ page }) => {
    for (const url of PAGES_TO_AUDIT.slice(0, 5)) { // Check first 5 pages
      await page.goto(`${BASE_URL}${url}`);

      // Check for duplicate titles
      const titleCount = await page.locator('title').count();
      expect(titleCount, `Page ${url} should have exactly one title tag`).toBe(1);

      // Check for duplicate meta descriptions
      const descCount = await page.locator('meta[name="description"]').count();
      expect(descCount, `Page ${url} should have exactly one meta description`).toBeLessThanOrEqual(1);

      // Check for duplicate canonical URLs
      const canonicalCount = await page.locator('link[rel="canonical"]').count();
      expect(canonicalCount, `Page ${url} should have exactly one canonical URL`).toBeLessThanOrEqual(1);

      // Check for duplicate Open Graph tags
      const ogTitleCount = await page.locator('meta[property="og:title"]').count();
      expect(ogTitleCount, `Page ${url} should have exactly one og:title`).toBeLessThanOrEqual(1);
    }
  });
});
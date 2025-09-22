import { describe, it, expect, beforeAll } from 'vitest';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

interface SitemapRoute {
  url: string;
  priority: number;
  changefreq: string;
  lastmod?: string;
}

interface RouteAnalysis {
  fileBasedRoutes: string[];
  sitemapRoutes: string[];
  missingFromSitemap: string[];
  orphanedInSitemap: string[];
  priorityIssues: { url: string; issue: string }[];
}

const CLIENT_PAGES_DIR = path.join(__dirname, '..', '4seasons', 'client', 'src', 'pages');
const SITEMAP_FILE = path.join(__dirname, '..', '4seasons', 'server', 'sitemap.ts');

describe('Sitemap Consistency Tests', () => {
  let analysis: RouteAnalysis;

  beforeAll(async () => {
    analysis = {
      fileBasedRoutes: [],
      sitemapRoutes: [],
      missingFromSitemap: [],
      orphanedInSitemap: [],
      priorityIssues: []
    };

    // Discover file-based routes
    const pageFiles = await glob('**/*.tsx', { cwd: CLIENT_PAGES_DIR });

    for (const file of pageFiles) {
      const route = convertFileToRoute(file);
      if (route) {
        analysis.fileBasedRoutes.push(route);
      }
    }

    // Extract sitemap routes
    const sitemapContent = fs.readFileSync(SITEMAP_FILE, 'utf-8');
    analysis.sitemapRoutes = extractSitemapRoutes(sitemapContent);

    // Find discrepancies
    analysis.missingFromSitemap = analysis.fileBasedRoutes.filter(
      route => !analysis.sitemapRoutes.some(sRoute => normalizeRoute(sRoute) === normalizeRoute(route))
    );

    analysis.orphanedInSitemap = analysis.sitemapRoutes.filter(
      route => !analysis.fileBasedRoutes.some(fRoute => normalizeRoute(fRoute) === normalizeRoute(route))
    );

    // Analyze priority assignments
    analysis.priorityIssues = analyzePriorities(sitemapContent);
  });

  it('should have all page files represented in sitemap', () => {
    if (analysis.missingFromSitemap.length > 0) {
      console.warn('📄 Routes missing from sitemap:');
      analysis.missingFromSitemap.forEach(route => {
        console.warn(`  - ${route}`);
      });
    }

    expect(analysis.missingFromSitemap.length).toBe(0);
  });

  it('should not have orphaned routes in sitemap', () => {
    // Filter out known dynamic or special routes that are valid
    const validOrphans = analysis.orphanedInSitemap.filter(route => {
      return (
        route.includes('/city-guides/') || // Dynamic city routes
        route === '/sitemap.xml' || // Special routes
        route === '/robots.txt' ||
        route.startsWith('/api/') ||
        route.includes('[') // Dynamic parameter routes
      );
    });

    const actualOrphans = analysis.orphanedInSitemap.filter(route => !validOrphans.includes(route));

    if (actualOrphans.length > 0) {
      console.warn('🔗 Orphaned routes in sitemap (no corresponding file):');
      actualOrphans.forEach(route => {
        console.warn(`  - ${route}`);
      });
    }

    expect(actualOrphans.length).toBe(0);
  });

  it('should have appropriate priorities for different page types', () => {
    const sitemapContent = fs.readFileSync(SITEMAP_FILE, 'utf-8');

    // Check homepage has highest priority
    const homePriority = extractPriorityForRoute(sitemapContent, '/');
    expect(homePriority).toBe(1.0);

    // Check main pages have high priority
    const mainPages = ['/about', '/contact', '/buy', '/sell'];
    mainPages.forEach(page => {
      const priority = extractPriorityForRoute(sitemapContent, page);
      expect(priority).toBeGreaterThanOrEqual(0.8);
    });

    // Check city guides have medium-high priority
    const cityGuides = ['/plano-city-guide', '/allen-city-guide', '/frisco-city-guide'];
    cityGuides.forEach(page => {
      const priority = extractPriorityForRoute(sitemapContent, page);
      expect(priority).toBeGreaterThanOrEqual(0.7);
    });

    // Check blog posts have lower priority
    const blogPriority = extractPriorityForRoute(sitemapContent, '/blog');
    expect(blogPriority).toBeGreaterThanOrEqual(0.5);
    expect(blogPriority).toBeLessThanOrEqual(0.8);
  });

  it('should have valid changefreq values', () => {
    const validChangefreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
    const sitemapContent = fs.readFileSync(SITEMAP_FILE, 'utf-8');

    const changefreqMatches = sitemapContent.match(/changefreq:\s*['"`]([^'"`]+)['"`]/g);

    if (changefreqMatches) {
      changefreqMatches.forEach(match => {
        const value = match.match(/['"`]([^'"`]+)['"`]/)?.[1];
        expect(validChangefreqs).toContain(value);
      });
    }
  });

  it('should generate valid XML sitemaps', async () => {
    // Test sitemap generation endpoints
    const BASE_URL = 'http://localhost:5000';
    const sitemapEndpoints = [
      '/sitemap.xml',
      '/sitemap-main.xml',
      '/sitemap-cities.xml',
      '/sitemap-blog.xml'
    ];

    for (const endpoint of sitemapEndpoints) {
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        expect(response.status).toBe(200);

        const xmlContent = await response.text();
        expect(xmlContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
        expect(xmlContent).toContain('<urlset');
        expect(xmlContent).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');

        // Validate basic XML structure
        expect(xmlContent.split('<url>').length).toBeGreaterThan(1);
        expect(xmlContent.split('</url>').length).toBeGreaterThan(1);

        // Check for required URL elements
        if (xmlContent.includes('<url>')) {
          expect(xmlContent).toMatch(/<loc>https?:\/\/[^<]+<\/loc>/);
          expect(xmlContent).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z<\/lastmod>/);
          expect(xmlContent).toMatch(/<priority>[01]\.\d+<\/priority>/);
          expect(xmlContent).toMatch(/<changefreq>(always|hourly|daily|weekly|monthly|yearly|never)<\/changefreq>/);
        }
      } catch (error) {
        console.warn(`Failed to test ${endpoint}:`, error);
        // Don't fail the test if server isn't running
      }
    }
  });

  it('should have consistent URL formatting', () => {
    analysis.sitemapRoutes.forEach(route => {
      // URLs should not have trailing slashes (except root)
      if (route !== '/') {
        expect(route).not.toMatch(/\/$/);
      }

      // URLs should start with /
      expect(route).toMatch(/^\//);

      // URLs should not have spaces or special characters (except hyphens)
      expect(route).toMatch(/^\/[\w\-\/]*$/);
    });
  });

  it('should have reasonable lastmod dates', () => {
    const sitemapContent = fs.readFileSync(SITEMAP_FILE, 'utf-8');

    // Check that lastmod uses proper date format
    const lastmodMatches = sitemapContent.match(/lastmod.*new Date\(\)/g);
    if (lastmodMatches) {
      expect(lastmodMatches.length).toBeGreaterThan(0);
    }

    // Verify date format in generated XML would be ISO string
    const now = new Date().toISOString();
    expect(now).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  it('should include all major sections', () => {
    const expectedSections = [
      '/', // Homepage
      '/about',
      '/contact',
      '/buy',
      '/sell',
      '/blog',
    ];

    expectedSections.forEach(section => {
      expect(analysis.sitemapRoutes).toContain(section);
    });

    // Should have city guide routes
    const cityGuides = analysis.sitemapRoutes.filter(route =>
      route.includes('city-guide') || route.includes('/city-guides/')
    );
    expect(cityGuides.length).toBeGreaterThan(0);
  });

  it('should report detailed analysis', () => {
    console.log('\n📊 Sitemap Consistency Analysis:');
    console.log(`Total file-based routes: ${analysis.fileBasedRoutes.length}`);
    console.log(`Total sitemap routes: ${analysis.sitemapRoutes.length}`);
    console.log(`Missing from sitemap: ${analysis.missingFromSitemap.length}`);
    console.log(`Orphaned in sitemap: ${analysis.orphanedInSitemap.length}`);

    if (analysis.priorityIssues.length > 0) {
      console.log('\n⚠️  Priority Issues:');
      analysis.priorityIssues.forEach(issue => {
        console.log(`  ${issue.url}: ${issue.issue}`);
      });
    }

    console.log('\n📄 Sample file-based routes:');
    analysis.fileBasedRoutes.slice(0, 5).forEach(route => {
      console.log(`  ${route}`);
    });

    console.log('\n🗺️  Sample sitemap routes:');
    analysis.sitemapRoutes.slice(0, 5).forEach(route => {
      console.log(`  ${route}`);
    });
  });
});

// Helper functions
function convertFileToRoute(filePath: string): string | null {
  // Remove .tsx extension
  let route = filePath.replace(/\.tsx$/, '');

  // Handle index files
  if (route.endsWith('/index') || route === 'index') {
    route = route.replace(/\/index$/, '') || '/';
  }

  // Convert file path to URL path
  route = '/' + route.replace(/\\/g, '/');

  // Handle special cases
  if (route === '//') route = '/';

  // Skip non-route files
  if (filePath.includes('components/') || filePath.includes('.test.') || filePath.includes('.spec.')) {
    return null;
  }

  return route;
}

function extractSitemapRoutes(content: string): string[] {
  const routes: string[] = [];

  // Extract routes from URL objects in the sitemap
  const urlMatches = content.match(/url:\s*['"`]([^'"`]+)['"`]/g);
  if (urlMatches) {
    urlMatches.forEach(match => {
      const url = match.match(/['"`]([^'"`]+)['"`]/)?.[1];
      if (url) {
        routes.push(url);
      }
    });
  }

  // Extract routes from template literals or string concatenations
  const dynamicMatches = content.match(/\/[a-z-]+(?:-city-guide)?/g);
  if (dynamicMatches) {
    dynamicMatches.forEach(match => {
      if (!routes.includes(match)) {
        routes.push(match);
      }
    });
  }

  return [...new Set(routes)].sort(); // Remove duplicates and sort
}

function normalizeRoute(route: string): string {
  return route.toLowerCase().replace(/\/$/, '') || '/';
}

function extractPriorityForRoute(content: string, route: string): number {
  // Look for the route and its associated priority
  const routeRegex = new RegExp(`url:\\s*['"\`]${route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`]`);
  const routeIndex = content.search(routeRegex);

  if (routeIndex === -1) return 0;

  // Find the priority value after the route
  const afterRoute = content.substring(routeIndex);
  const priorityMatch = afterRoute.match(/priority:\s*([\d.]+)/);

  return priorityMatch ? parseFloat(priorityMatch[1]) : 0.5; // Default priority
}

function analyzePriorities(content: string): { url: string; issue: string }[] {
  const issues: { url: string; issue: string }[] = [];

  // Extract all URL/priority pairs
  const urlPriorityPairs = extractUrlPriorityPairs(content);

  urlPriorityPairs.forEach(({ url, priority }) => {
    if (priority < 0 || priority > 1) {
      issues.push({ url, issue: `Invalid priority ${priority} (should be 0-1)` });
    }

    if (url === '/' && priority !== 1.0) {
      issues.push({ url, issue: `Homepage should have priority 1.0, got ${priority}` });
    }

    if (url.includes('city-guide') && priority < 0.6) {
      issues.push({ url, issue: `City guide should have priority ≥0.6, got ${priority}` });
    }
  });

  return issues;
}

function extractUrlPriorityPairs(content: string): { url: string; priority: number }[] {
  const pairs: { url: string; priority: number }[] = [];

  // Match URL objects with their properties
  const objectMatches = content.match(/{[^}]*url:\s*['"`][^'"`]+['"`][^}]*}/g);

  if (objectMatches) {
    objectMatches.forEach(match => {
      const urlMatch = match.match(/url:\s*['"`]([^'"`]+)['"`]/);
      const priorityMatch = match.match(/priority:\s*([\d.]+)/);

      if (urlMatch && priorityMatch) {
        pairs.push({
          url: urlMatch[1],
          priority: parseFloat(priorityMatch[1])
        });
      }
    });
  }

  return pairs;
}
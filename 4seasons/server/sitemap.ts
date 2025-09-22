import type { Request, Response } from "express";

// Define all static routes
const staticRoutes = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/about', priority: 0.8, changefreq: 'monthly' },
  { url: '/buy', priority: 0.9, changefreq: 'weekly' },
  { url: '/sell', priority: 0.9, changefreq: 'weekly' },
  { url: '/city-guides', priority: 0.9, changefreq: 'weekly' },
  { url: '/blog', priority: 0.8, changefreq: 'daily' },
  { url: '/contact', priority: 0.7, changefreq: 'monthly' },
  { url: '/property-management', priority: 0.8, changefreq: 'monthly' },
  { url: '/faq', priority: 0.7, changefreq: 'monthly' },
  { url: '/first-time-buyers', priority: 0.8, changefreq: 'weekly' },
  { url: '/new-construction', priority: 0.8, changefreq: 'weekly' },
  { url: '/home-affordability', priority: 0.7, changefreq: 'monthly' },
  { url: '/mortgage-calculator', priority: 0.7, changefreq: 'monthly' },
  { url: '/savings-calculator', priority: 0.7, changefreq: 'monthly' },
  { url: '/home-valuation', priority: 0.8, changefreq: 'weekly' },
  { url: '/listing-process', priority: 0.7, changefreq: 'monthly' },
  { url: '/pricing-strategy', priority: 0.7, changefreq: 'monthly' },
  { url: '/marketing-guide', priority: 0.7, changefreq: 'monthly' },
  { url: '/home-staging', priority: 0.7, changefreq: 'monthly' },
  { url: '/market-analysis', priority: 0.8, changefreq: 'weekly' },
  { url: '/selling-costs', priority: 0.7, changefreq: 'monthly' },
  { url: '/fsbo-vs-agent', priority: 0.7, changefreq: 'monthly' },
];

// City guide routes - organized by county
const cityGuideRoutes = [
  // Denton County
  { url: '/city-guides/denton', city: 'Denton', county: 'Denton', priority: 0.8 },
  { url: '/city-guides/lewisville', city: 'Lewisville', county: 'Denton', priority: 0.8 },
  { url: '/city-guides/flower-mound', city: 'Flower Mound', county: 'Denton', priority: 0.8 },
  { url: '/city-guides/highland-village', city: 'Highland Village', county: 'Denton', priority: 0.7 },
  { url: '/city-guides/little-elm', city: 'Little Elm', county: 'Denton', priority: 0.7 },
  { url: '/city-guides/argyle', city: 'Argyle', county: 'Denton', priority: 0.7 },
  { url: '/city-guides/corinth', city: 'Corinth', county: 'Denton', priority: 0.7 },
  { url: '/city-guides/aubrey', city: 'Aubrey', county: 'Denton', priority: 0.7 },
  
  // Tarrant County
  { url: '/city-guides/fort-worth', city: 'Fort Worth', county: 'Tarrant', priority: 0.9 },
  { url: '/city-guides/arlington', city: 'Arlington', county: 'Tarrant', priority: 0.8 },
  { url: '/city-guides/grapevine', city: 'Grapevine', county: 'Tarrant', priority: 0.8 },
  { url: '/city-guides/southlake', city: 'Southlake', county: 'Tarrant', priority: 0.8 },
  { url: '/city-guides/colleyville', city: 'Colleyville', county: 'Tarrant', priority: 0.8 },
  { url: '/city-guides/mansfield', city: 'Mansfield', county: 'Tarrant', priority: 0.8 },
  { url: '/city-guides/north-richland-hills', city: 'North Richland Hills', county: 'Tarrant', priority: 0.7 },
  { url: '/city-guides/keller', city: 'Keller', county: 'Tarrant', priority: 0.7 },
  
  // Dallas County
  { url: '/allen-city-guide', city: 'Allen', county: 'Dallas', priority: 0.9 },
  { url: '/plano-city-guide', city: 'Plano', county: 'Dallas', priority: 0.9 },
  { url: '/frisco-city-guide', city: 'Frisco', county: 'Dallas', priority: 0.9 },
  { url: '/mckinney-city-guide', city: 'McKinney', county: 'Dallas', priority: 0.9 },
  { url: '/prosper-city-guide', city: 'Prosper', county: 'Dallas', priority: 0.8 },
  { url: '/celina-city-guide', city: 'Celina', county: 'Dallas', priority: 0.8 },
  { url: '/wylie-city-guide', city: 'Wylie', county: 'Dallas', priority: 0.8 },
  { url: '/highland-park-city-guide', city: 'Highland Park', county: 'Dallas', priority: 0.8 },
  { url: '/university-park-city-guide', city: 'University Park', county: 'Dallas', priority: 0.8 },
  { url: '/addison-city-guide', city: 'Addison', county: 'Dallas', priority: 0.8 },
  { url: '/richardson-city-guide', city: 'Richardson', county: 'Dallas', priority: 0.8 },
  { url: '/garland-city-guide', city: 'Garland', county: 'Dallas', priority: 0.8 },
  { url: '/carrollton-city-guide', city: 'Carrollton', county: 'Dallas', priority: 0.8 },
  { url: '/city-guides/coppell', city: 'Coppell', county: 'Dallas', priority: 0.8 },
  { url: '/city-guides/the-colony', city: 'The Colony', county: 'Dallas', priority: 0.8 },
];

// Blog post routes
const blogRoutes = [
  { url: '/blog/2025-north-texas-housing-market-predictions', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/first-time-home-buyer-guide-north-texas', priority: 0.8, changefreq: 'monthly' },
  { url: '/blog/maximizing-rental-property-returns-property-manager-perspective', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/understanding-property-taxes-north-texas', priority: 0.8, changefreq: 'monthly' },
  { url: '/blog/home-staging-secrets-that-actually-work', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/5-signs-time-to-sell-home-north-texas', priority: 0.7, changefreq: 'monthly' },
];

const BASE_URL = process.env.SITE_URL || 'https://4seasonsrealestate.com';

function generateSitemapXML(routes: Array<{ url: string, priority: number, changefreq: string, lastmod?: string, images?: string[] }>) {
  const urlElements = routes.map(route => {
    const lastmod = route.lastmod || new Date().toISOString();
    let imageElements = '';
    
    if (route.images && route.images.length > 0) {
      imageElements = route.images.map(img => `
    <image:image>
      <image:loc>${BASE_URL}${img}</image:loc>
    </image:image>`).join('');
    }
    
    return `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${imageElements}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlElements}
</urlset>`;
}

function generateSitemapIndex() {
  const sitemaps = [
    { url: '/sitemap-main.xml', lastmod: new Date().toISOString() },
    { url: '/sitemap-cities.xml', lastmod: new Date().toISOString() },
    { url: '/sitemap-blog.xml', lastmod: new Date().toISOString() },
  ];

  const sitemapElements = sitemaps.map(sitemap => 
    `  <sitemap>
    <loc>${BASE_URL}${sitemap.url}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
}

export function setupSitemapRoutes(app: any) {
  // Main sitemap index
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateSitemapIndex());
  });

  // Main pages sitemap
  app.get('/sitemap-main.xml', (req: Request, res: Response) => {
    const routes = staticRoutes.map(route => ({
      ...route,
      changefreq: route.changefreq || 'monthly'
    }));
    
    res.set('Content-Type', 'application/xml');
    res.send(generateSitemapXML(routes));
  });

  // City guides sitemap
  app.get('/sitemap-cities.xml', (req: Request, res: Response) => {
    const routes = cityGuideRoutes.map(route => ({
      url: route.url,
      priority: route.priority,
      changefreq: 'monthly'
    }));
    
    res.set('Content-Type', 'application/xml');
    res.send(generateSitemapXML(routes));
  });

  // Blog sitemap
  app.get('/sitemap-blog.xml', (req: Request, res: Response) => {
    const routes = blogRoutes.map(route => ({
      ...route,
      changefreq: route.changefreq || 'monthly'
    }));
    
    res.set('Content-Type', 'application/xml');
    res.send(generateSitemapXML(routes));
  });
}
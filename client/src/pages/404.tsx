import { useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SEO, seoConfig, generateStructuredData } from '@/components/SEO';
import { SEOBreadcrumb } from '@/components/seo-breadcrumb';
import {
  Home,
  Search,
  MapPin,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    // Set proper HTTP status for SEO
    if (typeof window !== 'undefined' && window.history) {
      // This helps with client-side routing 404s
      document.title = '404 - Page Not Found | 4Seasons Real Estate';
    }
  }, []);

  const popularPages = [
    {
      title: 'City Guides',
      description: 'Explore our comprehensive city guides for North Texas communities',
      href: '/city-guides',
      icon: MapPin
    },
    {
      title: 'Allen City Guide',
      description: 'Premier family community with top-rated schools',
      href: '/allen-city-guide',
      icon: Home
    },
    {
      title: 'Plano City Guide', 
      description: 'Diverse community with excellent amenities',
      href: '/plano-city-guide',
      icon: Home
    },
    {
      title: 'Frisco City Guide',
      description: 'Rapidly growing city with modern attractions',
      href: '/frisco-city-guide',
      icon: Home
    },
    {
      title: 'Buy a Home',
      description: 'Find your dream home in North Texas',
      href: '/buy',
      icon: Search
    },
    {
      title: 'Sell Your Home',
      description: 'Get top dollar for your property',
      href: '/sell',
      icon: Home
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "404 - Page Not Found",
    "description": "The page you're looking for doesn't exist. Find North Texas real estate information and city guides.",
    "url": `${seoConfig.siteUrl}/404`,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": seoConfig.siteName,
      "url": seoConfig.siteUrl
    },
    "mainEntity": {
      "@type": "RealEstateAgent",
      "name": seoConfig.companyInfo.name,
      "url": seoConfig.siteUrl
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${seoConfig.siteUrl}/city-guides?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO
        title="404 - Page Not Found | 4Seasons Real Estate"
        description="The page you're looking for doesn't exist. Find North Texas real estate information, city guides, and property listings."
        robots="noindex, follow"
        canonicalUrl={`${seoConfig.siteUrl}/404`}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <Navigation />
        
        {/* Breadcrumb for better navigation */}
        <div className="container mx-auto px-4 pt-6">
          <SEOBreadcrumb items={[
            { label: '404 Error', isCurrentPage: true }
          ]} />
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* 404 Header */}
            <div className="mb-8">
              <AlertCircle className="h-20 w-20 text-blue-500 mx-auto mb-6" />
              <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
                404
              </h1>
              <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Page Not Found
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                Sorry, the page you're looking for doesn't exist. But don't worry, 
                we have plenty of resources to help you find what you need in North Texas real estate.
              </p>
              
              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="bg-[#0d0d33] hover:bg-[#1a1a4d]">
                  <Link href="/">
                    <Home className="h-5 w-5 mr-2" />
                    Go Home
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/city-guides">
                    <MapPin className="h-5 w-5 mr-2" />
                    Browse Cities
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Popular Pages */}
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Popular Pages
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularPages.map((page, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <page.icon className="h-5 w-5 mr-2 text-[#0d0d33]" />
                        {page.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {page.description}
                      </p>
                      <Link href={page.href}>
                        <a className="inline-flex items-center text-[#0d0d33] hover:text-blue-600 font-medium group-hover:underline">
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="mt-16 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Need Help Finding Something?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our North Texas real estate experts are here to help you find exactly what you're looking for.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#0d0d33] hover:bg-[#1a1a4d]">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">Or call us directly</p>
                  <a 
                    href={`tel:${seoConfig.companyInfo.phone}`}
                    className="text-2xl font-bold text-[#0d0d33] hover:text-blue-600"
                  >
                    {seoConfig.companyInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}
import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterSite?: string;
  structuredData?: object;
  robots?: string;
  author?: string;
  locale?: string;
}

export function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterSite = '@4SeasonsRealEstate',
  structuredData,
  robots = 'index, follow',
  author = '4Seasons Real Estate',
  locale = 'en_US'
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set or update meta tags
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Set or update link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      
      element.setAttribute('href', href);
    };

    // Basic meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords || '');
    setMetaTag('author', author);
    setMetaTag('robots', robots);
    setMetaTag('language', locale);

    // Open Graph tags
    setMetaTag('og:title', ogTitle || title, true);
    setMetaTag('og:description', ogDescription || description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:locale', locale, true);
    setMetaTag('og:site_name', '4Seasons Real Estate', true);
    
    if (ogImage) {
      setMetaTag('og:image', ogImage, true);
      setMetaTag('og:image:width', '1200', true);
      setMetaTag('og:image:height', '630', true);
      setMetaTag('og:image:alt', ogTitle || title, true);
    }

    if (canonicalUrl) {
      setMetaTag('og:url', canonicalUrl, true);
      setLinkTag('canonical', canonicalUrl);
    }

    // Twitter Card tags
    setMetaTag('twitter:card', twitterCard);
    setMetaTag('twitter:site', twitterSite);
    setMetaTag('twitter:creator', twitterSite);
    setMetaTag('twitter:title', ogTitle || title);
    setMetaTag('twitter:description', ogDescription || description);
    
    if (ogImage) {
      setMetaTag('twitter:image', ogImage);
      setMetaTag('twitter:image:alt', ogTitle || title);
    }

    // Structured Data
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]');
      
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptElement);
      }
      
      scriptElement.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function to remove meta tags when component unmounts
    return () => {
      // Note: We keep meta tags as they're page-specific and will be updated by the next page
    };
  }, [title, description, keywords, canonicalUrl, ogTitle, ogDescription, ogImage, ogType, twitterCard, twitterSite, structuredData, robots, author, locale]);

  return null; // This component doesn't render anything
}

// SEO configuration for different page types
export const seoConfig = {
  siteName: '4Seasons Real Estate',
  siteUrl: 'https://4seasonsrealestate.com',
  defaultImage: '/images/4seasons-og-image.jpg',
  twitterSite: '@4SeasonsRealEstate',
  companyInfo: {
    name: '4Seasons Real Estate',
    phone: '(214) 555-0123',
    email: 'info@4seasonsrealestate.com',
    address: {
      streetAddress: '123 Main Street',
      addressLocality: 'Allen',
      addressRegion: 'TX',
      postalCode: '75013',
      addressCountry: 'US'
    }
  }
};

// Generate structured data for different content types
export const generateStructuredData = {
  realEstateAgent: (agentData?: any) => ({
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": seoConfig.companyInfo.name,
    "telephone": seoConfig.companyInfo.phone,
    "email": seoConfig.companyInfo.email,
    "url": seoConfig.siteUrl,
    "address": {
      "@type": "PostalAddress",
      ...seoConfig.companyInfo.address
    },
    "areaServed": [
      "Allen, TX",
      "Plano, TX", 
      "Frisco, TX",
      "McKinney, TX",
      "Richardson, TX",
      "Carrollton, TX",
      "Prosper, TX",
      "Celina, TX",
      "Wylie, TX",
      "Highland Park, TX",
      "University Park, TX",
      "Addison, TX",
      "Garland, TX"
    ],
    "priceRange": "$$",
    "serviceType": ["Real Estate Sales", "Property Management", "Home Valuation"]
  }),

  localBusiness: () => ({
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": seoConfig.companyInfo.name,
    "image": seoConfig.defaultImage,
    "telephone": seoConfig.companyInfo.phone,
    "email": seoConfig.companyInfo.email,
    "url": seoConfig.siteUrl,
    "address": {
      "@type": "PostalAddress",
      ...seoConfig.companyInfo.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.1031,
      "longitude": -96.6706
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/4SeasonsRealEstate",
      "https://www.instagram.com/4SeasonsRealEstate",
      "https://www.linkedin.com/company/4SeasonsRealEstate"
    ]
  }),

  service: (serviceType: string, description: string) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceType,
    "description": description,
    "provider": {
      "@type": "RealEstateAgent",
      "name": seoConfig.companyInfo.name,
      "telephone": seoConfig.companyInfo.phone,
      "email": seoConfig.companyInfo.email
    },
    "areaServed": "Dallas-Fort Worth Metroplex",
    "serviceType": serviceType
  }),

  cityGuide: (cityName: string, state: string = "Texas") => ({
    "@context": "https://schema.org",
    "@type": "Place",
    "name": `${cityName}, ${state}`,
    "description": `Comprehensive city guide for ${cityName}, ${state} real estate, neighborhoods, schools, and amenities.`,
    "geo": {
      "@type": "GeoCoordinates"
      // Coordinates would be specific to each city
    },
    "containedInPlace": {
      "@type": "State",
      "name": state
    }
  }),

  faqPage: (faqs: Array<{question: string, answer: string}>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }),

  article: (title: string, description: string, author: string, datePublished: string) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": seoConfig.companyInfo.name,
      "logo": {
        "@type": "ImageObject",
        "url": seoConfig.defaultImage
      }
    },
    "datePublished": datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": seoConfig.siteUrl
    }
  })
};
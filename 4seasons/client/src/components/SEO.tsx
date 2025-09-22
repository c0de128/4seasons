import { useEffect } from 'react';

// Structured Data Input Interfaces
export interface CityGuideInput {
  name: string;
  state?: string;
  population?: string;
  medianHomePrice?: string;
  schoolDistrict?: string;
  schoolRating?: string;
  description?: string;
}

export interface LocalBusinessInput {
  name?: string;
  address?: string;
  phone?: string;
  areaServed?: string | string[];
}

export interface OrganizationInput {
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  foundingDate?: string;
  areaServed?: string[];
}

export interface PersonInput {
  name: string;
  jobTitle?: string;
  description?: string;
  email?: string;
  knowsAbout?: string[];
  worksFor?: string;
  image?: string;
  socialProfiles?: string[];
}

export interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface OpenGraphProps {
  title?: string;
  description?: string;
  images?: OpenGraphImage[];
  url?: string;
  type?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string; // Support both canonical and canonicalUrl
  canonicalUrl?: string;
  openGraph?: OpenGraphProps; // Support openGraph object
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterSite?: string;
  structuredData?: object | object[]; // Support arrays
  robots?: string;
  author?: string;
  locale?: string;
  alternateLanguages?: Array<{lang: string, url: string}>;
  viewport?: string;
  themeColor?: string;
  applicationName?: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  fbAppId?: string;
  articleTags?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
}

export function SEO({
  title,
  description,
  keywords,
  canonical,
  canonicalUrl,
  openGraph,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterSite = '@4SeasonsRealEstate',
  structuredData,
  robots = 'index, follow',
  author = '4Seasons Real Estate',
  locale = 'en_US',
  alternateLanguages = [],
  viewport = 'width=device-width, initial-scale=1.0, viewport-fit=cover',
  themeColor = '#0d0d33',
  applicationName = '4Seasons Real Estate',
  googleSiteVerification,
  bingSiteVerification,
  fbAppId,
  articleTags = [],
  publishedTime,
  modifiedTime,
  section = 'Real Estate'
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
        element.setAttribute('data-temp', 'true'); // Mark as temporary for cleanup
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
        element.setAttribute('data-temp', 'true'); // Mark as temporary for cleanup
        document.head.appendChild(element);
      }

      element.setAttribute('href', href);
    };

    // Basic meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords || '');
    setMetaTag('author', author);
    setMetaTag('robots', robots);
    setMetaTag('viewport', viewport);
    setMetaTag('theme-color', themeColor);
    setMetaTag('application-name', applicationName);
    setMetaTag('mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    setMetaTag('apple-mobile-web-app-title', applicationName);
    setMetaTag('format-detection', 'telephone=no');
    setMetaTag('msapplication-TileColor', themeColor);

    // Only set msapplication-config if browserconfig.xml exists or is intended
    // This could be made conditional via a prop/config flag if needed
    // setMetaTag('msapplication-config', '/browserconfig.xml');
    
    // Verification tags
    if (googleSiteVerification) {
      setMetaTag('google-site-verification', googleSiteVerification);
    }
    if (bingSiteVerification) {
      setMetaTag('msvalidate.01', bingSiteVerification);
    }
    
    // Article specific tags
    if (ogType === 'article') {
      if (publishedTime) setMetaTag('article:published_time', publishedTime, true);
      if (modifiedTime) setMetaTag('article:modified_time', modifiedTime, true);
      if (section) setMetaTag('article:section', section, true);
      if (articleTags.length > 0) {
        articleTags.forEach(tag => setMetaTag('article:tag', tag, true));
      }
      setMetaTag('article:author', author, true);
    }

    // Determine canonical URL - support both canonical and canonicalUrl props
    const finalCanonicalUrl = canonical || canonicalUrl;

    // Extract Open Graph values from openGraph object or individual props
    const finalOgTitle = openGraph?.title || ogTitle || title;
    const finalOgDescription = openGraph?.description || ogDescription || description;
    const finalOgType = openGraph?.type || ogType;
    const finalOgUrl = openGraph?.url || finalCanonicalUrl;
    const finalOgImage = openGraph?.images?.[0] || (ogImage ? { url: ogImage } : null);

    // Open Graph tags
    setMetaTag('og:title', finalOgTitle, true);
    setMetaTag('og:description', finalOgDescription, true);
    setMetaTag('og:type', finalOgType, true);
    setMetaTag('og:locale', locale, true);
    setMetaTag('og:site_name', '4Seasons Real Estate', true);

    if (finalOgImage) {
      setMetaTag('og:image', finalOgImage.url, true);
      setMetaTag('og:image:width', String(finalOgImage.width || 1200), true);
      setMetaTag('og:image:height', String(finalOgImage.height || 630), true);
      setMetaTag('og:image:alt', finalOgImage.alt || finalOgTitle, true);
    }

    if (finalOgUrl) {
      setMetaTag('og:url', finalOgUrl, true);
    }

    if (finalCanonicalUrl) {
      setLinkTag('canonical', finalCanonicalUrl);
    }

    // Twitter Card tags
    setMetaTag('twitter:card', twitterCard);
    setMetaTag('twitter:site', twitterSite);
    setMetaTag('twitter:creator', twitterSite);
    setMetaTag('twitter:title', finalOgTitle);
    setMetaTag('twitter:description', finalOgDescription);
    setMetaTag('twitter:domain', '4seasonsrealestate.com');

    if (finalOgImage) {
      setMetaTag('twitter:image', finalOgImage.url);
      setMetaTag('twitter:image:alt', finalOgImage.alt || finalOgTitle);
      setMetaTag('twitter:image:width', String(finalOgImage.width || 1200));
      setMetaTag('twitter:image:height', String(finalOgImage.height || 630));
    }
    
    // Facebook App ID
    if (fbAppId) {
      setMetaTag('fb:app_id', fbAppId, true);
    }
    
    // Alternate language links
    alternateLanguages.forEach(({ lang, url }) => {
      // Look for existing alternate link with same href and hreflang
      let element = document.querySelector(`link[rel="alternate"][href="${url}"][hreflang="${lang}"]`);

      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'alternate');
        element.setAttribute('href', url);
        element.setAttribute('hreflang', lang);
        element.setAttribute('data-temp', 'true'); // Mark as temporary for cleanup
        document.head.appendChild(element);
      }
    });

    // Structured Data
    if (structuredData) {
      const scriptId = 'seo-structured-data';

      // Remove existing structured data script
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }

      // Handle array vs single object
      if (Array.isArray(structuredData)) {
        // For arrays, create a single script with @graph structure
        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        scriptElement.id = scriptId;

        // Flatten any nested @graph structures
        const flattenedData: any[] = [];
        structuredData.forEach(item => {
          if (item['@graph'] && Array.isArray(item['@graph'])) {
            // Spread the @graph contents into the main array
            flattenedData.push(...item['@graph']);
          } else {
            // Add the item as-is
            flattenedData.push(item);
          }
        });

        const graphData = {
          "@context": "https://schema.org",
          "@graph": flattenedData
        };

        scriptElement.textContent = JSON.stringify(graphData);
        document.head.appendChild(scriptElement);
      } else {
        // For single objects, use as-is
        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        scriptElement.id = scriptId;
        scriptElement.textContent = JSON.stringify(structuredData);
        document.head.appendChild(scriptElement);
      }
    }

    // Cleanup function to remove structured data when component unmounts
    return () => {
      const scriptElement = document.getElementById('seo-structured-data');
      if (scriptElement && document.head.contains(scriptElement)) {
        document.head.removeChild(scriptElement);
      }
    };
  }, [title, description, keywords, canonicalUrl, ogTitle, ogDescription, ogImage, ogType, twitterCard, twitterSite, structuredData, robots, author, locale]);

  return null; // This component doesn't render anything
}

// SEO configuration for different page types
export const seoConfig = {
  siteName: '4Seasons Real Estate',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://4seasonsrealestate.com',
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
    "logo": {
      "@type": "ImageObject",
      "url": `${seoConfig.siteUrl}/images/4seasons-logo.jpg`,
      "width": "300",
      "height": "150"
    },
    "address": {
      "@type": "PostalAddress",
      ...seoConfig.companyInfo.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.1031,
      "longitude": -96.6706
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Allen",
        "addressRegion": "TX",
        "addressCountry": "US"
      },
      {
        "@type": "City",
        "name": "Plano",
        "addressRegion": "TX",
        "addressCountry": "US"
      },
      {
        "@type": "City",
        "name": "Frisco",
        "addressRegion": "TX",
        "addressCountry": "US"
      },
      {
        "@type": "City",
        "name": "McKinney",
        "addressRegion": "TX",
        "addressCountry": "US"
      },
      {
        "@type": "City",
        "name": "Fort Worth",
        "addressRegion": "TX",
        "addressCountry": "US"
      },
      {
        "@type": "City",
        "name": "Denton",
        "addressRegion": "TX",
        "addressCountry": "US"
      }
    ],
    "priceRange": "$$",
    "serviceType": ["Real Estate Sales", "Property Management", "Home Valuation", "Buyer Representation", "Seller Representation"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Real Estate Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Home Buying Services",
            "description": "Complete buyer representation services in North Texas"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Home Selling Services",
            "description": "Professional home selling and marketing services"
          }
        }
      ]
    },
    "knowsAbout": [
      "Dallas-Fort Worth Real Estate Market",
      "North Texas Communities",
      "Property Investment",
      "Home Valuation",
      "Market Analysis"
    ],
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Client Review"
      },
      "reviewBody": "Excellent service and local market knowledge in the DFW area."
    }
  }),

  localBusiness: (input: LocalBusinessInput = {}) => ({
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": input.name || seoConfig.companyInfo.name,
    "image": seoConfig.defaultImage,
    "telephone": input.phone || seoConfig.companyInfo.phone,
    "email": seoConfig.companyInfo.email,
    "url": seoConfig.siteUrl,
    "address": input.address ? (
      typeof input.address === 'string' ? {
        "@type": "PostalAddress",
        "streetAddress": input.address
      } : {
        "@type": "PostalAddress",
        ...seoConfig.companyInfo.address
      }
    ) : {
      "@type": "PostalAddress",
      ...seoConfig.companyInfo.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.1031,
      "longitude": -96.6706
    },
    "areaServed": input.areaServed || "Dallas-Fort Worth Metroplex",
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

  cityGuide: (cityName: string, county: string, demographics?: any, realEstate?: any) => ({
    "@context": "https://schema.org",
    "@type": "Place",
    "name": `${cityName}, Texas`,
    "description": `Comprehensive city guide for ${cityName}, Texas real estate, neighborhoods, schools, and amenities. Find homes for sale and local market insights.`,
    "url": `${seoConfig.siteUrl}/${cityName.toLowerCase().replace(/\s+/g, '-')}-city-guide`,
    "geo": {
      "@type": "GeoCoordinates"
      // Coordinates would be specific to each city
    },
    "containedInPlace": [
      {
        "@type": "AdministrativeArea",
        "name": `${county} County`,
        "addressRegion": "TX"
      },
      {
        "@type": "State",
        "name": "Texas",
        "addressCountry": "US"
      }
    ],
    "touristType": "Home Buyers, Real Estate Investors, Families",
    "knowsAbout": [
      `${cityName} Real Estate`,
      `${cityName} Schools`,
      `${cityName} Neighborhoods`,
      `${cityName} Market Trends`,
      `${county} County Properties`
    ],
    ...(demographics && {
      "population": demographics.population,
      "medianAge": demographics.medianAge
    }),
    ...(realEstate && {
      "mainEntity": {
        "@type": "RealEstateAgent",
        "name": seoConfig.companyInfo.name,
        "areaServed": `${cityName}, TX`
      }
    })
  }),

  cityGuideWithRealEstate: (input: CityGuideInput) => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Place",
        "name": `${input.name}, ${input.state || 'Texas'}`,
        "description": input.description || `${input.name} city guide with real estate market information, home prices, and neighborhood insights.`,
        "containedInPlace": {
          "@type": "State",
          "name": input.state || "Texas"
        },
        ...(input.population && { "population": input.population })
      },
      {
        "@type": "RealEstateAgent",
        "name": seoConfig.companyInfo.name,
        "areaServed": `${input.name}, ${input.state || 'TX'}`,
        "makesOffer": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `${input.name} Real Estate Services`,
            "description": `Professional real estate services in ${input.name}, ${input.state || 'Texas'}`
          },
          ...(input.medianHomePrice && {
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": input.medianHomePrice,
              "priceCurrency": "USD",
              "valueAddedTaxIncluded": false
            }
          })
        }
      },
      ...(input.schoolDistrict && input.schoolRating ? [{
        "@type": "EducationalOrganization",
        "name": input.schoolDistrict,
        "areaServed": `${input.name}, ${input.state || 'TX'}`,
        "description": `School district serving ${input.name} with ${input.schoolRating} rating`
      }] : [])
    ]
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

  article: (title: string, description: string, author: string, datePublished: string, url?: string, image?: string) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "articleBody": description,
    "author": {
      "@type": "Person",
      "name": author,
      "url": seoConfig.siteUrl,
      "knowsAbout": ["Real Estate", "North Texas Market", "Home Buying", "Home Selling"]
    },
    "publisher": {
      "@type": "Organization",
      "name": seoConfig.companyInfo.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${seoConfig.siteUrl}/images/4seasons-logo.jpg`,
        "width": 300,
        "height": 150
      },
      "url": seoConfig.siteUrl,
      "sameAs": [
        "https://www.facebook.com/4SeasonsRealEstate",
        "https://www.instagram.com/4SeasonsRealEstate",
        "https://www.linkedin.com/company/4SeasonsRealEstate"
      ]
    },
    "datePublished": datePublished,
    "dateModified": datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url || seoConfig.siteUrl
    },
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image,
        "width": 1200,
        "height": 630
      }
    }),
    "keywords": ["Real Estate", "North Texas", "DFW", "Home Buying", "Home Selling"],
    "articleSection": "Real Estate",
    "wordCount": Math.floor(description.length / 5), // Rough word count estimate
    "inLanguage": "en-US",
    "copyrightHolder": {
      "@type": "Organization",
      "name": seoConfig.companyInfo.name
    }
  }),

  webPage: (title: string, description: string, url: string, breadcrumbs?: Array<{name: string, url: string}>, lastModified?: string) => {
    const breadcrumbItems = [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": seoConfig.siteUrl
    }];
    
    if (breadcrumbs) {
      breadcrumbs.forEach((crumb, index) => {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": index + 2,
          "name": crumb.name,
          "item": `${seoConfig.siteUrl}${crumb.url}`
        });
      });
    }
    
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": url,
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "WebSite",
        "name": seoConfig.siteName,
        "url": seoConfig.siteUrl,
        "publisher": {
          "@type": "Organization",
          "name": seoConfig.companyInfo.name,
          "logo": {
            "@type": "ImageObject",
            "url": `${seoConfig.siteUrl}/images/4seasons-logo.jpg`
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${seoConfig.siteUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      },
      "potentialAction": {
        "@type": "ReadAction",
        "target": url
      },
      "mainEntity": {
        "@type": "RealEstateAgent",
        "name": seoConfig.companyInfo.name,
        "url": seoConfig.siteUrl,
        "telephone": seoConfig.companyInfo.phone
      },
      ...(lastModified && { "dateModified": lastModified })
    };
  },

  organization: (input: OrganizationInput = {}) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": input.name || seoConfig.companyInfo.name,
    "url": seoConfig.siteUrl,
    "logo": `${seoConfig.siteUrl}/images/4seasons-logo.jpg`,
    "description": input.description || "Premier real estate services in Dallas-Fort Worth metroplex, specializing in residential sales, property management, and market analysis.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": input.phone || seoConfig.companyInfo.phone,
      "contactType": "customer service",
      "areaServed": input.areaServed || ["US"],
      "availableLanguage": "English",
      ...(input.email && { "email": input.email })
    },
    "sameAs": [
      "https://www.facebook.com/4SeasonsRealEstate",
      "https://www.instagram.com/4SeasonsRealEstate",
      "https://www.linkedin.com/company/4SeasonsRealEstate"
    ],
    "address": input.address ? (
      typeof input.address === 'string' ? {
        "@type": "PostalAddress",
        "streetAddress": input.address
      } : {
        "@type": "PostalAddress",
        ...seoConfig.companyInfo.address
      }
    ) : {
      "@type": "PostalAddress",
      ...seoConfig.companyInfo.address
    },
    ...(input.foundingDate && { "foundingDate": input.foundingDate })
  }),
  
  person: (input: PersonInput | string, role?: string, description?: string, image?: string, socialProfiles?: string[]) => {
    // Support both new object interface and legacy individual parameters
    if (typeof input === 'string') {
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": input,
        "jobTitle": role,
        "description": description,
        "worksFor": {
          "@type": "Organization",
          "name": seoConfig.companyInfo.name,
          "url": seoConfig.siteUrl
        },
        ...(image && { "image": image }),
        ...(socialProfiles && socialProfiles.length > 0 && { "sameAs": socialProfiles }),
        "knowsAbout": ["Real Estate", "North Texas Market", "Property Investment", "Home Valuation"],
        "alumniOf": {
          "@type": "Organization",
          "name": "Real Estate Professional"
        }
      };
    }

    // New object interface
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": input.name,
      "jobTitle": input.jobTitle,
      "description": input.description,
      "worksFor": typeof input.worksFor === 'string' ? {
        "@type": "Organization",
        "name": input.worksFor,
        "url": seoConfig.siteUrl
      } : {
        "@type": "Organization",
        "name": seoConfig.companyInfo.name,
        "url": seoConfig.siteUrl
      },
      ...(input.image && { "image": input.image }),
      ...(input.email && { "email": input.email }),
      ...(input.socialProfiles && input.socialProfiles.length > 0 && { "sameAs": input.socialProfiles }),
      "knowsAbout": input.knowsAbout || ["Real Estate", "North Texas Market", "Property Investment", "Home Valuation"],
      "alumniOf": {
        "@type": "Organization",
        "name": "Real Estate Professional"
      }
    };
  },
  
  propertyListing: (property: {
    name: string,
    price: string,
    address: string,
    bedrooms: number,
    bathrooms: number,
    squareFeet: number,
    description: string,
    image?: string
  }) => ({
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.name,
    "description": property.description,
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "USD"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address
    },
    "numberOfRooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.squareFeet,
      "unitCode": "FTK"
    },
    ...(property.image && { "image": property.image })
  }),
  
  videoObject: (name: string, description: string, thumbnailUrl: string, uploadDate: string, duration: string, embedUrl: string) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration,
    "embedUrl": embedUrl,
    "publisher": {
      "@type": "Organization",
      "name": seoConfig.companyInfo.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${seoConfig.siteUrl}/images/4seasons-logo.jpg`
      }
    }
  }),
  
  howTo: (name: string, description: string, steps: Array<{name: string, text: string, image?: string}>) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image })
    }))
  })
};
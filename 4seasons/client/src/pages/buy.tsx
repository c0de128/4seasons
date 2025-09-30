import { Phone, Mail, MapPin, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import { useState, useEffect, useRef } from "react";
import { useIframeResizer } from "@/utils/iframeResizer";
import planoImage from "@/assets/images/plano.jpg";
import friscoImage from "@/assets/images/frisco.webp";
import allenImage from "@/assets/images/allen.webp";
import mckinneyImage from "@/assets/images/mckinney.jpeg";
import richardsonImage from "@/assets/images/richardson.jpg";
import carrolltonImage from "@/assets/images/Carrollton.webp";
import northTexasImage from "@/assets/images/north-texas.jpg";
import personalizedServiceImage from "@/assets/images/personalized-service.webp";
import negotiationExcellenceImage from "@/assets/images/negotiation-excellence.jpg";
import professionalsImage from "@/assets/images/professionals.jpg";
import firstHouseImage from "@/assets/images/first-house.jpg";
import relocationAssistanceImage from "@/assets/images/relocation-assistance.jpg";
import heroBackgroundImage from "@/assets/images/hero-images/6016.jpg";

export default function Buy() {
  // Enhanced iframe management using the utility
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Configure the iframe resizer
  const { initializeResizer, height, width } = useIframeResizer(
    {
      minHeight: 600,
      maxHeight: 5000,
      debounceDelay: 150,
      enableSmoothResize: true,
      fallbackHeight: 800,
      debug: process.env.NODE_ENV === 'development' // Enable debug in development
    },
    {
      onResize: (newHeight, newWidth) => {
        console.log(`MLS iframe resized to: ${newHeight}px x ${newWidth}px`);
        setIsResizing(true);
        // Brief resize indication
        setTimeout(() => setIsResizing(false), 300);
      },
      onError: (error) => {
        console.error('Iframe resize error:', error);
      },
      onMessage: (message) => {
        console.log('Received iframe message:', message);
      }
    }
  );

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsIframeLoaded(true);

    // Initialize the resizer when iframe is loaded
    if (iframeRef.current) {
      initializeResizer(iframeRef.current);
      console.log('Iframe resizer initialized for MLS content');
    }
  };

  const seo = {
    title: "Buy a Home in North Texas | Expert Real Estate Guidance",
    description: "Find your dream home in North Texas with expert guidance. Search MLS listings, get personalized service, and navigate the buying process with confidence.",
    keywords: "buy home North Texas, real estate search, MLS listings, property search, home buying guide, real estate agent",
    ogImage: heroBackgroundImage,
    canonicalUrl: "https://4seasonsrealestate.com/buy"
  };

  const structuredData = generateStructuredData.service(
    'Home Buying Services',
    seo.description
  );

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogImage={seo.ogImage}
        canonicalUrl={seo.canonicalUrl}
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero Section */}
        <section
          className="relative h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Dream Home in North Texas
              </h1>
              <p className="text-xl mb-6">
                Search thousands of MLS listings and discover the perfect property with expert guidance every step of the way.
              </p>
              <Button size="lg" className="bg-[#0d0d33] hover:bg-[#1a1a4d] text-white">
                Start Your Search
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* MLS Search Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Search North Texas MLS Listings
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Access the most up-to-date property listings directly from the North Texas MLS database.
              </p>
            </div>

            {/* Enhanced MLS iframe with auto-resize functionality */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
              {/* Header bar with resize indicator */}
              <div className="bg-[#0d0d33] text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    isResizing ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'
                  }`}></div>
                  <span className="font-semibold">North Texas MLS Property Search</span>
                  {isResizing && (
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">
                      Adjusting size...
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {process.env.NODE_ENV === 'development' && (
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">
                      {height}px
                    </span>
                  )}
                  <div className="text-sm bg-white/20 px-3 py-1 rounded">
                    Powered by NTREIS
                  </div>
                </div>
              </div>

              {/* Loading indicator */}
              {!isIframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#0d0d33] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading MLS Search...</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Auto-sizing content for optimal viewing...
                    </p>
                  </div>
                </div>
              )}

              {/* Enhanced iframe with auto-resize */}
              <iframe
                ref={iframeRef}
                src="https://matrix.ntreis.net/Matrix/public/IDX.aspx?idx=2a47c86"
                style={{
                  height: `${height}px`,
                  width: "100%",
                  border: "none",
                  minHeight: "600px",
                  transition: "height 0.3s ease-in-out, opacity 0.2s ease-in-out",
                  opacity: isIframeLoaded ? 1 : 0
                }}
                width="100%"
                height={height.toString()}
                frameBorder="0"
                marginWidth="0"
                marginHeight="0"
                scrolling="no"
                allowFullScreen
                allow="geolocation; camera; microphone"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-modals"
                title="North Texas MLS Property Search - Auto-Resizing Content"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={handleIframeLoad}
              />

              {/* Status indicator for debugging */}
              {process.env.NODE_ENV === 'development' && isIframeLoaded && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Auto-resize: Active | {height}px
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Popular Areas Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Popular Areas in North Texas
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore some of the most sought-after communities where we help families find their perfect home.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Plano", image: planoImage, desc: "Family-friendly community with excellent schools" },
                { name: "Frisco", image: friscoImage, desc: "Rapidly growing city with modern amenities" },
                { name: "Allen", image: allenImage, desc: "Charming suburb known for its parks and recreation" },
                { name: "McKinney", image: mckinneyImage, desc: "Historic downtown with modern suburban appeal" },
                { name: "Richardson", image: richardsonImage, desc: "Diverse community with great dining and shopping" },
                { name: "Carrollton", image: carrolltonImage, desc: "Affordable living with convenient access to Dallas" }
              ].map((area, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img src={area.image} alt={area.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{area.name}</h3>
                    <p className="text-gray-600 mb-4">{area.desc}</p>
                    <Button variant="outline" size="sm" className="text-[#0d0d33] border-[#0d0d33] hover:bg-[#0d0d33] hover:text-white">
                      View Listings
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose 4 Seasons Real Estate?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We provide comprehensive support throughout your home buying journey with expertise you can trust.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  image: personalizedServiceImage,
                  title: "Personalized Service",
                  description: "Tailored guidance based on your unique needs, budget, and lifestyle preferences."
                },
                {
                  image: negotiationExcellenceImage,
                  title: "Expert Negotiation",
                  description: "Skilled negotiation to ensure you get the best possible deal on your dream home."
                },
                {
                  image: professionalsImage,
                  title: "Market Expertise",
                  description: "Deep knowledge of North Texas markets, neighborhoods, and property values."
                },
                {
                  image: firstHouseImage,
                  title: "First-Time Buyers",
                  description: "Special programs and guidance for first-time homebuyers navigating the process."
                },
                {
                  image: relocationAssistanceImage,
                  title: "Relocation Support",
                  description: "Comprehensive assistance for families relocating to the North Texas area."
                },
                {
                  image: northTexasImage,
                  title: "Local Knowledge",
                  description: "Insider knowledge of schools, amenities, and community features that matter most."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={feature.image} alt={feature.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Home Buying Process Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Home Buying Journey
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We guide you through every step of the home buying process to ensure a smooth and successful purchase.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Get Pre-Approved",
                  description: "Work with our preferred lenders to determine your budget and get pre-approved for financing."
                },
                {
                  step: "02",
                  title: "Search Properties",
                  description: "Use our MLS search tools and expert guidance to find properties that match your criteria."
                },
                {
                  step: "03",
                  title: "Make an Offer",
                  description: "Craft competitive offers with strategic negotiation to secure your chosen property."
                },
                {
                  step: "04",
                  title: "Close the Deal",
                  description: "Navigate inspections, appraisals, and final paperwork to complete your purchase."
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#0d0d33] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Contact />

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
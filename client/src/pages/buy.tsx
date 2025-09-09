import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
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

export default function Buy() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    // Set a timeout to show error state if iframe doesn't load within 10 seconds
    const timeout = setTimeout(() => {
      if (!iframeLoaded) {
        setIframeError(true);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [iframeLoaded]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIframeLoaded(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Search Properties - Find Your Dream Home in Dallas-Fort Worth | 4Seasons Real Estate"
        description="Discover exceptional homes for sale in Allen, Plano, Frisco, McKinney, Richardson, and throughout the DFW metroplex. Expert buyer representation and local market knowledge."
        keywords="buy home Dallas, DFW homes for sale, Allen TX homes, Plano real estate, Frisco homes for sale, McKinney properties, Richardson homes, home buyer agent, first time home buyer DFW, luxury homes Dallas"
        canonicalUrl={`${seoConfig.siteUrl}/buy`}
        ogTitle="Find Your Perfect North Texas Home - 4Seasons Real Estate"
        ogDescription="Discover exceptional properties in the DFW metroplex with expert guidance from North Texas's most trusted real estate professionals."
        ogImage={`${seoConfig.siteUrl}/images/buy-homes-dfw.jpg`}
        structuredData={generateStructuredData.service("Home Buying Services", "Expert home buying assistance in Dallas-Fort Worth metroplex including property search, market analysis, and buyer representation.")}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20" style={{ backgroundColor: 'rgb(241, 245, 249)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Find Your Perfect
              <span className="text-primary block">North Texas Home</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Discover exceptional properties in the DFW metroplex with expert guidance 
              from North Texas's most trusted real estate professionals.
            </p>
          </div>
        </div>
        
      </section>

      {/* Property Search Section */}
      <section id="search-properties" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Search Available Properties
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Browse our comprehensive database of homes for sale across Dallas, Fort Worth, Allen, Plano, Frisco, McKinney, and surrounding North Texas communities. Search by location, price range, home features, and more to find your perfect property with real-time MLS data.
            </p>
          </div>
        </div>
        
        {/* Property Search iframe - Full width container with enhanced visibility */}
        <div className="w-full">
          <div className="mx-auto" style={{ maxWidth: '100%' }}>
            <div className="bg-white border-2 border-blue-200 shadow-2xl relative overflow-hidden" style={{ minHeight: '900px' }}>
              {/* Header bar to make iframe more visible */}
              <div className="bg-[#0d0d33] text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="font-semibold">North Texas MLS Property Search</span>
                </div>
                <div className="text-sm bg-white/20 px-3 py-1 rounded flex items-center space-x-1">
                  <span>Powered by NTREIS</span>
                  {!iframeLoaded && !iframeError && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse ml-2"></div>
                  )}
                  {iframeLoaded && (
                    <div className="w-2 h-2 bg-green-400 rounded-full ml-2"></div>
                  )}
                  {iframeError && (
                    <div className="w-2 h-2 bg-red-400 rounded-full ml-2"></div>
                  )}
                </div>
              </div>
              
              {/* Loading/Error States */}
              {!iframeLoaded && !iframeError && (
                <div className="absolute inset-0 top-16 bg-gray-50 flex items-center justify-center z-10">
                  <div className="max-w-md text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Property Search</h3>
                    <p className="text-gray-600 mb-4">Connecting to North Texas MLS database...</p>
                    <div className="text-sm text-gray-500">
                      <p>This may take a few moments to load.</p>
                    </div>
                  </div>
                </div>
              )}

              {iframeError && (
                <div className="absolute inset-0 top-16 bg-gray-50 flex items-center justify-center z-10">
                  <div className="max-w-md text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ExternalLink className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-red-600 mb-2">Property Search Unavailable</h3>
                    <p className="text-gray-600 mb-6">
                      The MLS property search tool cannot be embedded directly. This is common with secure real estate platforms.
                    </p>
                    <div className="space-y-3">
                      <a 
                        href="https://matrix.ntreis.net/Matrix/Public/IDXMap.aspx?count=1&idx=2a47c86&pv=&or=" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-[#0d0d33] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <ExternalLink className="w-4 h-4 inline mr-2" />
                        Search Properties Directly
                      </a>
                      <div className="text-sm text-gray-500">
                        <p>Opens in a new window with full MLS access</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* The actual iframe */}
              <iframe 
                src="https://matrix.ntreis.net/Matrix/Public/IDXMap.aspx?count=1&idx=2a47c86&pv=&or="
                className="w-full border-0"
                style={{ 
                  minHeight: '800px', 
                  height: '800px',
                  background: 'white',
                  display: iframeError ? 'none' : 'block'
                }}
                title="Property Search - North Texas MLS"
                loading="lazy"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
              />
            </div>
          </div>
        </div>
      </section>



      {/* Popular Areas */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Popular North Texas Areas
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore the most sought-after neighborhoods in the DFW metroplex.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${planoImage})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Plano</h3>
                <p className="text-slate-600 mb-4">Excellent schools, family-friendly communities, and convenient shopping centers.</p>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Median Price: $485K</span>
                  <span>124 Available</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${friscoImage})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Frisco</h3>
                <p className="text-slate-600 mb-4">Rapidly growing city with modern amenities and top-rated schools.</p>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Median Price: $520K</span>
                  <span>98 Available</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${allenImage})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Allen</h3>
                <p className="text-slate-600 mb-4">Strong community feel with excellent recreational facilities and schools.</p>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Median Price: $465K</span>
                  <span>76 Available</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${mckinneyImage})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">McKinney</h3>
                <p className="text-slate-600 mb-4">Historic charm meets modern convenience in this fast-growing city.</p>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Median Price: $445K</span>
                  <span>112 Available</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${richardsonImage})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Richardson</h3>
                <p className="text-slate-600 mb-4">Diverse community with great dining, shopping, and cultural attractions.</p>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Median Price: $395K</span>
                  <span>89 Available</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${carrolltonImage})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Carrollton</h3>
                <p className="text-slate-600 mb-4">Affordable family homes with easy access to Dallas and surrounding areas.</p>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Median Price: $385K</span>
                  <span>67 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />

      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
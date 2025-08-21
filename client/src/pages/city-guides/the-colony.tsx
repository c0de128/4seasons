import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO } from "@/components/SEO";
import { MapPin, Users, GraduationCap, Building, Car, Plane, School } from "lucide-react";

export default function TheColonyCityGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const seoConfig = {
    title: "The Colony, Texas Real Estate Guide | Homes for Sale | 4Seasons Real Estate",
    description: "Discover The Colony, Texas - lakefront community on Lewisville Lake with excellent schools, water activities, and convenient Dallas access. Find your perfect home with 4Seasons Real Estate.",
    keywords: "The Colony Texas real estate, The Colony homes for sale, Lewisville Lake, lakefront living, family community, water activities, Dallas access, 4Seasons Real Estate",
    ogImage: "/images/cities/the-colony-hero.jpg",
    canonicalUrl: "https://4seasonsrealestate.com/city-guides/the-colony"
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        ogImage={seoConfig.ogImage}
        canonicalUrl={seoConfig.canonicalUrl}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-teal-900 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Colony, Texas
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Lakefront community on Lewisville Lake with water activities and family living
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Lakefront Living</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Water Activities</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Family Community</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Dallas Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">45,693</div>
              <div className="text-slate-600">Population</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">17 sq mi</div>
              <div className="text-slate-600">Total Area</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">$385,000</div>
              <div className="text-slate-600">Median Home Price</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <School className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">8/10</div>
              <div className="text-slate-600">School Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Welcome to The Colony
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  The Colony offers a unique lakefront lifestyle on the shores of Lewisville Lake, 
                  combining water recreation with suburban convenience. Known for its family-friendly 
                  atmosphere, excellent parks, and strong community spirit, The Colony provides 
                  residents with year-round outdoor activities and modern amenities.
                </p>
                <p>
                  With easy access to Dallas and the greater DFW area, plus the recreational 
                  opportunities of lake living, The Colony offers the best of both worlds - 
                  urban accessibility and resort-style living in your own backyard.
                </p>
              </div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Choose The Colony?</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Lakefront living on 29,000-acre Lewisville Lake
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Year-round water activities and recreation
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Multiple school district options including Lewisville and Frisco ISDs
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Family-friendly community with strong neighborhoods
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Easy access to Dallas and DFW Airport
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Schools & Education */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Schools & Education
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Served by multiple highly-rated school districts with excellent educational options.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Lewisville ISD</h3>
              <p className="text-slate-600 mb-4">Large district serving portions of The Colony with diverse programs and strong academics.</p>
              <div className="text-sm text-slate-500">
                Rating: 8/10 | Students: 52,000+
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Frisco ISD</h3>
              <p className="text-slate-600 mb-4">Top-rated district serving newer areas with exceptional academic and athletic programs.</p>
              <div className="text-sm text-slate-500">
                Rating: 9/10 | A-Rated District
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">The Colony High School</h3>
              <p className="text-slate-600 mb-4">Comprehensive high school with strong academics and competitive athletics programs.</p>
              <div className="text-sm text-slate-500">
                Multiple State Recognitions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Lakefront & Family Neighborhoods
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From waterfront estates to family-friendly subdivisions with lake access and amenities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Stewarts Creek Estates</h3>
              <p className="text-slate-600 mb-4">Luxury lakefront community with custom homes and private boat docks.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$785,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Tribute</h3>
              <p className="text-slate-600 mb-4">Master-planned community with resort-style amenities and golf course access.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$465,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Austin Waters</h3>
              <p className="text-slate-600 mb-4">Family neighborhood with parks, trails, and community amenities near the lake.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$385,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Lewisville Lake Estates</h3>
              <p className="text-slate-600 mb-4">Established lakefront community with mature trees and water access.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$425,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Grandscape</h3>
              <p className="text-slate-600 mb-4">New development near entertainment district with modern homes and amenities.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$445,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Parkside</h3>
              <p className="text-slate-600 mb-4">Affordable family community with good schools and neighborhood amenities.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$325,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities & Lifestyle */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Amenities & Lifestyle
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Lakefront living with year-round recreation and modern community amenities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Recreation & Community</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Lewisville Lake access with boating, fishing, and water sports
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  The Colony Aquatic Park with lazy river and pools
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Multiple parks including Stewart Creek and Shoreline Trail
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Grandscape entertainment district with shopping and dining
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Community events and festivals throughout the year
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Transportation & Access</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start">
                  <Plane className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  DFW International Airport - 30 minutes away
                </li>
                <li className="flex items-start">
                  <Car className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Highway 121, Sam Rayburn Tollway, and I-35E access
                </li>
                <li className="flex items-start">
                  <Car className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Easy commute to Dallas, Plano, and Richardson
                </li>
                <li className="flex items-start">
                  <Building className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Access to Legacy West and Frisco business corridors
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Central Denton County location with lake access
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
}
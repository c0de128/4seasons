import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO } from "@/components/SEO";
import { MapPin, Users, GraduationCap, Building, Car, Plane, School } from "lucide-react";

export default function CoppellCityGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const seoConfig = {
    title: "Coppell, Texas Real Estate Guide | Homes for Sale | 4Seasons Real Estate",
    description: "Discover Coppell, Texas - premier family community with top-rated Coppell ISD schools, master-planned neighborhoods, and convenient DFW location. Find your perfect home with 4Seasons Real Estate.",
    keywords: "Coppell Texas real estate, Coppell homes for sale, Coppell ISD, family community, master-planned neighborhoods, DFW access, top schools, 4Seasons Real Estate",
    ogImage: "/images/cities/coppell-hero.jpg",
    canonicalUrl: "https://4seasonsrealestate.com/city-guides/coppell"
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
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-900 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Coppell, Texas
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Premier family community with top-rated schools and master-planned neighborhoods
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Top Schools</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Family Community</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">DFW Access</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Master-Planned</span>
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
              <div className="text-2xl font-bold text-slate-900">42,983</div>
              <div className="text-slate-600">Population</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">14 sq mi</div>
              <div className="text-slate-600">Total Area</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">$525,000</div>
              <div className="text-slate-600">Median Home Price</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <School className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">10/10</div>
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
                Welcome to Coppell
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  Coppell stands as one of North Texas's most desirable family communities, 
                  consistently ranked among the best places to live in America. With the 
                  exceptional Coppell ISD, beautiful master-planned neighborhoods, and 
                  convenient access to DFW Airport, Coppell offers the perfect blend of 
                  suburban excellence and urban accessibility.
                </p>
                <p>
                  Located strategically between Dallas and Fort Worth with some of the state's 
                  top-rated schools, Coppell provides an ideal environment for families seeking 
                  quality education, safe neighborhoods, and strong community values.
                </p>
              </div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Choose Coppell?</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Coppell ISD - consistently rated among Texas's best districts
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Master-planned communities with resort-style amenities
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Minutes from DFW International Airport
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Low crime rates and family-safe environment
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Excellent parks and recreational facilities
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
              Coppell ISD consistently ranks as one of the top school districts in Texas and the nation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Coppell ISD</h3>
              <p className="text-slate-600 mb-4">Nationally recognized district known for academic excellence, innovative programs, and exceptional student outcomes.</p>
              <div className="text-sm text-slate-500">
                Rating: 10/10 | Students: 12,000+
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Coppell High School</h3>
              <p className="text-slate-600 mb-4">Award-winning high school with exceptional academics, championship athletics, and extensive extracurriculars.</p>
              <div className="text-sm text-slate-500">
                National Blue Ribbon School
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Advanced Programs</h3>
              <p className="text-slate-600 mb-4">Comprehensive AP offerings, dual credit programs, and specialized STEM and fine arts tracks.</p>
              <div className="text-sm text-slate-500">
                99% Graduation Rate
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
              Master-Planned Communities
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Thoughtfully designed neighborhoods with resort-style amenities and family-friendly features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Riverchase</h3>
              <p className="text-slate-600 mb-4">Premier master-planned community with golf course, pools, and luxury amenities.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$675,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Woodcreek</h3>
              <p className="text-slate-600 mb-4">Established neighborhood with mature trees and excellent school proximity.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$485,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Gentry Park</h3>
              <p className="text-slate-600 mb-4">Family-oriented community with parks, trails, and community amenities.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$525,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Old Town</h3>
              <p className="text-slate-600 mb-4">Historic area with charm and walkable access to downtown amenities.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$425,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Cottonwood Creek</h3>
              <p className="text-slate-600 mb-4">Newer development with modern homes and convenient highway access.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$565,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Northlake</h3>
              <p className="text-slate-600 mb-4">Luxury homes with larger lots and premium neighborhood amenities.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$695,000</span>
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
              Resort-style amenities and recreational opportunities in a premier community setting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Recreation & Community</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Coppell Community Aquatic Center with Olympic-size pool
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Multiple parks including Wagon Wheel and Andy Brown East
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Riverchase Golf Club and country club amenities
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Old Town Coppell with shops, restaurants, and events
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Extensive trail system and green spaces
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Transportation & Access</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start">
                  <Plane className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  DFW International Airport - 15 minutes away
                </li>
                <li className="flex items-start">
                  <Car className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Highway 121, 635, and Dallas North Tollway access
                </li>
                <li className="flex items-start">
                  <Car className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Easy commute to Dallas and Las Colinas business districts
                </li>
                <li className="flex items-start">
                  <Building className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Close to major employment centers and business corridors
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Strategic northwest Dallas County location
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
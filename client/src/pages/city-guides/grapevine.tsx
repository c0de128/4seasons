import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO } from "@/components/SEO";
import { MapPin, Users, GraduationCap, Building, Car, Plane, School } from "lucide-react";

export default function GrapevineCityGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const seoConfig = {
    title: "Grapevine, Texas Real Estate Guide | Homes for Sale | 4Seasons Real Estate",
    description: "Discover Grapevine, Texas - historic charm with modern amenities, DFW Airport access, Main Street entertainment, lakes, and family-friendly neighborhoods. Find your perfect home with 4Seasons Real Estate.",
    keywords: "Grapevine Texas real estate, Grapevine homes for sale, Historic Main Street, DFW Airport, Grapevine Lake, wine culture, family community, 4Seasons Real Estate",
    ogImage: "/images/cities/grapevine-hero.jpg",
    canonicalUrl: "https://4seasonsrealestate.com/city-guides/grapevine"
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
      <section className="pt-24 pb-16 bg-gradient-to-r from-purple-900 to-pink-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Grapevine, Texas
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Historic charm meets modern convenience with wine culture and DFW Airport access
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Historic Main Street</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Wine Capital</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">DFW Access</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Lake Community</span>
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
              <div className="text-2xl font-bold text-slate-900">50,195</div>
              <div className="text-slate-600">Population</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">33 sq mi</div>
              <div className="text-slate-600">Total Area</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">$385,000</div>
              <div className="text-slate-600">Median Home Price</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <School className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">9/10</div>
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
                Welcome to Grapevine
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  Grapevine perfectly balances historic charm with modern convenience, offering residents 
                  a picturesque Main Street district, award-winning wine culture, and immediate access to 
                  DFW International Airport. Known as the "Christmas Capital of Texas," the city maintains 
                  small-town character while providing urban amenities.
                </p>
                <p>
                  Located between Dallas and Fort Worth with Grapevine Lake as a centerpiece, the community 
                  offers excellent schools, diverse neighborhoods, and year-round entertainment that makes it 
                  one of the most desirable places to live in North Texas.
                </p>
              </div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Choose Grapevine?</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Historic Main Street with shops, restaurants, and events
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  DFW International Airport within city limits
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Grapevine Lake recreation and waterfront living
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Award-winning school district and education programs
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Wine culture and culinary scene recognition
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
              Exceptional education through Grapevine-Colleyville ISD, consistently ranked among the best in Texas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Grapevine-Colleyville ISD</h3>
              <p className="text-slate-600 mb-4">Highly-rated district known for academic excellence and innovative programs.</p>
              <div className="text-sm text-slate-500">
                Rating: 9/10 | Students: 14,000+
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Elementary Schools</h3>
              <p className="text-slate-600 mb-4">Multiple award-winning elementary schools with excellent teacher-student ratios.</p>
              <div className="text-sm text-slate-500">
                8 Elementary Schools in District
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Grapevine High School</h3>
              <p className="text-slate-600 mb-4">Comprehensive high school with strong academics, arts, and athletics programs.</p>
              <div className="text-sm text-slate-500">
                State Championship Athletics
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
              Popular Neighborhoods
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From historic districts to lakefront communities and modern developments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Historic Downtown</h3>
              <p className="text-slate-600 mb-4">Charming homes near Main Street with walkable access to shops and restaurants.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$425,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Lakeshore</h3>
              <p className="text-slate-600 mb-4">Waterfront and near-water homes with lake access and premium amenities.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$650,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Dove Creek</h3>
              <p className="text-slate-600 mb-4">Master-planned community with new homes and resort-style amenities.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$485,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Mustang Creek Estates</h3>
              <p className="text-slate-600 mb-4">Luxury homes on large lots with golf course access and privacy.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$725,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Silver Lake</h3>
              <p className="text-slate-600 mb-4">Established neighborhood with mature trees and convenient location.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$365,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Oak Grove</h3>
              <p className="text-slate-600 mb-4">Family-friendly area with parks, trails, and excellent school access.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$395,000</span>
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
              Rich cultural heritage with year-round festivals, lake recreation, and convenient travel access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Recreation & Entertainment</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Historic Main Street shopping and dining district
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Grapevine Lake with boating, fishing, and water sports
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Annual GrapeFest wine festival and Christmas celebrations
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Grapevine Vintage Railroad and heritage experiences
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Multiple parks, trails, and recreational facilities
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Transportation & Access</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start">
                  <Plane className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  DFW International Airport within city limits
                </li>
                <li className="flex items-start">
                  <Car className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  State Highway 114, 121, and 635 access
                </li>
                <li className="flex items-start">
                  <Car className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  TEXRail commuter rail to Fort Worth
                </li>
                <li className="flex items-start">
                  <Building className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  20 minutes to downtown Dallas or Fort Worth
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Convenient access to major business corridors
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
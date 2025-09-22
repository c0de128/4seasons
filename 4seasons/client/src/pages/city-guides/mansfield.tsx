import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO } from "@/components/SEO";
import { MapPin, Users, GraduationCap, Building, Car, Plane, School } from "lucide-react";

export default function MansfieldCityGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const seoConfig = {
    title: "Mansfield, Texas Real Estate Guide | Homes for Sale | 4Seasons Real Estate",
    description: "Discover Mansfield, Texas - thriving community with excellent Mansfield ISD schools, master-planned neighborhoods, and family-friendly amenities. Find your perfect home with 4Seasons Real Estate.",
    keywords: "Mansfield Texas real estate, Mansfield homes for sale, Mansfield ISD, master-planned communities, family neighborhoods, growing city, 4Seasons Real Estate",
    ogImage: "/images/cities/mansfield-hero.jpg",
    canonicalUrl: "https://4seasonsrealestate.com/city-guides/mansfield"
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
      <section className="pt-24 pb-16 bg-gradient-to-r from-orange-900 to-red-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mansfield, Texas
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Thriving community with excellent schools and master-planned neighborhoods
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Growing Community</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Top Schools</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Master-Planned</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Family Focus</span>
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
              <div className="text-2xl font-bold text-slate-900">73,568</div>
              <div className="text-slate-600">Population</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">37 sq mi</div>
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
                Welcome to Mansfield
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  Mansfield has emerged as one of North Texas's most desirable communities, combining 
                  rapid growth with careful planning to create an exceptional place to live. With the 
                  highly-rated Mansfield ISD and numerous master-planned neighborhoods, the city offers 
                  modern amenities while maintaining a strong sense of community.
                </p>
                <p>
                  Strategically located between Dallas and Fort Worth with easy access to major employment 
                  centers, Mansfield provides the perfect balance of suburban comfort and urban convenience, 
                  making it an ideal choice for growing families and professionals.
                </p>
              </div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Choose Mansfield?</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Mansfield ISD - consistently high-performing school district
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Master-planned communities with modern amenities
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Strategic location between Dallas and Fort Worth
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Strong economic growth and development
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Family-oriented community with excellent parks
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
              Mansfield ISD consistently ranks among the top school districts in Texas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Mansfield ISD</h3>
              <p className="text-slate-600 mb-4">Highly-rated district serving the community with excellence in academics and extracurriculars.</p>
              <div className="text-sm text-slate-500">
                Rating: 9/10 | Students: 37,000+
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">High School Excellence</h3>
              <p className="text-slate-600 mb-4">Multiple high schools including Mansfield High, Lake Ridge, and Legacy with strong programs.</p>
              <div className="text-sm text-slate-500">
                State Academic Championships
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">STEM Programs</h3>
              <p className="text-slate-600 mb-4">Advanced STEM initiatives and career preparation programs for college and workforce readiness.</p>
              <div className="text-sm text-slate-500">
                Technology Integration
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
              Modern neighborhoods designed for family living with amenities and convenience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Walnut Creek</h3>
              <p className="text-slate-600 mb-4">Master-planned community with amenity center, pools, and family-friendly neighborhoods.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$425,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Mansfield National</h3>
              <p className="text-slate-600 mb-4">Golf course community with luxury homes and country club lifestyle amenities.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$565,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Waterview</h3>
              <p className="text-slate-600 mb-4">Newer development with modern homes and convenient access to schools and shopping.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$365,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Timber Creek</h3>
              <p className="text-slate-600 mb-4">Established neighborhood with mature trees and proximity to Mansfield schools.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$335,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Heritage</h3>
              <p className="text-slate-600 mb-4">Family community with parks, trails, and excellent access to major highways.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$395,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Countryside</h3>
              <p className="text-slate-600 mb-4">Peaceful neighborhood with larger lots and custom home opportunities.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$455,000</span>
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
              Modern amenities and recreational opportunities for active family living.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Recreation & Community</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Mansfield Activities Center with fitness and aquatic facilities
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Multiple community parks and athletic complexes
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Historic downtown district with events and festivals
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Golf courses and country club communities
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Shopping and dining at nearby Arlington Highlands
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Transportation & Access</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start">
                  <Plane className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  DFW International Airport - 25 minutes away
                </li>
                <li className="flex items-start">
                  <Car className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Highway 287, I-20, and US 67 access
                </li>
                <li className="flex items-start">
                  <Car className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Easy commute to Dallas and Fort Worth
                </li>
                <li className="flex items-start">
                  <Building className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Growing commercial and business districts
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Central location to major employment hubs
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
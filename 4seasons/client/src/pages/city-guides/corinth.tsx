import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO } from "@/components/SEO";
import { MapPin, Users, GraduationCap, Building, School, Waves, TreePine } from "lucide-react";

export default function CorinthCityGuide() {
  const seoConfig = {
    title: "Corinth, Texas Real Estate Guide | Homes for Sale | 4Seasons Real Estate",
    description: "Discover Corinth, Texas - lakefront community with family-friendly neighborhoods, excellent schools, and Lake Lewisville access. Find your perfect home with 4Seasons Real Estate.",
    keywords: "Corinth Texas real estate, Corinth homes for sale, Lake Lewisville, family community, Denton ISD, 4Seasons Real Estate",
    ogImage: "/images/cities/corinth-hero.jpg",
    canonicalUrl: "https://4seasonsrealestate.com/city-guides/corinth"
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
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-800 to-teal-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Corinth, Texas
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              A family-friendly lakefront community with small-town charm and big-city conveniences
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Lakefront Community</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Family Friendly</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Affordable Living</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Great Schools</span>
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
              <div className="text-2xl font-bold text-slate-900">21,500</div>
              <div className="text-slate-600">Population</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Waves className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">Lake</div>
              <div className="text-slate-600">Access</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">$385K</div>
              <div className="text-slate-600">Median Home</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">28 mi</div>
              <div className="text-slate-600">to Downtown Dallas</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Corinth */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Welcome to Corinth
              </h2>
              <div className="prose prose-lg text-slate-700 space-y-4">
                <p>
                  Corinth offers the perfect blend of lakefront living and suburban convenience in North Texas. Located on the shores of Lake Lewisville, this charming community provides residents with water recreation opportunities, excellent schools, and a strong sense of community pride.
                </p>
                <p>
                  Known for its family-friendly atmosphere and affordable housing options, Corinth has become an attractive destination for young families and professionals seeking quality of life without the premium price tag of larger cities. The city's commitment to parks, recreation, and community events creates a welcoming environment for all residents.
                </p>
                <p>
                  With easy access to major employment centers via I-35E and proximity to both Dallas and Fort Worth, Corinth provides the perfect balance of small-town living and metropolitan convenience.
                </p>
              </div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Choose Corinth?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Direct access to Lake Lewisville recreation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Affordable housing options</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">High-quality Denton ISD schools</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Family-oriented community events</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Convenient I-35E corridor access</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Schools & Education */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Education Excellence
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <School className="w-10 h-10 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Denton ISD</h3>
              <p className="text-slate-600 mb-4">
                Corinth students attend highly-rated Denton ISD schools, known for academic excellence and comprehensive programs serving diverse student needs.
              </p>
              <div className="text-sm text-slate-500">
                Rating: 8/10 • Quality Programs • Strong Academics
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-10 h-10 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Educational Opportunities</h3>
              <p className="text-slate-600 mb-4">
                Access to advanced academic programs, extracurricular activities, and preparation for higher education and career success.
              </p>
              <div className="text-sm text-slate-500">
                AP Courses • Career Programs • College Prep
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Popular Neighborhoods
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Lakewood Shores</h3>
              <p className="text-slate-600 mb-4">
                Waterfront properties with lake access, boat docks, and stunning water views. Perfect for water recreation enthusiasts.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $450K - $700K
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Corinth Hills</h3>
              <p className="text-slate-600 mb-4">
                Established neighborhood with mature trees, family homes, and convenient access to schools and amenities.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $300K - $500K
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Prairie Creek</h3>
              <p className="text-slate-600 mb-4">
                Newer development with modern homes, community amenities, and family-friendly features throughout.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $350K - $550K
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities & Lifestyle */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Amenities & Lifestyle
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Recreation</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Lake Lewisville water activities</li>
                <li>• Corinth Community Park</li>
                <li>• Multiple playgrounds and sports fields</li>
                <li>• Walking and biking trails</li>
                <li>• Youth sports leagues</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Community</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Annual Corinth Classic Car Show</li>
                <li>• Community festivals and events</li>
                <li>• Local farmers markets</li>
                <li>• Family-friendly programming</li>
                <li>• Active neighborhood associations</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Transportation</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• I-35E corridor access</li>
                <li>• FM 2181 connectivity</li>
                <li>• Easy DFW Airport access</li>
                <li>• Close to DCTA services</li>
                <li>• Bike-friendly neighborhoods</li>
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
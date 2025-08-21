import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO } from "@/components/SEO";
import { MapPin, Users, GraduationCap, Building, School, TreePine, Home } from "lucide-react";

export default function AubreyCityGuide() {
  const seoConfig = {
    title: "Aubrey, Texas Real Estate Guide | Homes for Sale | 4Seasons Real Estate",
    description: "Discover Aubrey, Texas - growing community with rural charm, new developments, and excellent schools. Find your perfect home with 4Seasons Real Estate.",
    keywords: "Aubrey Texas real estate, Aubrey homes for sale, rural community, new construction, Aubrey ISD, 4Seasons Real Estate",
    ogImage: "/images/cities/aubrey-hero.jpg",
    canonicalUrl: "https://4seasonsrealestate.com/city-guides/aubrey"
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
      <section className="pt-24 pb-16 bg-gradient-to-r from-green-800 to-teal-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Aubrey, Texas
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Where rural heritage meets modern growth in North Texas
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Rural Heritage</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Growing Community</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">New Development</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Top Schools</span>
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
              <div className="text-2xl font-bold text-slate-900">4,500</div>
              <div className="text-slate-600">Population</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TreePine className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">Rural</div>
              <div className="text-slate-600">Setting</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">$485K</div>
              <div className="text-slate-600">Median Home</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">35 mi</div>
              <div className="text-slate-600">to Downtown Dallas</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Aubrey */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Welcome to Aubrey
              </h2>
              <div className="prose prose-lg text-slate-700 space-y-4">
                <p>
                  Aubrey represents the perfect blend of rural heritage and modern growth in North Texas. This charming community has maintained its small-town character while experiencing steady development that attracts families seeking a peaceful lifestyle with convenient access to major metropolitan areas.
                </p>
                <p>
                  Known for its rolling hills, expansive properties, and strong sense of community, Aubrey offers residents the tranquility of country living without sacrificing modern conveniences. The town's commitment to controlled growth has preserved its natural beauty while providing excellent schools and amenities.
                </p>
                <p>
                  With new master-planned communities and continued investment in infrastructure, Aubrey continues to attract families and professionals seeking quality of life in a growing yet intimate community setting.
                </p>
              </div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Choose Aubrey?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Rural setting with modern amenities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Excellent Aubrey ISD schools</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Large lots and acreage properties</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Strong community involvement</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Growing value and investment potential</span>
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Aubrey ISD</h3>
              <p className="text-slate-600 mb-4">
                A rapidly improving school district committed to academic excellence and student success, with new facilities and innovative programs serving the growing community.
              </p>
              <div className="text-sm text-slate-500">
                Rating: 8/10 • Growing District • New Facilities
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-10 h-10 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Community Focus</h3>
              <p className="text-slate-600 mb-4">
                Small class sizes, personalized attention, and strong community support create an exceptional learning environment for all students.
              </p>
              <div className="text-sm text-slate-500">
                Small Classes • Community Support • Individual Attention
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Silverado</h3>
              <p className="text-slate-600 mb-4">
                Master-planned community with luxury amenities, resort-style living, and custom homes on larger homesites.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $500K - $900K
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Country Estates</h3>
              <p className="text-slate-600 mb-4">
                Rural properties with acreage, custom homes, and the peace of country living with modern conveniences.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $450K - $800K
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Historic Aubrey</h3>
              <p className="text-slate-600 mb-4">
                Established neighborhoods with character homes, mature landscapes, and proximity to downtown amenities.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $350K - $600K
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
                <li>• Aubrey City Park</li>
                <li>• Community centers and events</li>
                <li>• Horse-friendly properties</li>
                <li>• Rural trails and open spaces</li>
                <li>• Youth sports and activities</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Community</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Annual community festivals</li>
                <li>• Local farmers markets</li>
                <li>• Historic downtown area</li>
                <li>• Active civic organizations</li>
                <li>• Strong neighborhood pride</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Transportation</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• US 380 corridor access</li>
                <li>• FM 2931 connectivity</li>
                <li>• Easy Frisco/Plano access</li>
                <li>• Growing infrastructure</li>
                <li>• Scenic country roads</li>
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
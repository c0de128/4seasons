import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO } from "@/components/SEO";
import { MapPin, Users, GraduationCap, Building, School, TreePine, Home } from "lucide-react";

export default function ArgyleCityGuide() {
  const seoConfig = {
    title: "Argyle, Texas Real Estate Guide | Homes for Sale | 4Seasons Real Estate",
    description: "Discover Argyle, Texas - charming small town with luxury communities, excellent schools, and rural charm. Find your perfect home with 4Seasons Real Estate.",
    keywords: "Argyle Texas real estate, Argyle homes for sale, luxury community, rural charm, Argyle ISD, 4Seasons Real Estate",
    ogImage: "/images/cities/argyle-hero.jpg",
    canonicalUrl: "https://4seasonsrealestate.com/city-guides/argyle"
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
      <section className="pt-24 pb-16 bg-gradient-to-r from-amber-900 to-orange-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Argyle, Texas
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Where small-town charm meets luxury living in North Texas
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Small Town Charm</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Luxury Communities</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Top Schools</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Rural Beauty</span>
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
              <div className="text-2xl font-bold text-slate-900">4,100</div>
              <div className="text-slate-600">Population</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TreePine className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">Rural</div>
              <div className="text-slate-600">Character</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">$650K</div>
              <div className="text-slate-600">Median Home</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">30 mi</div>
              <div className="text-slate-600">to Downtown Dallas</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Argyle */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Welcome to Argyle
              </h2>
              <div className="prose prose-lg text-slate-700 space-y-4">
                <p>
                  Argyle represents the perfect balance between small-town charm and luxury living in North Texas. This picturesque community has maintained its rural character while developing some of the region's most prestigious neighborhoods and estate properties.
                </p>
                <p>
                  Known for its rolling hills, mature trees, and spacious lots, Argyle offers residents a peaceful retreat from urban life while remaining conveniently connected to major employment centers. The town's commitment to preserving its natural beauty has made it a sought-after destination for families seeking tranquility without sacrificing convenience.
                </p>
                <p>
                  With excellent schools, luxury amenities, and a strong sense of community, Argyle continues to attract discerning buyers looking for the finest in rural suburban living.
                </p>
              </div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Choose Argyle?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Prestigious luxury communities and estates</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Highly-rated Argyle ISD schools</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Large lots and acreage properties</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Rural atmosphere with urban access</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Strong property values and investment potential</span>
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Argyle ISD</h3>
              <p className="text-slate-600 mb-4">
                One of Texas's top-performing small school districts, providing personalized education with low student-to-teacher ratios and exceptional academic achievement.
              </p>
              <div className="text-sm text-slate-500">
                Rating: 10/10 • Exemplary Rating • Top 1% in Texas
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-10 h-10 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Small School Advantages</h3>
              <p className="text-slate-600 mb-4">
                Small class sizes, personalized attention, and strong community involvement create an exceptional educational environment for all students.
              </p>
              <div className="text-sm text-slate-500">
                15:1 Student-Teacher Ratio • 100% College Acceptance • State Champions
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Bella Charca</h3>
              <p className="text-slate-600 mb-4">
                Luxury gated community with custom homes, resort amenities, and beautiful natural settings on large homesites.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $800K - $2M+
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Country Estates</h3>
              <p className="text-slate-600 mb-4">
                Rural properties with acreage, custom homes, and the tranquility of country living with modern conveniences.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $600K - $1.5M
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Old Town Argyle</h3>
              <p className="text-slate-600 mb-4">
                Historic area with character homes, established neighborhoods, and close proximity to downtown amenities.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $500K - $900K
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
                <li>• Old Settlers Park</li>
                <li>• Community gardens and green spaces</li>
                <li>• Equestrian facilities and trails</li>
                <li>• Private club amenities</li>
                <li>• Annual community festivals</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Dining & Shopping</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Local restaurants and cafes</li>
                <li>• Farmers markets</li>
                <li>• Boutique shopping</li>
                <li>• Close to Flower Mound amenities</li>
                <li>• Country club dining</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Transportation</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• I-35W corridor access</li>
                <li>• FM 407 connectivity</li>
                <li>• Easy DFW Airport access</li>
                <li>• Scenic country roads</li>
                <li>• Horse-friendly roadways</li>
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
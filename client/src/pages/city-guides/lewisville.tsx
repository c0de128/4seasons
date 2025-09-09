import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO } from "@/components/SEO";
import { MapPin, Users, GraduationCap, Building, Car, Plane, School, Waves } from "lucide-react";

export default function LewisvilleCityGuide() {
  const seoConfig = {
    title: "Lewisville, Texas Real Estate Guide | Homes for Sale | 4Seasons Real Estate",
    description: "Discover Lewisville, Texas - Lake Lewisville lifestyle, excellent schools, family communities, and Dallas access. Find your perfect home with 4Seasons Real Estate's expertise.",
    keywords: "Lewisville Texas real estate, Lewisville homes for sale, Lake Lewisville, family community, LISD, 4Seasons Real Estate",
    ogImage: "/images/cities/lewisville-hero.jpg",
    canonicalUrl: "https://4seasonsrealestate.com/city-guides/lewisville"
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO config={seoConfig} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Lewisville, Texas
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Where lakefront living meets family-friendly communities and excellent schools
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Lake Community</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Top Schools</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Family Friendly</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">DCTA Access</span>
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
              <div className="text-2xl font-bold text-slate-900">116,000</div>
              <div className="text-slate-600">Population</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Waves className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">29,000</div>
              <div className="text-slate-600">Lake Acres</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">$375K</div>
              <div className="text-slate-600">Median Home</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">25 mi</div>
              <div className="text-slate-600">to Downtown Dallas</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Lewisville */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Welcome to Lewisville
              </h2>
              <div className="prose prose-lg text-slate-700 space-y-4">
                <p>
                  Lewisville offers the perfect combination of lakefront living and suburban convenience. Situated on the shores of beautiful Lake Lewisville, this thriving city provides residents with water recreation opportunities right in their backyard while maintaining easy access to Dallas and Fort Worth.
                </p>
                <p>
                  Known for its excellent schools, family-friendly neighborhoods, and strong sense of community, Lewisville has become one of North Texas's most desirable places to live. The city's commitment to parks, recreation, and quality of life makes it ideal for families and professionals alike.
                </p>
                <p>
                  With convenient DCTA A-train access to Dallas and a growing business sector, Lewisville provides the perfect balance of work and leisure opportunities.
                </p>
              </div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Choose Lewisville?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Direct access to 29,000-acre Lake Lewisville</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Highly-rated Lewisville ISD schools</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">DCTA A-train service to Dallas</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Growing Vista Ridge Mall area</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Family-oriented community events</span>
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Lewisville ISD</h3>
              <p className="text-slate-600 mb-4">
                One of Texas's top-performing school districts, serving Lewisville with exceptional academic programs and state-of-the-art facilities including Lewisville High School and Hebron High School.
              </p>
              <div className="text-sm text-slate-500">
                Rating: 9/10 • Students: 52,000+ • Schools: 90+
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-10 h-10 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Advanced Programs</h3>
              <p className="text-slate-600 mb-4">
                LISD offers extensive AP courses, dual enrollment opportunities, and specialized programs including STEM academies and performing arts programs.
              </p>
              <div className="text-sm text-slate-500">
                30+ AP Courses • Dual Credit • Career Academies
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Castle Hills</h3>
              <p className="text-slate-600 mb-4">
                Established neighborhood with mature trees, larger lots, and easy access to I-35E. Close to Vista Ridge Mall and dining.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $300K - $500K
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Lake Vista</h3>
              <p className="text-slate-600 mb-4">
                Lakefront community with water access, marina, and luxury homes. Perfect for water enthusiasts and weekend relaxation.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $500K - $1M+
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">The Tribute</h3>
              <p className="text-slate-600 mb-4">
                Master-planned waterfront community with golf course, resort amenities, and custom homes on Lake Lewisville.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $400K - $800K
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
                <li>• Multiple marinas and boat launches</li>
                <li>• Lewisville Lake Park</li>
                <li>• Railroad Park (historic depot)</li>
                <li>• 50+ parks and green spaces</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Shopping & Dining</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Vista Ridge Mall</li>
                <li>• Old Town Lewisville historic district</li>
                <li>• MCL Grand Theater</li>
                <li>• Diverse restaurant scene</li>
                <li>• Weekend farmers markets</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Transportation</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• DCTA A-train to Dallas</li>
                <li>• I-35E and SH-121 access</li>
                <li>• Local Connect bus service</li>
                <li>• DFW Airport proximity</li>
                <li>• Bike-friendly infrastructure</li>
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
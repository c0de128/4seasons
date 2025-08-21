import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO } from "@/components/SEO";
import { MapPin, Users, GraduationCap, Building, Car, Plane, School } from "lucide-react";

export default function SouthlakeCityGuide() {
  const seoConfig = {
    title: "Southlake, Texas Real Estate Guide | Luxury Homes for Sale | 4Seasons Real Estate",
    description: "Discover Southlake, Texas - premier luxury community with top-rated schools, upscale shopping at Southlake Town Square, and prestigious neighborhoods. Find your dream home with 4Seasons Real Estate.",
    keywords: "Southlake Texas real estate, Southlake luxury homes, Southlake Town Square, Carroll ISD, prestigious neighborhoods, upscale community, 4Seasons Real Estate",
    ogImage: "/images/cities/southlake-hero.jpg",
    canonicalUrl: "https://4seasonsrealestate.com/city-guides/southlake"
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
      <section className="pt-24 pb-16 bg-gradient-to-r from-emerald-900 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Southlake, Texas
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Premier luxury community with top-rated schools and upscale amenities
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Luxury Living</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Top Schools</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Town Square</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Prestigious</span>
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
              <div className="text-2xl font-bold text-slate-900">32,576</div>
              <div className="text-slate-600">Population</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">22 sq mi</div>
              <div className="text-slate-600">Total Area</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">$925,000</div>
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
                Welcome to Southlake
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  Southlake represents the pinnacle of luxury suburban living in North Texas, renowned for 
                  its exceptional schools, upscale shopping at Southlake Town Square, and prestigious 
                  neighborhoods. This master-planned community has earned national recognition for its 
                  quality of life and family-friendly environment.
                </p>
                <p>
                  With Carroll ISD consistently ranking among the nation's best school districts and 
                  median home values reflecting the community's exclusivity, Southlake attracts 
                  discerning families seeking the finest in suburban amenities and educational excellence.
                </p>
              </div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Choose Southlake?</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Carroll ISD - nationally recognized school district
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Southlake Town Square - premier shopping and dining
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Luxury homes and prestigious neighborhoods
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  DFW Airport accessibility for business travel
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Award-winning parks and recreational facilities
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
              Carroll ISD consistently ranks among the top school districts in Texas and the nation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Carroll ISD</h3>
              <p className="text-slate-600 mb-4">Nationally recognized district with exceptional academic performance and college readiness.</p>
              <div className="text-sm text-slate-500">
                Rating: 10/10 | Students: 8,000+
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Carroll Senior High</h3>
              <p className="text-slate-600 mb-4">Texas UIL state champions in academics and athletics with 99% college attendance rate.</p>
              <div className="text-sm text-slate-500">
                State Championship Athletics
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Advanced Programs</h3>
              <p className="text-slate-600 mb-4">Extensive AP courses, dual credit programs, and specialized STEM initiatives.</p>
              <div className="text-sm text-slate-500">
                National Merit Scholars
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
              Prestigious Neighborhoods
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Exclusive communities with luxury homes, golf courses, and premium amenities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Timarron</h3>
              <p className="text-slate-600 mb-4">Prestigious golf course community with luxury custom homes and country club amenities.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$1,250,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Clariden Ranch</h3>
              <p className="text-slate-600 mb-4">Gated community with estate homes, lake access, and exclusive amenities.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$1,850,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Southlake Estates</h3>
              <p className="text-slate-600 mb-4">Established luxury neighborhood with large lots and custom architectural homes.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$975,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Whites Chapel</h3>
              <p className="text-slate-600 mb-4">Family-oriented neighborhood near Town Square with excellent school access.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$825,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Carroll Meadows</h3>
              <p className="text-slate-600 mb-4">Premium neighborhood with newer construction and luxury finishes throughout.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$1,150,000</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Enclave at Southlake</h3>
              <p className="text-slate-600 mb-4">Exclusive gated community with resort-style amenities and luxury living.</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Median Price:</span>
                <span className="font-semibold">$1,485,000</span>
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
              Luxury amenities and world-class recreation in an exclusive community setting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Recreation & Entertainment</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Southlake Town Square - premier shopping and dining destination
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Multiple championship golf courses and country clubs
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Southlake Tennis Center and athletic facilities
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Bicentennial Park with trails and lake access
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Award-winning parks and recreational programs
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
                  State Highway 114 and Southlake Boulevard access
                </li>
                <li className="flex items-start">
                  <Car className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Easy access to Dallas and Fort Worth business districts
                </li>
                <li className="flex items-start">
                  <Building className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Premium location between major employment centers
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: '#0d0d33' }} />
                  Convenient access to regional business corridors
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
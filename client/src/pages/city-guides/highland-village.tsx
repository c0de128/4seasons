import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO } from "@/components/SEO";
import { MapPin, Users, GraduationCap, Building, School, ShoppingBag, Car } from "lucide-react";

export default function HighlandVillageCityGuide() {
  const seoConfig = {
    title: "Highland Village, Texas Real Estate Guide | Homes for Sale | 4Seasons Real Estate",
    description: "Discover Highland Village, Texas - upscale community with excellent schools, luxury shopping, and family amenities. Find your perfect home with 4Seasons Real Estate.",
    keywords: "Highland Village Texas real estate, Highland Village homes for sale, LISD, luxury community, The Shops Highland Village, 4Seasons Real Estate",
    ogImage: "/images/cities/highland-village-hero.jpg",
    canonicalUrl: "https://4seasonsrealestate.com/city-guides/highland-village"
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO config={seoConfig} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-purple-900 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Highland Village, Texas
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              An upscale community combining luxury living with small-town charm and convenience
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Upscale Living</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Top Schools</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Premium Shopping</span>
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
              <div className="text-2xl font-bold text-slate-900">16,500</div>
              <div className="text-slate-600">Population</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ShoppingBag className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">200+</div>
              <div className="text-slate-600">Retail Stores</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">$485K</div>
              <div className="text-slate-600">Median Home</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">22 mi</div>
              <div className="text-slate-600">to Downtown Dallas</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Highland Village */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Welcome to Highland Village
              </h2>
              <div className="prose prose-lg text-slate-700 space-y-4">
                <p>
                  Highland Village epitomizes upscale suburban living in North Texas, offering residents a perfect blend of luxury amenities, top-rated schools, and convenient access to the Dallas-Fort Worth metroplex. This well-planned community has become synonymous with quality of life and family-friendly living.
                </p>
                <p>
                  Home to The Shops at Highland Village, one of the region's premier outdoor shopping destinations, the city provides unparalleled retail and dining experiences right at residents' doorsteps. The community's commitment to maintaining its village atmosphere while offering metropolitan conveniences makes it highly sought after.
                </p>
                <p>
                  With excellent Lewisville ISD schools, beautiful parks, and DCTA transportation access, Highland Village continues to attract families seeking the finest in suburban living.
                </p>
              </div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Choose Highland Village?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Premier shopping at The Shops Highland Village</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Highly-rated Lewisville ISD schools</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">DCTA A-train connectivity to Dallas</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Beautiful parks and recreation facilities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Strong property values and resale market</span>
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Lewisville ISD Schools</h3>
              <p className="text-slate-600 mb-4">
                Highland Village students attend some of the district's highest-performing schools, including top elementary schools and feeding into acclaimed high schools.
              </p>
              <div className="text-sm text-slate-500">
                Rating: 9/10 • Recognized Schools • Exemplary Programs
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-10 h-10 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Academic Excellence</h3>
              <p className="text-slate-600 mb-4">
                Students have access to advanced academic programs, extensive extracurriculars, and preparation for top universities.
              </p>
              <div className="text-sm text-slate-500">
                High Test Scores • College Prep • Award-Winning Programs
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">The Hills of Highland Village</h3>
              <p className="text-slate-600 mb-4">
                Luxury homes with custom designs, larger lots, and stunning views. Close to The Shops and top schools.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $500K - $800K
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Countryside</h3>
              <p className="text-slate-600 mb-4">
                Established neighborhood with mature trees, traditional homes, and walking distance to amenities.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $400K - $600K
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Highland Meadows</h3>
              <p className="text-slate-600 mb-4">
                Family-friendly community with parks, trails, and convenient access to schools and shopping.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $450K - $650K
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
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Shopping & Dining</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• The Shops at Highland Village</li>
                <li>• 200+ retail stores and restaurants</li>
                <li>• Upscale dining options</li>
                <li>• Entertainment venues</li>
                <li>• Seasonal events and festivals</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Recreation</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Highland Village Parks</li>
                <li>• Unity Park with splash pad</li>
                <li>• Doubletree Ranch Park</li>
                <li>• Walking and biking trails</li>
                <li>• Youth and adult sports leagues</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Transportation</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• DCTA A-train Highland Village station</li>
                <li>• FM 2499 corridor access</li>
                <li>• Easy access to I-35E</li>
                <li>• DFW Airport proximity</li>
                <li>• Walkable community design</li>
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
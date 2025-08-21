import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO } from "@/components/SEO";
import { MapPin, Users, GraduationCap, Building, School, Waves, Home } from "lucide-react";

export default function LittleElmCityGuide() {
  const seoConfig = {
    title: "Little Elm, Texas Real Estate Guide | Homes for Sale | 4Seasons Real Estate",
    description: "Discover Little Elm, Texas - growing lakefront community with new developments, family amenities, and Lake Lewisville access. Find your perfect home with 4Seasons Real Estate.",
    keywords: "Little Elm Texas real estate, Little Elm homes for sale, Lake Lewisville, new construction, family community, 4Seasons Real Estate",
    ogImage: "/images/cities/little-elm-hero.jpg",
    canonicalUrl: "https://4seasonsrealestate.com/city-guides/little-elm"
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO config={seoConfig} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-teal-900 to-cyan-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Little Elm, Texas
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              A rapidly growing lakefront community where new opportunities meet family living
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Lakefront Living</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">New Construction</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Family Friendly</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Growing Community</span>
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
              <div className="text-2xl font-bold text-slate-900">55,000</div>
              <div className="text-slate-600">Population</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Home className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">Fast</div>
              <div className="text-slate-600">Growing</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">$425K</div>
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

      {/* About Little Elm */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Welcome to Little Elm
              </h2>
              <div className="prose prose-lg text-slate-700 space-y-4">
                <p>
                  Little Elm represents one of North Texas's most exciting growth stories, transforming from a small lakefront community into a thriving city while maintaining its natural beauty and family-friendly atmosphere. Located on the shores of Lake Lewisville, the city offers residents the unique combination of waterfront living and modern suburban conveniences.
                </p>
                <p>
                  With numerous new housing developments, excellent schools, and abundant recreational opportunities, Little Elm has become a destination for families seeking quality of life in a growing community. The city's strategic location provides easy access to major employment centers while offering a more affordable alternative to established markets.
                </p>
                <p>
                  As one of the fastest-growing cities in Texas, Little Elm continues to attract new residents with its promise of lakefront lifestyle, modern amenities, and strong community spirit.
                </p>
              </div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Choose Little Elm?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Direct access to Lake Lewisville recreation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Abundant new construction options</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Growing retail and dining scene</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Affordable housing compared to established areas</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Strong community events and festivals</span>
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Little Elm ISD</h3>
              <p className="text-slate-600 mb-4">
                Growing school district with new facilities and innovative programs. Little Elm High School and new elementary schools serve the expanding community with modern education.
              </p>
              <div className="text-sm text-slate-500">
                Rating: 8/10 • New Facilities • Growing Programs
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-10 h-10 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Modern Education</h3>
              <p className="text-slate-600 mb-4">
                State-of-the-art facilities with technology integration, STEM programs, and comprehensive extracurricular activities for growing student population.
              </p>
              <div className="text-sm text-slate-500">
                Technology Focus • STEM Programs • Modern Facilities
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Lakefront Village</h3>
              <p className="text-slate-600 mb-4">
                Waterfront homes with lake access, private docks, and stunning water views. Premium location for lake enthusiasts.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $500K - $900K
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Paloma Creek</h3>
              <p className="text-slate-600 mb-4">
                Master-planned community with resort amenities, golf course, and various home styles for all family sizes.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $350K - $600K
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Frisco Lakes</h3>
              <p className="text-slate-600 mb-4">
                New construction community with modern homes, family amenities, and convenient access to schools and shopping.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $400K - $650K
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
                <li>• Lake Lewisville access and marinas</li>
                <li>• Little Elm Beach and water sports</li>
                <li>• Multiple parks and playgrounds</li>
                <li>• Walking and biking trails</li>
                <li>• Community pools and amenities</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Shopping & Dining</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• The Lakefront development</li>
                <li>• Local restaurants and cafes</li>
                <li>• Community farmers markets</li>
                <li>• Growing retail corridor</li>
                <li>• Annual festivals and events</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Transportation</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• US 380 corridor access</li>
                <li>• FM 423 connectivity</li>
                <li>• Future Dallas North Tollway extension</li>
                <li>• Growing public transit options</li>
                <li>• Easy DFW Airport access</li>
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
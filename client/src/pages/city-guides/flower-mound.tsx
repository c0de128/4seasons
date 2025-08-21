import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO } from "@/components/SEO";
import { MapPin, Users, GraduationCap, Building, School, TreePine, ShoppingBag } from "lucide-react";

export default function FlowerMoundCityGuide() {
  const seoConfig = {
    title: "Flower Mound, Texas Real Estate Guide | Homes for Sale | 4Seasons Real Estate",
    description: "Discover Flower Mound, Texas - upscale family community with top schools, beautiful parks, and luxury neighborhoods. Find your perfect home with 4Seasons Real Estate.",
    keywords: "Flower Mound Texas real estate, Flower Mound homes for sale, LISD, luxury community, family friendly, 4Seasons Real Estate",
    ogImage: "/images/cities/flower-mound-hero.jpg",
    canonicalUrl: "https://4seasonsrealestate.com/city-guides/flower-mound"
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO config={seoConfig} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-green-900 to-emerald-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Flower Mound, Texas
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Where luxury living meets family values in one of Texas's most desirable communities
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Luxury Living</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Top Schools</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Master Planned</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Family Friendly</span>
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
              <div className="text-2xl font-bold text-slate-900">78,854</div>
              <div className="text-slate-600">Population</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TreePine className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">65%</div>
              <div className="text-slate-600">Green Space</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">$525K</div>
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

      {/* About Flower Mound */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Welcome to Flower Mound
              </h2>
              <div className="prose prose-lg text-slate-700 space-y-4">
                <p>
                  Flower Mound represents the pinnacle of suburban living in North Texas, combining luxury amenities with small-town charm. This master-planned community has earned national recognition for its commitment to preserving natural beauty while providing world-class amenities and services.
                </p>
                <p>
                  Named after a 12.5-acre Native American burial mound covered in wildflowers, the city has maintained its commitment to environmental stewardship while developing into one of the most sought-after addresses in the Dallas-Fort Worth metroplex.
                </p>
                <p>
                  With top-rated schools, abundant parks, upscale shopping, and easy access to major employment centers, Flower Mound offers the perfect environment for families seeking the very best in suburban living.
                </p>
              </div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Choose Flower Mound?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Consistently ranked among best places to live</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Excellent Lewisville ISD schools</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">65% dedicated green space and parks</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Upscale shopping and dining</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Strong property values and resale</span>
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
                Flower Mound students attend some of the highest-rated schools in Texas, including Marcus High School, Edward S. Marcus High School, and Flower Mound High School.
              </p>
              <div className="text-sm text-slate-500">
                Rating: 9/10 • Top 10% in Texas • Exemplary Rating
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-10 h-10 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Achievement Programs</h3>
              <p className="text-slate-600 mb-4">
                Advanced academics including International Baccalaureate programs, extensive AP offerings, and specialized STEM and arts academies.
              </p>
              <div className="text-sm text-slate-500">
                IB Programs • 30+ AP Courses • National Merit Recognition
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Wellington</h3>
              <p className="text-slate-600 mb-4">
                Luxury master-planned community with custom homes, private golf course, and resort-style amenities.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $600K - $1.5M+
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Bridlewood</h3>
              <p className="text-slate-600 mb-4">
                Established neighborhood with mature trees, larger lots, and convenient access to schools and shopping.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $400K - $700K
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Canyon Falls</h3>
              <p className="text-slate-600 mb-4">
                Newer master-planned community with resort amenities, trails, and modern home designs for active lifestyles.
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
                <li>• 65+ parks and green spaces</li>
                <li>• CAC (Community Activity Center)</li>
                <li>• Multiple golf courses</li>
                <li>• Lake Grapevine access</li>
                <li>• 70+ miles of trails</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Shopping & Dining</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• The Shops at Highland Village</li>
                <li>• Flower Mound Marketplace</li>
                <li>• River Walk at Central Market</li>
                <li>• Upscale dining options</li>
                <li>• Farmers markets and festivals</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Transportation</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• FM 2499 and I-35W access</li>
                <li>• SH-121 corridor proximity</li>
                <li>• DFW Airport 20 minutes</li>
                <li>• DCTA bus connections</li>
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
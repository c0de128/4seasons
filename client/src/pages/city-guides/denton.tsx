import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO } from "@/components/SEO";
import { MapPin, Users, GraduationCap, Building, Car, Plane, School } from "lucide-react";

export default function DentonCityGuide() {
  const seoConfig = {
    title: "Denton, Texas Real Estate Guide | Homes for Sale | 4Seasons Real Estate",
    description: "Discover Denton, Texas - the vibrant county seat with TWU, UNT, rich music culture, and thriving downtown. Find your perfect home with 4Seasons Real Estate's local expertise.",
    keywords: "Denton Texas real estate, Denton homes for sale, TWU, UNT, Denton Square, music scene, county seat, 4Seasons Real Estate",
    ogImage: "/images/cities/denton-hero.jpg",
    canonicalUrl: "https://4seasonsrealestate.com/city-guides/denton"
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO config={seoConfig} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-slate-900 to-slate-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Denton, Texas
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              The vibrant county seat where university life meets music culture and historic charm
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">County Seat</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">University Town</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Music Capital</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Historic Square</span>
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
              <div className="text-2xl font-bold text-slate-900">169,843</div>
              <div className="text-slate-600">Population</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">2</div>
              <div className="text-slate-600">Universities</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">$285K</div>
              <div className="text-slate-600">Median Home</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: '#0d0d33' }} />
              <div className="text-2xl font-bold text-slate-900">38 mi</div>
              <div className="text-slate-600">to Downtown Dallas</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Denton */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Welcome to Denton
              </h2>
              <div className="prose prose-lg text-slate-700 space-y-4">
                <p>
                  As the county seat of Denton County, Denton offers the perfect blend of small-town charm and university energy. Home to both the University of North Texas (UNT) and Texas Woman's University (TWU), this vibrant city has earned its reputation as the "Live Music Capital of North Texas."
                </p>
                <p>
                  The historic Denton Square serves as the heart of the community, featuring unique shops, restaurants, and entertainment venues in beautifully preserved 19th-century buildings. With a rich music heritage and thriving arts scene, Denton attracts creative professionals, young families, and retirees alike.
                </p>
                <p>
                  Located just 38 miles north of Dallas, Denton provides easy access to metropolitan amenities while maintaining its distinctive character and affordable cost of living.
                </p>
              </div>
            </div>
            <div className="bg-slate-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Why Choose Denton?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Two major universities creating vibrant culture</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Historic downtown square with unique character</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Renowned live music scene and festivals</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Affordable housing compared to Dallas suburbs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">Strong job market and economic growth</span>
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
                Serving most of Denton with highly-rated schools including Denton High School, Ryan High School, and Braswell High School. Known for strong academics and extracurricular programs.
              </p>
              <div className="text-sm text-slate-500">
                Rating: 8/10 • Students: 28,000+
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-10 h-10 mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Higher Education</h3>
              <p className="text-slate-600 mb-4">
                Home to University of North Texas (40,000+ students) and Texas Woman's University (15,000+ students), creating a vibrant college town atmosphere.
              </p>
              <div className="text-sm text-slate-500">
                UNT: Public Research University • TWU: Comprehensive University
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Historic Downtown</h3>
              <p className="text-slate-600 mb-4">
                Victorian homes and lofts around the courthouse square. Walking distance to restaurants, shops, and entertainment.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $200K - $400K
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Pecan Creek</h3>
              <p className="text-slate-600 mb-4">
                Master-planned community with family-friendly amenities, parks, and highly-rated schools.
              </p>
              <div className="text-sm text-slate-500">
                Price Range: $300K - $500K
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">North Lakes</h3>
              <p className="text-slate-600 mb-4">
                Newer development with larger lots, modern homes, and easy access to I-35E for Dallas commuters.
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
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Entertainment</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Historic Courthouse-on-the-Square</li>
                <li>• Arts & Jazz Festival</li>
                <li>• Multiple live music venues</li>
                <li>• Campus Theatre</li>
                <li>• First Friday events</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Recreation</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Lake Lewisville access</li>
                <li>• Denton Community Park</li>
                <li>• Quakertown Park</li>
                <li>• Multiple golf courses</li>
                <li>• Hiking and biking trails</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Transportation</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• DCTA A-train to Dallas</li>
                <li>• I-35E corridor access</li>
                <li>• Local bus system</li>
                <li>• Bike-friendly streets</li>
                <li>• Denton Enterprise Airport</li>
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { 
  MapPin,
  Users,
  GraduationCap,
  Home,
  Car,
  TreePine,
  Building2,
  Shield,
  TrendingUp,
  Clock,
  Star,
  Calendar,
  DollarSign,
  School,
  Hospital,
  ShoppingBag,
  Utensils,
  Music,
  ArrowRight,
  CheckCircle,
  Briefcase,
  Coffee,
  Train,
  Gamepad2,
  Heart,
  Crown,
  Landmark,
  Waves
} from "lucide-react";
import carrolltonHeroImage from "@/assets/images/carrollton.jpg";

export default function CarrolltonCityGuide() {
  const demographics = [
    { label: "Population", value: "133,434", description: "Growing suburban community" },
    { label: "Median Age", value: "36.8", description: "Young families and professionals" },
    { label: "Median Income", value: "$67,420", description: "Strong household earnings" },
    { label: "College Educated", value: "45.2%", description: "Well-educated residents" },
    { label: "Employment Rate", value: "95.4%", description: "Strong job market" },
    { label: "Growth Rate", value: "+8.5%", description: "Steady population growth" }
  ];

  const schoolDistricts = [
    {
      name: "Carrollton-Farmers Branch ISD",
      rating: "B+",
      description: "Large district serving Carrollton with diverse programs and strong community support",
      highlights: ["STEM academies", "Dual language programs", "Career pathways"]
    },
    {
      name: "Plano ISD",
      rating: "A+", 
      description: "Serves portions of Carrollton with nationally recognized academic excellence",
      highlights: ["Top national rankings", "Advanced placement", "Technology integration"]
    }
  ];

  const neighborhoods = [
    {
      name: "Indian Creek",
      priceRange: "$250K - $500K",
      description: "Established neighborhood with mature trees and community amenities near Indian Creek Golf Course",
      features: ["Golf course proximity", "Mature landscaping", "Community pool"]
    },
    {
      name: "Hebron 121 Station", 
      priceRange: "$300K - $650K",
      description: "Transit-oriented development with modern apartments and townhomes near DART station",
      features: ["DART rail access", "Mixed-use development", "Modern amenities"]
    },
    {
      name: "Downtown Carrollton",
      priceRange: "$200K - $450K", 
      description: "Historic downtown area with walkable streets, local businesses, and community events",
      features: ["Historic charm", "Walkable downtown", "Community events"]
    },
    {
      name: "Towngate",
      priceRange: "$180K - $400K",
      description: "Family-oriented neighborhood with parks, trails, and proximity to shopping centers",
      features: ["Family amenities", "Park access", "Shopping convenience"]
    }
  ];

  const amenities = [
    {
      category: "Parks & Recreation",
      icon: <TreePine className="w-6 h-6" />,
      items: [
        "Arbor Hills Nature Preserve - 200 acres of trails and nature",
        "A.W. Perry Homestead Museum and historic site",
        "Carrollton Athletic Center and aquatic complex",
        "30+ parks with playgrounds and sports facilities"
      ]
    },
    {
      category: "Shopping & Dining",
      icon: <ShoppingBag className="w-6 h-6" />,
      items: [
        "Shops at Willow Bend - Premier shopping destination",
        "Historic Downtown Square with local businesses",
        "International dining reflecting diverse community", 
        "Farmers markets and community events"
      ]
    },
    {
      category: "Arts & Entertainment",
      icon: <Music className="w-6 h-6" />,
      items: [
        "Plaza Arts Center - Community theater and arts programs",
        "Carrollton Center for the Arts - Visual arts and education",
        "Annual Festival at the Switchyard music festival",
        "Community concerts and outdoor events"
      ]
    },
    {
      category: "Transportation & Access",
      icon: <Train className="w-6 h-6" />,
      items: [
        "DART Green Line rail service",
        "Trinity Metro TEXRail connection to DFW Airport",
        "I-35E and President George Bush Turnpike access", 
        "Dallas Love Field Airport - 20 minutes"
      ]
    }
  ];

  const economicData = [
    { label: "Major Employers", value: "300+", description: "Diverse business base" },
    { label: "Job Growth", value: "+12.3%", description: "Strong economic expansion" },
    { label: "Unemployment", value: "3.2%", description: "Low unemployment rate" },
    { label: "Business Parks", value: "15+", description: "Commercial developments" }
  ];

  const communityFeatures = [
    {
      name: "Historic Character",
      description: "Rich history dating to 1878 with preserved downtown square and historic sites",
      features: ["Historic downtown", "Preserved architecture", "Heritage programs"]
    },
    {
      name: "Transportation Hub", 
      description: "Excellent connectivity with DART rail, major highways, and airport access",
      features: ["Rail transit", "Highway access", "Airport proximity"]
    },
    {
      name: "Family Community",
      description: "Strong focus on family amenities, quality schools, and neighborhood safety",
      features: ["Family programs", "Safe neighborhoods", "Youth activities"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 overflow-hidden">
        <img
          src={carrolltonHeroImage}
          alt="Carrollton, Texas diverse community featuring parks, shopping centers, and residential neighborhoods"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-slate-800/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Carrollton, Texas
              <span className="text-yellow-400 block">City Guide</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Where history meets progress. Discover Carrollton's perfect blend of 
              historic charm, modern amenities, excellent transportation, and 
              strong community spirit in the heart of North Texas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <Home className="w-5 h-5 mr-2" />
                View Carrollton Homes
              </Button>
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg font-semibold hover:bg-yellow-400 hover:text-slate-900 bg-transparent">
                Schedule Carrollton Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Welcome to Carrollton
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 mb-6">
                  Carrollton represents the perfect blend of historic charm and modern convenience, 
                  with roots dating back to 1878 and a vision firmly focused on the future. This 
                  thriving community of over 133,000 residents has successfully preserved its 
                  historic downtown square while embracing growth and development that serves 
                  today's families and professionals.
                </p>
                <p className="text-slate-700 mb-6">
                  The city's strategic location provides exceptional connectivity, with DART rail 
                  service linking residents directly to downtown Dallas and DFW Airport, major 
                  highways providing regional access, and a walkable downtown that encourages 
                  community interaction. This transportation advantage has attracted diverse 
                  businesses and residents seeking both opportunity and quality of life.
                </p>
                <p className="text-slate-700">
                  Carrollton's commitment to community is evident in its extensive park system, 
                  including the 200-acre Arbor Hills Nature Preserve, quality educational options, 
                  and year-round festivals and events that bring neighbors together. The city has 
                  earned recognition for its fiscal responsibility and high-quality municipal services.
                </p>
              </div>
            </div>
            
            {/* Carrollton at a Glance Sidebar */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Carrollton at a Glance</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Location</p>
                    <p className="text-sm text-slate-600">Dallas & Denton Counties</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Population</p>
                    <p className="text-sm text-slate-600">133,434 residents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Incorporated</p>
                    <p className="text-sm text-slate-600">1913 (Founded 1878)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Area</p>
                    <p className="text-sm text-slate-600">36.9 square miles</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Landmark className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Historic Downtown</p>
                    <p className="text-sm text-slate-600">Preserved town square</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Train className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Transit</p>
                    <p className="text-sm text-slate-600">DART Green Line service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demographics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Carrollton Demographics & Economy
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {demographics.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold text-primary">{stat.value}</CardTitle>
                  <CardDescription className="font-semibold text-slate-900">{stat.label}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-slate-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Economic Growth</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {economicData.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{item.value}</div>
                  <div className="font-semibold text-slate-900 mb-1">{item.label}</div>
                  <div className="text-sm text-slate-600">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Features Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Carrollton Advantage
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Carrollton's unique combination of historic character, modern transportation, 
              and community focus creates exceptional value for residents and businesses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {communityFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Star className="w-6 h-6 text-primary mr-2" />
                    {feature.name}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Educational Excellence
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Carrollton provides access to quality education through 
              multiple school districts serving diverse student populations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {schoolDistricts.map((district, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{district.name}</CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Rating: {district.rating}
                    </Badge>
                  </div>
                  <CardDescription>{district.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {district.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-600">
                        <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Carrollton Neighborhoods
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From historic downtown to modern developments, 
              Carrollton offers diverse housing options for every lifestyle and budget.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {neighborhoods.map((neighborhood, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{neighborhood.name}</CardTitle>
                    <Badge variant="outline" className="text-primary border-primary">
                      {neighborhood.priceRange}
                    </Badge>
                  </div>
                  <CardDescription>{neighborhood.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {neighborhood.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-600">
                        <Home className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Community Amenities
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Carrollton offers extensive parks, cultural venues, shopping destinations, 
              and excellent transportation connectivity for residents.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {amenities.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: '#0d0d33' }}>
                      <div className="text-white">
                        {category.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-start text-sm text-slate-600">
                        <ArrowRight className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Future Development Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Carrollton's Future
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Strategic planning and community investment ensure Carrollton continues 
              to balance historic preservation with modern growth and development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Smart Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Balanced development that preserves community character while 
                  meeting the needs of growing families and businesses.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Train className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Transportation Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Continued investment in transit connectivity and infrastructure 
                  improvements that support sustainable community growth.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Community Enhancement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Ongoing investment in parks, recreation, arts programs, and 
                  community events that strengthen neighborhood connections.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Discover Carrollton Living
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Experience the perfect blend of historic charm, modern convenience, and community spirit that makes Carrollton an exceptional place to call home in North Texas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
              <Home className="w-5 h-5 mr-2" />
              Search Carrollton Homes
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Tour
            </Button>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
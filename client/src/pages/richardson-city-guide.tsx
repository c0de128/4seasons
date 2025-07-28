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
  Zap
} from "lucide-react";
import richardsonHeroImage from "@/assets/images/richardson.jpg";

export default function RichardsonCityGuide() {
  const demographics = [
    { label: "Population", value: "119,469", description: "Diverse metropolitan community" },
    { label: "Median Age", value: "38.2", description: "Young professional families" },
    { label: "Median Income", value: "$74,590", description: "Strong household earnings" },
    { label: "College Educated", value: "62.3%", description: "Highly educated workforce" },
    { label: "Employment Rate", value: "96.1%", description: "Excellent employment" },
    { label: "Growth Rate", value: "+12%", description: "Steady population growth" }
  ];

  const schoolDistricts = [
    {
      name: "Richardson ISD",
      rating: "A",
      description: "Nationally recognized district serving Richardson with innovative programs and high academic standards",
      highlights: ["Blue Ribbon Schools", "STEM programs", "International Baccalaureate"]
    },
    {
      name: "Plano ISD",
      rating: "A+", 
      description: "Serves portions of Richardson with top-tier educational excellence and advanced programs",
      highlights: ["National recognition", "Advanced academics", "Technology integration"]
    }
  ];

  const neighborhoods = [
    {
      name: "Canyon Creek",
      priceRange: "$400K - $750K",
      description: "Established neighborhood with mature trees and family-friendly atmosphere",
      features: ["Mature landscaping", "Community amenities", "Excellent schools"]
    },
    {
      name: "Richland College Area", 
      priceRange: "$300K - $600K",
      description: "Diverse community near Richland College with educational opportunities",
      features: ["College proximity", "Diverse housing", "Educational resources"]
    },
    {
      name: "Cottonwood Creek",
      priceRange: "$350K - $650K", 
      description: "Well-maintained neighborhood with parks and recreational facilities",
      features: ["Park access", "Recreation centers", "Walking trails"]
    },
    {
      name: "Heights Park",
      priceRange: "$450K - $850K",
      description: "Upscale area with newer homes and modern amenities",
      features: ["Newer construction", "Modern amenities", "Prime location"]
    }
  ];

  const amenities = [
    {
      category: "Technology & Innovation",
      icon: <Zap className="w-6 h-6" />,
      items: [
        "Telecom Corridor - Major technology hub",
        "UT Dallas campus and research facilities",
        "Innovation and entrepreneurship centers",
        "High-tech corporate headquarters"
      ]
    },
    {
      category: "Shopping & Dining",
      icon: <ShoppingBag className="w-6 h-6" />,
      items: [
        "CityLine - Mixed-use development with retail and dining",
        "Richardson Square Mall and surrounding retail",
        "Diverse international restaurants and cuisines", 
        "Local businesses and specialty shops"
      ]
    },
    {
      category: "Arts & Culture",
      icon: <Music className="w-6 h-6" />,
      items: [
        "Eisemann Center for Performing Arts",
        "Richardson Symphony Orchestra",
        "Community art festivals and events",
        "Public art installations and galleries"
      ]
    },
    {
      category: "Transportation & Access",
      icon: <Train className="w-6 h-6" />,
      items: [
        "DART rail system with multiple stations",
        "US 75 (Central Expressway) corridor",
        "George Bush Turnpike access", 
        "DFW Airport - 30 minutes"
      ]
    }
  ];

  const economicData = [
    { label: "Major Employers", value: "850+", description: "Diverse business base" },
    { label: "Job Growth", value: "+18.5%", description: "Strong economic expansion" },
    { label: "Unemployment", value: "2.8%", description: "Low unemployment rate" },
    { label: "Tech Companies", value: "200+", description: "Technology sector strength" }
  ];

  const communityFeatures = [
    {
      name: "Technology Hub",
      description: "Home to the Telecom Corridor with major technology companies and innovation centers",
      features: ["Corporate headquarters", "Research facilities", "Startup ecosystem"]
    },
    {
      name: "Educational Excellence", 
      description: "Access to top-rated schools and University of Texas at Dallas campus",
      features: ["Quality education", "Higher education", "Research opportunities"]
    },
    {
      name: "Cultural Diversity",
      description: "Vibrant multicultural community with international businesses and restaurants",
      features: ["Cultural events", "International dining", "Diverse community"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${richardsonHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Richardson, Texas
              <span className="text-yellow-400 block">City Guide</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Where innovation meets community. Discover Richardson's dynamic blend of 
              technology leadership, educational excellence, cultural diversity, and 
              outstanding quality of life in the heart of North Texas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <Home className="w-5 h-5 mr-2" />
                View Richardson Homes
              </Button>
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg font-semibold hover:bg-yellow-400 hover:text-slate-900 bg-transparent">
                Schedule Richardson Tour
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
                Welcome to Richardson
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 mb-6">
                  Richardson stands as one of North Texas's most dynamic and innovative communities, 
                  home to nearly 120,000 residents and recognized globally as the heart of the 
                  Telecom Corridor. This thriving city has successfully balanced rapid technological 
                  growth with maintaining a strong sense of community and exceptional quality of life.
                </p>
                <p className="text-slate-700 mb-6">
                  The city's commitment to education is evident through Richardson ISD's national 
                  recognition and the presence of the University of Texas at Dallas campus. This 
                  educational foundation, combined with a diverse population representing over 60 
                  countries, creates a unique multicultural environment that enriches the community.
                </p>
                <p className="text-slate-700">
                  Richardson's strategic location, excellent transportation infrastructure, and 
                  business-friendly environment have attracted major corporations while maintaining 
                  attractive residential neighborhoods, outstanding parks and recreation facilities, 
                  and a vibrant arts and culture scene centered around the Eisemann Center.
                </p>
              </div>
            </div>
            
            {/* Richardson at a Glance Sidebar */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Richardson at a Glance</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Location</p>
                    <p className="text-sm text-slate-600">Dallas & Collin Counties</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Population</p>
                    <p className="text-sm text-slate-600">119,469 residents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Incorporated</p>
                    <p className="text-sm text-slate-600">1956</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Area</p>
                    <p className="text-sm text-slate-600">28.6 square miles</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Zap className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Industry</p>
                    <p className="text-sm text-slate-600">Technology & Telecom Corridor</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Train className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Transit</p>
                    <p className="text-sm text-slate-600">DART rail system access</p>
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
            Richardson Demographics & Economy
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
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Economic Strength</h3>
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
              The Richardson Advantage
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Richardson's unique combination of technology leadership, educational excellence, 
              and cultural diversity creates exceptional opportunities for residents.
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
              Richardson provides access to nationally recognized schools and 
              higher education institutions that prepare students for success.
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
              Richardson Neighborhoods
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From established communities with mature trees to newer developments 
              with modern amenities, Richardson offers diverse housing options.
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
              Richardson offers exceptional technology infrastructure, cultural venues, 
              recreation facilities, and transportation connectivity.
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
              Richardson's Future
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Continued innovation and strategic development ensure Richardson remains 
              North Texas's premier technology and education destination.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Innovation Ecosystem</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Expanding technology corridors and research partnerships that foster 
                  innovation and attract next-generation companies and talent.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Train className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Transportation Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Enhanced transit connectivity and infrastructure improvements 
                  supporting sustainable growth and regional accessibility.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Community Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Continued investment in parks, recreation, arts, and cultural 
                  programs that enhance quality of life for all residents.
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
            Discover Richardson Living
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Experience the perfect blend of innovation, education, and community that makes Richardson one of North Texas's most desirable places to call home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
              <Home className="w-5 h-5 mr-2" />
              Search Richardson Homes
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
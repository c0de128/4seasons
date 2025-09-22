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
  Plane
} from "lucide-react";
import addisonHeroImage from "@/assets/images/addison.png";

export default function AddisonCityGuide() {
  const demographics = [
    { label: "Population", value: "16,661", description: "Dynamic business community" },
    { label: "Median Age", value: "39.8", description: "Young professional workforce" },
    { label: "Median Income", value: "$78,950", description: "Above-average earnings" },
    { label: "College Educated", value: "58.4%", description: "Highly educated residents" },
    { label: "Employment Rate", value: "96.8%", description: "Strong employment" },
    { label: "Business Density", value: "2,400+", description: "Companies per square mile" }
  ];

  const schoolDistricts = [
    {
      name: "Dallas ISD",
      rating: "B+",
      description: "Serves portions of Addison with diverse educational programs and specialized schools",
      highlights: ["Magnet programs", "Career academies", "Advanced placement"]
    },
    {
      name: "Private Schools",
      rating: "Elite", 
      description: "Access to prestigious private institutions in the greater Dallas area",
      highlights: ["College preparatory", "Small class sizes", "Specialized programs"]
    }
  ];

  const neighborhoods = [
    {
      name: "Village on the Parkway",
      priceRange: "$350K - $750K",
      description: "Luxury apartments and condos with resort-style amenities",
      features: ["High-rise living", "Luxury amenities", "Urban convenience"]
    },
    {
      name: "Addison Circle", 
      priceRange: "$300K - $650K",
      description: "Mixed-use development with residential, office, and retail spaces",
      features: ["Walkable community", "Mixed-use design", "Transit access"]
    },
    {
      name: "Midway Corridor",
      priceRange: "$250K - $500K", 
      description: "Convenient location with easy access to major business districts",
      features: ["Central location", "Business proximity", "Transportation access"]
    },
    {
      name: "Belt Line Road Area",
      priceRange: "$200K - $450K",
      description: "Emerging residential area with new developments and amenities",
      features: ["New construction", "Growing community", "Modern amenities"]
    }
  ];

  const amenities = [
    {
      category: "Business & Commerce",
      icon: <Briefcase className="w-6 h-6" />,
      items: [
        "2,400+ businesses in 4.4 square miles",
        "Major corporate headquarters and regional offices",
        "Conference centers and business hotels",
        "Professional services and consulting firms"
      ]
    },
    {
      category: "Dining & Entertainment",
      icon: <Utensils className="w-6 h-6" />,
      items: [
        "170+ restaurants representing 40+ cuisines",
        "Addison Circle Park events and festivals", 
        "WinStar Casino entertainment venue",
        "Vibrant nightlife and entertainment districts"
      ]
    },
    {
      category: "Events & Festivals",
      icon: <Music className="w-6 h-6" />,
      items: [
        "Addison Kaboom Town - 4th of July celebration",
        "Oktoberfest - Annual German festival",
        "Taste Addison - Culinary festival",
        "Concert series and outdoor events"
      ]
    },
    {
      category: "Transportation & Access",
      icon: <Plane className="w-6 h-6" />,
      items: [
        "Addison Airport - Private and corporate aviation",
        "Dallas North Tollway and Belt Line Road access",
        "DART rail connectivity nearby", 
        "DFW Airport - 20 minutes"
      ]
    }
  ];

  const economicData = [
    { label: "Business Revenue", value: "$45B", description: "Annual economic impact" },
    { label: "Job Density", value: "87K", description: "Jobs in 4.4 square miles" },
    { label: "Unemployment", value: "2.1%", description: "Low unemployment rate" },
    { label: "Commercial Space", value: "28M", description: "Square feet of office space" }
  ];

  const communityFeatures = [
    {
      name: "Business Hub",
      description: "One of the densest business concentrations in North Texas with Fortune 500 companies",
      features: ["Corporate headquarters", "Business services", "Professional networking"]
    },
    {
      name: "Culinary Destination", 
      description: "Renowned dining scene with award-winning restaurants and diverse international cuisine",
      features: ["World-class dining", "Celebrity chefs", "Culinary events"]
    },
    {
      name: "Strategic Location",
      description: "Central Dallas location with excellent transportation access and connectivity",
      features: ["Highway access", "Airport proximity", "Transit connections"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 overflow-hidden">
        <img
          src={addisonHeroImage}
          alt="Addison, Texas modern cityscape with corporate centers and urban amenities"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-slate-800/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Addison, Texas
              <span className="text-yellow-400 block">City Guide</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Where business meets lifestyle. Discover Addison's dynamic blend of corporate 
              excellence, world-class dining, vibrant entertainment, and convenient urban living 
              in the heart of North Texas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <Home className="w-5 h-5 mr-2" />
                View Addison Homes
              </Button>
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg font-semibold hover:bg-yellow-400 hover:text-slate-900 bg-transparent">
                Schedule Addison Tour
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
                Welcome to Addison
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 mb-6">
                  Addison stands as North Texas's premier business destination, packing more than 
                  2,400 businesses into just 4.4 square miles. This dynamic city has earned 
                  recognition as one of the most business-dense communities in the region, hosting 
                  Fortune 500 companies, innovative startups, and everything in between.
                </p>
                <p className="text-slate-700 mb-6">
                  Beyond business, Addison has cultivated a reputation as a culinary and entertainment 
                  destination. With over 170 restaurants representing more than 40 cuisines, the city 
                  offers dining experiences that rival any major metropolitan area. The community's 
                  commitment to quality of life is evident in its festivals, events, and amenities.
                </p>
                <p className="text-slate-700">
                  Addison's strategic location provides unmatched connectivity, with major highways, 
                  its own airport, and proximity to DFW International Airport. This combination of 
                  business opportunity, lifestyle amenities, and transportation access makes Addison 
                  an exceptional place to live and work in North Texas.
                </p>
              </div>
            </div>
            
            {/* Addison at a Glance Sidebar */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Addison at a Glance</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Location</p>
                    <p className="text-sm text-slate-600">Dallas County</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Population</p>
                    <p className="text-sm text-slate-600">16,661 residents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Incorporated</p>
                    <p className="text-sm text-slate-600">1953</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Area</p>
                    <p className="text-sm text-slate-600">4.4 square miles</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Briefcase className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Businesses</p>
                    <p className="text-sm text-slate-600">2,400+ companies</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Plane className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Airport</p>
                    <p className="text-sm text-slate-600">Addison Airport</p>
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
            Addison Demographics & Economy
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
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Economic Impact</h3>
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
              The Addison Advantage
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Addison's unique combination of business density, culinary excellence, 
              and strategic location creates unparalleled opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {communityFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Crown className="w-6 h-6 text-primary mr-2" />
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
              Educational Opportunities
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Addison provides access to quality educational institutions and 
              professional development opportunities.
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
              Addison Living Options
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From luxury high-rises to convenient apartments, Addison offers 
              diverse residential options for urban professionals.
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
              Addison Amenities
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience unmatched business, dining, entertainment, and 
              transportation amenities in compact, walkable environments.
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
              Addison's Future
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Continued growth and development ensure Addison remains North Texas's 
              premier business and lifestyle destination.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Mixed-Use Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Continued expansion of mixed-use developments combining residential, 
                  office, retail, and entertainment in walkable environments.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Plane className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Transportation Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Enhanced transportation infrastructure and connectivity to support 
                  continued business growth and resident convenience.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Business Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Maintaining Addison's position as the region's premier business 
                  destination through strategic planning and continued investment.
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
            Experience Addison Living
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Discover why Addison is the perfect choice for professionals seeking the ultimate combination of business opportunity and lifestyle amenities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
              <Home className="w-5 h-5 mr-2" />
              Search Addison Homes
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
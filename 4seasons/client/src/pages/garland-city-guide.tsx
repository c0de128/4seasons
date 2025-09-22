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
  Palette
} from "lucide-react";
import garlandHeroImage from "@/assets/images/garland.jpg";

export default function GarlandCityGuide() {
  const demographics = [
    { label: "Population", value: "246,018", description: "Diverse metropolitan community" },
    { label: "Median Age", value: "35.4", description: "Young professional families" },
    { label: "Median Income", value: "$58,350", description: "Affordable family living" },
    { label: "College Educated", value: "31.2%", description: "Growing educated workforce" },
    { label: "Employment Rate", value: "94.8%", description: "Strong employment base" },
    { label: "Diversity Index", value: "0.82", description: "Highly diverse community" }
  ];

  const schoolDistricts = [
    {
      name: "Garland ISD",
      rating: "B+",
      description: "Large diverse district serving Garland with comprehensive programs and career preparation",
      highlights: ["Career academies", "Dual language programs", "Technology integration"]
    },
    {
      name: "Richardson ISD",
      rating: "A", 
      description: "Serves northern portions of Garland with nationally recognized excellence",
      highlights: ["Blue Ribbon Schools", "STEM programs", "International programs"]
    }
  ];

  const neighborhoods = [
    {
      name: "Firewheel",
      priceRange: "$200K - $450K",
      description: "Master-planned community with shopping, dining, and entertainment at Firewheel Town Center",
      features: ["Town center access", "Master-planned design", "Shopping convenience"]
    },
    {
      name: "Lake Highlands Area", 
      priceRange: "$180K - $400K",
      description: "Established neighborhoods near White Rock Lake with mature trees and parks",
      features: ["Lake proximity", "Mature neighborhoods", "Park access"]
    },
    {
      name: "Spring Park",
      priceRange: "$150K - $350K", 
      description: "Family-friendly area with good schools and recreational facilities",
      features: ["Family amenities", "School access", "Recreation centers"]
    },
    {
      name: "Downtown Garland",
      priceRange: "$120K - $300K",
      description: "Historic downtown area experiencing revitalization with new developments",
      features: ["Historic character", "Urban renewal", "Downtown amenities"]
    }
  ];

  const amenities = [
    {
      category: "Parks & Recreation",
      icon: <TreePine className="w-6 h-6" />,
      items: [
        "68 parks covering over 2,500 acres",
        "Audubon Recreation Center and aquatic facilities",
        "Garland Golf Course and driving range",
        "Extensive trail system and lake access"
      ]
    },
    {
      category: "Arts & Culture",
      icon: <Palette className="w-6 h-6" />,
      items: [
        "Plaza Theatre - Historic downtown performing arts venue",
        "Granville Arts Center - Visual and performing arts",
        "Garland Landmark Museum - Local history and heritage", 
        "Annual festivals and cultural events"
      ]
    },
    {
      category: "Shopping & Dining",
      icon: <ShoppingBag className="w-6 h-6" />,
      items: [
        "Firewheel Town Center - Premier shopping destination",
        "International dining reflecting diverse community",
        "Town Square Farmers Market", 
        "Local businesses and specialty retailers"
      ]
    },
    {
      category: "Transportation & Access",
      icon: <Train className="w-6 h-6" />,
      items: [
        "DART Blue Line rail service to downtown Dallas",
        "Multiple DART bus routes throughout city",
        "I-635 (LBJ Freeway) and I-30 highway access", 
        "DFW Airport - 45 minutes via rail"
      ]
    }
  ];

  const economicData = [
    { label: "Major Employers", value: "500+", description: "Diverse employment base" },
    { label: "Job Growth", value: "+8.2%", description: "Steady economic growth" },
    { label: "Unemployment", value: "4.1%", description: "Stable employment rate" },
    { label: "Business Growth", value: "+15%", description: "New business development" }
  ];

  const communityFeatures = [
    {
      name: "Cultural Diversity",
      description: "One of the most diverse cities in Texas with residents from over 60 countries",
      features: ["International community", "Cultural festivals", "Diverse dining options"]
    },
    {
      name: "Strategic Location", 
      description: "Central Dallas location with excellent transportation access and connectivity",
      features: ["DART rail access", "Highway connectivity", "Airport accessibility"]
    },
    {
      name: "Family-Friendly Community",
      description: "Strong focus on family amenities, parks, recreation, and quality schools",
      features: ["Extensive parks", "Recreation programs", "Youth activities"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${garlandHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Garland, Texas
              <span className="text-yellow-400 block">City Guide</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Where diversity thrives and opportunity grows. Discover Garland's vibrant 
              multicultural community, excellent connectivity, family-friendly amenities, 
              and affordable living in the heart of the Dallas metroplex.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <Home className="w-5 h-5 mr-2" />
                View Garland Homes
              </Button>
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg font-semibold hover:bg-yellow-400 hover:text-slate-900 bg-transparent">
                Schedule Garland Tour
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
                Welcome to Garland
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 mb-6">
                  Garland stands as one of the most diverse and dynamic cities in Texas, home to 
                  nearly 250,000 residents representing over 60 countries around the world. This 
                  vibrant multicultural community has created a unique atmosphere where different 
                  cultures blend together while maintaining their distinct identities and traditions.
                </p>
                <p className="text-slate-700 mb-6">
                  The city's strategic location in Dallas County provides excellent access to 
                  employment centers, educational institutions, and entertainment venues throughout 
                  the metroplex. With DART rail service connecting residents directly to downtown 
                  Dallas and DFW Airport, Garland offers both suburban comfort and urban connectivity.
                </p>
                <p className="text-slate-700">
                  Garland's commitment to family life is evident in its extensive park system, 
                  recreation programs, cultural amenities, and focus on education. From the historic 
                  Plaza Theatre to the modern Firewheel Town Center, the city offers something for 
                  every resident while maintaining an affordable cost of living.
                </p>
              </div>
            </div>
            
            {/* Garland at a Glance Sidebar */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Garland at a Glance</h3>
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
                    <p className="text-sm text-slate-600">246,018 residents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Incorporated</p>
                    <p className="text-sm text-slate-600">1891</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Area</p>
                    <p className="text-sm text-slate-600">57.1 square miles</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Palette className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Diversity</p>
                    <p className="text-sm text-slate-600">60+ countries represented</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Train className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Transit</p>
                    <p className="text-sm text-slate-600">DART Blue Line access</p>
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
            Garland Demographics & Economy
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
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Economic Development</h3>
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
              The Garland Advantage
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Garland's unique combination of cultural diversity, strategic location, 
              and family-friendly amenities creates exceptional value for residents.
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
              Garland provides access to quality education through multiple 
              school districts and educational programs for diverse student needs.
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
              Garland Neighborhoods
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From master-planned communities to historic neighborhoods, 
              Garland offers diverse and affordable housing options for families.
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
              Garland offers extensive parks, cultural venues, shopping destinations, 
              and transportation options that enhance quality of life.
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
              Garland's Future
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Strategic planning and community investment ensure Garland continues 
              to thrive as a diverse, connected, and family-friendly destination.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Economic Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Attracting new businesses and supporting existing ones through 
                  strategic development initiatives and business-friendly policies.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Train className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Transportation Enhancement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Improving transportation infrastructure and expanding public 
                  transit options to better connect residents across the region.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Community Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Continued investment in parks, recreation facilities, and cultural 
                  programs that strengthen community bonds and quality of life.
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
            Discover Garland Living
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Experience the vibrant diversity, strategic location, and family-friendly amenities that make Garland an exceptional place to call home in North Texas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
              <Home className="w-5 h-5 mr-2" />
              Search Garland Homes
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
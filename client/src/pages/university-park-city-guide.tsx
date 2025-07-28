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
  BookOpen,
  Award
} from "lucide-react";
import universityParkHeroImage from "@/assets/images/university-park.jpg";

export default function UniversityParkCityGuide() {
  const demographics = [
    { label: "Population", value: "25,278", description: "Distinguished residential community" },
    { label: "Median Age", value: "42.5", description: "Mature professional families" },
    { label: "Median Income", value: "$162,450", description: "High-income households" },
    { label: "College Educated", value: "84.1%", description: "Highly educated residents" },
    { label: "Employment Rate", value: "97.2%", description: "Professional employment" },
    { label: "Home Ownership", value: "78.4%", description: "Strong ownership community" }
  ];

  const schoolDistricts = [
    {
      name: "Highland Park ISD",
      rating: "A+",
      description: "Prestigious district serving University Park with exceptional academic standards and college preparation",
      highlights: ["Top 1% in Texas", "100% college acceptance", "National recognition"]
    },
    {
      name: "SMU Partnership",
      rating: "Elite", 
      description: "Unique educational opportunities through proximity to Southern Methodist University",
      highlights: ["University programs", "Research opportunities", "Cultural enrichment"]
    }
  ];

  const neighborhoods = [
    {
      name: "Snider Plaza Area",
      priceRange: "$800K - $2.5M",
      description: "Charming neighborhood surrounding the historic Snider Plaza shopping district",
      features: ["Historic charm", "Walkable shopping", "Traditional architecture"]
    },
    {
      name: "SMU Campus Area", 
      priceRange: "$700K - $2M",
      description: "Elegant homes near Southern Methodist University with academic atmosphere",
      features: ["University proximity", "Academic community", "Cultural access"]
    },
    {
      name: "Preston Center Vicinity",
      priceRange: "$600K - $1.8M", 
      description: "Modern living near Preston Center with shopping and dining convenience",
      features: ["Shopping access", "Dining options", "Urban convenience"]
    },
    {
      name: "Turtle Creek Corridor",
      priceRange: "$1M - $4M",
      description: "Upscale area with luxury homes and proximity to Turtle Creek amenities",
      features: ["Luxury living", "Creek access", "Prestigious location"]
    }
  ];

  const amenities = [
    {
      category: "Education & Culture",
      icon: <BookOpen className="w-6 h-6" />,
      items: [
        "Southern Methodist University - Premier private university",
        "George W. Bush Presidential Library and Museum",
        "Meadows Museum - Spanish art collection",
        "Academic lectures and cultural events"
      ]
    },
    {
      category: "Shopping & Dining",
      icon: <ShoppingBag className="w-6 h-6" />,
      items: [
        "Snider Plaza - Historic neighborhood shopping center",
        "Preston Center - Upscale shopping and dining", 
        "Local bistros and fine dining establishments",
        "Specialty boutiques and galleries"
      ]
    },
    {
      category: "Recreation & Parks",
      icon: <TreePine className="w-6 h-6" />,
      items: [
        "Hillcrest Park - Community recreation center",
        "Curtis Park - Neighborhood green space",
        "SMU campus recreation facilities",
        "Walking and jogging paths"
      ]
    },
    {
      category: "Transportation & Access",
      icon: <Car className="w-6 h-6" />,
      items: [
        "Central Dallas location - 8 minutes to downtown",
        "Highway 75 (Central Expressway) access",
        "DART rail proximity for regional transit", 
        "DFW Airport - 25 minutes"
      ]
    }
  ];

  const economicData = [
    { label: "Median Home Value", value: "$1.2M", description: "Strong real estate market" },
    { label: "Property Appreciation", value: "+95%", description: "10-year growth" },
    { label: "Business Revenue", value: "$1.2B", description: "Annual economic activity" },
    { label: "Tax Base", value: "Stable", description: "Strong municipal finances" }
  ];

  const communityFeatures = [
    {
      name: "Academic Excellence",
      description: "Surrounded by educational institutions creating an intellectually rich environment",
      features: ["SMU proximity", "Research opportunities", "Cultural programs"]
    },
    {
      name: "Historic Character", 
      description: "Preserving the community's historic charm while embracing modern amenities",
      features: ["Historic districts", "Architectural preservation", "Community heritage"]
    },
    {
      name: "Central Location",
      description: "Prime Dallas location providing easy access to business, culture, and recreation",
      features: ["Downtown access", "Cultural venues", "Business districts"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${universityParkHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              University Park, Texas
              <span className="text-yellow-400 block">City Guide</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Where academic excellence meets residential distinction. Discover University Park's 
              unique blend of intellectual atmosphere, historic neighborhoods, and central Dallas 
              convenience, all anchored by Southern Methodist University.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <Home className="w-5 h-5 mr-2" />
                View University Park Homes
              </Button>
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg font-semibold hover:bg-yellow-400 hover:text-slate-900 bg-transparent">
                Schedule University Park Tour
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
                Welcome to University Park
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 mb-6">
                  University Park stands as one of Dallas's most distinguished residential communities, 
                  an independent municipality completely surrounded by Dallas that has maintained its 
                  unique character since 1924. Home to Southern Methodist University and over 25,000 
                  residents, University Park combines academic excellence with residential sophistication.
                </p>
                <p className="text-slate-700 mb-6">
                  The community's tree-lined streets showcase beautiful examples of traditional and 
                  contemporary architecture, from charming Tudor Revival homes to elegant contemporary 
                  estates. The presence of SMU creates a vibrant intellectual atmosphere, with access 
                  to world-class cultural venues, educational programs, and research opportunities.
                </p>
                <p className="text-slate-700">
                  University Park's central location provides unmatched convenience, with downtown Dallas 
                  just minutes away and easy access to the region's major business centers, medical 
                  facilities, and cultural attractions. This perfect blend of academic environment, 
                  residential quality, and urban accessibility makes University Park one of North Texas's 
                  most desirable addresses.
                </p>
              </div>
            </div>
            
            {/* University Park at a Glance Sidebar */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">University Park at a Glance</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Location</p>
                    <p className="text-sm text-slate-600">Dallas County (Independent City)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Population</p>
                    <p className="text-sm text-slate-600">25,278 residents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Incorporated</p>
                    <p className="text-sm text-slate-600">1924</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Area</p>
                    <p className="text-sm text-slate-600">3.7 square miles</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <GraduationCap className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">University</p>
                    <p className="text-sm text-slate-600">Southern Methodist University</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Crown className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Character</p>
                    <p className="text-sm text-slate-600">Academic-residential community</p>
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
            University Park Demographics & Economy
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
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Real Estate Market</h3>
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
              The University Park Advantage
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              University Park's distinctive character combines academic excellence, 
              residential quality, and urban convenience in one exceptional community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {communityFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Award className="w-6 h-6 text-primary mr-2" />
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
              University Park provides access to premier educational institutions 
              from elementary through university levels.
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
              University Park Neighborhoods
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From historic neighborhoods near Snider Plaza to modern homes near 
              Preston Center, University Park offers diverse residential options.
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
              University Park offers exceptional access to educational, cultural, 
              recreational, and shopping amenities.
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

      {/* SMU Connection Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Southern Methodist University
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Living in University Park means being part of the SMU community, 
              with access to world-class education, culture, and athletics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Academic Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Access to continuing education, lectures, and research opportunities 
                  at one of the nation's premier private universities.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Music className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Cultural Venues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Meadows Museum, Owen Arts Center, and various performance venues 
                  offering world-class cultural programming year-round.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Gamepad2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Athletics & Recreation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  SMU Mustangs athletics, recreational facilities, and campus 
                  amenities available to the University Park community.
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
            Discover University Park Living
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Experience the unique blend of academic excellence, residential sophistication, and urban convenience that makes University Park extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
              <Home className="w-5 h-5 mr-2" />
              Search University Park Homes
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
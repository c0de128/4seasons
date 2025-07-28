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
  Award,
  Smile,
  Globe
} from "lucide-react";
import wylieHeroImage from "@/assets/images/wylie.png";

export default function WylieCityGuide() {
  const demographics = [
    { label: "Population", value: "54,490", description: "Thriving family community" },
    { label: "Median Age", value: "37.8", description: "Established family demographics" },
    { label: "Median Income", value: "$89,650", description: "Strong middle-class community" },
    { label: "College Educated", value: "48.9%", description: "Well-educated population" },
    { label: "Employment Rate", value: "95.8%", description: "Stable employment" },
    { label: "Growth Rate", value: "+85%", description: "Since 2010 - steady growth" }
  ];

  const schoolDistricts = [
    {
      name: "Wylie ISD",
      rating: "A",
      description: "Dedicated district serving Wylie with strong academic programs and community pride",
      highlights: ["Excellent academics", "Strong athletics", "Community involvement"]
    },
    {
      name: "Plano ISD",
      rating: "A+", 
      description: "Serves portions of Wylie with nationally recognized educational excellence",
      highlights: ["National recognition", "Advanced programs", "Technology integration"]
    }
  ];

  const neighborhoods = [
    {
      name: "Woodbridge",
      priceRange: "$350K - $650K",
      description: "Established neighborhood with mature trees and family-friendly atmosphere",
      features: ["Mature landscaping", "Neighborhood pools", "Family amenities"]
    },
    {
      name: "Waterstone Estates", 
      priceRange: "$450K - $750K",
      description: "Newer development with modern homes and contemporary design",
      features: ["Modern architecture", "Open floor plans", "Community amenities"]
    },
    {
      name: "The Shores",
      priceRange: "$400K - $800K", 
      description: "Lakefront community with water views and recreational opportunities",
      features: ["Lake access", "Boating facilities", "Waterfront living"]
    },
    {
      name: "Falcon Point",
      priceRange: "$300K - $550K",
      description: "Golf course community with scenic views and active lifestyle",
      features: ["Golf course access", "Clubhouse", "Active community"]
    }
  ];

  const amenities = [
    {
      category: "Recreation & Sports",
      icon: <Gamepad2 className="w-6 h-6" />,
      items: [
        "Wylie Recreation Center - Comprehensive fitness facility",
        "Lake Lavon - Boating, fishing, and water sports",
        "Wylie Municipal Golf Course - 18-hole championship course",
        "Multiple parks and sports complexes throughout the city"
      ]
    },
    {
      category: "Shopping & Dining",
      icon: <ShoppingBag className="w-6 h-6" />,
      items: [
        "Downtown Wylie - Historic shopping district",
        "Wylie Town Center - Modern retail and dining", 
        "Local restaurants and cafes along Brown Street",
        "Nearby Firewheel Town Center for major shopping"
      ]
    },
    {
      category: "Community & Culture",
      icon: <Music className="w-6 h-6" />,
      items: [
        "Wylie Arts Festival - Annual celebration of arts",
        "Bluegrass on Ballard - Popular music festival",
        "Historic Downtown events and farmers markets",
        "Community theater and cultural programs"
      ]
    },
    {
      category: "Transportation & Access",
      icon: <Car className="w-6 h-6" />,
      items: [
        "State Highway 78 corridor access",
        "George Bush Turnpike proximity",
        "DART bus service connections", 
        "DFW Airport - 40 minutes"
      ]
    }
  ];

  const economicData = [
    { label: "Major Employers", value: "120+", description: "Diverse business base" },
    { label: "Job Growth", value: "+22.8%", description: "Steady economic growth" },
    { label: "Unemployment", value: "2.4%", description: "Low unemployment rate" },
    { label: "Business Growth", value: "+65%", description: "New business development" }
  ];

  const communityFeatures = [
    {
      name: "Historic Character",
      description: "Preserving Wylie's rich history while embracing modern growth",
      features: ["Historic downtown", "Heritage preservation", "Community traditions"]
    },
    {
      name: "Lake Lifestyle", 
      description: "Access to Lake Lavon for year-round recreational opportunities",
      features: ["Water recreation", "Fishing and boating", "Scenic beauty"]
    },
    {
      name: "Family Focus",
      description: "Strong emphasis on family values and community connection",
      features: ["Youth programs", "Family events", "Safe neighborhoods"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${wylieHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Wylie, Texas
              <span className="text-yellow-400 block">City Guide</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Where community spirit meets modern living. Discover Wylie's perfect blend of 
              historic charm, family-friendly neighborhoods, and Lake Lavon recreation, all 
              within easy reach of Dallas-Fort Worth opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <Home className="w-5 h-5 mr-2" />
                View Wylie Homes
              </Button>
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg font-semibold hover:bg-yellow-400 hover:text-slate-900 bg-transparent">
                Schedule Wylie Tour
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
                Welcome to Wylie
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 mb-6">
                  Wylie represents the ideal of authentic Texas community living, where neighbors 
                  know each other by name and family values are cherished. With a population of 
                  over 54,000, Wylie has grown from a small railroad town into a thriving suburban 
                  community while maintaining its welcoming, small-town character.
                </p>
                <p className="text-slate-700 mb-6">
                  The city's proximity to Lake Lavon provides residents with exceptional recreational 
                  opportunities, from boating and fishing to waterfront living. Combined with quality 
                  schools, diverse housing options, and a historic downtown that hosts community 
                  events throughout the year, Wylie offers families an exceptional quality of life.
                </p>
                <p className="text-slate-700">
                  Whether you're drawn to established neighborhoods with mature trees, newer 
                  developments with modern amenities, or lakefront properties with water access, 
                  Wylie provides the perfect setting for families seeking authentic community 
                  connection in the heart of North Texas.
                </p>
              </div>
            </div>
            
            {/* Wylie at a Glance Sidebar */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Wylie at a Glance</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Location</p>
                    <p className="text-sm text-slate-600">Collin & Dallas Counties</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Population</p>
                    <p className="text-sm text-slate-600">54,490 residents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Incorporated</p>
                    <p className="text-sm text-slate-600">1887</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Area</p>
                    <p className="text-sm text-slate-600">36.2 square miles</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Lake Access</p>
                    <p className="text-sm text-slate-600">Lake Lavon recreation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Character</p>
                    <p className="text-sm text-slate-600">Community-focused living</p>
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
            Wylie Demographics & Economy
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
              The Wylie Difference
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Wylie's unique character comes from its strong sense of community, 
              rich history, and commitment to family-friendly living.
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
              Excellent Education
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Wylie students benefit from quality school districts that emphasize 
              academic excellence and community involvement.
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
              Wylie Neighborhoods
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From established neighborhoods with mature character to modern developments 
              and lakefront properties, Wylie offers diverse housing options for every lifestyle.
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
              Wylie offers excellent recreational, cultural, and lifestyle amenities 
              that bring the community together and enhance quality of life.
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
              Community Growth & Vision
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Wylie continues to balance growth with community character, ensuring 
              the city remains a desirable place for families for generations to come.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Smile className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Community Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Maintaining Wylie's family-friendly atmosphere and community spirit 
                  while welcoming new residents and businesses to the area.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Economic Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Strategic business development and infrastructure improvements 
                  that support both local employment and regional connectivity.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <TreePine className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Natural Preservation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Protecting Lake Lavon access and green spaces while promoting 
                  sustainable development that enhances community quality of life.
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
            Ready to Call Wylie Home?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Discover the community spirit and quality of life that makes Wylie one of North Texas's most beloved family destinations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
              <Home className="w-5 h-5 mr-2" />
              Search Wylie Homes
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
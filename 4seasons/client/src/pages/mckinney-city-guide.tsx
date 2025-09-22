import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
// import { OptimizedImage, imageOptimizations } from "@/components/ui/optimized-image"; // Removed for consistency
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
  Palette
} from "lucide-react";
import mckinneyHeroImage from "@/assets/images/hero-images/2278.jpg";

export default function McKinneyCityGuide() {
  const demographics = [
    { label: "Population", value: "199,177", description: "Historic charm meets modern growth" },
    { label: "Median Age", value: "37.2", description: "Established families and professionals" },
    { label: "Median Income", value: "$98,750", description: "Above-average household income" },
    { label: "College Educated", value: "52.8%", description: "Well-educated community" },
    { label: "Employment Rate", value: "96.8%", description: "Strong job market" },
    { label: "Historic Homes", value: "25%", description: "Rich architectural heritage" }
  ];

  const schoolDistricts = [
    {
      name: "McKinney ISD",
      rating: "A",
      description: "Comprehensive district serving 25,000+ students with excellent academics",
      highlights: ["High graduation rates", "Strong arts programs", "Technology integration"]
    },
    {
      name: "Frisco ISD",
      rating: "A+", 
      description: "Serves western McKinney areas with award-winning programs",
      highlights: ["National recognition", "State championship athletics", "Career centers"]
    },
    {
      name: "Prosper ISD",
      rating: "A+",
      description: "Serves northern McKinney with rapidly growing excellence",
      highlights: ["New facilities", "Small class sizes", "Community involvement"]
    }
  ];

  const neighborhoods = [
    {
      name: "Historic Downtown",
      priceRange: "$350K - $750K",
      description: "Charming historic homes near the celebrated town square",
      features: ["Walkable downtown", "Historic architecture", "Cultural events"]
    },
    {
      name: "Stonebridge Ranch", 
      priceRange: "$500K - $1.2M",
      description: "Master-planned community with golf course and resort amenities",
      features: ["TPC Craig Ranch", "Country club lifestyle", "Luxury amenities"]
    },
    {
      name: "Adriatica Village",
      priceRange: "$600K - $1.5M", 
      description: "Mediterranean-inspired waterfront community",
      features: ["Lakefront living", "European architecture", "Resort-style amenities"]
    },
    {
      name: "Craig Ranch",
      priceRange: "$400K - $900K",
      description: "Family-oriented community with parks and recreation",
      features: ["Top-rated schools", "Community pools", "Walking trails"]
    }
  ];

  const amenities = [
    {
      category: "Historic & Cultural",
      icon: <Palette className="w-6 h-6" />,
      items: [
        "Historic McKinney Town Square - Award-winning downtown",
        "McKinney Performing Arts Center",
        "Heard Natural Science Museum & Wildlife Sanctuary", 
        "Collin County History Museum"
      ]
    },
    {
      category: "Shopping & Dining",
      icon: <ShoppingBag className="w-6 h-6" />,
      items: [
        "Louisiana Street - Unique boutiques and restaurants",
        "Adriatica Village - Waterfront dining and shopping",
        "The Summit at Craig Ranch - Outdoor lifestyle center",
        "Historic downtown dining district"
      ]
    },
    {
      category: "Parks & Recreation",
      icon: <TreePine className="w-6 h-6" />,
      items: [
        "Bonnie Wenk Park - 62-acre family destination",
        "TPC Craig Ranch - PGA Tour golf course",
        "Towne Lake Recreation Area - Swimming and boating",
        "Erwin Park - Mountain biking and trails"
      ]
    },
    {
      category: "Transportation & Access",
      icon: <Car className="w-6 h-6" />,
      items: [
        "US Highway 75 (Central Expressway)",
        "State Highway 121 (Sam Rayburn Tollway)", 
        "Future DART Silver Line connection",
        "DFW Airport - 35 minutes"
      ]
    }
  ];

  const economicData = [
    { label: "Major Employers", value: "500+", description: "Diverse business community" },
    { label: "Job Growth", value: "+12.3%", description: "Steady economic expansion" },
    { label: "Unemployment", value: "2.8%", description: "Below state average" },
    { label: "Tourism Impact", value: "$180M", description: "Annual visitor spending" }
  ];

  const historicAttractions = [
    {
      name: "McKinney Town Square",
      description: "One of the most beautiful town squares in Texas",
      features: ["National Historic Register", "Year-round events", "Antique shopping"]
    },
    {
      name: "Chestnut Square Historic Village", 
      description: "Preserved 1800s pioneer village and museum",
      features: ["Historic buildings", "Educational programs", "Special events"]
    },
    {
      name: "Louisiana Street",
      description: "Historic main street with unique shops and dining",
      features: ["Boutique shopping", "Local restaurants", "Art galleries"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 overflow-hidden">
        <img
          src={mckinneyHeroImage}
          alt="McKinney, Texas - historic downtown charm with modern growth and family-friendly community"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-slate-800/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              McKinney, Texas
              <span className="text-yellow-400 block">City Guide</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Where historic charm meets modern living. Discover America's #1 Best Place to Live, 
              featuring the award-winning town square, exceptional schools, and vibrant community life 
              that perfectly balances heritage with progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <Home className="w-5 h-5 mr-2" />
                View McKinney Homes
              </Button>
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg font-semibold hover:bg-yellow-400 hover:text-slate-900 bg-transparent">
                Schedule McKinney Tour
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
                Welcome to McKinney
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 mb-6">
                  McKinney stands as a testament to thoughtful community planning, where historic 
                  preservation meets modern amenities. Named Money Magazine's #1 Best Place to Live 
                  in America, McKinney has mastered the art of maintaining small-town charm while 
                  embracing strategic growth and development.
                </p>
                <p className="text-slate-700 mb-6">
                  The city's crown jewel is its historic town square, consistently ranked among the 
                  most beautiful in Texas. Surrounded by antique shops, local restaurants, and 
                  community events, the square serves as the heart of a community that values both 
                  its heritage and its future.
                </p>
                <p className="text-slate-700">
                  From the luxury master-planned communities like Stonebridge Ranch to the charming 
                  historic neighborhoods near downtown, McKinney offers diverse living options backed 
                  by excellent schools, abundant parks, and a thriving local economy that attracts 
                  both families and businesses.
                </p>
              </div>
            </div>
            
            {/* McKinney at a Glance Sidebar */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">McKinney at a Glance</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Location</p>
                    <p className="text-sm text-slate-600">Collin County</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Population</p>
                    <p className="text-sm text-slate-600">199,177 residents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Founded</p>
                    <p className="text-sm text-slate-600">1849</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Area</p>
                    <p className="text-sm text-slate-600">62.9 square miles</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Star className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Recognition</p>
                    <p className="text-sm text-slate-600">#1 Best Place to Live</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Palette className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Historic Square</p>
                    <p className="text-sm text-slate-600">Award-winning town center</p>
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
            McKinney Demographics & Economy
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
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Economic Highlights</h3>
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

      {/* Historic Attractions Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Historic Charm & Culture
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              McKinney's rich history comes alive through its beautifully preserved downtown, 
              historic attractions, and vibrant cultural scene.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {historicAttractions.map((attraction, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Palette className="w-6 h-6 text-primary mr-2" />
                    {attraction.name}
                  </CardTitle>
                  <CardDescription>{attraction.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {attraction.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
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

      {/* Schools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Excellence in Education
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              McKinney students benefit from multiple high-performing school districts, 
              each offering unique strengths and opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
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
              McKinney Neighborhoods
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From historic downtown charm to luxury master-planned communities, 
              McKinney offers distinctive neighborhoods for every lifestyle.
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
              Lifestyle & Amenities
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              McKinney offers an exceptional quality of life with diverse recreational, 
              cultural, and shopping opportunities throughout the community.
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
              Looking Forward
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              McKinney continues to evolve thoughtfully, balancing growth with the preservation 
              of what makes the community special.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Train className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Transit Connectivity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Future DART Silver Line connectivity will enhance access to regional employment 
                  centers and recreational destinations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Community Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Continued investment in parks, cultural facilities, and community programs 
                  that enhance quality of life for all residents.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Smart Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Strategic development that preserves McKinney's historic character while 
                  accommodating growth and economic opportunity.
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
            Ready to Call McKinney Home?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Discover why McKinney continues to be recognized as one of America's best places to live and raise a family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
              <Home className="w-5 h-5 mr-2" />
              Search McKinney Homes
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
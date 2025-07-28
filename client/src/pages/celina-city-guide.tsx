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
  Wheat,
  Mountain,
  Sunrise
} from "lucide-react";
import celinaHeroImage from "@/assets/images/celina.webp";

export default function CelinaCityGuide() {
  const demographics = [
    { label: "Population", value: "18,547", description: "Charming small-town community" },
    { label: "Median Age", value: "36.2", description: "Family-oriented demographics" },
    { label: "Median Income", value: "$98,750", description: "Strong household income" },
    { label: "College Educated", value: "52.8%", description: "Well-educated residents" },
    { label: "Employment Rate", value: "96.2%", description: "Strong employment base" },
    { label: "Growth Rate", value: "+145%", description: "Since 2010 - rapid expansion" }
  ];

  const schoolDistricts = [
    {
      name: "Celina ISD",
      rating: "A",
      description: "Dedicated district serving Celina with personalized attention and small class sizes",
      highlights: ["Small class sizes", "Community involvement", "Agricultural programs"]
    },
    {
      name: "Prosper ISD",
      rating: "A+", 
      description: "Serves portions of Celina with award-winning educational excellence",
      highlights: ["Top-rated academics", "Championship athletics", "Advanced programs"]
    }
  ];

  const neighborhoods = [
    {
      name: "Mustang Lakes",
      priceRange: "$450K - $850K",
      description: "Master-planned community with lakes, trails, and family amenities",
      features: ["Community lakes", "Walking trails", "Family recreation center"]
    },
    {
      name: "Celina Farms", 
      priceRange: "$380K - $650K",
      description: "Rural estate living with large lots and country charm",
      features: ["1+ acre lots", "Horse property", "Country living"]
    },
    {
      name: "Lighthouse Bay",
      priceRange: "$500K - $950K", 
      description: "Waterfront community with luxury homes and lake access",
      features: ["Lake frontage", "Private marina", "Resort amenities"]
    },
    {
      name: "Downtown Celina",
      priceRange: "$300K - $550K",
      description: "Historic area with character homes and walkable streets",
      features: ["Historic charm", "Walkable downtown", "Community events"]
    }
  ];

  const amenities = [
    {
      category: "Recreation & Nature",
      icon: <Mountain className="w-6 h-6" />,
      items: [
        "Celina City Park - 95-acre recreational facility",
        "Celina Beach - Swimming beach and boat ramp",
        "Old Celina Park - Historic downtown green space",
        "Multiple fishing ponds and lake access points"
      ]
    },
    {
      category: "Shopping & Dining",
      icon: <ShoppingBag className="w-6 h-6" />,
      items: [
        "Downtown Celina Square - Local shops and cafes",
        "Celina Farmers Market - Fresh local produce", 
        "Historic main street restaurants",
        "Nearby Legacy West and Frisco shopping"
      ]
    },
    {
      category: "Community Events",
      icon: <Music className="w-6 h-6" />,
      items: [
        "Celina Cajun Festival - Annual celebration",
        "Christmas in the Square - Holiday festivities",
        "Friday Night Market - Weekly community gathering",
        "Outdoor concerts and festivals year-round"
      ]
    },
    {
      category: "Transportation & Access",
      icon: <Car className="w-6 h-6" />,
      items: [
        "US Highway 380 corridor access",
        "Preston Road connectivity",
        "Future DART Silver Line access", 
        "DFW Airport - 35 minutes"
      ]
    }
  ];

  const economicData = [
    { label: "Major Employers", value: "85+", description: "Growing business base" },
    { label: "Job Growth", value: "+28.4%", description: "Steady economic expansion" },
    { label: "Unemployment", value: "2.1%", description: "Low unemployment rate" },
    { label: "New Construction", value: "+85%", description: "Home building activity" }
  ];

  const communityFeatures = [
    {
      name: "Rural Heritage",
      description: "Preserving agricultural roots while embracing modern growth",
      features: ["Working farms", "Equestrian facilities", "Rural landscapes"]
    },
    {
      name: "Lake Living", 
      description: "Multiple lakes offering water recreation and scenic beauty",
      features: ["Fishing opportunities", "Boating access", "Waterfront homes"]
    },
    {
      name: "Small Town Feel",
      description: "Close-knit community with friendly neighbors and local charm",
      features: ["Community events", "Local businesses", "Historic downtown"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${celinaHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Celina, Texas
              <span className="text-yellow-400 block">City Guide</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Where country charm meets modern convenience. Discover Celina's unique blend of 
              rural heritage, lake living, and small-town community spirit, all while enjoying 
              easy access to North Texas opportunities and amenities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <Home className="w-5 h-5 mr-2" />
                View Celina Homes
              </Button>
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg font-semibold hover:bg-yellow-400 hover:text-slate-900 bg-transparent">
                Schedule Celina Tour
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
                Welcome to Celina
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 mb-6">
                  Celina embodies the perfect balance between rural tranquility and modern 
                  convenience. This charming North Texas community has grown thoughtfully from 
                  its agricultural roots, maintaining its small-town character while welcoming 
                  new families seeking a peaceful lifestyle with easy access to urban amenities.
                </p>
                <p className="text-slate-700 mb-6">
                  Nestled around beautiful lakes and rolling countryside, Celina offers residents 
                  a unique quality of life that's increasingly rare in the rapidly developing 
                  Dallas-Fort Worth metroplex. From waterfront living to equestrian properties, 
                  from historic downtown charm to modern master-planned communities, Celina 
                  provides diverse housing options in a genuinely friendly environment.
                </p>
                <p className="text-slate-700">
                  The city's commitment to preserving its heritage while planning for sustainable 
                  growth has created a community where neighbors still know each other, children 
                  can safely play in tree-lined neighborhoods, and the pace of life allows 
                  families to truly connect and thrive.
                </p>
              </div>
            </div>
            
            {/* Celina at a Glance Sidebar */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Celina at a Glance</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Location</p>
                    <p className="text-sm text-slate-600">Collin & Denton Counties</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Population</p>
                    <p className="text-sm text-slate-600">18,547 residents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Incorporated</p>
                    <p className="text-sm text-slate-600">1879</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Area</p>
                    <p className="text-sm text-slate-600">16.8 square miles</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mountain className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Character</p>
                    <p className="text-sm text-slate-600">Rural heritage & lakes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Growth Style</p>
                    <p className="text-sm text-slate-600">Thoughtful development</p>
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
            Celina Demographics & Economy
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
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Economic Stability</h3>
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
              What Makes Celina Special
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Celina's unique character comes from its perfect blend of rural heritage, 
              natural beauty, and genuine community spirit.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {communityFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Wheat className="w-6 h-6 text-primary mr-2" />
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
              Quality Education
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Celina students benefit from dedicated school districts that prioritize 
              personalized attention and community involvement in education.
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
              Celina Neighborhoods
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From lakefront luxury to rural estates, from historic downtown to modern 
              communities, Celina offers diverse living options in peaceful settings.
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
              Celina offers a wonderful array of recreational, cultural, and lifestyle 
              amenities that celebrate both its heritage and its future.
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
              Thoughtful Growth & Development
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Celina is committed to growing responsibly while preserving the character 
              and charm that makes it such a special place to call home.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <TreePine className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Heritage Preservation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Protecting Celina's agricultural heritage and rural character while 
                  accommodating thoughtful residential and commercial development.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Train className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Future Connectivity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Planning for enhanced transportation options including potential 
                  transit connections to regional employment and entertainment centers.
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
                  Maintaining Celina's small-town feel and close-knit community spirit 
                  through careful planning and resident-focused development decisions.
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
            Ready to Discover Celina Living?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Experience the perfect blend of rural tranquility and modern convenience in one of North Texas's most charming communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
              <Home className="w-5 h-5 mr-2" />
              Search Celina Homes
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
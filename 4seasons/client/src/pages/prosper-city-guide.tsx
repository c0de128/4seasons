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
  Sprout,
  Zap
} from "lucide-react";
import prosperHeroImage from "@/assets/images/prosper.webp";

export default function ProsperCityGuide() {
  const demographics = [
    { label: "Population", value: "32,877", description: "Rapidly growing family community" },
    { label: "Median Age", value: "34.5", description: "Young professional families" },
    { label: "Median Income", value: "$142,850", description: "Highest in North Texas region" },
    { label: "College Educated", value: "71.4%", description: "Highly educated residents" },
    { label: "Employment Rate", value: "97.8%", description: "Exceptional job market" },
    { label: "Growth Rate", value: "+285%", description: "Since 2010 - fastest growing" }
  ];

  const schoolDistricts = [
    {
      name: "Prosper ISD",
      rating: "A+",
      description: "Award-winning district with 28 schools serving 28,000+ students",
      highlights: ["Top 1% in Texas", "National Blue Ribbon Schools", "99% graduation rate"]
    },
    {
      name: "Frisco ISD",
      rating: "A+", 
      description: "Serves southern Prosper areas with exceptional programs",
      highlights: ["State championships", "Career & technical centers", "Innovation focus"]
    }
  ];

  const neighborhoods = [
    {
      name: "Windsong Ranch",
      priceRange: "$600K - $1.8M",
      description: "Master-planned community with luxury amenities and resort lifestyle",
      features: ["Crystal Lagoon", "Golf course", "Resort-style pools"]
    },
    {
      name: "Whitley Place", 
      priceRange: "$500K - $1.2M",
      description: "Premium community with custom homes and executive estates",
      features: ["Large lots", "Custom builders", "Mature landscaping"]
    },
    {
      name: "Light Farms",
      priceRange: "$450K - $950K", 
      description: "Family-oriented community with parks and nature preserves",
      features: ["Community gardens", "Hiking trails", "Family recreation"]
    },
    {
      name: "Lakewood at Brookshire",
      priceRange: "$550K - $1.4M",
      description: "Lakefront living with luxury homes and water activities",
      features: ["Private lake", "Boat docks", "Waterfront lots"]
    }
  ];

  const amenities = [
    {
      category: "Recreation & Entertainment",
      icon: <Sprout className="w-6 h-6" />,
      items: [
        "Windsong Ranch Crystal Lagoon - 5-acre swimming lagoon",
        "PGA Frisco Golf Course - Championship course",
        "Frontier Park - Sports complex and community center",
        "Multiple community pools and fitness centers"
      ]
    },
    {
      category: "Shopping & Dining",
      icon: <ShoppingBag className="w-6 h-6" />,
      items: [
        "Gate Way Plaza - Local shopping and dining",
        "The Star (nearby) - Major retail destination", 
        "Legacy West (adjacent) - Luxury shopping center",
        "Downtown Prosper - Historic main street charm"
      ]
    },
    {
      category: "Parks & Nature",
      icon: <TreePine className="w-6 h-6" />,
      items: [
        "Prosper Community Park - 58-acre recreational facility",
        "Old Town Park - Historic downtown green space",
        "Gentle Creek Park - Nature trails and pond",
        "Multiple neighborhood parks and playgrounds"
      ]
    },
    {
      category: "Transportation & Access",
      icon: <Car className="w-6 h-6" />,
      items: [
        "Future DART Silver Line station",
        "US Highway 380 corridor",
        "Dallas North Tollway access", 
        "DFW Airport - 30 minutes"
      ]
    }
  ];

  const economicData = [
    { label: "Major Employers", value: "150+", description: "Growing business district" },
    { label: "Job Growth", value: "+35.2%", description: "Leading regional growth" },
    { label: "Unemployment", value: "1.8%", description: "Lowest in metroplex" },
    { label: "Business Growth", value: "+125%", description: "New establishments annually" }
  ];

  const communityFeatures = [
    {
      name: "Crystal Lagoon",
      description: "5-acre crystal-clear swimming lagoon at Windsong Ranch",
      features: ["Beach entry", "Water sports", "Year-round swimming"]
    },
    {
      name: "Historic Downtown", 
      description: "Charming main street with local businesses and community events",
      features: ["Local restaurants", "Boutique shopping", "Community festivals"]
    },
    {
      name: "Nature Preserves",
      description: "Protected green spaces and walking trails throughout the city",
      features: ["Wildlife viewing", "Nature education", "Family recreation"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 overflow-hidden">
        <img
          src={prosperHeroImage}
          alt="Prosper, Texas luxury community featuring the Crystal Lagoon and modern residential development"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-slate-800/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Prosper, Texas
              <span className="text-yellow-400 block">City Guide</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Where small-town charm meets luxury living. Discover Texas's fastest-growing community, 
              featuring world-class amenities, top-rated schools, and the stunning Crystal Lagoon 
              that makes Prosper a truly unique place to call home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <Home className="w-5 h-5 mr-2" />
                View Prosper Homes
              </Button>
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg font-semibold hover:bg-yellow-400 hover:text-slate-900 bg-transparent">
                Schedule Prosper Tour
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
                Welcome to Prosper
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 mb-6">
                  Prosper represents the perfect synthesis of small-town Texas values and modern luxury 
                  living. With a population that has grown by over 285% since 2010, Prosper has become 
                  the most sought-after community in North Texas while maintaining its authentic charm 
                  and close-knit community feel.
                </p>
                <p className="text-slate-700 mb-6">
                  The city's crown jewel is the Crystal Lagoon at Windsong Ranch - a 5-acre crystal-clear 
                  swimming lagoon that brings a tropical resort experience to North Texas. Combined with 
                  championship golf courses, top-rated schools, and master-planned communities featuring 
                  luxury amenities, Prosper offers an unparalleled lifestyle.
                </p>
                <p className="text-slate-700">
                  From historic downtown charm to cutting-edge community amenities, from the highest 
                  median income in the region to some of the best schools in Texas, Prosper continues 
                  to attract families seeking the very best in suburban living while remaining true 
                  to its agricultural heritage and community spirit.
                </p>
              </div>
            </div>
            
            {/* Prosper at a Glance Sidebar */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Prosper at a Glance</h3>
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
                    <p className="text-sm text-slate-600">32,877 residents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Incorporated</p>
                    <p className="text-sm text-slate-600">1914</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Area</p>
                    <p className="text-sm text-slate-600">27.2 square miles</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Sprout className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Crystal Lagoon</p>
                    <p className="text-sm text-slate-600">5-acre swimming lagoon</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Growth Rate</p>
                    <p className="text-sm text-slate-600">Fastest in North Texas</p>
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
            Prosper Demographics & Economy
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
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Economic Excellence</h3>
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
              Unique Community Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Prosper offers one-of-a-kind amenities and attractions that set it apart 
              from every other community in North Texas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {communityFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Sprout className="w-6 h-6 text-primary mr-2" />
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
              Outstanding Education
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Prosper students benefit from two of Texas's highest-performing school districts, 
              both offering exceptional academic and extracurricular opportunities.
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
              Prosper Neighborhoods
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From luxury master-planned communities with resort amenities to executive estates 
              with custom homes, Prosper offers premium living options for discerning families.
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
              Resort-Style Amenities
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Prosper offers an exceptional array of recreational, shopping, and lifestyle 
              amenities that create a true resort community atmosphere.
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
              Continued Innovation & Growth
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Prosper continues to lead North Texas in thoughtful development and 
              innovative community planning for sustainable growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Train className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Transit Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Planned DART Silver Line connectivity will provide seamless access to 
                  regional employment centers and entertainment destinations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Smart Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Investment in smart city technology and sustainable infrastructure 
                  ensuring Prosper remains at the forefront of community innovation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Balanced Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Careful planning ensures future growth maintains Prosper's unique character 
                  while providing new opportunities for residents and businesses.
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
            Ready to Experience Prosper Living?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Discover why Prosper continues to be North Texas's most desirable community for families seeking luxury, amenities, and small-town charm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
              <Home className="w-5 h-5 mr-2" />
              Search Prosper Homes
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
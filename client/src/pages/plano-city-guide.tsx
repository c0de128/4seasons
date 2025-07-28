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
  Plane
} from "lucide-react";
import planoHeroImage from "@/assets/images/plano.jpg";

export default function PlanoCityGuide() {
  const demographics = [
    { label: "Population", value: "285,494", description: "Third largest city in Collin County" },
    { label: "Median Age", value: "38.2", description: "Young professional community" },
    { label: "Median Income", value: "$94,168", description: "Well above Texas average" },
    { label: "College Educated", value: "62.4%", description: "Highly educated workforce" },
    { label: "Employment Rate", value: "96.8%", description: "Strong job market" },
    { label: "Homeownership", value: "71.2%", description: "Stable residential community" }
  ];

  const schoolDistricts = [
    {
      name: "Plano ISD",
      rating: "A+",
      description: "Nationally recognized district with 75 schools serving 55,000+ students",
      highlights: ["Top 10% in Texas", "National Blue Ribbon Schools", "Advanced STEM programs"]
    },
    {
      name: "Frisco ISD",
      rating: "A+", 
      description: "Award-winning district serving northern Plano areas",
      highlights: ["Fastest growing district", "State-of-the-art facilities", "Career and Technical Education"]
    }
  ];

  const neighborhoods = [
    {
      name: "West Plano",
      priceRange: "$450K - $800K",
      description: "Established area with mature trees and top-rated schools",
      features: ["Legacy West nearby", "Excellent schools", "Shopping centers"]
    },
    {
      name: "East Plano", 
      priceRange: "$350K - $650K",
      description: "Family-friendly communities with parks and recreation",
      features: ["Oak Point Park", "Historic downtown", "Community centers"]
    },
    {
      name: "Central Plano",
      priceRange: "$400K - $750K", 
      description: "Mix of established and new developments",
      features: ["The Shops at Legacy", "Corporate corridor", "Dining districts"]
    },
    {
      name: "North Plano",
      priceRange: "$500K - $1.2M",
      description: "Newer luxury developments and master-planned communities",
      features: ["Willow Bend area", "Golf courses", "Premium shopping"]
    }
  ];

  const amenities = [
    {
      category: "Shopping & Dining",
      icon: <ShoppingBag className="w-6 h-6" />,
      items: [
        "Legacy West - Mixed-use development",
        "The Shops at Legacy - Outdoor lifestyle center", 
        "Willow Bend Mall - Regional shopping destination",
        "Historic Downtown Plano - Local boutiques and restaurants"
      ]
    },
    {
      category: "Recreation & Parks",
      icon: <TreePine className="w-6 h-6" />,
      items: [
        "Oak Point Park & Nature Preserve - 800 acres",
        "Arbor Hills Nature Preserve - Hiking trails",
        "Bob Woodruff Park - Lake activities",
        "Plano Centre - Sports complex"
      ]
    },
    {
      category: "Transportation",
      icon: <Car className="w-6 h-6" />,
      items: [
        "DART Red Line - Direct to downtown Dallas",
        "Dallas North Tollway access",
        "President George Bush Turnpike", 
        "DFW Airport - 30 minutes"
      ]
    },
    {
      category: "Healthcare",
      icon: <Hospital className="w-6 h-6" />,
      items: [
        "Texas Health Presbyterian Hospital Plano",
        "Children's Medical Center Plano",
        "Baylor Scott & White - The Heart Hospital",
        "Multiple urgent care facilities"
      ]
    }
  ];

  const economicData = [
    { label: "Major Employers", value: "1,200+", description: "Companies headquartered in Plano" },
    { label: "Job Growth", value: "+12.3%", description: "Above national average" },
    { label: "Unemployment", value: "2.8%", description: "Well below state average" },
    { label: "Fortune 500", value: "9", description: "Companies with headquarters" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${planoHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Plano, Texas
              <span className="text-yellow-400 block">City Guide</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Experience the perfect blend of corporate excellence and family living in Plano. 
              Home to major corporations, top-rated schools, and vibrant communities, 
              Plano offers unmatched quality of life in North Texas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <Home className="w-5 h-5 mr-2" />
                View Plano Homes
              </Button>
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg font-semibold hover:bg-yellow-400 hover:text-slate-900 bg-transparent">
                Schedule Plano Tour
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
                Welcome to Plano
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 mb-6">
                  Plano stands as one of North Texas's premier destinations, consistently ranking among the 
                  best places to live in America. This thriving city of nearly 300,000 residents has earned 
                  its reputation through exceptional schools, robust economic opportunities, and an 
                  unparalleled quality of life.
                </p>
                <p className="text-slate-700 mb-6">
                  Known as the "City of Excellence," Plano is home to numerous Fortune 500 companies including 
                  Toyota North America, Liberty Mutual, and J.C. Penney. The city's strategic location, 
                  world-class amenities, and commitment to innovation make it a magnet for professionals 
                  and families seeking the ultimate suburban lifestyle.
                </p>
                <p className="text-slate-700">
                  From the bustling Legacy West development to the tranquil trails of Oak Point Park, 
                  Plano offers something for everyone. Whether you're drawn by career opportunities, 
                  educational excellence, or simply the Texas-sized hospitality, Plano welcomes you home.
                </p>
              </div>
            </div>
            
            {/* Plano at a Glance Sidebar */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Plano at a Glance</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Location</p>
                    <p className="text-sm text-slate-600">Collin County, North Texas</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Population</p>
                    <p className="text-sm text-slate-600">285,494 residents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Incorporated</p>
                    <p className="text-sm text-slate-600">1873</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Area</p>
                    <p className="text-sm text-slate-600">71.6 square miles</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Briefcase className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Economy</p>
                    <p className="text-sm text-slate-600">Corporate headquarters hub</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Train className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Transit</p>
                    <p className="text-sm text-slate-600">DART Red Line access</p>
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
            Plano Demographics & Economy
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

      {/* Schools Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              World-Class Education
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Plano is served by two of Texas's top-rated school districts, ensuring every 
              student has access to exceptional educational opportunities.
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
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Plano Neighborhoods
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From established family neighborhoods to modern luxury developments, 
              Plano offers diverse communities to match every lifestyle and budget.
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
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Lifestyle & Amenities
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Plano offers world-class amenities that enhance every aspect of daily life, 
              from recreation and dining to healthcare and transportation.
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Future Growth & Development
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Plano continues to evolve with strategic investments in infrastructure, 
              technology, and community development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Legacy West Expansion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Continued development of the mixed-use Legacy West district with new 
                  corporate headquarters, luxury residences, and retail destinations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Train className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Transportation Improvements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Enhanced DART services and roadway improvements to support continued 
                  growth and improve connectivity throughout the region.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <TreePine className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Parks & Recreation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Ongoing investment in parks, trails, and recreational facilities to 
                  maintain Plano's reputation for exceptional quality of life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to Call Plano Home?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Discover why Plano continues to be one of America's best places to live, work, and raise a family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
              <Home className="w-5 h-5 mr-2" />
              Search Plano Homes
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Consultation
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
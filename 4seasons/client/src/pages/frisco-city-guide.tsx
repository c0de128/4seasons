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
  Trophy
} from "lucide-react";
import friscoHeroImage from "@/assets/images/frisco.webp";

export default function FriscoCityGuide() {
  const demographics = [
    { label: "Population", value: "200,490", description: "Fastest-growing city in Collin County" },
    { label: "Median Age", value: "35.8", description: "Young families and professionals" },
    { label: "Median Income", value: "$115,345", description: "Highest in North Texas" },
    { label: "College Educated", value: "69.2%", description: "Highly educated workforce" },
    { label: "Employment Rate", value: "97.2%", description: "Excellent job market" },
    { label: "New Construction", value: "35%", description: "Modern homes and developments" }
  ];

  const schoolDistricts = [
    {
      name: "Frisco ISD",
      rating: "A+",
      description: "Award-winning district with 75+ schools serving 65,000+ students",
      highlights: ["Top 1% in Texas", "State Championship Athletics", "Career and Technical Education Centers"]
    },
    {
      name: "Plano ISD",
      rating: "A+", 
      description: "Serves eastern Frisco areas with excellent academic programs",
      highlights: ["National recognition", "Advanced STEM programs", "Fine arts excellence"]
    }
  ];

  const neighborhoods = [
    {
      name: "West Frisco",
      priceRange: "$550K - $1.2M",
      description: "Luxury master-planned communities with resort-style amenities",
      features: ["The Star district", "Golf course communities", "Premium shopping"]
    },
    {
      name: "East Frisco", 
      priceRange: "$400K - $800K",
      description: "Established neighborhoods with mature trees and excellent schools",
      features: ["Historic downtown", "Community parks", "Family recreation"]
    },
    {
      name: "Central Frisco",
      priceRange: "$500K - $950K", 
      description: "Mixed developments with new construction and established areas",
      features: ["Stonebriar Centre", "Corporate corridor", "Entertainment venues"]
    },
    {
      name: "North Frisco",
      priceRange: "$600K - $1.5M",
      description: "Newest luxury developments and master-planned communities",
      features: ["PGA headquarters", "Premium amenities", "Future rail access"]
    }
  ];

  const amenities = [
    {
      category: "Sports & Entertainment",
      icon: <Trophy className="w-6 h-6" />,
      items: [
        "The Star (Dallas Cowboys World Headquarters)",
        "Dr Pepper Ballpark (Frisco RoughRiders)",
        "Toyota Stadium (FC Dallas)",
        "Comerica Center (Dallas Stars practice facility)"
      ]
    },
    {
      category: "Shopping & Dining",
      icon: <ShoppingBag className="w-6 h-6" />,
      items: [
        "Stonebriar Centre - Premier shopping destination",
        "The Star District - Mixed-use development", 
        "Frisco Square - Entertainment and dining",
        "Legacy West (nearby) - Luxury shopping"
      ]
    },
    {
      category: "Parks & Recreation",
      icon: <TreePine className="w-6 h-6" />,
      items: [
        "Frisco Commons Park - 63-acre community space",
        "Warren Sports Complex - Youth athletics",
        "Frisco Athletic Center - Fitness and aquatics",
        "Multiple golf courses and country clubs"
      ]
    },
    {
      category: "Transportation & Access",
      icon: <Car className="w-6 h-6" />,
      items: [
        "Future DART Silver Line station",
        "Dallas North Tollway corridor",
        "Sam Rayburn Tollway (SH 121)",
        "DFW Airport - 25 minutes"
      ]
    }
  ];

  const economicData = [
    { label: "Major Employers", value: "850+", description: "Corporate headquarters and offices" },
    { label: "Job Growth", value: "+18.5%", description: "Leading DFW metroplex" },
    { label: "Unemployment", value: "2.1%", description: "Lowest in region" },
    { label: "New Businesses", value: "200+", description: "Annual business additions" }
  ];

  const sportsVenues = [
    {
      name: "The Star",
      description: "Dallas Cowboys World Headquarters and practice facility",
      features: ["Public tours available", "Shopping and dining", "Corporate events"]
    },
    {
      name: "Toyota Stadium", 
      description: "Home of FC Dallas Major League Soccer",
      features: ["17,000 seat capacity", "Youth soccer programs", "Community events"]
    },
    {
      name: "Dr Pepper Ballpark",
      description: "Home of Frisco RoughRiders (Texas Rangers Double-A affiliate)", 
      features: ["Lazy river beyond outfield", "Family entertainment", "Corporate suites"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${friscoHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Frisco, Texas
              <span className="text-yellow-400 block">City Guide</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Discover America's fastest-growing city where sports, technology, and family life converge. 
              From The Star to championship schools and master-planned communities, 
              Frisco represents the pinnacle of modern suburban living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <Home className="w-5 h-5 mr-2" />
                View Frisco Homes
              </Button>
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg font-semibold hover:bg-yellow-400 hover:text-slate-900 bg-transparent">
                Schedule Frisco Tour
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
                Welcome to Frisco
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 mb-6">
                  Frisco stands as the crown jewel of North Texas growth, transforming from a small railroad 
                  town into one of America's most dynamic cities. With a population that has exploded from 
                  33,000 in 2000 to over 200,000 today, Frisco represents the perfect fusion of rapid 
                  development and thoughtful planning.
                </p>
                <p className="text-slate-700 mb-6">
                  Known worldwide as the home of The Star - the Dallas Cowboys' spectacular headquarters - 
                  Frisco has become synonymous with excellence in sports, education, and quality of life. 
                  The city boasts the highest median income in North Texas, top-rated schools, and a 
                  business-friendly environment that attracts major corporations and entrepreneurs alike.
                </p>
                <p className="text-slate-700">
                  From luxury master-planned communities to championship sports venues, from cutting-edge 
                  technology companies to world-class recreational facilities, Frisco offers an unmatched 
                  lifestyle for families and professionals seeking the very best.
                </p>
              </div>
            </div>
            
            {/* Frisco at a Glance Sidebar */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Frisco at a Glance</h3>
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
                    <p className="text-sm text-slate-600">200,490 residents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Incorporated</p>
                    <p className="text-sm text-slate-600">1902</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Area</p>
                    <p className="text-sm text-slate-600">71.1 square miles</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Trophy className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Sports City</p>
                    <p className="text-sm text-slate-600">Home to Cowboys, FC Dallas</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Growth Rate</p>
                    <p className="text-sm text-slate-600">Fastest-growing in Texas</p>
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
            Frisco Demographics & Economy
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

      {/* Sports & Entertainment Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Sports Capital of Texas
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Frisco is home to more professional sports teams and venues than any other suburb in America, 
              creating an unparalleled entertainment and lifestyle destination.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {sportsVenues.map((venue, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Trophy className="w-6 h-6 text-primary mr-2" />
                    {venue.name}
                  </CardTitle>
                  <CardDescription>{venue.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {venue.features.map((feature, idx) => (
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
              Championship Education
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Frisco students consistently rank among the highest achievers in Texas, supported by 
              innovative programs and state-of-the-art facilities.
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
              Frisco Neighborhoods
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From luxury master-planned communities to family-friendly neighborhoods, 
              Frisco offers premium living options across all price ranges.
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
              World-Class Amenities
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Frisco offers unmatched lifestyle amenities that enhance every aspect of daily life, 
              from entertainment and shopping to recreation and transportation.
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
              Continued Excellence & Growth
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Frisco's commitment to innovation and growth ensures the city will remain 
              North Texas's premier destination for decades to come.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Train className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>DART Silver Line</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Future rail connection providing direct access to DFW Airport and downtown Dallas, 
                  further enhancing Frisco's connectivity and appeal.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Corporate Expansion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Continued attraction of major corporations and headquarters, including PGA of America, 
                  creating thousands of high-paying jobs and economic growth.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <TreePine className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Master Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Thoughtful development of remaining land with focus on sustainability, 
                  quality of life, and preserving what makes Frisco special.
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
            Ready to Experience Frisco Living?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Discover why Frisco continues to be America's fastest-growing city and the #1 choice for families seeking excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
              <Home className="w-5 h-5 mr-2" />
              Search Frisco Homes
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
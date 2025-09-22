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
import highlandParkHeroImage from "@/assets/images/highland-park.jpg";

export default function HighlandParkCityGuide() {
  const demographics = [
    { label: "Population", value: "8,564", description: "Exclusive residential enclave" },
    { label: "Median Age", value: "45.2", description: "Established professional families" },
    { label: "Median Income", value: "$247,500", description: "One of the highest in Texas" },
    { label: "College Educated", value: "89.2%", description: "Exceptionally educated residents" },
    { label: "Employment Rate", value: "98.5%", description: "Professional employment" },
    { label: "Home Ownership", value: "92.8%", description: "High ownership rates" }
  ];

  const schoolDistricts = [
    {
      name: "Highland Park ISD",
      rating: "A+",
      description: "Prestigious district serving Highland Park and University Park with exceptional academic standards",
      highlights: ["Top 1% in Texas", "National Blue Ribbon Schools", "100% college acceptance"]
    },
    {
      name: "Private Schools",
      rating: "Elite", 
      description: "Access to premier private institutions including prestigious prep schools",
      highlights: ["Elite preparatory schools", "International programs", "College placement"]
    }
  ];

  const neighborhoods = [
    {
      name: "Old Highland Park",
      priceRange: "$2M - $8M",
      description: "Historic area with stately mansions and tree-lined boulevards",
      features: ["Historic mansions", "Mature oak trees", "Prestigious addresses"]
    },
    {
      name: "Lakeside", 
      priceRange: "$1.5M - $4M",
      description: "Elegant homes near Lakeside Park with traditional architecture",
      features: ["Traditional estates", "Park proximity", "Established neighborhood"]
    },
    {
      name: "Hackberry Creek",
      priceRange: "$3M - $12M", 
      description: "Ultra-luxury estates on large lots with custom architecture",
      features: ["Custom estates", "Large lots", "Architectural significance"]
    },
    {
      name: "Armstrong Parkway",
      priceRange: "$2.5M - $6M",
      description: "Prime residential corridor with stunning examples of period architecture",
      features: ["Architectural landmarks", "Prime location", "Historic significance"]
    }
  ];

  const amenities = [
    {
      category: "Shopping & Dining",
      icon: <Crown className="w-6 h-6" />,
      items: [
        "Highland Park Village - America's first shopping center",
        "Luxury boutiques including Chanel, Hermès, and Dior",
        "Fine dining establishments and gourmet cafes",
        "Exclusive member clubs and private venues"
      ]
    },
    {
      category: "Parks & Recreation",
      icon: <TreePine className="w-6 h-6" />,
      items: [
        "Lakeside Park - Historic park with mature trees",
        "Prather Park - Community gathering space", 
        "Country clubs and private recreational facilities",
        "Walking and jogging paths throughout the city"
      ]
    },
    {
      category: "Cultural & Arts",
      icon: <Palette className="w-6 h-6" />,
      items: [
        "Close proximity to Dallas Arts District",
        "Highland Park Society events and galas",
        "Private art collections and galleries",
        "Cultural institutions and museums nearby"
      ]
    },
    {
      category: "Transportation & Access",
      icon: <Car className="w-6 h-6" />,
      items: [
        "Central Dallas location - 5 minutes to downtown",
        "Easy access to major business districts",
        "Love Field Airport - 15 minutes", 
        "DFW Airport - 30 minutes"
      ]
    }
  ];

  const economicData = [
    { label: "Median Home Value", value: "$3.2M", description: "Luxury real estate market" },
    { label: "Property Appreciation", value: "+185%", description: "10-year appreciation" },
    { label: "Business Revenue", value: "$2.8B", description: "Annual commercial activity" },
    { label: "Tax Base", value: "Premium", description: "Strong municipal finances" }
  ];

  const communityFeatures = [
    {
      name: "Historic Prestige",
      description: "One of Texas's most prestigious addresses with rich history and tradition",
      features: ["Established 1913", "Historic landmarks", "Architectural heritage"]
    },
    {
      name: "Luxury Living", 
      description: "Unparalleled luxury lifestyle with world-class amenities and services",
      features: ["Concierge services", "Private security", "Exclusive venues"]
    },
    {
      name: "Prime Location",
      description: "Central Dallas location providing immediate access to business and cultural centers",
      features: ["Downtown proximity", "Business district access", "Cultural venues"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${highlandParkHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Highland Park, Texas
              <span className="text-yellow-400 block">City Guide</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Where prestige meets perfection. Discover Highland Park's unmatched luxury, 
              historic elegance, and prime Dallas location. Home to iconic Highland Park Village 
              and some of the most exclusive real estate in Texas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <Home className="w-5 h-5 mr-2" />
                View Highland Park Homes
              </Button>
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg font-semibold hover:bg-yellow-400 hover:text-slate-900 bg-transparent">
                Schedule Private Tour
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
                Welcome to Highland Park
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 mb-6">
                  Highland Park stands as one of America's most prestigious residential enclaves, 
                  an independent municipality completely surrounded by Dallas that has maintained 
                  its exclusive character since 1913. This 2.2-square-mile community represents 
                  the pinnacle of luxury living, combining historic elegance with modern sophistication.
                </p>
                <p className="text-slate-700 mb-6">
                  Home to Highland Park Village—America's first planned shopping center—the community 
                  offers unparalleled access to luxury retail, fine dining, and cultural amenities. 
                  The tree-lined streets showcase stunning examples of architectural styles from 
                  Colonial Revival to Mediterranean, many designed by renowned architects.
                </p>
                <p className="text-slate-700">
                  Highland Park's strategic location provides residents with the ultimate convenience: 
                  a peaceful, secure residential environment just minutes from downtown Dallas's 
                  business districts, world-class medical facilities, and cultural institutions. 
                  This unique combination of prestige, privacy, and accessibility makes Highland Park 
                  one of the most sought-after addresses in Texas.
                </p>
              </div>
            </div>
            
            {/* Highland Park at a Glance Sidebar */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Highland Park at a Glance</h3>
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
                    <p className="text-sm text-slate-600">8,564 residents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Incorporated</p>
                    <p className="text-sm text-slate-600">1913</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Area</p>
                    <p className="text-sm text-slate-600">2.2 square miles</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Crown className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Character</p>
                    <p className="text-sm text-slate-600">Luxury residential enclave</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">Security</p>
                    <p className="text-sm text-slate-600">24/7 police protection</p>
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
            Highland Park Demographics & Market
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
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Luxury Real Estate Market</h3>
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
              Highland Park Excellence
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Highland Park's unmatched combination of prestige, location, and luxury 
              creates an extraordinary living experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {communityFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Landmark className="w-6 h-6 text-primary mr-2" />
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
              Elite Education
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Highland Park offers access to some of the nation's finest educational institutions, 
              both public and private.
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
              Prestigious Neighborhoods
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Each Highland Park neighborhood offers its own character while maintaining 
              the community's standards of excellence and architectural beauty.
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
              Highland Park provides unparalleled access to luxury shopping, fine dining, 
              cultural venues, and recreational facilities.
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

      {/* Future Vision Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Preserving Excellence
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Highland Park continues to maintain its position as one of America's premier 
              residential communities through careful stewardship and strategic planning.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Landmark className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Historic Preservation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Protecting Highland Park's architectural heritage and historic character 
                  while allowing for thoughtful improvements and modernization.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Security Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Maintaining the highest standards of public safety and security 
                  through advanced technology and dedicated police services.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Luxury Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Upholding the exceptional standards that make Highland Park 
                  one of the most prestigious addresses in the United States.
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
            Experience Highland Park Living
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Discover why Highland Park remains the premier choice for discerning individuals seeking the ultimate in luxury, prestige, and convenience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
              <Home className="w-5 h-5 mr-2" />
              Search Highland Park Homes
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Private Showing
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
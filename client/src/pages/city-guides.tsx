import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { 
  MapPin,
  Search,
  TrendingUp,
  Users,
  GraduationCap,
  Home,
  Car,
  TreePine,
  Building2,
  Shield,
  ChevronRight,
  Star,
  ArrowRight
} from "lucide-react";

export default function CityGuides() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");

  const counties = [
    {
      name: "Collin County",
      communities: ["Allen", "Plano", "Frisco", "McKinney", "Prosper", "Celina", "Wylie"]
    },
    {
      name: "Dallas County", 
      communities: ["Highland Park", "University Park", "Addison", "Richardson", "Garland", "Carrollton"]
    },
    {
      name: "Denton County",
      communities: ["Flower Mound", "Lewisville", "Coppell", "The Colony", "Little Elm"]
    },
    {
      name: "Tarrant County",
      communities: ["Grapevine", "Southlake", "Keller", "Trophy Club", "Westlake"]
    }
  ];

  const featuredCommunities = [
    {
      name: "Allen",
      county: "Collin County",
      description: "Family-friendly community known for excellent schools and the Allen Event Center",
      medianPrice: "$485,000",
      schoolRating: "9/10",
      population: "105,000",
      image: "city-skyline"
    },
    {
      name: "Plano", 
      county: "Collin County",
      description: "Corporate hub with top-rated schools and diverse housing options",
      medianPrice: "$525,000",
      schoolRating: "9/10", 
      population: "285,000",
      image: "modern-homes"
    },
    {
      name: "Frisco",
      county: "Collin County", 
      description: "Fast-growing city with sports venues, shopping, and new developments",
      medianPrice: "$565,000",
      schoolRating: "9/10",
      population: "210,000", 
      image: "family-neighborhood"
    },
    {
      name: "Highland Park",
      county: "Dallas County",
      description: "Prestigious community with luxury homes and proximity to downtown Dallas",
      medianPrice: "$1,450,000",
      schoolRating: "10/10",
      population: "9,000",
      image: "luxury-homes"
    },
    {
      name: "Southlake",
      county: "Tarrant County",
      description: "Affluent community known for Carroll ISD and upscale shopping",
      medianPrice: "$825,000", 
      schoolRating: "10/10",
      population: "31,000",
      image: "upscale-community"
    },
    {
      name: "Flower Mound",
      county: "Denton County",
      description: "Master-planned community with lakes, parks, and family amenities",
      medianPrice: "$485,000",
      schoolRating: "8/10", 
      population: "78,000",
      image: "lakeside-homes"
    }
  ];

  const marketInsights = [
    {
      metric: "7.6M+",
      label: "DFW Population", 
      description: "4th largest metro area in US"
    },
    {
      metric: "$512B",
      label: "Economic Impact",
      description: "Gross metropolitan product"
    },
    {
      metric: "232",
      label: "Sunny Days",
      description: "Annual sunshine days"
    },
    {
      metric: "9,000+",
      label: "Square Miles", 
      description: "Across 12 counties"
    }
  ];

  const filteredCommunities = featuredCommunities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCounty = !selectedCounty || selectedCounty === "all" || community.county === selectedCounty;
    return matchesSearch && matchesCounty;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Discover North Texas
              <span className="text-primary block">Communities</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Your comprehensive guide to the Dallas-Fort Worth metroplex neighborhoods. 
              Explore diverse communities across 12 counties, from urban sophistication to suburban comfort.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search neighborhood guides (e.g., 'Allen', 'Plano', 'Highland Park')"
                  className="pl-12 pr-4 py-4 text-lg border-2 border-slate-200 focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DFW Overview */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                The Dallas-Fort Worth Metroplex
              </h2>
              <div className="prose prose-lg text-slate-600 mb-8">
                <p>
                  The Dallas-Fort Worth metroplex stands as the fourth-largest metropolitan area in the United States, 
                  encompassing over 9,000 square miles across 12 counties and home to more than 7.6 million residents. 
                  This dynamic region represents one of the nation's most diverse and economically robust markets.
                </p>
                <p>
                  From the cosmopolitan energy of downtown Dallas and Fort Worth to the family-oriented communities 
                  of Plano, Allen, Frisco, and McKinney, the region provides exceptional options for every lifestyle and budget.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {marketInsights.map((insight, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{insight.metric}</div>
                    <div className="font-semibold text-slate-900 mb-1">{insight.label}</div>
                    <div className="text-sm text-slate-600">{insight.description}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Key DFW Highlights</h3>
              <div className="space-y-4">
                {[
                  { icon: Users, text: "One of the most ethnically diverse metropolitan areas in America" },
                  { icon: TrendingUp, text: "Consistently ranks among top 5 U.S. metro areas for job growth" },
                  { icon: Car, text: "Two major international airports (DFW & Love Field)" },
                  { icon: GraduationCap, text: "Home to world-class universities and top-rated school districts" },
                  { icon: TreePine, text: "Mild winters, warm summers with exceptional outdoor recreation" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <item.icon className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* County Navigation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Explore by County
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Browse communities organized by county to find the perfect neighborhood for your lifestyle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {counties.map((county, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-900">{county.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {county.communities.slice(0, 4).map((community, communityIndex) => (
                      <div key={communityIndex} className="flex items-center justify-between">
                        <span className="text-slate-700">{community}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                    {county.communities.length > 4 && (
                      <div className="text-sm text-slate-500 font-medium">
                        +{county.communities.length - 4} more
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Select value={selectedCounty} onValueChange={setSelectedCounty}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Filter by County" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Counties</SelectItem>
                {counties.map((county) => (
                  <SelectItem key={county.name} value={county.name}>{county.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={() => { setSearchTerm(""); setSelectedCounty("all"); }}
              className="w-full sm:w-auto"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Communities */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured Communities
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover the most sought-after neighborhoods in North Texas with detailed insights and market data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCommunities.map((community, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
                <CardContent className="p-0">
                  {/* Community Image Placeholder */}
                  <div className="h-48 bg-gradient-to-r from-slate-200 to-slate-300 flex items-center justify-center">
                    <div className="text-center">
                      <Building2 className="w-12 h-12 text-slate-500 mx-auto mb-2" />
                      <div className="text-slate-600 font-medium">{community.name}</div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-1">{community.name}</h3>
                        <p className="text-sm text-slate-500">{community.county}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{community.schoolRating}</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">{community.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide">Median Price</div>
                        <div className="font-semibold text-slate-900">{community.medianPrice}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide">Population</div>
                        <div className="font-semibold text-slate-900">{community.population}</div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full text-white hover:opacity-90" 
                      style={{ backgroundColor: '#0d0d33' }}
                      onClick={() => {
                        if (community.name === "Allen") {
                          window.location.href = "/allen-city-guide";
                        } else if (community.name === "Plano") {
                          window.location.href = "/plano-city-guide";
                        } else {
                          window.location.href = "#";
                        }
                      }}
                    >
                      Explore {community.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCommunities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No communities found matching your search criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => { setSearchTerm(""); setSelectedCounty("all"); }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Community Features Guide */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Makes Each Community Unique
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our comprehensive neighborhood guides cover all the essential factors for making informed decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Home,
                title: "Real Estate Market",
                description: "Current median prices, market trends, property types, and investment potential analysis."
              },
              {
                icon: GraduationCap,
                title: "Schools & Education", 
                description: "District rankings, TEA ratings, specialized programs, and higher education proximity."
              },
              {
                icon: MapPin,
                title: "Location & Accessibility",
                description: "Major roads, public transit, proximity to employment centers and key destinations."
              },
              {
                icon: Users,
                title: "Demographics",
                description: "Population growth, household income, age distribution, and family composition data."
              },
              {
                icon: TreePine,
                title: "Amenities & Recreation",
                description: "Parks, trails, golf courses, shopping centers, dining, and healthcare facilities."
              },
              {
                icon: Shield,
                title: "Safety & Community",
                description: "Crime statistics, community policing, local events, and neighborhood culture."
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Current Market Insights
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Stay informed with the latest trends and data across the DFW real estate market.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Market Growth</h3>
                <div className="text-3xl font-bold text-green-500 mb-2">+4.2%</div>
                <p className="text-slate-600">Year-over-year appreciation across DFW metro area</p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Home className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Inventory Levels</h3>
                <div className="text-3xl font-bold text-blue-500 mb-2">2.8</div>
                <p className="text-slate-600">Months of housing supply - balanced market conditions</p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Population Growth</h3>
                <div className="text-3xl font-bold text-purple-500 mb-2">+2.1%</div>
                <p className="text-slate-600">Annual population increase driving housing demand</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Community?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let our local experts guide you through the best neighborhoods in North Texas. 
            Get personalized recommendations based on your lifestyle and preferences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-slate-900 bg-white hover:bg-slate-100">
              <MapPin className="w-5 h-5 mr-2" />
              Schedule Neighborhood Tour
            </Button>
            <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-transparent">
              Get Personalized Recommendations
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
      
      {/* Back to Top */}
      <BackToTop />
    </div>
  );
}
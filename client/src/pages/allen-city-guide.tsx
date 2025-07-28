import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  CheckCircle
} from "lucide-react";
import allenHeroImage from "@/assets/docs/city-guides/allen.jpg";

export default function AllenCityGuide() {
  const demographics = [
    { label: "Population", value: "105,623", description: "Growing steadily since 2010" },
    { label: "Median Age", value: "37.2 years", description: "Young professional families" },
    { label: "Median Income", value: "$89,547", description: "Above Texas average" },
    { label: "Family Households", value: "78%", description: "Strong family community" }
  ];

  const realEstateData = [
    { label: "Median Home Price", value: "$485,000", change: "+4.2%" },
    { label: "Average Days on Market", value: "28 days", change: "-12%" },
    { label: "Price per Sq Ft", value: "$185", change: "+3.8%" },
    { label: "Market Appreciation", value: "6.1%", change: "YoY" }
  ];

  const schoolInfo = [
    { name: "Allen High School", rating: "9/10", type: "Public High School", students: "6,900+" },
    { name: "Lowery Freshman Center", rating: "8/10", type: "9th Grade Center", students: "1,800+" },
    { name: "Curtis Middle School", rating: "9/10", type: "Public Middle School", students: "1,200+" },
    { name: "Ford Middle School", rating: "8/10", type: "Public Middle School", students: "1,100+" }
  ];

  const amenities = [
    {
      category: "Parks & Recreation",
      icon: TreePine,
      items: [
        "Allen Station Park - 40-acre community park with splash pad and trails",
        "Watters Creek - Mixed-use development with shopping, dining, and events",
        "The Fairways Golf Course - Championship 18-hole public golf course",
        "Allen Community Park - Sports fields, playgrounds, and pavilions"
      ]
    },
    {
      category: "Shopping & Dining",
      icon: ShoppingBag,
      items: [
        "Watters Creek at Montgomery Farm - Premium outdoor shopping",
        "Allen Station - Retail and entertainment complex",
        "Village at Allen - Neighborhood shopping center",
        "Over 200 restaurants from casual to fine dining"
      ]
    },
    {
      category: "Healthcare",
      icon: Hospital,
      items: [
        "Texas Health Presbyterian Hospital Allen - Full-service hospital",
        "Medical City Allen - Comprehensive medical services", 
        "Baylor Scott & White Medical Center - Specialty care",
        "Numerous urgent care and specialty clinics"
      ]
    }
  ];

  const transportation = [
    { route: "Downtown Dallas", time: "35 minutes", distance: "28 miles" },
    { route: "DFW Airport", time: "40 minutes", distance: "32 miles" },
    { route: "Love Field Airport", time: "30 minutes", distance: "25 miles" },
    { route: "Plano", time: "15 minutes", distance: "8 miles" }
  ];

  const futureDevelopments = [
    {
      name: "Allen Station Phase II",
      description: "Additional retail, dining, and residential expansion",
      timeline: "2025-2026",
      impact: "Enhanced walkability and community amenities"
    },
    {
      name: "Highway 121 Improvements",
      description: "Traffic flow enhancements and new access roads",
      timeline: "2024-2025", 
      impact: "Improved commuter access and reduced congestion"
    },
    {
      name: "Creek Trail Extension",
      description: "Extended walking and biking trail system",
      timeline: "2024",
      impact: "Enhanced outdoor recreation and connectivity"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${allenHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Allen, Texas
              <span className="text-yellow-400 block">City Guide</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Discover why Allen is one of North Texas's most desirable communities. 
              From top-rated schools to championship sports and vibrant community life, 
              Allen offers the perfect blend of suburban comfort and urban convenience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <Home className="w-5 h-5 mr-2" />
                View Allen Homes
              </Button>
              <Button variant="outline" className="border-2 border-slate-900 text-slate-900 px-8 py-4 text-lg font-semibold hover:bg-slate-900 hover:text-white bg-transparent">
                Schedule Allen Tour
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
                Welcome to Allen
              </h2>
              <div className="prose prose-lg text-slate-600 mb-8">
                <p>
                  Founded in 1953, Allen has grown from a small farming community into one of the most 
                  sought-after cities in North Texas. Known for its excellent schools, family-friendly 
                  atmosphere, and the iconic Allen High School Eagles football program, this vibrant 
                  community perfectly balances small-town charm with big-city amenities.
                </p>
                <p>
                  Located in Collin County, Allen offers residents easy access to major employment centers 
                  while maintaining its distinctive community character. The city is renowned for the 
                  Allen Event Center, Watters Creek development, and some of the highest-rated schools in Texas.
                </p>
              </div>
            </div>
            
            {/* Allen at a Glance Sidebar */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Allen at a Glance</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Located in Collin County, 28 miles north of downtown Dallas</span>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Incorporated in 1953, celebrating 70+ years of community</span>
                </div>
                <div className="flex items-start">
                  <Star className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Home to the Allen Eagles and 18,000-seat football stadium</span>
                </div>
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Major employers include Allen ISD, Watters Creek, and corporate offices</span>
                </div>
                <div className="flex items-start">
                  <TreePine className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Over 300 acres of parks and recreational facilities</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Demographics Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">105,623</div>
              <div className="font-semibold text-slate-900 mb-1">Population</div>
              <div className="text-sm text-slate-600">Growing steadily since 2010</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">37.2 years</div>
              <div className="font-semibold text-slate-900 mb-1">Median Age</div>
              <div className="text-sm text-slate-600">Young professional families</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">$89,547</div>
              <div className="font-semibold text-slate-900 mb-1">Median Income</div>
              <div className="text-sm text-slate-600">Above Texas average</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">78%</div>
              <div className="font-semibold text-slate-900 mb-1">Family Households</div>
              <div className="text-sm text-slate-600">Strong family community</div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Estate Market */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Allen Real Estate Market
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Allen's real estate market remains strong with steady appreciation and diverse housing options.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {realEstateData.map((data, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">{data.value}</div>
                  <div className="font-semibold text-slate-900 mb-2">{data.label}</div>
                  <div className="text-sm text-green-600 font-medium">{data.change}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="w-5 h-5 mr-2" style={{ color: '#0d0d33' }} />
                  Property Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Single-Family Homes</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Townhomes</span>
                    <span className="font-semibold">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Condominiums</span>
                    <span className="font-semibold">3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" style={{ color: '#0d0d33' }} />
                  Price Ranges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>$300K - $450K</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$450K - $650K</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$650K+</span>
                    <span className="font-semibold">30%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" style={{ color: '#0d0d33' }} />
                  Market Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Strong buyer demand</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Low inventory levels</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Steady appreciation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Allen Independent School District
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              One of Texas's highest-rated school districts with exceptional academic and extracurricular programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {schoolInfo.map((school, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">{school.name}</h3>
                      <p className="text-slate-600">{school.type}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">{school.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">
                    <span className="font-medium">Enrollment:</span> {school.students}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-white">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
                Allen ISD Achievements & Programs
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "TEA Recognized District with Exemplary ratings",
                  "18 consecutive football state championships (1998-2015)",
                  "Award-winning fine arts programs including band and theater",
                  "Advanced Placement courses with high pass rates",
                  "STEM programs and robotics competitions",
                  "Comprehensive special education services",
                  "Dual language immersion programs",
                  "Career and technical education pathways",
                  "Championship athletic programs across all sports"
                ].map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Location & Transportation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Location & Accessibility
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Strategically located with excellent access to major highways and employment centers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Major Highways & Roads</h3>
              <div className="space-y-4">
                {[
                  { road: "US Highway 75 (Central Expressway)", access: "North-South corridor to downtown Dallas" },
                  { road: "Highway 121 (Sam Rayburn Tollway)", access: "East-West access to DFW Airport and Grapevine" },
                  { road: "Highway 380", access: "East-West connector to Frisco and Denton" },
                  { road: "Bethany Drive", access: "Major north-south arterial through Allen" },
                  { road: "Stacy Road", access: "East-west corridor with shopping and dining" }
                ].map((route, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="font-semibold text-slate-900">{route.road}</div>
                    <div className="text-slate-600">{route.access}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Travel Times</h3>
              <div className="space-y-4">
                {transportation.map((destination, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <Car className="w-5 h-5 text-primary mr-3" />
                      <span className="font-medium text-slate-900">{destination.route}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">{destination.time}</div>
                      <div className="text-sm text-slate-600">{destination.distance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities & Lifestyle */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Amenities & Lifestyle
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Allen offers an exceptional quality of life with world-class amenities and community features.
            </p>
          </div>

          <div className="space-y-8">
            {amenities.map((category, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <category.icon className="w-6 h-6 mr-3" style={{ color: '#0d0d33' }} />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Events & Culture */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Community Events & Culture
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Allen's vibrant community spirit shines through year-round events and cultural activities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                event: "Allen Eagles Football",
                season: "Fall",
                description: "Championship football games at the 18,000-seat Eagle Stadium",
                icon: Music
              },
              {
                event: "Watters Creek Events",
                season: "Year-round",
                description: "Concerts, festivals, and seasonal celebrations",
                icon: Calendar
              },
              {
                event: "Allen Community Parade",
                season: "July 4th",
                description: "Annual Independence Day parade and celebration",
                icon: Star
              },
              {
                event: "Farmers Markets",
                season: "Spring-Fall",
                description: "Local vendors, fresh produce, and artisan goods",
                icon: TreePine
              },
              {
                event: "Allen Arts Alliance",
                season: "Year-round",
                description: "Community theater productions and art exhibitions",
                icon: Music
              },
              {
                event: "Youth Sports Leagues",
                season: "Year-round",
                description: "Baseball, soccer, basketball, and other youth activities",
                icon: Users
              }
            ].map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <event.icon className="w-8 h-8 mx-auto mb-4" style={{ color: '#0d0d33' }} />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{event.event}</h3>
                  <div className="text-sm font-medium text-primary mb-3">{event.season}</div>
                  <p className="text-slate-600 text-sm">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Future Developments */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Future Developments
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Exciting upcoming projects that will enhance Allen's appeal and property values.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {futureDevelopments.map((development, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{development.name}</h3>
                  <p className="text-slate-600 mb-4">{development.description}</p>
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 text-primary mr-2" />
                    <span className="text-sm font-medium text-slate-900">{development.timeline}</span>
                  </div>
                  <div className="text-sm text-slate-600">
                    <span className="font-medium">Impact:</span> {development.impact}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Call Allen Home?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Discover the perfect home in Allen's exceptional community. Let our local experts 
            guide you through the best neighborhoods and properties available.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-slate-900 bg-white hover:bg-slate-100">
              <Home className="w-5 h-5 mr-2" />
              Search Allen Homes
            </Button>
            <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-transparent">
              Schedule Allen Tour
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
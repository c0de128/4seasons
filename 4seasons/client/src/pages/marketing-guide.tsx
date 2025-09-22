import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import marketingGuideHeroImage from "@/assets/images/hero-images/26524237.jpg";
import { 
  Camera,
  Share2,
  Globe,
  Mail,
  Megaphone,
  Eye,
  Users,
  Home,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Monitor,
  FileText,
  MapPin,
  Star,
  Award,
  Zap,
  Shield,
  Target,
  BarChart3,
  Video,
  Image as ImageIcon,
  Instagram,
  Facebook,
  Youtube,
  Search,
  DollarSign
} from "lucide-react";

export default function MarketingGuide() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAddress: '',
    propertyType: '',
    listingTimeline: '',
    marketingGoals: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Marketing consultation form submitted:", formData);
    // Handle form submission here
  };


  const marketingChannels = [
    {
      icon: Camera,
      title: "Professional Photography",
      description: "HDR photography that captures your home's best features",
      features: [
        "High-resolution HDR images",
        "Twilight photography",
        "Aerial/drone shots",
        "Virtual staging options"
      ],
      impact: "87% of buyers say photos are most important"
    },
    {
      icon: Video,
      title: "Video Tours & Walkthroughs",
      description: "Immersive video experiences that bring your listing to life",
      features: [
        "Professional video tours",
        "3D virtual walkthroughs",
        "Drone footage",
        "Neighborhood highlights"
      ],
      impact: "Listings with video get 403% more inquiries"
    },
    {
      icon: Globe,
      title: "Online Marketing",
      description: "Maximum exposure across all major real estate platforms",
      features: [
        "MLS syndication",
        "Zillow, Realtor.com, Trulia",
        "4Seasons website feature",
        "SEO optimization"
      ],
      impact: "92% of buyers search online first"
    },
    {
      icon: Share2,
      title: "Social Media Marketing",
      description: "Targeted campaigns across all social platforms",
      features: [
        "Facebook marketplace & ads",
        "Instagram stories & posts",
        "LinkedIn professional network",
        "YouTube video hosting"
      ],
      impact: "Social media drives 3x more engagement"
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Direct outreach to qualified buyer database",
      features: [
        "Buyer agent network",
        "Pre-qualified buyer list",
        "Neighborhood announcements",
        "Weekly feature emails"
      ],
      impact: "Email has 4,400% ROI in real estate"
    },
    {
      icon: Megaphone,
      title: "Traditional Marketing",
      description: "Proven offline strategies that still deliver results",
      features: [
        "Premium yard signage",
        "Open houses",
        "Print advertising",
        "Direct mail campaigns"
      ],
      impact: "45% of buyers attend open houses"
    }
  ];

  const marketingProcess = [
    {
      step: 1,
      title: "Pre-Marketing Preparation",
      description: "Strategic planning and property preparation",
      duration: "3-5 days",
      activities: [
        "Market analysis and pricing strategy",
        "Property staging consultation",
        "Marketing plan customization",
        "Pre-listing repairs and improvements"
      ]
    },
    {
      step: 2,
      title: "Professional Media Creation",
      description: "Capture stunning visuals that sell",
      duration: "2-3 days",
      activities: [
        "Professional photography session",
        "Video tour production",
        "3D virtual tour creation",
        "Marketing copy writing"
      ]
    },
    {
      step: 3,
      title: "Multi-Channel Launch",
      description: "Simultaneous launch across all platforms",
      duration: "24 hours",
      activities: [
        "MLS listing activation",
        "Website and portal publishing",
        "Social media campaign launch",
        "Email blast to buyer network"
      ]
    },
    {
      step: 4,
      title: "Active Marketing Management",
      description: "Continuous promotion and optimization",
      duration: "Ongoing",
      activities: [
        "Daily social media posts",
        "Targeted advertising campaigns",
        "Open house events",
        "Performance monitoring"
      ]
    },
    {
      step: 5,
      title: "Buyer Engagement",
      description: "Convert interest into offers",
      duration: "As needed",
      activities: [
        "Showing coordination",
        "Buyer feedback collection",
        "Strategy adjustments",
        "Offer negotiation"
      ]
    }
  ];


  const successStories = [
    {
      address: "Highland Park Estate",
      soldIn: "3 days",
      aboveAsking: "$50,000",
      views: "8,500",
      showings: "42",
      offers: "7",
      strategy: "Premium video tour and targeted social media campaign"
    },
    {
      address: "Plano Family Home",
      soldIn: "5 days",
      aboveAsking: "$15,000",
      views: "6,200",
      showings: "28",
      offers: "4",
      strategy: "3D virtual tour and neighborhood-targeted email campaign"
    },
    {
      address: "Frisco Townhouse",
      soldIn: "7 days",
      aboveAsking: "Full asking",
      views: "4,800",
      showings: "19",
      offers: "3",
      strategy: "Professional staging and Instagram marketing"
    }
  ];


  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Home Marketing Guide - Maximum Exposure Strategy | 4Seasons Real Estate"
        description="Comprehensive marketing strategies to sell your North Texas home faster. Professional photography, virtual tours, social media, and targeted advertising for maximum exposure."
        keywords="home marketing Dallas, real estate marketing Fort Worth, property marketing strategy DFW, virtual tours North Texas, real estate photography, social media marketing, MLS listing Texas"
        canonicalUrl={`${seoConfig.siteUrl}/marketing-guide`}
        ogTitle="Complete Home Marketing Guide - Sell Faster with Strategic Exposure"
        ogDescription="Discover our proven multi-channel marketing approach that gets North Texas homes sold quickly for top dollar. Professional media, targeted advertising, and maximum exposure."
        ogImage={`${seoConfig.siteUrl}/images/marketing-guide.jpg`}
        structuredData={generateStructuredData.service("Real Estate Marketing Services", "Comprehensive property marketing services including professional photography, virtual tours, social media marketing, and targeted advertising for residential real estate in North Texas.")}
      />
      <Navigation />

      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${marketingGuideHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
              Marketing That Delivers
              <span className="text-yellow-400 block" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Real Results</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
              Our comprehensive marketing strategy combines cutting-edge digital tools with proven 
              traditional methods to ensure maximum exposure and quick sales at top dollar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/contact">
                <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                  Get Your Marketing Plan
                </Button>
              </Link>
              <Link href="#success-stories">
                <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-transparent">
                  View Success Stories
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Subtle transition gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </section>


      {/* Marketing Channels Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-left">
              Multi-Channel Marketing Strategy
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-slate-600 text-left">
                We leverage every effective channel to ensure your property reaches the right buyers.
                Our comprehensive approach combines cutting-edge digital marketing with proven traditional methods
                to maximize exposure and accelerate your sale.
              </p>
              <p className="text-lg text-slate-600 text-left">
                In today's competitive real estate market, having a single marketing channel isn't enough.
                We deploy a coordinated campaign across six major channels, each targeting different buyer segments
                and behaviors. This multi-faceted approach ensures your listing reaches both active searchers
                and passive prospects who might become interested buyers.
              </p>
              <p className="text-lg text-slate-600 text-left">
                Every channel is strategically chosen based on data and proven results. We track performance
                metrics across all platforms, allowing us to optimize your campaign in real-time and focus
                resources where they generate the most qualified leads and serious inquiries.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketingChannels.map((channel, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-slate-200">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#0d0d33' }}>
                      <channel.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{channel.title}</CardTitle>
                  <p className="text-slate-600">{channel.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {channel.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-blue-600">{channel.impact}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Process Timeline */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Marketing Process
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A systematic approach to marketing your property for maximum impact
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-300 hidden md:block"></div>

            <div className="space-y-8">
              {marketingProcess.map((item, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  {/* Timeline dot */}
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-slate-300 z-10">
                    <span className="text-xl font-bold text-slate-900">{item.step}</span>
                  </div>

                  <Card className="flex-1 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-slate-600 mb-4">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Clock className="w-4 h-4" />
                          {item.duration}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-2">
                        {item.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Success Stories */}
      <section id="success-stories" className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Recent Marketing Success Stories
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real results from our comprehensive marketing strategies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900">{story.address}</h3>
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-slate-600">Sold In</p>
                      <p className="text-xl font-bold text-green-600">{story.soldIn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Above Asking</p>
                      <p className="text-xl font-bold text-green-600">{story.aboveAsking}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Total Views</span>
                      <span className="font-semibold">{story.views}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Showings</span>
                      <span className="font-semibold">{story.showings}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Offers Received</span>
                      <span className="font-semibold">{story.offers}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold">Strategy:</span> {story.strategy}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Digital vs Traditional Marketing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Perfect Marketing Mix
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Combining digital innovation with proven traditional methods
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Digital Marketing */}
            <Card className="border-slate-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Monitor className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Digital Marketing</h3>
                </div>
                <p className="text-slate-600">Reaching buyers where they search</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Search className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">SEO-Optimized Listings</h4>
                      <p className="text-sm text-slate-600">Rank higher in search results</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Facebook className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Social Media Campaigns</h4>
                      <p className="text-sm text-slate-600">Targeted ads on Facebook & Instagram</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Youtube className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Video Marketing</h4>
                      <p className="text-sm text-slate-600">YouTube tours and virtual walkthroughs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Email Campaigns</h4>
                      <p className="text-sm text-slate-600">Direct to qualified buyer database</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Traditional Marketing */}
            <Card className="border-slate-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-green-100">
                    <Home className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Traditional Marketing</h3>
                </div>
                <p className="text-slate-600">Time-tested methods that deliver</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Premium Yard Signs</h4>
                      <p className="text-sm text-slate-600">Eye-catching curb appeal marketing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Open Houses</h4>
                      <p className="text-sm text-slate-600">Welcoming events for serious buyers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Print Advertising</h4>
                      <p className="text-sm text-slate-600">Local magazines and newspapers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Direct Mail</h4>
                      <p className="text-sm text-slate-600">Neighborhood postcards and flyers</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* Marketing Consultation Form */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to Market Your Property?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Let our marketing experts create a customized strategy that gets your property noticed 
              by the right buyers and sold quickly for top dollar. Tell us about your property and goals.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="marketing-name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  id="marketing-name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="w-full"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="marketing-email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  id="marketing-email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="w-full"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="marketing-phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  id="marketing-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full"
                  placeholder="(214) 555-0123"
                />
              </div>

              <div>
                <label htmlFor="marketing-address" className="block text-sm font-medium text-slate-700 mb-2">
                  Property Address
                </label>
                <Input
                  type="text"
                  id="marketing-address"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                  className="w-full"
                  placeholder="123 Main St, City, TX"
                />
              </div>

              <div>
                <label htmlFor="marketing-property-type" className="block text-sm font-medium text-slate-700 mb-2">
                  Property Type
                </label>
                <select
                  id="marketing-property-type"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select property type</option>
                  <option value="single-family">Single Family Home</option>
                  <option value="townhome">Townhome</option>
                  <option value="condo">Condominium</option>
                  <option value="luxury">Luxury Property</option>
                  <option value="investment">Investment Property</option>
                  <option value="land">Land/Lot</option>
                </select>
              </div>

              <div>
                <label htmlFor="marketing-timeline" className="block text-sm font-medium text-slate-700 mb-2">
                  Listing Timeline
                </label>
                <select
                  id="marketing-timeline"
                  name="listingTimeline"
                  value={formData.listingTimeline}
                  onChange={(e) => handleInputChange('listingTimeline', e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Ready to list immediately</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="3-months">Within 3 months</option>
                  <option value="6-months">Within 6 months</option>
                  <option value="exploring">Just exploring options</option>
                </select>
              </div>

              <div>
                <label htmlFor="marketing-goals" className="block text-sm font-medium text-slate-700 mb-2">
                  Marketing Goals
                </label>
                <select
                  id="marketing-goals"
                  name="marketingGoals"
                  value={formData.marketingGoals}
                  onChange={(e) => handleInputChange('marketingGoals', e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select primary goal</option>
                  <option value="maximize-price">Maximize sale price</option>
                  <option value="sell-quickly">Sell as quickly as possible</option>
                  <option value="premium-exposure">Premium marketing exposure</option>
                  <option value="competitive-market">Stand out in competitive market</option>
                  <option value="unique-property">Market unique/luxury property</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="marketing-message" className="block text-sm font-medium text-slate-700 mb-2">
                  Tell us about your property and marketing needs
                </label>
                <Textarea
                  id="marketing-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full"
                  placeholder="Describe your property, any unique features, marketing challenges you're facing, or specific marketing strategies you're interested in..."
                />
              </div>

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  className="w-full bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors py-3 text-lg font-medium"
                >
                  <Megaphone className="w-5 h-5 mr-2" />
                  Get My Custom Marketing Strategy
                </Button>
                <p className="text-xs text-slate-500 mt-4 text-center">
                  By submitting this form, you agree to receive communications from 4Seasons Real Estate 
                  regarding your property marketing consultation. We respect your privacy and will not share 
                  your information with third parties.
                </p>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Professional Media</strong><br />Photography & video tours</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Maximum Exposure</strong><br />25+ marketing channels</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Proven Results</strong><br />Average 7 days to sell</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}
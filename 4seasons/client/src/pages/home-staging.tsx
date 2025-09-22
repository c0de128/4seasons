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
import homeStagingHeroImage from "@/assets/images/hero-images/3983.jpg";
import { 
  Home,
  Star,
  TrendingUp,
  DollarSign,
  Clock,
  Eye,
  Palette,
  Lightbulb,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Sofa,
  Utensils,
  Bed,
  Bath,
  TreePine,
  Camera,
  Users,
  Target,
  AlertCircle,
  Award,
  Sparkles,
  CalendarCheck,
  Phone,
  Monitor
} from "lucide-react";

export default function HomeStaging() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAddress: '',
    propertyType: '',
    stagingGoal: '',
    timeline: '',
    propertyCondition: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Home staging consultation form submitted:", formData);
    // Handle form submission here
  };


  const stagingBenefits = [
    {
      icon: Clock,
      title: "Sell Faster",
      description: "Staged homes typically sell 73% faster than non-staged homes",
      color: "text-green-600"
    },
    {
      icon: DollarSign,
      title: "Higher Price",
      description: "Increase your sale price by an average of 20% with professional staging",
      color: "text-blue-600"
    },
    {
      icon: Eye,
      title: "More Interest",
      description: "Staged homes receive 300% more showings and online views",
      color: "text-purple-600"
    },
    {
      icon: Target,
      title: "Broad Appeal",
      description: "Appeal to 95% of buyers by creating a neutral, welcoming environment",
      color: "text-orange-600"
    },
    {
      icon: Star,
      title: "Professional Photos",
      description: "Staged homes photograph beautifully for marketing materials",
      color: "text-pink-600"
    },
    {
      icon: TrendingUp,
      title: "Competitive Edge",
      description: "Stand out in the market against similar unstaged properties",
      color: "text-indigo-600"
    }
  ];

  const stagingProcess = [
    {
      step: 1,
      title: "Initial Consultation",
      description: "Comprehensive assessment of your home's staging potential",
      duration: "60-90 minutes",
      activities: [
        "Room-by-room evaluation",
        "Photography assessment",
        "Market positioning analysis",
        "Staging recommendations"
      ]
    },
    {
      step: 2,
      title: "Staging Plan Development",
      description: "Custom staging strategy tailored to your property",
      duration: "24-48 hours",
      activities: [
        "Detailed staging proposal",
        "Investment breakdown",
        "Timeline scheduling",
        "Furniture sourcing plan"
      ]
    },
    {
      step: 3,
      title: "Decluttering & Prep",
      description: "Preparing your space for professional staging",
      duration: "1-2 days",
      activities: [
        "Personal item removal",
        "Deep cleaning coordination",
        "Minor repairs completion",
        "Space optimization"
      ]
    },
    {
      step: 4,
      title: "Professional Staging",
      description: "Transform your space with expert design",
      duration: "4-8 hours",
      activities: [
        "Furniture placement",
        "Decor installation",
        "Lighting optimization",
        "Final styling touches"
      ]
    },
    {
      step: 5,
      title: "Photography & Marketing",
      description: "Capture your staged home at its best",
      duration: "2-3 hours",
      activities: [
        "Professional photography",
        "Virtual tour creation",
        "Marketing material prep",
        "MLS listing optimization"
      ]
    }
  ];

  const roomGuides = [
    {
      icon: Sofa,
      room: "Living Room",
      tips: [
        "Create conversational furniture groupings",
        "Add pops of color with throw pillows",
        "Ensure adequate lighting with lamps",
        "Keep surfaces clutter-free and styled"
      ]
    },
    {
      icon: Utensils,
      room: "Kitchen",
      tips: [
        "Clear all countertops except essentials",
        "Add fresh fruit or flowers as accents",
        "Ensure all appliances are spotless",
        "Set the table with simple place settings"
      ]
    },
    {
      icon: Bed,
      room: "Master Bedroom",
      tips: [
        "Invest in luxury bedding and pillows",
        "Keep nightstands styled but minimal",
        "Add soft lighting with table lamps",
        "Create a spa-like, peaceful atmosphere"
      ]
    },
    {
      icon: Bath,
      room: "Bathrooms",
      tips: [
        "Add fluffy white towels and bath mats",
        "Include small plants or fresh flowers",
        "Keep counters completely clear",
        "Add a few luxury bath accessories"
      ]
    },
    {
      icon: TreePine,
      room: "Outdoor Spaces",
      tips: [
        "Add colorful potted plants and flowers",
        "Create outdoor seating areas",
        "Ensure lawn and landscaping are pristine",
        "Add outdoor lighting for evening appeal"
      ]
    },
    {
      icon: Monitor,
      room: "Home Office/Study",
      tips: [
        "Create a clean, organized workspace",
        "Add good task lighting and a comfortable chair",
        "Keep desk surfaces minimal with just essentials",
        "Stage with a few books or professional accessories"
      ]
    }
  ];

  const successStories = [
    {
      location: "Highland Park Traditional",
      beforePrice: "$1,200,000",
      afterPrice: "$1,450,000",
      daysOnMarket: 8,
      stagingInvestment: "$12,000",
      roi: "2,083%",
      description: "Complete transformation of a dated interior into a luxury showcase"
    },
    {
      location: "Plano Contemporary",
      beforePrice: "$650,000",
      afterPrice: "$695,000",
      daysOnMarket: 12,
      stagingInvestment: "$8,500",
      roi: "529%",
      description: "Modern staging emphasized clean lines and open-concept living"
    },
    {
      location: "Frisco Family Home",
      beforePrice: "$485,000",
      afterPrice: "$525,000",
      daysOnMarket: 15,
      stagingInvestment: "$6,200",
      roi: "645%",
      description: "Warm, family-friendly staging appealed to move-up buyers"
    }
  ];

  const commonMistakes = [
    {
      mistake: "Over-Personalizing Spaces",
      solution: "Keep decor neutral and allow buyers to envision their own belongings"
    },
    {
      mistake: "Poor Lighting",
      solution: "Maximize natural light and add warm artificial lighting throughout"
    },
    {
      mistake: "Cluttered Surfaces",
      solution: "Follow the 'rule of three' - no more than three items per surface"
    },
    {
      mistake: "Ignoring Curb Appeal",
      solution: "First impressions matter - ensure exterior staging matches interior quality"
    },
    {
      mistake: "Wrong Furniture Scale",
      solution: "Use appropriately sized furniture that makes rooms feel spacious"
    },
    {
      mistake: "Neglecting Scent",
      solution: "Ensure homes smell fresh and clean - avoid strong fragrances"
    }
  ];


  const currentUrl = `${seoConfig.siteUrl}/home-staging`;
  const structuredData = generateStructuredData.service(
    "Home Staging Services",
    "Professional home staging services to help your North Texas property sell faster and for top dollar",
    ["home staging", "real estate staging", "property styling", "interior design"]
  );

  return (
    <>
      <SEO 
        title="Professional Home Staging Services | Sell Your Home Faster | 4Seasons Real Estate"
        description="Transform your North Texas home with professional staging services. Sell faster and for more money with our expert staging strategies. Free consultation available."
        keywords="home staging, professional staging, sell house faster, North Texas staging, property staging, interior staging, real estate staging"
        canonicalUrl={currentUrl}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white">
        <Navigation />
        
        {/* Hero Section */}
        <section 
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${homeStagingHeroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                Transform Your Home,
                <span className="text-yellow-400 block" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}> Maximize Your Sale</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                Professional staging that helps North Texas homes sell 73% faster and for 20% more money. 
                Let us showcase your property's full potential.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="text-white px-8 py-4 text-lg font-semibold hover:opacity-90" 
                          style={{ backgroundColor: '#0d0d33' }}>
                    <CalendarCheck className="w-5 h-5 mr-2" />
                    Free Staging Consultation
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-transparent"
                  onClick={() => document.getElementById('staging-process')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn Our Process
                </Button>
              </div>
            </div>
          </div>
          
          {/* Subtle transition gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
        </section>


        {/* Staging Benefits */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-left">
                Why Home Staging Works
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-slate-600 text-left">
                  Professional staging transforms your property into a buyer magnet, creating emotional connections
                  that drive faster sales and higher offers. In today's competitive market, staging isn't just
                  an option - it's a strategic necessity for maximizing your return.
                </p>
                <p className="text-lg text-slate-600 text-left">
                  Our North Texas staging expertise combines market psychology with design principles to showcase
                  your home's potential. We understand what today's buyers want to see and feel when they walk
                  through your door, and we create that experience through strategic furniture placement, color
                  coordination, and lifestyle presentation.
                </p>
                <p className="text-lg text-slate-600 text-left">
                  The numbers speak for themselves: staged homes sell 73% faster and for 20% more money than
                  unstaged properties. More importantly, staging helps buyers envision themselves living in
                  your space, creating the emotional connection that transforms interest into offers.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stagingBenefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg bg-slate-100 ${benefit.color}`}>
                        <benefit.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 ml-4">{benefit.title}</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Staging Process */}
        <section id="staging-process" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Staging Process
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                A systematic approach to transforming your property into an irresistible 
                showcase that buyers can't forget.
              </p>
            </div>
            
            <div className="space-y-8">
              {stagingProcess.map((process, index) => (
                <div key={index} className="flex flex-col lg:flex-row items-start lg:items-center gap-6 p-6 bg-slate-50 rounded-xl">
                  <div className="flex-shrink-0 w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: '#0d0d33' }}>
                    {process.step}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 lg:mb-0">{process.title}</h3>
                      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        <Clock className="w-4 h-4 mr-1" />
                        {process.duration}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{process.description}</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {process.activities.map((activity, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Room-by-Room Guide */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Room-by-Room Staging Guide
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Each space in your home plays a crucial role in the buyer's journey. 
                Here's how we optimize every room.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {roomGuides.map((room, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow border-slate-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                        <room.icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl text-slate-900">{room.room}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {room.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Staging Success Stories
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Real results from our professional staging services across North Texas
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900 mb-2">{story.location}</CardTitle>
                    <p className="text-sm text-slate-600">{story.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-slate-900">{story.daysOnMarket}</div>
                        <div className="text-xs text-slate-600">Days on Market</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{story.roi}</div>
                        <div className="text-xs text-slate-600">ROI</div>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Before:</span>
                        <span className="font-semibold">{story.beforePrice}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">After:</span>
                        <span className="font-semibold text-green-600">{story.afterPrice}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Investment:</span>
                        <span className="font-semibold">{story.stagingInvestment}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Common Staging Mistakes to Avoid
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Learn from these frequent staging errors that can hurt your home's sale potential
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {commonMistakes.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-slate-200">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">{item.mistake}</h3>
                    </div>
                    <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                      <p className="text-sm text-slate-700">
                        <strong className="text-green-700">Solution:</strong> {item.solution}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>



        {/* Home Staging Consultation Form */}
        <section id="contact" className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Ready to Stage Your Home?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Get a free staging consultation from our professional design team. We'll create a customized 
                staging plan to showcase your property's full potential and maximize your sale price.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="staging-name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    id="staging-name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="w-full"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="staging-email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    id="staging-email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="w-full"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="staging-phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    id="staging-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full"
                    placeholder="(214) 555-0123"
                  />
                </div>

                <div>
                  <label htmlFor="staging-address" className="block text-sm font-medium text-slate-700 mb-2">
                    Property Address
                  </label>
                  <Input
                    type="text"
                    id="staging-address"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                    className="w-full"
                    placeholder="123 Main St, City, TX"
                  />
                </div>

                <div>
                  <label htmlFor="staging-property-type" className="block text-sm font-medium text-slate-700 mb-2">
                    Property Type
                  </label>
                  <select
                    id="staging-property-type"
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
                    <option value="vacant">Vacant Property</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="staging-goal" className="block text-sm font-medium text-slate-700 mb-2">
                    Staging Goal
                  </label>
                  <select
                    id="staging-goal"
                    name="stagingGoal"
                    value={formData.stagingGoal}
                    onChange={(e) => handleInputChange('stagingGoal', e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select primary goal</option>
                    <option value="sell-faster">Sell faster</option>
                    <option value="maximize-price">Maximize sale price</option>
                    <option value="stand-out">Stand out from competition</option>
                    <option value="improve-photos">Better marketing photos</option>
                    <option value="full-staging">Complete home transformation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="staging-timeline" className="block text-sm font-medium text-slate-700 mb-2">
                    Timeline
                  </label>
                  <select
                    id="staging-timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Ready to stage immediately</option>
                    <option value="1-week">Within 1 week</option>
                    <option value="2-weeks">Within 2 weeks</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="exploring">Just exploring options</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="staging-condition" className="block text-sm font-medium text-slate-700 mb-2">
                    Property Condition
                  </label>
                  <select
                    id="staging-condition"
                    name="propertyCondition"
                    value={formData.propertyCondition}
                    onChange={(e) => handleInputChange('propertyCondition', e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select condition</option>
                    <option value="move-in-ready">Move-in ready</option>
                    <option value="minor-updates">Needs minor updates</option>
                    <option value="major-updates">Needs major updates</option>
                    <option value="vacant">Vacant property</option>
                    <option value="occupied">Currently occupied</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="staging-message" className="block text-sm font-medium text-slate-700 mb-2">
                    Tell us about your property and staging needs
                  </label>
                  <Textarea
                    id="staging-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full"
                    placeholder="Describe your property, any specific rooms you'd like to focus on, budget considerations, or questions about our staging process..."
                  />
                </div>

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="w-full bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors py-3 text-lg font-medium"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get My Free Staging Consultation
                  </Button>
                  <p className="text-xs text-slate-500 mt-4 text-center">
                    By submitting this form, you agree to receive communications from 4Seasons Real Estate 
                    regarding your staging consultation. We respect your privacy and will not share 
                    your information with third parties.
                  </p>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                      <CalendarCheck className="w-6 h-6 text-white" />
                    </div>
                    <p><strong>Free Consultation</strong><br />No cost, no obligation</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <p><strong>Quick Staging</strong><br />1-2 days to complete</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <p><strong>Great ROI</strong><br />300-600% return typical</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
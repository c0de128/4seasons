import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
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
  ChevronDown,
  ChevronUp,
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
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    faster: 0,
    price: 0,
    roi: 0,
    success: 0
  });
  const statsRef = useRef<HTMLDivElement>(null);

  // Animation effect for stats
  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number, setter: (value: number) => void) => {
      const range = end - start;
      const startTime = Date.now();
      
      const updateValue = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + range * easeOut);
        
        setter(current);
        
        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      };
      
      updateValue();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateValue(0, 73, 1500, (val) => setAnimatedStats(prev => ({ ...prev, faster: val })));
            animateValue(0, 20, 1500, (val) => setAnimatedStats(prev => ({ ...prev, price: val })));
            animateValue(0, 586, 1500, (val) => setAnimatedStats(prev => ({ ...prev, roi: val })));
            animateValue(0, 95, 1500, (val) => setAnimatedStats(prev => ({ ...prev, success: val })));
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

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
      solution: "Keep decor neutral and allow buyers to envision their own belongings",
      icon: Users
    },
    {
      mistake: "Poor Lighting",
      solution: "Maximize natural light and add warm artificial lighting throughout",
      icon: Lightbulb
    },
    {
      mistake: "Cluttered Surfaces",
      solution: "Follow the 'rule of three' - no more than three items per surface",
      icon: AlertCircle
    },
    {
      mistake: "Ignoring Curb Appeal",
      solution: "First impressions matter - ensure exterior staging matches interior quality",
      icon: TreePine
    },
    {
      mistake: "Wrong Furniture Scale",
      solution: "Use appropriately sized furniture that makes rooms feel spacious",
      icon: Home
    },
    {
      mistake: "Neglecting Scent",
      solution: "Ensure homes smell fresh and clean - avoid strong fragrances",
      icon: Sparkles
    }
  ];

  const faqData = [
    {
      question: "How much does professional home staging cost?",
      answer: "Staging costs typically range from $2,000-$15,000 depending on home size and scope. Most homeowners see a 300-600% ROI on their staging investment."
    },
    {
      question: "How long does the staging process take?",
      answer: "Initial staging typically takes 1-2 days to complete. We work efficiently to minimize disruption and get your home market-ready quickly."
    },
    {
      question: "Do you provide furniture and decor?",
      answer: "Yes, we have an extensive inventory of contemporary furniture, artwork, and accessories. Everything is included in our staging package."
    },
    {
      question: "Can I stay in my home while it's staged?",
      answer: "While possible, we recommend vacant staging for maximum impact. We can work with occupied homes but may have some limitations."
    },
    {
      question: "What happens to the staging items when my home sells?",
      answer: "We schedule removal of all staging items after closing. This allows for seamless showings throughout the selling process."
    },
    {
      question: "Do you stage all rooms in the house?",
      answer: "We focus on key areas that buyers care about most: living room, kitchen, master bedroom, and main bathrooms. Additional rooms can be added as needed."
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
        <section className="pt-24 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Professional Home Staging Services
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Home,
                <span className="text-blue-400"> Maximize Your Sale</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
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
                  className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900"
                  onClick={() => document.getElementById('staging-process')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn Our Process
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Stats Banner */}
        <section ref={statsRef} className="py-16" style={{ backgroundColor: '#1f2937' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {animatedStats.faster}%
                </div>
                <p className="text-slate-300 text-sm md:text-base">Faster Sale Time</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {animatedStats.price}%
                </div>
                <p className="text-slate-300 text-sm md:text-base">Higher Sale Price</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {animatedStats.roi}%
                </div>
                <p className="text-slate-300 text-sm md:text-base">Average ROI</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {animatedStats.success}%
                </div>
                <p className="text-slate-300 text-sm md:text-base">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Staging Benefits */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Home Staging Works
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Professional staging transforms your property into a buyer magnet, creating emotional connections 
                that drive faster sales and higher offers.
              </p>
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
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
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
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 ml-4">{item.mistake}</h3>
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

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-600">
                Get answers to common questions about our home staging services
              </p>
            </div>
            
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <Card key={index} className="border-slate-200">
                  <CardHeader 
                    className="cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedFaq === index && (
                    <CardContent>
                      <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Get a free staging consultation and discover how professional staging 
              can maximize your home's sale potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-50">
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link href="/home-valuation">
                <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-blue-600">
                  Get Home Valuation
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Award className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <h3 className="font-semibold mb-2">Expert Design Team</h3>
                <p className="text-sm text-blue-200">Certified staging professionals with years of experience</p>
              </div>
              <div>
                <Shield className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <h3 className="font-semibold mb-2">Full Insurance</h3>
                <p className="text-sm text-blue-200">Complete protection for your property and belongings</p>
              </div>
              <div>
                <Zap className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <h3 className="font-semibold mb-2">Quick Turnaround</h3>
                <p className="text-sm text-blue-200">Fast staging completion to get your home market-ready</p>
              </div>
            </div>
          </div>
        </section>

        <Contact />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
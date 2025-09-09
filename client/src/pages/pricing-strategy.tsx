import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import pricingStrategyHeroImage from "@/assets/images/hero-images/146253.jpg";
import { 
  TrendingUp,
  BarChart3,
  Calculator,
  Target,
  Home,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Zap,
  Shield,
  Award,
  Eye,
  Lightbulb
} from "lucide-react";

export default function PricingStrategy() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    days: 0,
    price: 0,
    ratio: 0,
    inventory: 0
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
            animateValue(0, 32, 1500, (val) => setAnimatedStats(prev => ({ ...prev, days: val })));
            animateValue(0, 425, 1500, (val) => setAnimatedStats(prev => ({ ...prev, price: val })));
            animateValue(0, 98, 1500, (val) => setAnimatedStats(prev => ({ ...prev, ratio: val })));
            animateValue(0, 18, 1500, (val) => setAnimatedStats(prev => ({ ...prev, inventory: val })));
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
  
  const pricingFactors = [
    {
      icon: MapPin,
      title: "Location & Neighborhood",
      description: "School districts, walkability, and local amenities",
      impact: "35%",
      details: [
        "School district ratings and boundaries",
        "Proximity to shopping and entertainment",
        "Neighborhood comparables and trends",
        "Future development plans"
      ]
    },
    {
      icon: Home,
      title: "Property Condition",
      description: "Updates, maintenance, and overall presentation",
      impact: "25%",
      details: [
        "Recent renovations and upgrades",
        "Roof, HVAC, and system ages",
        "Curb appeal and landscaping",
        "Interior design and staging"
      ]
    },
    {
      icon: TrendingUp,
      title: "Market Conditions",
      description: "Supply, demand, and seasonal trends",
      impact: "20%",
      details: [
        "Current inventory levels",
        "Average days on market",
        "Buyer demand indicators",
        "Interest rate environment"
      ]
    },
    {
      icon: Calendar,
      title: "Timing & Seasonality",
      description: "Best times to list in North Texas",
      impact: "10%",
      details: [
        "Spring market surge (March-May)",
        "Summer family relocations",
        "Fall second wave",
        "Holiday market dynamics"
      ]
    },
    {
      icon: Target,
      title: "Competitive Positioning",
      description: "Strategic pricing vs. competition",
      impact: "10%",
      details: [
        "Active listing analysis",
        "Recent sold comparables",
        "Price per square foot trends",
        "Unique selling propositions"
      ]
    }
  ];

  const pricingMistakes = [
    {
      mistake: "Overpricing Based on Emotion",
      consequence: "Extended time on market, eventual price reductions",
      solution: "Rely on data-driven comparative market analysis"
    },
    {
      mistake: "Ignoring Market Conditions",
      consequence: "Missed opportunities in seller's markets, slow sales in buyer's markets",
      solution: "Adjust strategy based on current supply and demand"
    },
    {
      mistake: "Pricing at Round Numbers",
      consequence: "Missing online search filters (e.g., $500K vs $499K)",
      solution: "Use strategic pricing just below thresholds"
    },
    {
      mistake: "Not Accounting for Closing Costs",
      consequence: "Unexpected reduced net proceeds",
      solution: "Factor in all selling expenses upfront"
    },
    {
      mistake: "Chasing the Market Down",
      consequence: "Multiple price reductions signal desperation",
      solution: "Price correctly from the start"
    }
  ];

  const pricingProcess = [
    {
      step: 1,
      title: "Comprehensive Market Analysis",
      description: "Deep dive into recent sales, active listings, and market trends",
      duration: "24-48 hours",
      deliverables: ["CMA report", "Comparable properties analysis", "Market trend overview"]
    },
    {
      step: 2,
      title: "Property Evaluation",
      description: "Professional assessment of your home's unique features and condition",
      duration: "2-3 hours",
      deliverables: ["Condition assessment", "Feature inventory", "Improvement recommendations"]
    },
    {
      step: 3,
      title: "Strategic Price Positioning",
      description: "Develop pricing strategy based on your goals and timeline",
      duration: "1-2 days",
      deliverables: ["Recommended list price", "Pricing strategy document", "Expected outcome scenarios"]
    },
    {
      step: 4,
      title: "Market Testing & Feedback",
      description: "Monitor initial market response and buyer feedback",
      duration: "First 2 weeks",
      deliverables: ["Showing activity report", "Buyer feedback summary", "Strategy adjustments"]
    },
    {
      step: 5,
      title: "Dynamic Adjustment",
      description: "Fine-tune pricing based on market response",
      duration: "Ongoing",
      deliverables: ["Performance analysis", "Competitive updates", "Optimization recommendations"]
    }
  ];

  const faqs = [
    {
      question: "How do you determine the right listing price?",
      answer: "We use a comprehensive approach combining comparative market analysis (CMA), current market conditions, your property's unique features, and your selling timeline. Our proprietary pricing algorithm analyzes hundreds of data points to recommend an optimal price that attracts buyers while maximizing your return."
    },
    {
      question: "Should I price high to leave room for negotiation?",
      answer: "This is a common misconception. Overpricing can actually hurt your sale by reducing initial interest, causing your listing to become stale, and ultimately requiring larger price reductions. Strategic pricing attracts more buyers, creates competition, and often results in offers at or above list price."
    },
    {
      question: "How often should we review and adjust pricing?",
      answer: "We continuously monitor market response and recommend reviewing pricing strategy every 2-3 weeks initially. Key indicators include showing activity, online views, and buyer feedback. In hot markets, we may recommend holding firm, while slower markets might require strategic adjustments."
    },
    {
      question: "What if my home is unique with few comparables?",
      answer: "Unique properties require specialized pricing strategies. We expand our analysis to include similar luxury features, adjust for distinctive characteristics, and may recommend professional appraisal. We also leverage our network to identify buyers specifically seeking unique properties."
    },
    {
      question: "How do online home estimates compare to professional pricing?",
      answer: "Online estimates like Zillow's Zestimate provide a starting point but often miss crucial factors like property condition, recent updates, and hyperlocal market dynamics. Professional pricing includes physical inspection, local expertise, and strategic positioning that online algorithms cannot provide."
    },
    {
      question: "What role does staging play in pricing strategy?",
      answer: "Staged homes typically sell for 5-10% more than unstaged properties. Professional staging helps buyers visualize the property's potential, justifying higher pricing. We factor staging into our pricing strategy and can arrange professional staging services to maximize your return."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Strategic Home Pricing Guide - Maximize Your Sale | 4Seasons Real Estate"
        description="Expert pricing strategies for selling your North Texas home. Learn how to price competitively, attract buyers, and maximize your return in the DFW real estate market."
        keywords="home pricing strategy Dallas, real estate pricing Fort Worth, CMA North Texas, competitive pricing DFW, home valuation strategies, selling price optimization, market analysis Texas"
        canonicalUrl={`${seoConfig.siteUrl}/pricing-strategy`}
        ogTitle="Strategic Home Pricing Guide - Get Top Dollar for Your Property"
        ogDescription="Master the art of pricing your North Texas home with data-driven strategies, market insights, and expert guidance to maximize your sale price."
        ogImage={`${seoConfig.siteUrl}/images/pricing-strategy-guide.jpg`}
        structuredData={generateStructuredData.service("Home Pricing Strategy Services", "Professional pricing strategy and market analysis services to help sellers maximize their property value in the competitive North Texas real estate market.")}
      />
      <Navigation />

      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${pricingStrategyHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100/90 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4" />
              Homes Priced Right Sell 50% Faster
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
              Strategic Pricing That
              <span className="text-yellow-400 block" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Drives Results</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
              Data-driven pricing strategies that attract serious buyers, create competition, 
              and maximize your return in the North Texas real estate market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/home-valuation">
                <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                  Get Your Free Pricing Analysis
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-transparent">
                  Speak with a Pricing Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Subtle transition gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </section>

      {/* Success Stats Banner - Home Page Style */}
      <section ref={statsRef} className="py-12" style={{ backgroundColor: '#1f2937' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Current Market Performance
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Real-time insights into the North Texas real estate market to guide your pricing strategy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {/* Average Days on Market */}
            <div className="group">
              <div className={`text-3xl md:text-4xl font-bold text-white mb-1 transition-transform duration-1000 ${hasAnimated ? 'scale-100' : 'scale-95'}`}>
                {animatedStats.days}
              </div>
              <div className="text-base font-medium text-white">
                Average Days on Market
              </div>
            </div>

            {/* Median Sale Price */}
            <div className="group">
              <div className={`text-3xl md:text-4xl font-bold text-white mb-1 transition-transform duration-1000 ${hasAnimated ? 'scale-100' : 'scale-95'}`}>
                ${animatedStats.price}K
              </div>
              <div className="text-base font-medium text-white">
                Median Sale Price
              </div>
            </div>

            {/* List to Sale Ratio */}
            <div className="group">
              <div className={`text-3xl md:text-4xl font-bold text-white mb-1 transition-transform duration-1000 ${hasAnimated ? 'scale-100' : 'scale-95'}`}>
                {animatedStats.ratio}.5%
              </div>
              <div className="text-base font-medium text-white">
                List to Sale Ratio
              </div>
            </div>

            {/* Inventory Levels */}
            <div className="group">
              <div className={`text-3xl md:text-4xl font-bold text-white mb-1 transition-transform duration-1000 ${hasAnimated ? 'scale-100' : 'scale-95'}`}>
                1.{animatedStats.inventory} mo
              </div>
              <div className="text-base font-medium text-white">
                Inventory Levels
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Factors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Key Factors That Drive Your Home's Value
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Understanding these critical factors helps position your property competitively in the market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingFactors.map((factor, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-slate-200">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#0d0d33' }}>
                      <factor.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-green-600">{factor.impact}</span>
                  </div>
                  <CardTitle className="text-xl mb-2">{factor.title}</CardTitle>
                  <p className="text-slate-600">{factor.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {factor.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Process Timeline */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Strategic Pricing Process
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A systematic approach to finding your optimal price point
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-300 hidden md:block"></div>

            <div className="space-y-8">
              {pricingProcess.map((item, index) => (
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
                      
                      <div className="flex flex-wrap gap-2">
                        {item.deliverables.map((deliverable, idx) => (
                          <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                            {deliverable}
                          </span>
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

      {/* Common Mistakes Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Avoid These Costly Pricing Mistakes
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Learn from common errors that can cost you time and money
            </p>
          </div>

          <div className="grid gap-6">
            {pricingMistakes.map((item, index) => (
              <Card key={index} className="border-l-4 border-red-500">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-start gap-3 mb-3">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-slate-900">Mistake</h3>
                          <p className="text-slate-700 mt-1">{item.mistake}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-start gap-3 mb-3">
                        <TrendingUp className="w-6 h-6 text-orange-500 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-slate-900">Consequence</h3>
                          <p className="text-slate-700 mt-1">{item.consequence}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-6 h-6 text-green-500 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-slate-900">Solution</h3>
                          <p className="text-slate-700 mt-1">{item.solution}</p>
                        </div>
                      </div>
                    </div>
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
              Pricing Strategy FAQs
            </h2>
            <p className="text-lg text-slate-600">
              Get answers to common questions about pricing your home
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-slate-200">
                <CardContent className="p-6">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full text-left flex items-start justify-between gap-4"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="mt-4 text-slate-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: '#0d0d33' }}>
              <Calculator className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to Price Your Home Strategically?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Get a comprehensive pricing analysis from our expert team. We'll help you find the 
              perfect price point that attracts buyers and maximizes your return.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-slate-700">100% Free Analysis</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-green-600" />
                <span className="text-slate-700">Results in 24 Hours</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Award className="w-5 h-5 text-green-600" />
                <span className="text-slate-700">Expert Guidance</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/home-valuation">
                <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                  Start Your Pricing Analysis
                </Button>
              </Link>
              <Link href="/listing-process">
                <Button variant="outline" className="border-2 border-slate-900 text-slate-900 px-8 py-4 text-lg font-semibold hover:bg-slate-900 hover:text-white">
                  View Full Listing Process
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
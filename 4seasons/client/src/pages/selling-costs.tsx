import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import sellingCostsHeroImage from "@/assets/images/hero-images/2150062316.jpg";
import { 
  Calculator,
  DollarSign,
  PieChart,
  Receipt,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Home,
  Users,
  FileText,
  Search,
  Award,
  Shield,
  Lightbulb,
  Target,
  Eye,
  Phone,
  Download,
  Percent,
  Building,
  Calendar,
  Clock,
  HandCoins,
  Banknote,
  CreditCard,
  Wallet
} from "lucide-react";

export default function SellingCosts() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [homeValue, setHomeValue] = useState("500000");
  const [animatedStats, setAnimatedStats] = useState({
    avgCommission: 0,
    closingCosts: 0,
    netProceeds: 0,
    timeToSell: 0
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
            animateValue(0, 58, 1500, (val) => setAnimatedStats(prev => ({ ...prev, avgCommission: val })));
            animateValue(0, 23, 1500, (val) => setAnimatedStats(prev => ({ ...prev, closingCosts: val })));
            animateValue(0, 91, 1500, (val) => setAnimatedStats(prev => ({ ...prev, netProceeds: val })));
            animateValue(0, 24, 1500, (val) => setAnimatedStats(prev => ({ ...prev, timeToSell: val })));
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

  // Calculate costs based on home value
  const calculateCosts = (value: number) => {
    const commission = value * 0.058; // 5.8% average
    const closingCosts = value * 0.023; // 2.3% average
    const preparationCosts = Math.min(Math.max(value * 0.01, 1500), 8000); // 1% capped between $1,500-$8,000
    const marketingCosts = Math.min(Math.max(value * 0.003, 800), 2500); // 0.3% capped between $800-$2,500
    const totalCosts = commission + closingCosts + preparationCosts + marketingCosts;
    const netProceeds = value - totalCosts;

    return {
      commission,
      closingCosts,
      preparationCosts,
      marketingCosts,
      totalCosts,
      netProceeds
    };
  };

  const costCategories = [
    {
      icon: Users,
      title: "Real Estate Commission",
      percentage: "5-6%",
      description: "Split between listing agent and buyer's agent",
      details: [
        "Listing agent commission: 2.5-3%",
        "Buyer's agent commission: 2.5-3%",
        "Negotiable in some markets",
        "Includes professional marketing and expertise"
      ],
      color: "text-blue-600"
    },
    {
      icon: FileText,
      title: "Closing Costs",
      percentage: "1-3%",
      description: "Legal and administrative fees to complete the sale",
      details: [
        "Title insurance and search",
        "Attorney or escrow fees",
        "Transfer taxes and recording fees",
        "Property survey (if required)"
      ],
      color: "text-green-600"
    },
    {
      icon: Home,
      title: "Preparation Costs",
      percentage: "1-2%",
      description: "Getting your home market-ready",
      details: [
        "Professional staging",
        "Minor repairs and touch-ups",
        "Deep cleaning and landscaping",
        "Pre-inspection and fixes"
      ],
      color: "text-purple-600"
    },
    {
      icon: Search,
      title: "Marketing Expenses",
      percentage: "0.3-0.5%",
      description: "Professional marketing and advertising",
      details: [
        "Professional photography",
        "Virtual tours and video",
        "Online listing syndication",
        "Print advertising and signage"
      ],
      color: "text-orange-600"
    }
  ];

  const costComparison = [
    {
      type: "Full Service Agent",
      commission: "5.5-6%",
      services: ["Professional marketing", "Negotiation expertise", "Transaction management", "Legal guidance"],
      pros: ["Maximum exposure", "Expert guidance", "Stress-free process"],
      cons: ["Higher cost"],
      recommended: true
    },
    {
      type: "Discount Broker",
      commission: "1-3%",
      services: ["Basic MLS listing", "Limited marketing", "Minimal support"],
      pros: ["Lower commission", "Some savings"],
      cons: ["Limited marketing", "Less expertise", "More work for seller"],
      recommended: false
    },
    {
      type: "For Sale By Owner",
      commission: "0-3%",
      services: ["Self-marketing", "Self-negotiation", "Self-management"],
      pros: ["No listing commission", "Full control"],
      cons: ["No professional marketing", "Legal risks", "Time consuming", "Often sell for less"],
      recommended: false
    }
  ];

  const hiddenCosts = [
    {
      cost: "Buyer Concessions",
      description: "Credits for repairs or closing costs",
      amount: "$2,000 - $8,000",
      frequency: "60% of transactions"
    },
    {
      cost: "Carrying Costs",
      description: "Mortgage, utilities, taxes while listed",
      amount: "$1,500 - $4,000/month",
      frequency: "Extended listings"
    },
    {
      cost: "Storage & Moving",
      description: "Moving expenses and temporary storage",
      amount: "$800 - $3,000",
      frequency: "Most sales"
    },
    {
      cost: "Capital Gains Tax",
      description: "Federal tax on profit (if applicable)",
      amount: "15-20% of gain",
      frequency: "Investment/2nd homes"
    }
  ];

  const costSavingTips = [
    {
      tip: "Price Strategically",
      description: "Competitive pricing reduces time on market and carrying costs",
      savings: "Up to $5,000/month",
      icon: Target
    },
    {
      tip: "Complete Repairs Early",
      description: "Fix issues before listing to avoid buyer concessions",
      savings: "$2,000 - $6,000",
      icon: Shield
    },
    {
      tip: "Professional Staging",
      description: "Staged homes sell faster and for higher prices",
      savings: "5-10% higher offers",
      icon: Award
    },
    {
      tip: "Choose the Right Agent",
      description: "Experienced agents often negotiate better terms",
      savings: "2-3% higher net proceeds",
      icon: Users
    }
  ];

  const sampleScenarios = [
    {
      scenario: "Starter Home in Garland",
      homeValue: "$325,000",
      costs: calculateCosts(325000),
      details: {
        daysOnMarket: 18,
        competitorCount: 12,
        marketCondition: "Balanced"
      }
    },
    {
      scenario: "Family Home in Frisco",
      homeValue: "$650,000",
      costs: calculateCosts(650000),
      details: {
        daysOnMarket: 14,
        competitorCount: 8,
        marketCondition: "Seller's Market"
      }
    },
    {
      scenario: "Luxury Home in Highland Park",
      homeValue: "$1,850,000",
      costs: calculateCosts(1850000),
      details: {
        daysOnMarket: 45,
        competitorCount: 3,
        marketCondition: "Luxury Niche"
      }
    }
  ];

  const faqData = [
    {
      question: "Are real estate commissions negotiable?",
      answer: "Yes, commissions are negotiable, but remember that commission often correlates with the level of service and marketing exposure you receive. A good agent's expertise and marketing reach can result in a higher sale price that more than offsets their commission."
    },
    {
      question: "What closing costs do sellers typically pay?",
      answer: "Sellers typically pay 1-3% of the home's value in closing costs, including title insurance, attorney fees, transfer taxes, and recording fees. In Texas, sellers also pay for the owner's title insurance policy."
    },
    {
      question: "How much should I budget for home preparation?",
      answer: "Most sellers spend 1-2% of their home's value on preparation, including staging, minor repairs, cleaning, and landscaping. The investment often pays for itself through faster sales and higher offers."
    },
    {
      question: "Can I save money by selling without an agent?",
      answer: "While you'll save on listing commission, FSBO homes typically sell for 5-10% less than agent-assisted sales and take longer to sell. You'll also handle all marketing, legal paperwork, and negotiations yourself."
    },
    {
      question: "What are typical buyer concessions?",
      answer: "Buyers often request 1-3% of the purchase price in concessions for repairs or closing costs. In competitive markets, concessions are less common, but in buyer's markets, they're nearly expected."
    },
    {
      question: "How do I estimate my net proceeds?",
      answer: "Subtract total selling costs (commission, closing costs, preparation, marketing) from your expected sale price. Don't forget to account for your remaining mortgage balance and any liens on the property."
    }
  ];

  const currentUrl = `${seoConfig.siteUrl}/selling-costs`;
  const structuredData = generateStructuredData.service(
    "Home Selling Costs Calculator & Guide",
    "Comprehensive guide to home selling costs in North Texas with interactive calculator and expert insights",
    ["selling costs", "real estate commission", "closing costs", "home selling expenses"]
  );

  return (
    <>
      <SEO 
        title="Home Selling Costs Calculator & Guide | North Texas | 4Seasons Real Estate"
        description="Calculate your home selling costs with our comprehensive guide. Learn about commissions, closing costs, and hidden expenses when selling your North Texas home."
        keywords="home selling costs, real estate commission, closing costs, selling expenses, North Texas real estate, cost calculator, net proceeds"
        canonicalUrl={currentUrl}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white">
        <Navigation />
        
        {/* Hero Section */}
        <section 
          className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(${sellingCostsHeroImage})`,
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Know Your Home's
                <span className="text-yellow-400 block">True Selling Costs</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                Get a complete breakdown of all expenses involved in selling your North Texas home. 
                No surprises, just transparent information to help you make informed decisions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="text-white px-8 py-4 text-lg font-semibold hover:opacity-90" 
                  style={{ backgroundColor: '#0d0d33' }}
                  onClick={() => document.getElementById('cost-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Your Costs
                </Button>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-black/30 backdrop-blur-sm"
                  >
                    Get Personalized Estimate
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Smooth Transition */}
        <div className="h-8 bg-gradient-to-t from-gray-800 to-transparent"></div>


        {/* Cost Calculator */}
        <section id="cost-calculator" className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-left">
                Selling Costs Calculator
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-slate-600 text-left">
                  Enter your home's estimated value to see a detailed breakdown of expected selling costs.
                  Understanding these expenses upfront helps you make informed decisions and accurately
                  calculate your net proceeds from the sale.
                </p>
                <p className="text-lg text-slate-600 text-left">
                  Our calculator includes all typical costs associated with selling a home in North Texas,
                  from real estate commissions and closing costs to preparation expenses and government fees.
                  We use current market rates and local standards to provide accurate estimates you can trust.
                </p>
                <p className="text-lg text-slate-600 text-left">
                  Knowledge is power when selling your home. By understanding where your money goes,
                  you can budget effectively, negotiate smartly, and maximize your final return on investment.
                  No surprises, just transparent information to guide your selling strategy.
                </p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
            
            <Card className="border-slate-200 shadow-lg">
              <CardContent className="p-8">
                <div className="mb-8">
                  <Label htmlFor="homeValue" className="text-lg font-semibold text-slate-900 mb-3 block">
                    Estimated Home Value
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="homeValue"
                      type="number"
                      value={homeValue}
                      onChange={(e) => setHomeValue(e.target.value)}
                      className="pl-10 text-lg py-3"
                      placeholder="500000"
                    />
                  </div>
                </div>
                
                {homeValue && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {(() => {
                        const costs = calculateCosts(Number(homeValue));
                        return (
                          <>
                            <div className="space-y-4">
                              <h3 className="text-xl font-semibold text-slate-900">Cost Breakdown</h3>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                  <span className="font-medium">Commission (5.8%)</span>
                                  <span className="font-bold text-blue-600">
                                    ${costs.commission.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                  <span className="font-medium">Closing Costs (2.3%)</span>
                                  <span className="font-bold text-green-600">
                                    ${costs.closingCosts.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                                  <span className="font-medium">Preparation</span>
                                  <span className="font-bold text-purple-600">
                                    ${costs.preparationCosts.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                                  <span className="font-medium">Marketing</span>
                                  <span className="font-bold text-orange-600">
                                    ${costs.marketingCosts.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <h3 className="text-xl font-semibold text-slate-900">Summary</h3>
                              <div className="p-6 bg-white border-2 border-slate-200 rounded-lg">
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-slate-700">Home Value</span>
                                    <span className="font-bold text-slate-900">${Number(homeValue).toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between items-center text-red-600">
                                    <span>Total Costs</span>
                                    <span className="font-bold">-${costs.totalCosts.toLocaleString()}</span>
                                  </div>
                                  <hr className="border-slate-200" />
                                  <div className="flex justify-between items-center text-xl font-bold text-green-600">
                                    <span className="text-slate-900">Net Proceeds</span>
                                    <span>${costs.netProceeds.toLocaleString()}</span>
                                  </div>
                                  <div className="text-center text-sm text-slate-600 mt-4">
                                    {((costs.netProceeds / Number(homeValue)) * 100).toFixed(1)}% of home value
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    
                    <div className="text-center pt-6 border-t border-slate-200">
                      <p className="text-sm text-slate-600 mb-4">
                        *Estimates are based on North Texas averages. Actual costs may vary.
                      </p>
                      <Link href="/contact">
                        <Button className="text-white px-6 py-2" style={{ backgroundColor: '#0d0d33' }}>
                          Get Accurate Estimate
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cost Categories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Understanding Selling Costs
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                A detailed breakdown of each cost category and what's included
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {costCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-slate-200">
                  <CardHeader>
                    <div className="mb-3">
                      <div>
                        <CardTitle className="text-xl text-slate-900">{category.title}</CardTitle>
                        <span className="text-2xl font-bold text-slate-700">{category.percentage}</span>
                      </div>
                    </div>
                    <p className="text-slate-600">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Selling Options Comparison
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Compare different approaches to selling your home and their associated costs
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {costComparison.map((option, index) => (
                <Card key={index} className={`relative hover:shadow-xl transition-shadow ${
                  option.recommended ? 'border-2 border-blue-500' : 'border-slate-200'
                }`}>
                  {option.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Recommended
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl text-slate-900 mb-2">{option.type}</CardTitle>
                    <div className="text-3xl font-bold text-slate-700 mb-2">{option.commission}</div>
                    <p className="text-sm text-slate-600">Commission Range</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Services Included</h4>
                      <ul className="space-y-1">
                        {option.services.map((service, idx) => (
                          <li key={idx} className="text-sm text-slate-600">• {service}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Pros</h4>
                      <ul className="space-y-1">
                        {option.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2">Cons</h4>
                      <ul className="space-y-1">
                        {option.cons.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Hidden Costs */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Hidden Costs to Consider
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Additional expenses that sellers often overlook but should budget for
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {hiddenCosts.map((cost, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-slate-900">{cost.cost}</h3>
                      <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        {cost.frequency}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{cost.description}</p>
                    <div className="text-xl font-bold text-slate-700">{cost.amount}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cost-Saving Tips */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Smart Cost-Saving Strategies
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Professional tips to minimize your selling costs while maximizing your return
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {costSavingTips.map((tip, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-slate-200">
                  <CardContent className="p-6">
                    <div className="inline-flex p-3 bg-green-100 text-green-600 rounded-full mb-4">
                      <tip.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{tip.tip}</h3>
                    <p className="text-slate-600 text-sm mb-3">{tip.description}</p>
                    <div className="text-lg font-bold text-green-600">{tip.savings}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Scenarios */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Real Cost Examples
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                See actual selling cost scenarios from different North Texas markets
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {sampleScenarios.map((scenario, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900">{scenario.scenario}</CardTitle>
                    <div className="text-3xl font-bold text-slate-700 mb-2">{scenario.homeValue}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-bold text-slate-900">
                          ${scenario.costs.totalCosts.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-600">Total Costs</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">
                          ${scenario.costs.netProceeds.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-600">Net Proceeds</div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-200 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Days on Market:</span>
                        <span className="font-semibold">{scenario.details.daysOnMarket}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Competitors:</span>
                        <span className="font-semibold">{scenario.details.competitorCount}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Market:</span>
                        <span className="font-semibold">{scenario.details.marketCondition}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-600">
                Common questions about home selling costs and expenses
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
              Ready to Sell Your Home?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Get a personalized cost estimate and selling strategy tailored to your 
              specific property and market conditions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-50">
                  <Phone className="w-5 h-5 mr-2" />
                  Get Personal Estimate
                </Button>
              </Link>
              <Link href="/home-valuation">
                <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-blue-600">
                  Value My Home
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Eye className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <h3 className="font-semibold mb-2">Transparent Pricing</h3>
                <p className="text-sm text-blue-200">No hidden fees or surprise costs</p>
              </div>
              <div>
                <Award className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <h3 className="font-semibold mb-2">Expert Guidance</h3>
                <p className="text-sm text-blue-200">Professional advice to maximize your net proceeds</p>
              </div>
              <div>
                <Shield className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <h3 className="font-semibold mb-2">Proven Results</h3>
                <p className="text-sm text-blue-200">Track record of successful sales and satisfied clients</p>
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
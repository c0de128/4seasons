import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import fsboVsAgentHeroImage from "@/assets/images/hero-images/102859.jpg";
import { 
  Scale,
  DollarSign,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Home,
  FileText,
  Shield,
  TrendingUp,
  UserCheck,
  Briefcase,
  Calculator,
  Phone,
  Calendar,
  Target,
  Eye,
  Award,
  Lightbulb,
  HandshakeIcon,
  Receipt,
  Building,
  PieChart,
  BarChart3,
  Percent,
  Banknote,
  CreditCard,
  Zap,
  Search,
  MessageSquare,
  Camera,
  Globe,
  Lock,
  BookOpen,
  AlertCircle,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

export default function FsboVsAgent() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [selectedComparison, setSelectedComparison] = useState<"fsbo" | "agent" | null>(null);
  const [animatedStats, setAnimatedStats] = useState({
    priceDifference: 0,
    daysOnMarket: 0,
    successRate: 0,
    avgSavings: 0
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
            animateValue(0, 11, 1500, (val) => setAnimatedStats(prev => ({ ...prev, priceDifference: val })));
            animateValue(0, 57, 1500, (val) => setAnimatedStats(prev => ({ ...prev, daysOnMarket: val })));
            animateValue(0, 89, 1500, (val) => setAnimatedStats(prev => ({ ...prev, successRate: val })));
            animateValue(0, 17, 1500, (val) => setAnimatedStats(prev => ({ ...prev, avgSavings: val })));
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

  const comparisonData = [
    {
      category: "Marketing & Exposure",
      fsbo: {
        rating: 2,
        points: [
          "Limited to online FSBO sites",
          "No MLS access in most areas",
          "DIY photography and descriptions",
          "Minimal professional marketing"
        ]
      },
      agent: {
        rating: 5,
        points: [
          "Full MLS exposure",
          "Professional photography",
          "Syndication to 100+ websites",
          "Agent network connections"
        ]
      }
    },
    {
      category: "Pricing Strategy",
      fsbo: {
        rating: 2,
        points: [
          "Based on online estimates",
          "Limited market knowledge",
          "Risk of over/under pricing",
          "No CMA expertise"
        ]
      },
      agent: {
        rating: 5,
        points: [
          "Professional CMA analysis",
          "Deep market knowledge",
          "Strategic pricing expertise",
          "Real-time market adjustments"
        ]
      }
    },
    {
      category: "Legal & Paperwork",
      fsbo: {
        rating: 2,
        points: [
          "Owner responsible for contracts",
          "Risk of legal mistakes",
          "Must hire attorney separately",
          "Disclosure liability"
        ]
      },
      agent: {
        rating: 5,
        points: [
          "Expert contract handling",
          "E&O insurance protection",
          "Compliance expertise",
          "Managed disclosure process"
        ]
      }
    },
    {
      category: "Negotiation",
      fsbo: {
        rating: 2,
        points: [
          "Emotional involvement",
          "Limited negotiation experience",
          "Direct confrontation with buyers",
          "No buffer in discussions"
        ]
      },
      agent: {
        rating: 5,
        points: [
          "Professional negotiation skills",
          "Emotional buffer",
          "Market leverage knowledge",
          "Expert handling of offers"
        ]
      }
    },
    {
      category: "Time Investment",
      fsbo: {
        rating: 1,
        points: [
          "40-80 hours average",
          "Scheduling all showings",
          "Handling all inquiries",
          "Managing entire process"
        ]
      },
      agent: {
        rating: 5,
        points: [
          "Agent handles showings",
          "Pre-screens buyers",
          "Manages communications",
          "Coordinates all parties"
        ]
      }
    },
    {
      category: "Cost",
      fsbo: {
        rating: 5,
        points: [
          "No agent commission",
          "Pay buyer's agent (2-3%)",
          "Marketing costs ($500-2000)",
          "Attorney fees ($500-1500)"
        ]
      },
      agent: {
        rating: 3,
        points: [
          "5-6% total commission",
          "Includes all marketing",
          "Professional services included",
          "No upfront costs"
        ]
      }
    }
  ];

  const fsboMistakes = [
    {
      icon: DollarSign,
      mistake: "Overpricing the Home",
      consequence: "Homes sit on market 2x longer, eventually selling for less",
      solution: "Get professional CMA or appraisal before listing"
    },
    {
      icon: Camera,
      mistake: "Poor Quality Photos",
      consequence: "87% of buyers start online - bad photos mean no showings",
      solution: "Hire professional photographer ($200-500 investment)"
    },
    {
      icon: Shield,
      mistake: "Inadequate Buyer Screening",
      consequence: "Wasted time on unqualified buyers, security risks",
      solution: "Require pre-approval letters and verify funds"
    },
    {
      icon: FileText,
      mistake: "Legal Document Errors",
      consequence: "Deal failures, lawsuits, or financial losses",
      solution: "Always use real estate attorney for contracts"
    },
    {
      icon: Globe,
      mistake: "Limited Marketing Reach",
      consequence: "Missing 90% of potential buyers without MLS",
      solution: "Consider flat-fee MLS listing services"
    },
    {
      icon: HandshakeIcon,
      mistake: "Emotional Negotiations",
      consequence: "Lost deals or leaving money on the table",
      solution: "Set clear boundaries and consider hiring negotiator"
    }
  ];

  const scenarios = [
    {
      title: "Best for FSBO",
      icon: Home,
      situations: [
        "Selling to family or friends",
        "Already have a buyer lined up",
        "Hot seller's market with high demand",
        "Unique property with niche buyer pool",
        "Have real estate experience/knowledge",
        "Flexible timeline with no urgency"
      ],
      color: "text-green-600"
    },
    {
      title: "Best for Agent",
      icon: UserCheck,
      situations: [
        "Need to sell quickly",
        "Complex property or situation",
        "Relocating to another area",
        "First-time seller",
        "Busy schedule/limited time",
        "Competitive or slow market"
      ],
      color: "text-blue-600"
    }
  ];

  const costBreakdown = {
    fsbo: [
      { item: "Attorney Fees", range: "$500 - $1,500" },
      { item: "Marketing/Advertising", range: "$500 - $2,000" },
      { item: "Professional Photos", range: "$200 - $500" },
      { item: "Home Inspection", range: "$300 - $500" },
      { item: "Buyer's Agent Commission", range: "2-3% of sale price" },
      { item: "Closing Costs", range: "1-3% of sale price" },
      { item: "Title Insurance", range: "$500 - $1,000" }
    ],
    agent: [
      { item: "Total Commission", range: "5-6% of sale price" },
      { item: "Includes Marketing", range: "Covered by agent" },
      { item: "Professional Photos", range: "Covered by agent" },
      { item: "Closing Costs", range: "1-3% of sale price" },
      { item: "Title Insurance", range: "$500 - $1,000" },
      { item: "Pre-sale Repairs", range: "Negotiable" },
      { item: "Home Warranty", range: "$300 - $600 (optional)" }
    ]
  };

  const faqs = [
    {
      question: "Can I really save money selling FSBO?",
      answer: "While you avoid the listing agent commission (2.5-3%), you'll still typically pay the buyer's agent commission (2.5-3%) to attract agents with buyers. Factor in marketing costs, attorney fees, and the statistically lower sale price (FSBO homes sell for 11% less on average), and the savings often disappear. The real savings depend on your market knowledge, negotiation skills, and time availability."
    },
    {
      question: "Why do FSBO homes sell for less?",
      answer: "Several factors contribute: limited marketing exposure without MLS access, fewer potential buyers seeing the property, lack of professional pricing strategy, weaker negotiation position, buyers expecting a discount since you're 'saving' on commission, and emotional attachment affecting objective decision-making. Professional agents bring market expertise and negotiation skills that typically result in higher sale prices."
    },
    {
      question: "What legal risks do FSBO sellers face?",
      answer: "FSBO sellers face significant legal exposure including: incorrect disclosure documents leading to lawsuits, contract errors causing deal failures or legal action, fair housing violations with serious penalties, title issues not properly addressed, and no errors & omissions insurance coverage. Real estate agents carry E&O insurance and have compliance expertise to protect all parties."
    },
    {
      question: "Can I list on MLS without an agent?",
      answer: "Yes, through flat-fee MLS services ($99-$500), you can get basic MLS listing. However, you'll still handle showings, negotiations, paperwork, and pay the buyer's agent commission. You won't get the full agent services like professional marketing, negotiation expertise, or transaction management. It's a middle-ground option for experienced sellers."
    },
    {
      question: "How much time does FSBO really take?",
      answer: "FSBO sellers report spending 40-80 hours on average managing their sale, including: researching pricing and market conditions, creating marketing materials, scheduling and conducting showings, responding to inquiries and pre-screening buyers, negotiating offers and counteroffers, managing inspections and appraisals, and handling all closing paperwork. This doesn't include the extended time on market (average 57 days longer)."
    },
    {
      question: "Should I hire a real estate attorney for FSBO?",
      answer: "Absolutely. A real estate attorney ($500-$1,500) is essential for FSBO transactions to review and prepare contracts, ensure legal compliance, handle title issues, manage closing process, and protect you from liability. This is not optional - the legal risks without professional help far exceed the attorney costs."
    },
    {
      question: "What if I start FSBO and it's not working?",
      answer: "Many sellers start FSBO then list with an agent after 2-3 months. Be aware that failed FSBO attempts can stigmatize your property (buyers wonder 'what's wrong with it?'), and extended market time leads to lower offers. If switching to an agent, be transparent about your FSBO period and consider a brief off-market period to 'reset' the listing."
    },
    {
      question: "Do buyers prefer working with agents or FSBO sellers?",
      answer: "87% of buyers work with agents who often steer them away from FSBO properties due to: commission uncertainty, more complex transaction process, liability concerns without professional representation, and perception of difficult or cheap sellers. Buyers with agents also have less incentive to view FSBO homes if commission isn't guaranteed."
    }
  ];

  const structuredData = generateStructuredData.article(
    "FSBO vs Real Estate Agent: Complete Comparison Guide | 4Seasons Realty",
    "Comprehensive comparison of selling your home FSBO vs using a real estate agent. Cost analysis, success rates, and expert guidance for North Texas sellers.",
    "4Seasons Realty",
    "2024-01-01",
    "/fsbo-vs-agent"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SEO 
        title="FSBO vs Agent - Which is Right for You? | North Texas Real Estate"
        description="Complete comparison of FSBO vs using a real estate agent. Discover costs, success rates, common mistakes, and which option is best for your situation."
        keywords="FSBO vs agent, for sale by owner, real estate agent comparison, selling without agent, FSBO mistakes, agent commission, North Texas real estate"
        canonicalUrl="/fsbo-vs-agent"
        structuredData={structuredData}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ 
          backgroundImage: `url(${fsboVsAgentHeroImage})`,
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            FSBO vs Real Estate <span className="text-yellow-400">Agent</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white">
            Make an Informed Decision with Complete Cost & Success Analysis
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="text-white px-8 py-4 text-lg font-semibold hover:opacity-90" 
              style={{ backgroundColor: '#0d0d33' }}
            >
              <Calculator className="mr-2 h-5 w-5" />
              Compare Costs
            </Button>
            <Link href="/contact">
              <Button 
                className="bg-yellow-400 text-yellow-900 px-8 py-4 text-lg font-semibold hover:bg-yellow-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Get Expert Advice
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Smooth Transition */}
      <div className="h-8 bg-gradient-to-t from-gray-800 to-transparent"></div>

      {/* Animated Stats Section */}
      <section ref={statsRef} className="py-16 bg-[#1f2937] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {animatedStats.priceDifference}%
              </div>
              <div className="text-sm md:text-base text-gray-300">
                Less Than Market Value (FSBO Average)
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {animatedStats.daysOnMarket}
              </div>
              <div className="text-sm md:text-base text-gray-300">
                Extra Days on Market (FSBO)
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {animatedStats.successRate}%
              </div>
              <div className="text-sm md:text-base text-gray-300">
                Agent Success Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                ${animatedStats.avgSavings}K
              </div>
              <div className="text-sm md:text-base text-gray-300">
                Potential Commission Savings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Side-by-Side Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-left">
              Complete Side-by-Side Comparison
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-slate-600 text-left">
                Understand the real differences between FSBO and using an agent to make the best decision for your situation.
                This comprehensive comparison breaks down every aspect of the selling process.
              </p>
              <p className="text-lg text-slate-600 text-left">
                From marketing reach and legal protection to time investment and final sale price,
                see exactly how each approach affects your bottom line and selling experience.
              </p>
              <p className="text-lg text-slate-600 text-left">
                The data shows clear patterns in outcomes, costs, and seller satisfaction between
                these two approaches. Use this information to choose the path that aligns with your goals.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {comparisonData.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                  <CardTitle className="text-2xl text-center">{item.category}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    {/* FSBO Side */}
                    <div className="p-6 border-r border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">FSBO</h3>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-6 h-6 rounded-full ${
                                i < item.fsbo.rating ? 'bg-orange-400' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {item.fsbo.points.map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Agent Side */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">With Agent</h3>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-6 h-6 rounded-full ${
                                i < item.agent.rating ? 'bg-green-500' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {item.agent.points.map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common FSBO Mistakes */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">6 Costly FSBO Mistakes to Avoid</h2>
            <p className="text-xl text-gray-600">
              Learn from others' experiences to protect your investment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fsboMistakes.map((mistake, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <div className="p-3 bg-red-100 rounded-lg mr-4">
                      <mistake.icon className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-lg">{mistake.mistake}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-red-600 mb-1">Consequence:</p>
                      <p className="text-sm text-gray-600">{mistake.consequence}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-600 mb-1">Solution:</p>
                      <p className="text-sm text-gray-600">{mistake.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Breakdown Comparison */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The Real Cost Analysis</h2>
            <p className="text-xl text-gray-600">
              Why professional representation actually saves you money
            </p>
          </div>

          {/* Value Proposition Alert */}
          <div className="mb-12 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="flex items-start">
              <TrendingUp className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">The Bottom Line: Agents Generate Higher Net Proceeds</h3>
                <p className="text-gray-700 mb-3">
                  <strong>NAR Statistics Show:</strong> Agent-represented homes sell for an average of <strong>$60,000 MORE</strong> than FSBO properties (median sale price: $310,000 vs $250,000).
                </p>
                <p className="text-gray-700">
                  Even after paying commission, sellers using agents typically net <strong>$36,000-$48,000 MORE</strong> than FSBO sellers on a $400,000 home.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* FSBO Hidden Costs */}
            <Card className="border-2 border-orange-200">
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-2xl flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-2 text-orange-600" />
                  FSBO: The Hidden Costs
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {costBreakdown.fsbo.map((cost, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-700">{cost.item}</span>
                      <span className="font-semibold text-gray-900">{cost.range}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="p-3 bg-red-50 rounded">
                    <p className="text-sm text-red-900 font-semibold">Additional Hidden Costs:</p>
                    <ul className="text-sm text-red-800 mt-1 space-y-1">
                      <li>• Lost wages (40-80 hours of your time)</li>
                      <li>• Pricing mistakes (avg. 11% lower sale price)</li>
                      <li>• Extended holding costs (57+ extra days)</li>
                      <li>• Failed transactions (30% fall through)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-orange-100 rounded-lg border border-orange-300">
                  <p className="text-sm text-orange-900">
                    <strong>True Total Cost:</strong> 5-8% direct costs + 11% lower sale price = <strong>16-19% total loss</strong>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Agent Value */}
            <Card className="border-2 border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-2xl flex items-center">
                  <Award className="h-6 w-6 mr-2 text-green-600" />
                  Agent: Investment in Success
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {costBreakdown.agent.map((cost, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-700">{cost.item}</span>
                      <span className="font-semibold text-gray-900">{cost.range}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="p-3 bg-green-50 rounded">
                    <p className="text-sm text-green-900 font-semibold">Value-Added Benefits:</p>
                    <ul className="text-sm text-green-800 mt-1 space-y-1">
                      <li>• Higher sale price (avg. 11% more)</li>
                      <li>• Faster sale (39 days vs 96 days)</li>
                      <li>• Professional negotiation expertise</li>
                      <li>• Legal protection & E&O insurance</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-100 rounded-lg border border-green-300">
                  <p className="text-sm text-green-900">
                    <strong>Net Result:</strong> 5-6% commission generates <strong>11% higher sale price + faster sale</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ROI Comparison */}
          <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <h3 className="text-2xl font-bold text-center mb-6">Return on Investment Example: $400,000 Home</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-3 text-orange-600">FSBO Scenario</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Expected Sale Price (11% less):</span>
                    <span className="font-semibold">$356,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Buyer's Agent Commission (3%):</span>
                    <span className="text-red-600">-$10,680</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marketing & Legal Costs:</span>
                    <span className="text-red-600">-$3,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Extended Holding Costs (2 mo.):</span>
                    <span className="text-red-600">-$4,000</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold">
                    <span>Net Proceeds:</span>
                    <span className="text-orange-600">$337,820</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-3 text-green-600">Agent Scenario</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Professional Sale Price:</span>
                    <span className="font-semibold">$400,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Commission (6%):</span>
                    <span className="text-red-600">-$24,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marketing Costs:</span>
                    <span className="text-green-600">$0 (included)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Faster Sale Savings:</span>
                    <span className="text-green-600">+$2,000</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold">
                    <span>Net Proceeds:</span>
                    <span className="text-green-600">$378,000</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center p-4 bg-green-100 rounded-lg">
              <p className="text-xl font-bold text-green-800">
                Agent Advantage: <span className="text-2xl">+$40,180</span> More in Your Pocket
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <div className="flex items-start">
              <Lightbulb className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">The Smart Money Decision</h3>
                <p className="text-gray-700">
                  Professional agents don't cost you money – they <strong>make you money</strong>. The commission you pay is an investment that typically returns 2-3x in the form of a higher sale price, faster sale, and avoided mistakes. Don't be penny wise and pound foolish with your largest financial asset.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Scenarios */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Which Option Is Right for You?</h2>
            <p className="text-xl text-gray-600">
              Every situation is unique - find your best path
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {scenarios.map((scenario, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <scenario.icon className={`h-6 w-6 mr-2 ${scenario.color}`} />
                    {scenario.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {scenario.situations.map((situation, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className={`h-5 w-5 mr-2 flex-shrink-0 mt-0.5 ${scenario.color}`} />
                        <span className="text-gray-700">{situation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader className="bg-purple-50">
              <CardTitle className="text-2xl flex items-center justify-center">
                <Scale className="h-6 w-6 mr-2 text-purple-600" />
                Hybrid Approach: Best of Both Worlds
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-4">
                Consider these middle-ground options that combine FSBO savings with professional help:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Flat-Fee MLS</h4>
                  <p className="text-sm text-gray-600">
                    Pay $99-$500 for MLS listing while handling showings and negotiations yourself
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Limited Service Broker</h4>
                  <p className="text-sm text-gray-600">
                    Pay for specific services only (photos, contracts, negotiations) à la carte
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Discount Broker</h4>
                  <p className="text-sm text-gray-600">
                    Full service at reduced commission (typically 4-5% total instead of 6%)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Factors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Keys to Success</h2>
            <p className="text-xl text-gray-600">
              Critical factors for success with each approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* FSBO Success Factors */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-50">
                <CardTitle className="text-xl">FSBO Success Requirements</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-orange-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Time Availability</h4>
                      <p className="text-sm text-gray-600">40-80 hours for entire process</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <BookOpen className="h-5 w-5 text-orange-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Market Knowledge</h4>
                      <p className="text-sm text-gray-600">Understanding of local real estate trends</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-orange-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Negotiation Skills</h4>
                      <p className="text-sm text-gray-600">Ability to remain objective and firm</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-orange-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Legal Resources</h4>
                      <p className="text-sm text-gray-600">Access to real estate attorney</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Target className="h-5 w-5 text-orange-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Marketing Budget</h4>
                      <p className="text-sm text-gray-600">$2,000-5,000 for effective marketing</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agent Success Factors */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
                <CardTitle className="text-xl">Choosing the Right Agent</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Track Record</h4>
                      <p className="text-sm text-gray-600">Proven sales history in your area</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <BarChart3 className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Market Data</h4>
                      <p className="text-sm text-gray-600">Provides comprehensive CMA analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Marketing Plan</h4>
                      <p className="text-sm text-gray-600">Multi-channel marketing strategy</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Network</h4>
                      <p className="text-sm text-gray-600">Strong agent and buyer connections</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <HandshakeIcon className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Communication</h4>
                      <p className="text-sm text-gray-600">Responsive and transparent updates</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Get answers to common FSBO vs Agent questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="mb-4">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0d0d33] to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Need Help Deciding?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Get a free consultation to discuss your specific situation and discover 
            the best approach for maximizing your home's value.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-[#0d0d33] hover:bg-gray-100">
                <Phone className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/home-valuation">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-[#0d0d33]">
                <Calculator className="mr-2 h-5 w-5" />
                Get Home Valuation
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm text-gray-300">
            No obligation • Expert advice • Local market expertise
          </p>
        </div>
      </section>

      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
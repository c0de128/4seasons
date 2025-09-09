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
  BarChart3,
  TrendingUp,
  DollarSign,
  MapPin,
  Calculator,
  Home,
  Eye,
  Target,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Search,
  Award,
  Shield,
  Zap,
  LineChart,
  Building,
  Calendar,
  Phone,
  Download,
  Gauge,
  PieChart,
  Activity,
  Briefcase,
  Globe,
  Database
} from "lucide-react";

export default function MarketAnalysis() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    avgPrice: 0,
    daysOnMarket: 0,
    appreciation: 0,
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
            animateValue(0, 485, 1500, (val) => setAnimatedStats(prev => ({ ...prev, avgPrice: val })));
            animateValue(0, 24, 1500, (val) => setAnimatedStats(prev => ({ ...prev, daysOnMarket: val })));
            animateValue(0, 8, 1500, (val) => setAnimatedStats(prev => ({ ...prev, appreciation: val })));
            animateValue(0, 3, 1500, (val) => setAnimatedStats(prev => ({ ...prev, inventory: val })));
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

  const analysisBenefits = [
    {
      icon: Target,
      title: "Accurate Pricing",
      description: "Data-driven pricing strategies that maximize your return while ensuring competitive positioning",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Market Trends",
      description: "Real-time insights into market direction, seasonal patterns, and emerging opportunities",
      color: "text-green-600"
    },
    {
      icon: MapPin,
      title: "Neighborhood Insights",
      description: "Hyperlocal market data including school districts, amenities, and future developments",
      color: "text-purple-600"
    },
    {
      icon: Calculator,
      title: "Investment Analysis",
      description: "ROI calculations, rental yield analysis, and long-term investment potential assessment",
      color: "text-orange-600"
    },
    {
      icon: Clock,
      title: "Timing Optimization",
      description: "Market timing recommendations to buy or sell at the most advantageous moments",
      color: "text-pink-600"
    },
    {
      icon: Eye,
      title: "Competition Analysis",
      description: "Comprehensive review of comparable properties and competitive positioning strategies",
      color: "text-indigo-600"
    }
  ];

  const analysisComponents = [
    {
      icon: BarChart3,
      title: "Comparative Market Analysis (CMA)",
      description: "Detailed comparison of similar properties to determine accurate market value",
      features: [
        "Recently sold comparable properties",
        "Active listings and pricing strategies",
        "Market absorption rates",
        "Price per square foot analysis"
      ]
    },
    {
      icon: LineChart,
      title: "Price Trend Analysis",
      description: "Historical and projected price movements for informed decision making",
      features: [
        "12-month price history charts",
        "Seasonal market patterns",
        "Future price projections",
        "Market volatility assessment"
      ]
    },
    {
      icon: PieChart,
      title: "Market Segmentation Report",
      description: "Breakdown of buyer demographics and property type performance",
      features: [
        "Buyer profile analysis",
        "Property type performance",
        "Price range distributions",
        "Market share by segment"
      ]
    },
    {
      icon: Building,
      title: "Neighborhood Profile",
      description: "Comprehensive area analysis including schools, amenities, and development",
      features: [
        "School district ratings and boundaries",
        "Local amenities and services",
        "Transportation and accessibility",
        "Future development plans"
      ]
    }
  ];

  const marketTrends = [
    {
      trend: "Rising Demand in Suburban Areas",
      description: "Continued migration to suburbs driving up demand in Plano, Frisco, and McKinney",
      impact: "Positive",
      timeframe: "12+ months"
    },
    {
      trend: "New Construction Inventory",
      description: "Increased new home construction helping balance inventory levels",
      impact: "Stabilizing",
      timeframe: "6-18 months"
    },
    {
      trend: "Interest Rate Sensitivity",
      description: "Market responding to federal interest rate changes and monetary policy",
      impact: "Variable",
      timeframe: "Ongoing"
    },
    {
      trend: "Corporate Relocations",
      description: "Major employers continuing to relocate to North Texas metro",
      impact: "Positive",
      timeframe: "24+ months"
    }
  ];

  const dataSourcesAndMethodology = [
    {
      source: "Multiple Listing Service (MLS)",
      description: "Real-time property data, sales history, and market statistics",
      icon: Database
    },
    {
      source: "Public Records",
      description: "Property tax records, deed transfers, and ownership history",
      icon: FileText
    },
    {
      source: "Census & Economic Data",
      description: "Demographics, employment, and economic indicators",
      icon: Globe
    },
    {
      source: "Market Research Partners",
      description: "Third-party research firms and industry analytics",
      icon: Briefcase
    }
  ];

  const sampleReports = [
    {
      title: "Highland Park Luxury Market Report",
      description: "Premium property analysis for properties $1M+",
      context: "Comprehensive analysis of Highland Park's exclusive luxury real estate market, focusing on high-end properties with detailed comparables from University Park and Preston Hollow.",
      keyFindings: [
        "Luxury market shows strong resilience with consistent buyer demand",
        "Properties with recent renovations selling 15% above comps",
        "International buyers represent 25% of luxury transactions",
        "Private school proximity adds 8-12% premium to home values"
      ],
      metrics: {
        avgPrice: "$1,850K",
        daysOnMarket: 45,
        priceChange: "+12%",
        totalSales: 147,
        priceRange: "$1.2M - $4.8M",
        inventory: "2.8 months"
      },
      scope: "Last 6 months",
      dataPoints: "450+ comparable sales analyzed",
      marketTrend: "Strong Seller's Market",
      recommendation: "Optimal time for luxury sellers to maximize value"
    },
    {
      title: "Frisco Family Home Analysis",
      description: "Single-family homes in top-rated school districts",
      context: "In-depth study of family-oriented neighborhoods in Frisco, analyzing the correlation between school ratings, home values, and market velocity in this rapidly growing suburb.",
      keyFindings: [
        "Homes in 9+ rated school zones command 18% premium",
        "New construction outpacing resale market by 2:1 ratio",
        "Corporate relocations driving 40% of buyer activity",
        "Energy-efficient homes selling 12 days faster on average"
      ],
      metrics: {
        avgPrice: "$625K",
        daysOnMarket: 18,
        priceChange: "+8%",
        totalSales: 892,
        priceRange: "$425K - $950K",
        inventory: "1.4 months"
      },
      scope: "Last 3 months",
      dataPoints: "1,200+ transactions evaluated",
      marketTrend: "Competitive Buyer's Market",
      recommendation: "Buyers should act quickly with strong offers"
    },
    {
      title: "Investment Property Study",
      description: "Rental market analysis and yield calculations",
      context: "Comprehensive investment analysis covering rental properties across Dallas-Fort Worth metroplex, including cap rates, cash flow projections, and long-term appreciation forecasts.",
      keyFindings: [
        "Average rental yields increased to 7.2% annually",
        "Single-family rentals outperforming condos by 1.8%",
        "Suburban properties showing strongest appreciation potential",
        "REI market benefits from corporate relocation trends"
      ],
      metrics: {
        avgPrice: "$385K",
        daysOnMarket: 32,
        priceChange: "+5%",
        totalSales: 1247,
        priceRange: "$185K - $650K",
        inventory: "3.2 months"
      },
      scope: "Last 12 months",
      dataPoints: "2,500+ investment transactions analyzed",
      marketTrend: "Stable Investment Climate",
      recommendation: "Focus on cash-flowing properties in growth corridors"
    }
  ];

  const faqData = [
    {
      question: "What's included in a market analysis report?",
      answer: "Our comprehensive market analysis includes comparable sales data, current market trends, pricing recommendations, neighborhood insights, and detailed property valuations. We also provide market timing advice and competitive positioning strategies."
    },
    {
      question: "How often should I get a market analysis?",
      answer: "We recommend quarterly market updates for active investors and sellers. For general homeowners, an annual analysis helps track property value changes and market conditions in your area."
    },
    {
      question: "How accurate are your market valuations?",
      answer: "Our market analyses typically achieve 95%+ accuracy within 5% of actual sale prices. We use multiple data sources including MLS, public records, and real-time market indicators to ensure precision."
    },
    {
      question: "Do you provide market analysis for investment properties?",
      answer: "Yes, we specialize in investment property analysis including rental yield calculations, cash flow projections, appreciation forecasts, and comparative investment opportunities in the North Texas market."
    },
    {
      question: "Can I get market analysis for specific neighborhoods?",
      answer: "Absolutely. We provide hyperlocal market analysis for specific neighborhoods, subdivisions, and even individual streets. Our analysis includes micro-market trends and neighborhood-specific factors."
    },
    {
      question: "How long does it take to receive a market analysis?",
      answer: "Standard market analysis reports are delivered within 24-48 hours. Rush reports for urgent decisions can be provided within 4-6 hours for an additional fee."
    }
  ];

  const currentUrl = `${seoConfig.siteUrl}/market-analysis`;
  const structuredData = generateStructuredData.service(
    "Market Analysis Services",
    "Professional real estate market analysis and valuation services for North Texas properties",
    ["market analysis", "property valuation", "CMA", "real estate analytics", "market trends"]
  );

  return (
    <>
      <SEO 
        title="Professional Market Analysis & Property Valuation | North Texas Real Estate | 4Seasons"
        description="Expert market analysis and property valuations for North Texas real estate. Get comprehensive CMA reports, market trends, and investment analysis from experienced professionals."
        keywords="market analysis, property valuation, CMA, North Texas real estate, market trends, property appraisal, investment analysis, real estate analytics"
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
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Professional Market Analysis
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Data-Driven Market Insights for
                <span className="text-blue-400"> Smarter Real Estate Decisions</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                Get comprehensive market analysis, accurate property valuations, and strategic insights 
                to make informed buying, selling, and investment decisions in North Texas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="text-white px-8 py-4 text-lg font-semibold hover:opacity-90" 
                          style={{ backgroundColor: '#0d0d33' }}>
                    <Download className="w-5 h-5 mr-2" />
                    Get Free Market Analysis
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900"
                  onClick={() => document.getElementById('analysis-components')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Our Reports
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
                  ${animatedStats.avgPrice}K
                </div>
                <p className="text-slate-300 text-sm md:text-base">Average Home Price</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {animatedStats.daysOnMarket}
                </div>
                <p className="text-slate-300 text-sm md:text-base">Days on Market</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {animatedStats.appreciation}%
                </div>
                <p className="text-slate-300 text-sm md:text-base">Annual Appreciation</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {animatedStats.inventory}.{Math.floor((animatedStats.inventory % 1) * 10)}
                </div>
                <p className="text-slate-300 text-sm md:text-base">Months Inventory</p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Analysis Benefits */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Market Analysis Matters
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Make informed real estate decisions with comprehensive market insights, 
                accurate valuations, and strategic analysis tailored to your needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {analysisBenefits.map((benefit, index) => (
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

        {/* Analysis Components */}
        <section id="analysis-components" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Comprehensive Analysis Components
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our market analysis includes multiple data points and research methodologies 
                to provide the most accurate and actionable insights.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {analysisComponents.map((component, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow border-slate-200">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                        <component.icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl text-slate-900">{component.title}</CardTitle>
                    </div>
                    <p className="text-slate-600">{component.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {component.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Market Trends */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Current North Texas Market Trends
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Stay informed about the latest market developments and their impact 
                on your real estate decisions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {marketTrends.map((trend, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-slate-900 flex-1">{trend.trend}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        trend.impact === 'Positive' ? 'bg-green-100 text-green-800' :
                        trend.impact === 'Stabilizing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {trend.impact}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-3">{trend.description}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      <span>Timeframe: {trend.timeframe}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Data Sources & Methodology */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Data Sources & Methodology
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We use multiple authoritative data sources and proven analytical methods 
                to ensure accuracy and reliability in our market analysis.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dataSourcesAndMethodology.map((source, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-slate-200">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="inline-flex p-4 bg-slate-100 text-slate-600 rounded-full">
                        <source.icon className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">{source.source}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{source.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Reports */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Sample Market Reports
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Detailed examples of our comprehensive market analysis reports across different 
                property types and market segments. Each report includes extensive data analysis, 
                key findings, and strategic recommendations.
              </p>
            </div>
            
            <div className="space-y-12">
              {sampleReports.map((report, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow border-slate-200 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl text-slate-900 mb-2">{report.title}</CardTitle>
                        <p className="text-slate-600 mb-3">{report.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`px-3 py-1 rounded-full font-medium ${
                            report.marketTrend.includes('Seller') ? 'bg-green-100 text-green-800' :
                            report.marketTrend.includes('Buyer') ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {report.marketTrend}
                          </span>
                          <span className="text-slate-500">{report.dataPoints}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Context */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-2">Market Context</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{report.context}</p>
                    </div>

                    {/* Key Metrics */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3">Key Metrics</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-slate-900">{report.metrics.avgPrice}</div>
                          <div className="text-xs text-slate-600">Average Price</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-slate-900">{report.metrics.daysOnMarket}</div>
                          <div className="text-xs text-slate-600">Days on Market</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{report.metrics.priceChange}</div>
                          <div className="text-xs text-slate-600">Price Change</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-slate-900">{report.metrics.totalSales}</div>
                          <div className="text-xs text-slate-600">Total Sales</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-lg font-bold text-slate-900">{report.metrics.priceRange}</div>
                          <div className="text-xs text-slate-600">Price Range</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl font-bold text-slate-900">{report.metrics.inventory}</div>
                          <div className="text-xs text-slate-600">Inventory</div>
                        </div>
                      </div>
                    </div>

                    {/* Key Findings */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3">Key Findings</h4>
                      <ul className="space-y-2">
                        {report.keyFindings.map((finding, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700 text-sm">{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Summary */}
                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-slate-900">Strategic Recommendation:</span>
                          </div>
                          <p className="text-sm text-slate-600">{report.recommendation}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-slate-500">Analysis Period</div>
                          <div className="font-semibold text-slate-700">{report.scope}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/contact">
                <Button className="text-white px-8 py-3 text-lg font-semibold hover:opacity-90" 
                        style={{ backgroundColor: '#0d0d33' }}>
                  <Download className="w-5 h-5 mr-2" />
                  Request Your Custom Market Report
                </Button>
              </Link>
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
                Common questions about our market analysis services and methodologies
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
              Get Your Custom Market Analysis Today
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Make informed real estate decisions with professional market analysis 
              tailored to your specific property and investment goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-50">
                  <Phone className="w-5 h-5 mr-2" />
                  Request Analysis
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
                <Gauge className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <h3 className="font-semibold mb-2">95%+ Accuracy</h3>
                <p className="text-sm text-blue-200">Our valuations are accurate within 5% of sale price</p>
              </div>
              <div>
                <Clock className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <h3 className="font-semibold mb-2">24-48 Hour Delivery</h3>
                <p className="text-sm text-blue-200">Fast turnaround on comprehensive analysis reports</p>
              </div>
              <div>
                <Award className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <h3 className="font-semibold mb-2">Expert Analysis</h3>
                <p className="text-sm text-blue-200">Professional insights from experienced market analysts</p>
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
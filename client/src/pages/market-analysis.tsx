import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import marketAnalysisHeroImage from "@/assets/images/hero-images/64755.jpg";
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAddress: '',
    analysisType: '',
    propertyType: '',
    timeline: '',
    analysisGoal: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Market analysis consultation form submitted:", formData);
    // Handle form submission here
  };


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
        <section 
          className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(${marketAnalysisHeroImage})`,
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Data-Driven Market Insights for
                <span className="text-yellow-400"> Smarter Real Estate Decisions</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                Get comprehensive market analysis, accurate property valuations, and strategic insights 
                to make informed buying, selling, and investment decisions in North Texas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="text-white px-8 py-4 text-lg font-semibold hover:opacity-90 shadow-lg backdrop-blur-sm" 
                          style={{ backgroundColor: '#0d0d33', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                    <Download className="w-5 h-5 mr-2" />
                    Get Free Market Analysis
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-black/20 backdrop-blur-sm shadow-lg"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                  onClick={() => document.getElementById('analysis-components')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Our Reports
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Smooth Transition */}
        <div className="h-8 bg-gradient-to-t from-gray-800 to-transparent"></div>


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
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-slate-900">{benefit.title}</h3>
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
                    <div className="mb-3">
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
          </div>
        </section>



        {/* Market Analysis Consultation Form */}
        <section id="contact" className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Get Your Market Analysis Report
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Request a comprehensive market analysis tailored to your property and investment goals. 
                Our expert team will provide data-driven insights to help you make informed real estate decisions.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="analysis-name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    id="analysis-name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="w-full"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="analysis-email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    id="analysis-email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="w-full"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="analysis-phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    id="analysis-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full"
                    placeholder="(214) 555-0123"
                  />
                </div>

                <div>
                  <label htmlFor="analysis-address" className="block text-sm font-medium text-slate-700 mb-2">
                    Property Address
                  </label>
                  <Input
                    type="text"
                    id="analysis-address"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                    className="w-full"
                    placeholder="123 Main St, City, TX"
                  />
                </div>

                <div>
                  <label htmlFor="analysis-type" className="block text-sm font-medium text-slate-700 mb-2">
                    Analysis Type
                  </label>
                  <select
                    id="analysis-type"
                    name="analysisType"
                    value={formData.analysisType}
                    onChange={(e) => handleInputChange('analysisType', e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select analysis type</option>
                    <option value="cma">Comparative Market Analysis (CMA)</option>
                    <option value="investment">Investment Property Analysis</option>
                    <option value="neighborhood">Neighborhood Market Report</option>
                    <option value="pricing">Pricing Strategy Analysis</option>
                    <option value="comprehensive">Comprehensive Market Study</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="analysis-property-type" className="block text-sm font-medium text-slate-700 mb-2">
                    Property Type
                  </label>
                  <select
                    id="analysis-property-type"
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
                    <option value="commercial">Commercial Property</option>
                    <option value="land">Land/Lot</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="analysis-timeline" className="block text-sm font-medium text-slate-700 mb-2">
                    Timeline
                  </label>
                  <select
                    id="analysis-timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select timeline</option>
                    <option value="rush">Rush (4-6 hours)</option>
                    <option value="standard">Standard (24-48 hours)</option>
                    <option value="detailed">Detailed (3-5 days)</option>
                    <option value="no-rush">No rush, when convenient</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="analysis-goal" className="block text-sm font-medium text-slate-700 mb-2">
                    Analysis Goal
                  </label>
                  <select
                    id="analysis-goal"
                    name="analysisGoal"
                    value={formData.analysisGoal}
                    onChange={(e) => handleInputChange('analysisGoal', e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select primary goal</option>
                    <option value="selling">Preparing to sell property</option>
                    <option value="buying">Considering property purchase</option>
                    <option value="investment">Investment opportunity evaluation</option>
                    <option value="refinancing">Refinancing considerations</option>
                    <option value="market-timing">Market timing strategy</option>
                    <option value="portfolio">Portfolio analysis</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="analysis-message" className="block text-sm font-medium text-slate-700 mb-2">
                    Additional details about your analysis needs
                  </label>
                  <Textarea
                    id="analysis-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full"
                    placeholder="Tell us about your specific analysis requirements, comparable properties to consider, market concerns, investment criteria, or any other relevant details..."
                  />
                </div>

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="w-full bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors py-3 text-lg font-medium"
                  >
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Request My Market Analysis
                  </Button>
                  <p className="text-xs text-slate-500 mt-4 text-center">
                    By submitting this form, you agree to receive communications from 4Seasons Real Estate 
                    regarding your market analysis request. We respect your privacy and will not share 
                    your information with third parties.
                  </p>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <p><strong>95%+ Accuracy</strong><br />Precise valuations you can trust</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <p><strong>Fast Delivery</strong><br />24-48 hour standard turnaround</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <p><strong>Comprehensive Data</strong><br />Multiple sources and methodologies</p>
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
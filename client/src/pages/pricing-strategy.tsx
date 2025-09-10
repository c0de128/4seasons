import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
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
  ArrowRight,
  Zap,
  Shield,
  Award,
  Eye,
  Lightbulb
} from "lucide-react";

export default function PricingStrategy() {
  const [pricingContactFormData, setPricingContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAddress: '',
    propertyValue: '',
    sellingTimeline: '',
    pricingConcerns: '',
    message: ''
  });

  const handlePricingContactChange = (field: string, value: string) => {
    setPricingContactFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePricingContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pricing consultation form submitted:', pricingContactFormData);
  };
  
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

      {/* Pricing Factors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Key Factors That Drive Your Home's Value
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
              Understanding these critical factors helps position your property competitively in the market. 
              Each factor contributes differently to your home's final value.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg max-w-2xl mx-auto">
              <p className="text-sm text-blue-800">
                <strong>Impact Analysis:</strong> Based on North Texas market data and thousands of home sales
              </p>
            </div>
          </div>

          {/* Major Factors - Top 2 with highest impact */}
          <div className="space-y-6 mb-12">
            {pricingFactors.slice(0, 2).map((factor, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-blue-200">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-12 gap-6 items-center">
                    {/* Impact Badge */}
                    <div className="lg:col-span-2 text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 mb-3">
                        <span className="text-2xl font-bold text-white">{factor.impact}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">IMPACT</p>
                    </div>

                    {/* Factor Content */}
                    <div className="lg:col-span-6">
                      <div className="mb-3">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{factor.title}</h3>
                        <p className="text-slate-600">{factor.description}</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-4">
                      <h4 className="font-semibold text-slate-900 mb-3">Key Considerations:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {factor.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Secondary Factors - Remaining 3 in grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {pricingFactors.slice(2).map((factor, index) => (
              <Card key={index + 2} className="hover:shadow-lg transition-shadow border-slate-200 relative">
                <CardContent className="p-6">
                  {/* Impact Badge - Top Right */}
                  <div className="absolute top-4 right-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                      <span className="text-lg font-bold text-white">{factor.impact}</span>
                    </div>
                  </div>

                  {/* Factor Header */}
                  <div className="mb-4 pr-16">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{factor.title}</h3>
                    <p className="text-slate-600 text-sm">{factor.description}</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    {factor.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-xs text-slate-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Strategic Pricing Insight
              </h3>
              <p className="text-slate-600 max-w-3xl mx-auto">
                The top two factors (Location & Property Condition) account for <strong>60% of your home's value</strong>. 
                While you can't change location, strategic improvements to property condition can significantly impact your sale price. 
                Our pricing strategy considers all these factors to position your home competitively.
              </p>
            </div>
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Avoid These Costly Pricing Mistakes
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
              These common pricing errors have cost sellers thousands of dollars and months of time. 
              Learn how to avoid them and price strategically from the start.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg max-w-2xl mx-auto border border-slate-200">
              <p className="text-sm text-slate-700">
                <strong>Real Impact:</strong> Poor pricing can reduce your final sale price by 5-15% and add 60+ days to your selling timeline
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {pricingMistakes.map((item, index) => (
              <Card key={index} className="border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                    {/* Mistake Number */}
                    <div className="lg:col-span-1 text-center flex flex-col justify-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg mb-2" style={{ backgroundColor: '#0d0d33' }}>
                        {index + 1}
                      </div>
                      <p className="text-xs text-slate-500 font-medium">MISTAKE</p>
                    </div>

                    {/* Mistake Content */}
                    <div className="lg:col-span-4">
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 h-full">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">The Mistake</h3>
                        <p className="text-slate-700 font-medium">{item.mistake}</p>
                      </div>
                    </div>

                    {/* Consequence */}
                    <div className="lg:col-span-3">
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 h-full">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">The Impact</h3>
                        <p className="text-slate-700">{item.consequence}</p>
                      </div>
                    </div>

                    {/* Solution */}
                    <div className="lg:col-span-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 h-full">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">The Solution</h3>
                        <p className="text-slate-700 font-medium">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Section */}
          <div className="mt-16 bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Strategic Pricing Guidance
              </h3>
              <p className="text-slate-600 max-w-3xl mx-auto mb-8">
                Our pricing experts have seen these mistakes countless times. Let us help you avoid them 
                with a data-driven pricing strategy that positions your home competitively from day one.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                  Get Expert Pricing Analysis
                </Button>
                <Button variant="outline" className="border-2 border-slate-900 text-slate-900 px-8 py-4 text-lg font-semibold hover:bg-slate-900 hover:text-white">
                  Schedule Consultation
                </Button>
              </div>
            </div>
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

      {/* Pricing Strategy Consultation Form */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Get Your Strategic Pricing Consultation
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ready to price your home strategically? Our pricing experts will analyze your property and market conditions 
              to create a data-driven pricing strategy that maximizes your return and minimizes time on market.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handlePricingContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="pricing-name">Full Name *</Label>
                  <Input
                    id="pricing-name"
                    type="text"
                    value={pricingContactFormData.name}
                    onChange={(e) => handlePricingContactChange('name', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pricing-email">Email Address *</Label>
                  <Input
                    id="pricing-email"
                    type="email"
                    value={pricingContactFormData.email}
                    onChange={(e) => handlePricingContactChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="pricing-phone">Phone Number *</Label>
                  <Input
                    id="pricing-phone"
                    type="tel"
                    value={pricingContactFormData.phone}
                    onChange={(e) => handlePricingContactChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pricing-address">Property Address</Label>
                  <Input
                    id="pricing-address"
                    type="text"
                    value={pricingContactFormData.propertyAddress}
                    onChange={(e) => handlePricingContactChange('propertyAddress', e.target.value)}
                    placeholder="123 Main St, City, TX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="pricing-value">Expected Property Value</Label>
                  <Input
                    id="pricing-value"
                    type="text"
                    value={pricingContactFormData.propertyValue}
                    onChange={(e) => handlePricingContactChange('propertyValue', e.target.value)}
                    placeholder="$450,000"
                  />
                </div>
                <div>
                  <Label htmlFor="pricing-timeline">Selling Timeline</Label>
                  <Input
                    id="pricing-timeline"
                    type="text"
                    value={pricingContactFormData.sellingTimeline}
                    onChange={(e) => handlePricingContactChange('sellingTimeline', e.target.value)}
                    placeholder="3-6 months, ASAP, just exploring, etc."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pricing-concerns">Pricing Concerns or Goals</Label>
                <Input
                  id="pricing-concerns"
                  type="text"
                  value={pricingContactFormData.pricingConcerns}
                  onChange={(e) => handlePricingContactChange('pricingConcerns', e.target.value)}
                  placeholder="Maximize profit, sell quickly, competitive market, unique property, etc."
                />
              </div>

              <div>
                <Label htmlFor="pricing-message">Additional Questions or Information</Label>
                <Textarea
                  id="pricing-message"
                  value={pricingContactFormData.message}
                  onChange={(e) => handlePricingContactChange('message', e.target.value)}
                  placeholder="Tell us about your property, specific pricing concerns, market questions, or anything else that would help us provide the best pricing strategy..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors py-3 text-lg font-medium"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Get My Strategic Pricing Analysis
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Market Analysis</strong><br />Comprehensive CMA & trends</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Strategic Positioning</strong><br />Optimal price point</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Maximize Returns</strong><br />Data-driven pricing</p>
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import listingProcessHeroImage from "@/assets/images/hero-images/303750.jpg";
import { 
  CheckCircle,
  Home,
  Camera,
  FileText,
  Users,
  TrendingUp,
  DollarSign,
  Eye,
  HandshakeIcon,
  Search,
  Calendar,
  MapPin,
  Clock,
  AlertCircle,
  Calculator
} from "lucide-react";

export default function ListingProcess() {
  const [listingContactFormData, setListingContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAddress: '',
    propertyType: '',
    listingTimeline: '',
    sellingReason: '',
    message: ''
  });

  const handleListingContactChange = (field: string, value: string) => {
    setListingContactFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleListingContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Listing consultation form submitted:', listingContactFormData);
  };
  
  const listingSteps = [
    {
      number: 1,
      title: "Prepare Your Home",
      icon: Home,
      timeframe: "1-2 weeks",
      description: "Get your property market-ready with staging, repairs, and improvements that maximize value.",
      details: [
        "Complete necessary repairs and maintenance",
        "Deep clean entire property",
        "Stage rooms to highlight best features",
        "Improve curb appeal with landscaping",
        "Declutter and depersonalize spaces"
      ],
      tips: [
        "First impressions matter - focus on entryway and exterior",
        "Neutral colors appeal to more buyers",
        "Remove personal items to help buyers envision themselves"
      ]
    },
    {
      number: 2,
      title: "Professional Valuation",
      icon: TrendingUp,
      timeframe: "2-3 days",
      description: "Determine the optimal listing price through comprehensive market analysis and property evaluation.",
      details: [
        "Comparative Market Analysis (CMA)",
        "Property condition assessment",
        "Market trends evaluation",
        "Pricing strategy development",
        "Competition analysis"
      ],
      tips: [
        "Price competitively from the start to attract serious buyers",
        "Consider recent sales within 3-6 months",
        "Factor in unique property features and improvements"
      ]
    },
    {
      number: 3,
      title: "Marketing Strategy",
      icon: Camera,
      timeframe: "3-5 days",
      description: "Create compelling marketing materials to showcase your property across multiple channels.",
      details: [
        "Professional photography session",
        "Virtual tour creation",
        "Property description writing",
        "Marketing material design",
        "Online listing optimization"
      ],
      tips: [
        "High-quality photos can increase showing requests by 60%",
        "Virtual tours help pre-qualify serious buyers",
        "Highlight unique features and neighborhood amenities"
      ]
    },
    {
      number: 4,
      title: "List Your Property",
      icon: FileText,
      timeframe: "1-2 days",
      description: "Officially list your property on MLS and major real estate platforms with all required documentation.",
      details: [
        "MLS listing creation and activation",
        "Property disclosure completion",
        "HOA documentation gathering",
        "Title and deed verification",
        "Listing agreement execution"
      ],
      tips: [
        "Complete disclosure protects you legally",
        "MLS exposure reaches 90% of active buyers",
        "Accurate property details prevent delays later"
      ]
    },
    {
      number: 5,
      title: "Manage Showings",
      icon: Eye,
      timeframe: "Ongoing",
      description: "Coordinate property showings and open houses while collecting valuable buyer feedback.",
      details: [
        "Showing schedule coordination",
        "Open house planning and hosting",
        "Buyer feedback collection",
        "Security and safety protocols",
        "Property maintenance during showings"
      ],
      tips: [
        "Be flexible with showing times to accommodate buyers",
        "Keep property show-ready at all times",
        "Consider buyer feedback for potential adjustments"
      ]
    },
    {
      number: 6,
      title: "Receive & Negotiate Offers",
      icon: HandshakeIcon,
      timeframe: "Variable",
      description: "Evaluate incoming offers and negotiate terms to secure the best deal for your property.",
      details: [
        "Offer evaluation and comparison",
        "Buyer qualification verification",
        "Counteroffer strategy development",
        "Terms and conditions negotiation",
        "Contract acceptance and signing"
      ],
      tips: [
        "Consider all terms, not just price",
        "Verify buyer's financing pre-approval",
        "Quick response shows seller motivation"
      ]
    },
    {
      number: 7,
      title: "Navigate Inspections",
      icon: Search,
      timeframe: "1-2 weeks",
      description: "Manage the inspection process and negotiate any repair requests to keep the sale on track.",
      details: [
        "Inspection scheduling and coordination",
        "Report review and analysis",
        "Repair negotiation strategy",
        "Contractor coordination if needed",
        "Re-inspection management"
      ],
      tips: [
        "Address major issues before listing when possible",
        "Be prepared to negotiate on inspection items",
        "Quick responses keep transactions moving"
      ]
    },
    {
      number: 8,
      title: "Complete the Sale",
      icon: CheckCircle,
      timeframe: "2-4 weeks",
      description: "Navigate the final steps from appraisal through closing to successfully transfer ownership.",
      details: [
        "Appraisal coordination and review",
        "Final walkthrough preparation",
        "Closing document preparation",
        "Utility transfer coordination",
        "Key and garage remote handover"
      ],
      tips: [
        "Keep property in same condition as when sold",
        "Be present for final walkthrough if possible",
        "Have all warranties and manuals ready for buyer"
      ]
    }
  ];

  const requiredDocs = [
    "Property deed and title information",
    "Property tax records (last 2 years)",
    "Homeowners insurance policy",
    "HOA documentation and fees",
    "Property surveys and plot plans",
    "Warranty information for appliances/systems",
    "Utility bills (last 12 months)",
    "Home improvement receipts and permits",
    "Property disclosure forms",
    "Lead paint disclosure (if built before 1978)"
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Complete Home Listing Process Guide - Sell Your Property | 4Seasons Real Estate"
        description="Step-by-step guide to listing your home for sale in North Texas. From preparation to closing, learn the complete process to successfully sell your property."
        keywords="home listing process Dallas, sell house North Texas, property listing guide, real estate selling process, home selling steps, list property DFW, selling timeline Texas"
        canonicalUrl={`${seoConfig.siteUrl}/listing-process`}
        ogTitle="Complete Home Listing Process - Your Step-by-Step Selling Guide"
        ogDescription="Master the home selling process with our comprehensive guide. From preparation to closing, we'll help you navigate each step successfully."
        ogImage={`${seoConfig.siteUrl}/images/listing-process-guide.jpg`}
        structuredData={generateStructuredData.service("Home Listing Process Guide", "Comprehensive step-by-step guide to listing and selling your property in Dallas-Fort Worth area, including preparation, pricing, marketing, and closing.")}
      />
      <Navigation />

      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${listingProcessHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
              Your Complete Guide to
              <span className="text-yellow-400 block" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Listing Your Property</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
              Navigate the home selling process with confidence. Our step-by-step guide covers everything 
              from preparation to closing, ensuring you get maximum value for your North Texas property.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <TrendingUp className="w-5 h-5 mr-2" />
                Get Free Home Valuation
              </Button>
              <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-transparent">
                <Users className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
        
        {/* Subtle transition gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </section>

      {/* Timeline Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-left">
              The 8-Step Listing Process
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-slate-600 text-left">
                From preparation to closing, here's your complete roadmap to successfully selling your property.
                Each step is designed to maximize your home's value and minimize time on market.
              </p>
              <p className="text-lg text-slate-600 text-left">
                Our proven process has helped hundreds of North Texas homeowners achieve successful sales,
                often selling faster and for more money than the average market time. We guide you through
                each phase with expert advice, professional resources, and personalized support.
              </p>
              <p className="text-lg text-slate-600 text-left">
                Whether you're a first-time seller or have sold before, this comprehensive guide ensures
                you understand what to expect, when to expect it, and how to make decisions that protect
                your interests and maximize your financial outcome.
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-12">
            {listingSteps.map((step, index) => (
              <Card key={step.number} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid lg:grid-cols-12 gap-0">
                  {/* Step Number and Icon */}
                  <div className="lg:col-span-2 bg-slate-50 p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mb-3">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-[#0d0d33] mb-1">Step {step.number}</div>
                    <div className="text-sm text-slate-600 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {step.timeframe}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="lg:col-span-10 p-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-lg text-slate-600 mb-4">{step.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Details */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Key Activities:</h4>
                        <ul className="space-y-1">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start text-slate-600">
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tips */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Pro Tips:</h4>
                        <ul className="space-y-1">
                          {step.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start text-slate-600">
                              <AlertCircle className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documentation */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Required Documentation Checklist
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Having these documents ready will streamline the listing process and prevent delays. 
                We'll help you gather any missing documentation.
              </p>
              
              <Button 
                className="px-6 py-3 text-lg font-semibold text-white hover:opacity-90" 
                style={{ backgroundColor: '#0d0d33' }}
                onClick={() => window.open('/pdfs/home-listing-process-checklist.pdf', '_blank')}
              >
                <FileText className="w-5 h-5 mr-2" />
                Download Checklist PDF
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Essential Documents</h3>
                <div className="space-y-3">
                  {requiredDocs.map((doc, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{doc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cost Breakdown */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Understanding Selling Costs
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Know what to expect so you can plan accordingly. We'll provide a detailed, 
              personalized cost analysis based on your specific situation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <DollarSign className="w-12 h-12 text-[#0d0d33] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Real Estate Commission</h3>
                <div className="text-2xl font-bold text-[#0d0d33] mb-2">5-6%</div>
                <p className="text-sm text-slate-600">Split between listing and buyer's agents</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <FileText className="w-12 h-12 text-[#0d0d33] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Closing Costs</h3>
                <div className="text-2xl font-bold text-[#0d0d33] mb-2">1-2%</div>
                <p className="text-sm text-slate-600">Title insurance, attorney fees, transfer taxes</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Home className="w-12 h-12 text-[#0d0d33] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Preparation Costs</h3>
                <div className="text-2xl font-bold text-[#0d0d33] mb-2">1-3%</div>
                <p className="text-sm text-slate-600">Staging, repairs, photography, cleaning</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Calculator className="w-12 h-12 text-[#0d0d33] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Total Estimated</h3>
                <div className="text-2xl font-bold text-[#0d0d33] mb-2">7-11%</div>
                <p className="text-sm text-slate-600">Of final sale price</p>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Listing Consultation Form */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to List Your Property?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Let's start your listing journey! Our experienced team will guide you through each step of the process, 
              from pricing strategy to closing, ensuring you get maximum value for your property.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleListingContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="listing-name">Full Name *</Label>
                  <Input
                    id="listing-name"
                    type="text"
                    value={listingContactFormData.name}
                    onChange={(e) => handleListingContactChange('name', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="listing-email">Email Address *</Label>
                  <Input
                    id="listing-email"
                    type="email"
                    value={listingContactFormData.email}
                    onChange={(e) => handleListingContactChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="listing-phone">Phone Number *</Label>
                  <Input
                    id="listing-phone"
                    type="tel"
                    value={listingContactFormData.phone}
                    onChange={(e) => handleListingContactChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="listing-address">Property Address</Label>
                  <Input
                    id="listing-address"
                    type="text"
                    value={listingContactFormData.propertyAddress}
                    onChange={(e) => handleListingContactChange('propertyAddress', e.target.value)}
                    placeholder="123 Main St, City, TX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="listing-type">Property Type</Label>
                  <Input
                    id="listing-type"
                    type="text"
                    value={listingContactFormData.propertyType}
                    onChange={(e) => handleListingContactChange('propertyType', e.target.value)}
                    placeholder="Single family, townhome, condo, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="listing-timeline">Listing Timeline</Label>
                  <Input
                    id="listing-timeline"
                    type="text"
                    value={listingContactFormData.listingTimeline}
                    onChange={(e) => handleListingContactChange('listingTimeline', e.target.value)}
                    placeholder="Immediately, 1-3 months, exploring options, etc."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="listing-reason">Reason for Selling</Label>
                <Input
                  id="listing-reason"
                  type="text"
                  value={listingContactFormData.sellingReason}
                  onChange={(e) => handleListingContactChange('sellingReason', e.target.value)}
                  placeholder="Relocating, upsizing, downsizing, investment, etc."
                />
              </div>

              <div>
                <Label htmlFor="listing-message">Questions or Additional Information</Label>
                <Textarea
                  id="listing-message"
                  value={listingContactFormData.message}
                  onChange={(e) => handleListingContactChange('message', e.target.value)}
                  placeholder="Tell us about your property, any specific concerns about the listing process, or questions you have about selling in today's market..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors py-3 text-lg font-medium"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Start My Listing Consultation
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Market Analysis</strong><br />Professional pricing strategy</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Professional Marketing</strong><br />Maximum property exposure</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <HandshakeIcon className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Expert Negotiation</strong><br />Best deal for your sale</p>
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
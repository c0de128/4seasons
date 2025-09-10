import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import homeValuationHeroImage from "@/assets/images/hero-images/2918.jpg";
import { 
  Calculator,
  TrendingUp,
  MapPin,
  Calendar,
  FileText,
  CheckCircle,
  Home,
  BarChart3,
  Clock
} from "lucide-react";

export default function HomeValuation() {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    zipCode: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    lotSize: "",
    yearBuilt: "",
    propertyCondition: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    timeline: "",
    comments: ""
  });

  const [valuationContactFormData, setValuationContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAddress: '',
    estimatedValue: '',
    sellingTimeline: '',
    valuationPurpose: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleValuationContactChange = (field: string, value: string) => {
    setValuationContactFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleValuationContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Valuation consultation form submitted:', valuationContactFormData);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Free Home Valuation - Discover Your Property's Market Value | 4Seasons Real Estate"
        description="Get an accurate, professional home valuation in Dallas-Fort Worth. Free property analysis from experienced North Texas real estate experts. Know your home's worth today."
        keywords="free home valuation Dallas, property value estimate DFW, home worth calculator Texas, real estate appraisal Allen, house value assessment Plano, market analysis North Texas"
        canonicalUrl={`${seoConfig.siteUrl}/home-valuation`}
        ogTitle="Free Home Valuation - Discover Your Property's True Market Value"
        ogDescription="Get an accurate, professional home valuation from North Texas real estate experts. Know your property's worth in today's competitive market."
        ogImage={`${seoConfig.siteUrl}/images/home-valuation-dfw.jpg`}
        structuredData={generateStructuredData.service("Home Valuation Services", "Professional home valuation and market analysis services for properties in Dallas-Fort Worth metroplex including comprehensive market reports and pricing strategies.")}
      />
      <Navigation />

      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${homeValuationHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
              Discover Your Home's
              <span className="text-yellow-400 block" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>True Market Value</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
              Get an accurate, professional home valuation from North Texas real estate experts. 
              Know your property's worth in today's competitive market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                <Calculator className="w-5 h-5 mr-2" />
                Get Free Valuation
              </Button>
              <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-transparent">
                Schedule Property Tour
              </Button>
            </div>
          </div>
        </div>
        
        {/* Subtle transition gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-100 to-transparent pointer-events-none"></div>
      </section>

      {/* Valuation Benefits Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Get a Professional Home Valuation?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Understanding your home's value is crucial for making informed real estate decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Accurate Pricing */}
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Accurate Market Pricing</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our comprehensive analysis uses current market data, comparable sales, and local trends to determine your home's precise value.
                </p>
              </CardContent>
            </Card>

            {/* Strategic Planning */}
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Strategic Planning</h3>
                <p className="text-slate-600 leading-relaxed">
                  Whether selling, refinancing, or planning investments, know your property's value to make smart financial decisions.
                </p>
              </CardContent>
            </Card>

            {/* Local Expertise */}
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Local Market Knowledge</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our deep understanding of North Texas neighborhoods ensures accurate valuations based on hyperlocal market conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Valuation Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Free Home Valuation Request
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Provide some basic information about your property and we'll prepare a detailed valuation report.
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Property Information */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <Home className="w-5 h-5 mr-2" style={{ color: '#0d0d33' }} />
                    Property Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="address">Property Address *</Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          placeholder="Plano"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          placeholder="75024"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single-family">Single Family Home</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="condo">Condominium</SelectItem>
                          <SelectItem value="duplex">Duplex</SelectItem>
                          <SelectItem value="land">Land/Lot</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange("bedrooms", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="6+">6+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange("bathrooms", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="1.5">1.5</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="2.5">2.5</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="3.5">3.5</SelectItem>
                          <SelectItem value="4+">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <Label htmlFor="squareFootage">Square Footage</Label>
                      <Input
                        id="squareFootage"
                        placeholder="2,500"
                        value={formData.squareFootage}
                        onChange={(e) => handleInputChange("squareFootage", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="lotSize">Lot Size (sq ft)</Label>
                      <Input
                        id="lotSize"
                        placeholder="8,000"
                        value={formData.lotSize}
                        onChange={(e) => handleInputChange("lotSize", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="yearBuilt">Year Built</Label>
                      <Input
                        id="yearBuilt"
                        placeholder="2005"
                        value={formData.yearBuilt}
                        onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="propertyCondition">Property Condition</Label>
                    <Select value={formData.propertyCondition} onValueChange={(value) => handleInputChange("propertyCondition", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                        <SelectItem value="needs-work">Needs Work</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" style={{ color: '#0d0d33' }} />
                    Contact Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Smith"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(972) 555-0123"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="timeline">When are you considering selling?</Label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediately">Immediately</SelectItem>
                        <SelectItem value="1-3-months">1-3 months</SelectItem>
                        <SelectItem value="3-6-months">3-6 months</SelectItem>
                        <SelectItem value="6-12-months">6-12 months</SelectItem>
                        <SelectItem value="just-curious">Just curious about value</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="comments">Additional Comments</Label>
                    <Textarea
                      id="comments"
                      placeholder="Any additional information about your property or specific questions..."
                      rows={4}
                      value={formData.comments}
                      onChange={(e) => handleInputChange("comments", e.target.value)}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors py-3 text-lg font-medium"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Get My Free Home Valuation
                  </Button>
                  <p className="text-xs text-slate-500 mt-4 text-center">
                    By submitting this form, you agree to receive communications from 4Seasons Real Estate 
                    regarding your home valuation. We respect your privacy and will not share 
                    your information with third parties.
                  </p>
                </div>
            </form>
          </div>
        </div>
      </section>

      {/* Valuation Process Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Valuation Process
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We use a comprehensive approach to ensure you receive the most accurate home valuation.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Property Analysis",
                description: "Detailed review of your property's features, condition, and unique characteristics."
              },
              {
                step: "02", 
                title: "Market Research",
                description: "Analysis of recent comparable sales, current listings, and local market trends."
              },
              {
                step: "03",
                title: "Professional Assessment",
                description: "Expert evaluation considering location factors, neighborhood amenities, and market conditions."
              },
              {
                step: "04",
                title: "Detailed Report",
                description: "Comprehensive valuation report with supporting data and market insights delivered within 24 hours."
              }
            ].map((item, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: '#0d0d33' }}>
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What's Included in Your Valuation
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our comprehensive report provides everything you need to understand your home's market value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Current market value estimate",
              "Comparable sales analysis",
              "Market trends and predictions",
              "Neighborhood market data",
              "Property-specific factors",
              "Suggested improvements for value",
              "Marketing recommendations",
              "Pricing strategy guidance",
              "Market timing insights"
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Discover Your Home's Value?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Get your free, professional home valuation report within 24 hours. No obligations, just valuable insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-slate-900 bg-white hover:bg-slate-100">
              <Clock className="w-5 h-5 mr-2" />
              Get 24-Hour Valuation
            </Button>
            <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-transparent">
              Schedule Property Visit
            </Button>
          </div>
        </div>
      </section>

      {/* Valuation Consultation Form */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Get Expert Valuation Consultation
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ready to take the next step with your property? Our valuation experts will provide personalized 
              guidance on pricing strategy, market timing, and maximizing your home's value.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleValuationContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="valuation-name">Full Name *</Label>
                  <Input
                    id="valuation-name"
                    type="text"
                    value={valuationContactFormData.name}
                    onChange={(e) => handleValuationContactChange('name', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="valuation-email">Email Address *</Label>
                  <Input
                    id="valuation-email"
                    type="email"
                    value={valuationContactFormData.email}
                    onChange={(e) => handleValuationContactChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="valuation-phone">Phone Number *</Label>
                  <Input
                    id="valuation-phone"
                    type="tel"
                    value={valuationContactFormData.phone}
                    onChange={(e) => handleValuationContactChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="valuation-address">Property Address</Label>
                  <Input
                    id="valuation-address"
                    type="text"
                    value={valuationContactFormData.propertyAddress}
                    onChange={(e) => handleValuationContactChange('propertyAddress', e.target.value)}
                    placeholder="123 Main St, City, TX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="valuation-estimated">Current Estimated Value</Label>
                  <Input
                    id="valuation-estimated"
                    type="text"
                    value={valuationContactFormData.estimatedValue}
                    onChange={(e) => handleValuationContactChange('estimatedValue', e.target.value)}
                    placeholder="$450,000"
                  />
                </div>
                <div>
                  <Label htmlFor="valuation-timeline">Selling Timeline</Label>
                  <Input
                    id="valuation-timeline"
                    type="text"
                    value={valuationContactFormData.sellingTimeline}
                    onChange={(e) => handleValuationContactChange('sellingTimeline', e.target.value)}
                    placeholder="3-6 months, just exploring, etc."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="valuation-purpose">Purpose of Valuation</Label>
                <Input
                  id="valuation-purpose"
                  type="text"
                  value={valuationContactFormData.valuationPurpose}
                  onChange={(e) => handleValuationContactChange('valuationPurpose', e.target.value)}
                  placeholder="Selling, refinancing, investment analysis, estate planning, etc."
                />
              </div>

              <div>
                <Label htmlFor="valuation-message">Questions or Additional Information</Label>
                <Textarea
                  id="valuation-message"
                  value={valuationContactFormData.message}
                  onChange={(e) => handleValuationContactChange('message', e.target.value)}
                  placeholder="Tell us about your property goals, specific questions about the valuation process, or any unique features of your home..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors py-3 text-lg font-medium"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Schedule My Valuation Consultation
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Market Analysis</strong><br />Comprehensive pricing strategy</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Value Optimization</strong><br />Maximize your property worth</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Expert Timing</strong><br />Perfect market entry strategy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Back to Top */}
      <BackToTop />
    </div>
  );
}
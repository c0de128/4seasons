import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { 
  Home,
  TrendingUp,
  Users,
  CheckCircle,
  Calculator,
  MapPin,
  Calendar
} from "lucide-react";

export default function Sell() {
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Home valuation form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Sell Your Property for
              <span className="text-primary block">Maximum Value</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Get top dollar for your property with our expert marketing strategies and proven track record in North Texas real estate.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                Get Free Home Valuation
              </Button>
              <Button variant="outline" className="border-2 border-slate-900 text-slate-900 px-8 py-4 text-lg font-semibold hover:bg-slate-900 hover:text-white bg-transparent">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sell With Us Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Sell With 4Seasons Real Estate?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our proven approach gets your property sold faster and for the best possible price.
            </p>
          </div>

          <div className="space-y-12">
            {/* Expert Marketing */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:w-1/3">
                <div className="h-64 bg-gradient-to-br from-blue-100 to-slate-100 flex items-center justify-center">
                  <svg className="w-32 h-32 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
                  </svg>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Targeted Real Estate Marketing</h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                  We specialize in real estate marketing strategies that connect your property with the right buyers. Using Rodante's proven methods, we craft compelling campaigns that highlight your home's best features. Our full-service approach includes:
                </p>
                <ul className="text-slate-600 text-lg leading-relaxed mb-4 space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-primary mt-3 mr-3 flex-shrink-0"></span>
                    High-quality professional photography to capture attention
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-primary mt-3 mr-3 flex-shrink-0"></span>
                    Immersive virtual tours that let buyers explore from anywhere
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-primary mt-3 mr-3 flex-shrink-0"></span>
                    Strategic online advertising across top real estate platforms and social media
                  </li>
                </ul>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  The result? Maximum exposure, faster sales, and better offers.
                </p>
              </div>
            </div>

            {/* Local Market Expertise */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:w-1/3">
                <div className="h-64 bg-gradient-to-br from-green-100 to-slate-100 flex items-center justify-center">
                  <svg className="w-32 h-32 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Local Market Expertise</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  We use proven Rodante strategies designed to reach your target audience and provide deep knowledge of North Texas neighborhoods, pricing trends, and buyer preferences. Our expertise helps position your property competitively in the market based on real-time analysis and insights.
                </p>
              </div>
            </div>

            {/* Dedicated Support */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:w-1/3">
                <div className="h-64 bg-gradient-to-br from-purple-100 to-slate-100 flex items-center justify-center">
                  <svg className="w-32 h-32 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-6h3v-4c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v4h3v6H4z"/>
                  </svg>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Dedicated Support</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  We use proven Rodante strategies designed to reach your target audience and provide personal attention from our experienced team throughout the entire selling process. From initial consultation to closing and beyond, we ensure no detail is overlooked in your real estate journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selling Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Proven Selling Process
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We've streamlined the selling process to be as smooth and profitable as possible for you.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Property Evaluation",
                description: "Comprehensive market analysis and professional home valuation to determine optimal pricing strategy."
              },
              {
                step: "02", 
                title: "Marketing Strategy",
                description: "Professional photography, staging consultation, and multi-platform marketing campaign launch."
              },
              {
                step: "03",
                title: "Show & Negotiate",
                description: "Coordinate showings, handle inquiries, and negotiate offers to get you the best possible deal."
              },
              {
                step: "04",
                title: "Close the Sale",
                description: "Manage all paperwork, inspections, and closing details for a smooth transaction completion."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#1f2937' }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Valuation Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Get Your Free Home Valuation
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Start your selling journey with an accurate property valuation. Fill out our detailed form to receive a comprehensive market analysis.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border border-slate-200">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Property Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                      <Home className="w-5 h-5 mr-2" style={{ color: '#0d0d33' }} />
                      Property Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="address" className="text-sm font-medium text-slate-700 mb-2 block">
                          Property Address *
                        </Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="123 Main Street"
                          className="w-full"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city" className="text-sm font-medium text-slate-700 mb-2 block">
                          City *
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Allen"
                          className="w-full"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-sm font-medium text-slate-700 mb-2 block">
                          ZIP Code *
                        </Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          placeholder="75013"
                          className="w-full"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="propertyType" className="text-sm font-medium text-slate-700 mb-2 block">
                          Property Type *
                        </Label>
                        <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single-family">Single Family Home</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="condo">Condominium</SelectItem>
                            <SelectItem value="duplex">Duplex</SelectItem>
                            <SelectItem value="land">Land/Lot</SelectItem>
                            <SelectItem value="commercial">Commercial Property</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="bedrooms" className="text-sm font-medium text-slate-700 mb-2 block">
                          Bedrooms
                        </Label>
                        <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange('bedrooms', value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Number of bedrooms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Bedroom</SelectItem>
                            <SelectItem value="2">2 Bedrooms</SelectItem>
                            <SelectItem value="3">3 Bedrooms</SelectItem>
                            <SelectItem value="4">4 Bedrooms</SelectItem>
                            <SelectItem value="5">5+ Bedrooms</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="bathrooms" className="text-sm font-medium text-slate-700 mb-2 block">
                          Bathrooms
                        </Label>
                        <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange('bathrooms', value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Number of bathrooms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Bathroom</SelectItem>
                            <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                            <SelectItem value="2">2 Bathrooms</SelectItem>
                            <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                            <SelectItem value="3">3 Bathrooms</SelectItem>
                            <SelectItem value="3.5">3.5 Bathrooms</SelectItem>
                            <SelectItem value="4">4+ Bathrooms</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="squareFootage" className="text-sm font-medium text-slate-700 mb-2 block">
                          Square Footage
                        </Label>
                        <Input
                          id="squareFootage"
                          value={formData.squareFootage}
                          onChange={(e) => handleInputChange('squareFootage', e.target.value)}
                          placeholder="2,000"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lotSize" className="text-sm font-medium text-slate-700 mb-2 block">
                          Lot Size
                        </Label>
                        <Input
                          id="lotSize"
                          value={formData.lotSize}
                          onChange={(e) => handleInputChange('lotSize', e.target.value)}
                          placeholder="0.25 acres"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label htmlFor="yearBuilt" className="text-sm font-medium text-slate-700 mb-2 block">
                          Year Built
                        </Label>
                        <Input
                          id="yearBuilt"
                          value={formData.yearBuilt}
                          onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                          placeholder="2010"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label htmlFor="propertyCondition" className="text-sm font-medium text-slate-700 mb-2 block">
                          Property Condition
                        </Label>
                        <Select value={formData.propertyCondition} onValueChange={(value) => handleInputChange('propertyCondition', value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                            <SelectItem value="needs-work">Needs Work</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                      <Users className="w-5 h-5 mr-2" style={{ color: '#0d0d33' }} />
                      Contact Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium text-slate-700 mb-2 block">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="John"
                          className="w-full"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium text-slate-700 mb-2 block">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Smith"
                          className="w-full"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2 block">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="john@example.com"
                          className="w-full"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-slate-700 mb-2 block">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                          className="w-full"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Selling Timeline */}
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" style={{ color: '#0d0d33' }} />
                      Selling Timeline
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="timeline" className="text-sm font-medium text-slate-700 mb-2 block">
                          When are you planning to sell?
                        </Label>
                        <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediately">Immediately</SelectItem>
                            <SelectItem value="1-3-months">1-3 Months</SelectItem>
                            <SelectItem value="3-6-months">3-6 Months</SelectItem>
                            <SelectItem value="6-12-months">6-12 Months</SelectItem>
                            <SelectItem value="just-curious">Just Curious About Value</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="comments" className="text-sm font-medium text-slate-700 mb-2 block">
                          Additional Comments
                        </Label>
                        <Textarea
                          id="comments"
                          value={formData.comments}
                          onChange={(e) => handleInputChange('comments', e.target.value)}
                          placeholder="Any additional information about your property or selling goals..."
                          className="w-full h-24"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-6">
                    <Button 
                      type="submit"
                      className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90"
                      style={{ backgroundColor: '#0d0d33' }}
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      Get My Free Home Valuation
                    </Button>
                    <p className="text-sm text-slate-500 mt-4">
                      We'll contact you within 24 hours with your comprehensive property analysis.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Contact />

      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
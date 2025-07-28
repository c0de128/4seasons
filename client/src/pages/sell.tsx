import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoPath from "@/assets/images/logo_sm.png";
import logoFooter from "@/assets/images/logo_footer.png";
import marketAnalysisBlog from "@/assets/images/market-analysis-blog.jpg";
import texasBlog from "@/assets/images/texas-blog.jpg";
import { 
  Menu, 
  X, 
  ChevronDown,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Clock,
  Instagram,
  Home,
  TrendingUp,
  Users,
  CheckCircle
} from "lucide-react";

export default function Sell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation - positioned absolutely over hero for immediate transparency */}
      <nav className="absolute top-0 left-0 right-0 backdrop-blur-md shadow-sm border-b border-slate-200/30 z-50" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <a href="/">
                <img src={logoPath} alt="Logo" className="w-[90px] h-[56px]" />
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-slate-600 hover:text-primary transition-colors duration-200">Home</a>
              <a href="/#buy" className="text-slate-600 hover:text-primary transition-colors duration-200">Buy</a>
              <a href="/sell" className="text-primary font-medium transition-colors duration-200">Sell</a>
              <a href="/#property-management" className="text-slate-600 hover:text-primary transition-colors duration-200">Property Management</a>
              
              {/* Resources Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-slate-600 hover:text-primary transition-colors duration-200">
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <a href="#home-valuation" className="w-full">Home Valuation</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#city-guides" className="w-full">City Guides</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#school-districts" className="w-full">School Districts</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#property-investment" className="w-full">Property Investment</a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <a href="#blog" className="w-full">Blog</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#faq" className="w-full">FAQ</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#terms" className="w-full">Terms & Conditions</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#contact" className="w-full">Contact Us</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <a href="/" className="block text-slate-600 hover:text-primary">Home</a>
              <a href="#buy" className="block text-slate-600 hover:text-primary">Buy</a>
              <a href="/sell" className="block text-primary font-medium">Sell</a>
              <a href="#property-management" className="block text-slate-600 hover:text-primary">Property Management</a>
              
              {/* Resources - Mobile Expanded */}
              <div className="border-t border-slate-100 pt-3 mt-3">
                <p className="text-sm font-medium text-slate-500 mb-2">Resources</p>
                <div className="pl-4 space-y-2">
                  <a href="#home-valuation" className="block text-slate-600 hover:text-primary text-sm">Home Valuation</a>
                  <a href="#city-guides" className="block text-slate-600 hover:text-primary text-sm">City Guides</a>
                  <a href="#school-districts" className="block text-slate-600 hover:text-primary text-sm">School Districts</a>
                  <a href="#property-investment" className="block text-slate-600 hover:text-primary text-sm">Property Investment</a>
                  <a href="#blog" className="block text-slate-600 hover:text-primary text-sm">Blog</a>
                  <a href="#faq" className="block text-slate-600 hover:text-primary text-sm">FAQ</a>
                  <a href="#terms" className="block text-slate-600 hover:text-primary text-sm">Terms & Conditions</a>
                  <a href="#contact" className="block text-slate-600 hover:text-primary text-sm">Contact Us</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Sell Your <span className="text-primary">Property</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-4xl mx-auto leading-relaxed">
            Get top dollar for your property with our expert marketing strategies and proven track record in North Texas real estate.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#1f2937' }}>
              Get Free Home Valuation
            </Button>
            <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-transparent">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Why Sell With Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Sell With 4Seasons Real Estate?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our proven approach gets your property sold faster and for the best possible price.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Expert Marketing */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1f2937' }}>
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Expert Marketing</h3>
                <p className="text-slate-600 leading-relaxed">
                  Professional photography, virtual tours, and strategic online marketing to showcase your property to qualified buyers across multiple platforms.
                </p>
              </CardContent>
            </Card>

            {/* Local Market Knowledge */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1f2937' }}>
                  <Home className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Local Market Expertise</h3>
                <p className="text-slate-600 leading-relaxed">
                  Deep knowledge of North Texas neighborhoods, pricing trends, and buyer preferences to position your property competitively in the market.
                </p>
              </CardContent>
            </Card>

            {/* Dedicated Support */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1f2937' }}>
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Dedicated Support</h3>
                <p className="text-slate-600 leading-relaxed">
                  Personal attention from our experienced team throughout the entire selling process, from listing to closing and beyond.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Selling Process Section */}
      <section className="py-20 bg-slate-100">
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

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to Sell Your Property?
            </h2>
            <p className="text-xl text-slate-600">
              Get started with a free consultation and property valuation.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Property Address</Label>
                  <Input id="address" placeholder="Enter the property address you want to sell" />
                </div>

                <div>
                  <Label htmlFor="timeline">Selling Timeline</Label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select timeline</option>
                    <option value="immediately">Immediately</option>
                    <option value="1-3months">1-3 months</option>
                    <option value="3-6months">3-6 months</option>
                    <option value="6+months">6+ months</option>
                    <option value="exploring">Just exploring options</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your property or any questions you have..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-3 text-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#1f2937' }}
                >
                  Request Free Consultation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16" style={{ backgroundColor: '#1f2937' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-center mb-6">
                <img 
                  src={logoFooter} 
                  alt="4Seasons Real Estate" 
                  className="mb-4"
                  style={{ width: '200px', height: '145px' }}
                />
                <div className="flex items-center space-x-4">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-8 h-8 text-white rounded-full hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#1f2937' }}
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-8 h-8 text-white rounded-full hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#1f2937' }}
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:aharwood23@yahoo.com"
                    className="inline-flex items-center justify-center w-8 h-8 text-white rounded-full hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#1f2937' }}
                    aria-label="Email Us"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-1">
              <h3 className="font-semibold text-white mb-4">Contact Info</h3>
              <div className="space-y-3 text-slate-300">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">1333 W. McDermott Dr #200</p>
                    <p className="text-sm">Allen, TX 75013</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">(214) 274-3873</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">aharwood23@yahoo.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Mon-Sun: 7AM-9PM</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-1">
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="/" className="block text-slate-300 hover:text-white text-sm transition-colors">Home</a>
                <a href="#buy" className="block text-slate-300 hover:text-white text-sm transition-colors">Buy</a>
                <a href="/sell" className="block text-slate-300 hover:text-white text-sm transition-colors">Sell</a>
                <a href="#property-management" className="block text-slate-300 hover:text-white text-sm transition-colors">Property Management</a>
                <a href="#home-valuation" className="block text-slate-300 hover:text-white text-sm transition-colors">Home Valuation</a>
                <a href="#contact" className="block text-slate-300 hover:text-white text-sm transition-colors">Contact Us</a>
              </div>
            </div>

            {/* Recent Blog Posts */}
            <div className="md:col-span-1">
              <h3 className="font-semibold text-white mb-4">Recent Blog Posts</h3>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div style={{ width: '50px', height: '50px' }} className="bg-slate-600 rounded flex-shrink-0 overflow-hidden">
                    <img 
                      src={texasBlog} 
                      alt="North Texas Real Estate" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white leading-tight mb-1">
                      The Great Rebalancing: North Texas Real Estate Predictions for 2025
                    </h4>
                    <p className="text-xs text-slate-400">
                      The DFW market has shifted from frenched seller's market to a balanced landscape.
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <div style={{ width: '50px', height: '50px' }} className="bg-slate-600 rounded flex-shrink-0 overflow-hidden">
                    <img 
                      src={marketAnalysisBlog} 
                      alt="Market Analysis Report" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white leading-tight mb-1">
                      Collin County Real Estate Check-In: Q1 2025 Market Report
                    </h4>
                    <p className="text-xs text-slate-400">
                      Market analysis of the first quarter 2025 real estate trends.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-slate-600 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                © 2025 4Seasons Real Estate. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#privacy" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="#terms" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
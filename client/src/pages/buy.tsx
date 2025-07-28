import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BackToTop } from "@/components/ui/back-to-top";
import logoPath from "@/assets/images/logo.png";
import logoFooterPath from "@/assets/images/logo_footer.png";
import texasBlog from "@/assets/images/texas-blog.jpg";
import marketAnalysisBlog from "@/assets/images/market-analysis-blog.jpg";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Buy() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - positioned absolutely over hero for immediate transparency */}
      <nav className="absolute top-0 left-0 right-0 backdrop-blur-md shadow-sm border-b border-slate-200/30 z-50" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src={logoPath} alt="Logo" className="w-[90px] h-[56px]" />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/buy" className="text-slate-600 hover:text-primary transition-colors duration-200">Buy</a>
              <a href="/sell" className="text-slate-600 hover:text-primary transition-colors duration-200">Sell</a>
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
                    <a href="/#contact" className="w-full">Contact Us</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <a href="/buy" className="block text-slate-600 hover:text-primary">Buy</a>
              <a href="/sell" className="block text-slate-600 hover:text-primary">Sell</a>
              <a href="/#property-management" className="block text-slate-600 hover:text-primary">Property Management</a>
              
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
                  <a href="/#contact" className="block text-slate-600 hover:text-primary text-sm">Contact Us</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Find Your Perfect
              <span className="text-primary block">North Texas Home</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Discover exceptional properties in the DFW metroplex with expert guidance 
              from North Texas's most trusted real estate professionals.
            </p>
            
            {/* Property Search iframe */}
            <div className="w-full max-w-7xl mx-auto">
              <iframe 
                src="https://matrix.ntreis.net/Matrix/public/IDX.aspx?idx=2a47c86"
                style={{ minHeight: '98vh' }} 
                width="100%" 
                frameBorder="0" 
                marginWidth="0" 
                marginHeight="0"
                title="Property Search"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Buying */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Buy with 4Seasons Real Estate?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our comprehensive approach ensures you find the perfect home with confidence and peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Local Market Expertise</h3>
              <p className="text-slate-600">
                Deep knowledge of North Texas neighborhoods, schools, amenities, and market trends to guide your decision.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Personalized Service</h3>
              <p className="text-slate-600">
                Dedicated support throughout your journey with 24/7 availability and customized property recommendations.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Negotiation Excellence</h3>
              <p className="text-slate-600">
                Proven track record of securing the best deals for our buyers with strategic negotiation and market insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Areas */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Popular North Texas Areas
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore the most sought-after neighborhoods in the DFW metroplex.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Plano</h3>
                <p className="text-slate-600 mb-4">Excellent schools, family-friendly communities, and convenient shopping centers.</p>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Median Price: $485K</span>
                  <span>124 Available</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Frisco</h3>
                <p className="text-slate-600 mb-4">Rapidly growing city with modern amenities and top-rated schools.</p>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Median Price: $520K</span>
                  <span>98 Available</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Allen</h3>
                <p className="text-slate-600 mb-4">Strong community feel with excellent recreational facilities and schools.</p>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Median Price: $465K</span>
                  <span>76 Available</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">McKinney</h3>
                <p className="text-slate-600 mb-4">Historic charm meets modern convenience in this fast-growing city.</p>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Median Price: $445K</span>
                  <span>112 Available</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-red-400 to-red-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Richardson</h3>
                <p className="text-slate-600 mb-4">Diverse community with great dining, shopping, and cultural attractions.</p>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Median Price: $395K</span>
                  <span>89 Available</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-teal-400 to-teal-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Carrollton</h3>
                <p className="text-slate-600 mb-4">Affordable family homes with easy access to Dallas and surrounding areas.</p>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Median Price: $385K</span>
                  <span>67 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Ready to Start Your Home Search?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Let our experienced team help you find the perfect home in North Texas. 
                Contact us today for a personalized consultation.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Call Us</h3>
                    <p className="text-slate-600">(972) 555-0123</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email Us</h3>
                    <p className="text-slate-600">info@4seasonsrealestate.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Visit Us</h3>
                    <p className="text-slate-600">123 Main Street, Plano, TX 75023</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Get Started Today</h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <Input placeholder="Your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <Input placeholder="Your last name" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <Input type="tel" placeholder="(972) 555-0123" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Budget Range</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-300k">Under $300K</SelectItem>
                      <SelectItem value="300k-500k">$300K - $500K</SelectItem>
                      <SelectItem value="500k-750k">$500K - $750K</SelectItem>
                      <SelectItem value="750k-1m">$750K - $1M</SelectItem>
                      <SelectItem value="over-1m">Over $1M</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <Textarea 
                    placeholder="Tell us about your ideal home and any specific requirements..."
                    rows={4}
                  />
                </div>
                
                <Button className="w-full bg-primary hover:bg-blue-600 text-white">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2c3e50' }} className="text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="mb-6">
                <img src={logoFooterPath} alt="4Seasons Real Estate" className="mb-4" style={{ width: '200px', height: '145px' }} />
              </div>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-8 h-8 text-white rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#1f2937' }}
                  aria-label="Facebook"
                >
                  <span className="font-bold text-sm">f</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 text-white rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#1f2937' }}
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 text-white rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#1f2937' }}
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 text-white rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#1f2937' }}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Quick Links - Column 1 */}
            <div className="md:col-span-1">
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/buy" className="text-slate-300 hover:text-white transition-colors">Buy</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Property Management</a></li>
                <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Home Valuation</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">School Districts</a></li>
              </ul>
            </div>
            
            {/* Quick Links - Column 2 */}
            <div className="md:col-span-1">
              <h3 className="font-semibold text-white mb-4 opacity-0">Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/sell" className="text-slate-300 hover:text-white transition-colors">Sell</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Neighborhoods</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Blog Posts</a></li>
              </ul>
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
          
          <div className="border-t border-slate-600 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-slate-400">
              © 2025 4Seasons Real Estate. All rights reserved.
            </p>
            <p className="text-slate-400 mt-2 md:mt-0">
              Website Designed by DFW WEB GUY
            </p>
          </div>
        </div>
      </footer>
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
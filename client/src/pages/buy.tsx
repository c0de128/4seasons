import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/ui/back-to-top";

export default function Buy() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

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
            <div className="mx-auto" style={{ width: '80vw' }}>
              <iframe 
                src="https://matrix.ntreis.net/Matrix/public/IDX.aspx?idx=2a47c86"
                style={{ minHeight: '80vh' }} 
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

      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
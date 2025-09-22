import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, ExternalLink, Home, Users, Award, Clock, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import newConstructionHeroImage from "@/assets/images/hero-images/762045.jpg";
import modernHomeImage from "@/assets/images/personalized-service.webp";
import customizationImage from "@/assets/images/negotiation-excellence.jpg";
import energyEfficientImage from "@/assets/images/11507.jpg";
import warrantyImage from "@/assets/images/2149176715.jpg";
import timelineImage from "@/assets/images/relocation-assistance.jpg";
import planoImage from "@/assets/images/plano.jpg";
import friscoImage from "@/assets/images/frisco.webp";
import allenImage from "@/assets/images/allen.webp";
import mckinneyImage from "@/assets/images/mckinney.jpeg";

export default function NewConstruction() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    timeline: '',
    location: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - this would connect to your contact API
    console.log('New construction inquiry:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="New Construction Homes - Build Your Dream Home in North Texas | 4Seasons Real Estate"
        description="Discover new construction homes and communities in Allen, Plano, Frisco, McKinney, and throughout the DFW metroplex. Expert guidance for new home builds and pre-construction opportunities."
        keywords="new construction homes Dallas, new homes DFW, Allen new construction, Plano new builds, Frisco new homes, McKinney new construction, custom homes North Texas, new home builder Dallas, pre-construction homes"
        canonicalUrl={`${seoConfig.siteUrl}/new-construction`}
        ogTitle="New Construction Homes in North Texas - 4Seasons Real Estate"
        ogDescription="Build your dream home in the DFW metroplex. Expert guidance for new construction, custom builds, and pre-construction opportunities in North Texas's best communities."
        ogImage={`${seoConfig.siteUrl}/images/new-construction-dfw.jpg`}
        structuredData={generateStructuredData.service("New Construction Home Services", "Expert assistance with new construction homes, custom builds, and pre-construction opportunities in Dallas-Fort Worth metroplex.")}
      />
      <Navigation />

      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${newConstructionHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
              Build Your Dream Home in
              <span className="text-yellow-400 block" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>North Texas</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
              Discover exceptional new construction opportunities in the DFW metroplex. 
              From move-in ready homes to custom builds, we'll guide you through every step 
              of creating your perfect home.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="px-8 py-3 bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                <Home className="w-5 h-5 mr-2" />
                View New Communities
              </Button>
              <Button 
                variant="outline"
                className="px-8 py-3 border-2 border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors text-lg font-medium"
              >
                <Phone className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
        
        {/* Subtle transition gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
      </section>

      {/* Why Choose New Construction */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-left">
              Why Choose New Construction?
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-slate-600 text-left">
                New construction homes offer unique advantages that you won't find with existing properties.
                From cutting-edge technology to personalized design choices, building new means building better.
              </p>
              <p className="text-lg text-slate-600 text-left">
                When you choose new construction, you're not just buying a house—you're investing in a home
                that's built specifically for modern living, designed with the latest innovations, and tailored
                to your exact specifications. Every system is brand new, every surface is pristine, and every
                detail can be customized to match your lifestyle and preferences.
              </p>
              <p className="text-lg text-slate-600 text-left">
                Plus, with comprehensive warranties and energy-efficient features, you'll enjoy lower maintenance
                costs and monthly utility bills from the moment you move in. It's the smart choice for today's
                homebuyers who want the best in quality, efficiency, and peace of mind.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-1 gap-12">
            {/* Modern Design & Technology */}
            <div className="bg-white shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-slate-200 aspect-[3/4] lg:aspect-auto">
                  <img
                    src={modernHomeImage}
                    alt="Modern New Construction Home"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 lg:p-6 bg-slate-100">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Modern Design & Technology
                    </h3>
                  </div>
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      New construction homes feature the latest in home design trends, smart home technology,
                      and modern conveniences. From open floor plans and luxury finishes to integrated home
                      automation systems, you'll enjoy features that enhance both comfort and home value.
                    </p>
                  </div>
                  <ul className="text-slate-600 space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#0d0d33] rounded-full mr-3"></div>
                      Smart home technology integration
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#0d0d33] rounded-full mr-3"></div>
                      Contemporary floor plans and finishes
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#0d0d33] rounded-full mr-3"></div>
                      Latest building codes and safety features
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Customization Options - Reversed Layout */}
            <div className="bg-white shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-4 lg:p-6 order-2 lg:order-1 bg-slate-100">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Personalization & Customization
                    </h3>
                  </div>
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      Make your home uniquely yours with extensive customization options. Choose everything
                      from flooring and paint colors to cabinet styles and fixtures. Many builders offer
                      structural modifications, allowing you to create the perfect layout for your lifestyle.
                    </p>
                  </div>
                  <ul className="text-slate-600 space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#0d0d33] rounded-full mr-3"></div>
                      Interior design center selections
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#0d0d33] rounded-full mr-3"></div>
                      Structural modification options
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#0d0d33] rounded-full mr-3"></div>
                      Upgrade packages and premium features
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-200 aspect-[3/4] lg:aspect-auto order-1 lg:order-2">
                  <img
                    src={customizationImage}
                    alt="Home Customization Options"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Energy Efficiency */}
            <div className="bg-white shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-slate-200 aspect-[3/4] lg:aspect-auto">
                  <img
                    src={energyEfficientImage}
                    alt="Energy Efficient Home Features"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 lg:p-6 bg-slate-100">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Energy Efficiency & Savings
                    </h3>
                  </div>
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      New homes are built to current energy codes with advanced insulation, efficient HVAC
                      systems, and energy-star appliances. This means lower monthly utility bills and a
                      smaller environmental footprint from day one, saving you thousands over the years.
                    </p>
                  </div>
                  <ul className="text-slate-600 space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#0d0d33] rounded-full mr-3"></div>
                      Advanced insulation and windows
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#0d0d33] rounded-full mr-3"></div>
                      High-efficiency HVAC systems
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#0d0d33] rounded-full mr-3"></div>
                      Energy Star certified appliances
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Warranties & Peace of Mind - Reversed Layout */}
            <div className="bg-white shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-4 lg:p-6 order-2 lg:order-1 bg-slate-100">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Comprehensive Warranties
                    </h3>
                  </div>
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      New construction comes with extensive builder warranties covering structural elements,
                      major systems, and construction defects. This protection gives you peace of mind and
                      financial security that you simply can't get with existing homes.
                    </p>
                  </div>
                  <ul className="text-slate-600 space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#0d0d33] rounded-full mr-3"></div>
                      10-year structural warranty
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#0d0d33] rounded-full mr-3"></div>
                      2-year systems and appliances coverage
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#0d0d33] rounded-full mr-3"></div>
                      1-year full home warranty
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-200 aspect-[3/4] lg:aspect-auto order-1 lg:order-2">
                  <img
                    src={warrantyImage}
                    alt="Home Warranty Protection"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Construction Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your New Construction Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We guide you through every step of the new construction process, from initial planning 
              to move-in day and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Planning & Budget</h3>
              <p className="text-slate-600">
                Define your needs, budget, and timeline. We'll help you understand financing options 
                and connect you with trusted lenders.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Builder & Lot Selection</h3>
              <p className="text-slate-600">
                Choose from our network of reputable builders and find the perfect lot in your 
                preferred community or neighborhood.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Design & Customization</h3>
              <p className="text-slate-600">
                Work with design centers to select finishes, fixtures, and upgrades that match 
                your style and budget preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Construction & Closing</h3>
              <p className="text-slate-600">
                Monitor construction progress with regular updates and walkthroughs, then 
                complete your final inspection and closing process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular New Construction Communities */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Popular New Construction Communities
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore the hottest new construction communities in North Texas with top builders 
              and premium amenities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${friscoImage})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Frisco New Developments</h3>
                <p className="text-slate-600 mb-4">
                  Master-planned communities with resort-style amenities, top-rated schools, 
                  and convenient access to The Star and Legacy West.
                </p>
                <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                  <span>Price Range: $450K - $800K</span>
                  <span>15+ Communities</span>
                </div>
                <div className="text-sm text-slate-600 mb-3">
                  <strong>Popular Builders:</strong> Toll Brothers, DR Horton, Pulte Homes
                </div>
                <Button className="w-full bg-[#0d0d33] text-white hover:bg-blue-700">
                  Explore Frisco Communities
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${planoImage})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Plano New Construction</h3>
                <p className="text-slate-600 mb-4">
                  Premium locations near Legacy Business District with luxury finishes, 
                  excellent schools, and established neighborhoods.
                </p>
                <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                  <span>Price Range: $500K - $900K</span>
                  <span>12+ Communities</span>
                </div>
                <div className="text-sm text-slate-600 mb-3">
                  <strong>Popular Builders:</strong> Darling Homes, Highland Homes, Perry Homes
                </div>
                <Button className="w-full bg-[#0d0d33] text-white hover:bg-blue-700">
                  Explore Plano Communities
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${allenImage})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Allen New Builds</h3>
                <p className="text-slate-600 mb-4">
                  Family-friendly communities with parks, recreational facilities, 
                  and highly-rated Allen ISD schools throughout the area.
                </p>
                <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                  <span>Price Range: $400K - $650K</span>
                  <span>8+ Communities</span>
                </div>
                <div className="text-sm text-slate-600 mb-3">
                  <strong>Popular Builders:</strong> MHI, Bloomfield Homes, David Weekley
                </div>
                <Button className="w-full bg-[#0d0d33] text-white hover:bg-blue-700">
                  Explore Allen Communities
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${mckinneyImage})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">McKinney New Homes</h3>
                <p className="text-slate-600 mb-4">
                  Growing communities that blend historic charm with modern amenities, 
                  featuring diverse home styles and price points.
                </p>
                <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                  <span>Price Range: $350K - $750K</span>
                  <span>20+ Communities</span>
                </div>
                <div className="text-sm text-slate-600 mb-3">
                  <strong>Popular Builders:</strong> Lennar, KB Home, Meritage Homes
                </div>
                <Button className="w-full bg-[#0d0d33] text-white hover:bg-blue-700">
                  Explore McKinney Communities
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Construction Inquiry Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to Build Your Dream Home?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Let us help you navigate the new construction process. Fill out the form below and 
              we'll connect you with the right builders and communities for your needs.
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="(214) 555-0123"
                />
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select budget range</option>
                  <option value="under-400k">Under $400K</option>
                  <option value="400k-500k">$400K - $500K</option>
                  <option value="500k-650k">$500K - $650K</option>
                  <option value="650k-800k">$650K - $800K</option>
                  <option value="800k-1m">$800K - $1M</option>
                  <option value="over-1m">Over $1M</option>
                </select>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-slate-700 mb-2">
                  Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Ready to start immediately</option>
                  <option value="3-months">Within 3 months</option>
                  <option value="6-months">Within 6 months</option>
                  <option value="12-months">Within 12 months</option>
                  <option value="exploring">Just exploring options</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
                  Preferred Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select preferred area</option>
                  <option value="frisco">Frisco</option>
                  <option value="plano">Plano</option>
                  <option value="allen">Allen</option>
                  <option value="mckinney">McKinney</option>
                  <option value="richardson">Richardson</option>
                  <option value="prosper">Prosper</option>
                  <option value="celina">Celina</option>
                  <option value="little-elm">Little Elm</option>
                  <option value="open">Open to suggestions</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Tell us about your dream home
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="Describe your ideal home, must-have features, or any specific questions about new construction..."
                />
              </div>

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  className="w-full bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors py-3 text-lg font-medium"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Get Started with New Construction
                </Button>
                <p className="text-xs text-slate-500 mt-4 text-center">
                  By submitting this form, you agree to receive communications from 4Seasons Real Estate 
                  regarding new construction opportunities. We respect your privacy and will not share 
                  your information with third parties.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
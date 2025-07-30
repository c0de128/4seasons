import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import planoImage from "@/assets/images/plano.jpg";
import friscoImage from "@/assets/images/frisco.webp";
import allenImage from "@/assets/images/allen.webp";
import mckinneyImage from "@/assets/images/mckinney.jpeg";
import richardsonImage from "@/assets/images/richardson.jpg";
import carrolltonImage from "@/assets/images/Carrollton.webp";
import northTexasImage from "@/assets/images/north-texas.jpg";
import personalizedServiceImage from "@/assets/images/personalized-service.webp";
import negotiationExcellenceImage from "@/assets/images/negotiation-excellence.jpg";
import professionalsImage from "@/assets/images/professionals.jpg";
import firstHouseImage from "@/assets/images/first-house.jpg";
import relocationAssistanceImage from "@/assets/images/relocation-assistance.jpg";

export default function Buy() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Find Your Perfect
              <span className="text-primary block">North Texas Home</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Discover exceptional properties in the DFW metroplex with expert guidance 
              from North Texas's most trusted real estate professionals.
            </p>
          </div>
        </div>
        
      </section>

      {/* Why Choose Us for Buying */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Buy with 4Seasons Real Estate?
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl">
              At 4Seasons Real Estate, we believe buying a home should be exciting—not overwhelming. Our comprehensive approach is designed to give you clarity, confidence, and peace of mind throughout your journey. Whether you're a first-time buyer, relocating, or upgrading to your dream home, we're here to guide you every step of the way.
            </p>
          </div>

          <div className="space-y-12">
            {/* Local Market Expertise */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image - Left Side */}
                <div className="bg-slate-200 aspect-square lg:aspect-auto">
                  <img 
                    src={northTexasImage} 
                    alt="North Texas Market Expertise"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content - Right Side */}
                <div className="p-8 lg:p-12 bg-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Local Market Expertise</h3>
                  
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      We know North Texas inside and out. From the best school districts and commute routes to hidden neighborhood gems and upcoming developments, our agents provide hyper-local insights that help you make informed decisions. We stay ahead of market trends, so you'll know when and where to buy for the best value and long-term growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personalized Service - Reversed Layout */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content - Left Side */}
                <div className="p-8 lg:p-12 order-2 lg:order-1 bg-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Personalized Service</h3>
                  
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      No two buyers are alike—and we treat your goals as uniquely as you are. Our team offers 24/7 availability, listens closely to your preferences, and delivers curated property recommendations that match your lifestyle, budget, and future plans. We're not just helping you find a house—we're helping you find your home.
                    </p>
                  </div>
                </div>

                {/* Image - Right Side */}
                <div className="bg-slate-200 aspect-square lg:aspect-auto order-1 lg:order-2">
                  <img 
                    src={personalizedServiceImage} 
                    alt="Personalized Service"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Negotiation Excellence */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image - Left Side */}
                <div className="bg-slate-200 aspect-square lg:aspect-auto">
                  <img 
                    src={negotiationExcellenceImage} 
                    alt="Negotiation Excellence"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content - Right Side */}
                <div className="p-8 lg:p-12 bg-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Negotiation Excellence</h3>
                  
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      Buying a home is one of the biggest financial decisions you'll make. Our skilled negotiators use market data, timing strategies, and experience to secure the best possible deal for you. Whether it's price, closing costs, or repairs, we advocate fiercely on your behalf to protect your investment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trusted Network - Reversed Layout */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content - Left Side */}
                <div className="p-8 lg:p-12 order-2 lg:order-1 bg-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Trusted Network of Professionals</h3>
                  
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      We've built strong relationships with top-tier lenders, inspectors, title companies, and contractors across North Texas. This means you'll have access to reliable professionals who help streamline the process, avoid delays, and ensure every detail is handled with care and integrity.
                    </p>
                  </div>
                </div>

                {/* Image - Right Side */}
                <div className="bg-slate-200 aspect-square lg:aspect-auto order-1 lg:order-2">
                  <img 
                    src={professionalsImage} 
                    alt="Trusted Network of Professionals"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* First-Time Buyer Support */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image - Left Side */}
                <div className="bg-slate-200 aspect-square lg:aspect-auto">
                  <img 
                    src={firstHouseImage} 
                    alt="First-Time Buyer Support"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content - Right Side */}
                <div className="p-8 lg:p-12 bg-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">First-Time Buyer Support</h3>
                  
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      If you're new to homeownership, we make the process simple and stress-free. We'll walk you through financing options, explain each step clearly, and provide resources to help you feel confident in your decisions. Our goal is to empower you—not overwhelm you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Relocation Assistance - Reversed Layout */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content - Left Side */}
                <div className="p-8 lg:p-12 order-2 lg:order-1 bg-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Relocation Assistance</h3>
                  
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      Moving to North Texas? We'll help you get oriented quickly. From neighborhood tours and school comparisons to local lifestyle tips, we make your transition smooth and enjoyable. Whether you're relocating for work, family, or a fresh start, we'll help you feel at home from day one.
                    </p>
                  </div>
                </div>

                {/* Image - Right Side */}
                <div className="bg-slate-200 aspect-square lg:aspect-auto order-1 lg:order-2">
                  <img 
                    src={relocationAssistanceImage} 
                    alt="Relocation Assistance"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Property Search Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Search Available Properties
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Browse our comprehensive database of homes for sale in North Texas.
            </p>
          </div>
        </div>
        
        {/* Property Search iframe - Full width container */}
        <div className="w-full flex justify-center">
          <div style={{ width: '80vw' }}>
            <iframe 
              src="https://matrix.ntreis.net/Matrix/public/IDX.aspx?idx=2a47c86"
              style={{ minHeight: '122vh', width: '100%' }} 
              frameBorder={0} 
              marginWidth={0} 
              marginHeight={0}
              title="Property Search"
            />
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
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${planoImage})` }}></div>
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
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${friscoImage})` }}></div>
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
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${allenImage})` }}></div>
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
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${mckinneyImage})` }}></div>
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
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${richardsonImage})` }}></div>
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
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${carrolltonImage})` }}></div>
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

      <Contact />

      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
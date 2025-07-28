import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  CheckCircle
} from "lucide-react";

export default function Sell() {
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
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
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
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
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
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
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

      <Contact />

      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
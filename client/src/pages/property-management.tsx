import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import propertyManagementHeroImage from "@/assets/images/hero-images/3918.jpg";
import { 
  Shield,
  DollarSign,
  Users,
  Wrench,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  Phone
} from "lucide-react";

export default function PropertyManagement() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Professional Property Management Services - Dallas-Fort Worth | 4Seasons Real Estate"
        description="Maximize rental income and protect your investment with comprehensive property management in North Texas. Tenant screening, maintenance, rent collection, and more."
        keywords="property management Dallas, DFW rental management, Allen property managers, investment property management Texas, rental income optimization, tenant screening Dallas"
        canonicalUrl={`${seoConfig.siteUrl}/property-management`}
        ogTitle="Professional Property Management Services - North Texas"
        ogDescription="Maximize your rental income and protect your investment with our comprehensive property management solutions in North Texas."
        ogImage={`${seoConfig.siteUrl}/images/property-management-dfw.jpg`}
        structuredData={generateStructuredData.service("Property Management Services", "Comprehensive property management services including tenant screening, rent collection, maintenance coordination, and investment property optimization in Dallas-Fort Worth area.")}
      />
      <Navigation />

      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ 
          backgroundImage: `url(${propertyManagementHeroImage})`,
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-yellow-400/90 text-yellow-900 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />
                Property Management
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Professional Property
              <span className="text-yellow-400 block">Management Services</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
              Maximize your rental income and protect your investment with our comprehensive property management solutions in North Texas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button className="px-8 py-4 text-lg font-semibold text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                Get Free Management Quote
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Smooth Transition */}
      <div className="h-8 bg-gradient-to-t from-slate-100 to-transparent"></div>

      {/* Why Choose Our Management Services */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose 4Seasons Property Management?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We handle every aspect of property management so you can enjoy passive income without the stress.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Maximum Returns */}
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Maximum Returns</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our strategic pricing and marketing approach ensures you get the highest possible rental income while minimizing vacancy periods.
                </p>
              </CardContent>
            </Card>

            {/* Tenant Screening */}
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Rigorous Tenant Screening</h3>
                <p className="text-slate-600 leading-relaxed">
                  Comprehensive background checks, credit verification, and employment confirmation to ensure quality, reliable tenants.
                </p>
              </CardContent>
            </Card>

            {/* 24/7 Support */}
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">24/7 Support</h3>
                <p className="text-slate-600 leading-relaxed">
                  Round-the-clock emergency response and maintenance coordination to protect your property and keep tenants satisfied.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Management Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Comprehensive Management Services
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From marketing to maintenance, we handle every detail of your rental property investment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Marketing & Leasing */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Marketing & Leasing</h3>
                <ul className="text-slate-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Professional photography and virtual tours
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Multi-platform listing distribution
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Showing coordination and lease execution
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tenant Management */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Tenant Management</h3>
                <ul className="text-slate-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Rent collection and late fee enforcement
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Lease renewals and terminations
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Dispute resolution and communication
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Maintenance & Repairs */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Maintenance & Repairs</h3>
                <ul className="text-slate-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Preventive maintenance programs
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Emergency repair coordination
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Trusted contractor network
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Financial Management */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Financial Management</h3>
                <ul className="text-slate-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Monthly financial statements
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Tax-ready documentation
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Direct deposit owner payments
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Legal Compliance */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Legal Compliance</h3>
                <ul className="text-slate-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Fair housing law compliance
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Eviction processing when necessary
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Local regulation expertise
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Property Inspections */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Property Inspections</h3>
                <ul className="text-slate-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Regular property condition reports
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Move-in/move-out inspections
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Detailed photo documentation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Management Process */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Management Process
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A streamlined approach to property management that maximizes your returns while minimizing your involvement.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Property Assessment",
                description: "Comprehensive evaluation of your property's condition, market position, and rental potential."
              },
              {
                step: "02", 
                title: "Strategic Marketing",
                description: "Professional photography, competitive pricing, and multi-platform marketing to attract quality tenants."
              },
              {
                step: "03",
                title: "Tenant Placement",
                description: "Rigorous screening process including background checks, credit verification, and employment confirmation."
              },
              {
                step: "04",
                title: "Ongoing Management",
                description: "Full-service management including rent collection, maintenance coordination, and regular reporting."
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

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our competitive fee structure ensures you keep more of your rental income.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Management */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20 flex flex-col">
              <CardContent className="p-8 text-center flex flex-col flex-1">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold inline-block">
                    Budget Friendly
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Standard Management</h3>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Full-service property management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Tenant screening and placement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">24/7 maintenance coordination</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Monthly financial reporting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Access to Buildium Online Platform</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button className="w-full py-3 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                    Get Started
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Premium Management */}
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border-2 border-primary flex flex-col">
              <CardContent className="p-8 text-center flex flex-col flex-1">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold inline-block">
                    Most Popular
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Premium Management</h3>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Everything in Standard plan</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Bi-annual property inspections</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Priority maintenance response</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Dedicated property manager</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Property improvement recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Advanced market analysis reports</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Tenant retention programs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Quarterly owner consultations</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button className="w-full py-3 text-white hover:opacity-90" style={{ backgroundColor: '#0d0d33' }}>
                    Get Started
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">
              <strong>No setup fees • No hidden costs • Cancel anytime</strong>
            </p>
            <p className="text-sm text-slate-500">
              Additional fees may apply for lease renewals, evictions, and major repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Maximize Your Rental Income?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let our experienced team handle your property while you enjoy the benefits of passive income.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-slate-900 bg-white hover:bg-slate-100">
              <Phone className="w-5 h-5 mr-2" />
              Call (972) 555-0123
            </Button>
            <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-transparent">
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
      
      {/* Back to Top */}
      <BackToTop />
    </div>
  );
}
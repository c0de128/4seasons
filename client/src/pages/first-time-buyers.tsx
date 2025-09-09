import { Calculator, Home, DollarSign, Shield, TrendingUp, Users, CheckCircle, AlertCircle, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import firstTimeBuyerImage from "@/assets/images/first-house.jpg";
import savingsImage from "@/assets/images/personalized-service.webp";
import creditScoreImage from "@/assets/images/professionals.jpg";
import mortgageImage from "@/assets/images/negotiation-excellence.jpg";
import inspectionImage from "@/assets/images/relocation-assistance.jpg";
import closingImage from "@/assets/images/north-texas.jpg";

export default function FirstTimeBuyers() {


  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="First-Time Home Buyers Guide - Your Path to Homeownership | 4Seasons Real Estate"
        description="Complete first-time buyer guide for North Texas with mortgage calculator, down payment assistance, and expert guidance. Start your homebuying journey in Dallas-Fort Worth today."
        keywords="first time home buyer Dallas, DFW first time buyer, home buying guide Texas, down payment assistance, mortgage calculator, first time buyer programs, Allen homes first time buyer, Plano first time buyer"
        canonicalUrl={`${seoConfig.siteUrl}/first-time-buyers`}
        ogTitle="First-Time Home Buyer Guide - North Texas Real Estate"
        ogDescription="Your complete guide to buying your first home in North Texas. Mortgage calculators, down payment programs, and expert guidance for DFW first-time buyers."
        ogImage={`${seoConfig.siteUrl}/images/first-time-buyers-dfw.jpg`}
        structuredData={generateStructuredData.service("First-Time Home Buyer Services", "Complete first-time home buyer assistance including mortgage guidance, down payment programs, and step-by-step support for Dallas-Fort Worth area buyers.")}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Your First Home Awaits in
              <span className="text-primary block">North Texas</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Take the first step toward homeownership with confidence. Our comprehensive guide and tools 
              will help you navigate the home buying process from start to finish.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button 
                className="w-full sm:w-auto px-8 py-3 bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors text-lg font-medium rounded-lg"
                onClick={() => window.location.href = '/mortgage-calculator'}
              >
                <Calculator className="w-5 h-5 mr-2 flex-shrink-0" />
                Use Our Calculator
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto px-8 py-3 border-2 border-[#0d0d33] text-[#0d0d33] hover:bg-[#0d0d33] hover:text-white transition-colors text-lg font-medium rounded-lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Users className="w-5 h-5 mr-2 flex-shrink-0" />
                Get Expert Help
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators moved to dedicated pages */}
      {/* Mortgage Calculator: /mortgage-calculator */}
      {/* Home Affordability Calculator: /home-affordability */} 
      {/* Home Savings Calculator: /savings-calculator */}

      {/* Quick Tools Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Helpful Financial Tools
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Use our specialized calculators to plan your home purchase and savings strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/savings-calculator'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <PiggyBank className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Savings Calculator</h3>
                <p className="text-slate-600 mb-4">
                  Calculate how long it will take to save for your down payment and closing costs.
                </p>
                <Button className="w-full bg-[#0d0d33] hover:bg-blue-700 text-white">
                  Plan Your Savings
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/mortgage-calculator'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Mortgage Calculator</h3>
                <p className="text-slate-600 mb-4">
                  Calculate monthly payments, interest costs, and loan details for your home purchase.
                </p>
                <Button className="w-full bg-[#0d0d33] hover:bg-blue-700 text-white">
                  Calculate Payments
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/home-affordability'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Affordability Calculator</h3>
                <p className="text-slate-600 mb-4">
                  Determine how much house you can afford based on your income and expenses.
                </p>
                <Button className="w-full bg-[#0d0d33] hover:bg-blue-700 text-white">
                  Check Affordability
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* First-Time Buyer Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              First-Time Buyer Advantages
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Take advantage of special programs and benefits designed specifically for first-time homebuyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Low Down Payment Options</h3>
                <p className="text-slate-600 mb-4">
                  FHA loans allow as little as 3.5% down. VA loans for veterans offer 0% down payment options.
                </p>
                <ul className="text-sm text-slate-600 text-left space-y-1">
                  <li>• FHA: 3.5% down minimum</li>
                  <li>• VA: 0% down for veterans</li>
                  <li>• USDA: 0% down in rural areas</li>
                  <li>• Conventional: 3-5% down programs</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Down Payment Assistance</h3>
                <p className="text-slate-600 mb-4">
                  Texas and local programs offer grants and low-interest loans to help with down payments.
                </p>
                <ul className="text-sm text-slate-600 text-left space-y-1">
                  <li>• Texas First Time Homebuyer Program</li>
                  <li>• Local city assistance programs</li>
                  <li>• Employer assistance programs</li>
                  <li>• Non-profit organization grants</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Tax Benefits</h3>
                <p className="text-slate-600 mb-4">
                  Homeownership comes with significant tax advantages that can save you thousands annually.
                </p>
                <ul className="text-sm text-slate-600 text-left space-y-1">
                  <li>• Mortgage interest deduction</li>
                  <li>• Property tax deduction</li>
                  <li>• First-time buyer tax credits</li>
                  <li>• Mortgage Credit Certificate</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Home Buying Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Follow our proven 6-step process to successfully purchase your first home with confidence.
            </p>
          </div>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="bg-white shadow-lg overflow-hidden max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-slate-200 aspect-[3/4] lg:aspect-auto">
                  <img 
                    src={savingsImage} 
                    alt="Financial Planning and Pre-approval"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 lg:p-8 bg-slate-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-[#0d0d33] rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Get Pre-approved</h3>
                  </div>
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      Start by getting pre-approved for a mortgage to understand your budget and show sellers you're serious. 
                      We'll connect you with trusted lenders who specialize in first-time buyer programs.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Check credit score and improve if needed</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Gather financial documents</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Compare loan programs and rates</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white shadow-lg overflow-hidden max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-6 lg:p-8 order-2 lg:order-1 bg-slate-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-[#0d0d33] rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Find Your Agent</h3>
                  </div>
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      Partner with an experienced buyer's agent who understands the local market and first-time buyer needs. 
                      Your agent will guide you through the entire process at no cost to you.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Local market expertise</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>First-time buyer experience</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Professional network connections</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-200 aspect-[3/4] lg:aspect-auto order-1 lg:order-2">
                  <img 
                    src={creditScoreImage} 
                    alt="Finding the Right Real Estate Agent"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white shadow-lg overflow-hidden max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-slate-200 aspect-[3/4] lg:aspect-auto">
                  <img 
                    src={firstTimeBuyerImage} 
                    alt="House Hunting Process"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 lg:p-8 bg-slate-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-[#0d0d33] rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Start House Hunting</h3>
                  </div>
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      Begin searching for homes within your budget and criteria. Your agent will set up showings 
                      and help you evaluate each property's potential and value.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Define your must-haves vs. nice-to-haves</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Consider future needs and resale value</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Evaluate neighborhoods and amenities</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white shadow-lg overflow-hidden max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-6 lg:p-8 order-2 lg:order-1 bg-slate-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-[#0d0d33] rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Make an Offer</h3>
                  </div>
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      When you find "the one," your agent will help you craft a competitive offer that protects your interests 
                      while appealing to the seller in today's market.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Competitive pricing strategy</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Appropriate contingencies</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Earnest money and timeline</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-200 aspect-[3/4] lg:aspect-auto order-1 lg:order-2">
                  <img 
                    src={mortgageImage} 
                    alt="Making an Offer on a Home"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white shadow-lg overflow-hidden max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-slate-200 aspect-[3/4] lg:aspect-auto">
                  <img 
                    src={inspectionImage} 
                    alt="Home Inspection Process"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 lg:p-8 bg-slate-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-[#0d0d33] rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">5</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Inspect & Finalize</h3>
                  </div>
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      Once your offer is accepted, you'll order a home inspection, finalize your mortgage, 
                      and handle any repair negotiations before closing.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Professional home inspection</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Appraisal and final loan approval</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Title search and insurance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-white shadow-lg overflow-hidden max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-6 lg:p-8 order-2 lg:order-1 bg-slate-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-[#0d0d33] rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">6</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Close & Move In!</h3>
                  </div>
                  <div className="text-slate-600 leading-relaxed mb-6">
                    <p>
                      At closing, you'll sign the final paperwork, get your keys, and officially become a homeowner. 
                      We'll be there to guide you through every document.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Final walkthrough</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Closing document review</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Get your keys and celebrate!</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-200 aspect-[3/4] lg:aspect-auto order-1 lg:order-2">
                  <img 
                    src={closingImage} 
                    alt="Closing Day and Getting Keys"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes to Avoid */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Avoid These Common First-Timer Mistakes
            </h2>
            <p className="text-lg text-slate-600">
              Learn from others' experiences and sidestep these frequent pitfalls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Not Getting Pre-approved First</h3>
                    <p className="text-slate-600 text-sm">
                      House hunting without pre-approval wastes time and can lead to disappointment. 
                      Get pre-approved before you start looking.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Maxing Out Your Budget</h3>
                    <p className="text-slate-600 text-sm">
                      Just because you qualify for a certain amount doesn't mean you should spend it all. 
                      Leave room for unexpected expenses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Skipping the Home Inspection</h3>
                    <p className="text-slate-600 text-sm">
                      Never waive the inspection contingency to make your offer more attractive. 
                      This could cost you thousands later.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Making Major Purchases</h3>
                    <p className="text-slate-600 text-sm">
                      Avoid major purchases or opening new credit accounts during the home buying process. 
                      This can affect your loan approval.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Not Budgeting for Closing Costs</h3>
                    <p className="text-slate-600 text-sm">
                      Closing costs typically run 2-3% of the home price. Plan for these expenses 
                      in addition to your down payment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Choosing Based on Emotions Only</h3>
                    <p className="text-slate-600 text-sm">
                      While you should love your home, make sure it also makes financial sense. 
                      Consider resale value and long-term costs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ready to Start CTA */}
      <section className="py-20 bg-[#0d0d33] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Buy Your First Home?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let our experienced first-time buyer specialists guide you through every step 
            of the process. Your dream home in North Texas is waiting!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              className="w-full sm:w-auto px-8 py-3 bg-white text-[#0d0d33] hover:bg-gray-100 transition-colors text-lg font-medium rounded-lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Users className="w-5 h-5 mr-2 flex-shrink-0" />
              Get Expert Help
            </Button>
            <Button 
              className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0d0d33] transition-colors text-lg font-medium rounded-lg"
              onClick={() => window.location.href = '/mortgage-calculator'}
            >
              <Calculator className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>Use Our Calculator</span>
            </Button>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
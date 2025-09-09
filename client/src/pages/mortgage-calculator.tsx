import { useState, useEffect } from "react";
import { Calculator, DollarSign, Home, TrendingUp, Shield, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import mortgageCalculatorHeroImage from "@/assets/images/hero-images/6424.jpg";

export default function MortgageCalculator() {
  const [calculator, setCalculator] = useState({
    homePrice: '400000',
    downPaymentPercent: '20',
    interestRate: '7.0',
    loanTerm: '30',
    propertyTax: '1.8',
    homeInsurance: '0.5',
    pmi: '0.5',
    hoaFees: '0'
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    downPayment: 0,
    loanAmount: 0,
    totalMonthly: 0,
    principalAndInterest: 0,
    monthlyTax: 0,
    monthlyInsurance: 0,
    monthlyPMI: 0,
    monthlyHOA: 0,
    totalInterest: 0,
    totalAmountPaid: 0
  });

  // Calculate mortgage details
  useEffect(() => {
    if (calculator.homePrice && parseFloat(calculator.homePrice) > 0) {
      const homePrice = parseFloat(calculator.homePrice);
      const downPaymentPercent = parseFloat(calculator.downPaymentPercent) / 100;
      const downPayment = homePrice * downPaymentPercent;
      const loanAmount = homePrice - downPayment;
      
      const monthlyRate = parseFloat(calculator.interestRate) / 100 / 12;
      const numPayments = parseFloat(calculator.loanTerm) * 12;
      
      // Calculate principal and interest
      let principalAndInterest = 0;
      if (monthlyRate > 0) {
        principalAndInterest = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                              (Math.pow(1 + monthlyRate, numPayments) - 1);
      } else {
        principalAndInterest = loanAmount / numPayments;
      }
      
      // Calculate other monthly costs
      const monthlyTax = (homePrice * parseFloat(calculator.propertyTax) / 100) / 12;
      const monthlyInsurance = (homePrice * parseFloat(calculator.homeInsurance) / 100) / 12;
      const monthlyPMI = downPaymentPercent < 0.2 ? (loanAmount * parseFloat(calculator.pmi) / 100) / 12 : 0;
      const monthlyHOA = parseFloat(calculator.hoaFees) || 0;
      
      const totalMonthly = principalAndInterest + monthlyTax + monthlyInsurance + monthlyPMI + monthlyHOA;
      
      // Calculate total interest and amount paid
      const totalAmountPaid = principalAndInterest * numPayments;
      const totalInterest = totalAmountPaid - loanAmount;
      
      setResults({
        monthlyPayment: principalAndInterest,
        downPayment,
        loanAmount,
        totalMonthly,
        principalAndInterest,
        monthlyTax,
        monthlyInsurance,
        monthlyPMI,
        monthlyHOA,
        totalInterest,
        totalAmountPaid
      });
    }
  }, [calculator]);

  const handleCalculatorChange = (field: string, value: string) => {
    setCalculator(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Mortgage Calculator - Calculate Your Monthly Payments | 4Seasons Real Estate"
        description="Use our free mortgage calculator to estimate monthly payments, down payment requirements, and total interest for homes in North Texas. Plan your home purchase with accurate calculations."
        keywords="mortgage calculator, home loan calculator, monthly payment calculator, Dallas mortgage rates, DFW home loans, Texas mortgage calculator, down payment calculator"
        canonicalUrl={`${seoConfig.siteUrl}/mortgage-calculator`}
        ogTitle="Free Mortgage Calculator - North Texas Real Estate"
        ogDescription="Calculate your monthly mortgage payments, down payment, and total costs for homes in Dallas-Fort Worth. Free mortgage calculator with current rates."
        structuredData={generateStructuredData.service("Mortgage Calculator", "Free online mortgage calculator to estimate monthly payments, down payment requirements, and total interest costs for home purchases in North Texas.")}
      />
      <Navigation />

      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${mortgageCalculatorHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
              Mortgage Payment
              <span className="text-yellow-400 block" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Calculator</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
              Calculate your monthly mortgage payments and see what you can afford. 
              Get accurate estimates based on current rates and your financial situation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button 
                className="w-full sm:w-auto px-8 py-3 bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors text-lg font-medium rounded-lg"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Calculator className="w-5 h-5 mr-2 flex-shrink-0" />
                Start Calculating
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto px-8 py-3 border-2 border-[#0d0d33] text-[#0d0d33] hover:bg-[#0d0d33] hover:text-white transition-colors text-lg font-medium rounded-lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Home className="w-5 h-5 mr-2 flex-shrink-0" />
                Get Pre-Approved
              </Button>
            </div>
          </div>
        </div>
        
        {/* Subtle transition gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
      </section>

      {/* Mortgage Calculator Section */}
      <section id="calculator" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Calculate Your Monthly Payment
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Enter your home purchase details below to see your estimated monthly payment and total costs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-[#0d0d33]" />
                  Mortgage Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="homePrice">Home Price ($)</Label>
                    <Input
                      id="homePrice"
                      type="number"
                      value={calculator.homePrice}
                      onChange={(e) => handleCalculatorChange('homePrice', e.target.value)}
                      placeholder="400000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="downPaymentPercent">Down Payment (%)</Label>
                    <select
                      id="downPaymentPercent"
                      value={calculator.downPaymentPercent}
                      onChange={(e) => handleCalculatorChange('downPaymentPercent', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="3.5">3.5% (FHA)</option>
                      <option value="5">5%</option>
                      <option value="10">10%</option>
                      <option value="15">15%</option>
                      <option value="20">20%</option>
                      <option value="25">25%</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={calculator.interestRate}
                      onChange={(e) => handleCalculatorChange('interestRate', e.target.value)}
                      placeholder="7.0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanTerm">Loan Term (years)</Label>
                    <select
                      id="loanTerm"
                      value={calculator.loanTerm}
                      onChange={(e) => handleCalculatorChange('loanTerm', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="15">15 years</option>
                      <option value="20">20 years</option>
                      <option value="30">30 years</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="propertyTax">Property Tax (%/year)</Label>
                    <Input
                      id="propertyTax"
                      type="number"
                      step="0.1"
                      value={calculator.propertyTax}
                      onChange={(e) => handleCalculatorChange('propertyTax', e.target.value)}
                      placeholder="1.8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="homeInsurance">Home Insurance (%/year)</Label>
                    <Input
                      id="homeInsurance"
                      type="number"
                      step="0.1"
                      value={calculator.homeInsurance}
                      onChange={(e) => handleCalculatorChange('homeInsurance', e.target.value)}
                      placeholder="0.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pmi">PMI (%/year)</Label>
                    <Input
                      id="pmi"
                      type="number"
                      step="0.1"
                      value={calculator.pmi}
                      onChange={(e) => handleCalculatorChange('pmi', e.target.value)}
                      placeholder="0.5"
                    />
                    <p className="text-xs text-slate-500 mt-1">Applied if down payment &lt; 20%</p>
                  </div>
                  <div>
                    <Label htmlFor="hoaFees">HOA Fees ($/month)</Label>
                    <Input
                      id="hoaFees"
                      type="number"
                      value={calculator.hoaFees}
                      onChange={(e) => handleCalculatorChange('hoaFees', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-6 h-6 mr-2 text-[#0d0d33]" />
                  Monthly Payment Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-[#0d0d33] text-white p-4 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm opacity-90">Total Monthly Payment</p>
                      <p className="text-3xl font-bold">{formatCurrency(results.totalMonthly)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Principal & Interest:</span>
                      <span className="font-medium">{formatCurrency(results.principalAndInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Property Tax:</span>
                      <span className="font-medium">{formatCurrency(results.monthlyTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Home Insurance:</span>
                      <span className="font-medium">{formatCurrency(results.monthlyInsurance)}</span>
                    </div>
                    {results.monthlyPMI > 0 && (
                      <div className="flex justify-between">
                        <span>PMI:</span>
                        <span className="font-medium">{formatCurrency(results.monthlyPMI)}</span>
                      </div>
                    )}
                    {results.monthlyHOA > 0 && (
                      <div className="flex justify-between">
                        <span>HOA Fees:</span>
                        <span className="font-medium">{formatCurrency(results.monthlyHOA)}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between font-medium">
                      <span>Down Payment Required:</span>
                      <span className="text-[#0d0d33]">{formatCurrency(results.downPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loan Amount:</span>
                      <span>{formatCurrency(results.loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest Paid:</span>
                      <span>{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Amount Paid:</span>
                      <span>{formatCurrency(results.totalAmountPaid)}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>💡 Tip:</strong> Your total monthly housing costs should typically not exceed 28% of your gross monthly income.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Current Rates</h3>
                <p className="text-slate-600">
                  Interest rates change daily. Contact us for the most current rates and personalized quotes.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Pre-Approval</h3>
                <p className="text-slate-600">
                  Get pre-approved to know your exact budget and show sellers you're a serious buyer.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <PiggyBank className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Down Payment</h3>
                <p className="text-slate-600">
                  Save 20% to avoid PMI, or explore low down payment options starting at 3.5% for FHA loans.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0d0d33] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Now that you know what you can afford, let our expert agents help you 
            find the perfect home in North Texas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              className="w-full sm:w-auto px-8 py-3 bg-white text-[#0d0d33] hover:bg-gray-100 transition-colors text-lg font-medium rounded-lg"
              onClick={() => window.location.href = '/buy'}
            >
              <Home className="w-5 h-5 mr-2 flex-shrink-0" />
              Search Properties
            </Button>
            <Button 
              className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0d0d33] transition-colors text-lg font-medium rounded-lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Calculator className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>Get Expert Help</span>
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
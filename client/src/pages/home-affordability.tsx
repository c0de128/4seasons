import { useState, useEffect } from "react";
import { Calculator, DollarSign, Home, TrendingUp, PiggyBank, CreditCard, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import homeAffordabilityImage from "@/assets/images/first-house.jpg";
import budgetPlanningImage from "@/assets/images/personalized-service.webp";
import mortgageBasicsImage from "@/assets/images/professionals.jpg";
import creditScoreImage from "@/assets/images/negotiation-excellence.jpg";

export default function HomeAffordability() {
  const [calculator, setCalculator] = useState({
    annualIncome: '',
    monthlyDebts: '',
    downPayment: '',
    interestRate: '7.0',
    loanTerm: '30',
    propertyTax: '1.8',
    homeInsurance: '0.5',
    pmi: '0.5',
    hoaFees: '0'
  });

  const [results, setResults] = useState({
    maxHomePrice: 0,
    maxMonthlyPayment: 0,
    monthlyIncome: 0,
    maxDebtToIncomeRatio: 28,
    totalMonthlyHousing: 0,
    recommendedDownPayment: 0
  });

  // Calculate affordability
  useEffect(() => {
    if (calculator.annualIncome && parseFloat(calculator.annualIncome) > 0) {
      const annualIncome = parseFloat(calculator.annualIncome);
      const monthlyIncome = annualIncome / 12;
      const monthlyDebts = parseFloat(calculator.monthlyDebts) || 0;
      
      // Use 28% rule for housing expenses
      const maxMonthlyHousing = monthlyIncome * 0.28;
      
      // Use 36% rule for total debt including housing
      const maxTotalDebt = monthlyIncome * 0.36;
      const availableForHousing = maxTotalDebt - monthlyDebts;
      
      // Use the lower of the two limits
      const maxMonthlyPayment = Math.min(maxMonthlyHousing, availableForHousing);
      
      // Calculate maximum home price based on monthly payment
      const interestRate = parseFloat(calculator.interestRate) / 100 / 12;
      const loanTerm = parseFloat(calculator.loanTerm) * 12;
      const propertyTaxRate = parseFloat(calculator.propertyTax) / 100 / 12;
      const homeInsuranceRate = parseFloat(calculator.homeInsurance) / 100 / 12;
      const pmiRate = parseFloat(calculator.pmi) / 100 / 12;
      const monthlyHOA = parseFloat(calculator.hoaFees) || 0;
      
      // Estimate non-principal/interest costs as percentage of home value
      const nonPIRates = propertyTaxRate + homeInsuranceRate + pmiRate;
      const availableForPI = maxMonthlyPayment - monthlyHOA;
      
      // Calculate max home price using mortgage payment formula
      let maxHomePrice = 0;
      if (interestRate > 0) {
        // Solve for home price considering all monthly costs
        // Monthly payment = (P * r * (1 + r)^n) / ((1 + r)^n - 1) + (P * nonPIRates) + HOA
        // Where P is loan amount (home price - down payment)
        
        const downPaymentPercent = calculator.downPayment ? parseFloat(calculator.downPayment) / 100 : 0.2;
        
        // Iterative approach to find max home price
        for (let price = 100000; price <= 2000000; price += 1000) {
          const loanAmount = price * (1 - downPaymentPercent);
          const monthlyPI = loanAmount * (interestRate * Math.pow(1 + interestRate, loanTerm)) / 
                           (Math.pow(1 + interestRate, loanTerm) - 1);
          const monthlyOtherCosts = price * nonPIRates;
          const totalMonthly = monthlyPI + monthlyOtherCosts + monthlyHOA;
          
          if (totalMonthly > maxMonthlyPayment) {
            maxHomePrice = price - 1000;
            break;
          }
        }
      }
      
      const recommendedDownPayment = maxHomePrice * 0.2;
      
      setResults({
        maxHomePrice,
        maxMonthlyPayment,
        monthlyIncome,
        maxDebtToIncomeRatio: 28,
        totalMonthlyHousing: maxMonthlyPayment,
        recommendedDownPayment
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

  const formatPercentage = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(amount / 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Home Affordability Calculator - How Much House Can I Afford? | 4Seasons Real Estate"
        description="Calculate how much house you can afford in North Texas with our comprehensive home affordability calculator. Get personalized recommendations based on your income, debts, and down payment."
        keywords="home affordability calculator Dallas, how much house can I afford DFW, mortgage calculator Texas, home buying budget planner, debt to income ratio calculator, North Texas home affordability"
        canonicalUrl={`${seoConfig.siteUrl}/home-affordability`}
        ogTitle="Home Affordability Calculator - North Texas Real Estate"
        ogDescription="Find out exactly how much house you can afford in the Dallas-Fort Worth area with our expert home affordability calculator and guidance."
        ogImage={`${seoConfig.siteUrl}/images/home-affordability-dfw.jpg`}
        structuredData={generateStructuredData.service("Home Affordability Calculator", "Expert home affordability calculation and guidance for Dallas-Fort Worth area home buyers with personalized budget recommendations.")}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              How Much House
              <span className="text-[#0d0d33] block">Can You Afford?</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Get a clear picture of your home buying budget with our comprehensive affordability calculator, 
              designed specifically for North Texas home buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Home Affordability Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Home Affordability Calculator
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Enter your financial information to discover your ideal home buying budget and monthly payment range.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Calculator Input */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 text-[#0d0d33] mr-2" />
                  Your Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="annualIncome">Annual Gross Income ($)</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={calculator.annualIncome}
                    onChange={(e) => handleCalculatorChange('annualIncome', e.target.value)}
                    placeholder="75000"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Include all sources of income before taxes
                  </p>
                </div>

                <div>
                  <Label htmlFor="monthlyDebts">Monthly Debt Payments ($)</Label>
                  <Input
                    id="monthlyDebts"
                    type="number"
                    value={calculator.monthlyDebts}
                    onChange={(e) => handleCalculatorChange('monthlyDebts', e.target.value)}
                    placeholder="500"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Car loans, credit cards, student loans, etc.
                  </p>
                </div>

                <div>
                  <Label htmlFor="downPayment">Down Payment (%)</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    value={calculator.downPayment}
                    onChange={(e) => handleCalculatorChange('downPayment', e.target.value)}
                    placeholder="20"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Percentage of home price you can put down
                  </p>
                </div>

                <div>
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    value={calculator.interestRate}
                    onChange={(e) => handleCalculatorChange('interestRate', e.target.value)}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Current mortgage interest rate
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="loanTerm">Loan Term (years)</Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      value={calculator.loanTerm}
                      onChange={(e) => handleCalculatorChange('loanTerm', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hoaFees">HOA Fees ($)</Label>
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
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="w-5 h-5 text-[#0d0d33] mr-2" />
                  Your Home Affordability Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-8">
                  <p className="text-sm text-slate-600 mb-2">Maximum Home Price</p>
                  <p className="text-4xl font-bold text-[#0d0d33]">{formatCurrency(results.maxHomePrice)}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Max Monthly Payment:</span>
                    <span className="font-medium">{formatCurrency(results.maxMonthlyPayment)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Monthly Income:</span>
                    <span className="font-medium">{formatCurrency(results.monthlyIncome)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Recommended Down Payment:</span>
                    <span className="font-medium">{formatCurrency(results.recommendedDownPayment)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 border-l-4 border-[#0d0d33] bg-blue-50">
                  <h4 className="font-medium text-slate-900 mb-2">Debt-to-Income Guidelines</h4>
                  <p className="text-sm text-slate-600">
                    This calculation uses the 28/36 rule: no more than 28% of gross income for housing 
                    and 36% for total debt payments.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Affordability Factors */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Factors That Affect Home Affordability
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Understanding these key factors will help you make informed decisions about your home purchase.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Income & Employment */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={budgetPlanningImage} 
                alt="Income and Employment"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 text-[#0d0d33] mr-2" />
                  Income & Employment
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    Stable employment history (2+ years)
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    Consistent or increasing income
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    Multiple income sources strengthen application
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    Self-employed need 2 years tax returns
                  </li>
                </ul>
              </div>
            </div>

            {/* Credit Score */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={creditScoreImage} 
                alt="Credit Score Impact"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 text-[#0d0d33] mr-2" />
                  Credit Score Impact
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Excellent (740+):</span>
                    <span className="font-medium text-green-600">Best rates</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Good (670-739):</span>
                    <span className="font-medium text-blue-600">Competitive rates</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Fair (580-669):</span>
                    <span className="font-medium text-yellow-600">Higher rates</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Poor (below 580):</span>
                    <span className="font-medium text-red-600">FHA/VA options</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Down Payment Options */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={homeAffordabilityImage} 
                alt="Down Payment Options"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <PiggyBank className="w-5 h-5 text-[#0d0d33] mr-2" />
                  Down Payment Options
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Conventional (20%):</span>
                      <span className="text-sm text-slate-600">No PMI required</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">FHA (3.5%):</span>
                      <span className="text-sm text-slate-600">Lower down payment</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">VA (0%):</span>
                      <span className="text-sm text-slate-600">Veterans only</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">USDA (0%):</span>
                      <span className="text-sm text-slate-600">Rural areas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Conditions */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={mortgageBasicsImage} 
                alt="Market Conditions"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 text-[#0d0d33] mr-2" />
                  Market Conditions
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    Interest rates affect monthly payments
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    Home prices vary by North Texas area
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    Property taxes differ by county
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    Competition affects negotiation power
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips to Improve Affordability */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Tips to Improve Your Home Affordability
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Increase your buying power with these proven strategies for North Texas home buyers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Improve Credit Score</h3>
              <p className="text-slate-600">
                Pay down credit cards, avoid new debt, and check your credit report for errors. 
                Even a 20-point increase can save thousands.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                <PiggyBank className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Save More Down Payment</h3>
              <p className="text-slate-600">
                Higher down payment reduces loan amount, eliminates PMI, and gives you more 
                negotiating power in competitive markets.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Pay Down Debt</h3>
              <p className="text-slate-600">
                Reduce monthly debt payments to improve your debt-to-income ratio and 
                qualify for a larger mortgage amount.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Shop for Better Rates</h3>
              <p className="text-slate-600">
                Compare rates from multiple lenders. A 0.25% difference can save $50+ monthly 
                on a $300k mortgage.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Consider Different Areas</h3>
              <p className="text-slate-600">
                Explore nearby North Texas communities with lower home prices but similar 
                amenities and commute times.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Get Pre-Approved</h3>
              <p className="text-slate-600">
                Pre-approval gives you exact budget numbers and shows sellers you're a 
                serious buyer in competitive markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
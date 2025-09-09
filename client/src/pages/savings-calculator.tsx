import { useState, useEffect } from "react";
import { PiggyBank, Calculator, Clock, CheckCircle, AlertCircle, TrendingUp, DollarSign, Target, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";

export default function SavingsCalculator() {
  const [savingsGoal, setSavingsGoal] = useState({
    targetAmount: '',
    currentSavings: '',
    monthlyContribution: '',
    timeToGoal: 0,
    recommendedSavings: 120000
  });

  // Calculate savings timeline
  useEffect(() => {
    if (savingsGoal.targetAmount && savingsGoal.currentSavings && savingsGoal.monthlyContribution) {
      const target = parseFloat(savingsGoal.targetAmount);
      const current = parseFloat(savingsGoal.currentSavings) || 0;
      const monthly = parseFloat(savingsGoal.monthlyContribution);
      
      if (!isNaN(target) && !isNaN(current) && !isNaN(monthly) && target > current && monthly > 0) {
        const remaining = target - current;
        const months = Math.ceil(remaining / monthly);
        setSavingsGoal(prev => ({ ...prev, timeToGoal: months }));
      } else if (target <= current && !isNaN(target) && !isNaN(current)) {
        // Goal already reached
        setSavingsGoal(prev => ({ ...prev, timeToGoal: 0 }));
      } else {
        setSavingsGoal(prev => ({ ...prev, timeToGoal: 0 }));
      }
    } else {
      setSavingsGoal(prev => ({ ...prev, timeToGoal: 0 }));
    }
  }, [savingsGoal.targetAmount, savingsGoal.currentSavings, savingsGoal.monthlyContribution]);

  const handleSavingsChange = (field: string, value: string) => {
    setSavingsGoal(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateMonthsToGoal = (target: number, current: number, monthly: number) => {
    if (target <= current) return 0;
    return Math.ceil((target - current) / monthly);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Home Savings Calculator - Plan Your Down Payment Goal | 4Seasons Real Estate"
        description="Calculate how long it will take to save for your down payment and closing costs. Plan your path to homeownership in North Texas with our free savings calculator."
        keywords="savings calculator, down payment calculator, home savings planner, first time buyer savings, Dallas home savings, DFW down payment, Texas home buying savings"
        canonicalUrl={`${seoConfig.siteUrl}/savings-calculator`}
        ogTitle="Home Savings Calculator - North Texas Real Estate"
        ogDescription="Plan your path to homeownership! Calculate savings timeline for down payment and closing costs with our free home savings calculator."
        structuredData={generateStructuredData.service("Home Savings Calculator", "Free savings calculator to help plan your down payment and closing costs timeline for home purchases in North Texas.")}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Home Savings
              <span className="text-primary block">Calculator</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Plan your path to homeownership by calculating how long it will take to save 
              for your down payment, closing costs, and emergency fund.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button 
                className="w-full sm:w-auto px-8 py-3 bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors text-lg font-medium rounded-lg"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <PiggyBank className="w-5 h-5 mr-2 flex-shrink-0" />
                Start Planning
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto px-8 py-3 border-2 border-[#0d0d33] text-[#0d0d33] hover:bg-[#0d0d33] hover:text-white transition-colors text-lg font-medium rounded-lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Home className="w-5 h-5 mr-2 flex-shrink-0" />
                Get Expert Guidance
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator Section */}
      <section id="calculator" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Calculate Your Savings Timeline
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Enter your savings goal and monthly contribution to see when you'll be ready to buy.
            </p>
          </div>

          <Card className="max-w-7xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <PiggyBank className="w-6 h-6 mr-2 text-[#0d0d33]" />
                Home Savings Goal Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <Label htmlFor="targetAmount">
                        Target Savings ($) <span className="text-red-500 text-xs">*required</span>
                      </Label>
                      <Input
                        id="targetAmount"
                        type="number"
                        value={savingsGoal.targetAmount}
                        onChange={(e) => handleSavingsChange('targetAmount', e.target.value)}
                        placeholder="120000"
                        required
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Recommended: {formatCurrency(savingsGoal.recommendedSavings)}
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="currentSavings">
                        Current Savings ($) <span className="text-red-500 text-xs">*required</span>
                      </Label>
                      <Input
                        id="currentSavings"
                        type="number"
                        value={savingsGoal.currentSavings}
                        onChange={(e) => handleSavingsChange('currentSavings', e.target.value)}
                        placeholder="50000"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyContribution">
                        Monthly Savings ($) <span className="text-red-500 text-xs">*required</span>
                      </Label>
                      <Input
                        id="monthlyContribution"
                        type="number"
                        value={savingsGoal.monthlyContribution}
                        onChange={(e) => handleSavingsChange('monthlyContribution', e.target.value)}
                        placeholder="2000"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="bg-slate-100 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-[#0d0d33]" />
                      Typical First-Time Buyer Savings Breakdown
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                      <div className="space-y-2">
                        <div className="flex">
                          <span className="w-48">Down Payment (5-20%):</span>
                          <span className="font-medium">$20,000 - $80,000</span>
                        </div>
                        <div className="flex">
                          <span className="w-48">Closing Costs (2-5%):</span>
                          <span className="font-medium">$8,000 - $20,000</span>
                        </div>
                        <div className="flex">
                          <span className="w-48">Moving & Setup:</span>
                          <span className="font-medium">$3,000 - $8,000</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Emergency Fund (3-6 months):</span>
                          <span className="font-medium">$15,000 - $30,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Home Repairs/Improvements:</span>
                          <span className="font-medium">$5,000 - $15,000</span>
                        </div>
                        <div className="flex justify-between font-semibold pt-2 border-t border-slate-300">
                          <span>Total Recommended:</span>
                          <span className="text-[#0d0d33]">$51,000 - $153,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      className="px-6 py-3 bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors"
                      onClick={() => window.location.href = '/mortgage-calculator'}
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      Calculate Payments
                    </Button>
                    <Button 
                      variant="outline"
                      className="px-6 py-3 border-2 border-[#0d0d33] text-[#0d0d33] hover:bg-[#0d0d33] hover:text-white transition-colors"
                      onClick={() => window.location.href = '/home-affordability'}
                    >
                      <Home className="w-5 h-5 mr-2" />
                      Check Affordability
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {savingsGoal.targetAmount && savingsGoal.currentSavings && (
                    <>
                      {parseFloat(savingsGoal.currentSavings) >= parseFloat(savingsGoal.targetAmount) ? (
                        <div className="bg-green-50 p-6 rounded-lg text-center">
                          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                          <p className="text-sm text-green-800 mb-2">Goal Achieved!</p>
                          <p className="text-3xl font-bold text-green-600 mb-2">Ready to Buy</p>
                          <p className="text-xs text-green-700">
                            You've saved enough for your target amount
                          </p>
                          <Button 
                            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => window.location.href = '/buy'}
                          >
                            Start House Hunting
                          </Button>
                        </div>
                      ) : savingsGoal.timeToGoal > 0 && savingsGoal.monthlyContribution ? (
                        <div className="bg-blue-50 p-6 rounded-lg text-center">
                          <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                          <p className="text-sm text-blue-800 mb-2">Time to Goal</p>
                          <p className="text-3xl font-bold text-blue-600 mb-1">
                            {Math.floor(savingsGoal.timeToGoal / 12)}y {savingsGoal.timeToGoal % 12}m
                          </p>
                          <p className="text-xs text-blue-700 mb-4">
                            At ${savingsGoal.monthlyContribution}/month
                          </p>
                          
                          {/* Savings milestones */}
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span>Amount needed:</span>
                              <span className="font-medium">{formatCurrency(parseFloat(savingsGoal.targetAmount) - parseFloat(savingsGoal.currentSavings))}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Target date:</span>
                              <span className="font-medium">
                                {new Date(Date.now() + savingsGoal.timeToGoal * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                                  month: 'long', 
                                  year: 'numeric' 
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : savingsGoal.monthlyContribution === '' && parseFloat(savingsGoal.targetAmount) > parseFloat(savingsGoal.currentSavings) ? (
                        <div className="bg-yellow-50 p-6 rounded-lg text-center">
                          <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                          <p className="text-sm text-yellow-800 mb-2">Enter Monthly Savings</p>
                          <p className="text-xs text-yellow-700">
                            Add your monthly contribution to see your timeline
                          </p>
                        </div>
                      ) : null}
                    </>
                  )}
                  {!savingsGoal.targetAmount && (
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <PiggyBank className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-2">Get Started</p>
                      <p className="text-xs text-gray-500">
                        Enter your savings information to calculate your timeline
                      </p>
                    </div>
                  )}
                  
                  {/* Quick scenario buttons */}
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-medium text-sm text-slate-700 mb-3">Quick Scenarios:</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs"
                        onClick={() => {
                          setSavingsGoal(prev => ({
                            ...prev,
                            targetAmount: '80000',
                            currentSavings: '20000',
                            monthlyContribution: '1500'
                          }));
                        }}
                      >
                        Conservative: $80k goal, $1.5k/month
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs"
                        onClick={() => {
                          setSavingsGoal(prev => ({
                            ...prev,
                            targetAmount: '120000',
                            currentSavings: '40000',
                            monthlyContribution: '2000'
                          }));
                        }}
                      >
                        Moderate: $120k goal, $2k/month
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs"
                        onClick={() => {
                          setSavingsGoal(prev => ({
                            ...prev,
                            targetAmount: '150000',
                            currentSavings: '60000',
                            monthlyContribution: '3000'
                          }));
                        }}
                      >
                        Aggressive: $150k goal, $3k/month
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Savings Tips Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Smart Savings Strategies
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Proven tips to help you reach your homeownership goals faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Automate Savings</h3>
                <p className="text-slate-600">
                  Set up automatic transfers to a dedicated home savings account. Pay yourself first before other expenses.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Reduce Expenses</h3>
                <p className="text-slate-600">
                  Cut unnecessary subscriptions, eat out less, and find ways to reduce monthly bills to boost your savings rate.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">High-Yield Account</h3>
                <p className="text-slate-600">
                  Keep your home savings in a high-yield savings account to earn more interest while you save.
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
            Ready to Start Your Savings Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get personalized guidance on saving for your down payment and finding 
            the right home loan programs for your situation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              className="w-full sm:w-auto px-8 py-3 bg-white text-[#0d0d33] hover:bg-gray-100 transition-colors text-lg font-medium rounded-lg"
              onClick={() => window.location.href = '/first-time-buyers'}
            >
              <Home className="w-5 h-5 mr-2 flex-shrink-0" />
              First-Time Buyer Guide
            </Button>
            <Button 
              className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0d0d33] transition-colors text-lg font-medium rounded-lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <PiggyBank className="w-5 h-5 mr-2 flex-shrink-0" />
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
import { useState, useEffect } from "react";
import { PiggyBank, Calculator, Clock, CheckCircle, AlertCircle, TrendingUp, DollarSign, Target, Home, Plus, CreditCard, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import savingsCalculatorHeroImage from "@/assets/images/hero-images/70104.jpg";

export default function SavingsCalculator() {
  const [savingsGoal, setSavingsGoal] = useState({
    targetAmount: '',
    currentSavings: '',
    monthlyContribution: '',
    timeToGoal: 0,
    recommendedSavings: 120000
  });

  const [savingsContactFormData, setSavingsContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentSavings: '',
    savingsGoal: '',
    timeline: '',
    challenges: '',
    message: ''
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

  const handleSavingsContactChange = (field: string, value: string) => {
    setSavingsContactFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSavingsContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Savings consultation form submitted:', savingsContactFormData);
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
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${savingsCalculatorHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
              Home Savings
              <span className="text-yellow-400 block" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Calculator</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
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
        
        {/* Subtle transition gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
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
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
              Research shows that strategic savers reach their down payment goals 40% faster than those who save randomly. 
              These proven methods can accelerate your path to homeownership and help you build wealth along the way.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg max-w-2xl mx-auto">
              <p className="text-sm text-blue-800">
                <strong>Pro Tip:</strong> Implementing just 2-3 of these strategies can increase your monthly savings by $300-800 on average.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Automate Savings</h3>
                <p className="text-slate-600 mb-4">
                  Set up automatic transfers to a dedicated home savings account. Pay yourself first before other expenses.
                </p>
                <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded">
                  <strong>Impact:</strong> Saves $200-500/month on average by eliminating impulse spending
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Reduce Expenses</h3>
                <p className="text-slate-600 mb-4">
                  Cut unnecessary subscriptions, eat out less, and find ways to reduce monthly bills to boost your savings rate.
                </p>
                <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded">
                  <strong>Impact:</strong> Average savings of $300-600/month through expense optimization
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">High-Yield Account</h3>
                <p className="text-slate-600 mb-4">
                  Keep your home savings in a high-yield savings account to earn more interest while you save.
                </p>
                <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded">
                  <strong>Impact:</strong> Earn $1,000-3,000 extra annually with 4-5% APY vs. traditional savings
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Generate Side Income</h3>
                <p className="text-slate-600 mb-4">
                  Freelance, part-time work, or monetize skills to accelerate your savings timeline significantly.
                </p>
                <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded">
                  <strong>Impact:</strong> Extra $500-2,000/month can cut savings timeline by 50-70%
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Eliminate High-Interest Debt</h3>
                <p className="text-slate-600 mb-4">
                  Pay off credit cards and high-interest loans first to free up more money for home savings.
                </p>
                <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded">
                  <strong>Impact:</strong> Eliminating $5,000 credit card debt frees $200-400/month for savings
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Maximize Windfalls</h3>
                <p className="text-slate-600 mb-4">
                  Direct tax refunds, bonuses, raises, and gift money directly to your home savings fund.
                </p>
                <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded">
                  <strong>Impact:</strong> Average windfall of $3,000-8,000 annually can reduce timeline by 6-18 months
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Strategy Breakdown */}
          <div className="bg-slate-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Actionable Implementation Guide
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-[#0d0d33]" />
                  Quick Wins (Start This Week)
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0d0d33] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Set up automatic transfer:</strong> Schedule $500-2,000 to move to savings the day after payday</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0d0d33] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Audit subscriptions:</strong> Cancel unused streaming services, gym memberships, and software subscriptions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0d0d33] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Switch to high-yield account:</strong> Move savings to earn 4-5% APY instead of 0.1%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0d0d33] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Meal prep Sundays:</strong> Cook weekly meals to reduce dining out by $200-400/month</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-[#0d0d33]" />
                  Medium-Term Strategies (Next 3 Months)
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0d0d33] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Negotiate bills:</strong> Call providers to reduce insurance, phone, and utility costs by 10-30%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0d0d33] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Side hustle launch:</strong> Start freelancing, tutoring, or selling items online for extra income</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0d0d33] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Debt avalanche:</strong> Pay minimums on all debts, extra payments on highest interest rate first</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0d0d33] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Housing hack:</strong> Consider getting a roommate or renting out parking/storage space</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-[#0d0d33]" />
                Track Your Progress
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded border">
                  <strong className="text-slate-900">Weekly Check-ins:</strong>
                  <p className="text-slate-600 mt-1">Review spending, adjust budget, celebrate small wins</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <strong className="text-slate-900">Monthly Reviews:</strong>
                  <p className="text-slate-600 mt-1">Calculate savings rate, reassess timeline, optimize strategies</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <strong className="text-slate-900">Quarterly Goals:</strong>
                  <p className="text-slate-600 mt-1">Set milestone targets, reward progress, adjust savings goals</p>
                </div>
              </div>
            </div>
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

      {/* Savings Consultation Form */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Get Expert Savings Strategy Consultation
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ready to accelerate your path to homeownership? Our savings specialists will create a personalized 
              strategy to help you reach your down payment goals faster and maximize your buying power.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSavingsContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="savings-name">Full Name *</Label>
                  <Input
                    id="savings-name"
                    type="text"
                    value={savingsContactFormData.name}
                    onChange={(e) => handleSavingsContactChange('name', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="savings-email">Email Address *</Label>
                  <Input
                    id="savings-email"
                    type="email"
                    value={savingsContactFormData.email}
                    onChange={(e) => handleSavingsContactChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="savings-phone">Phone Number *</Label>
                  <Input
                    id="savings-phone"
                    type="tel"
                    value={savingsContactFormData.phone}
                    onChange={(e) => handleSavingsContactChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="savings-current">Current Savings Amount</Label>
                  <Input
                    id="savings-current"
                    type="text"
                    value={savingsContactFormData.currentSavings}
                    onChange={(e) => handleSavingsContactChange('currentSavings', e.target.value)}
                    placeholder="$50,000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="savings-goal-amount">Target Savings Goal</Label>
                  <Input
                    id="savings-goal-amount"
                    type="text"
                    value={savingsContactFormData.savingsGoal}
                    onChange={(e) => handleSavingsContactChange('savingsGoal', e.target.value)}
                    placeholder="$120,000"
                  />
                </div>
                <div>
                  <Label htmlFor="savings-timeline">Desired Timeline</Label>
                  <Input
                    id="savings-timeline"
                    type="text"
                    value={savingsContactFormData.timeline}
                    onChange={(e) => handleSavingsContactChange('timeline', e.target.value)}
                    placeholder="2-3 years"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="savings-challenges">Biggest Savings Challenges</Label>
                <Input
                  id="savings-challenges"
                  type="text"
                  value={savingsContactFormData.challenges}
                  onChange={(e) => handleSavingsContactChange('challenges', e.target.value)}
                  placeholder="High expenses, irregular income, debt payments, etc."
                />
              </div>

              <div>
                <Label htmlFor="savings-message">Additional Questions or Goals</Label>
                <Textarea
                  id="savings-message"
                  value={savingsContactFormData.message}
                  onChange={(e) => handleSavingsContactChange('message', e.target.value)}
                  placeholder="Tell us about your specific situation, any questions about savings strategies, or what you'd like to focus on during our consultation..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors py-3 text-lg font-medium"
              >
                <PiggyBank className="w-5 h-5 mr-2" />
                Schedule My Savings Consultation
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Custom Analysis</strong><br />Personalized savings roadmap</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Strategy Optimization</strong><br />Maximize your savings rate</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d0d33] rounded-full flex items-center justify-center mx-auto mb-2">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <p><strong>Home Buying Prep</strong><br />Get ready for success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}
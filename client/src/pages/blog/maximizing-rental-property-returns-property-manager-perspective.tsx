import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import { Calendar, User, Clock, Eye, ArrowLeft, Share, BookOpen, Tag, DollarSign, Shield, Users, Wrench, FileText, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import AmyImage from "@/assets/images/Amy-sm.jpg";

export function MaximizingRentalPropertyReturns() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPost = {
    title: "Maximizing Rental Property Returns: A Property Manager's Perspective",
    excerpt: "Professional strategies for optimizing your rental property investment and maintaining positive cash flow.",
    author: "Amy Harwood",
    date: "2024-12-05",
    readTime: "7 min read",
    views: 1563,
    category: "property-management",
    tags: ["Property Management", "Rental Investment", "Cash Flow"]
  };

  const structuredData = generateStructuredData.article(
    blogPost.title,
    blogPost.excerpt,
    blogPost.author,
    new Date(blogPost.date).toISOString()
  );

  return (
    <>
      <SEO 
        title={`${blogPost.title} | 4Seasons Real Estate Blog`}
        description={blogPost.excerpt}
        keywords="rental property returns, property management, rental investment, cash flow optimization, property management strategies"
        canonicalUrl={`${seoConfig.siteUrl}/blog/maximizing-rental-property-returns-property-manager-perspective`}
        ogTitle={blogPost.title}
        ogDescription={blogPost.excerpt}
        ogImage={`${seoConfig.siteUrl}/images/blog/rental-property-management.jpg`}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <main className="pt-20">
          {/* Header Section */}
          <section className="py-12 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="px-3 py-1 text-xs font-medium text-white rounded-full" style={{ backgroundColor: '#0d0d33' }}>
                    Property Management
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Investment Strategy
                  </span>
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(blogPost.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {blogPost.readTime}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Eye className="w-4 h-4 mr-1" />
                    {blogPost.views.toLocaleString()} views
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
                  {blogPost.title}
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed">
                  {blogPost.excerpt}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-slate-600" />
                  <span className="text-slate-600">By {blogPost.author}</span>
                </div>
                <button className="flex items-center text-slate-600 hover:text-slate-800">
                  <Share className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </section>

          {/* Article Content */}
          <article className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none">
                
                {/* Introduction */}
                <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                  <div className="flex items-start">
                    <DollarSign className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-900 mb-2">The Professional Advantage</h3>
                      <p className="text-green-800">
                        Owning rental property can be a lucrative investment, but success requires strategic management and attention to detail. As property management professionals, we've seen what works and what doesn't in the North Texas rental market.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Setting Competitive Rental Rates */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                    <TrendingUp className="w-8 h-8 mr-3" style={{ color: '#0d0d33' }} />
                    Setting Competitive Rental Rates
                  </h2>
                  
                  <p className="text-slate-700 mb-6">
                    Pricing your rental correctly is crucial for minimizing vacancy and maximizing returns. Research comparable properties in your area, but don't just look at listing prices – find out what properties actually rent for.
                  </p>

                  <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Key Pricing Factors</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Property Features</h4>
                        <ul className="space-y-2 text-slate-700">
                          <li>• Square footage and bedroom count</li>
                          <li>• Recent renovations and upgrades</li>
                          <li>• Appliances and amenities included</li>
                          <li>• Parking availability</li>
                          <li>• Outdoor space (yard, patio, balcony)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Location Benefits</h4>
                        <ul className="space-y-2 text-slate-700">
                          <li>• School district quality</li>
                          <li>• Proximity to employment centers</li>
                          <li>• Public transportation access</li>
                          <li>• Shopping and entertainment nearby</li>
                          <li>• Neighborhood safety and appeal</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tip</h4>
                    <p className="text-blue-700">
                      Consider offering a slightly below-market rent to attract high-quality tenants quickly. The cost of vacancy often exceeds the benefit of holding out for top dollar, especially in a competitive rental market.
                    </p>
                  </div>
                </section>

                {/* Tenant Screening */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                    <Users className="w-8 h-8 mr-3" style={{ color: '#0d0d33' }} />
                    Tenant Screening Is Everything
                  </h2>
                  
                  <p className="text-slate-700 mb-6">
                    The quality of your tenants directly impacts your property's profitability and your peace of mind. Implement a thorough screening process that protects your investment while complying with fair housing laws.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Essential Screening Steps</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3" style={{ backgroundColor: '#0d0d33' }}>1</div>
                          <div>
                            <h4 className="font-semibold text-slate-900">Credit Check</h4>
                            <p className="text-slate-600 text-sm">Review credit score, payment history, and outstanding debts</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3" style={{ backgroundColor: '#0d0d33' }}>2</div>
                          <div>
                            <h4 className="font-semibold text-slate-900">Income Verification</h4>
                            <p className="text-slate-600 text-sm">Require proof of income (typically 3x monthly rent)</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3" style={{ backgroundColor: '#0d0d33' }}>3</div>
                          <div>
                            <h4 className="font-semibold text-slate-900">Rental History</h4>
                            <p className="text-slate-600 text-sm">Contact previous landlords for references</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3" style={{ backgroundColor: '#0d0d33' }}>4</div>
                          <div>
                            <h4 className="font-semibold text-slate-900">Background Check</h4>
                            <p className="text-slate-600 text-sm">Criminal history and eviction records</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Red Flags to Watch</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-red-500 mr-3"></span>
                          Inconsistent employment history
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-red-500 mr-3"></span>
                          Multiple recent evictions
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-red-500 mr-3"></span>
                          Incomplete or rushed applications
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-red-500 mr-3"></span>
                          Unwillingness to provide references
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-red-500 mr-3"></span>
                          Pressure to skip screening steps
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Preventive Maintenance */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                    <Wrench className="w-8 h-8 mr-3" style={{ color: '#0d0d33' }} />
                    Preventive Maintenance Saves Money
                  </h2>
                  
                  <p className="text-slate-700 mb-6">
                    Regular maintenance prevents small issues from becoming expensive problems. Create a maintenance schedule that protects your investment and keeps tenants satisfied.
                  </p>

                  <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Tasks</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li>• HVAC filter replacement</li>
                        <li>• Exterior inspection</li>
                        <li>• Pest control monitoring</li>
                        <li>• Smoke detector testing</li>
                        <li>• Appliance checks</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quarterly Tasks</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li>• Deep cleaning inspection</li>
                        <li>• Plumbing maintenance</li>
                        <li>• Caulking and sealing</li>
                        <li>• Landscaping upkeep</li>
                        <li>• Safety equipment check</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Annual Tasks</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li>• HVAC system service</li>
                        <li>• Water heater maintenance</li>
                        <li>• Roof and gutter inspection</li>
                        <li>• Paint touch-ups</li>
                        <li>• Flooring assessment</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h4 className="font-semibold text-amber-800 mb-2">⚠️ Texas Climate Considerations</h4>
                    <p className="text-amber-700">
                      North Texas weather can be harsh on properties. Pay special attention to HVAC systems during extreme heat, foundation monitoring during drought conditions, and storm damage inspections after severe weather events.
                    </p>
                  </div>
                </section>

                {/* Legal Compliance */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                    <Shield className="w-8 h-8 mr-3" style={{ color: '#0d0d33' }} />
                    Legal Compliance and Documentation
                  </h2>
                  
                  <p className="text-slate-700 mb-6">
                    Texas landlord-tenant law has specific requirements for security deposits, notice periods, and eviction procedures. Ensure all your leases comply with local and state laws, and maintain detailed records of all communications and transactions.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Essential Legal Requirements</h3>
                      <ul className="space-y-3 text-slate-700">
                        <li className="flex items-start">
                          <FileText className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Security Deposits:</strong> Must be returned within 30 days with itemized deductions</span>
                        </li>
                        <li className="flex items-start">
                          <FileText className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Entry Notice:</strong> 24-hour notice required for non-emergency entry</span>
                        </li>
                        <li className="flex items-start">
                          <FileText className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Habitability:</strong> Maintain property in livable condition</span>
                        </li>
                        <li className="flex items-start">
                          <FileText className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Fair Housing:</strong> Comply with federal and state discrimination laws</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Documentation Best Practices</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li>• Keep detailed maintenance records</li>
                        <li>• Document all tenant communications</li>
                        <li>• Take photos before and after tenancy</li>
                        <li>• Maintain financial records for taxes</li>
                        <li>• Store documents securely and accessibly</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Technology and Efficiency */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Technology and Efficiency</h2>
                  
                  <p className="text-slate-700 mb-6">
                    Modern property management software can streamline rent collection, maintenance requests, and tenant communication. Online portals make it easier for tenants to pay rent on time and report issues promptly.
                  </p>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Technology Benefits</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">For Property Owners</h4>
                        <ul className="space-y-1 text-slate-700">
                          <li>• Automated rent collection</li>
                          <li>• Real-time financial reporting</li>
                          <li>• Maintenance tracking</li>
                          <li>• Document storage</li>
                          <li>• Performance analytics</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">For Tenants</h4>
                        <ul className="space-y-1 text-slate-700">
                          <li>• Online rent payments</li>
                          <li>• Maintenance request portal</li>
                          <li>• Communication platform</li>
                          <li>• Document access</li>
                          <li>• Payment history tracking</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Professional Property Management */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Professional Property Management Benefits</h2>
                  
                  <p className="text-slate-700 mb-6">
                    While self-managing saves on fees, professional property management can often pay for itself through improved efficiency, reduced vacancy, and expert handling of complex situations.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-900 mb-4">Value Proposition</h3>
                      <ul className="space-y-2 text-green-800">
                        <li>• Reduced vacancy times through marketing expertise</li>
                        <li>• Professional tenant screening and retention</li>
                        <li>• Maintenance cost savings through vendor relationships</li>
                        <li>• Legal protection and compliance expertise</li>
                        <li>• Time savings for busy property owners</li>
                        <li>• 24/7 emergency response capability</li>
                      </ul>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">When to Consider Professional Management</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li>• Multiple properties to manage</li>
                        <li>• Out-of-state or distant properties</li>
                        <li>• Limited time for hands-on management</li>
                        <li>• Lack of maintenance knowledge/contacts</li>
                        <li>• Desire for legal protection</li>
                        <li>• Scaling your investment portfolio</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Financial Planning */}
                <section className="mb-8">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Financial Planning and Record Keeping</h2>
                    <p className="text-slate-700 mb-6">
                      Maintain detailed financial records for tax purposes and investment analysis. Track all income and expenses, including depreciation, repairs, and improvements. Consider setting aside 5-10% of rental income for unexpected repairs and maintenance.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-2">Track Income</h4>
                        <p className="text-slate-600 text-sm">Rent, late fees, pet deposits, application fees</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-2">Monitor Expenses</h4>
                        <p className="text-slate-600 text-sm">Maintenance, utilities, insurance, property management</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-2">Plan for Growth</h4>
                        <p className="text-slate-600 text-sm">Reserve funds, property improvements, portfolio expansion</p>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </article>

          {/* Tags */}
          <section className="py-8 border-t border-slate-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="w-5 h-5 text-slate-600" />
                <span className="text-slate-600 font-medium mr-2">Tags:</span>
                {blogPost.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Author Bio */}
          <section className="py-12 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="flex items-start gap-6">
                  <img 
                    src={AmyImage} 
                    alt="Amy Harwood - Property Management Expert" 
                    className="w-20 h-20 rounded-full object-cover shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Amy Harwood</h3>
                    <p className="text-slate-600 mb-4">
                      Amy Harwood has over 15 years of experience in North Texas real estate and property management. She has successfully managed hundreds of rental properties, helping investors maximize their returns while maintaining high tenant satisfaction. Her expertise spans from single-family homes to large apartment complexes.
                    </p>
                    <div className="flex items-center text-slate-600">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span className="text-sm">Property Management Expert | Real Estate Investment Specialist</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Posts */}
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/2025-north-texas-housing-market-predictions" className="block bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <span className="px-3 py-1 text-xs font-medium text-white rounded-full mb-3 inline-block" style={{ backgroundColor: '#0d0d33' }}>
                    Market Trends
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 hover:text-blue-600">
                    2025 North Texas Housing Market Predictions
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Expert analysis and forecasts for the DFW real estate market in 2025...
                  </p>
                </Link>
                
                <Link href="/blog/first-time-home-buyer-guide-north-texas" className="block bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <span className="px-3 py-1 text-xs font-medium text-white rounded-full mb-3 inline-block" style={{ backgroundColor: '#0d0d33' }}>
                    Buying
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 hover:text-blue-600">
                    First-Time Home Buyer's Guide to North Texas
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Navigate the DFW real estate market with confidence. Essential tips for first-time buyers...
                  </p>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Contact />
        <Footer />
      </div>
    </>
  );
}
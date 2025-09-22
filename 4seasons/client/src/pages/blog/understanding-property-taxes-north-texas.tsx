import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import { Calendar, User, Clock, Eye, ArrowLeft, Share, BookOpen, Tag, Calculator, FileText, AlertTriangle, DollarSign, TrendingUp, Home, Shield } from "lucide-react";
import { Link } from "wouter";
import TimImage from "@/assets/images/tim-sm.jpg";
import { ShareButtons, FloatingShareButton } from "@/components/ShareButtons";

export function UnderstandingPropertyTaxesNorthTexas() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPost = {
    title: "Understanding Property Taxes in North Texas",
    excerpt: "A comprehensive guide to property tax assessment, calculation, and strategies for North Texas homeowners.",
    author: "Tim Harwood",
    date: "2024-12-10",
    readTime: "9 min read",
    views: 1823,
    category: "tax-guidance",
    tags: ["Property Taxes", "North Texas", "Homeowner Tips", "Tax Planning"]
  };

  const currentUrl = `${seoConfig.siteUrl}/blog/understanding-property-taxes-north-texas`;

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
        keywords="North Texas property taxes, property tax assessment, homestead exemption, property tax appeal, Texas property tax rates"
        canonicalUrl={`${seoConfig.siteUrl}/blog/understanding-property-taxes-north-texas`}
        ogTitle={blogPost.title}
        ogDescription={blogPost.excerpt}
        ogImage={`${seoConfig.siteUrl}/images/blog/north-texas-property-taxes.jpg`}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <main className="pt-20">
          {/* Header Section */}
          <section className="py-12 bg-gradient-to-r from-blue-50 to-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="px-3 py-1 text-xs font-medium text-white rounded-full" style={{ backgroundColor: '#0d0d33' }}>
                    Tax Guidance
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Homeowner Tips
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
                <ShareButtons 
                  url={currentUrl}
                  title={blogPost.title}
                  excerpt={blogPost.excerpt}
                  className="hidden sm:flex"
                />
              </div>
            </div>
          </section>

          {/* Important Disclaimer */}
          <section className="py-8 bg-yellow-50 border-b border-yellow-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Disclaimer</h3>
                    <p className="text-yellow-800 mb-2">
                      This article provides general information about property taxes in North Texas for educational purposes only. Tax laws and regulations are complex and subject to change.
                    </p>
                    <p className="text-yellow-800">
                      <strong>This information is not intended as tax or legal advice.</strong> Always consult with a qualified tax professional, certified public accountant (CPA), or tax attorney for guidance specific to your situation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Article Content */}
          <article className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none">
                
                {/* Introduction */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                  <div className="flex items-start">
                    <Calculator className="w-6 h-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">Property Tax Basics</h3>
                      <p className="text-blue-800">
                        Property taxes are a significant ongoing cost of homeownership in North Texas. Understanding how they're calculated, what exemptions are available, and how to potentially reduce them can save thousands of dollars annually.
                      </p>
                    </div>
                  </div>
                </div>

                {/* How Property Taxes Are Calculated */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                    <Calculator className="w-8 h-8 mr-3" style={{ color: '#0d0d33' }} />
                    How Property Taxes Are Calculated
                  </h2>
                  
                  <p className="text-slate-700 mb-6">
                    Property taxes in North Texas are calculated using a simple formula, but understanding each component is crucial for homeowners.
                  </p>

                  <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">The Property Tax Formula</h3>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900 mb-2">
                          Assessed Value × Tax Rate = Annual Property Tax
                        </div>
                        <p className="text-slate-600 text-sm">
                          (Market Value - Exemptions) × Combined Tax Rate = Your Tax Bill
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                          <Home className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-2">Market Value</h4>
                        <p className="text-slate-600 text-sm">Appraised value of your property as determined by the county appraisal district</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                          <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-2">Exemptions</h4>
                        <p className="text-slate-600 text-sm">Deductions from market value (homestead, senior, disability, etc.)</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                          <DollarSign className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-2">Tax Rate</h4>
                        <p className="text-slate-600 text-sm">Combined rate from all taxing entities (school, county, city, etc.)</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Example Calculation</h4>
                    <div className="space-y-2 text-slate-700">
                      <div className="flex justify-between">
                        <span>Market Value:</span>
                        <span className="font-medium">$400,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Homestead Exemption:</span>
                        <span className="font-medium">-$40,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Assessed Value:</span>
                        <span className="font-medium">$360,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Combined Tax Rate:</span>
                        <span className="font-medium">2.5%</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 text-lg font-bold">
                        <span>Annual Property Tax:</span>
                        <span className="text-green-600">$9,000</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* County Comparison */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">North Texas County Tax Rates</h2>
                  
                  <p className="text-slate-700 mb-6">
                    Property tax rates vary significantly across North Texas counties. Here's a general comparison of typical combined tax rates:
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Denton County</h3>
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-blue-600">2.2% - 2.8%</div>
                        <p className="text-slate-600 text-sm">Typical combined rate</p>
                      </div>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Growing districts with newer facilities</li>
                        <li>• Strong property value appreciation</li>
                        <li>• Higher rates in premium school districts</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Dallas County</h3>
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-blue-600">2.0% - 2.7%</div>
                        <p className="text-slate-600 text-sm">Typical combined rate</p>
                      </div>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Varies widely by school district</li>
                        <li>• Urban areas may have additional taxes</li>
                        <li>• Some older districts have lower rates</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Tarrant County</h3>
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-blue-600">2.1% - 2.6%</div>
                        <p className="text-slate-600 text-sm">Typical combined rate</p>
                      </div>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Generally competitive rates</li>
                        <li>• Established infrastructure</li>
                        <li>• Fort Worth area variations</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h4 className="font-semibold text-amber-800 mb-2">⚠️ Important Note</h4>
                    <p className="text-amber-700">
                      Tax rates change annually and vary by specific taxing entities within each county. Always check with your local appraisal district for current rates and your specific property's assessment.
                    </p>
                  </div>
                </section>

                {/* Homestead Exemptions */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                    <Shield className="w-8 h-8 mr-3" style={{ color: '#0d0d33' }} />
                    Homestead Exemptions and Other Savings
                  </h2>
                  
                  <p className="text-slate-700 mb-6">
                    Exemptions can significantly reduce your property tax burden. The homestead exemption is the most common, but other exemptions may apply.
                  </p>

                  <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Primary Homestead Exemption</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">State Requirements</h4>
                          <ul className="space-y-1 text-slate-700">
                            <li>• Must be your primary residence</li>
                            <li>• Must own and occupy on January 1st</li>
                            <li>• Automatic $40,000 school tax exemption</li>
                            <li>• 10% assessment cap on increases</li>
                            <li>• Application required once</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Additional Local Exemptions</h4>
                          <ul className="space-y-1 text-slate-700">
                            <li>• County exemptions (varies by county)</li>
                            <li>• City exemptions (varies by municipality)</li>
                            <li>• Hospital district exemptions</li>
                            <li>• Emergency services district exemptions</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Special Exemptions</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Age-Based Exemptions</h4>
                          <ul className="space-y-1 text-slate-700">
                            <li>• Age 65+: Additional $10,000 school exemption</li>
                            <li>• Age 65+: Assessment freeze available</li>
                            <li>• Surviving spouse: May keep deceased spouse's exemptions</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Disability Exemptions</h4>
                          <ul className="space-y-1 text-slate-700">
                            <li>• Disabled veterans: Percentage-based exemptions</li>
                            <li>• 100% disabled veterans: Complete exemption</li>
                            <li>• General disability: Additional exemptions available</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Property Tax Appeals */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Property Tax Appeals Process</h2>
                  
                  <p className="text-slate-700 mb-6">
                    If you believe your property is overvalued, you have the right to appeal your assessment. The process has specific deadlines and procedures.
                  </p>

                  <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">When to Consider an Appeal</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Strong Appeal Indicators</h4>
                        <ul className="space-y-1 text-slate-700">
                          <li>• Assessment exceeds recent sale price</li>
                          <li>• Higher than comparable neighborhood properties</li>
                          <li>• Property has significant damage or issues</li>
                          <li>• Market conditions have declined since assessment</li>
                          <li>• Assessment increased significantly without improvements</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Evidence to Gather</h4>
                        <ul className="space-y-1 text-slate-700">
                          <li>• Recent comparable sales (within 6 months)</li>
                          <li>• Professional appraisal</li>
                          <li>• Photos of property condition issues</li>
                          <li>• Repair estimates for major problems</li>
                          <li>• Market analysis from real estate professional</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Appeal Timeline</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3" style={{ backgroundColor: '#0d0d33' }}>1</div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Informal Review (Optional)</h4>
                          <p className="text-slate-600 text-sm">Contact appraisal district to discuss your concerns informally before formal appeal</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3" style={{ backgroundColor: '#0d0d33' }}>2</div>
                        <div>
                          <h4 className="font-semibold text-slate-900">File Notice of Appeal</h4>
                          <p className="text-slate-600 text-sm">Submit formal appeal by May 15th (or 30 days after notice, whichever is later)</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3" style={{ backgroundColor: '#0d0d33' }}>3</div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Appraisal Review Board Hearing</h4>
                          <p className="text-slate-600 text-sm">Present your case to independent review board with evidence and documentation</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3" style={{ backgroundColor: '#0d0d33' }}>4</div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Decision and Further Appeals</h4>
                          <p className="text-slate-600 text-sm">Receive written decision; further appeals to district court available if unsuccessful</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Payment Options and Strategies */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Payment Options and Strategies</h2>
                  
                  <p className="text-slate-700 mb-6">
                    Understanding your payment options can help you manage cash flow and potentially save money on property taxes.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Payment Options</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-slate-900">Annual Payment</h4>
                          <p className="text-slate-600 text-sm">Pay full amount by January 31st to avoid penalties and interest</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Split Payment</h4>
                          <p className="text-slate-600 text-sm">Half by November 30th, half by June 30th (no penalty if both paid on time)</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Installment Plans</h4>
                          <p className="text-slate-600 text-sm">Some counties offer monthly payment plans (may include fees)</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Escrow Through Mortgage</h4>
                          <p className="text-slate-600 text-sm">Lender collects and pays taxes as part of monthly payment</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-900 mb-4">Tax Planning Strategies</h3>
                      <ul className="space-y-2 text-green-800">
                        <li>• Set aside 1/12 of annual taxes monthly</li>
                        <li>• Take advantage of all available exemptions</li>
                        <li>• Monitor assessment notices annually</li>
                        <li>• Consider timing of home improvements</li>
                        <li>• Keep records of property condition issues</li>
                        <li>• Stay informed about local tax rate changes</li>
                        <li>• Budget for increases when buying</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Important Resources */}
                <section className="mb-8">
                  <div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Important Resources and Contacts</h2>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Denton County</h4>
                        <ul className="space-y-1 text-slate-700 text-sm">
                          <li>• Denton Central Appraisal District</li>
                          <li>• dcad.org</li>
                          <li>• (940) 349-3800</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Dallas County</h4>
                        <ul className="space-y-1 text-slate-700 text-sm">
                          <li>• Dallas Central Appraisal District</li>
                          <li>• dallascad.org</li>
                          <li>• (214) 631-0910</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Tarrant County</h4>
                        <ul className="space-y-1 text-slate-700 text-sm">
                          <li>• Tarrant Appraisal District</li>
                          <li>• tad.org</li>
                          <li>• (817) 284-7500</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Professional Tip</h4>
                      <p className="text-blue-700">
                        Property taxes are deductible on federal income taxes (subject to SALT limitations). Keep detailed records and consult with a tax professional about maximizing your deductions while staying compliant with current tax laws.
                      </p>
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
                    src={TimImage} 
                    alt="Tim Harwood - Real Estate Tax Consultant" 
                    className="w-20 h-20 rounded-full object-cover shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Tim Harwood</h3>
                    <p className="text-slate-600 mb-4">
                      Tim Harwood has over 20 years of experience in North Texas real estate and property tax consulting. He has helped hundreds of homeowners understand their property tax obligations and successfully appeal overassessments, saving clients thousands of dollars annually.
                    </p>
                    <div className="flex items-center text-slate-600">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span className="text-sm">Property Tax Consultant | Real Estate Investment Advisor</span>
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
              </div>
            </div>
          </section>
        </main>

        <Contact />
        <Footer />
        
        {/* Floating Share Button for Mobile */}
        <FloatingShareButton 
          url={currentUrl}
          title={blogPost.title}
          excerpt={blogPost.excerpt}
        />
      </div>
    </>
  );
}

export default UnderstandingPropertyTaxesNorthTexas;
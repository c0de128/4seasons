import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import { Calendar, User, Clock, Eye, ArrowLeft, Share, BookOpen, Tag, TrendingUp, TrendingDown, Home, DollarSign, BarChart3, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import AmyImage from "@/assets/images/Amy-sm.jpg";

export function NorthTexasMarketPredictions2025() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPost = {
    title: "2025 North Texas Housing Market Predictions",
    excerpt: "Expert analysis and forecasts for the DFW real estate market in 2025. Key trends, price predictions, and strategic insights for buyers and sellers.",
    author: "Amy Harwood",
    date: "2025-01-15",
    readTime: "10 min read",
    views: 1256,
    category: "market-trends",
    tags: ["Market Forecast", "North Texas", "2025 Predictions", "Real Estate Trends"]
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
        keywords="North Texas housing market 2025, DFW real estate forecast, Dallas housing predictions, Texas market trends, real estate outlook 2025"
        canonicalUrl={`${seoConfig.siteUrl}/blog/2025-north-texas-housing-market-predictions`}
        ogTitle={blogPost.title}
        ogDescription={blogPost.excerpt}
        ogImage={`${seoConfig.siteUrl}/images/blog/north-texas-market-2025.jpg`}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <main className="pt-20">
          {/* Header Section */}
          <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="px-3 py-1 text-xs font-medium text-white rounded-full" style={{ backgroundColor: '#0d0d33' }}>
                    Market Trends
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    2025 Forecast
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
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                  <div className="flex items-start">
                    <BarChart3 className="w-6 h-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">Market Outlook for 2025</h3>
                      <p className="text-blue-800">
                        As we enter 2025, the North Texas housing market stands at a pivotal moment. After years of rapid growth, shifting economic conditions and evolving buyer preferences are reshaping the DFW real estate landscape.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Market Indicators */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                    <TrendingUp className="w-8 h-8 mr-3" style={{ color: '#0d0d33' }} />
                    Key Market Indicators for 2025
                  </h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                        <Home className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">Inventory Levels</h3>
                      <p className="text-2xl font-bold text-green-600 mb-1">↑ 15-20%</p>
                      <p className="text-sm text-slate-600">Expected increase from 2024</p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">Price Growth</h3>
                      <p className="text-2xl font-bold text-blue-600 mb-1">3-5%</p>
                      <p className="text-sm text-slate-600">Moderate appreciation</p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">Days on Market</h3>
                      <p className="text-2xl font-bold text-orange-600 mb-1">25-35</p>
                      <p className="text-sm text-slate-600">Longer than 2024</p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">Interest Rates</h3>
                      <p className="text-2xl font-bold text-purple-600 mb-1">6.0-6.5%</p>
                      <p className="text-sm text-slate-600">Potential stabilization</p>
                    </div>
                  </div>
                </section>

                {/* Regional Analysis */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Regional Market Analysis</h2>
                  
                  <div className="space-y-8">
                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                        <span className="w-3 h-3 rounded-full bg-green-500 mr-3"></span>
                        Denton County - Strong Growth Continues
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Growth Drivers</h4>
                          <ul className="space-y-1 text-slate-700">
                            <li>• Top-rated school districts (Frisco, Plano ISD)</li>
                            <li>• Corporate relocations and job growth</li>
                            <li>• New master-planned communities</li>
                            <li>• Infrastructure improvements</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">2025 Predictions</h4>
                          <ul className="space-y-1 text-slate-700">
                            <li>• 4-6% price appreciation</li>
                            <li>• Continued buyer demand</li>
                            <li>• New construction activity</li>
                            <li>• Premium market strength</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                        <span className="w-3 h-3 rounded-full bg-blue-500 mr-3"></span>
                        Dallas County - Market Stabilization
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Market Characteristics</h4>
                          <ul className="space-y-1 text-slate-700">
                            <li>• Diverse price points and communities</li>
                            <li>• Urban revitalization projects</li>
                            <li>• Transportation improvements</li>
                            <li>• Mixed-use development growth</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">2025 Outlook</h4>
                          <ul className="space-y-1 text-slate-700">
                            <li>• 2-4% price growth</li>
                            <li>• Increased inventory options</li>
                            <li>• First-time buyer opportunities</li>
                            <li>• Urban condo market growth</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                        <span className="w-3 h-3 rounded-full bg-orange-500 mr-3"></span>
                        Tarrant County - Value Market Leader
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Market Advantages</h4>
                          <ul className="space-y-1 text-slate-700">
                            <li>• Affordability compared to other counties</li>
                            <li>• Established neighborhoods</li>
                            <li>• Strong rental market</li>
                            <li>• Investment opportunities</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">2025 Forecast</h4>
                          <ul className="space-y-1 text-slate-700">
                            <li>• 3-5% appreciation</li>
                            <li>• Increased buyer activity</li>
                            <li>• Renovation and flip potential</li>
                            <li>• First-time buyer focus</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Economic Factors */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Economic Factors Shaping 2025</h2>
                  
                  <div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                          Positive Influences
                        </h3>
                        <ul className="space-y-2 text-slate-700">
                          <li className="flex items-start">
                            <span className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></span>
                            <span><strong>Job Market Strength:</strong> Texas continues to attract major corporations and create high-paying jobs</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></span>
                            <span><strong>Population Growth:</strong> In-migration from high-cost states maintains housing demand</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></span>
                            <span><strong>No State Income Tax:</strong> Continued appeal for relocating families and businesses</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></span>
                            <span><strong>Infrastructure Investment:</strong> Ongoing transportation and utility improvements</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                          <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                          Challenges to Monitor
                        </h3>
                        <ul className="space-y-2 text-slate-700">
                          <li className="flex items-start">
                            <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 mr-3 flex-shrink-0"></span>
                            <span><strong>Interest Rate Sensitivity:</strong> Mortgage rates continue to impact buyer purchasing power</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 mr-3 flex-shrink-0"></span>
                            <span><strong>Affordability Concerns:</strong> Rising home prices strain middle-income buyers</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 mr-3 flex-shrink-0"></span>
                            <span><strong>Insurance Costs:</strong> Rising homeowners insurance premiums affect overall housing costs</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 mr-3 flex-shrink-0"></span>
                            <span><strong>Property Tax Burden:</strong> Increasing valuations lead to higher tax bills</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Buyer and Seller Strategies */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Strategic Advice for 2025</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-green-900 mb-4">For Home Buyers</h3>
                      <ul className="space-y-3 text-green-800">
                        <li className="flex items-start">
                          <span className="font-semibold mr-2">✓</span>
                          <span><strong>Be Patient:</strong> More inventory means better selection and negotiating power</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-semibold mr-2">✓</span>
                          <span><strong>Get Pre-Approved:</strong> Understand your budget with current interest rates</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-semibold mr-2">✓</span>
                          <span><strong>Consider All Counties:</strong> Explore value opportunities in different areas</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-semibold mr-2">✓</span>
                          <span><strong>Factor Total Costs:</strong> Include taxes, insurance, and HOA fees</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">For Home Sellers</h3>
                      <ul className="space-y-3 text-blue-800">
                        <li className="flex items-start">
                          <span className="font-semibold mr-2">✓</span>
                          <span><strong>Price Strategically:</strong> Competitive pricing attracts more buyers</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-semibold mr-2">✓</span>
                          <span><strong>Enhance Presentation:</strong> Professional staging and photography matter more</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-semibold mr-2">✓</span>
                          <span><strong>Be Flexible:</strong> Consider buyer requests and negotiate terms</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-semibold mr-2">✓</span>
                          <span><strong>Time It Right:</strong> Spring market typically offers best conditions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Investment Outlook */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Real Estate Investment Outlook</h2>
                  
                  <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Investment Opportunities in 2025</h3>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                          <Home className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-2">Single-Family Rentals</h4>
                        <p className="text-slate-600 text-sm">Strong rental demand continues, especially in Tarrant County value markets</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                          <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-2">Fix-and-Flip</h4>
                        <p className="text-slate-600 text-sm">Opportunities in established neighborhoods with renovation potential</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d0d33' }}>
                          <BarChart3 className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-2">Commercial Growth</h4>
                        <p className="text-slate-600 text-sm">Mixed-use developments and retail opportunities in growing areas</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Conclusion */}
                <section className="mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Looking Ahead: A Balanced Market</h2>
                    <p className="text-slate-700 mb-6">
                      The 2025 North Texas housing market is expected to transition from the extreme seller's market of recent years to a more balanced environment. This shift creates opportunities for both buyers and sellers who approach the market with realistic expectations and strategic planning.
                    </p>
                    <p className="text-slate-700 mb-6">
                      While price growth will moderate, the fundamental strengths of the North Texas economy—job growth, population increases, and business-friendly policies—continue to support long-term real estate appreciation. Success in 2025 will depend on understanding local market dynamics and adapting strategies accordingly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#0d0d33' }}>
                        Discuss Market Strategy
                      </Link>
                      <Link href="/home-valuation" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                        Get Home Valuation
                      </Link>
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
                    alt="Amy Harwood - Real Estate Market Expert" 
                    className="w-20 h-20 rounded-full object-cover shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Amy Harwood</h3>
                    <p className="text-slate-600 mb-4">
                      Amy Harwood brings over 15 years of North Texas real estate expertise to her market analysis. As a top-producing agent and market analyst, she combines deep local knowledge with data-driven insights to help clients navigate changing market conditions with confidence.
                    </p>
                    <div className="flex items-center text-slate-600">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span className="text-sm">Market Analyst | North Texas Real Estate Expert</span>
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
                <Link href="/blog/5-signs-time-to-sell-home-north-texas" className="block bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <span className="px-3 py-1 text-xs font-medium text-white rounded-full mb-3 inline-block" style={{ backgroundColor: '#0d0d33' }}>
                    Selling
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 hover:text-blue-600">
                    5 Signs It's Time to Sell Your Home in North Texas
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Discover key indicators that suggest it might be the perfect time to sell your North Texas home...
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
                    Navigate the DFW real estate market with confidence. Essential tips and guidance for first-time buyers...
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
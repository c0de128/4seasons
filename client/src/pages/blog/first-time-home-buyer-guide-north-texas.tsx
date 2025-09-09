import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import { Calendar, User, Clock, Eye, ArrowLeft, Share, BookOpen, Tag, Home, DollarSign, Calculator, MapPin, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import TimImage from "@/assets/images/tim-sm.jpg";

export function FirstTimeBuyerGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPost = {
    title: "First-Time Home Buyer's Guide to North Texas",
    excerpt: "Navigate the DFW real estate market with confidence. Essential tips, local insights, and step-by-step guidance for first-time home buyers in North Texas.",
    author: "Tim Harwood",
    date: "2024-01-18",
    readTime: "12 min read",
    views: 2847,
    category: "buying",
    tags: ["First-Time Buyers", "North Texas", "Home Buying Process", "DFW Market"]
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
        keywords="first time home buyer, North Texas, DFW real estate, home buying guide, Texas first time buyer programs, North Texas communities"
        canonicalUrl={`${seoConfig.siteUrl}/blog/first-time-home-buyer-guide-north-texas`}
        ogTitle={blogPost.title}
        ogDescription={blogPost.excerpt}
        ogImage={`${seoConfig.siteUrl}/images/blog/first-time-buyer-guide.jpg`}
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
                    Home Buying
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
                    <Home className="w-6 h-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">Your Journey to Homeownership Starts Here</h3>
                      <p className="text-blue-800">
                        Buying your first home in North Texas is an exciting milestone. This comprehensive guide will walk you through every step of the process, from understanding your budget to closing on your dream home in the DFW metroplex.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 1: Financial Preparation */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                    <DollarSign className="w-8 h-8 mr-3" style={{ color: '#0d0d33' }} />
                    Step 1: Financial Preparation
                  </h2>
                  
                  <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Understanding Your Budget</h3>
                    <p className="text-slate-700 mb-4">
                      Before you start house hunting, it's crucial to understand what you can afford. In North Texas, where home prices vary significantly between communities, having a clear budget helps you focus on realistic options.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-2">Key Financial Factors</h4>
                        <ul className="space-y-2 text-slate-700">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Credit score (aim for 620+)</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Down payment (3-20%)</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Debt-to-income ratio</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Emergency fund</li>
                        </ul>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-2">North Texas Price Ranges</h4>
                        <ul className="space-y-2 text-slate-700">
                          <li>• Denton County: $300K - $800K+</li>
                          <li>• Dallas County: $250K - $1M+</li>
                          <li>• Tarrant County: $200K - $900K+</li>
                          <li>• Premium areas: $500K - $2M+</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h4 className="font-semibold text-amber-800 mb-2">💡 Pro Tip</h4>
                    <p className="text-amber-700">
                      Get pre-approved for a mortgage before house hunting. In North Texas's competitive market, pre-approval shows sellers you're serious and can move quickly on your offer.
                    </p>
                  </div>
                </section>

                {/* Step 2: Choosing Your Location */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                    <MapPin className="w-8 h-8 mr-3" style={{ color: '#0d0d33' }} />
                    Step 2: Choosing Your North Texas Community
                  </h2>
                  
                  <p className="text-slate-700 mb-6">
                    North Texas offers diverse communities, each with unique character and amenities. Consider these factors when choosing your location:
                  </p>

                  <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Denton County</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li>• Excellent schools (Frisco, Plano ISD)</li>
                        <li>• Family-friendly communities</li>
                        <li>• Growing job market</li>
                        <li>• New construction options</li>
                      </ul>
                      <p className="text-sm text-slate-600 mt-4">
                        <strong>Best for:</strong> Families, young professionals
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Dallas County</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li>• Urban lifestyle options</li>
                        <li>• Cultural amenities</li>
                        <li>• Diverse price points</li>
                        <li>• Public transportation</li>
                      </ul>
                      <p className="text-sm text-slate-600 mt-4">
                        <strong>Best for:</strong> Urban professionals, cultural enthusiasts
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Tarrant County</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li>• Established neighborhoods</li>
                        <li>• Sports and entertainment</li>
                        <li>• Value opportunities</li>
                        <li>• Historic charm</li>
                      </ul>
                      <p className="text-sm text-slate-600 mt-4">
                        <strong>Best for:</strong> First-time buyers, value seekers
                      </p>
                    </div>
                  </div>
                </section>

                {/* Step 3: The Home Buying Process */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                    <CheckCircle className="w-8 h-8 mr-3" style={{ color: '#0d0d33' }} />
                    Step 3: The Home Buying Process
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-4" style={{ backgroundColor: '#0d0d33' }}>1</div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Find a Qualified Real Estate Agent</h3>
                        <p className="text-slate-700">Choose an agent familiar with North Texas markets who understands first-time buyer needs and local neighborhoods.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-4" style={{ backgroundColor: '#0d0d33' }}>2</div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Start Your Home Search</h3>
                        <p className="text-slate-700">Use online tools and attend open houses. In North Texas, inventory moves quickly, so be prepared to act fast on properties you love.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-4" style={{ backgroundColor: '#0d0d33' }}>3</div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Make an Offer</h3>
                        <p className="text-slate-700">Your agent will help you craft a competitive offer based on comparable sales and market conditions in your chosen North Texas community.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-4" style={{ backgroundColor: '#0d0d33' }}>4</div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Home Inspection & Appraisal</h3>
                        <p className="text-slate-700">Schedule a professional inspection to identify any issues. The lender will also order an appraisal to confirm the home's value.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-4" style={{ backgroundColor: '#0d0d33' }}>5</div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Finalize Your Mortgage</h3>
                        <p className="text-slate-700">Work with your lender to complete all required documentation and lock in your interest rate.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-4" style={{ backgroundColor: '#0d0d33' }}>6</div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Close on Your Home</h3>
                        <p className="text-slate-700">Review all documents, do a final walkthrough, and sign the paperwork to officially become a homeowner!</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* North Texas Market Insights */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">North Texas Market Insights</h2>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">What Makes North Texas Special for First-Time Buyers</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Market Advantages</h4>
                        <ul className="space-y-1 text-slate-700">
                          <li>• No state income tax</li>
                          <li>• Job growth and economic stability</li>
                          <li>• Diverse housing options</li>
                          <li>• Strong school districts</li>
                          <li>• Growing tech and business sectors</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Things to Consider</h4>
                        <ul className="space-y-1 text-slate-700">
                          <li>• Competitive market conditions</li>
                          <li>• Property taxes vary by location</li>
                          <li>• Weather considerations (storms)</li>
                          <li>• Traffic and commute times</li>
                          <li>• HOA fees in newer communities</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* First-Time Buyer Programs */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">First-Time Buyer Programs & Incentives</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Texas State Programs</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1" /><strong>My First Texas Home:</strong> Down payment assistance for eligible buyers</li>
                        <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1" /><strong>Texas Bootstrap:</strong> Self-help housing program for low-income families</li>
                        <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1" /><strong>USDA Rural Development:</strong> No down payment loans for eligible rural areas</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Federal Programs</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1" /><strong>FHA Loans:</strong> 3.5% down payment with flexible credit requirements</li>
                        <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1" /><strong>VA Loans:</strong> No down payment for qualified veterans</li>
                        <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1" /><strong>Conventional Loans:</strong> 3% down payment options available</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Next Steps */}
                <section className="mb-8">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Start Your Home Buying Journey?</h2>
                    <p className="text-slate-700 mb-6">
                      Buying your first home in North Texas is an exciting step toward building your future. With the right preparation, team, and guidance, you'll find the perfect home for your needs and budget.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#0d0d33' }}>
                        Get Expert Guidance
                      </Link>
                      <Link href="/city-guides" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                        Explore Communities
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
                    src={TimImage} 
                    alt="Tim Harwood - Real Estate Expert" 
                    className="w-20 h-20 rounded-full object-cover shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Tim Harwood</h3>
                    <p className="text-slate-600 mb-4">
                      Tim Harwood is a seasoned real estate professional with over 12 years of experience helping first-time buyers navigate the North Texas market. His expertise in DFW communities and commitment to client education has helped hundreds of families find their perfect homes.
                    </p>
                    <div className="flex items-center text-slate-600">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span className="text-sm">First-Time Buyer Specialist | North Texas Expert</span>
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
                
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <span className="px-3 py-1 text-xs font-medium text-white rounded-full mb-3 inline-block" style={{ backgroundColor: '#0d0d33' }}>
                    Market Trends
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    North Texas Market Forecast 2024
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Coming soon - Expert predictions and analysis for the North Texas real estate market...
                  </p>
                </div>
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

export default FirstTimeBuyerGuide;
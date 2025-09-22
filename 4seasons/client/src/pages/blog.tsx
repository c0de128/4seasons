import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Search, Calendar, User, ArrowRight, Tag, Clock, Eye } from "lucide-react";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import { Link } from "wouter";
import blogHeroImage from "@/assets/images/hero-images/20155.jpg";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: "buyers" | "sellers" | "property-management" | "market-insights";
  tags: string[];
  views: number;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Signs It's Time to Sell Your Home in North Texas",
    excerpt: "Market conditions, life changes, and financial factors that indicate the perfect timing to list your property.",
    content: `The North Texas real estate market continues to evolve, and knowing when to sell your home can make a significant difference in your financial outcome. Here are five key indicators that suggest it might be time to put your property on the market.

**1. Your Home Has Outgrown Your Needs**

Life changes constantly, and your housing needs evolve with it. If you find yourself with empty bedrooms after children move out, or conversely, if your growing family is cramped in your current space, it may be time to consider a move. The key is recognizing when your home no longer serves your lifestyle.

**2. Market Conditions Favor Sellers**

North Texas has experienced strong seller's markets in recent years, with low inventory and high demand driving up prices. When homes in your neighborhood are selling quickly and for asking price or above, it's often an ideal time to capitalize on these favorable conditions.

**3. You've Built Substantial Equity**

If you've owned your home for several years, especially in the appreciating North Texas market, you may have built significant equity. This equity can serve as a substantial down payment for your next home or provide financial flexibility for other life goals.

**4. Major Repairs Are Needed**

When your home requires significant repairs like a new roof, HVAC system, or foundation work, the costs can be substantial. Sometimes, selling "as-is" or after minimal repairs can be more financially advantageous than investing in major renovations.

**5. Your Financial Situation Has Improved**

Career advancement, increased income, or improved credit scores can open doors to better financing options and larger homes. If your financial position has strengthened significantly since your last purchase, you might qualify for a more desirable property.

**Making the Decision**

Remember, selling a home is a major financial and emotional decision. Consider factors like moving costs, current mortgage rates, and your long-term housing goals. Consult with a qualified real estate professional who understands the North Texas market to help evaluate your specific situation.`,
    author: "Amy Harwood",
    date: "2024-12-15",
    readTime: "6 min read",
    category: "sellers",
    tags: ["Market Timing", "Home Selling", "North Texas"],
    views: 2834,
    featured: true
  },
  {
    id: 2,
    title: "First-Time Home Buyer's Guide to North Texas",
    excerpt: "Navigate the DFW real estate market with confidence. Essential tips, local insights, and step-by-step guidance for first-time home buyers in North Texas.",
    content: `Buying your first home is an exciting milestone, but it can also feel overwhelming. The North Texas market offers incredible opportunities for first-time buyers, and with proper preparation, you can navigate the process successfully.

**Understanding Your Budget**

Before you start looking at homes, establish a realistic budget. Factor in not just your monthly mortgage payment, but also property taxes (which can be significant in Texas), homeowners insurance, HOA fees, and maintenance costs. A good rule of thumb is that your housing costs shouldn't exceed 28% of your gross monthly income.

**Getting Pre-Approved**

Pre-approval is crucial in the competitive North Texas market. This process involves submitting financial documents to a lender who will determine how much you can borrow. Pre-approval shows sellers you're a serious buyer and can move quickly when you find the right home.

**Choosing the Right Location**

North Texas offers diverse communities, each with unique characteristics. Consider factors like:
- Commute to work
- School districts (even if you don't have children, good schools affect resale value)
- Amenities and lifestyle preferences
- Future development plans in the area

**Working with a Buyer's Agent**

A knowledgeable buyer's agent familiar with North Texas can be invaluable. They'll help you navigate multiple offer situations, understand local market conditions, and negotiate on your behalf. Best of all, the seller typically pays the buyer's agent commission.

**The Home Inspection Process**

Never skip the home inspection, even in a competitive market. This professional assessment can reveal potential issues that could cost thousands later. Use inspection results to negotiate repairs or price adjustments with the seller.

**First-Time Buyer Programs**

Texas offers several programs to help first-time buyers, including down payment assistance and favorable loan terms. Research options like TSAHC (Texas State Affordable Housing Corporation) programs and local city-specific assistance programs.

**Closing Day Preparation**

Review all documents carefully before closing day. Ensure you have adequate homeowners insurance in place and conduct a final walk-through of the property. Bring a certified check for closing costs and be prepared to ask questions about anything you don't understand.`,
    author: "Tim Harwood",
    date: "2024-01-18",
    readTime: "12 min read",
    category: "buyers",
    tags: ["First-Time Buyers", "North Texas", "Home Buying Process", "DFW Market"],
    views: 2847,
    featured: true
  },
  {
    id: 3,
    title: "Maximizing Rental Property Returns: A Property Manager's Perspective",
    excerpt: "Professional strategies for optimizing your rental property investment and maintaining positive cash flow.",
    content: `Owning rental property can be a lucrative investment, but success requires strategic management and attention to detail. As property management professionals, we've seen what works and what doesn't in the North Texas rental market.

**Setting Competitive Rental Rates**

Pricing your rental correctly is crucial for minimizing vacancy and maximizing returns. Research comparable properties in your area, but don't just look at listing prices – find out what properties actually rent for. Consider factors like recent renovations, amenities, and unique features that might justify premium pricing.

**Tenant Screening Is Everything**

The quality of your tenants directly impacts your property's profitability and your peace of mind. Implement a thorough screening process that includes:
- Credit checks and score requirements
- Employment verification and income requirements (typically 3x monthly rent)
- Previous rental history and landlord references
- Background checks for criminal history

**Preventive Maintenance Saves Money**

Regular maintenance prevents small issues from becoming expensive problems. Create a maintenance schedule that includes:
- HVAC system inspections and filter changes
- Plumbing checks and drain cleaning
- Exterior maintenance and landscaping
- Annual deep cleaning and touch-up painting

**Legal Compliance and Documentation**

Texas landlord-tenant law has specific requirements for security deposits, notice periods, and eviction procedures. Ensure all your leases comply with local and state laws, and maintain detailed records of all communications and transactions.

**Technology and Efficiency**

Modern property management software can streamline rent collection, maintenance requests, and tenant communication. Online portals make it easier for tenants to pay rent on time and report issues promptly.

**Market Knowledge and Adaptability**

Stay informed about local market trends, new developments, and changing demographics in your area. What worked five years ago might not be optimal today. Be prepared to adapt your strategy based on market conditions.

**Professional Property Management Benefits**

While self-managing saves on fees, professional property management can often pay for itself through:
- Reduced vacancy times
- Better tenant screening and retention
- Maintenance cost savings through vendor relationships
- Legal protection and compliance expertise
- Time savings for busy property owners

**Financial Planning and Record Keeping**

Maintain detailed financial records for tax purposes and investment analysis. Track all income and expenses, including depreciation, repairs, and improvements. Consider setting aside 5-10% of rental income for unexpected repairs and maintenance.`,
    author: "Amy Harwood",
    date: "2024-12-05",
    readTime: "7 min read",
    category: "property-management",
    tags: ["Property Management", "Rental Investment", "Cash Flow"],
    views: 1563,
    featured: false
  },
  {
    id: 4,
    title: "2025 North Texas Housing Market Predictions",
    excerpt: "Expert analysis and forecasts for the DFW real estate market in 2025. Key trends, price predictions, and strategic insights for buyers and sellers.",
    content: `As we move into 2025, the North Texas real estate market continues to evolve. Based on current trends and economic indicators, here's what we expect to see in the coming year.

**Interest Rate Trends**

After the volatility of recent years, mortgage rates are expected to stabilize somewhat in 2025. While rates may remain higher than the historic lows we saw during the pandemic, they should settle into a more predictable range, allowing buyers to plan with greater confidence.

**Inventory Levels**

New construction continues to increase supply in many North Texas markets, which should provide more options for buyers. However, established neighborhoods with mature trees and character homes will likely maintain their desirability and limited inventory.

**Price Appreciation**

While the rapid price increases of recent years are expected to moderate, North Texas real estate should continue to appreciate steadily. Areas with strong job growth, good schools, and infrastructure development will likely see continued demand.

**Emerging Areas to Watch**

Several North Texas communities are positioned for growth in 2025:
- Prosper and Celina continue rapid development
- East Dallas neighborhoods are seeing increased investment
- Suburban communities with good transportation access remain popular

**Technology's Impact**

Virtual tours, digital transactions, and AI-powered market analysis are becoming standard tools. Buyers and sellers who embrace these technologies often have advantages in the market.

**Advice for 2025**

For Buyers:
- Get pre-approved early and be prepared to move quickly
- Consider emerging areas before they become mainstream
- Work with agents who understand local micro-markets

For Sellers:
- Price strategically based on recent comparable sales
- Invest in professional photography and marketing
- Be flexible with showing schedules and closing timelines

**Economic Factors**

North Texas continues to attract major employers and experience population growth. This fundamental strength supports long-term real estate demand, even if short-term fluctuations occur.`,
    author: "Amy Harwood",
    date: "2025-01-15",
    readTime: "10 min read",
    category: "market-trends",
    tags: ["Market Forecast", "North Texas", "2025 Predictions", "Real Estate Trends"],
    views: 1256,
    featured: true
  },
  {
    id: 5,
    title: "Home Staging Secrets That Actually Work",
    excerpt: "Professional staging tips and proven strategies to help your North Texas home sell faster and for top dollar.",
    content: `Home staging isn't just about making your house look pretty – it's about creating an emotional connection with potential buyers. After staging hundreds of homes in North Texas, here are the techniques that consistently deliver results.

**Start with Deep Cleaning and Decluttering**

Before any furniture rearrangement or decoration, your home must be spotless. This means professional carpet cleaning, scrubbing grout, and eliminating every trace of pet odors. Declutter ruthlessly – potential buyers need to envision their belongings in the space, not navigate around yours.

**Neutralize Bold Colors**

While that bright accent wall might reflect your personality, it could turn off potential buyers. Stick to neutral colors like warm grays, soft beiges, and crisp whites. These colors make spaces feel larger and allow buyers to imagine their own decorating style.

**Maximize Natural Light**

Remove heavy drapes, clean windows inside and out, and replace any burned-out bulbs with bright LED lights. Dark homes feel smaller and less welcoming. If natural light is limited, add floor lamps and table lamps to brighten darker corners.

**Create Focal Points in Each Room**

Every room should have a clear purpose and focal point. In living rooms, arrange furniture to create conversation areas. In bedrooms, make the bed the star with luxurious bedding and decorative pillows. Dining rooms should showcase the table with a simple centerpiece.

**Address Curb Appeal First**

Buyers form opinions within seconds of seeing your home. Ensure your lawn is well-maintained, add colorful plants near the entrance, and make sure your front door is clean and welcoming. Consider a fresh coat of paint if needed.

**The Power of Fresh Flowers and Plants**

Living plants and fresh flowers add life and energy to spaces. They also provide natural fragrance and help create a welcoming atmosphere. Place them strategically in the entryway, kitchen, and living areas.

**Kitchen and Bathroom Focus**

These rooms sell homes. In kitchens, clear countertops completely except for perhaps a bowl of fresh fruit or a small plant. In bathrooms, add fresh towels, remove personal items, and ensure everything sparkles.

**Strategic Furniture Placement**

Furniture should create clear traffic flow and make rooms appear larger. Remove oversized pieces and rearrange remaining furniture to maximize space. Sometimes less is definitely more.

**Professional Photography Considerations**

Remember that most buyers will see your home online first. Stage with photography in mind – ensure every room has purpose and visual appeal from multiple angles.

**Budget-Friendly Staging Tips**

Not everyone can hire a professional stager, but you can achieve great results on a budget:
- Rearrange existing furniture instead of buying new
- Use fresh paint strategically in high-impact areas
- Shop your own home for accessories and artwork
- Borrow neutral items from friends if needed

**When to Hire a Professional**

Consider professional staging if your home has been on the market for more than 30 days, if you're struggling to depersonalize effectively, or if your home is in a higher price range where staging is expected.`,
    author: "Amy Harwood",
    date: "2024-11-20",
    readTime: "8 min read",
    category: "selling",
    tags: ["Home Staging", "Selling Tips", "Interior Design", "Real Estate Marketing"],
    views: 2234,
    featured: false
  },
  {
    id: 6,
    title: "Understanding Property Taxes in North Texas",
    excerpt: "A comprehensive guide to property tax assessment, calculation, and strategies for North Texas homeowners.",
    content: `Property taxes are a significant consideration for North Texas homeowners. Understanding how they work can help you budget effectively and potentially save money through available exemptions.

**How Texas Property Taxes Work**

Texas has no state income tax, which means property taxes fund many local services including schools, counties, cities, and special districts. Your total property tax bill is the sum of taxes from all applicable taxing entities.

**Assessment and Appraisal Process**

Your county appraisal district determines your property's assessed value each year, typically based on market value as of January 1st. You'll receive a notice of appraised value in the spring, and you have the right to protest if you believe the value is too high.

**Available Homestead Exemptions**

Texas offers several exemptions that can reduce your taxable value:

**General Homestead Exemption**: Available to all homeowners for their primary residence, this removes at least $25,000 from your home's taxable value for school taxes.

**Over-65 Exemption**: Homeowners 65 and older receive additional exemptions and may qualify for tax freezes that limit increases in school taxes.

**Disability Exemption**: Available for homeowners with qualifying disabilities, this can provide significant tax relief.

**Veteran Exemptions**: Various exemptions available for veterans, including disabled veterans and their surviving spouses.

**Protesting Your Appraisal**

If you believe your property has been overvalued, you can file a protest with your county's Appraisal Review Board. Successful protests often involve:
- Recent sales of comparable properties
- Evidence of property condition issues
- Professional appraisals showing lower values

**Tax Payment Options**

Most counties offer split payments, allowing you to pay half your taxes by the end of November and half by the end of January. Some also offer discount programs for early payment.

**Budgeting for Property Taxes**

Property taxes in North Texas typically range from 2-3% of your home's assessed value annually. When budgeting for homeownership, many lenders require escrow accounts to collect taxes monthly along with your mortgage payment.

**Impact on Home Values**

Areas with higher property taxes often have better schools and services, which can positively impact home values. Consider the total cost of ownership, not just the tax amount, when evaluating properties.

**New Construction Considerations**

New homes may receive partial exemptions during the first year, but expect your taxes to increase once the home is fully assessed. Factor this into your long-term budget planning.

**Working with Professionals**

Property tax consultants can help with complex situations or valuable properties where protest efforts might yield significant savings. Real estate agents familiar with local tax implications can also provide valuable guidance during home searches.`,
    author: "Tim Harwood",
    date: "2024-12-10",
    readTime: "9 min read",
    category: "tax-guidance",
    tags: ["Property Taxes", "North Texas", "Homeowner Tips", "Tax Planning"],
    views: 1823,
    featured: false
  }
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { value: "all", label: "All Posts" },
    { value: "buyers", label: "Home Buyers" },
    { value: "sellers", label: "Home Sellers" },
    { value: "property-management", label: "Property Management" },
    { value: "market-insights", label: "Market Insights" }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  const getBlogPostUrl = (post: BlogPost) => {
    if (post.id === 1) {
      return "/blog/5-signs-time-to-sell-home-north-texas";
    }
    if (post.id === 2) {
      return "/blog/first-time-home-buyer-guide-north-texas";
    }
    if (post.id === 4) {
      return "/blog/2025-north-texas-housing-market-predictions";
    }
    if (post.id === 3) {
      return "/blog/maximizing-rental-property-returns-property-manager-perspective";
    }
    if (post.id === 5) {
      return "/blog/home-staging-secrets-that-actually-work";
    }
    if (post.id === 6) {
      return "/blog/understanding-property-taxes-north-texas";
    }
    // Add more individual blog post URLs as they are created
    return "/blog";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEO 
        title="Real Estate Blog - Dallas-Fort Worth Market Insights & Tips | 4Seasons Real Estate"
        description="Expert real estate advice, market insights, and practical tips for buying, selling, and managing property in North Texas. Stay informed with our DFW real estate blog."
        keywords="Dallas real estate blog, DFW market insights, North Texas real estate tips, home buying advice Dallas, selling home tips Texas, property management blog, real estate trends DFW"
        canonicalUrl={`${seoConfig.siteUrl}/blog`}
        ogTitle="Real Estate Insights & Tips - North Texas Market Blog"
        ogDescription="Expert advice, market insights, and practical tips for buying, selling, and managing real estate in North Texas."
        ogImage={`${seoConfig.siteUrl}/images/dfw-real-estate-blog.jpg`}
        structuredData={generateStructuredData.article("Real Estate Insights & Tips", "Expert advice and market insights for North Texas real estate", "4Seasons Real Estate Team", new Date().toISOString())}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ 
          backgroundImage: `url(${blogHeroImage})`,
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            Real Estate Insights &
            <span className="text-yellow-400 block">Tips</span>
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            Expert advice, market insights, and practical tips for buying, selling, and managing 
            real estate in North Texas.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {selectedCategory === "all" && !searchTerm && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 text-xs font-medium text-white rounded-full" style={{ backgroundColor: '#0d0d33' }}>
                        {getCategoryLabel(post.category)}
                      </span>
                      <span className="text-sm text-slate-500 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views.toLocaleString()}
                      </span>
                    </div>
                    <Link href={getBlogPostUrl(post)}>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-sm text-slate-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <Link href={getBlogPostUrl(post)} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              {searchTerm || selectedCategory !== "all" ? "Search Results" : "Latest Posts"}
            </h2>
            <p className="text-slate-600">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </p>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No posts found</h3>
              <p className="text-slate-600">Try adjusting your search terms or category filter.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 text-xs font-medium text-white rounded-full" style={{ backgroundColor: '#0d0d33' }}>
                          {getCategoryLabel(post.category)}
                        </span>
                        {post.featured && (
                          <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                            Featured
                          </span>
                        )}
                        <span className="text-sm text-slate-500 flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views.toLocaleString()} views
                        </span>
                      </div>
                      
                      <Link href={getBlogPostUrl(post)}>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                        
                        <Link href={getBlogPostUrl(post)}>
                          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#0d0d33' }}>
                            Read Full Article
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Stay Updated with Market Insights
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Subscribe to our newsletter for the latest real estate trends, tips, and market updates 
            delivered to your inbox monthly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              className="px-6 py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#0d0d33' }}
            >
              Subscribe
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: "buyers" | "sellers" | "property-management";
}

const faqData: FAQItem[] = [
  // Buyers FAQ
  {
    id: 1,
    category: "buyers",
    question: "How much money do I need to buy a home?",
    answer: "The amount varies based on the home price and loan type. Typically, you'll need 3-20% for a down payment, plus closing costs (2-5% of home price), and money for moving expenses, inspections, and initial home maintenance. Many first-time buyer programs offer down payment assistance and lower down payment options."
  },
  {
    id: 2,
    category: "buyers",
    question: "What credit score do I need to buy a home?",
    answer: "Most conventional loans require a credit score of 620 or higher, while FHA loans may accept scores as low as 580 with a 3.5% down payment, or 500 with 10% down. However, higher scores typically mean better interest rates and loan terms."
  },
  {
    id: 3,
    category: "buyers",
    question: "Should I get pre-approved for a mortgage?",
    answer: "Yes, absolutely. Pre-approval shows sellers you're a serious buyer and helps you understand your budget. It involves a thorough review of your finances and typically lasts 60-90 days. Pre-approval letters make your offers more competitive in today's market."
  },
  {
    id: 4,
    category: "buyers",
    question: "How long does the home buying process take?",
    answer: "From start to finish, the process typically takes 30-60 days once you're under contract. Finding the right home can take weeks to months depending on market conditions and your specific needs. Pre-approval and having documents ready can speed up the process."
  },
  {
    id: 5,
    category: "buyers",
    question: "What are closing costs and who pays them?",
    answer: "Closing costs include loan origination fees, appraisal, title insurance, attorney fees, and other transaction costs. Buyers typically pay 2-5% of the home's purchase price. Some costs can be negotiated with the seller or rolled into your loan amount."
  },
  {
    id: 6,
    category: "buyers",
    question: "Do I need a real estate agent to buy a home?",
    answer: "While not legally required, a buyer's agent provides valuable expertise in market analysis, negotiation, contract terms, and the complex buying process. In most cases, the seller pays the buyer's agent commission, making representation free to you."
  },
  {
    id: 7,
    category: "buyers",
    question: "What should I look for during a home inspection?",
    answer: "A professional inspection covers structural elements, electrical, plumbing, HVAC, roofing, and major systems. Look for safety issues, expensive repairs, and maintenance needs. You can negotiate repairs or credits based on findings, or walk away if major issues are discovered."
  },
  {
    id: 8,
    category: "buyers",
    question: "What's the difference between being pre-qualified and pre-approved?",
    answer: "Pre-qualification is a basic estimate based on self-reported financial information. Pre-approval involves verification of income, assets, and credit, resulting in a conditional commitment for a specific loan amount. Pre-approval carries much more weight with sellers."
  },
  {
    id: 9,
    category: "buyers",
    question: "Can I buy a home with student loan debt?",
    answer: "Yes, you can buy a home with student loans. Lenders will consider your debt-to-income ratio, which should typically be below 43%. Student loan payments are factored into this calculation, but having steady income and good credit can help offset the debt burden."
  },
  {
    id: 10,
    category: "buyers",
    question: "What happens if my loan is denied?",
    answer: "If denied, you'll receive an explanation of the reasons. Common issues include credit problems, insufficient income, or property issues. You may be able to address these concerns and reapply, seek alternative lenders, or consider different loan programs."
  },

  // Sellers FAQ
  {
    id: 11,
    category: "sellers",
    question: "How do I determine the right listing price for my home?",
    answer: "Your agent will conduct a Comparative Market Analysis (CMA) looking at recently sold homes similar to yours in the area. Factors include location, size, condition, recent upgrades, and current market conditions. Pricing correctly from the start is crucial for attracting buyers and maximizing your sale price."
  },
  {
    id: 12,
    category: "sellers",
    question: "What repairs should I make before listing my home?",
    answer: "Focus on essential repairs and improvements that offer good return on investment. Address safety issues, fix obvious defects, ensure all systems work properly, and consider fresh paint and landscaping. Your agent can advise on which improvements will add the most value."
  },
  {
    id: 13,
    category: "sellers",
    question: "How long will it take to sell my home?",
    answer: "The average time varies by market conditions, price point, and location. In North Texas, homes typically sell within 30-60 days in a balanced market. Pricing, condition, and marketing strategy significantly impact how quickly your home sells."
  },
  {
    id: 14,
    category: "sellers",
    question: "What are the costs associated with selling my home?",
    answer: "Typical selling costs include real estate agent commissions (5-6%), title insurance, attorney fees, transfer taxes, and any agreed-upon repairs or credits. Total costs usually range from 6-10% of the sale price. Your agent can provide a detailed net proceeds estimate."
  },
  {
    id: 15,
    category: "sellers",
    question: "Should I stage my home before selling?",
    answer: "Staging can help buyers visualize themselves in the space and may lead to faster sales and higher offers. This can range from decluttering and rearranging furniture to professional staging services. Your agent can recommend the best approach based on your home and budget."
  },
  {
    id: 16,
    category: "sellers",
    question: "Can I sell my home if I still owe money on my mortgage?",
    answer: "Yes, most sellers still have mortgage balances. At closing, the remaining mortgage is paid off from the sale proceeds. If you owe more than the home's value, you may need to consider a short sale or bring money to closing."
  },
  {
    id: 17,
    category: "sellers",
    question: "What documents do I need to sell my home?",
    answer: "You'll need the deed, mortgage information, property tax records, HOA documents (if applicable), home warranty information, recent utility bills, and any renovation permits or receipts. Your agent will provide a complete checklist."
  },
  {
    id: 18,
    category: "sellers",
    question: "Should I accept the first offer I receive?",
    answer: "Consider all aspects of the offer, not just price. Look at financing terms, contingencies, closing timeline, and buyer qualifications. In a strong market, waiting might bring better offers, but a good offer in hand is worth serious consideration."
  },
  {
    id: 19,
    category: "sellers",
    question: "What happens if the buyer's inspection reveals problems?",
    answer: "Buyers may request repairs, credits, or price reductions based on inspection findings. You can negotiate, agree to requests, or decline and potentially lose the sale. Your agent will help you evaluate requests and determine the best response strategy."
  },
  {
    id: 20,
    category: "sellers",
    question: "Do I need to disclose all problems with my home?",
    answer: "Texas law requires disclosure of known material defects that could affect the property's value or desirability. This includes structural issues, water damage, foundation problems, and other significant concerns. Honesty protects you from future liability."
  },

  // Property Management FAQ
  {
    id: 21,
    category: "property-management",
    question: "What percentage do property management companies charge?",
    answer: "Property management fees typically range from 8-12% of monthly rental income, with full-service companies averaging 10%. Additional fees may apply for tenant placement, maintenance coordination, and other services. The value comes from professional tenant screening, maintenance, and legal compliance."
  },
  {
    id: 22,
    category: "property-management",
    question: "How do you screen potential tenants?",
    answer: "Our comprehensive screening includes credit checks, employment verification, income verification (typically 3x rent), rental history, background checks, and personal references. We follow Fair Housing laws and use consistent criteria to select qualified tenants who will care for your property."
  },
  {
    id: 23,
    category: "property-management",
    question: "Who handles maintenance and repairs?",
    answer: "We coordinate all maintenance and repairs using our network of licensed, insured contractors. Emergency repairs are handled immediately, while routine maintenance is scheduled efficiently. We provide detailed reports and photos, and seek approval for repairs over agreed thresholds."
  },
  {
    id: 24,
    category: "property-management",
    question: "How do you determine rental rates?",
    answer: "We conduct market analysis comparing similar properties in your area, considering size, amenities, condition, and location. We monitor market trends and adjust rates appropriately to maximize income while minimizing vacancy. Regular reviews ensure competitive pricing."
  },
  {
    id: 25,
    category: "property-management",
    question: "What happens if a tenant doesn't pay rent?",
    answer: "We have strict collection procedures including late notices, phone calls, and legal action when necessary. We handle the entire eviction process if required, working with attorneys experienced in landlord-tenant law. We also recommend rent loss insurance for additional protection."
  },
  {
    id: 26,
    category: "property-management",
    question: "How often will I receive financial reports?",
    answer: "We provide monthly statements detailing all income and expenses, along with year-end tax reporting. You'll have 24/7 online access to view transactions, maintenance requests, and property photos. Detailed reporting helps you track your investment performance."
  },
  {
    id: 27,
    category: "property-management",
    question: "Can I still have input on tenant selection and major decisions?",
    answer: "Absolutely. While we handle day-to-day operations, you maintain control over major decisions like tenant approval, significant repairs, and rental rate changes. We provide recommendations based on our expertise, but final decisions rest with you as the property owner."
  },
  {
    id: 28,
    category: "property-management",
    question: "What if I want to sell my rental property?",
    answer: "We can coordinate with our sales team to market your property while managing existing tenants. We'll handle tenant communications, showing schedules, and lease terminations if needed. Our dual expertise in management and sales ensures a smooth transition."
  },
  {
    id: 29,
    category: "property-management",
    question: "Do you handle marketing and advertising vacant properties?",
    answer: "Yes, we handle all marketing including professional photography, online listings on major rental platforms, social media promotion, and yard signs. Our marketing strategy is designed to minimize vacancy time and attract quality tenants to your property."
  },
  {
    id: 30,
    category: "property-management",
    question: "What insurance do I need for a rental property?",
    answer: "You'll need landlord insurance (different from homeowner's insurance) covering property damage, liability, and loss of rental income. We can recommend insurance providers who specialize in rental properties and understand the unique risks and coverage needs."
  }
];

export function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "buyers", label: "Home Buyers" },
    { value: "sellers", label: "Home Sellers" },
    { value: "property-management", label: "Property Management" }
  ];

  const filteredFAQs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "buyers": return "Home Buyers";
      case "sellers": return "Home Sellers";
      case "property-management": return "Property Management";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Find answers to common questions about buying, selling, and managing real estate in North Texas.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search frequently asked questions..."
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
          
          {/* Results Count */}
          <div className="mt-4 text-slate-600">
            Showing {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "all" && ` in ${getCategoryTitle(selectedCategory)}`}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No questions found</h3>
              <p className="text-slate-600">Try adjusting your search terms or category filter.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg border border-slate-200 shadow-sm">
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        {faq.question}
                      </h3>
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#0d0d33', color: 'white' }}>
                        {getCategoryTitle(faq.category)}
                      </span>
                    </div>
                    {expandedItems.has(faq.id) ? (
                      <ChevronUp className="w-5 h-5 text-slate-500 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 ml-4" />
                    )}
                  </button>
                  
                  {expandedItems.has(faq.id) && (
                    <div className="px-6 pb-6">
                      <div className="prose prose-slate max-w-none">
                        <p className="text-slate-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Our experienced team is here to help with any additional questions about your real estate needs.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#0d0d33' }}
          >
            Contact Our Team
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
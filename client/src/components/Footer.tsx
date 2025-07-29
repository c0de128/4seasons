import { Twitter, Instagram, Linkedin } from "lucide-react";
import logoFooter from "@/assets/images/logo_footer.png";
import texasBlog from "@/assets/images/texas-blog.jpg";
import marketAnalysisBlog from "@/assets/images/market-analysis-blog.jpg";

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#2c3e50' }} className="text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="mb-6">
              <img src={logoFooter} alt="4Seasons Real Estate" className="mb-4" style={{ width: '200px', height: '145px' }} />
            </div>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 text-white rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#1f2937' }}
                aria-label="Facebook"
              >
                <span className="font-bold text-sm">f</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 text-white rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#1f2937' }}
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 text-white rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#1f2937' }}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 text-white rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#1f2937' }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links - Column 1 */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/buy" className="text-slate-300 hover:text-white transition-colors">Search Properties</a></li>
              <li><a href="/property-management" className="text-slate-300 hover:text-white transition-colors">Property Management</a></li>
              <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/home-valuation" className="text-slate-300 hover:text-white transition-colors">Home Valuation</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">School Districts</a></li>
            </ul>
          </div>
          
          {/* Quick Links - Column 2 */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-white mb-4 opacity-0">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/sell" className="text-slate-300 hover:text-white transition-colors">Sell Your Home</a></li>
              <li><a href="/faq" className="text-slate-300 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="/about" className="text-slate-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/city-guides" className="text-slate-300 hover:text-white transition-colors">City Guides</a></li>
              <li><a href="/blog" className="text-slate-300 hover:text-white transition-colors">Blog Posts</a></li>
            </ul>
          </div>
          
          {/* Recent Blog Posts */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-white mb-4">Recent Blog Posts</h3>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div style={{ width: '50px', height: '50px' }} className="bg-slate-600 rounded flex-shrink-0 overflow-hidden">
                  <img 
                    src={texasBlog} 
                    alt="North Texas Real Estate" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white leading-tight mb-1">
                    The Great Rebalancing: North Texas Real Estate Predictions for 2025
                  </h4>
                  <p className="text-xs text-slate-400">
                    The DFW market has shifted from frenched seller's market to a balanced landscape.
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <div style={{ width: '50px', height: '50px' }} className="bg-slate-600 rounded flex-shrink-0 overflow-hidden">
                  <img 
                    src={marketAnalysisBlog} 
                    alt="Market Analysis Report" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white leading-tight mb-1">
                    Collin County Real Estate Check-In: Q1 2025 Market Report
                  </h4>
                  <p className="text-xs text-slate-400">
                    Market analysis of the first quarter 2025 real estate trends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-600 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-slate-400">
            © 2025 4Seasons Real Estate. All rights reserved.
          </p>
          <p className="text-slate-400 mt-2 md:mt-0">
            Website Designed by DFW WEB GUY
          </p>
        </div>
      </div>
    </footer>
  );
}
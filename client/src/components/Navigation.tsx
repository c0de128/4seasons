import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Calculator, Map, Building2, DollarSign, FileText, HelpCircle, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoPath from "@/assets/images/logo_sm.png";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState('center');
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const calculatePosition = () => {
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const menuWidth = 600;
        const padding = 16;
        
        // Calculate center position
        const centerLeft = buttonRect.left + buttonRect.width / 2 - menuWidth / 2;
        
        if (centerLeft < padding) {
          setMenuPosition('left');
        } else if (centerLeft + menuWidth > viewportWidth - padding) {
          setMenuPosition('right');
        } else {
          setMenuPosition('center');
        }
      }
    };

    if (megaMenuOpen) {
      calculatePosition();
      window.addEventListener('resize', calculatePosition);
      return () => window.removeEventListener('resize', calculatePosition);
    }
  }, [megaMenuOpen]);

  return (
    <nav className="absolute top-0 left-0 right-0 backdrop-blur-md shadow-sm border-b border-slate-200/30 z-50" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/">
              <img src={logoPath} alt="Logo" className="w-[90px] h-[56px]" />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/buy" className="text-slate-600 hover:text-primary transition-colors duration-200">Buy</a>
            <a href="/sell" className="text-slate-600 hover:text-primary transition-colors duration-200">Sell</a>
            <a href="/property-management" className="text-slate-600 hover:text-primary transition-colors duration-200">Property Management</a>
            
            {/* Resources Mega Menu */}
            <div 
              className="relative"
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button 
                ref={buttonRef}
                onMouseEnter={() => setMegaMenuOpen(true)}
                className="flex items-center text-slate-600 hover:text-primary transition-colors duration-200"
              >
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {megaMenuOpen && (
                <div 
                  ref={megaMenuRef}
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onMouseLeave={() => setMegaMenuOpen(false)}
                  className={`absolute top-full mt-2 w-[600px] max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-xl border border-slate-200 p-4 md:p-6 z-50 ${
                    menuPosition === 'left' ? 'left-0' :
                    menuPosition === 'right' ? 'right-0' :
                    'left-1/2 -translate-x-1/2'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Tools & Calculators */}
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">Tools & Calculators</h3>
                      <div className="space-y-4">
                        <a href="/home-valuation" className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group">
                          <div className="p-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                            <Calculator className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900 group-hover:text-primary">Home Valuation</h4>
                            <p className="text-sm text-slate-600">Get an accurate estimate of your property's current market value.</p>
                          </div>
                        </a>
                        
                        <a href="/city-guides" className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group">
                          <div className="p-2 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
                            <Map className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900 group-hover:text-primary">City Guides</h4>
                            <p className="text-sm text-slate-600">Explore neighborhoods, schools, and amenities across North Texas.</p>
                          </div>
                        </a>
                        
                        <a href="#property-investment" className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group">
                          <div className="p-2 rounded-lg bg-yellow-100 group-hover:bg-yellow-200 transition-colors">
                            <DollarSign className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900 group-hover:text-primary">Investment Calculator</h4>
                            <p className="text-sm text-slate-600">Analyze potential returns and investment opportunities.</p>
                          </div>
                        </a>
                      </div>
                    </div>
                    
                    {/* Resources & Support */}
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">Resources & Support</h3>
                      <div className="space-y-4">
                        <a href="#blog" className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group">
                          <div className="p-2 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
                            <FileText className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900 group-hover:text-primary">Market Insights</h4>
                            <p className="text-sm text-slate-600">Latest real estate trends, market updates, and expert analysis.</p>
                          </div>
                        </a>
                        
                        <a href="#faq" className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group">
                          <div className="p-2 rounded-lg bg-orange-100 group-hover:bg-orange-200 transition-colors">
                            <HelpCircle className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900 group-hover:text-primary">FAQ</h4>
                            <p className="text-sm text-slate-600">Common questions about buying, selling, and real estate process.</p>
                          </div>
                        </a>
                        
                        <a href="/#contact" className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group">
                          <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors">
                            <Phone className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900 group-hover:text-primary">Contact Support</h4>
                            <p className="text-sm text-slate-600">Get in touch with our expert real estate team.</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom CTA */}
                  <div className="border-t border-slate-200 mt-6 pt-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                      <div>
                        <h4 className="font-medium text-slate-900">Need personalized assistance?</h4>
                        <p className="text-sm text-slate-600">Our experts are here to help with your real estate needs.</p>
                      </div>
                      <a href="/#contact" className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity text-center lg:text-left" style={{ backgroundColor: '#0d0d33' }}>
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <a href="/buy" className="block text-slate-600 hover:text-primary">Buy</a>
            <a href="/sell" className="block text-slate-600 hover:text-primary">Sell</a>
            <a href="/property-management" className="block text-slate-600 hover:text-primary">Property Management</a>
            
            {/* Resources - Mobile Expanded */}
            <div className="border-t border-slate-100 pt-3 mt-3">
              <p className="text-sm font-medium text-slate-500 mb-2">Resources</p>
              <div className="pl-4 space-y-2">
                <a href="/home-valuation" className="block text-slate-600 hover:text-primary text-sm">Home Valuation</a>
                <a href="/city-guides" className="block text-slate-600 hover:text-primary text-sm">City Guides</a>
                <a href="#property-investment" className="block text-slate-600 hover:text-primary text-sm">Property Investment</a>
                <a href="#blog" className="block text-slate-600 hover:text-primary text-sm">Blog</a>
                <a href="#faq" className="block text-slate-600 hover:text-primary text-sm">FAQ</a>
                <a href="#terms" className="block text-slate-600 hover:text-primary text-sm">Terms & Conditions</a>
                <a href="/#contact" className="block text-slate-600 hover:text-primary text-sm">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
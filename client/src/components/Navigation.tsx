import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Calculator, Map, Building2, DollarSign, FileText, HelpCircle, Shield, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoPath from "@/assets/images/4seasons_nav_logo-.png";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState('center');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-50">
      {/* Two Row Navigation Layout */}
      <nav className="backdrop-blur-md shadow-sm border-b border-slate-200/30" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* TOP ROW - Contact Information Only */}
          <div className="flex justify-end py-2">
            <div className="hidden lg:flex items-center space-x-4 text-xs" style={{ color: '#0d0d33' }}>
              <div className="flex items-center space-x-2">
                <Phone className="w-3 h-3" />
                <span>(214) 555-0123</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3 h-3" />
                <span>info@4seasonsrealestate.com</span>
              </div>
            </div>
          </div>

          {/* Logo - Positioned to align with hero H1 text exactly */}
          <div className="absolute top-0" style={{ zIndex: 10, left: 'calc(50vw - 672px + 16px)' }}>
            <a href="/" className="flex items-center">
              <img 
                src={logoPath} 
                alt="4Seasons Real Estate" 
                className="w-auto object-contain"
                style={{ height: '80px' }}
              />
            </a>
          </div>

          {/* BOTTOM ROW - Logo, Navigation Links, Login Button */}
          <div className="flex items-center justify-between pb-2 h-12">
            
            {/* Invisible spacer to maintain layout */}
            <div className="flex-shrink-0" style={{ width: '280px' }}></div>

            {/* Right Side: Navigation Links + Login Button */}
            <div className="flex items-center space-x-8">
              
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                <a href="/buy" className="font-bold text-slate-600 hover:text-slate-800 transition-colors duration-200 text-sm">Search Properties</a>
                <a href="/sell" className="font-bold text-slate-600 hover:text-slate-800 transition-colors duration-200 text-sm">Sell Your Home</a>
                <a href="/property-management" className="font-bold text-slate-600 hover:text-slate-800 transition-colors duration-200 text-sm">Property Management</a>
                
                {/* Resources Mega Menu */}
                <div 
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button 
                    ref={buttonRef}
                    className="flex items-center font-bold text-slate-600 hover:text-slate-800 transition-colors duration-200 text-sm"
                  >
                    Resources
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </button>
                  
                  {megaMenuOpen && (
                    <div 
                      ref={megaMenuRef}
                      className={`absolute top-full pt-2 w-[600px] max-w-[calc(100vw-2rem)] z-50 ${
                        menuPosition === 'left' ? 'left-0' :
                        menuPosition === 'right' ? 'right-0' :
                        'left-1/2 -translate-x-1/2'
                      }`}
                    >
                      <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-4 md:p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                          {/* Column 1 */}
                          <div>
                            <div className="space-y-3">
                              <a href="/home-valuation" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                                <h4 className="font-medium text-slate-900">Home Valuation</h4>
                                <p className="text-sm text-slate-600">Get an accurate estimate of your property's current market value.</p>
                              </a>
                              
                              <a href="/city-guides" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                                <h4 className="font-medium text-slate-900">City Guides</h4>
                                <p className="text-sm text-slate-600">Explore neighborhoods, schools, and amenities across North Texas.</p>
                              </a>
                              
                              <a href="/blog" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                                <h4 className="font-medium text-slate-900">Blog Posts</h4>
                                <p className="text-sm text-slate-600">Latest real estate market insights and industry updates.</p>
                              </a>
                            </div>
                          </div>
                          
                          {/* Column 2 */}
                          <div>
                            <div className="space-y-3">
                              <a href="/faq" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                                <h4 className="font-medium text-slate-900">FAQ's</h4>
                                <p className="text-sm text-slate-600">Common questions about buying, selling, and real estate process.</p>
                              </a>
                              
                              <a href="/about" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                                <h4 className="font-medium text-slate-900">About Us</h4>
                                <p className="text-sm text-slate-600">Learn about our experienced team and company mission.</p>
                              </a>
                              
                              <a href="/contact" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                                <h4 className="font-medium text-slate-900">Contact Us</h4>
                                <p className="text-sm text-slate-600">Get in touch with our expert real estate team.</p>
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
                    </div>
                  )}
                </div>
              </div>
              
              {/* Login Button */}
              <div className="flex items-center">
                <a href="/login" className="hidden md:block">
                  <Button 
                    className="px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#0d0d33' }}
                  >
                    Login
                  </Button>
                </a>
                
                {/* Mobile menu button */}
                <div className="md:hidden">
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <a href="/buy" className="block font-bold text-slate-600 hover:text-slate-800">Search Properties</a>
              <a href="/sell" className="block font-bold text-slate-600 hover:text-slate-800">Sell Your Home</a>
              <a href="/property-management" className="block font-bold text-slate-600 hover:text-slate-800">Property Management</a>
              
              {/* Resources - Mobile Expanded */}
              <div className="border-t border-slate-100 pt-3 mt-3">
                <p className="text-sm font-medium text-slate-500 mb-2">Resources</p>
                <div className="pl-4 space-y-2">
                  <a href="/home-valuation" className="block text-slate-600 hover:text-primary text-sm">Home Valuation</a>
                  <a href="/city-guides" className="block text-slate-600 hover:text-primary text-sm">City Guides</a>
                  <a href="#property-investment" className="block text-slate-600 hover:text-primary text-sm">Property Investment</a>
                  <a href="/blog" className="block text-slate-600 hover:text-primary text-sm">Blog</a>
                  <a href="/faq" className="block text-slate-600 hover:text-primary text-sm">FAQ</a>
                  <a href="/about" className="block text-slate-600 hover:text-primary text-sm">About Us</a>
                  <a href="/contact" className="block text-slate-600 hover:text-primary text-sm">Contact Us</a>
                </div>
              </div>

              {/* Mobile Login Button */}
              <div className="border-t border-slate-100 pt-3 mt-3">
                <a href="/login">
                  <Button 
                    className="w-full px-4 py-2 font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#0d0d33' }}
                  >
                    Login
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
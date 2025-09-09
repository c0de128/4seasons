import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Calculator, Map, Building2, DollarSign, FileText, HelpCircle, Shield, Phone, Mail, PiggyBank, Home, TrendingUp, Camera, ClipboardList, Users, Sparkles } from "lucide-react";
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
  const [buyMenuOpen, setBuyMenuOpen] = useState(false);
  const [sellMenuOpen, setSellMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const buyMenuRef = useRef<HTMLDivElement>(null);
  const sellMenuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState('center');
  const [buyMenuPosition, setBuyMenuPosition] = useState('center');
  const [sellMenuPosition, setSellMenuPosition] = useState('center');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buyButtonRef = useRef<HTMLButtonElement>(null);
  const sellButtonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const buyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sellTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    const calculateBuyPosition = () => {
      if (buyButtonRef.current) {
        const buttonRect = buyButtonRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const menuWidth = 700;
        const padding = 16;
        
        // Calculate center position
        const centerLeft = buttonRect.left + buttonRect.width / 2 - menuWidth / 2;
        
        if (centerLeft < padding) {
          setBuyMenuPosition('left');
        } else if (centerLeft + menuWidth > viewportWidth - padding) {
          setBuyMenuPosition('right');
        } else {
          setBuyMenuPosition('center');
        }
      }
    };

    if (buyMenuOpen) {
      calculateBuyPosition();
      window.addEventListener('resize', calculateBuyPosition);
      return () => window.removeEventListener('resize', calculateBuyPosition);
    }
  }, [buyMenuOpen]);

  useEffect(() => {
    const calculateSellPosition = () => {
      if (sellButtonRef.current) {
        const buttonRect = sellButtonRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const menuWidth = 700;
        const padding = 16;
        
        // Calculate center position
        const centerLeft = buttonRect.left + buttonRect.width / 2 - menuWidth / 2;
        
        if (centerLeft < padding) {
          setSellMenuPosition('left');
        } else if (centerLeft + menuWidth > viewportWidth - padding) {
          setSellMenuPosition('right');
        } else {
          setSellMenuPosition('center');
        }
      }
    };

    if (sellMenuOpen) {
      calculateSellPosition();
      window.addEventListener('resize', calculateSellPosition);
      return () => window.removeEventListener('resize', calculateSellPosition);
    }
  }, [sellMenuOpen]);

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

  const handleBuyMouseEnter = () => {
    if (buyTimeoutRef.current) {
      clearTimeout(buyTimeoutRef.current);
      buyTimeoutRef.current = null;
    }
    setBuyMenuOpen(true);
  };

  const handleBuyMouseLeave = () => {
    buyTimeoutRef.current = setTimeout(() => {
      setBuyMenuOpen(false);
    }, 150);
  };

  const handleSellMouseEnter = () => {
    if (sellTimeoutRef.current) {
      clearTimeout(sellTimeoutRef.current);
      sellTimeoutRef.current = null;
    }
    setSellMenuOpen(true);
  };

  const handleSellMouseLeave = () => {
    sellTimeoutRef.current = setTimeout(() => {
      setSellMenuOpen(false);
    }, 150);
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-50">
      {/* Two Row Navigation Layout */}
      <nav className="backdrop-blur-md shadow-sm border-b border-slate-200/30 py-[5px]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* TOP ROW - Contact Information Only */}
          <div className="flex justify-between mt-[0px] mb-[0px] pt-[5px] pb-[3px]">
            {/* Left spacer to match logo positioning */}
            <div className="flex-shrink-0" style={{ width: '280px' }}></div>
            
            {/* Right side contact info - positioned to align with resources dropdown */}
            <div className="flex items-center space-x-8">
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
              {/* Spacer to align email end with resources dropdown right edge */}
              <div className="w-16"></div>
            </div>
          </div>

          {/* Logo - Positioned to align with hero H1 text exactly */}
          <div className="absolute top-0" style={{ zIndex: 10, left: 'calc(50vw - 740px)' }}>
            <a href="/" className="flex items-center">
              <img 
                src={logoPath} 
                alt="4Seasons Real Estate" 
                className="w-auto object-contain"
                style={{ height: '51px' }}
              />
            </a>
          </div>

          {/* BOTTOM ROW - Logo, Navigation Links, Login Button */}
          <div className="flex items-start justify-between">
            
            {/* Invisible spacer to maintain layout */}
            <div className="flex-shrink-0" style={{ width: '280px' }}></div>

            {/* Right Side: Navigation Links + Login Button */}
            <div className="flex items-center space-x-8">
              
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                {/* Buy New Home Mega Menu */}
                <div 
                  className="relative"
                  onMouseEnter={handleBuyMouseEnter}
                  onMouseLeave={handleBuyMouseLeave}
                >
                  <button 
                    ref={buyButtonRef}
                    className="flex items-center font-bold text-slate-600 hover:text-slate-800 transition-colors duration-200 text-sm"
                  >
                    Buy New Home
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </button>
                  
                  {buyMenuOpen && (
                    <div 
                      ref={buyMenuRef}
                      className={`absolute top-full pt-2 w-[700px] max-w-[calc(100vw-2rem)] z-50 ${
                        buyMenuPosition === 'left' ? 'left-0' :
                        buyMenuPosition === 'right' ? 'right-0' :
                        'left-1/2 -translate-x-1/2'
                      }`}
                    >
                      <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-4 md:p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                          {/* Left Column - Primary Services */}
                          <div className="space-y-3">
                          <a href="/buy#search-properties" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center">
                              <Map className="h-5 w-5 text-[#0d0d33] mr-3" />
                              <div>
                                <h4 className="font-medium text-slate-900">Search Properties</h4>
                                <p className="text-sm text-slate-600">Browse available homes and properties for sale.</p>
                              </div>
                            </div>
                          </a>
                          
                          <a href="/new-construction" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center">
                              <Building2 className="h-5 w-5 text-[#0d0d33] mr-3" />
                              <div>
                                <h4 className="font-medium text-slate-900">New Construction</h4>
                                <p className="text-sm text-slate-600">Explore brand new homes and developments.</p>
                              </div>
                            </div>
                          </a>
                          
                          <a href="/first-time-buyers" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-[#0d0d33] mr-3" />
                              <div>
                                <h4 className="font-medium text-slate-900">First-Time Buyer Guide</h4>
                                <p className="text-sm text-slate-600">Step-by-step guidance for first-time homebuyers.</p>
                              </div>
                            </div>
                          </a>
                          </div>
                          
                          {/* Right Column - Calculator Tools */}
                          <div className="space-y-3">
                          
                          <a href="/home-affordability" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center">
                              <Calculator className="h-5 w-5 text-[#0d0d33] mr-3" />
                              <div>
                                <h4 className="font-medium text-slate-900">Home Affordability Calculator</h4>
                                <p className="text-sm text-slate-600">Calculate what you can afford to buy.</p>
                              </div>
                            </div>
                          </a>
                          
                          <a href="/mortgage-calculator" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center">
                              <DollarSign className="h-5 w-5 text-[#0d0d33] mr-3" />
                              <div>
                                <h4 className="font-medium text-slate-900">Mortgage Payment Calculator</h4>
                                <p className="text-sm text-slate-600">Calculate monthly payments and loan costs.</p>
                              </div>
                            </div>
                          </a>
                          
                          <a href="/savings-calculator" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center">
                              <PiggyBank className="h-5 w-5 text-[#0d0d33] mr-3" />
                              <div>
                                <h4 className="font-medium text-slate-900">Home Savings Calculator</h4>
                                <p className="text-sm text-slate-600">Plan your down payment savings timeline.</p>
                              </div>
                            </div>
                          </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Sell Your Home Mega Menu */}
                <div 
                  className="relative"
                  onMouseEnter={handleSellMouseEnter}
                  onMouseLeave={handleSellMouseLeave}
                >
                  <button 
                    ref={sellButtonRef}
                    className="flex items-center font-bold text-slate-600 hover:text-slate-800 transition-colors duration-200 text-sm"
                  >
                    Sell Your Home
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </button>
                  
                  {sellMenuOpen && (
                    <div 
                      ref={sellMenuRef}
                      className={`absolute top-full pt-2 w-[700px] max-w-[calc(100vw-2rem)] z-50 ${
                        sellMenuPosition === 'left' ? 'left-0' :
                        sellMenuPosition === 'right' ? 'right-0' :
                        'left-1/2 -translate-x-1/2'
                      }`}
                    >
                      <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-4 md:p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                          {/* Left Column - Selling Process */}
                          <div className="space-y-3">
                          <a href="/home-valuation" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center">
                              <Home className="h-5 w-5 text-[#0d0d33] mr-3" />
                              <div>
                                <h4 className="font-medium text-slate-900">Home Valuation Tool</h4>
                                <p className="text-sm text-slate-600">Get an instant estimate of your home's value.</p>
                              </div>
                            </div>
                          </a>
                          
                          <a href="/listing-process" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center">
                              <ClipboardList className="h-5 w-5 text-[#0d0d33] mr-3" />
                              <div>
                                <h4 className="font-medium text-slate-900">Listing Your Property</h4>
                                <p className="text-sm text-slate-600">Step-by-step guide to listing your home.</p>
                              </div>
                            </div>
                          </a>
                          
                          <a href="/pricing-strategy" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center">
                              <DollarSign className="h-5 w-5 text-[#0d0d33] mr-3" />
                              <div>
                                <h4 className="font-medium text-slate-900">Pricing Strategy Guide</h4>
                                <p className="text-sm text-slate-600">How to price your home competitively.</p>
                              </div>
                            </div>
                          </a>
                          
                          <a href="/marketing-guide" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center">
                              <Camera className="h-5 w-5 text-[#0d0d33] mr-3" />
                              <div>
                                <h4 className="font-medium text-slate-900">Marketing Your Home</h4>
                                <p className="text-sm text-slate-600">Professional photography and marketing tips.</p>
                              </div>
                            </div>
                          </a>
                          </div>
                          
                          {/* Right Column - Seller Resources */}
                          <div className="space-y-3">
                          
                          <a href="/home-staging" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center">
                              <Sparkles className="h-5 w-5 text-[#0d0d33] mr-3" />
                              <div>
                                <h4 className="font-medium text-slate-900">Home Staging Tips</h4>
                                <p className="text-sm text-slate-600">Prepare your home for maximum appeal.</p>
                              </div>
                            </div>
                          </a>
                          
                          <a href="/market-analysis" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center">
                              <TrendingUp className="h-5 w-5 text-[#0d0d33] mr-3" />
                              <div>
                                <h4 className="font-medium text-slate-900">Market Analysis</h4>
                                <p className="text-sm text-slate-600">Current market trends and timing.</p>
                              </div>
                            </div>
                          </a>
                          
                          <a href="/selling-costs" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center">
                              <Calculator className="h-5 w-5 text-[#0d0d33] mr-3" />
                              <div>
                                <h4 className="font-medium text-slate-900">Selling Costs Calculator</h4>
                                <p className="text-sm text-slate-600">Estimate your net proceeds.</p>
                              </div>
                            </div>
                          </a>
                          
                          <a href="/fsbo-vs-agent" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center">
                              <Users className="h-5 w-5 text-[#0d0d33] mr-3" />
                              <div>
                                <h4 className="font-medium text-slate-900">FSBO vs Agent</h4>
                                <p className="text-sm text-slate-600">Compare selling options and outcomes.</p>
                              </div>
                            </div>
                          </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
                    className="px-4 h-[1.75rem] text-sm font-semibold text-white hover:opacity-90 transition-opacity"
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
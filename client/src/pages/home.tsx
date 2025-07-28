import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BackToTop } from "@/components/ui/back-to-top";
import logoPath from "@/assets/images/logo_sm.png";
import logoLarge from "@/assets/images/logo.png";
import logoFooter from "@/assets/images/logo_footer.png";
import heroVideo from "@/assets/videos/hero.mp4";
import amyPhoto from "@/assets/images/amy.jpg";
import timPhoto from "@/assets/images/tim.jpg";
import marketAnalysisBlog from "@/assets/images/market-analysis-blog.jpg";
import texasBlog from "@/assets/images/texas-blog.jpg";
import { 
  Menu, 
  X, 
  Zap, 
  Shield, 
  Smartphone, 
  Layers, 
  TrendingUp, 
  Settings,
  Code,
  Book,
  CheckCircle,
  Github,
  Twitter,
  MessageSquare,
  ChevronDown,
  Linkedin,
  Mail,
  ChevronUp,
  MapPin,
  Phone,
  Clock,
  Instagram,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMoreTeam, setShowMoreTeam] = useState(false);
  const [showMoreTim, setShowMoreTim] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    properties: 0,
    sales: 0,
    satisfaction: 0,
    years: 0
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Animate stats when section comes into view
  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number, key: string) => {
      const startTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        setAnimatedStats(prev => ({ ...prev, [key]: current }));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };

    const startAnimations = () => {
      if (!hasAnimated) {
        setHasAnimated(true);
        // Start animations with staggered delays
        setTimeout(() => animateValue(0, 300, 2000, 'properties'), 200);
        setTimeout(() => animateValue(0, 90, 2000, 'sales'), 400);
        setTimeout(() => animateValue(0, 98, 2000, 'satisfaction'), 600);
        setTimeout(() => animateValue(0, 25, 2000, 'years'), 800);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimations();
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Start animation slightly before element is fully visible
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  // Testimonials data
  const testimonials = [
    { name: "Michael S.", location: "Plano", quote: "Honestly, I was dreading selling, but 4 Seasons made it feel almost easy. Their team was sharp and really knew their stuff, got us a great deal way faster than we expected!" },
    { name: "Sarah C.", location: "Frisco", quote: "From our first call, we just knew we were in good hands. They helped us snag our dream house even in this wild market. Seriously impressed with their hustle!" },
    { name: "Jessica R.", location: "Allen", quote: "So glad we went with them. They were always a step ahead, totally on top of everything. It felt like they genuinely cared about getting us exactly what we wanted!" },
    { name: "David L.", location: "McKinney", quote: "Couldn't recommend 4 Seasons enough. They were super professional but also just really nice people to work with. Made the whole buying process way less stressful!" },
    { name: "Emily K.", location: "Richardson", quote: "Absolutely fantastic service from start to finish! They handled everything seamlessly, and we closed much faster than we anticipated. Highly recommend for anyone looking to sell!" },
    { name: "Kevin P.", location: "Garland", quote: "We thought we'd be house hunting forever, but 4 Seasons pulled it off. They somehow made the tricky parts feel smooth. Huge thanks to the whole crew!" },
    { name: "Linda W.", location: "Little Elm", quote: "After several frustrating attempts with other agents, 4 Seasons came in and got our tricky property sold. Their market insight was spot on, and their communication was excellent throughout!" },
    { name: "Maria G.", location: "The Colony", quote: "We'd heard horror stories about first-time home buying, but our experience with 4 Seasons was anything but. They walked us through every single step with patience and expertise." }
  ];

  const features = [
    {
      icon: Zap,
      title: "Fast Development",
      description: "Hot reload, fast refresh, and optimized build process for rapid development cycles.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Type Safety", 
      description: "Full TypeScript integration with strict type checking and IntelliSense support.",
      color: "text-secondary"
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first approach with Tailwind CSS utility classes for all screen sizes.",
      color: "text-accent"
    },
    {
      icon: Layers,
      title: "Component Architecture",
      description: "Modular, reusable components following React best practices and patterns.",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "Performance Optimized",
      description: "Built-in optimizations including code splitting, image optimization, and caching.",
      color: "text-secondary"
    },
    {
      icon: Settings,
      title: "Developer Experience",
      description: "ESLint, Prettier, and development tools configured for productive coding.",
      color: "text-accent"
    }
  ];

  const techStack = [
    {
      name: "Next.js 14",
      description: "Full-stack React framework with App Router",
      icon: "⚛️",
      bgColor: "bg-slate-900"
    },
    {
      name: "TypeScript",
      description: "Static type checking for better code quality",
      icon: "TS",
      bgColor: "bg-blue-600"
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid UI development",
      icon: "TW",
      bgColor: "bg-cyan-500"
    },
    {
      name: "Modern Tooling",
      description: "ESLint, Prettier, and development tools",
      icon: "🛠️",
      bgColor: "bg-slate-800"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation - positioned absolutely over hero for immediate transparency */}
      <nav className="absolute top-0 left-0 right-0 backdrop-blur-md shadow-sm border-b border-slate-200/30 z-50" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src={logoPath} alt="Logo" className="w-[90px] h-[56px]" />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/buy" className="text-slate-600 hover:text-primary transition-colors duration-200">Buy</a>
              <a href="/sell" className="text-slate-600 hover:text-primary transition-colors duration-200">Sell</a>
              <a href="#property-management" className="text-slate-600 hover:text-primary transition-colors duration-200">Property Management</a>
              
              {/* Resources Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-slate-600 hover:text-primary transition-colors duration-200">
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <a href="#home-valuation" className="w-full">Home Valuation</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#city-guides" className="w-full">City Guides</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#school-districts" className="w-full">School Districts</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#property-investment" className="w-full">Property Investment</a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <a href="#blog" className="w-full">Blog</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#faq" className="w-full">FAQ</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#terms" className="w-full">Terms & Conditions</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#contact" className="w-full">Contact Us</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
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
              <a href="#property-management" className="block text-slate-600 hover:text-primary">Property Management</a>
              
              {/* Resources - Mobile Expanded */}
              <div className="border-t border-slate-100 pt-3 mt-3">
                <p className="text-sm font-medium text-slate-500 mb-2">Resources</p>
                <div className="pl-4 space-y-2">
                  <a href="#home-valuation" className="block text-slate-600 hover:text-primary text-sm">Home Valuation</a>
                  <a href="#city-guides" className="block text-slate-600 hover:text-primary text-sm">City Guides</a>
                  <a href="#school-districts" className="block text-slate-600 hover:text-primary text-sm">School Districts</a>
                  <a href="#property-investment" className="block text-slate-600 hover:text-primary text-sm">Property Investment</a>
                  <a href="#blog" className="block text-slate-600 hover:text-primary text-sm">Blog</a>
                  <a href="#faq" className="block text-slate-600 hover:text-primary text-sm">FAQ</a>
                  <a href="#terms" className="block text-slate-600 hover:text-primary text-sm">Terms & Conditions</a>
                  <a href="#contact" className="block text-slate-600 hover:text-primary text-sm">Contact Us</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Colored background behind video for nav transparency effect */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900"></div>
        
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              It's Good to be <span className="text-primary">Home!</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-4xl leading-relaxed text-shadow" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              At 4Seasons Real Estate, we offer expert guidance for all your property needs—whether you're buying, selling, or renting—complemented by our reliable property management services. Your goals, our priority, every season of the year.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#1f2937' }}>
                Explore Properties
              </Button>
              <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-transparent">
                Contact Us
              </Button>
            </div>
          </div>
          
          
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          
          {/* Company Introduction and Logo */}
          <div className="grid lg:grid-cols-4 gap-12 mb-16">
            {/* Company Introduction - 75% width */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">About 4Seasons Real Estate</h2>
              <div className="space-y-4 text-xl text-slate-600 leading-relaxed">
                <p>
                  Welcome to 4Seasons Real Estate, your trusted partner for all your real estate needs in North Texas! We are a dedicated team of local experts passionate about helping you navigate the dynamic North Texas property market with ease and confidence.
                </p>
                <p>
                  At 4Seasons Real Estate we meticulously manage every aspect of your Real Estate transaction, ensuring no detail is overlooked. We pride ourselves on diving into the complexities, handling all the logistics and nuances so you don't have to. You'll breathe easy and savor the journey, knowing our expert team is diligently working hard for you.
                </p>
              </div>
            </div>
            
            {/* Company Logo - 25% width */}
            <div className="lg:col-span-1 flex justify-center items-center">
              <img src={logoLarge} alt="4Seasons Real Estate" className="w-full max-w-sm object-contain" />
            </div>
          </div>
          
          {/* Services Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Buying a Home */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Buying a Home</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Our expert team will guide you through every step of the home buying process. From initial property search to final closing, we provide personalized support to ensure you find your dream home at the perfect price. Our comprehensive market knowledge ensures you make informed decisions. We assist with financing options, inspections, and negotiations to secure the best deal possible. We provide detailed neighborhood analysis to help you choose the perfect location for your family.
                </p>
                <Button 
                  className="px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity" 
                  style={{ backgroundColor: '#1f2937' }}
                >
                  <a href="#buy" className="text-white no-underline">Learn More</a>
                </Button>
              </CardContent>
            </Card>

            {/* Selling Your Property */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Selling Your Property</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Maximize your property's value with our strategic marketing approach and expert pricing guidance. We handle everything from professional photography to negotiations, ensuring a smooth and profitable sale in today's competitive market. Our proven marketing strategies and extensive network help you reach qualified buyers quickly and efficiently. We provide detailed market analysis to position your property competitively.
                </p>
                <Button 
                  className="px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity" 
                  style={{ backgroundColor: '#1f2937' }}
                >
                  <a href="#sell" className="text-white no-underline">Learn More</a>
                </Button>
              </CardContent>
            </Card>

            {/* Property Management */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Property Management</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Let us handle the day-to-day management of your investment properties. From tenant screening to maintenance coordination, we provide comprehensive property management services that protect your investment and maximize your returns. Our services include rent collection, maintenance requests, financial reporting, and ensuring compliance with local regulations for stress-free ownership.
                </p>
                <Button 
                  className="px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity" 
                  style={{ backgroundColor: '#1f2937' }}
                >
                  <a href="#property-management" className="text-white no-underline">Learn More</a>
                </Button>
              </CardContent>
            </Card>

            {/* Market Analysis */}
            <Card className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Market Analysis</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Stay informed with our detailed market analysis and property valuations. We provide comprehensive reports on market trends, comparable sales, and investment opportunities to help you make strategic real estate decisions. Our data-driven approach includes neighborhood analysis, price forecasting, and investment ROI calculations to guide your property choices.
                </p>
                <Button 
                  className="px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity" 
                  style={{ backgroundColor: '#1f2937' }}
                >
                  <a href="#home-valuation" className="text-white no-underline">Learn More</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section id="team" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl">
              Our dedicated team of real estate professionals brings years of experience and local market expertise to help you achieve your property goals
            </p>
          </div>
          
          {/* Amy Harwood Profile */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Team Member Photo */}
              <div className="bg-slate-200 aspect-square lg:aspect-auto">
                <img 
                  src={amyPhoto} 
                  alt="Amy Harwood - Agency Owner & Real Estate Specialist"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Team Member Details */}
              <div className="p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Amy Harwood</h3>
                <p className="text-primary text-lg font-medium mb-4">Agency Owner & Real Estate Specialist</p>
                
                <div className="text-slate-600 leading-relaxed mb-6">
                  <p className="mb-4">
                    With over 15 years of dedicated experience, Amy Harwood is a seasoned Real Estate Broker and a trusted expert in the North Texas residential market. As the proud owner of 4Seasons Real Estate Svcs, LLC in Allen, Texas, Amy has built her business on a foundation of proven customer satisfaction and an in-depth understanding of every facet of real estate.
                  </p>
                  
                  {showMoreTeam && (
                    <div className="space-y-4">
                      <p>
                        Amy's approach combines meticulous attention to detail with a deep commitment to her clients' success. She specializes in both residential buying and selling, bringing comprehensive market knowledge and strategic insights to every transaction.
                      </p>
                      <p>
                        Her extensive experience in the North Texas market, particularly in Allen and surrounding communities, allows her to provide invaluable guidance on market trends, neighborhood dynamics, and investment opportunities.
                      </p>
                      <p>
                        Amy believes in building lasting relationships with her clients, ensuring they feel supported and informed throughout their real estate journey. Her dedication to excellence and personalized service has earned her a reputation as one of the most trusted real estate professionals in the area.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Show More/Less Button */}
                <button
                  onClick={() => setShowMoreTeam(!showMoreTeam)}
                  className="flex items-center text-primary hover:text-blue-600 font-medium mb-6 transition-colors"
                >
                  {showMoreTeam ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Show More</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </button>
                
                {/* Social Media Links */}
                <div className="flex items-center space-x-4">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-10 h-10 text-white rounded-full hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#1f2937' }}
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:amy@4seasonsrealestate.com"
                    className="inline-flex items-center justify-center w-10 h-10 text-white rounded-full hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#1f2937' }}
                    aria-label="Email Amy"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tim Harwood Profile - Reversed Layout */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-12">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Team Member Details - Left Side */}
              <div className="p-8 lg:p-12 order-2 lg:order-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Tim Harwood</h3>
                <p className="text-primary text-lg font-medium mb-4">Finance and Property Management Professional</p>
                
                <div className="text-slate-600 leading-relaxed mb-6">
                  <p className="mb-4">
                    Tim Harwood is a highly skilled Underwriter and Property Management professional, with a deep understanding of the mortgage lending and real estate industries. Located in Allen, Texas, Tim's career is marked by a proven ability to excel in various aspects of financial and estate transactions.
                  </p>
                  
                  {showMoreTim && (
                    <div className="space-y-4">
                      <p>
                        Tim's extensive background includes significant roles as a Prefund Underwriter Auditor at MetaSource and a Pre-Underwriter at INDECOMM, where he honed his expertise in mortgage lending and underwriting. His seven years as an Underwriter at Bank of America further solidified his proficiency in this critical area.
                      </p>
                      <p>
                        Beyond his underwriting capabilities, Tim also possesses a strong foundation in property management, cultivated during his nearly 20 years as a Real Estate Agent with 4Seasons Realty in Allen, Texas. This dual expertise in underwriting and property management provides him with a unique perspective and a well-rounded understanding of the entire property transaction lifecycle.
                      </p>
                      <p>
                        Tim is passionate about leveraging his analytical skills and client-focused approach to contribute to successful outcomes. His dedication to understanding the intricacies of both underwriting and property management makes him a valuable asset to any team seeking a results-driven professional in the mortgage and real estate sectors.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Show More/Less Button */}
                <button
                  onClick={() => setShowMoreTim(!showMoreTim)}
                  className="flex items-center text-primary hover:text-blue-600 font-medium mb-6 transition-colors"
                >
                  {showMoreTim ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Show More</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </button>
                
                {/* Social Media Links */}
                <div className="flex items-center space-x-4">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-10 h-10 text-white rounded-full hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#1f2937' }}
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:tim@4seasonsrealestate.com"
                    className="inline-flex items-center justify-center w-10 h-10 text-white rounded-full hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#1f2937' }}
                    aria-label="Email Tim"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Team Member Photo - Right Side */}
              <div className="bg-slate-200 aspect-square lg:aspect-auto order-1 lg:order-2">
                <img 
                  src={timPhoto} 
                  alt="Tim Harwood - Finance and Property Management Professional"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stats Banner */}
      <section ref={statsRef} className="py-20" style={{ backgroundColor: '#1f2937' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Success by the Numbers
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Trusted by hundreds of families across North Texas, our track record speaks for itself.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {/* Properties Sold */}
            <div className="group">
              <div className={`text-4xl md:text-5xl font-bold text-white mb-2 transition-transform duration-1000 ${hasAnimated ? 'scale-100' : 'scale-95'}`}>
                {animatedStats.properties}+
              </div>
              <div className="text-lg font-medium text-white">
                Properties Sold
              </div>
            </div>

            {/* Sales Volume */}
            <div className="group">
              <div className={`text-4xl md:text-5xl font-bold text-white mb-2 transition-transform duration-1000 ${hasAnimated ? 'scale-100' : 'scale-95'}`}>
                ${animatedStats.sales}M+
              </div>
              <div className="text-lg font-medium text-white">
                in Sales
              </div>
            </div>

            {/* Client Satisfaction */}
            <div className="group">
              <div className={`text-4xl md:text-5xl font-bold text-white mb-2 transition-transform duration-1000 ${hasAnimated ? 'scale-100' : 'scale-95'}`}>
                {animatedStats.satisfaction}%
              </div>
              <div className="text-lg font-medium text-white">
                Client Satisfaction
              </div>
            </div>

            {/* Years of Excellence */}
            <div className="group">
              <div className={`text-4xl md:text-5xl font-bold text-white mb-2 transition-transform duration-1000 ${hasAnimated ? 'scale-100' : 'scale-95'}`}>
                {animatedStats.years}+
              </div>
              <div className="text-lg font-medium text-white">
                Years of Excellence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Contact Us
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl">
              4Seasons Real Estate is here to help you with all your real estate needs. Reach out to us through any of the channels below or fill out the contact form.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Locations */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Office Locations</h3>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Allen Texas</h4>
                    <p className="text-slate-600">1333 W. McDermott Dr #200, Allen, TX, 75013</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                    <a href="tel:2742743873" className="text-slate-600 hover:text-primary transition-colors">
                      (214) 274-3873
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                    <a href="mailto:aharwood23@yahoo.com" className="text-slate-600 hover:text-primary transition-colors">
                      aharwood23@yahoo.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-slate-600">Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</span>
                  </div>
                </div>
              </div>

              {/* Follow Us */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Follow Us</h3>
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
                  <a
                    href="mailto:aharwood23@yahoo.com"
                    className="w-8 h-8 text-white rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: '#1f2937' }}
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h3>
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-slate-700 mb-2">Full Name</Label>
                    <Input 
                      id="fullName" 
                      type="text" 
                      placeholder="Your name" 
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Your email" 
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700 mb-2">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Your phone" 
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium text-slate-700 mb-2">Subject</Label>
                    <Input 
                      id="subject" 
                      type="text" 
                      placeholder="Select a subject" 
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-slate-700 mb-2">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Your message..." 
                      rows={4} 
                      className="w-full"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full !bg-blue-600 text-white py-3 text-lg font-medium hover:!bg-blue-700 transition-colors"
                  >
                    Submit Message
                  </Button>
                  
                  <p className="text-xs text-slate-500 mt-4">
                    <strong>SMS Opt-in:</strong> By submitting this form, you consent to receive SMS notifications from 4Seasons Real Estate regarding your inquiry. Standard message and data rates may apply. You can opt out at any time by replying STOP. Message frequency varies.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl">
              Don't just take our word for it. Here's what families across North Texas say about their experience with 4Seasons Real Estate.
            </p>
          </div>
          
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={() => setCurrentTestimonial(Math.max(0, currentTestimonial - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentTestimonial === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => setCurrentTestimonial(Math.min(testimonials.length - 3, currentTestimonial + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentTestimonial >= testimonials.length - 3}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Testimonials Container */}
            <div className="overflow-hidden mx-16">
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{
                  transform: `translateX(-${currentTestimonial * (100 / 3)}%)`
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="flex-shrink-0 w-1/3 bg-slate-50 border border-slate-200">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-lg">★</span>
                        ))}
                      </div>
                      <blockquote className="text-slate-700 italic leading-relaxed mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="border-t border-slate-200 pt-4">
                        <div className="font-semibold text-slate-900">{testimonial.name}</div>
                        <div className="text-slate-600 text-sm">{testimonial.location}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: testimonials.length - 2 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial 
                      ? 'bg-primary' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <li><a href="/buy" className="text-slate-300 hover:text-white transition-colors">Buy</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Property Management</a></li>
                <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Home Valuation</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">School Districts</a></li>
              </ul>
            </div>
            
            {/* Quick Links - Column 2 */}
            <div className="md:col-span-1">
              <h3 className="font-semibold text-white mb-4 opacity-0">Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/sell" className="text-slate-300 hover:text-white transition-colors">Sell</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Neighborhoods</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Blog Posts</a></li>
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
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}

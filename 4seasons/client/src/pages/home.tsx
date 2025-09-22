import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/ui/back-to-top";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import logoPath from "@/assets/images/logo_sm.png";
import logoLarge from "@/assets/images/logo.png";
import logoFooter from "@/assets/images/logo_footer.png";
import heroVideo from "@/assets/videos/hero.mp4";
import amyPhoto from "@/assets/images/amy.jpg";
import timPhoto from "@/assets/images/tim.jpg";
import marketAnalysisBlog from "@/assets/images/market-analysis-blog.jpg";
import texasBlog from "@/assets/images/texas-blog.jpg";
import { 
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
  MessageSquare,
  Mail,
  ChevronUp,
  ChevronDown,
  MapPin,
  Phone,
  Clock,
  ChevronLeft,
  ChevronRight,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

// Static data arrays moved outside component to prevent recreation on re-renders
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
    title: "Component Library",
    description: "Modular components built with accessibility and reusability in mind.",
    color: "text-primary"
  }
];

const techStack = [
  {
    name: "React + Vite",
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

function Home() {
  // Consolidated state management for better performance
  const [expandedSections, setExpandedSections] = useState({
    showMoreTeam: false,
    showMoreTim: false
  });

  const [animations, setAnimations] = useState({
    stats: {
      properties: 0,
      sales: 0,
      satisfaction: 0,
      years: 0
    },
    hasAnimated: false,
    currentTestimonial: 0
  });

  const statsRef = useRef<HTMLElement>(null);

  // Refs for cleanup to prevent memory leaks and state updates after unmount
  const timeoutIds = useRef<Set<number>>(new Set());
  const rafIds = useRef<Set<number>>(new Set());
  const animationInProgress = useRef<Set<string>>(new Set());

  // Memoized animation function to prevent recreation on every render
  const animateValue = useCallback((start: number, end: number, duration: number, key: string) => {
    // Guard against multiple simultaneous animations for the same key
    if (animationInProgress.current.has(key)) {
      return;
    }

    animationInProgress.current.add(key);
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);

      setAnimations(prev => ({
        ...prev,
        stats: { ...prev.stats, [key]: current }
      }));

      if (progress < 1) {
        const rafId = requestAnimationFrame(animate);
        rafIds.current.add(rafId);
      } else {
        // Animation complete, remove from in-progress set
        animationInProgress.current.delete(key);
      }
    };
    const initialRafId = requestAnimationFrame(animate);
    rafIds.current.add(initialRafId);
  }, []);

  // Memoized event handlers to prevent unnecessary re-renders
  const handleToggleTeamSection = useCallback(() => {
    setExpandedSections(prev => ({ ...prev, showMoreTeam: !prev.showMoreTeam }));
  }, []);

  const handleToggleTimSection = useCallback(() => {
    setExpandedSections(prev => ({ ...prev, showMoreTim: !prev.showMoreTim }));
  }, []);

  const handlePrevTestimonial = useCallback(() => {
    setAnimations(prev => ({
      ...prev,
      currentTestimonial: Math.max(0, prev.currentTestimonial - 1)
    }));
  }, []);

  const handleNextTestimonial = useCallback(() => {
    setAnimations(prev => ({
      ...prev,
      currentTestimonial: Math.min(testimonials.length - 3, prev.currentTestimonial + 1)
    }));
  }, []);

  const handleTestimonialDot = useCallback((index: number) => {
    setAnimations(prev => ({ ...prev, currentTestimonial: index }));
  }, []);

  // Memoized animation start function
  const startAnimations = useCallback(() => {
    if (!animations.hasAnimated) {
      setAnimations(prev => ({ ...prev, hasAnimated: true }));
      // Start animations with staggered delays and track timeout IDs
      const timeout1 = setTimeout(() => animateValue(0, 300, 2000, 'properties'), 200);
      const timeout2 = setTimeout(() => animateValue(0, 90, 2000, 'sales'), 400);
      const timeout3 = setTimeout(() => animateValue(0, 98, 2000, 'satisfaction'), 600);
      const timeout4 = setTimeout(() => animateValue(0, 25, 2000, 'years'), 800);

      timeoutIds.current.add(timeout1);
      timeoutIds.current.add(timeout2);
      timeoutIds.current.add(timeout3);
      timeoutIds.current.add(timeout4);
    }
  }, [animations.hasAnimated, animateValue]);

  // Animate stats when section comes into view
  useEffect(() => {
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
  }, [startAnimations]);

  // Cleanup effect to prevent state updates after unmount and memory leaks
  useEffect(() => {
    return () => {
      // Clear all timeouts
      timeoutIds.current.forEach(timeoutId => {
        clearTimeout(timeoutId);
      });
      timeoutIds.current.clear();

      // Cancel all request animation frames
      rafIds.current.forEach(rafId => {
        cancelAnimationFrame(rafId);
      });
      rafIds.current.clear();

      // Clear animation progress tracking
      animationInProgress.current.clear();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <SEO 
        title="4Seasons Real Estate - Premier Dallas-Fort Worth Real Estate Services | Buy, Sell & Property Management"
        description="Expert real estate services in Dallas-Fort Worth metroplex. Buy, sell, or manage properties in Allen, Plano, Frisco, McKinney with trusted local experts. 15+ years experience, 98% client satisfaction."
        keywords="Dallas Fort Worth real estate, DFW homes for sale, Allen TX real estate agent, Plano homes, Frisco real estate, McKinney properties, North Texas property management, buy homes Dallas, sell house Fort Worth, real estate investment DFW"
        canonicalUrl={`${seoConfig.siteUrl}/`}
        ogTitle="4Seasons Real Estate - Your Trusted DFW Real Estate Partner Since 2009"
        ogDescription="Discover exceptional properties in Dallas-Fort Worth with expert guidance from North Texas's most trusted real estate professionals. Buying, selling, and property management services with 15+ years experience."
        ogImage={`${seoConfig.siteUrl}/images/4seasons-home-og.jpg`}
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            generateStructuredData.organization(),
            generateStructuredData.localBusiness(),
            generateStructuredData.webPage(
              "4Seasons Real Estate - Dallas-Fort Worth Real Estate Services",
              "Expert real estate services in Dallas-Fort Worth metroplex",
              seoConfig.siteUrl
            )
          ]
        }}
        googleSiteVerification={import.meta.env.VITE_GOOGLE_SITE_VERIFICATION}
        viewport="width=device-width, initial-scale=1.0, viewport-fit=cover"
        themeColor="#0d0d33"
      />
      <Navigation />

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
              <Link href="/buy">
                <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#1f2937' }}>
                  Explore Properties
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-transparent">
                  Contact Us
                </Button>
              </Link>
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
                  <a href="/buy" className="text-white no-underline">Learn More</a>
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
                  <a href="/sell" className="text-white no-underline">Learn More</a>
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
                  <a href="/property-management" className="text-white no-underline">Learn More</a>
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
                  <a href="/home-valuation" className="text-white no-underline">Learn More</a>
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
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Team Member Photo */}
              <div className="bg-slate-200 aspect-[3/4] lg:aspect-auto">
                <img 
                  src={amyPhoto} 
                  alt="Amy Harwood - Agency Owner & Real Estate Specialist"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Team Member Details */}
              <div className="p-4 lg:p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Amy Harwood</h3>
                <p className="text-primary text-lg font-medium mb-4">Agency Owner & Real Estate Specialist</p>
                
                <div className="text-slate-600 leading-relaxed mb-6">
                  <p className="mb-4">
                    With over 15 years of dedicated experience, Amy Harwood is a seasoned Real Estate Broker and a trusted expert in the North Texas residential market. As the proud owner of 4Seasons Real Estate Svcs, LLC in Allen, Texas, Amy has built her business on a foundation of proven customer satisfaction and an in-depth understanding of every facet of real estate.
                  </p>
                  
                  {expandedSections.showMoreTeam && (
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
                  onClick={handleToggleTeamSection}
                  className="flex items-center text-primary hover:text-blue-600 font-medium mb-6 transition-colors"
                >
                  {expandedSections.showMoreTeam ? (
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
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-8 max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Team Member Details - Left Side */}
              <div className="p-4 lg:p-6 order-2 lg:order-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Tim Harwood</h3>
                <p className="text-primary text-lg font-medium mb-4">Finance and Property Management Professional</p>
                
                <div className="text-slate-600 leading-relaxed mb-6">
                  <p className="mb-4">
                    Tim Harwood is a highly skilled Underwriter and Property Management professional, with a deep understanding of the mortgage lending and real estate industries. Located in Allen, Texas, Tim's career is marked by a proven ability to excel in various aspects of financial and estate transactions.
                  </p>
                  
                  {expandedSections.showMoreTim && (
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
                  onClick={handleToggleTimSection}
                  className="flex items-center text-primary hover:text-blue-600 font-medium mb-6 transition-colors"
                >
                  {expandedSections.showMoreTim ? (
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
              <div className="bg-slate-200 aspect-[3/4] lg:aspect-auto order-1 lg:order-2">
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
      <section ref={statsRef} className="py-12" style={{ backgroundColor: '#1f2937' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Our Success by the Numbers
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Trusted by hundreds of families across North Texas, our track record speaks for itself.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {/* Properties Sold */}
            <div className="group">
              <div className={`text-3xl md:text-4xl font-bold text-white mb-1 transition-transform duration-1000 ${animations.hasAnimated ? 'scale-100' : 'scale-95'}`}>
                {animations.stats.properties}+
              </div>
              <div className="text-base font-medium text-white">
                Properties Sold
              </div>
            </div>

            {/* Sales Volume */}
            <div className="group">
              <div className={`text-3xl md:text-4xl font-bold text-white mb-1 transition-transform duration-1000 ${animations.hasAnimated ? 'scale-100' : 'scale-95'}`}>
                ${animations.stats.sales}M+
              </div>
              <div className="text-base font-medium text-white">
                in Sales
              </div>
            </div>

            {/* Client Satisfaction */}
            <div className="group">
              <div className={`text-3xl md:text-4xl font-bold text-white mb-1 transition-transform duration-1000 ${animations.hasAnimated ? 'scale-100' : 'scale-95'}`}>
                {animations.stats.satisfaction}%
              </div>
              <div className="text-base font-medium text-white">
                Client Satisfaction
              </div>
            </div>

            {/* Years of Excellence */}
            <div className="group">
              <div className={`text-3xl md:text-4xl font-bold text-white mb-1 transition-transform duration-1000 ${animations.hasAnimated ? 'scale-100' : 'scale-95'}`}>
                {animations.stats.years}+
              </div>
              <div className="text-base font-medium text-white">
                Years of Excellence
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />

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
              onClick={handlePrevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={animations.currentTestimonial === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={handleNextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={animations.currentTestimonial >= testimonials.length - 3}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Testimonials Container */}
            <div className="overflow-hidden mx-16">
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{
                  transform: `translateX(-${animations.currentTestimonial * (100 / 3)}%)`
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
                  onClick={() => handleTestimonialDot(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === animations.currentTestimonial 
                      ? '' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  style={{
                    backgroundColor: index === animations.currentTestimonial ? '#0d0d33' : undefined
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}

// Export memoized component to prevent unnecessary re-renders
export default memo(Home);

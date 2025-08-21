import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { Award, Users, Home, Star, MapPin, Clock, CheckCircle, ChevronUp, ChevronDown, Linkedin, Mail } from "lucide-react";
import logoPath from "@/assets/images/logo.png";
import amyPhoto from "@/assets/images/amy.jpg";
import timPhoto from "@/assets/images/tim.jpg";

export default function About() {
  const [showMoreTeam, setShowMoreTeam] = useState(false);
  const [showMoreTim, setShowMoreTim] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    homesSold: 0,
    yearsExperience: 0,
    clientSatisfaction: 0,
    communitiesServed: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

  const stats = [
    { number: "500+", label: "Homes Sold", icon: Home, animatedKey: "homesSold", targetValue: 500 },
    { number: "15+", label: "Years Experience", icon: Clock, animatedKey: "yearsExperience", targetValue: 15 },
    { number: "98%", label: "Client Satisfaction", icon: Star, animatedKey: "clientSatisfaction", targetValue: 98 },
    { number: "50+", label: "Communities Served", icon: MapPin, animatedKey: "communitiesServed", targetValue: 50 }
  ];

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
        setTimeout(() => animateValue(0, 500, 2000, 'homesSold'), 200);
        setTimeout(() => animateValue(0, 15, 2000, 'yearsExperience'), 400);
        setTimeout(() => animateValue(0, 98, 2000, 'clientSatisfaction'), 600);
        setTimeout(() => animateValue(0, 50, 2000, 'communitiesServed'), 800);
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

  const teamMembers = [
    {
      name: "Amy Harwood",
      title: "Agency Owner & Real Estate Specialist",
      experience: "15+ years in North Texas real estate",
      specialties: ["Residential Buying", "Residential Selling", "Market Analysis"],
      bio: "With over 15 years of dedicated experience, Amy Harwood is a seasoned Real Estate Broker and a trusted expert in the North Texas residential market. As the proud owner of 4Seasons Real Estate Svcs, LLC in Allen, Texas, Amy has built her business on a foundation of proven customer satisfaction and an in-depth understanding of every facet of real estate. Amy's approach combines meticulous attention to detail with a deep commitment to her clients' success, bringing comprehensive market knowledge and strategic insights to every transaction."
    },
    {
      name: "Tim Harwood",
      title: "Finance and Property Management Professional",
      experience: "20+ years in real estate and finance",
      specialties: ["Underwriting", "Property Management", "Mortgage Lending"],
      bio: "Tim Harwood is a highly skilled Underwriter and Property Management professional, with a deep understanding of the mortgage lending and real estate industries. Located in Allen, Texas, Tim's career is marked by a proven ability to excel in various aspects of financial and estate transactions. His extensive background includes significant roles as a Prefund Underwriter Auditor and Pre-Underwriter, with seven years as an Underwriter at Bank of America. Beyond his underwriting capabilities, Tim possesses a strong foundation in property management, cultivated during his nearly 20 years as a Real Estate Agent with 4Seasons Realty."
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Client-Centered Service",
      description: "Every decision we make is focused on achieving the best possible outcome for our clients. Your goals become our mission, and we tailor our approach to meet your unique needs and timeline. From first-time homebuyers to seasoned investors, we provide personalized guidance, clear communication, and unwavering support throughout your entire real estate journey. We believe in building lasting relationships based on trust, transparency, and genuine care for your success."
    },
    {
      icon: Award,
      title: "Professional Excellence",
      description: "We maintain the highest standards of professional conduct and continuously invest in education and market knowledge. Our team stays current with industry trends, legal requirements, and innovative marketing strategies to provide you with cutting-edge service. We're committed to ongoing professional development, holding advanced certifications and memberships in prestigious real estate organizations. This dedication to excellence ensures you receive expert guidance backed by the latest industry insights."
    },
    {
      icon: Home,
      title: "Community Expertise",
      description: "Our deep roots in North Texas give us unmatched insight into local markets, schools, and neighborhood dynamics. Having lived and worked in this area for over 15 years, we understand the unique character of each community, from Allen's family-friendly atmosphere to Plano's business districts. We know which neighborhoods are experiencing growth, which schools are top-rated, and what amenities matter most to different lifestyles. This local knowledge becomes your competitive advantage in both buying and selling."
    },
    {
      icon: Star,
      title: "Proven Results",
      description: "Our track record speaks for itself - successful transactions, satisfied clients, and lasting relationships built on trust. With hundreds of homes sold and a 98% client satisfaction rate, we've consistently delivered results that exceed expectations. Our strategic marketing approach, skilled negotiation, and attention to detail have helped clients achieve their real estate goals while maximizing value. Many of our clients return to us for their next transaction and refer their friends and family, testament to the quality of our service."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              About 4Seasons Real Estate
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Your trusted partner in North Texas real estate since 2009. We combine local expertise 
              with innovative technology to deliver exceptional results for buyers, sellers, and investors.
            </p>
          </div>
        </div>
      </section>



      {/* Our Story Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg text-slate-700 space-y-6">
                <p>
                  Founded in 2009, 4Seasons Real Estate was born from a simple belief: that every client 
                  deserves personalized, professional service throughout their real estate journey. What 
                  started as a small team with big dreams has grown into one of North Texas's most trusted 
                  real estate brokerages.
                </p>
                <p>
                  Our name reflects our commitment to being there for clients through every season of their 
                  lives - whether they're first-time homebuyers in the spring of their careers, growing 
                  families needing more space, or empty nesters looking to downsize. We understand that 
                  real estate decisions are deeply personal and often represent life's most significant 
                  financial transactions.
                </p>
                <p>
                  Over the years, we've built our reputation on three core principles: unmatched local 
                  expertise, innovative marketing strategies, and unwavering commitment to client success. 
                  These values have guided us through changing markets and evolving client needs, always 
                  keeping our focus on what matters most - helping people achieve their real estate goals.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <img 
                src={logoPath} 
                alt="4Seasons Real Estate Logo" 
                className="w-full max-w-sm h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose 4Seasons Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose 4Seasons?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">15+ years of DFW market expertise</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Award-winning customer service</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Professional photography & staging</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Comprehensive market analysis</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Fast response time guarantee</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Innovative digital marketing</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Neighborhood specialization</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Transparent communication</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Negotiation expertise</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Property management services</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">First-time buyer programs</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Investment property guidance</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Relocation assistance</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">24/7 client support</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Free home valuation reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              These core values guide everything we do and ensure every client receives 
              the exceptional service they deserve.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8 border border-slate-200">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: '#0d0d33' }}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{value.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section id="team" className="py-16 bg-slate-50">
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
                <p className="text-lg font-medium mb-4" style={{ color: '#0d0d33' }}>Agency Owner & Real Estate Specialist</p>
                
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
                  className="flex items-center font-medium mb-6 transition-colors hover:opacity-80"
                  style={{ color: '#0d0d33' }}
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
                    style={{ backgroundColor: '#0d0d33' }}
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:amy@4seasonsrealestate.com"
                    className="inline-flex items-center justify-center w-10 h-10 text-white rounded-full hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#0d0d33' }}
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
                <p className="text-lg font-medium mb-4" style={{ color: '#0d0d33' }}>Finance and Property Management Professional</p>
                
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
                  className="flex items-center font-medium mb-6 transition-colors hover:opacity-80"
                  style={{ color: '#0d0d33' }}
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
                    style={{ backgroundColor: '#0d0d33' }}
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:tim@4seasonsrealestate.com"
                    className="inline-flex items-center justify-center w-10 h-10 text-white rounded-full hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#0d0d33' }}
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

      {/* Awards & Recognition */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Awards & Recognition
            </h2>
            <p className="text-xl text-slate-600">
              Our commitment to excellence has been recognized by industry leaders and clients alike.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-slate-50 rounded-lg">
              <Award className="w-12 h-12 mx-auto mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Top Producer Award</h3>
              <p className="text-slate-600">Dallas Board of Realtors - 2023</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-lg">
              <Star className="w-12 h-12 mx-auto mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">5-Star Rating</h3>
              <p className="text-slate-600">Google Reviews & Zillow Premier Agent</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-lg">
              <Users className="w-12 h-12 mx-auto mb-4" style={{ color: '#0d0d33' }} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Community Choice</h3>
              <p className="text-slate-600">Best Real Estate Team - Plano Magazine</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to Work with Our Team?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Let us put our experience and local expertise to work for you. Contact us today 
            to discuss your real estate goals.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#0d0d33' }}
          >
            Get Started Today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { Award, Users, Home, Star, MapPin, Clock } from "lucide-react";

export default function About() {
  const stats = [
    { number: "500+", label: "Homes Sold", icon: Home },
    { number: "15+", label: "Years Experience", icon: Clock },
    { number: "98%", label: "Client Satisfaction", icon: Star },
    { number: "50+", label: "Communities Served", icon: MapPin }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      title: "Principal Broker & Owner",
      experience: "15+ years in North Texas real estate",
      specialties: ["Luxury Homes", "Investment Properties", "First-Time Buyers"],
      bio: "Sarah founded 4Seasons Real Estate with a vision to provide personalized, professional service to every client. Her deep knowledge of North Texas markets and commitment to excellence has made her a trusted advisor to hundreds of families."
    },
    {
      name: "Michael Chen",
      title: "Senior Real Estate Agent",
      experience: "12+ years serving DFW area",
      specialties: ["New Construction", "Relocation Services", "Commercial Properties"],
      bio: "Michael brings extensive experience in both residential and commercial real estate. His analytical approach and attention to detail ensure clients make informed decisions throughout their real estate journey."
    },
    {
      name: "Jennifer Martinez",
      title: "Property Management Director",
      experience: "10+ years in property management",
      specialties: ["Rental Properties", "HOA Management", "Investment Analysis"],
      bio: "Jennifer leads our property management division with a focus on maximizing returns for investors while maintaining excellent tenant relationships. Her proactive approach keeps properties well-maintained and profitable."
    },
    {
      name: "David Thompson",
      title: "Market Research Specialist",
      experience: "8+ years in real estate analytics",
      specialties: ["Market Analysis", "Pricing Strategy", "Investment Consulting"],
      bio: "David provides crucial market insights that help our team price properties competitively and identify emerging opportunities. His research drives our strategic recommendations for both buyers and sellers."
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Client-Centered Service",
      description: "Every decision we make is focused on achieving the best possible outcome for our clients. Your goals become our mission."
    },
    {
      icon: Award,
      title: "Professional Excellence",
      description: "We maintain the highest standards of professional conduct and continuously invest in education and market knowledge."
    },
    {
      icon: Home,
      title: "Community Expertise",
      description: "Our deep roots in North Texas give us unmatched insight into local markets, schools, and neighborhood dynamics."
    },
    {
      icon: Star,
      title: "Proven Results",
      description: "Our track record speaks for itself - successful transactions, satisfied clients, and lasting relationships built on trust."
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

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#0d0d33' }}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              );
            })}
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
              <div className="prose prose-lg text-slate-700 space-y-4">
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
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Choose 4Seasons?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: '#0d0d33' }}></div>
                  <span className="text-slate-700">Deep knowledge of North Texas markets and communities</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: '#0d0d33' }}></div>
                  <span className="text-slate-700">Cutting-edge technology and marketing strategies</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: '#0d0d33' }}></div>
                  <span className="text-slate-700">Full-service approach from initial consultation to closing</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: '#0d0d33' }}></div>
                  <span className="text-slate-700">Proven track record of successful transactions</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: '#0d0d33' }}></div>
                  <span className="text-slate-700">Personalized service tailored to your unique needs</span>
                </li>
              </ul>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#0d0d33' }}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our experienced professionals bring diverse expertise and unwavering 
              commitment to every client relationship.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{member.name}</h3>
                  <p className="text-lg font-medium mb-1" style={{ color: '#0d0d33' }}>{member.title}</p>
                  <p className="text-slate-600 mb-4">{member.experience}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.specialties.map((specialty, idx) => (
                      <span key={idx} className="px-3 py-1 text-sm font-medium text-white rounded-full" style={{ backgroundColor: '#0d0d33' }}>
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">{member.bio}</p>
              </div>
            ))}
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
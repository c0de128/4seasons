import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { Phone, Mail, MapPin, Clock, MessageSquare, Calendar } from "lucide-react";
import { SEO, seoConfig, generateStructuredData } from "@/components/SEO";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

export default function ContactPage() {
  // Fix for Leaflet default icon issues with Webpack
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      primary: "(972) 555-0123",
      secondary: "Available 7 days a week",
      action: "tel:+19725550123"
    },
    {
      icon: Mail,
      title: "Email Us",
      primary: "info@4seasonsrealestate.com",
      secondary: "We respond within 2 hours",
      action: "mailto:info@4seasonsrealestate.com"
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      primary: "123 Main Street, Allen, TX 75013",
      secondary: "Monday - Saturday: 9AM - 6PM",
      action: "https://maps.google.com"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "By Appointment Only" }
  ];

  const serviceAreas = [
    "Allen", "Plano", "Frisco", "McKinney", "Prosper", "Celina",
    "Wylie", "Richardson", "Garland", "Carrollton", "Addison",
    "Highland Park", "University Park", "Dallas", "Irving", "Coppell"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEO 
        title="Contact 4Seasons Real Estate - Dallas-Fort Worth Real Estate Experts"
        description="Contact our experienced real estate team in Allen, Texas. Serving Dallas-Fort Worth metroplex with expert home buying, selling, and property management services."
        keywords="contact real estate agent Dallas, Allen TX real estate office, DFW property experts contact, real estate consultation Texas, home buying help Dallas"
        canonicalUrl={`${seoConfig.siteUrl}/contact`}
        ogTitle="Contact 4Seasons Real Estate - Your DFW Real Estate Experts"
        ogDescription="Ready to start your real estate journey? Our experienced team is here to help with buying, selling, or managing your property in North Texas."
        ogImage={`${seoConfig.siteUrl}/images/contact-4seasons-team.jpg`}
        structuredData={generateStructuredData.localBusiness()}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Ready to start your real estate journey? Our experienced team is here to help 
              with buying, selling, or managing your property in North Texas.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className="text-center p-8 bg-slate-50 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: '#0d0d33' }}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{method.title}</h3>
                  <p className="text-lg font-medium mb-2" style={{ color: '#0d0d33' }}>{method.primary}</p>
                  <p className="text-slate-600 mb-4">{method.secondary}</p>
                  <a
                    href={method.action}
                    className="inline-flex items-center px-6 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#0d0d33' }}
                  >
                    Contact Now
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-xl text-slate-600">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>
          
          {/* Use the existing Contact component */}
          <Contact />
        </div>
      </section>

      {/* Office Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Office Hours */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3" style={{ color: '#0d0d33' }} />
                Office Hours
              </h2>
              <div className="bg-slate-50 rounded-lg p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-slate-200 last:border-0">
                      <span className="font-medium text-slate-900">{schedule.day}</span>
                      <span className="text-slate-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-slate-700">
                    <strong>Emergency Contact:</strong> For urgent matters outside office hours, 
                    call (972) 555-0199 and leave a detailed message. We'll respond as soon as possible.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Areas */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3" style={{ color: '#0d0d33' }} />
                Service Areas
              </h2>
              <div className="bg-slate-50 rounded-lg p-6 flex-1 flex flex-col">
                <p className="text-slate-700 mb-4">
                  We proudly serve the following North Texas communities:
                </p>
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {serviceAreas.map((area, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#0d0d33' }}></div>
                      <span className="text-slate-700">{area}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-slate-700">
                    Don't see your city listed? Contact us anyway! We work throughout the 
                    Dallas-Fort Worth metroplex and can likely assist with your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How Can We Help Today?
            </h2>
            <p className="text-xl text-slate-600">
              Choose the service that best fits your needs, or contact us to discuss your specific situation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: '#0d0d33' }}>
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Buying a Home</h3>
              <p className="text-slate-600 mb-6">
                Ready to find your dream home? Let's discuss your needs and start your search.
              </p>
              <a
                href="/buy"
                className="inline-flex items-center px-6 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#0d0d33' }}
              >
                Start Home Search
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: '#0d0d33' }}>
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Selling Your Home</h3>
              <p className="text-slate-600 mb-6">
                Get a free market analysis and learn how we can maximize your home's value.
              </p>
              <a
                href="/sell"
                className="inline-flex items-center px-6 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#0d0d33' }}
              >
                Get Market Analysis
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: '#0d0d33' }}>
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Property Management</h3>
              <p className="text-slate-600 mb-6">
                Let us handle your rental property while you enjoy the returns.
              </p>
              <a
                href="/property-management"
                className="inline-flex items-center px-6 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#0d0d33' }}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-slate-600">
              Located in the heart of Allen, we're easily accessible from anywhere in North Texas.
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            <MapContainer 
              center={[33.1031, -96.6706]} // Allen, TX coordinates
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[33.1031, -96.6706]}>
                <Popup>
                  <div className="text-center p-2">
                    <h3 className="font-semibold text-slate-900 mb-2">4Seasons Real Estate</h3>
                    <p className="text-slate-600 mb-2">123 Main Street<br />Allen, TX 75013</p>
                    <p className="text-sm text-slate-500 mb-3">Phone: (972) 555-0123</p>
                    <a
                      href="https://maps.google.com/?q=33.1031,-96.6706"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 text-xs font-medium text-white rounded hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#0d0d33' }}
                    >
                      Get Directions
                    </a>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">
              Can't find us? Call (972) 555-0123 for detailed directions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://maps.google.com/?q=33.1031,-96.6706"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#0d0d33' }}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Google Maps
              </a>
              <a
                href="https://maps.apple.com/?q=33.1031,-96.6706"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Apple Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
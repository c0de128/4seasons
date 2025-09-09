import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Twitter, Instagram, Linkedin, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          propertyInterest: formData.subject
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(result.message);
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.error || 'Failed to submit form');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Half - Contact Us Content */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Contact Us
              </h2>
              <p className="text-xl text-slate-600">
                4Seasons Real Estate is here to help you with all your real estate needs. Reach out to us through any of the channels below or fill out the contact form.
              </p>
            </div>
            
            <div className="space-y-8">
              {/* Office Locations */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Office Locations</h3>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#0d0d33' }} />
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
                    <Phone className="w-6 h-6 flex-shrink-0" style={{ color: '#0d0d33' }} />
                    <a href="tel:2742743873" className="text-slate-600 hover:text-primary transition-colors">
                      (214) 274-3873
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 flex-shrink-0" style={{ color: '#0d0d33' }} />
                    <a href="mailto:info@4seasonsrealestate.com" className="text-slate-600 hover:text-primary transition-colors">
                      info@4seasonsrealestate.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Clock className="w-6 h-6 flex-shrink-0" style={{ color: '#0d0d33' }} />
                    <span className="text-slate-600">Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</span>
                  </div>
                </div>
              </div>

              {/* Follow Us */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Follow Us</h3>
                <div className="flex space-x-3">
                  <a
                    href="https://www.facebook.com/amysrealty/"
                    target="_blank"
                    rel="noopener noreferrer"
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
                    href="https://www.linkedin.com/in/amy-harwood-28209b179/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 text-white rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: '#1f2937' }}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:info@4seasonsrealestate.com"
                    className="w-8 h-8 text-white rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: '#1f2937' }}
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Half - Send Us a Message Section */}
          <div>
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Send Us a Message
              </h2>
            </div>
            
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                {/* Status Message */}
                {submitStatus !== 'idle' && (
                  <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                    submitStatus === 'success' 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    {submitStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                    <p className={`text-sm ${
                      submitStatus === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {statusMessage}
                    </p>
                  </div>
                )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-slate-700 mb-2">Full Name</Label>
                  <Input 
                    id="fullName" 
                    type="text" 
                    placeholder="Your name" 
                    className="w-full"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email" 
                    className="w-full"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-slate-700 mb-2">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="Your phone" 
                    className="w-full"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-sm font-medium text-slate-700 mb-2">Subject</Label>
                  <Input 
                    id="subject" 
                    type="text" 
                    placeholder="Select a subject" 
                    className="w-full"
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-slate-700 mb-2">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Your message..." 
                    rows={4} 
                    className="w-full"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#0d0d33] text-white py-3 text-lg font-medium hover:!bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Submit Message'}
                </Button>
                
                <p className="text-xs text-slate-500 mt-4">
                  <strong>SMS Opt-in:</strong> By submitting this form, you consent to receive SMS notifications from 4Seasons Real Estate regarding your inquiry. Standard message and data rates may apply. You can opt out at any time by replying STOP. Message frequency varies.
                </p>
              </form>
            </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
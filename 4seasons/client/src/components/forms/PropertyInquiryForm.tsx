import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, AlertCircle, Loader2, Home, Phone, Mail } from "lucide-react";
import { secureFetch } from "@/utils/csrf";

interface PropertyInquiryFormProps {
  propertyId: string;
  propertyAddress: string;
  propertyPrice?: string;
  onSuccess?: () => void;
}

export function PropertyInquiryForm({ 
  propertyId, 
  propertyAddress, 
  propertyPrice,
  onSuccess 
}: PropertyInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    requestType: 'information' as 'viewing' | 'information' | 'offer' | 'callback',
    preferredContact: 'email' as 'email' | 'phone' | 'both',
    honeypot: '' // Hidden field for bot detection
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const requestTypeLabels = {
    viewing: 'Schedule a Viewing',
    information: 'Request More Information',
    offer: 'Make an Offer',
    callback: 'Request a Callback'
  };

  const contactLabels = {
    email: 'Email Only',
    phone: 'Phone Only',
    both: 'Email and Phone'
  };

  useEffect(() => {
    // Pre-fill message based on request type
    const messages = {
      viewing: `Hi, I'm interested in scheduling a viewing for the property at ${propertyAddress}. When would be a good time?`,
      information: `Hi, I'd like more information about the property at ${propertyAddress}. Could you please provide additional details?`,
      offer: `Hi, I'm interested in making an offer on the property at ${propertyAddress}. Please contact me to discuss.`,
      callback: `Hi, I'm interested in the property at ${propertyAddress}. Please call me at your earliest convenience.`
    };

    if (!formData.message) {
      setFormData(prev => ({
        ...prev,
        message: messages[formData.requestType]
      }));
    }
  }, [formData.requestType, propertyAddress]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    // Check for bot (honeypot field should be empty)
    if (formData.honeypot) {
      newErrors.honeypot = 'Bot detection triggered';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await secureFetch('/api/forms/property-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          propertyId,
          propertyAddress
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setStatusMessage(result.message);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          requestType: 'information',
          preferredContact: 'email',
          honeypot: ''
        });
        
        // Call success callback
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setSubmitStatus('error');
        if (result.details && Array.isArray(result.details)) {
          // Handle validation errors
          const validationErrors: Record<string, string> = {};
          result.details.forEach((error: any) => {
            if (error.path) {
              validationErrors[error.path] = error.msg;
            }
          });
          setErrors(validationErrors);
          setStatusMessage('Please correct the errors above and try again.');
        } else {
          setStatusMessage(result.message || 'Failed to submit inquiry. Please try again.');
        }
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Inquire About This Property
        </h2>
        <div className="text-lg text-slate-600 max-w-2xl mx-auto">
          <p className="font-medium">{propertyAddress}</p>
          {propertyPrice && <p>Price: {propertyPrice}</p>}
          <p className="mt-2">Get more information or schedule a viewing for this property. Our experienced agents will respond promptly to your inquiry.</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => handleInputChange('honeypot', e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
              Full Name *
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              className="w-full"
              placeholder="Your full name"
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email Address *
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="w-full"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full"
              placeholder="(214) 555-0123"
            />
            {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="requestType" className="block text-sm font-medium text-slate-700 mb-2">
              What would you like to do?
            </label>
            <select
              id="requestType"
              name="requestType"
              value={formData.requestType}
              onChange={(e) => handleInputChange('requestType', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {Object.entries(requestTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="preferredContact" className="block text-sm font-medium text-slate-700 mb-2">
              Preferred Contact Method
            </label>
            <select
              id="preferredContact"
              name="preferredContact"
              value={formData.preferredContact}
              onChange={(e) => handleInputChange('preferredContact', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {Object.entries(contactLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              required
              className="w-full"
              placeholder="Tell us more about your interest in this property..."
            />
            {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
          </div>

          {submitStatus === 'success' && (
            <div className="md:col-span-2 flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-700">{statusMessage}</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="md:col-span-2 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-700">{statusMessage}</p>
            </div>
          )}

          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0d0d33] text-white hover:bg-blue-700 transition-colors py-3 text-lg font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending Inquiry...
                </>
              ) : (
                <>
                  <Home className="w-5 h-5 mr-2" />
                  Send Property Inquiry
                </>
              )}
            </Button>
            <p className="text-xs text-slate-500 mt-4 text-center">
              By submitting this form, you agree to receive communications from 4Seasons Real Estate 
              regarding this property. We respect your privacy and will not share 
              your information with third parties.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, AlertCircle, Loader2, Calculator, TrendingUp } from "lucide-react";
import { secureFetch } from "@/utils/csrf";

export function HomeValuationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    yearBuilt: '',
    propertyType: '',
    condition: '',
    timeline: '',
    message: '',
    honeypot: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const propertyTypes = {
    'single-family': 'Single Family Home',
    'condo': 'Condominium',
    'townhouse': 'Townhouse',
    'duplex': 'Duplex',
    'land': 'Land/Lot',
    'other': 'Other'
  };

  const conditions = {
    'excellent': 'Excellent (Move-in ready, recently updated)',
    'good': 'Good (Well maintained, minor updates needed)',
    'fair': 'Fair (Some updates needed)',
    'needs-work': 'Needs Work (Major renovations required)'
  };

  const timelines = {
    'immediate': 'Immediately (0-30 days)',
    '3-months': 'Within 3 months',
    '6-months': 'Within 6 months',
    '1-year': 'Within 1 year',
    'just-curious': 'Just curious about value'
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1800 + 2 }, (_, i) => currentYear + 1 - i);

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

    if (!formData.address.trim()) {
      newErrors.address = 'Property address is required';
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Please enter a complete address';
    }

    if (!formData.bedrooms) {
      newErrors.bedrooms = 'Number of bedrooms is required';
    } else if (parseInt(formData.bedrooms) < 1 || parseInt(formData.bedrooms) > 20) {
      newErrors.bedrooms = 'Bedrooms must be between 1 and 20';
    }

    if (!formData.bathrooms) {
      newErrors.bathrooms = 'Number of bathrooms is required';
    } else if (parseFloat(formData.bathrooms) < 0.5 || parseFloat(formData.bathrooms) > 20) {
      newErrors.bathrooms = 'Bathrooms must be between 0.5 and 20';
    }

    if (formData.sqft && (parseInt(formData.sqft) < 100 || parseInt(formData.sqft) > 50000)) {
      newErrors.sqft = 'Square feet must be between 100 and 50,000';
    }

    if (formData.yearBuilt && (parseInt(formData.yearBuilt) < 1800 || parseInt(formData.yearBuilt) > currentYear + 1)) {
      newErrors.yearBuilt = 'Please enter a valid year built';
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Property type is required';
    }

    if (!formData.condition) {
      newErrors.condition = 'Property condition is required';
    }

    if (!formData.timeline) {
      newErrors.timeline = 'Timeline is required';
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
      const response = await secureFetch('/api/forms/home-valuation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
          address: '',
          bedrooms: '',
          bathrooms: '',
          sqft: '',
          yearBuilt: '',
          propertyType: '',
          condition: '',
          timeline: '',
          message: '',
          honeypot: ''
        });
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
          setStatusMessage(result.message || 'Failed to submit valuation request. Please try again.');
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
          Get Your Free Home Valuation
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Get an accurate estimate of your home's current market value. Our experienced agents will provide 
          a detailed analysis based on current market conditions and comparable sales in your area.
        </p>
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
            <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
              Property Address *
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              required
              className="w-full"
              placeholder="123 Main Street, City, State 12345"
            />
            {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
          </div>

          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-slate-700 mb-2">
              Bedrooms *
            </label>
            <select
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={(e) => handleInputChange('bedrooms', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Select bedrooms</option>
              {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Bedroom' : 'Bedrooms'}
                </option>
              ))}
            </select>
            {errors.bedrooms && <p className="text-sm text-red-600 mt-1">{errors.bedrooms}</p>}
          </div>

          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-slate-700 mb-2">
              Bathrooms *
            </label>
            <select
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Select bathrooms</option>
              {['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '7', '8', '9', '10'].map(num => (
                <option key={num} value={num}>
                  {num} {parseFloat(num) === 1 ? 'Bathroom' : 'Bathrooms'}
                </option>
              ))}
            </select>
            {errors.bathrooms && <p className="text-sm text-red-600 mt-1">{errors.bathrooms}</p>}
          </div>

          <div>
            <label htmlFor="sqft" className="block text-sm font-medium text-slate-700 mb-2">
              Square Feet
            </label>
            <Input
              type="number"
              id="sqft"
              name="sqft"
              value={formData.sqft}
              onChange={(e) => handleInputChange('sqft', e.target.value)}
              className="w-full"
              placeholder="e.g., 2000"
            />
            {errors.sqft && <p className="text-sm text-red-600 mt-1">{errors.sqft}</p>}
          </div>

          <div>
            <label htmlFor="yearBuilt" className="block text-sm font-medium text-slate-700 mb-2">
              Year Built
            </label>
            <select
              id="yearBuilt"
              name="yearBuilt"
              value={formData.yearBuilt}
              onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Select year</option>
              {yearOptions.map(year => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
            {errors.yearBuilt && <p className="text-sm text-red-600 mt-1">{errors.yearBuilt}</p>}
          </div>

          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-slate-700 mb-2">
              Property Type *
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={(e) => handleInputChange('propertyType', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Select property type</option>
              {Object.entries(propertyTypes).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.propertyType && <p className="text-sm text-red-600 mt-1">{errors.propertyType}</p>}
          </div>

          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-slate-700 mb-2">
              Property Condition *
            </label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={(e) => handleInputChange('condition', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Select condition</option>
              {Object.entries(conditions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.condition && <p className="text-sm text-red-600 mt-1">{errors.condition}</p>}
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-slate-700 mb-2">
              Timeline to Sell *
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Select timeline</option>
              {Object.entries(timelines).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.timeline && <p className="text-sm text-red-600 mt-1">{errors.timeline}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
              Additional Information
            </label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="w-full"
              placeholder="Tell us more about your property or any specific questions about the valuation..."
            />
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
                  Processing Request...
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5 mr-2" />
                  Get My Free Home Valuation
                </>
              )}
            </Button>
            <p className="text-xs text-slate-500 mt-4 text-center">
              By submitting this form, you agree to receive communications from 4Seasons Real Estate 
              regarding your home valuation. We respect your privacy and will not share 
              your information with third parties.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
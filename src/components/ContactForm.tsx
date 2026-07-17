import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageSquare, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { trackFormSubmission, trackExternalLink } from '@/utils/analytics';

interface FormData {
  name: string;
  email: string;
  phone: string;
  purpose: string;
  message: string;
  honeypot: string; // Anti-spam field
}

interface FormStatus {
  type: 'idle' | 'submitting' | 'success' | 'error';
  message: string;
}

const ContactForm = () => {
  const { t } = useLanguage();
  
  const purposeOptions = [
    {
      value: 'collaboration',
      label: t('contact.purpose.collaboration'),
      hint: t('contact.purposeHint.collaboration')
    },
    {
      value: 'inquiry', 
      label: t('contact.purpose.inquiry'),
      hint: t('contact.purposeHint.inquiry')
    },
    {
      value: 'speaking',
      label: t('contact.purpose.speaking'),
      hint: t('contact.purposeHint.speaking')
    },
    {
      value: 'job',
      label: t('contact.purpose.job'),
      hint: t('contact.purposeHint.job')
    },
    {
      value: 'media',
      label: t('contact.purpose.media'),
      hint: t('contact.purposeHint.media')
    },
    {
      value: 'other',
      label: t('contact.purpose.other'),
      hint: t('contact.purposeHint.other')
    }
  ];
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    message: '',
    honeypot: ''
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Required field validation
    if (!formData.name.trim()) {
      errors.name = t('contact.form.validation.nameRequired');
    }

    if (!formData.email.trim()) {
      errors.email = t('contact.form.validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('contact.form.validation.emailInvalid');
    }

    if (!formData.purpose) {
      errors.purpose = t('contact.form.validation.purposeRequired');
    }

    if (!formData.message.trim()) {
      errors.message = t('contact.form.validation.messageRequired');
    } else if (formData.message.trim().length < 10) {
      errors.message = t('contact.form.validation.messageMinLength');
    }

    // Phone validation (optional but if provided, must be valid)
    if (formData.phone && !/^[+]?[\d\s\-()]{10,}$/.test(formData.phone)) {
      errors.phone = t('contact.form.validation.phoneInvalid');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, it's likely a bot
    if (formData.honeypot) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setFormStatus({ type: 'submitting', message: t('contact.form.sending') });

    try {
      // Using Formspree for the backend
      const response = await fetch('https://formspree.io/f/mzzvokbe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          purpose: formData.purpose,
          message: formData.message,
          _subject: `New ${purposeOptions.find(p => p.value === formData.purpose)?.label} inquiry from ${formData.name}`,
          _replyto: formData.email,
          _gotcha: formData.honeypot // Formspree's honeypot field
        }),
      });

      if (response.ok) {
        setFormStatus({ 
          type: 'success', 
          message: t('contact.form.successMessage')
        });
        
        // Track successful form submission
        trackFormSubmission('contact_form', true);
        
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          purpose: '',
          message: '',
          honeypot: ''
        });
        
        // Focus the status message for screen readers
        setTimeout(() => statusRef.current?.focus(), 100);
        
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: t('contact.form.errorTitle') + '. Please try again or email me directly.'
      });
      
      // Track failed form submission
      trackFormSubmission('contact_form', false);
    }
  };

  const handleRetry = () => {
    setFormStatus({ type: 'idle', message: '' });
  };

  const selectedPurpose = purposeOptions.find(p => p.value === formData.purpose);

  return (
    <section id="contact" className="py-20 bg-gradient-coastal scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-2">
            {t('contact.description')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('contact.replyTime')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-coastal">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="text-primary" size={24} />
                  <span>{t('contact.getInTouch')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="text-accent flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">{t('contact.formLabels.email')}</p>
                    <a 
                      href="mailto:traboulsimohamed@gmail.com" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      traboulsimohamed@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <MapPin className="text-accent flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">{t('contact.location')}</p>
                    <p className="text-muted-foreground">{t('contact.locationDetail')}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="font-medium mb-4">{t('contact.followMe')}</p>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/mtraboulsi689" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => trackExternalLink('https://github.com/mtraboulsi689', 'contact_social')}
                      className="flex items-center justify-center w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label="GitHub Profile"
                    >
                      <Github size={20} className="text-primary" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/mtraboulsi/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => trackExternalLink('https://www.linkedin.com/in/mtraboulsi/', 'contact_social')}
                      className="flex items-center justify-center w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={20} className="text-primary" />
                    </a>
                    <a 
                      href="https://www.researchgate.net/profile/Mohammad-Traboulsi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => trackExternalLink('https://www.researchgate.net/profile/Mohammad-Traboulsi', 'contact_social')}
                      className="flex items-center justify-center w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label="ResearchGate Profile"
                    >
                      <MessageSquare size={20} className="text-primary" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-coastal">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="text-primary" size={24} />
                <span>{t('contact.sendMessage')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Status Message */}
              <div 
                ref={statusRef}
                className="mb-6"
                aria-live="polite"
                aria-atomic="true"
                tabIndex={-1}
              >
                {formStatus.type === 'success' && (
                  <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-green-800 font-medium">{t('contact.form.successTitle')}</p>
                      <p className="text-green-700 text-sm mt-1">{formStatus.message}</p>
                      <p className="text-green-600 text-xs mt-2">
                        {t('contact.form.successNote')}
                      </p>
                    </div>
                  </div>
                )}

                {formStatus.type === 'error' && (
                  <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                    <div className="flex-1">
                      <p className="text-red-800 font-medium">{t('contact.form.errorTitle')}</p>
                      <p className="text-red-700 text-sm mt-1">{formStatus.message}</p>
                      <Button
                        onClick={handleRetry}
                        variant="outline"
                        size="sm"
                        className="mt-3 text-red-700 border-red-300 hover:bg-red-50"
                      >
                        <RefreshCw size={14} className="mr-1" />
                        {t('contact.form.tryAgain')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => handleInputChange('honeypot', e.target.value)}
                  style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Required Fields Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t('contact.formLabels.name')} <span className="text-red-500">{t('contact.formLabels.required')}</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                        validationErrors.name ? 'border-red-500' : ''
                      }`}
                      aria-describedby={validationErrors.name ? "name-error" : undefined}
                    />
                    {validationErrors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t('contact.formLabels.email')} <span className="text-red-500">{t('contact.formLabels.required')}</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                        validationErrors.email ? 'border-red-500' : ''
                      }`}
                      aria-describedby={validationErrors.email ? "email-error" : undefined}
                    />
                    {validationErrors.email && (
                      <p id="email-error" className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    {t('contact.formLabels.phone')}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                      validationErrors.phone ? 'border-red-500' : ''
                    }`}
                    aria-describedby={validationErrors.phone ? "phone-error" : undefined}
                  />
                  {validationErrors.phone && (
                    <p id="phone-error" className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                  )}
                </div>

                {/* Purpose Selector */}
                <div>
                  <label htmlFor="purpose" className="block text-sm font-medium mb-2">
                    {t('contact.formLabels.purpose')} <span className="text-red-500">{t('contact.formLabels.required')}</span>
                  </label>
                  <Select 
                    value={formData.purpose} 
                    onValueChange={(value) => handleInputChange('purpose', value)}
                  >
                    <SelectTrigger 
                      className={`bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                        validationErrors.purpose ? 'border-red-500' : ''
                      }`}
                      aria-describedby={validationErrors.purpose ? "purpose-error" : selectedPurpose ? "purpose-hint" : undefined}
                    >
                      <SelectValue placeholder={t('contact.form.purposePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {purposeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedPurpose && (
                    <p id="purpose-hint" className="text-sm text-muted-foreground mt-2">
                      💡 {selectedPurpose.hint}
                    </p>
                  )}
                  
                  {validationErrors.purpose && (
                    <p id="purpose-error" className="text-red-500 text-sm mt-1">{validationErrors.purpose}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('contact.formLabels.message')} <span className="text-red-500">{t('contact.formLabels.required')}</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none ${
                      validationErrors.message ? 'border-red-500' : ''
                    }`}
                    placeholder={t('contact.form.messagePlaceholder')}
                    aria-describedby={validationErrors.message ? "message-error" : undefined}
                  />
                  {validationErrors.message && (
                    <p id="message-error" className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  disabled={formStatus.type === 'submitting'}
                  className="w-full bg-gradient-ocean hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {formStatus.type === 'submitting' ? (
                    <>
                      <RefreshCw size={16} className="mr-2 animate-spin" />
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      {t('contact.form.sendButton')}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
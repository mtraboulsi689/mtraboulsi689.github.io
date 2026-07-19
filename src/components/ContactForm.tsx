import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, Send, Github, Linkedin, MessageSquare, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { trackFormSubmission, trackExternalLink } from '@/utils/analytics';
import Reveal from '@/components/Reveal';

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
    <section id="contact" className="py-20 md:py-28 bg-abyss scroll-mt-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="mb-12 md:mb-16">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-sm font-bold text-accent-light">08</span>
              <h2 className="font-display font-bold text-headline text-white">{t('contact.title')}</h2>
            </div>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-abyss-foreground/90">
              {t('contact.description')}
            </p>
            <p className="mt-2 text-sm text-abyss-foreground/60">{t('contact.replyTime')}</p>
          </div>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Editorial left: direct contact + documents */}
          <Reveal>
            <div>
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-abyss-foreground/60">
                    {t('contact.formLabels.email')}
                  </p>
                  <a
                    href="mailto:traboulsimohamed@gmail.com"
                    className="inline-flex items-center gap-3 text-lg font-semibold text-white transition-colors hover:text-accent-light"
                  >
                    <Mail className="shrink-0" size={18} />
                    traboulsimohamed@gmail.com
                  </a>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-abyss-foreground/60">
                    {t('contact.location')}
                  </p>
                  <p className="inline-flex items-center gap-3 text-lg font-semibold text-white">
                    <MapPin className="shrink-0" size={18} />
                    {t('contact.locationDetail')}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5">
                <a
                  href="/cv.pdf"
                  download="Mohammad_Traboulsi_CV.pdf"
                  className="rounded-md bg-abyss-card px-4 py-2 text-[13px] font-medium text-abyss-foreground transition-colors hover:text-white"
                >
                  {t('footer.cv')}
                </a>
                <a
                  href="/capabilities.pdf"
                  download="Mohammad_Traboulsi_Capability_Statement.pdf"
                  className="rounded-md bg-abyss-card px-4 py-2 text-[13px] font-medium text-abyss-foreground transition-colors hover:text-white"
                >
                  {t('footer.capabilities')}
                </a>
              </div>

              <div className="mt-10 flex gap-3">
                <a
                  href="https://github.com/mtraboulsi689"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink('https://github.com/mtraboulsi689', 'contact_social')}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-abyss-foreground/70 transition-colors hover:border-accent-light/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-light"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mtraboulsi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink('https://www.linkedin.com/in/mtraboulsi/', 'contact_social')}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-abyss-foreground/70 transition-colors hover:border-accent-light/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-light"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.researchgate.net/profile/Mohammad-Traboulsi"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink('https://www.researchgate.net/profile/Mohammad-Traboulsi', 'contact_social')}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-abyss-foreground/70 transition-colors hover:border-accent-light/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-light"
                  aria-label="ResearchGate Profile"
                >
                  <MessageSquare size={18} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal delay={100}>
            <div className="rounded-xl bg-abyss-card p-6 md:p-8">
              <p className="mb-6 flex items-center gap-2 font-display text-lg font-semibold text-white">
                <Send size={15} className="text-accent-light" />
                {t('contact.sendMessage')}
              </p>
              {/* Status Message */}
              <div 
                ref={statusRef}
                className="mb-6"
                aria-live="polite"
                aria-atomic="true"
                tabIndex={-1}
              >
                {formStatus.type === 'success' && (
                  <div className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 rounded-lg">
                    <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-green-800 dark:text-green-300 font-medium">{t('contact.form.successTitle')}</p>
                      <p className="text-green-700 dark:text-green-400 text-sm mt-1">{formStatus.message}</p>
                      <p className="text-green-600 dark:text-green-500 text-xs mt-2">
                        {t('contact.form.successNote')}
                      </p>
                    </div>
                  </div>
                )}

                {formStatus.type === 'error' && (
                  <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg">
                    <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={20} />
                    <div className="flex-1">
                      <p className="text-red-800 dark:text-red-300 font-medium">{t('contact.form.errorTitle')}</p>
                      <p className="text-red-700 dark:text-red-400 text-sm mt-1">{formStatus.message}</p>
                      <Button
                        onClick={handleRetry}
                        variant="outline"
                        size="sm"
                        className="mt-3 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/60"
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
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-abyss-foreground">
                      {t('contact.formLabels.name')} <span className="text-red-400">{t('contact.formLabels.required')}</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`border-white/15 bg-abyss text-white focus:border-accent-light focus:ring-2 focus:ring-accent-light/20 ${
                        validationErrors.name ? 'border-red-500' : ''
                      }`}
                      aria-describedby={validationErrors.name ? "name-error" : undefined}
                    />
                    {validationErrors.name && (
                      <p id="name-error" className="text-red-400 text-sm mt-1">{validationErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-abyss-foreground">
                      {t('contact.formLabels.email')} <span className="text-red-400">{t('contact.formLabels.required')}</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`border-white/15 bg-abyss text-white focus:border-accent-light focus:ring-2 focus:ring-accent-light/20 ${
                        validationErrors.email ? 'border-red-500' : ''
                      }`}
                      aria-describedby={validationErrors.email ? "email-error" : undefined}
                    />
                    {validationErrors.email && (
                      <p id="email-error" className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-abyss-foreground">
                    {t('contact.formLabels.phone')}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`border-white/15 bg-abyss text-white focus:border-accent-light focus:ring-2 focus:ring-accent-light/20 ${
                      validationErrors.phone ? 'border-red-500' : ''
                    }`}
                    aria-describedby={validationErrors.phone ? "phone-error" : undefined}
                  />
                  {validationErrors.phone && (
                    <p id="phone-error" className="text-red-400 text-sm mt-1">{validationErrors.phone}</p>
                  )}
                </div>

                {/* Purpose Selector */}
                <div>
                  <label htmlFor="purpose" className="block text-sm font-medium mb-2 text-abyss-foreground">
                    {t('contact.formLabels.purpose')} <span className="text-red-400">{t('contact.formLabels.required')}</span>
                  </label>
                  <Select 
                    value={formData.purpose} 
                    onValueChange={(value) => handleInputChange('purpose', value)}
                  >
                    <SelectTrigger 
                      className={`border-white/15 bg-abyss text-white focus:border-accent-light focus:ring-2 focus:ring-accent-light/20 ${
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
                    <p id="purpose-hint" className="text-sm text-abyss-foreground/70 mt-2">
                      💡 {selectedPurpose.hint}
                    </p>
                  )}
                  
                  {validationErrors.purpose && (
                    <p id="purpose-error" className="text-red-400 text-sm mt-1">{validationErrors.purpose}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-abyss-foreground">
                    {t('contact.formLabels.message')} <span className="text-red-400">{t('contact.formLabels.required')}</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`border-white/15 bg-abyss text-white focus:border-accent-light focus:ring-2 focus:ring-accent-light/20 resize-none ${
                      validationErrors.message ? 'border-red-500' : ''
                    }`}
                    placeholder={t('contact.form.messagePlaceholder')}
                    aria-describedby={validationErrors.message ? "message-error" : undefined}
                  />
                  {validationErrors.message && (
                    <p id="message-error" className="text-red-400 text-sm mt-1">{validationErrors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={formStatus.type === 'submitting'}
                  className="w-full bg-accent hover:bg-accent/85 text-accent-foreground font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
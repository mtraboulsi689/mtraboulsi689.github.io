import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simple form validation
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all required fields');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // For now, we'll use a simple mailto link approach
      // In a real implementation, you would integrate with EmailJS or a backend service
      const mailtoLink = `mailto:traboulsimohamed@gmail.com?subject=${encodeURIComponent(formData.subject || 'Contact from Portfolio')}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.location.href = mailtoLink;

      toast({
        title: "Message Prepared",
        description: "Your email client should open with the message ready to send.",
        duration: 5000,
      });

      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Get In Touch
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Interested in collaboration, research opportunities, or discussing coastal engineering projects? 
            I'd love to hear from you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-ocean">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <a 
                    href="mailto:traboulsimohamed@gmail.com"
                    className="flex items-center space-x-4 text-white/90 hover:text-accent-light transition-colors group"
                  >
                    <Mail className="group-hover:scale-110 transition-transform" size={24} />
                    <span>traboulsimohamed@gmail.com</span>
                  </a>
                  
                  <div className="flex items-center space-x-4 text-white/90">
                    <MapPin size={24} />
                    <span>France</span>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <h4 className="font-semibold text-white mb-4">Research Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Coastal Engineering', 'Fluid Mechanics', 'Climate Change', 'Numerical Modeling', 'Data Analysis'].map((area, index) => (
                      <span 
                        key={index}
                        className="bg-white/20 text-white/90 px-3 py-1 rounded-full text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <h4 className="font-semibold text-white mb-4">Available For</h4>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-400" />
                      <span>Research Collaborations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-400" />
                      <span>Technical Consulting</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-400" />
                      <span>Conference Speaking</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-400" />
                      <span>Academic Partnerships</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-ocean">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white/90">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-2 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white/90">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-white/90">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="mt-2 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white/90">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-2 bg-white/20 border-white/30 text-white placeholder:text-white/60 min-h-[120px]"
                      placeholder="Tell me about your project, collaboration idea, or question..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent-light text-accent-foreground font-semibold py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Preparing Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-white/60 text-center">
                    Your message will open in your default email client
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
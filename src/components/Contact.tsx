
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, ExternalLink, Award } from 'lucide-react';

const Contact = () => {
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
          <div className="grid md:grid-cols-2 gap-8 mb-12">
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
                  <h4 className="font-semibold text-white mb-4">Professional Links</h4>
                  <div className="space-y-3">
                    <Button 
                      variant="secondary" 
                      className="w-full justify-start bg-white/95 text-primary hover:bg-white hover:shadow-ocean transition-all duration-300"
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        LinkedIn Profile
                      </a>
                    </Button>
                    
                    <Button 
                      variant="secondary" 
                      className="w-full justify-start bg-white/95 text-primary hover:bg-white hover:shadow-ocean transition-all duration-300"
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        Portfolio
                      </a>
                    </Button>
                    
                    <Button 
                      variant="secondary" 
                      className="w-full justify-start bg-white/95 text-primary hover:bg-white hover:shadow-ocean transition-all duration-300"
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        StackOverflow
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability & Certifications */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-ocean">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">Availability & Credentials</h3>
                
                <div className="space-y-6">
                  <div className="p-4 bg-accent/20 rounded-lg border border-accent/30">
                    <h4 className="font-semibold text-accent-light mb-2">Current Status</h4>
                    <p className="text-white/90 text-sm">
                      Available for research collaborations, consulting projects, and full-time opportunities 
                      in coastal engineering and environmental fluid mechanics.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Award className="text-accent-light mt-1" size={20} />
                      <div>
                        <h4 className="font-medium text-white">CRNA Grant Scholarship</h4>
                        <p className="text-white/70 text-sm">Research funding recipient</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Award className="text-accent-light mt-1" size={20} />
                      <div>
                        <h4 className="font-medium text-white">Data Analysis & ML Bootcamp</h4>
                        <p className="text-white/70 text-sm">Udacity Certificate (2020)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <h4 className="font-semibold text-white mb-4">Areas of Interest</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Coastal Modeling',
                      'Climate Change',
                      'Sediment Transport',
                      'Machine Learning',
                      'Renewable Energy',
                      'Environmental Impact'
                    ].map((interest, index) => (
                      <span 
                        key={index}
                        className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-white/90 mb-6">
              Ready to discuss your next coastal engineering project or research collaboration?
            </p>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent-light text-accent-foreground font-semibold px-8 py-4 text-lg shadow-ocean"
              asChild
            >
              <a href="mailto:traboulsimohamed@gmail.com">
                Start a Conversation
                <Mail className="ml-2" size={20} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

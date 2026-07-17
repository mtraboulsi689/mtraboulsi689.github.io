
import { ArrowDown, Download, ExternalLink, Mail, Github, Linkedin, FileText, GraduationCap, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';

const Hero = () => {
  const { t } = useLanguage();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-white/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-white/8 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white stagger-fade-up">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight hover-scale">
              Mohammad
              <br />
              <span className="text-accent-light">Traboulsi</span>
            </h1>
          </div>
          
          <div>
            <p className="text-xl md:text-2xl mb-4 text-white/90 font-light">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg md:text-xl mb-6 text-white/80">
              {t('hero.specialization')}
            </p>
            
            {/* Watch Research Video Button */}
            <div className="mb-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection('spotlight')}
                className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 px-4 py-2"
              >
                <Play size={16} className="mr-2" />
                {t('hero.watchVideo')}
              </Button>
            </div>
          </div>

          {/* Social Icons */}
          <div className="animate-fade-up flex justify-center items-center space-x-6 mb-10" style={{animationDelay: '0.3s'}}>
            <a 
              href="mailto:traboulsimohamed@gmail.com" 
              className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300"
              title="Email"
            >
              <Mail size={20} />
            </a>
            <a 
              href="https://scholar.google.com/citations?user=2sx0LHgAAAAJ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300"
              title="Google Scholar"
            >
              <GraduationCap size={20} />
            </a>
            <a 
              href="https://github.com/mtraboulsi689" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300"
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/mtraboulsi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://www.researchgate.net/profile/Mohammad-Traboulsi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300"
              title="ResearchGate"
            >
              <ExternalLink size={20} />
            </a>
            <a
              href="/cv.pdf"
              download="Mohammad_Traboulsi_CV.pdf"
              className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300"
              title="Download CV"
            >
              <FileText size={20} />
            </a>
          </div>

          <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center mb-12" style={{animationDelay: '0.4s'}}>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent-light text-accent-foreground font-semibold px-8 py-4 text-lg shadow-ocean"
              onClick={() => scrollToSection('contact')}
            >
              {t('hero.getInTouch')}
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white/95 text-primary hover:bg-white hover:shadow-ocean transition-all duration-300 px-8 py-4 text-lg font-semibold"
              onClick={() => scrollToSection('experience')}
            >
              {t('hero.viewWork')}
              <ExternalLink className="ml-2" size={20} />
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToSection('skills')}
          className="text-white/70 hover:text-white transition-colors"
        >
          <ArrowDown size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;

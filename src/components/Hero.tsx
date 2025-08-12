
import { ArrowDown, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
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
        <div className="text-center text-white">
          <div className="animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Mohammad
              <br />
              <span className="text-accent-light">Traboulsi</span>
            </h1>
          </div>
          
          <div className="animate-fade-up" style={{animationDelay: '0.2s'}}>
            <p className="text-xl md:text-2xl mb-4 text-white/90 font-light">
              Coastal and Civil Engineer
            </p>
            <p className="text-lg md:text-xl mb-8 text-white/80">
              Specialized in Fluid Mechanics & Numerical Modeling
            </p>
          </div>

          <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center mb-12" style={{animationDelay: '0.4s'}}>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent-light text-accent-foreground font-semibold px-8 py-4 text-lg shadow-ocean"
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
              onClick={() => scrollToSection('experience')}
            >
              View Work
              <ExternalLink className="ml-2" size={20} />
            </Button>
          </div>

          <div className="animate-fade-up flex flex-wrap justify-center gap-4 text-sm text-white/70" style={{animationDelay: '0.6s'}}>
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">OpenFOAM</span>
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">Telemac</span>
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">Python</span>
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">Data Analysis</span>
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">Machine Learning</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToSection('about')}
          className="text-white/70 hover:text-white transition-colors"
        >
          <ArrowDown size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;

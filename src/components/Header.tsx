
import { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, MapPin, ExternalLink, Github, Linkedin, FileText, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-coastal' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-col">
            <div className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-gradient-ocean' : 'text-white'
            }`}>
              Mohammad Traboulsi
            </div>
            <div className="flex items-center space-x-3 mt-1">
              <a 
                href="mailto:traboulsimohamed@gmail.com" 
                className={`transition-colors hover:scale-110 transform ${
                  isScrolled ? 'text-muted-foreground hover:text-accent' : 'text-white/80 hover:text-accent-light'
                }`}
                title="Email"
              >
                <Mail size={16} />
              </a>
              <a 
                href="https://scholar.google.com/citations?user=2sx0LHgAAAAJ" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors hover:scale-110 transform ${
                  isScrolled ? 'text-muted-foreground hover:text-accent' : 'text-white/80 hover:text-accent-light'
                }`}
                title="Google Scholar"
              >
                <GraduationCap size={16} />
              </a>
              <a 
                href="https://github.com/user689" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors hover:scale-110 transform ${
                  isScrolled ? 'text-muted-foreground hover:text-accent' : 'text-white/80 hover:text-accent-light'
                }`}
                title="GitHub"
              >
                <Github size={16} />
              </a>
              <a 
                href="https://www.linkedin.com/in/mtraboulsi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors hover:scale-110 transform ${
                  isScrolled ? 'text-muted-foreground hover:text-accent' : 'text-white/80 hover:text-accent-light'
                }`}
                title="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="https://www.researchgate.net/profile/Mohammad-Traboulsi" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors hover:scale-110 transform ${
                  isScrolled ? 'text-muted-foreground hover:text-accent' : 'text-white/80 hover:text-accent-light'
                }`}
                title="ResearchGate"
              >
                <ExternalLink size={16} />
              </a>
              <a 
                href="/CV_2025.pdf" 
                download="Mohammad_Traboulsi_CV_2025.pdf"
                className={`transition-colors hover:scale-110 transform ${
                  isScrolled ? 'text-muted-foreground hover:text-accent' : 'text-white/80 hover:text-accent-light'
                }`}
                title="Download CV"
              >
                <FileText size={16} />
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className={`transition-colors font-medium ${
                isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className={`transition-colors font-medium ${
                isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('education')}
              className={`transition-colors font-medium ${
                isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              Education
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className={`transition-colors font-medium ${
                isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`transition-colors font-medium ${
                isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Contact Icons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="mailto:traboulsimohamed@gmail.com" className={`transition-colors ${
              isScrolled ? 'text-muted-foreground hover:text-accent' : 'text-white/80 hover:text-accent-light'
            }`}>
              <Mail size={20} />
            </a>
            <a href="tel:+33772435745" className={`transition-colors ${
              isScrolled ? 'text-muted-foreground hover:text-accent' : 'text-white/80 hover:text-accent-light'
            }`}>
              <Phone size={20} />
            </a>
            <span className={`flex items-center ${
              isScrolled ? 'text-muted-foreground' : 'text-white/70'
            }`}>
              <MapPin size={16} className="mr-1" />
              Orléans, France
            </span>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <nav className="flex flex-col space-y-4 p-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection('education')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Education
              </button>
              <button 
                onClick={() => scrollToSection('experience')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Experience
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <a href="mailto:traboulsimohamed@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
                  <Mail size={20} />
                </a>
                <a href="tel:+33772435745" className="text-muted-foreground hover:text-accent transition-colors">
                  <Phone size={20} />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

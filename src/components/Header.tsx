
import { useState, useEffect } from 'react';
import { Menu, X, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/components/language-provider';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('skills')}
              className={`transition-colors font-medium ${
                isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              {t('nav.skills')}
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className={`transition-colors font-medium ${
                isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              {t('nav.projects')}
            </button>
            <button 
              onClick={() => scrollToSection('publications')}
              className={`transition-colors font-medium ${
                isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              {t('nav.publications')}
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className={`transition-colors font-medium ${
                isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              {t('nav.experience')}
            </button>
            <button 
              onClick={() => scrollToSection('education')}
              className={`transition-colors font-medium ${
                isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              {t('nav.education')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`transition-colors font-medium ${
                isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              {t('nav.contact')}
            </button>
          </nav>

          {/* Contact Icons & Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageToggle />
            <ThemeToggle />
            <span className={`flex items-center ${
              isScrolled ? 'text-muted-foreground' : 'text-white/70'
            }`}>
              <MapPin size={16} className="mr-1" />
              {t('common.france')}
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
                onClick={() => scrollToSection('skills')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                {t('nav.skills')}
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                {t('nav.projects')}
              </button>
              <button 
                onClick={() => scrollToSection('publications')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                {t('nav.publications')}
              </button>
              <button 
                onClick={() => scrollToSection('experience')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                {t('nav.experience')}
              </button>
              <button 
                onClick={() => scrollToSection('education')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                {t('nav.education')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                {t('nav.contact')}
              </button>
              <div className="flex justify-end space-x-2 pt-4 border-t border-border">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

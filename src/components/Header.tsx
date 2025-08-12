
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
              onClick={() => scrollToSection('presentations')}
              className={`transition-colors font-medium ${
                isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              Presentations
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
            className="md:hidden relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-5 h-5">
              <Menu 
                size={20} 
                className={`absolute transition-all duration-300 transform ${
                  isMenuOpen ? 'rotate-45 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'
                }`} 
              />
              <X 
                size={20} 
                className={`absolute transition-all duration-300 transform ${
                  isMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-45 opacity-0 scale-0'
                }`} 
              />
            </div>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-background/95 backdrop-blur-md border-t border-border">
            <nav className="flex flex-col space-y-1 p-4">
              {[
                { key: 'skills', label: t('nav.skills') },
                { key: 'projects', label: t('nav.projects') },
                { key: 'publications', label: t('nav.publications') },
                { key: 'presentations', label: 'Presentations' },
                { key: 'experience', label: t('nav.experience') },
                { key: 'education', label: t('nav.education') },
                { key: 'contact', label: t('nav.contact') }
              ].map((item, index) => (
                <button 
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`text-left text-muted-foreground hover:text-primary transition-all duration-300 py-2 px-3 rounded-md hover:bg-muted/50 transform ${
                    isMenuOpen 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-4 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                  }}
                >
                  {item.label}
                </button>
              ))}
              <div className={`flex justify-end space-x-2 pt-4 border-t border-border transform transition-all duration-300 ${
                isMenuOpen 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-4 opacity-0'
              }`}
              style={{
                transitionDelay: isMenuOpen ? '300ms' : '0ms'
              }}>
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

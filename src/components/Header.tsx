import { useState, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/components/language-provider';
import { useScrollspy } from '@/hooks/use-scrollspy';

const NAV_IDS = ['services', 'experience', 'publications', 'projects', 'about'];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const activeId = useScrollspy(NAV_IDS);

  const navItems = useMemo(
    () => [
      { id: 'services', label: t('nav.services') },
      { id: 'experience', label: t('nav.experience') },
      { id: 'publications', label: t('nav.publications') },
      { id: 'projects', label: t('nav.projects') },
      { id: 'about', label: t('nav.about') },
    ],
    [t],
  );

  const mobileItems = useMemo(
    () => [
      ...navItems,
      { id: 'education', label: t('nav.education') },
      { id: 'contact', label: t('nav.contact') },
    ],
    [navItems, t],
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <button
            onClick={scrollToTop}
            className="font-display font-bold text-xl tracking-tight text-foreground"
            aria-label="Scroll to top"
          >
            MT<span className="text-accent">.</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium transition-colors py-1 ${
                  activeId === item.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-px w-full bg-accent transition-transform origin-left duration-300 ${
                    activeId === item.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button
              size="sm"
              onClick={() => scrollToSection('contact')}
              className="ml-2 bg-primary hover:bg-primary-light text-primary-foreground font-semibold"
            >
              {t('hero.getInTouch')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
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
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-background/95 backdrop-blur-md border border-border rounded-lg mb-3">
            <nav className="flex flex-col p-3">
              {mobileItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-muted-foreground hover:text-foreground transition-all duration-300 py-2 px-3 rounded-md hover:bg-muted/50 transform ${
                    isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: isMenuOpen ? `${index * 40}ms` : '0ms' }}
                >
                  {item.label}
                </button>
              ))}
              <div
                className={`flex items-center justify-between pt-3 mt-1 border-t border-border transform transition-all duration-300 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: isMenuOpen ? '300ms' : '0ms' }}
              >
                <Button
                  size="sm"
                  onClick={() => scrollToSection('contact')}
                  className="bg-primary hover:bg-primary-light text-primary-foreground font-semibold"
                >
                  {t('hero.getInTouch')}
                </Button>
                <div className="flex gap-1">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

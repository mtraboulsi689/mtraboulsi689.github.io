import { Github, Linkedin, Mail, GraduationCap, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

const Footer = () => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'services', label: t('nav.services') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'publications', label: t('nav.publications') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'about', label: t('nav.about') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-abyss-deep text-abyss-foreground">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display font-bold text-xl text-white">
              MT<span className="text-accent-light">.</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-abyss-foreground/60">
              {t('footer.description')}
            </p>
            <div className="mt-5 flex gap-4">
              <a
                href="mailto:traboulsimohamed@gmail.com"
                className="text-abyss-foreground/50 transition-colors hover:text-abyss-foreground"
                title="Email"
              >
                <Mail size={17} />
              </a>
              <a
                href="https://scholar.google.com/citations?user=2sx0LHgAAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-abyss-foreground/50 transition-colors hover:text-abyss-foreground"
                title="Google Scholar"
              >
                <GraduationCap size={17} />
              </a>
              <a
                href="https://github.com/mtraboulsi689"
                target="_blank"
                rel="noopener noreferrer"
                className="text-abyss-foreground/50 transition-colors hover:text-abyss-foreground"
                title="GitHub"
              >
                <Github size={17} />
              </a>
              <a
                href="https://www.linkedin.com/in/mtraboulsi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-abyss-foreground/50 transition-colors hover:text-abyss-foreground"
                title="LinkedIn"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="https://www.researchgate.net/profile/Mohammad-Traboulsi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-abyss-foreground/50 transition-colors hover:text-abyss-foreground"
                title="ResearchGate"
              >
                <ExternalLink size={17} />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-abyss-foreground/40 mb-4">{t('footer.navigate')}</p>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm text-abyss-foreground/60 transition-colors hover:text-abyss-foreground"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-abyss-foreground/40 mb-4">{t('footer.documents')}</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="/cv.pdf"
                  download="Mohammad_Traboulsi_CV.pdf"
                  className="text-sm text-abyss-foreground/60 transition-colors hover:text-abyss-foreground"
                >
                  {t('footer.cv')}
                </a>
              </li>
              <li>
                <a
                  href="/capabilities.pdf"
                  download="Mohammad_Traboulsi_Capability_Statement.pdf"
                  className="text-sm text-abyss-foreground/60 transition-colors hover:text-abyss-foreground"
                >
                  {t('footer.capabilities')}
                </a>
              </li>
              <li>
                <a
                  href="https://hal.science/tel-05720855v1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-abyss-foreground/60 transition-colors hover:text-abyss-foreground"
                >
                  {t('about.thesisLink')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-abyss-foreground/10 py-5 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-abyss-foreground/40">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p className="font-mono text-[11px] text-abyss-foreground/40">
            {t('footer.autoUpdated')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

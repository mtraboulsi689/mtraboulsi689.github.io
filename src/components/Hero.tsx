import { ArrowDown, ArrowRight, ExternalLink, Mail, Github, Linkedin, FileText, ClipboardList, GraduationCap, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import ContourLines from '@/components/ContourLines';

const socialLinks = [
  { href: 'mailto:traboulsimohamed@gmail.com', title: 'Email', Icon: Mail },
  { href: 'https://scholar.google.com/citations?user=2sx0LHgAAAAJ', title: 'Google Scholar', Icon: GraduationCap, external: true },
  { href: 'https://github.com/mtraboulsi689', title: 'GitHub', Icon: Github, external: true },
  { href: 'https://www.linkedin.com/in/mtraboulsi/', title: 'LinkedIn', Icon: Linkedin, external: true },
  { href: 'https://www.researchgate.net/profile/Mohammad-Traboulsi', title: 'ResearchGate', Icon: ExternalLink, external: true },
];

const Hero = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    t('hero.stats.modelled'),
    t('hero.stats.horizon'),
    t('hero.stats.scenarios'),
    t('hero.stats.published'),
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden gradient-hero text-white">
      {/* Bathymetric contour field, drifting slowly behind the content */}
      <div className="absolute inset-0 text-white/90 pointer-events-none" aria-hidden="true">
        <ContourLines className="absolute -right-[15%] top-0 h-full w-[85%] animate-drift" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex-1 flex items-center pt-24 pb-12">
        <div className="max-w-3xl">
          <p className="font-mono text-sm text-white/60 mb-6 animate-fade-up">
            {t('hero.subtitle')}
          </p>

          <h1 className="font-display font-semibold text-display mb-8 animate-fade-up" style={{ animationDelay: '0.08s' }}>
            Mohammad
            <br />
            Traboulsi
            <span className="text-accent">.</span>
            <span className="ml-4 align-middle font-sans text-xl md:text-2xl font-normal text-white/50">PhD</span>
          </h1>

          <p className="text-lg md:text-2xl leading-relaxed text-white/85 max-w-2xl mb-4 animate-fade-up" style={{ animationDelay: '0.16s' }}>
            {t('hero.specialization')}
          </p>

          <p className="font-mono text-xs md:text-sm text-white/50 mb-10 animate-fade-up" style={{ animationDelay: '0.22s' }}>
            {t('hero.credentials')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent-light text-accent-foreground font-semibold px-8 text-base"
              onClick={() => scrollToSection('contact')}
            >
              {t('hero.getInTouch')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white px-8 text-base"
              onClick={() => scrollToSection('experience')}
            >
              {t('hero.viewWork')}
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/10 px-4 text-sm"
              onClick={() => scrollToSection('spotlight')}
            >
              <Play size={16} className="mr-2" />
              {t('hero.watchVideo')}
            </Button>
          </div>

          <div className="flex items-center gap-5 animate-fade-up" style={{ animationDelay: '0.38s' }}>
            {socialLinks.map(({ href, title, Icon, external }) => (
              <a
                key={title}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-white/50 hover:text-white transition-colors duration-300"
                title={title}
              >
                <Icon size={19} />
              </a>
            ))}
            <span className="h-4 w-px bg-white/20" />
            <a
              href="/cv.pdf"
              download="Mohammad_Traboulsi_CV.pdf"
              className="text-white/50 hover:text-white transition-colors duration-300"
              title="Download CV"
            >
              <FileText size={19} />
            </a>
            <a
              href="/capabilities.pdf"
              download="Mohammad_Traboulsi_Capability_Statement.pdf"
              className="text-white/50 hover:text-white transition-colors duration-300"
              title="Download Capability Statement"
            >
              <ClipboardList size={19} />
            </a>
          </div>
        </div>
      </div>

      {/* Mono data strip: real numbers from the work */}
      <div className="relative z-10 border-t border-white/15">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center gap-x-8 gap-y-2">
          {stats.map((stat) => (
            <span key={stat} className="font-mono text-[11px] md:text-xs uppercase tracking-wider text-white/55">
              {stat}
            </span>
          ))}
          <button
            onClick={() => scrollToSection('services')}
            className="ml-auto font-mono text-xs text-white/55 hover:text-white transition-colors inline-flex items-center gap-2"
            aria-label="Scroll to first section"
          >
            <ArrowDown size={14} className="animate-bounce" />
            01
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

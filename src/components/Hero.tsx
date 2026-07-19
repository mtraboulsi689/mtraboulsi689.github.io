import { ArrowRight, Play } from 'lucide-react';
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

  const stats = [
    { value: '5 km', label: t('hero.stats.modelledLabel') },
    { value: '2100', label: t('hero.stats.horizonLabel') },
    { value: '3', label: t('hero.stats.scenariosLabel') },
  ];

  return (
    <section className="relative overflow-hidden gradient-hero text-white">
      <div className="container mx-auto px-4 relative z-10 pt-40 pb-20 md:pt-44">
        <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-accent-light/50 px-4 py-1.5 text-[13px] font-semibold tracking-wide text-gold animate-fade-up">
          {t('hero.subtitle')}
        </div>

        <h1 className="font-display font-bold text-display max-w-4xl mb-7 animate-fade-up" style={{ animationDelay: '0.08s' }}>
          Mohammad
          <br />
          Traboulsi
          <span className="text-accent-light">.PhD</span>
        </h1>

        <p className="text-lg md:text-[19px] leading-relaxed text-abyss-foreground max-w-2xl mb-4 animate-fade-up" style={{ animationDelay: '0.16s' }}>
          {t('hero.specialization')}
        </p>

        <p className="text-sm text-abyss-foreground/70 mb-10 animate-fade-up" style={{ animationDelay: '0.22s' }}>
          {t('hero.credentials')}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/85 text-accent-foreground font-semibold px-7 text-[15px]"
            onClick={() => scrollToSection('contact')}
          >
            {t('hero.getInTouch')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white px-7 text-[15px] font-semibold"
            onClick={() => scrollToSection('services')}
          >
            {t('hero.viewWork')}
            <ArrowRight className="ml-2" size={18} />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="text-gold hover:text-gold hover:bg-white/10 px-4 text-sm font-semibold justify-start sm:justify-center"
            onClick={() => scrollToSection('spotlight')}
          >
            <Play size={15} className="mr-2" fill="currentColor" />
            {t('hero.watchVideo')}
          </Button>
        </div>

        {/* Stat strip: real numbers from the work + latest publication */}
        <div className="flex flex-wrap items-end gap-x-14 gap-y-6 border-t border-white/15 pt-8 animate-fade-up" style={{ animationDelay: '0.38s' }}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 text-[13px] text-abyss-foreground/70">{stat.label}</div>
            </div>
          ))}
          <div>
            <div className="font-display text-lg font-semibold text-gold">{t('hero.stats.published')}</div>
            <div className="mt-1 text-[13px] text-abyss-foreground/70">{t('hero.stats.publishedLabel')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

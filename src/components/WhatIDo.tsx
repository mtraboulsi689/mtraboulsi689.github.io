import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

const WhatIDo = () => {
  const { t } = useLanguage();

  const services = [
    {
      index: '01',
      title: t('whatIDo.studies.title'),
      description: t('whatIDo.studies.description'),
    },
    {
      index: '02',
      title: t('whatIDo.modelDev.title'),
      description: t('whatIDo.modelDev.description'),
    },
    {
      index: '03',
      title: t('whatIDo.review.title'),
      description: t('whatIDo.review.description'),
    },
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="services" index="01" title={t('whatIDo.title')} lede={t('whatIDo.description')}>
      <div className="border-t border-border">
        {services.map((service, i) => (
          <Reveal key={service.index} delay={i * 80}>
            <button
              onClick={scrollToContact}
              className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-x-5 md:gap-x-10 border-b border-border py-7 md:py-9 text-left transition-colors hover:bg-sunken"
            >
              <span className="font-mono text-sm text-accent">{service.index}</span>
              <span>
                <span className="block font-display text-xl md:text-2xl font-medium text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </span>
                <span className="mt-2 block max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </span>
              </span>
              <ArrowRight
                size={20}
                className="self-center text-muted-foreground transition-all duration-300 group-hover:text-accent group-hover:translate-x-1"
              />
            </button>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default WhatIDo;

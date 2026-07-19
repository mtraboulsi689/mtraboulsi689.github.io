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

  return (
    <Section id="services" index="01" title={t('whatIDo.title')} lede={t('whatIDo.description')}>
      <div className="grid gap-7 md:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.index} delay={i * 80}>
            <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-8 hover-raise">
              <span
                aria-hidden="true"
                className="font-display text-4xl font-bold text-transparent [-webkit-text-stroke:1px_hsl(var(--accent))]"
              >
                {service.index}
              </span>
              <h3 className="font-display text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{service.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default WhatIDo;

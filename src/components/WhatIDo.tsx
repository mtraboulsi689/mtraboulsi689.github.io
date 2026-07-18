import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Cpu, ClipboardCheck } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

const WhatIDo = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Waves,
      title: t('whatIDo.studies.title'),
      description: t('whatIDo.studies.description'),
    },
    {
      icon: Cpu,
      title: t('whatIDo.modelDev.title'),
      description: t('whatIDo.modelDev.description'),
    },
    {
      icon: ClipboardCheck,
      title: t('whatIDo.review.title'),
      description: t('whatIDo.review.description'),
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            {t('whatIDo.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('whatIDo.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card key={service.title} className="h-full shadow-coastal hover:shadow-ocean transition-all duration-300">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                  <service.icon size={24} />
                </div>
                <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;

import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Award, Languages, Building2, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-gradient-coastal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            {t('about.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-[minmax(0,280px)_1fr] gap-12 items-start max-w-4xl mx-auto">
          <div className="flex justify-center md:justify-start">
            <img
              src="/headshot.jpg"
              alt={t('about.photoAlt')}
              className="w-48 h-60 md:w-full md:h-auto rounded-lg object-cover shadow-ocean"
            />
          </div>

          <div className="space-y-6">
            <div className="animate-fade-up">
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                {t('about.professionalFocus')}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t('about.professionalFocusText1')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.professionalFocusText2')}
              </p>
            </div>

            <div className="flex items-center space-x-4 text-muted-foreground">
              <MapPin className="text-accent flex-shrink-0" size={20} />
              <span>{t('about.basedInFrance')}</span>
            </div>

            <Card className="shadow-coastal">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Languages className="text-accent flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-medium text-sm text-primary mb-1">{t('about.languages')}</p>
                    <p className="text-sm text-muted-foreground">{t('about.languagesText')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="text-accent flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-medium text-sm text-primary mb-1">{t('about.institutionsLabel')}</p>
                    <p className="text-sm text-muted-foreground">{t('about.institutionsList')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="text-accent flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-medium text-sm text-primary mb-1">{t('about.keyAchievements')}</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• {t('about.crnaGrant')}</li>
                      <li>• {t('about.rankedFirst')}</li>
                      <li>• {t('about.publishedResearch')}</li>
                    </ul>
                  </div>
                </div>

                <a
                  href="https://theses.fr/29332249X"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-light transition-colors"
                >
                  {t('about.thesisLink')}
                  <ExternalLink size={14} />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

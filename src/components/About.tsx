import { MapPin, Award, Languages, Building2, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import ContourLines from '@/components/ContourLines';

const About = () => {
  const { t } = useLanguage();

  const facts = [
    { Icon: Languages, label: t('about.languages'), text: t('about.languagesText') },
    { Icon: Building2, label: t('about.institutionsLabel'), text: t('about.institutionsList') },
    { Icon: MapPin, label: t('contact.location'), text: t('about.basedInFrance') },
  ];

  return (
    <Section id="about" index="07" title={t('about.title')} lede={t('about.description')} variant="sunken">
      <div className="grid gap-12 md:grid-cols-[minmax(0,300px)_1fr] md:gap-16 items-start max-w-5xl">
        <Reveal>
          <div className="relative">
            {/* Contour accent behind the portrait */}
            <div
              className="absolute -left-6 -top-6 h-full w-full text-primary/40 pointer-events-none"
              aria-hidden="true"
            >
              <ContourLines className="h-full w-full" />
            </div>
            <img
              src="/headshot.jpg"
              alt={t('about.photoAlt')}
              className="relative w-56 md:w-full rounded-md object-cover shadow-ocean"
            />
          </div>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={80}>
            <div>
              <p className="eyebrow mb-3">{t('about.professionalFocus')}</p>
              <p className="leading-relaxed text-muted-foreground mb-4">
                {t('about.professionalFocusText1')}
              </p>
              <p className="leading-relaxed text-muted-foreground mb-4">
                {t('about.professionalFocusText2')}
              </p>
              <p className="leading-relaxed text-foreground font-medium">
                {t('about.professionalFocusText3')}
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <dl className="grid gap-5 sm:grid-cols-2">
              {facts.map(({ Icon, label, text }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 shrink-0 text-accent" size={17} />
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-0.5 text-sm text-foreground">{text}</dd>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <Award className="mt-0.5 shrink-0 text-accent" size={17} />
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {t('about.keyAchievements')}
                  </dt>
                  <dd className="mt-0.5 text-sm text-foreground">
                    <ul className="space-y-0.5">
                      <li>{t('about.highlight1')}</li>
                      <li>{t('about.highlight2')}</li>
                      <li>{t('about.highlight3')}</li>
                    </ul>
                  </dd>
                </div>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={200}>
            <a
              href="https://theses.fr/29332249X"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-accent/60 hover:text-accent"
            >
              {t('about.thesisLink')}
              <ExternalLink size={12} />
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default About;

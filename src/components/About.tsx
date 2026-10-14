import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

const About = () => {
  const { t } = useLanguage();

  return (
    <Section id="about" index="07" title={t('about.title')}>
      <div className="grid items-start gap-12 md:grid-cols-[minmax(0,340px)_1fr] md:gap-14">
        <Reveal>
          <img
            src="/headshot.jpg"
            alt={t('about.photoAlt')}
            className="w-56 rounded-2xl object-cover shadow-ocean md:w-full"
          />
        </Reveal>

        <div>
          <Reveal delay={80}>
            <p className="mb-7 font-display text-xl font-semibold leading-normal text-foreground md:text-2xl">
              {t('about.description')}
            </p>
            <p className="mb-5 leading-relaxed text-muted-foreground">
              {t('about.professionalFocusText1')}
            </p>
            <p className="mb-5 leading-relaxed text-muted-foreground">
              {t('about.professionalFocusText2')}
            </p>
            <p className="mb-9 leading-relaxed text-muted-foreground">
              {t('about.professionalFocusText3')}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <dl className="grid gap-6 border-t border-border pt-7 sm:grid-cols-2">
              <div>
                <dt className="eyebrow mb-2">{t('about.languages')}</dt>
                <dd className="text-[14.5px] text-foreground">{t('about.languagesText')}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">{t('about.institutionsLabel')}</dt>
                <dd className="text-[14.5px] text-foreground">{t('about.institutionsList')}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="eyebrow mb-2">{t('about.keyAchievements')}</dt>
                <dd>
                  <ul className="list-disc space-y-1 pl-5 text-[14.5px] leading-relaxed text-foreground">
                    <li>{t('about.highlight1')}</li>
                    <li>{t('about.highlight2')}</li>
                    <li>{t('about.highlight3')}</li>
                    <li>
                      <a
                        href="https://hal.science/tel-05720855v1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-accent/80"
                      >
                        {t('about.thesisLink')}
                        <ExternalLink size={12} />
                      </a>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default About;

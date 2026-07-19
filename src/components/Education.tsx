import { useLanguage } from '@/components/language-provider';
import { Localized, pickLocalized } from '@/lib/i18n';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

interface EducationEntry {
  id: string;
  dates: Localized;
  degree: Localized;
  school: Localized;
  detail: Localized;
}

const educationData: EducationEntry[] = [
  {
    id: 'phd-coastal-engineering',
    dates: { en: 'Nov 2022 – Dec 2025', fr: 'Nov. 2022 – Déc. 2025' },
    degree: { en: 'PhD in Coastal Engineering', fr: 'Doctorat en ingénierie côtière' },
    school: {
      en: 'University of Bordeaux, BRGM · Bordeaux, France',
      fr: 'Université de Bordeaux, BRGM · Bordeaux, France',
    },
    detail: {
      en: 'Doctoral research focused on morphodynamic modelling of shoreline change under sea-level rise.',
      fr: "Recherche doctorale consacrée à la modélisation morphodynamique de l'évolution du trait de côte sous l'effet de la montée du niveau marin.",
    },
  },
  {
    id: 'master-uga',
    dates: { en: 'Sep 2021 – Jul 2022', fr: 'Sept. 2021 – Juil. 2022' },
    degree: {
      en: 'Master 2 — Environmental Fluid Mechanics',
      fr: 'Master 2 — Mécanique des fluides environnementale',
    },
    school: 'Université Grenoble Alpes (UGA) · Grenoble, France',
    detail: {
      en: 'Advanced research in environmental fluid mechanics with focus on computational and experimental methods.',
      fr: "Recherche avancée en mécanique des fluides environnementale, avec un accent sur les méthodes numériques et expérimentales.",
    },
  },
  {
    id: 'master-uppa',
    dates: { en: 'Oct 2020 – Sep 2021', fr: 'Oct. 2020 – Sept. 2021' },
    degree: 'Master 2 — Computations in Coastal & Civil Engineering',
    school: "Université de Pau et des Pays de l'Adour (UPPA) · Anglet, France",
    detail: {
      en: 'Rank 1/11, Très Bien. Specialized program in computational methods for coastal and civil engineering applications.',
      fr: 'Classé 1/11, mention Très Bien. Programme spécialisé en méthodes numériques pour les applications du génie côtier et civil.',
    },
  },
  {
    id: 'msc-rhu',
    dates: { en: 'Oct 2016 – Jan 2019', fr: 'Oct. 2016 – Janv. 2019' },
    degree: {
      en: 'MSc — Civil & Environmental Engineering',
      fr: 'MSc — Génie civil et environnemental',
    },
    school: {
      en: 'Rafik Hariri University · Damour, Lebanon',
      fr: 'Université Rafik Hariri · Damour, Liban',
    },
    detail: {
      en: 'Excellent. Comprehensive program covering fundamental and advanced topics in civil and environmental engineering.',
      fr: 'Mention Excellent. Programme complet couvrant les fondements et les sujets avancés du génie civil et environnemental.',
    },
  },
  {
    id: 'bsc-lebanese',
    dates: { en: 'Oct 2013 – Aug 2016', fr: 'Oct. 2013 – Août 2016' },
    degree: {
      en: 'BSc — Civil Engineering (Building & Public Works)',
      fr: 'Licence — Génie civil (Bâtiment et travaux publics)',
    },
    school: {
      en: 'Lebanese University · Saida, Lebanon',
      fr: 'Université Libanaise · Saïda, Liban',
    },
    detail: {
      en: 'Très Bien. Foundation degree in civil engineering with emphasis on structural design and construction.',
      fr: 'Mention Très Bien. Formation initiale en génie civil, axée sur la conception structurelle et la construction.',
    },
  },
];

const Education = () => {
  const { t, language } = useLanguage();

  return (
    <Section
      id="education"
      index="06"
      title={t('education.title')}
      lede={t('education.description')}
      variant="sunken"
      className="border-t border-border"
    >
      <div>
        {educationData.map((entry, index) => (
          <Reveal key={entry.id} delay={index * 60}>
            <article className="grid gap-x-8 gap-y-1.5 border-t border-border py-7 md:grid-cols-[200px_1fr]">
              <p className="text-[13.5px] font-semibold text-accent">
                {pickLocalized(entry.dates, language)}
              </p>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {pickLocalized(entry.degree, language)}
                </h3>
                <p className="mt-1 text-[13.5px] text-muted-foreground">
                  {pickLocalized(entry.school, language)}
                </p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                  {pickLocalized(entry.detail, language)}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default Education;

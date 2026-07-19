import { useLanguage } from '@/components/language-provider';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

interface EducationEntry {
  id: string;
  dates: string;
  degree: string;
  school: string;
  detail: string;
}

const educationData: EducationEntry[] = [
  {
    id: 'phd-coastal-engineering',
    dates: 'Nov 2022 – Dec 2025',
    degree: 'PhD in Coastal Engineering',
    school: 'University of Bordeaux, BRGM · Bordeaux, France',
    detail: 'Doctoral research focused on morphodynamic modelling of shoreline change under sea-level rise.',
  },
  {
    id: 'master-uga',
    dates: 'Sep 2021 – Jul 2022',
    degree: 'Master 2 — Environmental Fluid Mechanics',
    school: 'Université Grenoble Alpes (UGA) · Grenoble, France',
    detail: 'Advanced research in environmental fluid mechanics with focus on computational and experimental methods.',
  },
  {
    id: 'master-uppa',
    dates: 'Oct 2020 – Sep 2021',
    degree: 'Master 2 — Computations in Coastal & Civil Engineering',
    school: "Université de Pau et des Pays de l'Adour (UPPA) · Anglet, France",
    detail: 'Rank 1/11, Très Bien. Specialized program in computational methods for coastal and civil engineering applications.',
  },
  {
    id: 'msc-rhu',
    dates: 'Oct 2016 – Jan 2019',
    degree: 'MSc — Civil & Environmental Engineering',
    school: 'Rafik Hariri University · Damour, Lebanon',
    detail: 'Excellent. Comprehensive program covering fundamental and advanced topics in civil and environmental engineering.',
  },
  {
    id: 'bsc-lebanese',
    dates: 'Oct 2013 – Aug 2016',
    degree: 'BSc — Civil Engineering (Building & Public Works)',
    school: 'Lebanese University · Saida, Lebanon',
    detail: 'Très Bien. Foundation degree in civil engineering with emphasis on structural design and construction.',
  },
];

const Education = () => {
  const { t } = useLanguage();

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
              <p className="text-[13.5px] font-semibold text-accent">{entry.dates}</p>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">{entry.degree}</h3>
                <p className="mt-1 text-[13.5px] text-muted-foreground">{entry.school}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{entry.detail}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default Education;

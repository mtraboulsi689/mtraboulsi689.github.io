
import VerticalTimeline, { TimelineItem } from '@/components/VerticalTimeline';
import { useLanguage } from '@/components/language-provider';
import Section from '@/components/Section';

const educationData: TimelineItem[] = [
  {
    id: "phd-coastal-engineering",
    category: "education",
    start_date: "2022-11",
    end_date: "2025-12",
    title: "PhD in Coastal Engineering",
    organization: "University of Bordeaux, BRGM",
    location: "Bordeaux, France",
    summary: "Doctoral research focused on morphodynamic modelling of shoreline change under sea-level rise.",
    bullets: [
      "Thesis: Morphodynamic modelling of shoreline change under sea-level rise",
      "Development of coupled coastal evolution models",
      "Climate change impact assessment on coastal systems",
      "Long-term shoreline prediction methodologies"
    ]
  },
  {
    id: "master-uga",
    category: "education",
    start_date: "2021-09",
    end_date: "2022-07",
    title: "Master 2 — Environmental Fluid Mechanics",
    organization: "Université Grenoble Alpes (UGA)",
    location: "Grenoble, France",
    summary: "Advanced research in environmental fluid mechanics with focus on computational and experimental methods.",
    bullets: [
      "Experimental & numerical methods in sediment transport",
      "Turbulence analysis and signal processing",
      "Machine learning applications in fluid mechanics",
      "Wave dynamics and marine energy systems"
    ]
  },
  {
    id: "master-uppa",
    category: "education",
    start_date: "2020-10",
    end_date: "2021-09",
    title: "Master 2 — Computations in Coastal & Civil Engineering",
    role: "Rank: 1/11, Très Bien",
    organization: "Université de Pau et des Pays de l'Adour (UPPA)",
    location: "Anglet, France",
    summary: "Specialized program in computational methods for coastal and civil engineering applications.",
    bullets: [
      "Simulation of free-surface flows using Telemac 2D",
      "Advanced modeling with Artemis, OPENFOAM, SWAN",
      "Structural analysis using BOSZ and Cast3M",
      "Coastal engineering and wave modeling"
    ]
  },
  {
    id: "msc-rhu",
    category: "education",
    start_date: "2016-10",
    end_date: "2019-01",
    title: "MSc — Civil & Environmental Engineering",
    role: "Excellent",
    organization: "Rafik Hariri University",
    location: "Damour, Lebanon",
    summary: "Comprehensive program covering fundamental and advanced topics in civil and environmental engineering.",
    bullets: [
      "Fluid mechanics and hydraulic engineering",
      "Soil mechanics and geotechnical analysis",
      "Numerical analysis and non-linear methods",
      "Environmental impact assessment"
    ]
  },
  {
    id: "bsc-lebanese",
    category: "education",
    start_date: "2013-10",
    end_date: "2016-08",
    title: "BSc — Civil Engineering (Building & Public Works)",
    role: "Très Bien",
    organization: "Lebanese University",
    location: "Saida, Lebanon",
    summary: "Foundation degree in civil engineering with emphasis on structural design and construction.",
    bullets: [
      "Structural engineering and design",
      "Construction management and materials",
      "Hydraulics and water resources",
      "Surveying and geomatics"
    ]
  }
];


const Education = () => {
  const { t } = useLanguage();

  return (
    <Section id="education" index="06" title={t('education.title')} lede={t('education.description')}>
      <VerticalTimeline items={educationData} detailsLabel={t('education.highlightsLabel')} />
    </Section>
  );
};

export default Education;

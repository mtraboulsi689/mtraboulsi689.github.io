
import { GraduationCap } from 'lucide-react';
import Timeline, { TimelineItem } from '@/components/Timeline';
import { useLanguage } from '@/components/language-provider';

const educationData: TimelineItem[] = [
  {
    title: "PhD in Coastal Engineering",
    institution: "University of Bordeaux, BRGM",
    location: "Bordeaux, France",
    period: "Nov 2022 – Present",
    description: "Doctoral research focused on morphodynamic modelling of shoreline change under sea-level rise.",
    highlights: [
      "Thesis: Morphodynamic modelling of shoreline change under sea-level rise",
      "Development of coupled coastal evolution models",
      "Climate change impact assessment on coastal systems",
      "Long-term shoreline prediction methodologies"
    ],
    icon: <GraduationCap className="text-white" size={24} />
  },
  {
    title: "Master 2 — Environmental Fluid Mechanics",
    institution: "Université Grenoble Alpes (UGA)",
    location: "Grenoble, France",
    period: "09/2021 – Present",
    description: "Advanced research in environmental fluid mechanics with focus on computational and experimental methods.",
    highlights: [
      "Experimental & numerical methods in sediment transport",
      "Turbulence analysis and signal processing",
      "Machine learning applications in fluid mechanics",
      "Wave dynamics and marine energy systems"
    ],
    icon: <GraduationCap className="text-white" size={24} />
  },
  {
    title: "Master 2 — Computations in Coastal & Civil Engineering",
    institution: "Université de Pau et des Pays de l'Adour (UPPA)",
    location: "Anglet, France",
    period: "10/2020 – 09/2021",
    grade: "Rank: 1/11, Très Bien",
    description: "Specialized program in computational methods for coastal and civil engineering applications.",
    highlights: [
      "Simulation of free-surface flows using Telemac 2D",
      "Advanced modeling with Artemis, OPENFOAM, SWAN",
      "Structural analysis using BOSZ and Cast3M",
      "Coastal engineering and wave modeling"
    ],
    icon: <GraduationCap className="text-white" size={24} />
  },
  {
    title: "MSc — Civil & Environmental Engineering",
    institution: "Rafik Hariri University",
    location: "Damour, Lebanon",
    period: "10/2016 – 01/2019",
    grade: "Excellent",
    description: "Comprehensive program covering fundamental and advanced topics in civil and environmental engineering.",
    highlights: [
      "Fluid mechanics and hydraulic engineering",
      "Soil mechanics and geotechnical analysis",
      "Numerical analysis and non-linear methods",
      "Environmental impact assessment"
    ],
    icon: <GraduationCap className="text-white" size={24} />
  },
  {
    title: "BSc — Civil Engineering (Building & Public Works)",
    institution: "Lebanese University",
    location: "Saida, Lebanon",
    period: "10/2013 – 08/2016",
    grade: "Très Bien",
    description: "Foundation degree in civil engineering with emphasis on structural design and construction.",
    highlights: [
      "Structural engineering and design",
      "Construction management and materials",
      "Hydraulics and water resources",
      "Surveying and geomatics"
    ],
    icon: <GraduationCap className="text-white" size={24} />
  }
];


const Education = () => {
  const { t } = useLanguage();
  
  return (
    <section id="education" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            {t('education.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('education.description')}
          </p>
        </div>

        <Timeline items={educationData} category="education" />
      </div>
    </section>
  );
};

export default Education;


import { Briefcase } from 'lucide-react';
import Timeline, { TimelineItem } from '@/components/Timeline';
import { useLanguage } from '@/components/language-provider';

const experienceData: TimelineItem[] = [
  {
    title: "Coastal Modelling Engineer",
    subtitle: "Fixed-term Contract",
    institution: "BRGM",
    location: "France",
    period: "Nov 2022 – Present",
    description: "Development and application of advanced coastal morphodynamic models for long-term shoreline evolution under climate change scenarios.",
    highlights: [
      "Developed the coupled LX-ST model to simulate long-term shoreline morphological evolution",
      "Integrated longitudinal and cross-shore sediment transport for comprehensive coastal modeling",
      "Conducted multi-scenario simulations (SSP2-4.5, SSP5-8.5, High-End) for climate impact assessment",
      "Applied the model to the Lacanau site (5 km) with sensitivity tests and varying erosion rates"
    ],
    icon: <Briefcase className="text-white" size={24} />
  },
  {
    title: "Numerical Modeling of Coastline & Sandy Beaches under Sea-Level Rise",
    subtitle: "Internship",
    institution: "BRGM",
    location: "France",
    period: "02/2022 – 08/2022",
    description: "Enhanced coastal modeling capabilities for climate change impact assessment on sandy coastlines.",
    highlights: [
      "Enhanced LX-Shore code with ShoreTrans module for improved accuracy",
      "Developed 2D modeling capabilities for complex coastal geometries",
      "Implemented sediment transport algorithms for long-term predictions",
      "Validated models against observed coastal evolution data"
    ],
    icon: <Briefcase className="text-white" size={24} />
  },
  {
    title: "Impact of Climate Change on Gironde Estuary Hydrodynamics (ECCLIPSE Project)",
    subtitle: "Internship",
    institution: "Cerema",
    location: "Margny-lès-Compiègne, France",
    period: "03/2021 – 09/2021",
    description: "Comprehensive hydrodynamic modeling study assessing climate change impacts on France's largest estuary.",
    highlights: [
      "Developed Telemac3D & Telemac2D models for flood and drought scenarios",
      "Analyzed dredging impacts on estuarine circulation patterns",
      "Performed hydrological modeling of Garonne & Dordogne rivers",
      "Generated climate scenarios projections up to 2100",
      "Contributed to national climate adaptation strategies"
    ],
    icon: <Briefcase className="text-white" size={24} />
  }
];


const Experience = () => {
  const { t } = useLanguage();
  
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            {t('experience.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('experience.description')}
          </p>
        </div>

        <Timeline items={experienceData} category="work" />
      </div>
    </section>
  );
};

export default Experience;

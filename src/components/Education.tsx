
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  description: string;
  highlights?: string[];
}

const educationData: EducationItem[] = [
  {
    degree: "PhD in Coastal Engineering",
    institution: "University of Bordeaux, BRGM",
    location: "Bordeaux / Orléans, France",
    period: "Nov 2022 – Present",
    description: "Doctoral research focused on morphodynamic modelling of shoreline change under sea-level rise.",
    highlights: [
      "Thesis: Morphodynamic modelling of shoreline change under sea-level rise",
      "Development of coupled coastal evolution models",
      "Climate change impact assessment on coastal systems",
      "Long-term shoreline prediction methodologies"
    ]
  },
  {
    degree: "Master 2 — Environmental Fluid Mechanics",
    institution: "Université Grenoble Alpes (UGA)",
    location: "Grenoble, France",
    period: "09/2021 – Present",
    description: "Advanced research in environmental fluid mechanics with focus on computational and experimental methods.",
    highlights: [
      "Experimental & numerical methods in sediment transport",
      "Turbulence analysis and signal processing",
      "Machine learning applications in fluid mechanics",
      "Wave dynamics and marine energy systems"
    ]
  },
  {
    degree: "Master 2 — Computations in Coastal & Civil Engineering",
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
    ]
  },
  {
    degree: "MSc — Civil & Environmental Engineering",
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
    ]
  },
  {
    degree: "BSc — Civil Engineering (Building & Public Works)",
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
    ]
  }
];

const EducationCard = ({ education, index }: { education: EducationItem; index: number }) => (
  <Card className="shadow-coastal hover:shadow-ocean transition-all duration-300 group">
    <CardContent className="p-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-ocean rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <GraduationCap className="text-white" size={24} />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-primary mb-2">
            {education.degree}
          </h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-muted-foreground">
              <MapPin size={16} className="mr-2" />
              <span className="font-medium">{education.institution}</span>
              <span className="mx-2">•</span>
              <span>{education.location}</span>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <Calendar size={16} className="mr-2" />
              <span>{education.period}</span>
              {education.grade && (
                <>
                  <span className="mx-2">•</span>
                  <Award size={16} className="mr-1" />
                  <span className="text-accent font-medium">{education.grade}</span>
                </>
              )}
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {education.description}
          </p>
          
          {education.highlights && (
            <div className="space-y-1">
              <h4 className="font-medium text-sm text-primary mb-2">Key Areas:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {education.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

const Education = () => {
  return (
    <section id="education" className="py-20 bg-gradient-coastal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A progressive academic journey through specialized programs in coastal engineering, 
            fluid mechanics, and computational methods across multiple international institutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {educationData.map((education, index) => (
            <div 
              key={index}
              className="animate-fade-up"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <EducationCard education={education} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

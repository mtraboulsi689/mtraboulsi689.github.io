
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface ExperienceItem {
  title: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  technologies?: string[];
}

const experienceData: ExperienceItem[] = [
  {
    title: "Numerical Modeling of Coastline & Sandy Beaches under Sea-Level Rise",
    organization: "BRGM",
    location: "Orléans, France",
    period: "02/2022 – 08/2022",
    type: "Internship",
    description: "Enhanced coastal modeling capabilities for climate change impact assessment on sandy coastlines.",
    achievements: [
      "Enhanced LX-Shore code with ShoreTrans module for improved accuracy",
      "Developed 2D modeling capabilities for complex coastal geometries",
      "Implemented sediment transport algorithms for long-term predictions",
      "Validated models against observed coastal evolution data"
    ],
    technologies: ["LX-Shore", "ShoreTrans", "Python", "MATLAB", "GIS"]
  },
  {
    title: "Impact of Climate Change on Gironde Estuary Hydrodynamics (ECCLIPSE Project)",
    organization: "Cerema",
    location: "Margny-lès-Compiègne, France",
    period: "03/2021 – 09/2021",
    type: "Internship",
    description: "Comprehensive hydrodynamic modeling study assessing climate change impacts on France's largest estuary.",
    achievements: [
      "Developed Telemac3D & Telemac2D models for flood and drought scenarios",
      "Analyzed dredging impacts on estuarine circulation patterns",
      "Performed hydrological modeling of Garonne & Dordogne rivers",
      "Generated climate scenarios projections up to 2100",
      "Contributed to national climate adaptation strategies"
    ],
    technologies: ["Telemac3D", "Telemac2D", "Python", "Fortran", "R", "GIS"]
  }
];

const ExperienceCard = ({ experience, index }: { experience: ExperienceItem; index: number }) => (
  <Card className="shadow-coastal hover:shadow-ocean transition-all duration-300 group">
    <CardContent className="p-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-ocean rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Briefcase className="text-white" size={24} />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2 leading-tight">
                {experience.title}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center text-muted-foreground">
                  <MapPin size={16} className="mr-2" />
                  <span className="font-medium">{experience.organization}</span>
                  <span className="mx-2">•</span>
                  <span>{experience.location}</span>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <Calendar size={16} className="mr-2" />
                  <span>{experience.period}</span>
                  <span className="mx-2">•</span>
                  <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium">
                    {experience.type}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {experience.description}
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-primary mb-3">Key Achievements:</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                {experience.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-accent mr-2 mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {experience.technologies && (
              <div>
                <h4 className="font-medium text-sm text-primary mb-3">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hands-on experience in coastal engineering research and climate change impact assessment 
            through internships at leading French research institutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experienceData.map((experience, index) => (
            <div 
              key={index}
              className="animate-fade-up"
              style={{animationDelay: `${index * 0.3}s`}}
            >
              <ExperienceCard experience={experience} index={index} />
            </div>
          ))}
        </div>

        {/* Publications Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-gradient-ocean">
              Publications & Research
            </h3>
          </div>
          
          <Card className="max-w-4xl mx-auto shadow-coastal hover:shadow-ocean transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <ExternalLink className="text-accent flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-2">
                    Correlations between Dynamic and Static Mechanical Properties of Clayey Soils
                  </h4>
                  <p className="text-muted-foreground mb-3">
                    Traboulsi, M., & Al Wardany, R. (2019)
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    International Journal of Civil Engineering and Technology, 10(01), 2602–2612.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Research investigating the relationships between dynamic and static mechanical properties 
                    of clayey soils, contributing to improved understanding of soil behavior under varying 
                    loading conditions for civil engineering applications.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Experience;

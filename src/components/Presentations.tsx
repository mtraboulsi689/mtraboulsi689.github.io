import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ExternalLink, Users, Presentation, Award } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

interface PresentationItem {
  title: string;
  event: string;
  location: string;
  date: string;
  type: 'conference' | 'workshop' | 'seminar' | 'keynote';
  description: string;
  audience?: string;
  highlights?: string[];
  links?: {
    slides?: string;
    video?: string;
    abstract?: string;
  };
}

const presentationsData: PresentationItem[] = [
  {
    title: "LX-ST Coupled Model for Long-term Shoreline Evolution",
    event: "European Coastal Engineering Conference (ECEC)",
    location: "Lisbon, Portugal",
    date: "September 2024",
    type: "conference",
    description: "Presented the development and validation of the LX-ST coupled model for simulating long-term shoreline morphological evolution under climate change scenarios.",
    audience: "200+ coastal engineers and researchers",
    highlights: [
      "Demonstrated model coupling methodology between longitudinal and cross-shore transport",
      "Showcased climate impact simulations for multiple SSP scenarios",
      "Presented validation results from Lacanau site application"
    ],
    links: {
      slides: "/presentations/lx-st-ecec-2024.pdf",
      abstract: "/abstracts/lx-st-abstract.pdf"
    }
  },
  {
    title: "Climate Change Impacts on Coastal Morphodynamics",
    event: "BRGM Research Seminar Series",
    location: "Orléans, France",
    date: "June 2024",
    type: "seminar",
    description: "Internal seminar presenting progress on PhD research focusing on morphodynamic modeling under sea-level rise scenarios.",
    audience: "50+ BRGM researchers",
    highlights: [
      "Reviewed current state of coastal evolution models",
      "Discussed challenges in long-term morphodynamic predictions",
      "Presented preliminary results from climate scenario modeling"
    ]
  },
  {
    title: "Numerical Modeling of Coastal Sediment Transport",
    event: "International Workshop on Coastal Dynamics",
    location: "Bordeaux, France", 
    date: "March 2024",
    type: "workshop",
    description: "Workshop presentation on advanced numerical techniques for modeling sediment transport in coastal environments.",
    audience: "80+ graduate students and researchers",
    highlights: [
      "Introduced LX-Shore modeling framework",
      "Demonstrated sediment transport algorithms",
      "Hands-on modeling exercises and case studies"
    ],
    links: {
      slides: "/presentations/coastal-transport-workshop-2024.pdf"
    }
  },
  {
    title: "Hydrodynamic Modeling of the Gironde Estuary",
    event: "Cerema Technical Conference",
    location: "Margny-lès-Compiègne, France",
    date: "October 2021",
    type: "conference",
    description: "Presented results from the ECCLIPSE project on climate change impacts on estuarine hydrodynamics.",
    audience: "150+ engineers and researchers",
    highlights: [
      "Detailed Telemac3D modeling methodology",
      "Climate scenario projections to 2100",
      "Dredging impact assessment on circulation patterns"
    ],
    links: {
      slides: "/presentations/gironde-cerema-2021.pdf",
      abstract: "/abstracts/gironde-abstract.pdf"
    }
  }
];

const typeIcons = {
  conference: Presentation,
  workshop: Users,
  seminar: Calendar,
  keynote: Award,
};

const typeColors = {
  conference: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  workshop: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  seminar: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  keynote: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
};

const PresentationCard = ({ presentation, index }: { presentation: PresentationItem; index: number }) => {
  const IconComponent = typeIcons[presentation.type];
  
  return (
    <Card className="shadow-coastal hover:shadow-ocean transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-ocean rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <IconComponent className="text-white" size={20} />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[presentation.type]}`}>
                {presentation.type.charAt(0).toUpperCase() + presentation.type.slice(1)}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-primary leading-tight">
              {presentation.title}
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <Calendar size={16} className="mr-2 flex-shrink-0" />
                <span className="font-medium">{presentation.event}</span>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <MapPin size={16} className="mr-2 flex-shrink-0" />
                <span>{presentation.location}</span>
                <span className="mx-2">•</span>
                <span>{presentation.date}</span>
              </div>
              
              {presentation.audience && (
                <div className="flex items-center text-muted-foreground">
                  <Users size={16} className="mr-2 flex-shrink-0" />
                  <span>{presentation.audience}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {presentation.description}
          </p>
          
          {presentation.highlights && presentation.highlights.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-primary">Key Points:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {presentation.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {presentation.links && Object.keys(presentation.links).length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {presentation.links.slides && (
                <Button variant="outline" size="sm" asChild>
                  <a href={presentation.links.slides} target="_blank" rel="noopener noreferrer">
                    <Presentation size={16} className="mr-2" />
                    Slides
                  </a>
                </Button>
              )}
              {presentation.links.video && (
                <Button variant="outline" size="sm" asChild>
                  <a href={presentation.links.video} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" />
                    Video
                  </a>
                </Button>
              )}
              {presentation.links.abstract && (
                <Button variant="outline" size="sm" asChild>
                  <a href={presentation.links.abstract} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" />
                    Abstract
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Presentations = () => {
  const { t } = useLanguage();
  
  return (
    <section id="presentations" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            Presentations & Talks
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conference presentations, workshops, and seminars sharing research findings in coastal engineering, 
            climate change impacts, and numerical modeling across national and international venues.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {presentationsData.map((presentation, index) => (
            <div 
              key={index}
              className="animate-fade-up"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <PresentationCard presentation={presentation} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Presentations;
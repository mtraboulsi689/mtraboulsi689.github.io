import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Award } from 'lucide-react';

interface TimelineItem {
  title: string;
  subtitle?: string;
  institution?: string;
  location: string;
  period: string;
  grade?: string;
  description: string;
  highlights?: string[];
  icon: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
}

const TimelineCard = ({ item, index, isLast }: { 
  item: TimelineItem; 
  index: number; 
  isLast: boolean;
}) => (
  <div className="relative flex items-start space-x-6 pb-8">
    {/* Timeline line */}
    {!isLast && (
      <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-primary/50 to-primary/20" />
    )}
    
    {/* Icon */}
    <div className="flex-shrink-0 relative z-10">
      <div className="w-12 h-12 bg-gradient-ocean rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        {item.icon}
      </div>
    </div>
    
    {/* Content */}
    <div className="flex-1 min-w-0">
      <Card className="shadow-coastal hover:shadow-ocean transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-1">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-lg text-muted-foreground">
                  {item.subtitle}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              {item.institution && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin size={16} className="mr-2 flex-shrink-0" />
                  <span className="font-medium">{item.institution}</span>
                  <span className="mx-2">•</span>
                  <span>{item.location}</span>
                </div>
              )}
              
              <div className="flex items-center text-muted-foreground flex-wrap">
                <Calendar size={16} className="mr-2 flex-shrink-0" />
                <span>{item.period}</span>
                {item.grade && (
                  <>
                    <span className="mx-2">•</span>
                    <Award size={16} className="mr-1 flex-shrink-0" />
                    <span className="text-accent font-medium">{item.grade}</span>
                  </>
                )}
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              {item.description}
            </p>
            
            {item.highlights && item.highlights.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="font-medium text-sm text-primary">Key Highlights:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-accent mr-2 flex-shrink-0">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      {items.map((item, index) => (
        <div 
          key={index}
          className="animate-fade-up"
          style={{animationDelay: `${index * 0.2}s`}}
        >
          <TimelineCard 
            item={item} 
            index={index} 
            isLast={index === items.length - 1} 
          />
        </div>
      ))}
    </div>
  );
};

export default Timeline;
export type { TimelineItem };
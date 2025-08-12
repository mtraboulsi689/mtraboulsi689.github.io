import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Award, ChevronDown, ChevronUp } from 'lucide-react';

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
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First item expanded by default
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [item.highlights]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const hasExpandableContent = item.highlights && item.highlights.length > 0;

  return (
    <div className="relative flex items-start space-x-6 pb-8">
      {/* Animated Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-primary/20 to-primary/10" />
          <div 
            className={`absolute top-0 w-full bg-gradient-to-b from-primary to-accent transition-all duration-1000 ease-out ${
              isHovered ? 'h-full' : 'h-0'
            }`}
          />
        </div>
      )}
      
      {/* Interactive Icon */}
      <div className="flex-shrink-0 relative z-10">
        <div 
          className={`w-12 h-12 bg-gradient-ocean rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer ${
            isHovered ? 'scale-110 shadow-ocean rotate-3' : 'scale-100'
          } ${isExpanded ? 'ring-2 ring-accent ring-offset-2' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={hasExpandableContent ? toggleExpanded : undefined}
        >
          {item.icon}
        </div>
        
        {/* Pulse animation for active item */}
        {isExpanded && (
          <div className="absolute inset-0 w-12 h-12 rounded-full bg-accent/20 animate-ping" />
        )}
      </div>
      
      {/* Interactive Content */}
      <div className="flex-1 min-w-0">
        <Card 
          className={`shadow-coastal transition-all duration-500 group cursor-pointer ${
            isHovered || isExpanded 
              ? 'shadow-ocean transform translate-y-[-2px] border-accent/30' 
              : 'hover:shadow-ocean'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={hasExpandableContent ? toggleExpanded : undefined}
        >
          <CardContent className="p-6">
            <div className="space-y-3">
              {/* Header with expand/collapse indicator */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-1 transition-colors duration-300 ${
                    isHovered || isExpanded ? 'text-accent' : 'text-primary'
                  }`}>
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-lg text-muted-foreground">
                      {item.subtitle}
                    </p>
                  )}
                </div>
                
                {hasExpandableContent && (
                  <div className={`ml-4 transition-all duration-300 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}>
                    {isExpanded ? (
                      <ChevronUp size={20} className="text-accent" />
                    ) : (
                      <ChevronDown size={20} className="text-muted-foreground" />
                    )}
                  </div>
                )}
              </div>
              
              {/* Meta information */}
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
              
              {/* Always visible description */}
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              
              {/* Expandable highlights section */}
              {hasExpandableContent && (
                <div 
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ 
                    maxHeight: isExpanded ? `${contentHeight}px` : '0px',
                    opacity: isExpanded ? 1 : 0
                  }}
                >
                  <div ref={contentRef} className="space-y-2 pt-4 border-t border-border/50">
                    <h4 className="font-medium text-sm text-primary flex items-center">
                      <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                      Key Highlights:
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {item.highlights?.map((highlight, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start animate-fade-up"
                          style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                          <span className="text-accent mr-3 flex-shrink-0 mt-1">▸</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Timeline = ({ items }: TimelineProps) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(items.length).fill(false)
  );

  useEffect(() => {
    // Progressive reveal animation
    const revealItems = () => {
      items.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        }, index * 200);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          revealItems();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const timelineElement = document.getElementById('timeline-container');
    if (timelineElement) {
      observer.observe(timelineElement);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <div id="timeline-container" className="max-w-4xl mx-auto relative">
      {/* Main timeline background line */}
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary/10 via-primary/20 to-primary/10 rounded-full" />
      
      {items.map((item, index) => (
        <div 
          key={index}
          className={`transition-all duration-700 ease-out ${
            visibleItems[index] 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: `${index * 0.1}s`
          }}
        >
          <TimelineCard 
            item={item} 
            index={index} 
            isLast={index === items.length - 1} 
          />
        </div>
      ))}
      
      {/* Timeline end marker */}
      <div className="flex justify-center pt-4">
        <div className="w-3 h-3 bg-gradient-ocean rounded-full shadow-lg" />
      </div>
    </div>
  );
};

export default Timeline;
export type { TimelineItem };
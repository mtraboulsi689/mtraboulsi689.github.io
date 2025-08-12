import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Award, ChevronDown, ChevronUp } from 'lucide-react';

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
  category?: 'education' | 'work';
}

interface TimelineProps {
  items: TimelineItem[];
  category?: 'education' | 'work';
}

const TimelineCard = ({ item, index, isLast, category }: { 
  item: TimelineItem; 
  index: number; 
  isLast: boolean;
  category?: 'education' | 'work';
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [item.highlights]);

  const hasExpandableContent = item.highlights && item.highlights.length > 0;

  // Extract year from period (e.g., "Nov 2022 – Present" -> "2022")
  const getYear = (period: string) => {
    const match = period.match(/(\d{4})/);
    return match ? match[1] : period.split(' ')[0];
  };

  // Get category colors
  const getCategoryColors = (cat?: 'education' | 'work') => {
    switch (cat) {
      case 'education':
        return {
          icon: 'bg-blue-500',
          line: 'bg-blue-200',
          activeIcon: 'bg-blue-600',
          activeLine: 'bg-blue-400'
        };
      case 'work':
        return {
          icon: 'bg-orange-500',
          line: 'bg-orange-200',
          activeIcon: 'bg-orange-600',
          activeLine: 'bg-orange-400'
        };
      default:
        return {
          icon: 'bg-primary',
          line: 'bg-primary/20',
          activeIcon: 'bg-accent',
          activeLine: 'bg-accent'
        };
    }
  };

  const colors = getCategoryColors(category || item.category);

  return (
    <div className="relative grid grid-cols-[120px_1fr] gap-8 pb-4 group">
      {/* Year on the left */}
      <div className="text-right pt-2">
        <div className={`text-lg font-semibold transition-colors duration-300 ${
          isHovered ? 'text-accent' : 'text-primary'
        }`}>
          {getYear(item.period)}
        </div>
        {item.period.includes('Present') && (
          <div className="text-xs text-muted-foreground mt-1">Present</div>
        )}
      </div>

      {/* Centered vertical line and icon */}
      <div className="relative">
        {/* Vertical line */}
        {!isLast && (
          <div className="absolute left-[-40px] top-8 w-0.5 h-full">
            <div className={`w-full h-full ${colors.line} transition-colors duration-300`} />
            <div 
              className={`absolute top-0 w-full transition-all duration-500 ease-out ${colors.activeLine} ${
                isHovered ? 'h-full' : 'h-0'
              }`}
            />
          </div>
        )}
        
        {/* Icon on the line */}
        <div className="absolute left-[-46px] top-2 z-10">
          <div 
            className={`w-3 h-3 ${colors.icon} rounded-full transition-all duration-300 ${
              isHovered ? `scale-125 ${colors.activeIcon}` : 'scale-100'
            }`}
          >
            <div className={`w-full h-full flex items-center justify-center text-white text-xs ${
              isHovered ? 'scale-75' : 'scale-0'
            } transition-transform duration-300`}>
              {item.icon}
            </div>
          </div>
        </div>

        {/* Content card */}
        <Card 
          className={`transition-all duration-300 cursor-pointer ${
            isHovered ? 'shadow-lg transform translate-y-[-1px] border-accent/30' : 'shadow-sm hover:shadow-md'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => hasExpandableContent && setShowDetails(!showDetails)}
        >
          <CardContent className="p-4">
            <div className="space-y-2">
              {/* Title and subtitle */}
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className={`text-base font-semibold leading-tight transition-colors duration-300 ${
                    isHovered ? 'text-accent' : 'text-primary'
                  }`}>
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.subtitle}
                    </p>
                  )}
                </div>
                
                {hasExpandableContent && (
                  <div className={`ml-2 transition-all duration-300 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}>
                    {showDetails ? (
                      <ChevronUp size={16} className="text-accent" />
                    ) : (
                      <ChevronDown size={16} className="text-muted-foreground" />
                    )}
                  </div>
                )}
              </div>
              
              {/* Institution and location */}
              {item.institution && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin size={14} className="mr-1 flex-shrink-0" />
                  <span className="font-medium">{item.institution}</span>
                  <span className="mx-1">•</span>
                  <span>{item.location}</span>
                  {item.grade && (
                    <>
                      <span className="mx-1">•</span>
                      <Award size={14} className="mr-1 flex-shrink-0" />
                      <span className="text-accent font-medium">{item.grade}</span>
                    </>
                  )}
                </div>
              )}
              
              {/* Compact description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              
              {/* Expandable details on hover/click */}
              {hasExpandableContent && (
                <div 
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ 
                    maxHeight: showDetails || isHovered ? `${contentHeight}px` : '0px',
                    opacity: showDetails || isHovered ? 1 : 0
                  }}
                >
                  <div ref={contentRef} className="space-y-1 pt-2 border-t border-border/30">
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {item.highlights?.map((highlight, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start"
                        >
                          <span className="text-accent mr-2 flex-shrink-0 mt-0.5">•</span>
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

const Timeline = ({ items, category }: TimelineProps) => {
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
        }, index * 100);
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

    const timelineElement = document.getElementById(`timeline-container-${category || 'default'}`);
    if (timelineElement) {
      observer.observe(timelineElement);
    }

    return () => observer.disconnect();
  }, [items, category]);

  // Get category colors for the main timeline line
  const getCategoryLineColor = (cat?: 'education' | 'work') => {
    switch (cat) {
      case 'education':
        return 'bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200';
      case 'work':
        return 'bg-gradient-to-b from-orange-200 via-orange-300 to-orange-200';
      default:
        return 'bg-gradient-to-b from-primary/10 via-primary/20 to-primary/10';
    }
  };

  return (
    <div id={`timeline-container-${category || 'default'}`} className="max-w-5xl mx-auto relative">
      {/* Main centered timeline line */}
      <div className={`absolute left-[120px] ml-[-1px] top-4 bottom-4 w-0.5 ${getCategoryLineColor(category)} rounded-full`} />
      
      {items.map((item, index) => (
        <div 
          key={index}
          className={`transition-all duration-500 ease-out ${
            visibleItems[index] 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: `${index * 0.05}s`
          }}
        >
          <TimelineCard 
            item={item} 
            index={index} 
            isLast={index === items.length - 1}
            category={category}
          />
        </div>
      ))}
      
      {/* Timeline end marker */}
      <div className="flex justify-center pt-2">
        <div className={`w-2 h-2 rounded-full shadow-sm ${
          category === 'education' ? 'bg-blue-400' : 
          category === 'work' ? 'bg-orange-400' : 'bg-primary'
        }`} />
      </div>
    </div>
  );
};

export default Timeline;
export type { TimelineItem };
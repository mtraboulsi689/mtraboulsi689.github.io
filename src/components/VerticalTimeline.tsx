import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, ExternalLink, Copy, Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

interface TimelineLink {
  label: string;
  url: string;
}

interface TimelineItem {
  id: string;
  category: 'experience' | 'education';
  start_date: string; // "YYYY-MM"
  end_date: string | null; // "YYYY-MM" or null
  title: string;
  role?: string;
  organization: string;
  location?: string;
  summary: string;
  bullets?: string[];
  links?: TimelineLink[];
}

interface VerticalTimelineProps {
  items: TimelineItem[];
  category: 'experience' | 'education';
}

const VerticalTimeline = ({ items, category }: VerticalTimelineProps) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Sort items by start_date descending
  const sortedItems = [...items].sort((a, b) => {
    const dateA = new Date(a.start_date + '-01');
    const dateB = new Date(b.start_date + '-01');
    return dateB.getTime() - dateA.getTime();
  });

  const getCategoryColors = (cat: 'experience' | 'education') => {
    switch (cat) {
      case 'experience':
        return {
          accent: 'text-orange-600',
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          icon: 'bg-orange-500',
          iconHover: 'bg-orange-600'
        };
      case 'education':
        return {
          accent: 'text-blue-600',
          bg: 'bg-blue-50', 
          border: 'border-blue-200',
          icon: 'bg-blue-500',
          iconHover: 'bg-blue-600'
        };
    }
  };

  const colors = getCategoryColors(category);

  const formatDateRange = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate + '-01');
    const startMonth = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    if (!endDate) {
      return `${startMonth} – Present`;
    }
    
    const end = new Date(endDate + '-01');
    const endMonth = end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${startMonth} – ${endMonth}`;
  };

  const createSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleCardExpand = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleTitleClick = (item: TimelineItem) => {
    const primaryLink = item.links?.[0];
    if (primaryLink) {
      window.open(primaryLink.url, '_blank', 'noopener,noreferrer');
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getIcon = () => {
    return category === 'experience' ? Briefcase : GraduationCap;
  };

  const Icon = getIcon();

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Main timeline line */}
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200 rounded-full" />
      
      <div className="space-y-8">
        {sortedItems.map((item, index) => {
          const cardId = `${category}-${createSlug(item.title)}`;
          const isExpanded = expandedCard === cardId;
          const hasExpandableContent = item.bullets && item.bullets.length > 0;

          return (
            <div 
              key={item.id}
              id={cardId}
              className="relative flex items-start space-x-6 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Timeline icon */}
              <div className="flex-shrink-0 relative z-10">
                <div 
                  className={`w-12 h-12 ${colors.icon} rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:${colors.iconHover} group-hover:scale-110`}
                >
                  <Icon className="text-white" size={20} />
                </div>
                
                {/* Connecting line to next item */}
                {index < sortedItems.length - 1 && (
                  <div className="absolute left-1/2 top-12 w-0.5 h-8 bg-gray-200 -translate-x-1/2" />
                )}
              </div>

              {/* Content card */}
              <div className="flex-1 min-w-0 group">
                <Card 
                  className="shadow-coastal hover:shadow-ocean transition-all duration-300 cursor-pointer"
                  onClick={() => hasExpandableContent && handleCardExpand(cardId)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h3 
                            className={`text-xl font-semibold leading-tight mb-2 ${
                              item.links?.[0] ? 'cursor-pointer hover:' + colors.accent + ' transition-colors' : ''
                            }`}
                            onClick={(e) => {
                              if (item.links?.[0]) {
                                e.stopPropagation();
                                handleTitleClick(item);
                              }
                            }}
                            role={item.links?.[0] ? 'button' : 'heading'}
                            tabIndex={item.links?.[0] ? 0 : undefined}
                            onKeyDown={(e) => {
                              if (item.links?.[0] && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault();
                                e.stopPropagation();
                                handleTitleClick(item);
                              }
                            }}
                          >
                            {item.title}
                          </h3>

                          {/* Role */}
                          {item.role && (
                            <p className={`text-lg mb-2 ${colors.accent}`}>{item.role}</p>
                          )}
                        </div>

                        {/* Expand toggle */}
                        {hasExpandableContent && (
                          <div className="ml-4 transition-all duration-300 group-hover:scale-110">
                            {isExpanded ? (
                              <ChevronUp size={20} className={colors.accent} />
                            ) : (
                              <ChevronDown size={20} className="text-muted-foreground" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Meta info */}
                      <div className="space-y-2">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin size={16} className="mr-2 flex-shrink-0" />
                          <span className="font-medium">{item.organization}</span>
                          {item.location && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{item.location}</span>
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-center text-muted-foreground">
                          <Calendar size={16} className="mr-2 flex-shrink-0" />
                          <span>{formatDateRange(item.start_date, item.end_date)}</span>
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-muted-foreground leading-relaxed">
                        {item.summary}
                      </p>

                      {/* Expandable content */}
                      {hasExpandableContent && isExpanded && (
                        <div className="pt-4 border-t border-border/50 animate-fade-up">
                          <h4 className="font-medium text-sm text-primary mb-3 flex items-center">
                            <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                            Key Highlights:
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {item.bullets?.map((bullet, idx) => (
                              <li 
                                key={idx} 
                                className="flex items-start animate-fade-up"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                              >
                                <span className={`${colors.accent} mr-3 flex-shrink-0 mt-1`}>▸</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Links */}
                      {item.links && item.links.length > 0 && (
                        <div className="pt-4 border-t border-border/50 flex flex-wrap gap-2">
                          {item.links.map((link, idx) => (
                            <div key={idx} className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(link.url, '_blank', 'noopener,noreferrer');
                                }}
                                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors"
                              >
                                <span>{link.label}</span>
                                <ExternalLink size={12} />
                              </button>
                              
                              {link.label.toLowerCase().includes('doi') && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard(link.url);
                                  }}
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                                  title="Copy DOI"
                                >
                                  <Copy size={12} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Timeline end marker */}
      <div className="flex justify-center pt-8">
        <div className={`w-3 h-3 ${colors.icon} rounded-full shadow-lg`} />
      </div>
    </div>
  );
};

export default VerticalTimeline;
export type { TimelineItem, TimelineLink };
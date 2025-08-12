import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, ExternalLink, Copy } from 'lucide-react';

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

interface YearGroup {
  year: string;
  items: TimelineItem[];
}

const VerticalTimeline = ({ items, category }: VerticalTimelineProps) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [expandedCardsMobile, setExpandedCardsMobile] = useState<Set<string>>(new Set());
  const [activeYear, setActiveYear] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Check for mobile breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sort items by start_date descending
  const sortedItems = [...items].sort((a, b) => {
    const dateA = new Date(a.start_date + '-01');
    const dateB = new Date(b.start_date + '-01');
    return dateB.getTime() - dateA.getTime();
  });

  // Group items by year
  const yearGroups: YearGroup[] = sortedItems.reduce((groups, item) => {
    const year = item.start_date.split('-')[0];
    const existingGroup = groups.find(g => g.year === year);
    if (existingGroup) {
      existingGroup.items.push(item);
    } else {
      groups.push({ year, items: [item] });
    }
    return groups;
  }, [] as YearGroup[]);

  // Set up IntersectionObserver
  useEffect(() => {
    if (isMobile) return;

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -50% 0px', // Account for sticky header
      threshold: 0.5
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardElement = entry.target as HTMLElement;
          const year = cardElement.dataset.year;
          if (year) {
            setActiveYear(year);
          }
        }
      });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('[data-year]');
    cards.forEach(card => observerRef.current?.observe(card));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sortedItems, isMobile]);

  const getCategoryColors = (cat: 'experience' | 'education') => {
    switch (cat) {
      case 'experience':
        return {
          accent: 'text-orange-600',
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          line: 'bg-orange-300',
          dot: 'bg-orange-500',
          activeDot: 'bg-orange-600'
        };
      case 'education':
        return {
          accent: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          line: 'bg-blue-300',
          dot: 'bg-blue-500',
          activeDot: 'bg-blue-600'
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

  const getRailLabel = (startDate: string, endDate: string | null) => {
    const startYear = startDate.split('-')[0];
    if (!endDate) {
      return 'Present';
    }
    const endYear = endDate.split('-')[0];
    return startYear === endYear ? startYear : `${startYear}-${endYear}`;
  };

  const createSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleCardExpand = (cardId: string) => {
    if (isMobile) {
      const newExpanded = new Set(expandedCardsMobile);
      if (newExpanded.has(cardId)) {
        newExpanded.delete(cardId);
      } else {
        newExpanded.add(cardId);
      }
      setExpandedCardsMobile(newExpanded);
    } else {
      setExpandedCard(expandedCard === cardId ? null : cardId);
    }
  };

  const isCardExpanded = (cardId: string) => {
    return isMobile ? expandedCardsMobile.has(cardId) : expandedCard === cardId;
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[96px,1fr] gap-0">
        {/* Left Rail - Desktop Only */}
        {!isMobile && (
          <div className="hidden md:block relative">
            <div 
              ref={railRef}
              className="sticky top-20 h-screen"
            >
              {/* Vertical Line */}
              <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gray-200">
                <div 
                  className={`absolute top-0 w-full transition-all duration-300 ${colors.line}`}
                  style={{
                    height: activeYear ? '100%' : '0%'
                  }}
                />
              </div>

              {/* Year Markers */}
              <div className="relative">
                {yearGroups.map((group, groupIndex) => (
                  <div key={group.year} className="relative">
                    {group.items.map((item, itemIndex) => {
                      const year = item.start_date.split('-')[0];
                      const isActive = activeYear === year;
                      const cardId = `${category}-${year}-${createSlug(item.title)}`;
                      
                      return (
                        <div
                          key={item.id}
                          className="absolute left-12"
                          style={{
                            top: `${(groupIndex * 200) + (itemIndex * 30)}px`
                          }}
                        >
                          {/* Year Dot */}
                          <div className="relative -translate-x-1/2 -translate-y-1/2">
                            <div 
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                isActive ? colors.activeDot : colors.dot
                              } ${isActive ? 'scale-125 shadow-lg' : 'scale-100'}`}
                            />
                            
                            {/* Year Label */}
                            {itemIndex === 0 && (
                              <div className={`absolute left-6 top-1/2 -translate-y-1/2 text-sm font-medium whitespace-nowrap ${
                                isActive ? colors.accent : 'text-gray-600'
                              }`}>
                                {getRailLabel(item.start_date, item.end_date)}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Column - Cards */}
        <div className="space-y-6 md:space-y-8">
          {yearGroups.map((group, groupIndex) => (
            <div key={group.year} className="space-y-6 md:space-y-8">
              {group.items.map((item, itemIndex) => {
                const year = item.start_date.split('-')[0];
                const cardId = `${category}-${year}-${createSlug(item.title)}`;
                const isExpanded = isCardExpanded(cardId);
                const hasExpandableContent = item.bullets && item.bullets.length > 0;

                return (
                  <Card
                    key={item.id}
                    id={cardId}
                    data-year={year}
                    className="shadow-sm hover:shadow-md transition-all duration-300 rounded-lg"
                  >
                    <CardContent className="p-4 md:p-5">
                      {/* Mobile Date Chip */}
                      {isMobile && (
                        <div className="mb-3">
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                            {formatDateRange(item.start_date, item.end_date)}
                          </span>
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h3 
                            className={`text-lg font-semibold leading-tight mb-1 ${
                              item.links?.[0] ? 'cursor-pointer hover:' + colors.accent + ' transition-colors' : ''
                            }`}
                            onClick={() => item.links?.[0] && handleTitleClick(item)}
                            role={item.links?.[0] ? 'button' : 'heading'}
                            tabIndex={item.links?.[0] ? 0 : undefined}
                            onKeyDown={(e) => {
                              if (item.links?.[0] && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault();
                                handleTitleClick(item);
                              }
                            }}
                          >
                            {item.title}
                          </h3>

                          {/* Role */}
                          {item.role && (
                            <p className="text-sm text-gray-600 mb-1">{item.role}</p>
                          )}

                          {/* Organization & Location */}
                          <div className="text-sm text-gray-500 mb-2">
                            <span className="font-medium">{item.organization}</span>
                            {item.location && (
                              <>
                                <span className="mx-1">•</span>
                                <span>{item.location}</span>
                              </>
                            )}
                          </div>

                          {/* Desktop Date Range */}
                          {!isMobile && (
                            <div className="text-sm text-gray-500 mb-3">
                              {formatDateRange(item.start_date, item.end_date)}
                            </div>
                          )}

                          {/* Summary */}
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {item.summary}
                          </p>
                        </div>

                        {/* Expand Toggle */}
                        {hasExpandableContent && (
                          <button
                            onClick={() => handleCardExpand(cardId)}
                            className="ml-3 p-1 rounded-md hover:bg-gray-100 transition-colors"
                            aria-expanded={isExpanded}
                            aria-controls={`${cardId}-bullets`}
                            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                          >
                            {isExpanded ? (
                              <ChevronUp size={16} className="text-gray-500" aria-hidden="true" />
                            ) : (
                              <ChevronDown size={16} className="text-gray-500" aria-hidden="true" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Expandable Bullets */}
                      {hasExpandableContent && isExpanded && (
                        <div 
                          id={`${cardId}-bullets`}
                          className="mt-4 pt-4 border-t border-gray-100 animate-fade-up"
                        >
                          <ul className="space-y-2 text-sm text-gray-600">
                            {item.bullets?.map((bullet, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className={`${colors.accent} mr-2 flex-shrink-0 mt-0.5`} aria-hidden="true">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Links */}
                      {item.links && item.links.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                          {item.links.map((link, idx) => (
                            <div key={idx} className="flex gap-2">
                              <button
                                onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                              >
                                <span>{link.label}</span>
                                <ExternalLink size={12} aria-hidden="true" />
                              </button>
                              
                              {link.label.toLowerCase().includes('doi') && (
                                <button
                                  onClick={() => copyToClipboard(link.url)}
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                                  title="Copy DOI"
                                >
                                  <Copy size={12} aria-hidden="true" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalTimeline;
export type { TimelineItem, TimelineLink };
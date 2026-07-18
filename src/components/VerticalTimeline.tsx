import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import Reveal from '@/components/Reveal';

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
  detailsLabel: string;
}

// Compact token-based timeline (used by Education). Case studies render
// through their own editorial layout in Experience.tsx.
const VerticalTimeline = ({ items, detailsLabel }: VerticalTimelineProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sortedItems = [...items].sort(
    (a, b) => new Date(`${b.start_date}-01`).getTime() - new Date(`${a.start_date}-01`).getTime(),
  );

  const formatDateRange = (startDate: string, endDate: string | null) => {
    const fmt = (d: string) =>
      new Date(`${d}-01`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${fmt(startDate)} – ${endDate ? fmt(endDate) : 'Present'}`;
  };

  return (
    <div className="relative max-w-3xl border-l border-border pl-8 space-y-10">
      {sortedItems.map((item, index) => {
        const isExpanded = expandedId === item.id;
        const hasDetails = item.bullets && item.bullets.length > 0;

        return (
          <Reveal key={item.id} delay={index * 60}>
            <article className="relative">
              {/* Node marker on the rail */}
              <span
                className="absolute -left-8 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background"
                aria-hidden="true"
              />

              <div
                className={hasDetails ? 'cursor-pointer group' : ''}
                onClick={() => hasDetails && setExpandedId(isExpanded ? null : item.id)}
                role={hasDetails ? 'button' : undefined}
                tabIndex={hasDetails ? 0 : undefined}
                onKeyDown={(e) => {
                  if (hasDetails && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    setExpandedId(isExpanded ? null : item.id);
                  }
                }}
                aria-expanded={hasDetails ? isExpanded : undefined}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground mb-1">
                      {formatDateRange(item.start_date, item.end_date)}
                    </p>
                    <h3 className="font-display text-lg font-medium text-foreground">
                      {item.title}
                    </h3>
                    {item.role && <p className="mt-0.5 text-sm text-accent">{item.role}</p>}
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.organization}
                      {item.location && ` · ${item.location}`}
                    </p>
                  </div>
                  {hasDetails && (
                    <ChevronDown
                      size={18}
                      className={`mt-1 shrink-0 text-muted-foreground transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-accent' : ''
                      }`}
                    />
                  )}
                </div>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
              </div>

              {hasDetails && isExpanded && (
                <div className="mt-4 border-l-2 border-accent/40 pl-4 animate-fade-up">
                  <p className="eyebrow mb-2">{detailsLabel}</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {item.bullets?.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              )}

              {item.links && item.links.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-background px-3 py-1 font-mono text-xs text-foreground transition-colors hover:border-accent/60 hover:text-accent"
                    >
                      {link.label}
                      <ExternalLink size={11} />
                    </a>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        );
      })}
    </div>
  );
};

export default VerticalTimeline;
export type { TimelineItem, TimelineLink };

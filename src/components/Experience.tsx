import { useState, useEffect } from 'react';
import { ChevronDown, ExternalLink, Copy } from 'lucide-react';
import { TimelineItem } from '@/components/VerticalTimeline';
import TimelineSkeleton from '@/components/skeletons/TimelineSkeleton';
import { useLanguage } from '@/components/language-provider';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

interface ExperienceData {
  updated_at: string;
  items: TimelineItem[];
}

const formatDateRange = (startDate: string, endDate: string | null) => {
  const fmt = (d: string) =>
    new Date(`${d}-01`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  return `${fmt(startDate)} – ${endDate ? fmt(endDate) : 'Present'}`;
};

const CaseStudyRow = ({
  item,
  index,
  detailsLabel,
}: {
  item: TimelineItem;
  index: number;
  detailsLabel: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = item.bullets && item.bullets.length > 0;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Reveal delay={index * 80}>
      <article className="border-b border-border py-10 md:py-12">
        <div className="grid gap-x-8 gap-y-4 md:grid-cols-[auto_1fr]">
          <span className="font-mono text-2xl md:text-3xl text-accent/80 leading-none pt-1">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div>
            <div
              className={`flex items-start justify-between gap-4 ${hasDetails ? 'cursor-pointer' : ''}`}
              onClick={() => hasDetails && setExpanded(!expanded)}
              role={hasDetails ? 'button' : undefined}
              tabIndex={hasDetails ? 0 : undefined}
              onKeyDown={(e) => {
                if (hasDetails && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  setExpanded(!expanded);
                }
              }}
              aria-expanded={hasDetails ? expanded : undefined}
            >
              <div>
                <h3 className="font-display text-xl md:text-2xl font-medium text-foreground">
                  {item.title}
                </h3>
                {item.role && <p className="mt-1 text-sm text-accent">{item.role}</p>}
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  {item.organization}
                  {item.location && ` · ${item.location}`}
                  {' · '}
                  {formatDateRange(item.start_date, item.end_date)}
                </p>
              </div>
              {hasDetails && (
                <ChevronDown
                  size={20}
                  className={`mt-1 shrink-0 text-muted-foreground transition-transform duration-300 ${
                    expanded ? 'rotate-180 text-accent' : ''
                  }`}
                />
              )}
            </div>

            <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{item.summary}</p>

            {hasDetails && expanded && (
              <div className="mt-6 max-w-3xl border-l-2 border-accent/40 pl-5 animate-fade-up">
                <p className="eyebrow mb-3">{detailsLabel}</p>
                <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {item.bullets?.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            )}

            {item.links && item.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {item.links.map((link, idx) => (
                  <span key={idx} className="flex gap-1">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-background px-3 py-1 font-mono text-xs text-foreground transition-colors hover:border-accent/60 hover:text-accent"
                    >
                      {link.label}
                      <ExternalLink size={11} />
                    </a>
                    {link.label.toLowerCase().includes('doi') && (
                      <button
                        onClick={() => copyToClipboard(link.url)}
                        className="inline-flex items-center rounded-sm border border-border bg-background px-2 py-1 text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                        title="Copy DOI"
                      >
                        <Copy size={11} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
};

const Experience = () => {
  const { t } = useLanguage();
  const [experienceData, setExperienceData] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/experience.json');

        if (!response.ok) {
          throw new Error(`Failed to fetch experience data: ${response.status}`);
        }

        const data: ExperienceData = await response.json();
        setExperienceData(data.items);
        setError(null);
      } catch (err) {
        console.error('Error fetching experience:', err);
        setError(err instanceof Error ? err.message : 'Failed to load experience data');
        setExperienceData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  const sortedItems = [...experienceData].sort(
    (a, b) => new Date(`${b.start_date}-01`).getTime() - new Date(`${a.start_date}-01`).getTime(),
  );

  return (
    <Section id="experience" index="03" title={t('experience.title')} lede={t('experience.description')}>
      {loading && <TimelineSkeleton items={3} />}
      {error && (
        <p className="text-destructive">
          {t('experience.errorLoading')} {error}
        </p>
      )}
      {!loading && !error && (
        <div className="border-t border-border">
          {sortedItems.map((item, index) => (
            <CaseStudyRow
              key={item.id}
              item={item}
              index={index}
              detailsLabel={t('experience.caseStudyLabel')}
            />
          ))}
        </div>
      )}
    </Section>
  );
};

export default Experience;

import { useState, useEffect } from 'react';
import { ChevronDown, ExternalLink, Copy } from 'lucide-react';
import TimelineSkeleton from '@/components/skeletons/TimelineSkeleton';
import { useLanguage } from '@/components/language-provider';
import { Localized, pickLocalized } from '@/lib/i18n';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

interface TimelineLink {
  label: Localized;
  url: string;
}

// Text fields are Localized: {en, fr} objects in the hand-maintained JSON,
// plain strings when the LinkedIn sync script rewrites the file (FR then
// falls back to the English text).
interface TimelineItem {
  id: string;
  category: 'experience' | 'education';
  start_date: string; // "YYYY-MM"
  end_date: string | null; // "YYYY-MM" or null
  title: Localized;
  role?: Localized;
  organization: string;
  location?: string;
  summary: Localized;
  bullets?: Localized[];
  links?: TimelineLink[];
}

interface ExperienceData {
  updated_at: string;
  items: TimelineItem[];
}

const formatDateRange = (
  startDate: string,
  endDate: string | null,
  locale: string,
  presentLabel: string,
) => {
  const fmt = (d: string) =>
    new Date(`${d}-01`).toLocaleDateString(locale, { month: 'short', year: 'numeric' });
  return `${fmt(startDate)} – ${endDate ? fmt(endDate) : presentLabel}`;
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
  const { language, t } = useLanguage();
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
      <article className="border-b border-border py-9 md:py-10">
        <div className="grid gap-x-8 gap-y-4 md:grid-cols-[84px_1fr] lg:grid-cols-[84px_1fr_220px]">
          <span className="font-display text-3xl md:text-4xl font-bold text-border leading-none pt-1" aria-hidden="true">
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
                <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                  {pickLocalized(item.title, language)}
                </h3>
                <p className="mt-1.5 text-[13.5px] font-semibold text-accent">
                  {item.role && `${pickLocalized(item.role, language)} · `}
                  {item.organization}
                  {item.location && ` · ${item.location}`}
                  {' · '}
                  {formatDateRange(
                    item.start_date,
                    item.end_date,
                    language === 'fr' ? 'fr-FR' : 'en-US',
                    t('experience.present'),
                  )}
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

            <p className="mt-3.5 max-w-3xl leading-relaxed text-muted-foreground">
              {pickLocalized(item.summary, language)}
            </p>

            {hasDetails && expanded && (
              <div className="mt-6 max-w-3xl border-l-2 border-accent/40 pl-5 animate-fade-up">
                <p className="eyebrow mb-3">{detailsLabel}</p>
                <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {item.bullets?.map((bullet, idx) => (
                    <li key={idx}>{pickLocalized(bullet, language)}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Reference layout: link buttons right-aligned in their own column */}
          {item.links && item.links.length > 0 && (
            <div className="md:col-start-2 lg:col-start-3 flex flex-wrap gap-2 lg:flex-col lg:items-end lg:justify-self-end lg:text-right">
              {item.links.map((link, idx) => (
                <span key={idx} className="flex gap-1">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary-light"
                  >
                    {pickLocalized(link.label, language)}
                    <ExternalLink size={12} className="shrink-0" />
                  </a>
                  {pickLocalized(link.label, language).toLowerCase().includes('doi') && (
                    <button
                      onClick={() => copyToClipboard(link.url)}
                      className="inline-flex items-center rounded-md border border-border px-2.5 py-1.5 text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                      title={t('publications.copyDoi')}
                    >
                      <Copy size={12} />
                    </button>
                  )}
                </span>
              ))}
            </div>
          )}
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

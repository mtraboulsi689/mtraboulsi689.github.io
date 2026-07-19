import { useState, useEffect } from 'react';
import { FileText, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import PublicationsSkeleton from '@/components/skeletons/PublicationsSkeleton';
import { useLanguage } from '@/components/language-provider';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { useCountUp } from '@/hooks/use-count-up';

interface Publication {
  id: string;
  title: string;
  year: number | null;
  venue: string;
  doi: string | null;
  url: string;
  isOpenAccess: boolean;
  openAccessUrl: string | null;
  type: string;
  category: string;
  authors: string[];
  citedByCount: number;
  abstract: string | null;
  abstractTeaser: string | null;
}

interface PublicationsData {
  updated_at: string;
  total_count: number;
  items: Publication[];
}

const formatCategory = (category: string) =>
  category.charAt(0).toUpperCase() + category.slice(1);

const StatValue = ({ value }: { value: number }) => {
  const { ref, value: displayed } = useCountUp(value);
  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>{displayed}</span>
  );
};

const PublicationRow = ({ publication, index }: { publication: Publication; index: number }) => {
  const [showFullAbstract, setShowFullAbstract] = useState(false);
  const [showAllAuthors, setShowAllAuthors] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyDOI = async () => {
    if (!publication.doi) return;
    try {
      await navigator.clipboard.writeText(publication.doi);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy DOI:', err);
    }
  };

  const displayAuthors =
    showAllAuthors || publication.authors.length <= 3
      ? publication.authors
      : publication.authors.slice(0, 3);

  return (
    <Reveal delay={Math.min(index * 60, 240)}>
      <article className="grid grid-cols-[auto_1fr] md:grid-cols-[64px_1fr_auto] gap-x-6 md:gap-x-8 border-b border-border py-7">
        <span className="font-display text-base font-bold text-accent pt-0.5">
          {publication.year ?? '—'}
        </span>

        <div>
          <a href={publication.url} target="_blank" rel="noopener noreferrer" className="group block">
            <h3 className="font-display text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
              {publication.title}
            </h3>
          </a>

          {publication.venue && publication.venue !== 'Unknown Venue' && (
            <p className="mt-1 text-sm italic text-muted-foreground">{publication.venue}</p>
          )}

          <p className="mt-2 text-sm text-muted-foreground">
            {displayAuthors.join(', ')}
            {publication.authors.length > 3 && (
              <>
                {' '}
                <button
                  onClick={() => setShowAllAuthors(!showAllAuthors)}
                  className="font-medium text-accent hover:text-accent/80"
                >
                  {showAllAuthors ? 'show less' : `+${publication.authors.length - 3} more`}
                </button>
              </>
            )}
          </p>

          {publication.abstractTeaser && (
            <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <p>{showFullAbstract ? publication.abstract : publication.abstractTeaser}</p>
              {publication.abstract && publication.abstract !== publication.abstractTeaser && (
                <button
                  onClick={() => setShowFullAbstract(!showFullAbstract)}
                  className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent/80"
                >
                  {showFullAbstract ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  {showFullAbstract ? 'Show less' : 'Read full abstract'}
                </button>
              )}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {publication.citedByCount > 0 && (
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                {publication.citedByCount} cit.
              </span>
            )}
            {publication.doi && (
              <button
                onClick={copyDOI}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                title={copied ? 'DOI copied!' : 'Click to copy DOI'}
              >
                {publication.doi.length > 30 ? `${publication.doi.split('/')[0]}/…` : publication.doi}
                <Copy size={11} className={copied ? 'text-accent' : ''} />
              </button>
            )}
          </div>
        </div>

        <div className="col-start-2 row-start-2 mt-3 flex flex-wrap gap-2 md:col-start-3 md:row-start-1 md:mt-0 md:max-w-[150px] md:justify-end">
          <span className="h-fit rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
            {formatCategory(publication.category)}
          </span>
          {publication.isOpenAccess && (
            <span className="h-fit rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
              OA
            </span>
          )}
        </div>
      </article>
    </Reveal>
  );
};

const Publications = () => {
  const { t } = useLanguage();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/publications.json');

        if (!response.ok) {
          throw new Error(`Failed to fetch publications: ${response.status}`);
        }

        const data: PublicationsData = await response.json();
        setPublications(data.items);
        setLastUpdated(data.updated_at);
        setError(null);
      } catch (err) {
        console.error('Error fetching publications:', err);
        setError(err instanceof Error ? err.message : 'Failed to load publications');
        setPublications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const totalCitations = publications.reduce((sum, pub) => sum + pub.citedByCount, 0);
  const openAccessCount = publications.filter((pub) => pub.isOpenAccess).length;
  const categoryCount = new Set(publications.map((p) => p.category)).size;

  // Never display a zero as if it were an accomplishment (citation counts lag
  // behind OpenAlex for recently published work).
  const stats = [
    { value: publications.length, label: t('publications.publicationsCount') },
    ...(totalCitations > 0 ? [{ value: totalCitations, label: t('publications.citations') }] : []),
    { value: openAccessCount, label: t('publications.openAccess') },
    { value: categoryCount, label: t('publications.categories') },
  ];

  return (
    <Section
      id="publications"
      index="04"
      title={t('publications.title')}
      lede={t('publications.description')}
      variant="sunken"
      className="border-y border-border"
    >
      {/* Stats row */}
      {!loading && !error && publications.length > 0 && (
        <Reveal>
          <dl className="mb-12 flex flex-wrap items-end gap-x-12 gap-y-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-[13px] text-muted-foreground">{stat.label}</dt>
                <dd className="order-1 font-display text-3xl font-bold text-foreground">
                  <StatValue value={stat.value} />
                </dd>
              </div>
            ))}
            {lastUpdated && (
              <p className="self-end pb-0.5 text-[13px] text-muted-foreground">
                {t('publications.lastUpdated')} {new Date(lastUpdated).toLocaleDateString()}
              </p>
            )}
          </dl>
        </Reveal>
      )}

      {/* Entry ledger */}
      {loading && <PublicationsSkeleton items={4} showMetrics={false} showFilters={false} />}
      {error && (
        <div className="text-muted-foreground">
          <FileText size={32} className="mb-3 text-destructive" />
          <h3 className="font-medium text-foreground mb-1">{t('publications.unableToLoad')}</h3>
          <p className="text-sm">{t('publications.dataUpdatedWeekly')}</p>
        </div>
      )}
      {!loading && !error && (
        <div className="border-t border-border">
          {publications.map((publication, index) => (
            <PublicationRow key={publication.id} publication={publication} index={index} />
          ))}
        </div>
      )}
    </Section>
  );
};

export default Publications;

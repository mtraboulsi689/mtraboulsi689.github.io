import { useState, useEffect } from 'react';
import { FileText, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import PublicationsSkeleton from '@/components/skeletons/PublicationsSkeleton';
import { useLanguage } from '@/components/language-provider';
import Reveal from '@/components/Reveal';

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
      <article className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10 border-b border-border py-8">
        <span className="font-mono text-sm text-muted-foreground pt-1">
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
                  className="font-medium text-accent hover:text-accent-light"
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
                  className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent-light"
                >
                  {showFullAbstract ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  {showFullAbstract ? 'Show less' : 'Read full abstract'}
                </button>
              )}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              {formatCategory(publication.category)}
            </span>
            {publication.isOpenAccess && (
              <span className="rounded-sm border border-accent/40 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-accent">
                OA
              </span>
            )}
            {publication.citedByCount > 0 && (
              <span className="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                {publication.citedByCount} cit.
              </span>
            )}
            {publication.doi && (
              <button
                onClick={copyDOI}
                className="inline-flex items-center gap-1.5 rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                title={copied ? 'DOI copied!' : 'Click to copy DOI'}
              >
                {publication.doi.length > 30 ? `${publication.doi.split('/')[0]}/…` : publication.doi}
                <Copy size={11} className={copied ? 'text-accent' : ''} />
              </button>
            )}
          </div>
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
    <section id="publications" className="py-20 md:py-28 bg-sunken">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <span className="font-mono text-sm text-accent">04</span>
            <span className="h-px flex-1 bg-border" />
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr]">
          {/* Sticky rail */}
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <h2 className="font-display font-semibold text-headline text-foreground">
                {t('publications.title')}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {t('publications.description')}
              </p>

              {!loading && !error && publications.length > 0 && (
                <dl className="mt-8 grid grid-cols-2 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col">
                      <dt className="order-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {stat.label}
                      </dt>
                      <dd className="order-1 font-display text-3xl font-semibold text-foreground">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {lastUpdated && (
                <p className="mt-8 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {t('publications.lastUpdated')} {new Date(lastUpdated).toLocaleDateString()}
                </p>
              )}
            </div>
          </Reveal>

          {/* Entry ledger */}
          <div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;

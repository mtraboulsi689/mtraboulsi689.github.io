import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Loader2, Copy, ChevronDown, ChevronUp, Users } from 'lucide-react';

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


const PublicationCard = ({ publication }: { publication: Publication }) => {
  const [showFullAbstract, setShowFullAbstract] = useState(false);
  const [showAllAuthors, setShowAllAuthors] = useState(false);
  const [copied, setCopied] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'article': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'conference': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'preprint': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'book': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'conference': return 'Conference';
      case 'preprint': return 'Preprint';
      case 'article': return 'Article';
      case 'book': return 'Book';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

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

  const openDOI = () => {
    if (!publication.doi) return;
    window.open(`https://doi.org/${publication.doi}`, '_blank');
  };

  const handleDOIClick = (e: React.MouseEvent) => {
    e.preventDefault();
    copyDOI();
  };

  const handleDOILongPress = (e: React.MouseEvent) => {
    e.preventDefault();
    openDOI();
  };

  const getDisplayAuthors = () => {
    if (showAllAuthors || publication.authors.length <= 3) {
      return publication.authors;
    }
    return publication.authors.slice(0, 3);
  };

  const getRemainingAuthorsCount = () => {
    return publication.authors.length - 3;
  };

  return (
    <Card className="shadow-coastal hover:shadow-ocean transition-all duration-300 group border-0">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title as primary clickable area */}
          <div>
            <a 
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <h3 className="text-lg font-semibold text-primary leading-tight hover:text-accent transition-colors cursor-pointer">
                {publication.title}
              </h3>
            </a>
          </div>

          {/* Venue and Year line */}
          <div className="text-sm text-muted-foreground">
            {publication.year && (
              <>
                {publication.year}
                {publication.venue && publication.venue !== 'Unknown Venue' && (
                  <> • {publication.venue}</>
                )}
              </>
            )}
          </div>

          {/* Authors */}
          <div className="text-sm">
            <span className="text-muted-foreground">
              {getDisplayAuthors().join(', ')}
              {!showAllAuthors && publication.authors.length > 3 && (
                <>
                  {' '}
                  <button 
                    onClick={() => setShowAllAuthors(true)}
                    className="text-accent hover:text-accent-light font-medium"
                  >
                    +{getRemainingAuthorsCount()} more
                  </button>
                </>
              )}
              {showAllAuthors && publication.authors.length > 3 && (
                <>
                  {' '}
                  <button 
                    onClick={() => setShowAllAuthors(false)}
                    className="text-accent hover:text-accent-light font-medium"
                  >
                    show less
                  </button>
                </>
              )}
            </span>
          </div>

          {/* Abstract teaser and expander */}
          {publication.abstractTeaser && (
            <div className="text-sm text-muted-foreground">
              <p className="leading-relaxed">
                {showFullAbstract ? publication.abstract : publication.abstractTeaser}
                {publication.abstract && publication.abstract !== publication.abstractTeaser && (
                  <>
                    {' '}
                    <button 
                      onClick={() => setShowFullAbstract(!showFullAbstract)}
                      className="text-accent hover:text-accent-light font-medium inline-flex items-center gap-1"
                    >
                      {showFullAbstract ? (
                        <>
                          Show less
                          <ChevronUp size={14} />
                        </>
                      ) : (
                        <>
                          Show abstract
                          <ChevronDown size={14} />
                        </>
                      )}
                    </button>
                  </>
                )}
              </p>
            </div>
          )}

          {/* Badges and DOI */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Category badge */}
              <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(publication.category)}`}>
                {formatCategory(publication.category)}
              </span>

              {/* Open Access badge */}
              {publication.isOpenAccess && (
                <span className="px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                  OA
                </span>
              )}

              {/* Citation count */}
              {publication.citedByCount > 0 && (
                <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 flex items-center gap-1">
                  <Users size={12} />
                  {publication.citedByCount}
                </span>
              )}
            </div>

            {/* DOI pill */}
            {publication.doi && (
              <button
                onClick={handleDOIClick}
                onContextMenu={handleDOILongPress}
                className="px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors flex items-center gap-1 group"
                title={copied ? 'DOI copied!' : 'Click to copy DOI, right-click to open'}
              >
                <span className="font-mono">
                  {publication.doi.length > 25 ? 
                    `${publication.doi.split('/')[0]}/...` : 
                    publication.doi
                  }
                </span>
                <Copy size={12} className={`transition-colors ${copied ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Publications = () => {
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
  const openAccessCount = publications.filter(pub => pub.isOpenAccess).length;
  const recentYears = publications.map(p => p.year).filter(y => y !== null);
  const yearRange = recentYears.length > 0 ? 
    `${Math.min(...recentYears)}-${Math.max(...recentYears)}` : 
    'N/A';
  const categoryCounts = publications.reduce((acc, pub) => {
    acc[pub.category] = (acc[pub.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <section id="publications" className="py-20 bg-gradient-coastal">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient-ocean">
              Publications & Research
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-lg text-muted-foreground">Loading publications from OpenAlex...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="publications" className="py-20 bg-gradient-coastal">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient-ocean">
              Publications & Research
            </h2>
            <Card className="max-w-2xl mx-auto shadow-coastal">
              <CardContent className="p-8">
                <div className="text-red-600 mb-4">
                  <FileText size={48} className="mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Unable to Load Publications</h3>
                  <p className="text-sm">{error}</p>
                </div>
                <p className="text-muted-foreground text-sm">
                  Publications data is automatically updated weekly from OpenAlex. Please try again later.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="publications" className="py-20 bg-gradient-coastal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            Publications & Research
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Research contributions in coastal engineering, fluid mechanics, and climate change impact assessment.
          </p>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {new Date(lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>

        {publications.length > 0 && (
          <>
            {/* Publications List */}
            <div className="max-w-4xl mx-auto space-y-4">
              {publications.map((publication, index) => (
                <div 
                  key={publication.id}
                  className="animate-fade-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <PublicationCard publication={publication} />
                </div>
              ))}
            </div>

            {/* Research Metrics */}
            <div className="mt-16 text-center">
              <Card className="max-w-4xl mx-auto shadow-coastal border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-primary">Research Impact</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">{publications.length}</div>
                      <div className="text-sm text-muted-foreground">Publications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">{totalCitations}</div>
                      <div className="text-sm text-muted-foreground">Citations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">{openAccessCount}</div>
                      <div className="text-sm text-muted-foreground">Open Access</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">{Object.keys(categoryCounts).length}</div>
                      <div className="text-sm text-muted-foreground">Categories</div>
                    </div>
                  </div>
                  
                  {/* Category breakdown */}
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {Object.entries(categoryCounts).map(([category, count]) => (
                      <span 
                        key={category}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {category}: {count}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Publications;
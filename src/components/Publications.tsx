import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Calendar, Users, Award, Quote, BookOpen, Loader2 } from 'lucide-react';

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
  authors: string[];
  citedByCount: number;
}

interface PublicationsData {
  updated_at: string;
  total_count: number;
  items: Publication[];
}


const PublicationCard = ({ publication }: { publication: Publication }) => {
  const getTypeIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('article')) return <FileText className="text-primary" size={20} />;
    if (lowerType.includes('book')) return <BookOpen className="text-purple-600" size={20} />;
    if (lowerType.includes('thesis') || lowerType.includes('dissertation')) return <Award className="text-purple-600" size={20} />;
    if (lowerType.includes('preprint')) return <Quote className="text-orange-600" size={20} />;
    return <FileText className="text-gray-600" size={20} />;
  };

  const formatType = (type: string) => {
    return type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card className="shadow-coastal hover:shadow-ocean transition-all duration-300 group">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            {getTypeIcon(publication.type)}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary leading-tight group-hover:text-accent transition-colors">
                {publication.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {publication.authors.join(', ')}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            {publication.isOpenAccess && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Open Access
              </span>
            )}
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {formatType(publication.type)}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Publication Details */}
          <div className="flex items-center flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>{publication.year || 'Year not specified'}</span>
            </div>
            {publication.venue && publication.venue !== 'Unknown Venue' && (
              <span className="font-medium text-primary">{publication.venue}</span>
            )}
            {publication.citedByCount > 0 && (
              <span className="font-medium text-accent">
                {publication.citedByCount} citation{publication.citedByCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button 
              variant="default"
              size="sm"
              className="bg-accent hover:bg-accent-light"
              asChild
            >
              <a 
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} className="mr-2" />
                View Publication
              </a>
            </Button>
            
            {publication.doi && (
              <Button 
                variant="outline"
                size="sm"
                asChild
              >
                <a 
                  href={`https://doi.org/${publication.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DOI: {publication.doi.length > 20 ? `${publication.doi.substring(0, 20)}...` : publication.doi}
                </a>
              </Button>
            )}

            {publication.isOpenAccess && publication.openAccessUrl && (
              <Button 
                variant="outline"
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50"
                asChild
              >
                <a 
                  href={publication.openAccessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText size={16} className="mr-2" />
                  Open Access
                </a>
              </Button>
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
  const [filter, setFilter] = useState<string>('all');
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

  const filteredPublications = filter === 'all' 
    ? publications 
    : publications.filter(pub => pub.type.toLowerCase().includes(filter.toLowerCase()));

  const typeCount = (type: string) => publications.filter(pub => 
    pub.type.toLowerCase().includes(type.toLowerCase())
  ).length;

  const totalCitations = publications.reduce((sum, pub) => sum + pub.citedByCount, 0);
  const openAccessCount = publications.filter(pub => pub.isOpenAccess).length;
  const recentYears = publications.map(p => p.year).filter(y => y !== null);
  const yearRange = recentYears.length > 0 ? 
    `${Math.min(...recentYears)}-${Math.max(...recentYears)}` : 
    'N/A';

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
            Data automatically updated from OpenAlex.
          </p>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {new Date(lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>

        {publications.length > 0 && (
          <>
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className="min-w-fit"
              >
                All ({publications.length})
              </Button>
              <Button
                variant={filter === 'article' ? 'default' : 'outline'}
                onClick={() => setFilter('article')}
                className="min-w-fit"
              >
                Articles ({typeCount('article')})
              </Button>
              <Button
                variant={filter === 'book' ? 'default' : 'outline'}
                onClick={() => setFilter('book')}
                className="min-w-fit"
              >
                Books ({typeCount('book')})
              </Button>
              <Button
                variant={filter === 'preprint' ? 'default' : 'outline'}
                onClick={() => setFilter('preprint')}
                className="min-w-fit"
              >
                Preprints ({typeCount('preprint')})
              </Button>
            </div>

            {/* Publications Grid */}
            <div className="max-w-4xl mx-auto space-y-6">
              {filteredPublications.map((publication, index) => (
                <div 
                  key={publication.id}
                  className="animate-fade-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <PublicationCard publication={publication} />
                </div>
              ))}
              
              {filteredPublications.length === 0 && (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground">No publications found for this filter.</p>
                </div>
              )}
            </div>

            {/* Research Metrics */}
            <div className="mt-16 text-center">
              <Card className="max-w-4xl mx-auto shadow-coastal">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-primary">Research Impact</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">{publications.length}</div>
                      <div className="text-sm text-muted-foreground">Publications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">{totalCitations}</div>
                      <div className="text-sm text-muted-foreground">Total Citations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">{openAccessCount}</div>
                      <div className="text-sm text-muted-foreground">Open Access</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">{yearRange}</div>
                      <div className="text-sm text-muted-foreground">Publication Years</div>
                    </div>
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
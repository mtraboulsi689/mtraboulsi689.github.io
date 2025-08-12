import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Calendar, Users, Award, Quote } from 'lucide-react';

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  conference?: string;
  year: number;
  type: 'journal' | 'conference' | 'thesis' | 'preprint' | 'blog';
  abstract: string;
  doi?: string;
  url?: string;
  citations?: number;
  tags: string[];
  status?: 'published' | 'accepted' | 'under-review' | 'draft';
}

const publicationsData: Publication[] = [
  {
    id: "1",
    title: "Morphodynamic modelling of shoreline change under sea-level rise",
    authors: ["Mohammad Traboulsi"],
    type: "thesis",
    year: 2025,
    abstract: "This PhD thesis investigates the morphodynamic processes governing shoreline evolution under climate change scenarios, with particular focus on sea-level rise impacts. The research develops and validates coupled numerical models (LX-ST) to predict long-term coastal changes.",
    tags: ["Coastal Engineering", "Climate Change", "Numerical Modeling", "Morphodynamics"],
    status: "draft"
  },
  {
    id: "2",
    title: "Correlations between Dynamic and Static Mechanical Properties of Clayey Soils",
    authors: ["Mohammad Traboulsi", "R. Al Wardany"],
    journal: "International Journal of Civil Engineering and Technology",
    year: 2019,
    abstract: "This research investigates the relationships between dynamic and static mechanical properties of clayey soils, contributing to improved understanding of soil behavior under varying loading conditions for civil engineering applications.",
    doi: "10.34218/IJCET.10.1.2019.260",
    url: "https://iaeme.com/Home/article_id/IJCET_10_01_260",
    tags: ["Soil Mechanics", "Geotechnical Engineering", "Material Properties"],
    status: "published"
  },
  {
    id: "3",
    title: "Enhanced LX-Shore Model for Long-term Coastal Evolution Assessment",
    authors: ["Mohammad Traboulsi", "BRGM Research Team"],
    type: "preprint",
    year: 2024,
    abstract: "Development of enhanced coastal modeling capabilities through integration of the ShoreTrans module with LX-Shore code. The study presents improved accuracy in predicting long-term shoreline evolution under climate change scenarios.",
    tags: ["Coastal Modeling", "LX-Shore", "Climate Impact", "Sediment Transport"],
    status: "under-review"
  },
  {
    id: "4",
    title: "Multi-scenario Climate Impact Assessment on Gironde Estuary Hydrodynamics",
    authors: ["Mohammad Traboulsi", "Cerema Research Team"],
    conference: "European Conference on Coastal Engineering",
    year: 2022,
    abstract: "Comprehensive hydrodynamic modeling study using Telemac3D & Telemac2D to assess climate change impacts on France's largest estuary. The study analyzes flood and drought scenarios with projections up to 2100.",
    tags: ["Estuarine Dynamics", "Telemac", "Climate Scenarios", "Hydrodynamic Modeling"],
    status: "published"
  }
];

const PublicationCard = ({ publication }: { publication: Publication }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'journal': return <FileText className="text-primary" size={20} />;
      case 'conference': return <Users className="text-accent" size={20} />;
      case 'thesis': return <Award className="text-purple-600" size={20} />;
      case 'preprint': return <Quote className="text-orange-600" size={20} />;
      default: return <FileText className="text-gray-600" size={20} />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          {publication.status && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(publication.status)}`}>
              {publication.status.replace('-', ' ')}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Publication Details */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>{publication.year}</span>
            </div>
            {publication.journal && (
              <span className="font-medium text-primary">{publication.journal}</span>
            )}
            {publication.conference && (
              <span className="font-medium text-accent">{publication.conference}</span>
            )}
          </div>

          {/* Abstract */}
          <p className="text-muted-foreground leading-relaxed">
            {publication.abstract}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {publication.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {publication.url && (
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
            )}
            
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
                  DOI: {publication.doi}
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
  const [filter, setFilter] = useState<string>('all');
  
  const filteredPublications = filter === 'all' 
    ? publicationsData 
    : publicationsData.filter(pub => pub.type === filter);

  const typeCount = (type: string) => publicationsData.filter(pub => pub.type === type).length;

  return (
    <section id="publications" className="py-20 bg-gradient-coastal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            Publications & Research
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Research contributions in coastal engineering, fluid mechanics, and climate change impact assessment 
            across international journals, conferences, and technical reports.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="min-w-fit"
          >
            All ({publicationsData.length})
          </Button>
          <Button
            variant={filter === 'journal' ? 'default' : 'outline'}
            onClick={() => setFilter('journal')}
            className="min-w-fit"
          >
            Journal Papers ({typeCount('journal')})
          </Button>
          <Button
            variant={filter === 'conference' ? 'default' : 'outline'}
            onClick={() => setFilter('conference')}
            className="min-w-fit"
          >
            Conference Papers ({typeCount('conference')})
          </Button>
          <Button
            variant={filter === 'thesis' ? 'default' : 'outline'}
            onClick={() => setFilter('thesis')}
            className="min-w-fit"
          >
            Thesis ({typeCount('thesis')})
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
        </div>

        {/* Research Metrics */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto shadow-coastal">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-primary">Research Impact</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">{publicationsData.length}</div>
                  <div className="text-sm text-muted-foreground">Publications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">2</div>
                  <div className="text-sm text-muted-foreground">Research Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">3</div>
                  <div className="text-sm text-muted-foreground">Institutions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">2022</div>
                  <div className="text-sm text-muted-foreground">Started PhD</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Publications;
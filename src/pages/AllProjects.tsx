import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, BarChart3, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Project {
  title: string;
  link: string;
  description: string;
  image?: string;
  githubLink?: string;
}

const AllProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/index.md');
        const text = await response.text();
        const parsedProjects = parseMarkdown(text);
        setProjects(parsedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const parseMarkdown = (markdown: string): Project[] => {
    const projects: Project[] = [];
    
    // Split by --- to get individual project sections
    const sections = markdown.split('---').filter(section => section.trim());
    
    sections.forEach(section => {
      const lines = section.trim().split('\n').filter(line => line.trim());
      
      // Skip sections that don't have links (like headers or "Other Projects")
      const linkLine = lines.find(line => line.includes(']('));
      if (!linkLine) return;
      
      // Extract title and link from markdown link format [title](link)
      const linkMatch = linkLine.match(/\[(.+?)\]\((.+?)\)/);
      if (!linkMatch) return;
      
      const title = linkMatch[1];
      const link = linkMatch[2];
      
      // Extract description (text that's not a link, image, or header)
      const description = lines
        .filter(line => 
          !line.includes('](') && 
          !line.startsWith('#') && 
          !line.startsWith('<img') &&
          line.trim() !== ''
        )
        .join(' ')
        .trim();
      
      // Extract image if present
      const imgLine = lines.find(line => line.startsWith('<img'));
      let image;
      if (imgLine) {
        const imgMatch = imgLine.match(/src="(.+?)"/);
        if (imgMatch) {
          image = imgMatch[1];
        }
      }
      
      // Look for GitHub link
      const githubLine = lines.find(line => 
        line.toLowerCase().includes('github') && line.includes('](')
      );
      let githubLink;
      if (githubLine) {
        const githubMatch = githubLine.match(/\[.+?\]\((.+?)\)/);
        if (githubMatch) {
          githubLink = githubMatch[1];
        }
      }
      
      projects.push({
        title,
        link,
        description,
        image,
        githubLink
      });
    });
    
    return projects;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gradient-ocean">
                All Projects
              </h1>
              <p className="text-xl text-muted-foreground">Loading projects...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6 space-x-4">
              <Button 
                variant="ghost"
                size="sm"
                asChild
                className="text-muted-foreground hover:text-primary"
              >
                <Link to="/">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Portfolio
                </Link>
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                asChild
                className="text-muted-foreground hover:text-primary"
              >
                <Link to="/#projects">
                  <Home size={16} className="mr-2" />
                  Featured Projects
                </Link>
              </Button>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient-ocean">
              All Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete collection of data science and technical projects showcasing expertise in 
              machine learning, data analysis, statistical modeling, and engineering applications.
            </p>
            <p className="text-lg text-muted-foreground mt-4">
              {projects.length} projects • Various domains and technologies
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div key={index} className="animate-fade-up" style={{animationDelay: `${index * 0.05}s`}}>
                <Card className="h-full shadow-coastal hover:shadow-ocean transition-all duration-300 group">
                  {project.image && (
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Hide image if it fails to load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-base font-semibold text-primary group-hover:text-accent transition-colors leading-tight">
                        {project.title}
                      </span>
                      <BarChart3 className="text-accent flex-shrink-0 ml-2" size={18} />
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col pt-0">
                    <p className="text-muted-foreground mb-4 flex-1 leading-relaxed text-sm">
                      {project.description.length > 120 
                        ? `${project.description.substring(0, 120)}...` 
                        : project.description
                      }
                    </p>
                    
                    <div className="flex gap-2 mt-auto">
                      <Button 
                        variant="default"
                        size="sm"
                        className="flex-1 bg-accent hover:bg-accent-light text-xs"
                        asChild
                      >
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          View
                        </a>
                      </Button>
                      
                      {project.githubLink && (
                        <Button 
                          variant="outline"
                          size="sm"
                          className="px-2"
                          asChild
                        >
                          <a 
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github size={14} />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* GitHub Repository Link */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto shadow-coastal">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Explore More</h3>
                <p className="text-muted-foreground mb-6">
                  Looking for more projects? Check out the complete repository with source code, 
                  documentation, and additional resources.
                </p>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  asChild
                >
                  <a
                    href="https://github.com/mtraboulsi689?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={20} className="mr-2" />
                    View Repository on GitHub
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllProjects;
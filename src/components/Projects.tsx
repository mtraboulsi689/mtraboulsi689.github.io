import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, BarChart3 } from 'lucide-react';

interface Project {
  title: string;
  link: string;
  description: string;
  image?: string;
  githubLink?: string;
}

const Projects = () => {
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
      <section id="projects" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
              Projects
            </h2>
            <p className="text-xl text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of data science and technical projects showcasing expertise in 
            machine learning, data analysis, and statistical modeling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project, index) => (
            <div key={index} className="animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
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
                
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
                      {project.title}
                    </span>
                    <BarChart3 className="text-accent" size={20} />
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex gap-3 mt-auto">
                    <Button 
                      variant="default"
                      size="sm"
                      className="flex-1 bg-accent hover:bg-accent-light"
                      asChild
                    >
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        View Project
                      </a>
                    </Button>
                    
                    {project.githubLink && (
                      <Button 
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a 
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={16} />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Link to external projects page */}
        {projects.length > 3 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              asChild
            >
              <a 
                href="https://github.com/user689/Data-Analysis-Projects"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BarChart3 size={20} className="mr-2" />
                View All Projects on GitHub
                <ExternalLink size={16} className="ml-2" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

interface Project {
  title: string;
  link: string;
  description: string;
  image?: string;
  githubLink?: string;
}

const Projects = () => {
  const { t } = useLanguage();
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

      projects.push({ title, link, description });
    });

    return projects;
  };

  return (
    <Section id="projects" index="05" title={t('projects.title')} lede={t('projects.description')}>
      {loading ? (
        <p className="font-mono text-sm text-muted-foreground">{t('common.loading')}</p>
      ) : (
        <div className="border-t border-border">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 80}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-b border-border py-6 md:py-7 transition-colors hover:bg-sunken"
              >
                <span>
                  <span className="font-mono text-base md:text-lg text-foreground transition-colors group-hover:text-accent">
                    {project.title}
                  </span>
                  <span className="mt-1.5 block max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="self-center text-muted-foreground transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
};

export default Projects;

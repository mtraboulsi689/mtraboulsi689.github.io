import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { Localized, pickLocalized } from '@/lib/i18n';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

interface Project {
  id: string;
  title: Localized;
  link: string;
  description: Localized;
}

interface ProjectsData {
  updated_at: string;
  items: Project[];
}

interface SkillGroup {
  titleKey: 'skills.programmingTitle' | 'skills.analysisTitle' | 'skills.toolsTitle';
  names: Localized[];
}

const skillGroups: SkillGroup[] = [
  {
    titleKey: 'skills.programmingTitle',
    names: ['Python', 'MATLAB', 'Fortran', 'R', 'C/C++'],
  },
  {
    titleKey: 'skills.analysisTitle',
    names: [
      'OpenFOAM',
      'Telemac',
      { en: 'Data Analysis', fr: 'Analyse de données' },
      { en: 'GIS & Remote Sensing', fr: 'SIG & Télédétection' },
      { en: 'Statistics & ML', fr: 'Statistiques & ML' },
    ],
  },
  {
    titleKey: 'skills.toolsTitle',
    names: ['LaTeX', 'Git & GitHub', 'Linux/HPC', 'Docker'],
  },
];

const Projects = () => {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        const data: ProjectsData = await response.json();
        setProjects(data.items);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Section id="projects" index="05" title={t('projects.title')} lede={t('projects.description')}>
      {loading ? (
        <p className="text-sm text-muted-foreground">{t('common.loading')}</p>
      ) : (
        <div className="grid gap-7 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 80}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-8 hover-raise"
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                    {pickLocalized(project.title, language)}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 self-center text-muted-foreground transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">
                  {pickLocalized(project.description, language)}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      )}

      {/* Technical skills: dark cards, evidence not sales pitch */}
      <div id="skills" className="mt-20 scroll-mt-24">
        <Reveal>
          <h3 className="mb-8 font-display text-2xl font-semibold text-foreground">
            {t('skills.title')}
          </h3>
        </Reveal>
        <div className="grid gap-7 md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.titleKey} delay={i * 80}>
              <div className="h-full rounded-xl bg-abyss p-7">
                <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.04em] text-gold">
                  {t(group.titleKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.names.map((name) => {
                    const label = pickLocalized(name, language);
                    return (
                      <span
                        key={label}
                        className="rounded-md bg-abyss-card px-3 py-1.5 text-[13px] text-white"
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Projects;

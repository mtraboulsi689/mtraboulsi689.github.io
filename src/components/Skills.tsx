
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Database, Wrench, TrendingUp, ExternalLink } from 'lucide-react';
import { useLoading } from '@/components/loading-provider';
import SkillsSkeleton from '@/components/skeletons/SkillsSkeleton';
import { useLanguage } from '@/components/language-provider';
import { useState } from 'react';

interface SkillData {
  name: string;
  category: 'programming' | 'analysis' | 'tools';
  description: string;
  examples: string[];
  projects?: string[];
}

const skills: SkillData[] = [
  // Programming
  { 
    name: 'Python', 
    category: 'programming',
    description: 'Primary language for data analysis, numerical modeling, and automation',
    examples: ['NumPy/SciPy for numerical analysis', 'Pandas for data processing', 'Matplotlib/Seaborn for visualization'],
    projects: ['OpenAlex publication fetcher', 'LX-ST coastal modeling coupling']
  },
  { 
    name: 'MATLAB', 
    category: 'programming',
    description: 'Engineering computation and algorithm development',
    examples: ['Signal processing toolbox', 'Symbolic math', 'Custom visualization functions'],
    projects: ['Turbulence analysis algorithms', 'Wave dynamics modeling']
  },
  { 
    name: 'Fortran', 
    category: 'programming',
    description: 'High-performance numerical computing',
    examples: ['Modified Telemac modules', 'Custom sediment transport algorithms'],
    projects: ['LX-Shore enhancements', 'ShoreTrans integration']
  },
  { 
    name: 'R', 
    category: 'programming',
    description: 'Statistical analysis and data visualization',
    examples: ['ggplot2 for publication plots', 'Statistical modeling', 'Time series analysis'],
    projects: ['Climate data analysis', 'Hydrodynamic pattern studies']
  },
  { 
    name: 'C/C++', 
    category: 'programming',
    description: 'System programming and performance optimization',
    examples: ['OpenFOAM custom solvers', 'Memory-efficient algorithms'],
    projects: ['Coastal model optimization', 'Custom boundary conditions']
  },
  
  // Analysis & Modeling
  { 
    name: 'OpenFOAM', 
    category: 'analysis',
    description: 'Computational fluid dynamics and free-surface flows',
    examples: ['Wave modeling', 'Sediment transport', 'Custom solvers'],
    projects: ['Coastal erosion studies', 'Wave-structure interaction']
  },
  { 
    name: 'Telemac', 
    category: 'analysis',
    description: 'Hydrodynamic and morphodynamic modeling',
    examples: ['2D/3D estuarine models', 'Sediment transport', 'Flood modeling'],
    projects: ['Gironde estuary climate impact', 'LX-ST coupling development']
  },
  { 
    name: 'Data Analysis', 
    category: 'analysis',
    description: 'Statistical analysis and pattern recognition',
    examples: ['Time series analysis', 'Machine learning', 'Signal processing'],
    projects: ['Climate change projections', 'Coastal evolution trends']
  },
  { 
    name: 'GIS & Remote Sensing', 
    category: 'analysis',
    description: 'Geospatial analysis and coastal monitoring',
    examples: ['Shoreline change detection', 'Bathymetry analysis', 'Satellite imagery'],
    projects: ['Coastal vulnerability assessment', 'Long-term shoreline evolution']
  },
  { 
    name: 'Statistics & ML', 
    category: 'analysis',
    description: 'Statistical modeling and machine learning applications',
    examples: ['Regression analysis', 'Classification algorithms', 'Uncertainty quantification'],
    projects: ['Climate scenario analysis', 'Coastal prediction models']
  },
  
  // Tools & Technologies
  { 
    name: 'LaTeX', 
    category: 'tools',
    description: 'Scientific document preparation and typesetting',
    examples: ['Research papers', 'Thesis writing', 'Conference presentations'],
    projects: ['PhD thesis', 'International publications']
  },
  { 
    name: 'Git & GitHub', 
    category: 'tools',
    description: 'Version control and collaborative development',
    examples: ['Code versioning', 'CI/CD workflows', 'Collaborative projects'],
    projects: ['Portfolio automation', 'Research code management']
  },
  { 
    name: 'Linux/HPC', 
    category: 'tools',
    description: 'High-performance computing and cluster management',
    examples: ['Slurm job scheduling', 'Shell scripting', 'System administration'],
    projects: ['Large-scale coastal simulations', 'Climate model runs']
  },
  { 
    name: 'Docker', 
    category: 'tools',
    description: 'Containerization for reproducible research',
    examples: ['Model deployment', 'Environment standardization', 'Workflow automation'],
    projects: ['Reproducible modeling pipelines', 'Cloud deployments']
  }
];

const SkillCard = ({ title, icon: Icon, skillList, color }: {
  title: string;
  icon: any;
  skillList: SkillData[];
  color: string;
}) => {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const toggleSkill = (skillName: string) => {
    setExpandedSkill(expandedSkill === skillName ? null : skillName);
  };

  return (
    <Card className="shadow-coastal hover:shadow-ocean transition-all duration-300 group">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 text-lg">
          <Icon className={`${color} group-hover:scale-110 transition-transform`} size={20} />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {skillList.map((skill, index) => (
          <div key={index}>
            {/* Clickable skill name */}
            <button
              onClick={() => toggleSkill(skill.name)}
              className="w-full text-left p-2 rounded-md hover:bg-muted/50 transition-colors duration-200 group/skill"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm group-hover/skill:text-accent transition-colors">
                  {skill.name}
                </span>
                <ExternalLink 
                  size={12} 
                  className={`transition-all duration-200 ${
                    expandedSkill === skill.name ? 'rotate-90 text-accent' : 'text-muted-foreground group-hover/skill:text-accent'
                  }`} 
                />
              </div>
            </button>

            {/* Expandable details */}
            {expandedSkill === skill.name && (
              <div className="mt-2 p-3 bg-muted/30 rounded-md border-l-2 border-accent animate-fade-up">
                <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                  {skill.description}
                </p>
                
                {skill.examples.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-medium text-primary mb-1">{t('skills.applications')}</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {skill.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-accent mr-1 flex-shrink-0">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {skill.projects && skill.projects.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-primary mb-1">{t('skills.recentProjects')}</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {skill.projects.map((project, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-accent mr-1 flex-shrink-0">→</span>
                          <span className="italic">{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const Skills = () => {
  const { loading } = useLoading();
  const { t } = useLanguage();
  const programmingSkills = skills.filter(skill => skill.category === 'programming');
  const analysisSkills = skills.filter(skill => skill.category === 'analysis');
  const toolSkills = skills.filter(skill => skill.category === 'tools');

  return (
    <section id="skills" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('skills.clickToSeeMore')}
          </p>
        </div>

        {loading.skills ? (
          <SkillsSkeleton />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="animate-fade-up">
              <SkillCard
                title={t('skills.programmingTitle')}
                icon={Code}
                skillList={programmingSkills}
                color="text-primary"
              />
            </div>
            
            <div className="animate-fade-up" style={{animationDelay: '0.1s'}}>
              <SkillCard
                title={t('skills.analysisTitle')}
                icon={TrendingUp}
                skillList={analysisSkills}
                color="text-accent"
              />
            </div>
            
            <div className="animate-fade-up" style={{animationDelay: '0.2s'}}>
              <SkillCard
                title={t('skills.toolsTitle')}
                icon={Wrench}
                skillList={toolSkills}
                color="text-primary-light"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;

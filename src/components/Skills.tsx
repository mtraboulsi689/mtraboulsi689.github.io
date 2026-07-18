import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useLoading } from '@/components/loading-provider';
import { useLanguage } from '@/components/language-provider';

interface SkillGroup {
  titleKey: 'skills.programmingTitle' | 'skills.analysisTitle' | 'skills.toolsTitle';
  names: string[];
}

const skillGroups: SkillGroup[] = [
  {
    titleKey: 'skills.programmingTitle',
    names: ['Python', 'MATLAB', 'Fortran', 'R', 'C/C++'],
  },
  {
    titleKey: 'skills.analysisTitle',
    names: ['OpenFOAM', 'Telemac', 'Data Analysis', 'GIS & Remote Sensing', 'Statistics & ML'],
  },
  {
    titleKey: 'skills.toolsTitle',
    names: ['LaTeX', 'Git & GitHub', 'Linux/HPC', 'Docker'],
  },
];

const Skills = () => {
  const { loading } = useLoading();
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold mb-6 text-gradient-ocean">
          {t('skills.title')}
        </h2>

        {loading.skills ? (
          <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2">
            {Array.from({ length: 14 }).map((_, index) => (
              <Skeleton key={index} className="h-6 rounded-full" style={{ width: `${Math.random() * 40 + 60}px` }} />
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-3">
            {skillGroups.map((group) => (
              <div key={group.titleKey} className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-1">
                  {t(group.titleKey)}:
                </span>
                {group.names.map((name) => (
                  <Badge key={name} variant="secondary" className="font-normal">
                    {name}
                  </Badge>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;

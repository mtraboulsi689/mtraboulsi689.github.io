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

// Compact supporting strip — deliberately not a full Section: skills are
// evidence, not a sales pitch.
const Skills = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-14 bg-sunken border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid gap-3 md:grid-cols-[auto_1fr] md:gap-x-8 items-baseline">
          <span className="eyebrow">{t('skills.title')}</span>
          <div className="space-y-3">
            {skillGroups.map((group) => (
              <div key={group.titleKey} className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-xs text-muted-foreground mr-1">
                  {t(group.titleKey)}
                </span>
                {group.names.map((name) => (
                  <span
                    key={name}
                    className="rounded-sm border border-border bg-background px-2 py-0.5 text-xs text-foreground"
                  >
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

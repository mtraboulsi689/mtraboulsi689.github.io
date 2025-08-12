
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Database, Wrench, TrendingUp } from 'lucide-react';
import { useLoading } from '@/components/loading-provider';
import SkillsSkeleton from '@/components/skeletons/SkillsSkeleton';
import { useLanguage } from '@/components/language-provider';

interface SkillData {
  name: string;
  level: number;
  category: 'programming' | 'analysis' | 'tools' | 'strengths';
}

const skills: SkillData[] = [
  // Programming
  { name: 'Python', level: 5, category: 'programming' },
  { name: 'MATLAB', level: 4.5, category: 'programming' },
  { name: 'Fortran', level: 4, category: 'programming' },
  { name: 'R', level: 3.5, category: 'programming' },
  { name: 'C/C++', level: 3, category: 'programming' },
  
  // Analysis & Strengths
  { name: 'Data Analysis', level: 5, category: 'analysis' },
  { name: 'Statistics', level: 4.5, category: 'analysis' },
  { name: 'OpenFOAM', level: 4, category: 'analysis' },
  { name: 'Telemac', level: 4, category: 'analysis' },
  { name: 'GIS', level: 4, category: 'analysis' },
  
  // Tools
  { name: 'LaTeX', level: 4.5, category: 'tools' },
  { name: 'Git', level: 4, category: 'tools' },
  { name: 'Linux', level: 4, category: 'tools' },
];

const SkillCard = ({ title, icon: Icon, skillList, color }: {
  title: string;
  icon: any;
  skillList: SkillData[];
  color: string;
}) => (
  <Card className="shadow-coastal hover:shadow-ocean transition-all duration-300 group">
    <CardHeader>
      <CardTitle className="flex items-center space-x-3">
        <Icon className={`${color} group-hover:scale-110 transition-transform`} size={24} />
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {skillList.map((skill, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">{skill.name}</span>
            <span className="text-sm text-muted-foreground">{skill.level}/5</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-ocean transition-all duration-1000 ease-out`}
              style={{ width: `${(skill.level / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

const Skills = () => {
  const { loading } = useLoading();
  const { t } = useLanguage();
  const programmingSkills = skills.filter(skill => skill.category === 'programming');
  const analysisSkills = skills.filter(skill => skill.category === 'analysis');
  const toolSkills = skills.filter(skill => skill.category === 'tools');

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('skills.description')}
          </p>
        </div>

        {loading.skills ? (
          <SkillsSkeleton />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="animate-fade-up">
              <SkillCard
                title={t('skills.programming')}
                icon={Code}
                skillList={programmingSkills}
                color="text-primary"
              />
            </div>
            
            <div className="animate-fade-up" style={{animationDelay: '0.2s'}}>
              <SkillCard
                title={t('skills.analysis')}
                icon={TrendingUp}
                skillList={analysisSkills}
                color="text-accent"
              />
            </div>
            
            <div className="animate-fade-up" style={{animationDelay: '0.4s'}}>
              <SkillCard
                title={t('skills.tools')}
                icon={Wrench}
                skillList={toolSkills}
                color="text-primary-light"
              />
            </div>
          </div>
        )}

        {!loading.skills && (
          <div className="mt-16 text-center">
            <Card className="max-w-4xl mx-auto shadow-coastal">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-primary">{t('skills.keywords')}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['Research', 'Modelling', 'Lab Experiments', 'Sediment Transport', 'Turbulence', 'Signal Processing', 'Machine Learning', 'Wave Dynamics', 'Marine Energy', 'Climate Change Impact'].map((keyword, index) => (
                  <span 
                    key={index}
                    className="bg-gradient-coastal px-4 py-2 rounded-full text-sm font-medium border border-border hover:shadow-coastal transition-shadow"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;

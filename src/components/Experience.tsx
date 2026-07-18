
import { useState, useEffect } from 'react';
import VerticalTimeline, { TimelineItem } from '@/components/VerticalTimeline';
import TimelineSkeleton from '@/components/skeletons/TimelineSkeleton';
import { useLanguage } from '@/components/language-provider';

interface ExperienceData {
  updated_at: string;
  items: TimelineItem[];
}

const Experience = () => {
  const { t } = useLanguage();
  const [experienceData, setExperienceData] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/experience.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch experience data: ${response.status}`);
        }
        
        const data: ExperienceData = await response.json();
        setExperienceData(data.items);
        setError(null);
      } catch (err) {
        console.error('Error fetching experience:', err);
        setError(err instanceof Error ? err.message : 'Failed to load experience data');
        setExperienceData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);
  
  if (loading) {
    return (
      <section id="experience" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
              {t('experience.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('experience.description')}
            </p>
          </div>
          <TimelineSkeleton items={3} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
              {t('experience.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('experience.description')}
            </p>
          </div>
          <div className="text-center text-red-600">
            <p>{t('experience.errorLoading')} {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            {t('experience.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('experience.description')}
          </p>
        </div>

        <VerticalTimeline items={experienceData} category="experience" detailsLabel={t('experience.caseStudyLabel')} />
      </div>
    </section>
  );
};

export default Experience;

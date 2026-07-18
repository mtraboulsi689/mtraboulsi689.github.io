import { useEffect, useState } from 'react';
import { Calendar, ExternalLink, Linkedin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';

interface LinkedInPost {
  id: string;
  date: string | null;
  text: string;
  url?: string;
}

interface LinkedInFeedData {
  updated_at: string;
  source?: string;
  items: LinkedInPost[];
}

const formatPostDate = (date: string | null) => {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const LinkedInFeed = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<LinkedInPost[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const response = await fetch('/data/linkedin-feed.json');
        if (!response.ok) {
          return;
        }

        const data: LinkedInFeedData = await response.json();
        if (isMounted) {
          setPosts(Array.isArray(data.items) ? data.items.slice(0, 3) : []);
        }
      } catch (error) {
        console.error('Error fetching LinkedIn feed:', error);
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="linkedin-feed" className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Linkedin size={22} />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            {t('linkedinFeed.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('linkedinFeed.description')}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 max-w-6xl mx-auto">
          {posts.map((post) => {
            const formattedDate = formatPostDate(post.date);

            return (
              <Card key={post.id} className="shadow-coastal">
                <CardContent className="flex h-full flex-col gap-4 p-5">
                  {formattedDate && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={15} />
                      <span>{formattedDate}</span>
                    </div>
                  )}

                  <p className="line-clamp-6 text-sm leading-relaxed text-foreground">
                    {post.text}
                  </p>

                  {post.url && (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light"
                    >
                      {t('linkedinFeed.viewPost')}
                      <ExternalLink size={15} />
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LinkedInFeed;

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
    <section id="linkedin-feed" className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center gap-3">
          <Linkedin size={16} className="text-accent" />
          <div>
            <h2 className="font-display text-lg font-medium text-foreground">
              {t('linkedinFeed.title')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('linkedinFeed.description')}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post) => {
            const formattedDate = formatPostDate(post.date);

            return (
              <Card key={post.id} className="border border-border shadow-none hover-raise">
                <CardContent className="flex h-full flex-col gap-4 p-5">
                  {formattedDate && (
                    <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                      <Calendar size={13} />
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
                      className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80"
                    >
                      {t('linkedinFeed.viewPost')}
                      <ExternalLink size={14} />
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

import { useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { ExternalLink, Play } from 'lucide-react';

const Spotlight = () => {
  const { t } = useLanguage();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoId = 'wZBNd7qW7dA';
  const videoUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  const posterUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <section id="spotlight" className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient-ocean">
            {t('spotlight.badge')}
          </h2>
          
          {/* Video Description */}
          <div className="max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              {t('spotlight.articleTitle')}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t('spotlight.videoDescription')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('spotlight.publishedIn')}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-ocean aspect-video">
            {isVideoLoaded ? (
              <iframe
                className="w-full h-full"
                src={videoUrl}
                title={t('spotlight.videoTitle')}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className="group relative h-full w-full overflow-hidden text-left"
                onClick={() => setIsVideoLoaded(true)}
                aria-label={t('spotlight.playVideo')}
              >
                <img
                  src={posterUrl}
                  alt=""
                  className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-ocean transition-transform duration-300 group-hover:scale-110">
                    <Play size={28} fill="currentColor" />
                  </span>
                </span>
                <span className="absolute bottom-5 left-5 right-5 flex flex-col gap-2 text-white sm:flex-row sm:items-end sm:justify-between">
                  <span>
                    <span className="block text-lg font-semibold">{t('spotlight.videoTitle')}</span>
                    <span className="block text-sm text-white/75">{t('spotlight.playVideo')}</span>
                  </span>
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-1 text-sm text-white/85 hover:text-white"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {t('spotlight.openYoutube')}
                    <ExternalLink size={14} />
                  </a>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;

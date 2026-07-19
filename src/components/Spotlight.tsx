import { useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { ExternalLink, Play } from 'lucide-react';
import Reveal from '@/components/Reveal';

const Spotlight = () => {
  const { t } = useLanguage();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoId = 'wZBNd7qW7dA';
  const videoUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  const posterUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const stats = [
    { value: '5 km', label: t('spotlight.coverage') },
    { value: '3×SSP', label: t('spotlight.scenarios') },
    { value: '2100', label: t('spotlight.projection') },
    { value: 'BRGM', label: t('spotlight.institution') },
  ];

  return (
    <section id="spotlight" className="py-20 md:py-28 bg-abyss">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="mb-12 flex items-baseline gap-4">
            <span className="font-display text-sm font-bold text-accent-light">02</span>
            <h2 className="font-display font-bold text-headline text-white">{t('spotlight.badge')}</h2>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-14 items-start">
          <Reveal>
            <div>
              <h3 className="font-display text-2xl font-semibold text-white mb-4">
                {t('spotlight.articleTitle')}
              </h3>
              <p className="leading-relaxed text-abyss-foreground/90 mb-5">
                {t('spotlight.videoDescription')}
              </p>
              <p className="text-[13px] text-abyss-foreground/60 mb-7">{t('spotlight.publishedIn')}</p>

              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black shadow-ocean">
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
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-light text-white shadow-ocean transition-transform duration-300 group-hover:scale-110">
                        <Play size={26} fill="currentColor" />
                      </span>
                    </span>
                    <span className="absolute bottom-5 left-5 right-5 flex flex-col gap-2 text-white sm:flex-row sm:items-end sm:justify-between">
                      <span>
                        <span className="block text-lg font-semibold">{t('spotlight.videoTitle')}</span>
                        <span className="block text-sm text-white/75">{t('spotlight.playVideo')}</span>
                      </span>
                    </span>
                  </button>
                )}
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-white transition-colors"
              >
                {t('spotlight.openYoutube')}
                <ExternalLink size={14} />
              </a>
            </div>
          </Reveal>

          {/* Stat cards */}
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg bg-abyss-card p-6">
                  <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
                  <div className="mt-1.5 text-[13px] text-abyss-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;

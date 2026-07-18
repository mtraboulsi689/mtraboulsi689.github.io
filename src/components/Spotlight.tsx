import { useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { ExternalLink, Play } from 'lucide-react';
import ContourLines from '@/components/ContourLines';
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
    <section id="spotlight" className="relative py-20 md:py-28 bg-abyss overflow-hidden">
      {/* Contour backdrop */}
      <div className="absolute inset-0 text-abyss-foreground pointer-events-none" aria-hidden="true">
        <ContourLines className="absolute -left-[25%] top-0 h-full w-[80%] opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Reveal>
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-sm text-accent">02</span>
              <span className="h-px flex-1 bg-abyss-foreground/15" />
              <span className="eyebrow text-abyss-foreground/50">{t('spotlight.badge')}</span>
            </div>
            <div className="max-w-3xl">
              <h2 className="font-display font-semibold text-headline text-abyss-foreground">
                {t('spotlight.articleTitle')}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-abyss-foreground/70">
                {t('spotlight.videoDescription')}
              </p>
              <p className="mt-3 font-mono text-xs text-abyss-foreground/50">
                {t('spotlight.publishedIn')}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center max-w-6xl">
          <Reveal>
            <div className="relative bg-black rounded-lg overflow-hidden shadow-ocean aspect-video max-w-4xl">
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
          </Reveal>

          {/* Mono stat column */}
          <Reveal delay={120}>
            <dl className="grid grid-cols-2 gap-x-10 gap-y-8 lg:grid-cols-1 lg:border-l lg:border-abyss-foreground/15 lg:pl-10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="order-2 font-mono text-[11px] uppercase tracking-wider text-abyss-foreground/50">
                    {stat.label}
                  </dt>
                  <dd className="order-1 mb-1 font-display text-3xl font-semibold text-abyss-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;

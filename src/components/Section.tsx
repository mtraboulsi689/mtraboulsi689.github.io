import Reveal from '@/components/Reveal';

type SectionVariant = 'base' | 'sunken' | 'abyss';

interface SectionProps {
  id: string;
  /** Two-digit index shown in the mono rule line, e.g. "01". */
  index?: string;
  title: string;
  lede?: string;
  variant?: SectionVariant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<SectionVariant, string> = {
  base: 'bg-background',
  sunken: 'bg-sunken',
  abyss: 'bg-abyss',
};

// Shared section shell: teal display index on the heading baseline, optional
// lede below. Left-aligned; shared by all numbered sections.
const Section = ({ id, index, title, lede, variant = 'base', className = '', children }: SectionProps) => {
  const onAbyss = variant === 'abyss';

  return (
    <section id={id} className={`py-20 md:py-28 ${variantClasses[variant]} ${className}`}>
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="mb-12 md:mb-16">
            <div className="flex items-baseline gap-4">
              {index && (
                <span className={`font-display text-sm font-bold ${onAbyss ? 'text-accent-light' : 'text-accent'}`}>
                  {index}
                </span>
              )}
              <h2 className={`font-display font-bold text-headline ${onAbyss ? 'text-white' : 'text-foreground'}`}>
                {title}
              </h2>
            </div>
            {lede && (
              <p className={`mt-4 max-w-2xl text-lg leading-relaxed ${onAbyss ? 'text-abyss-foreground/80' : 'text-muted-foreground'}`}>
                {lede}
              </p>
            )}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
};

export default Section;

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

// Shared section shell: mono index + rule line, display title, optional lede.
// Left-aligned; replaces the centered heading block previously copy-pasted
// per component.
const Section = ({ id, index, title, lede, variant = 'base', className = '', children }: SectionProps) => {
  const onAbyss = variant === 'abyss';

  return (
    <section id={id} className={`py-20 md:py-28 ${variantClasses[variant]} ${className}`}>
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="mb-12 md:mb-16">
            {index && (
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-sm text-accent">{index}</span>
                <span className={`h-px flex-1 ${onAbyss ? 'bg-abyss-foreground/15' : 'bg-border'}`} />
              </div>
            )}
            <div className="max-w-3xl">
              <h2 className={`font-display font-semibold text-headline ${onAbyss ? 'text-abyss-foreground' : 'text-foreground'}`}>
                {title}
              </h2>
              {lede && (
                <p className={`mt-4 text-lg leading-relaxed ${onAbyss ? 'text-abyss-foreground/70' : 'text-muted-foreground'}`}>
                  {lede}
                </p>
              )}
            </div>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
};

export default Section;

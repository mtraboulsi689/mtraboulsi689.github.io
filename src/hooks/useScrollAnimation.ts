import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  duration?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

interface ScrollAnimationResult {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
  hasTriggered: boolean;
  animationClasses: string;
  style: React.CSSProperties;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}): ScrollAnimationResult => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0,
    direction = 'up',
    duration = 600,
    staggerChildren = false,
    staggerDelay = 100
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting) {
          setIsVisible(true);
          if (!hasTriggered) {
            setHasTriggered(true);
          }
          
          // If triggerOnce is true, disconnect observer after first trigger
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    // Handle staggered children animations
    if (staggerChildren && isVisible) {
      const children = element.children;
      Array.from(children).forEach((child, index) => {
        if (child instanceof HTMLElement) {
          child.style.animationDelay = `${delay + (index * staggerDelay)}ms`;
        }
      });
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, delay, staggerChildren, staggerDelay, isVisible, hasTriggered]);

  // Generate animation classes based on direction and state
  const getAnimationClasses = (): string => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    if (!isVisible && !hasTriggered) {
      // Initial state - hidden
      switch (direction) {
        case 'up':
          return `${baseClasses} translate-y-8 opacity-0`;
        case 'down':
          return `${baseClasses} -translate-y-8 opacity-0`;
        case 'left':
          return `${baseClasses} translate-x-8 opacity-0`;
        case 'right':
          return `${baseClasses} -translate-x-8 opacity-0`;
        case 'scale':
          return `${baseClasses} scale-95 opacity-0`;
        case 'fade':
          return `${baseClasses} opacity-0`;
        default:
          return `${baseClasses} translate-y-8 opacity-0`;
      }
    } else {
      // Visible state - animated in
      return `${baseClasses} translate-y-0 translate-x-0 scale-100 opacity-100`;
    }
  };

  // Generate inline styles for more complex animations
  const getAnimationStyle = (): React.CSSProperties => {
    return {
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      willChange: 'transform, opacity'
    };
  };

  return {
    ref,
    isVisible,
    hasTriggered,
    animationClasses: getAnimationClasses(),
    style: getAnimationStyle()
  };
};

// Hook for parallax scrolling effects
export const useParallaxScroll = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      setOffset(rate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return {
    ref,
    style: {
      transform: `translateY(${offset}px)`,
      willChange: 'transform'
    }
  };
};

// Hook for scroll-triggered number counting
export const useCountUp = (end: number, duration: number = 2000, startDelay: number = 0) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          
          setTimeout(() => {
            let startTime: number;
            const animateCount = (currentTime: number) => {
              if (!startTime) startTime = currentTime;
              const progress = Math.min((currentTime - startTime) / duration, 1);
              
              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              setCount(Math.floor(easeOutQuart * end));
              
              if (progress < 1) {
                requestAnimationFrame(animateCount);
              } else {
                setCount(end);
              }
            };
            
            requestAnimationFrame(animateCount);
          }, startDelay);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [end, duration, startDelay, isVisible]);

  return { ref, count };
};

// Hook for staggered list animations
export const useStaggeredAnimation = (itemCount: number, staggerDelay: number = 100) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Apply staggered animation to children
          const children = container.children;
          Array.from(children).forEach((child, index) => {
            if (child instanceof HTMLElement) {
              child.style.animationDelay = `${index * staggerDelay}ms`;
              child.classList.add('animate-fade-up');
            }
          });
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [itemCount, staggerDelay]);

  return { containerRef, isVisible };
};
// Animation utility functions for enhanced scroll effects

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade' | 'rotate';
  distance?: number;
  scale?: number;
  rotation?: number;
}

// Predefined animation configurations
export const animationPresets = {
  // Slide animations
  slideUp: { direction: 'up', distance: 40, duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  slideDown: { direction: 'down', distance: 40, duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  slideLeft: { direction: 'left', distance: 40, duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  slideRight: { direction: 'right', distance: 40, duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  
  // Scale animations
  scaleIn: { direction: 'scale', scale: 0.8, duration: 500, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  scaleUp: { direction: 'scale', scale: 1.05, duration: 400, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  
  // Fade animations
  fadeIn: { direction: 'fade', duration: 800, easing: 'ease-out' },
  fadeInUp: { direction: 'up', distance: 20, duration: 700, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  fadeInDown: { direction: 'down', distance: 20, duration: 700, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  
  // Rotation animations
  rotateIn: { direction: 'rotate', rotation: 10, duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  
  // Special effects
  bounce: { direction: 'up', distance: 30, duration: 800, easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
  elastic: { direction: 'scale', scale: 0.85, duration: 1000, easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
  
  // Staggered animations
  staggerUp: { direction: 'up', distance: 30, duration: 500, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  staggerScale: { direction: 'scale', scale: 0.9, duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
} as const;

// Generate CSS transform string based on animation config
export const generateTransform = (config: AnimationConfig, isVisible: boolean): string => {
  const { direction, distance = 40, scale = 0.9, rotation = 5 } = config;
  
  if (isVisible) {
    return 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
  }
  
  switch (direction) {
    case 'up':
      return `translate3d(0, ${distance}px, 0) scale(1) rotate(0deg)`;
    case 'down':
      return `translate3d(0, -${distance}px, 0) scale(1) rotate(0deg)`;
    case 'left':
      return `translate3d(${distance}px, 0, 0) scale(1) rotate(0deg)`;
    case 'right':
      return `translate3d(-${distance}px, 0, 0) scale(1) rotate(0deg)`;
    case 'scale':
      return `translate3d(0, 0, 0) scale(${scale}) rotate(0deg)`;
    case 'rotate':
      return `translate3d(0, 0, 0) scale(1) rotate(${rotation}deg)`;
    case 'fade':
    default:
      return 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
  }
};

// Generate CSS styles for animations
export const generateAnimationStyles = (config: AnimationConfig, isVisible: boolean): React.CSSProperties => {
  const { duration = 600, delay = 0, easing = 'cubic-bezier(0.16, 1, 0.3, 1)' } = config;
  
  return {
    transform: generateTransform(config, isVisible),
    opacity: isVisible ? 1 : 0,
    transition: `all ${duration}ms ${easing}`,
    transitionDelay: `${delay}ms`,
    willChange: 'transform, opacity'
  };
};

// Stagger animation utilities
export const createStaggeredAnimation = (
  elements: NodeListOf<Element> | Element[],
  baseConfig: AnimationConfig,
  staggerDelay: number = 100
): void => {
  Array.from(elements).forEach((element, index) => {
    if (element instanceof HTMLElement) {
      const delay = (baseConfig.delay || 0) + (index * staggerDelay);
      const styles = generateAnimationStyles({ ...baseConfig, delay }, true);
      
      Object.assign(element.style, styles);
      element.classList.add('animate-in');
    }
  });
};

// Parallax scroll effect
export const createParallaxEffect = (
  element: HTMLElement,
  speed: number = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical'
): (() => void) => {
  const handleScroll = () => {
    const rect = element.getBoundingClientRect();
    const scrolled = window.pageYOffset;
    const rate = scrolled * speed;
    
    if (direction === 'vertical') {
      element.style.transform = `translate3d(0, ${rate}px, 0)`;
    } else {
      element.style.transform = `translate3d(${rate}px, 0, 0)`;
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};

// Magnetic hover effect
export const createMagneticEffect = (element: HTMLElement, strength: number = 0.3): (() => void) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    element.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };
  
  const handleMouseLeave = () => {
    element.style.transform = 'translate3d(0, 0, 0)';
  };
  
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Scroll progress indicator
export const createScrollProgress = (
  element: HTMLElement,
  callback: (progress: number) => void
): (() => void) => {
  const handleScroll = () => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;
    
    // Calculate progress based on element position
    const start = rect.top + elementHeight;
    const end = rect.top;
    
    let progress = 0;
    if (start <= windowHeight && end >= 0) {
      if (start <= windowHeight && end >= 0) {
        progress = Math.max(0, Math.min(1, (windowHeight - end) / (windowHeight + elementHeight)));
      }
    }
    
    callback(progress);
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial call
  
  return () => window.removeEventListener('scroll', handleScroll);
};

// Performance optimized scroll handler with throttling
export const throttledScrollHandler = (
  callback: () => void,
  delay: number = 16
): (() => void) => {
  let timeoutId: number | null = null;
  let lastExecTime = 0;
  
  const throttledFunction = () => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      callback();
      lastExecTime = currentTime;
    } else if (!timeoutId) {
      timeoutId = window.setTimeout(() => {
        callback();
        lastExecTime = Date.now();
        timeoutId = null;
      }, delay - (currentTime - lastExecTime));
    }
  };
  
  return throttledFunction;
};
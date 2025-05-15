
/**
 * Utility functions for optimized animations and performance
 */

type EasingFunction = (t: number) => number;

// Easing functions for more natural motion
export const easings = {
  // Sine easing functions
  easeInSine: (t: number): number => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t: number): number => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2,
  
  // Quadratic easing functions
  easeInQuad: (t: number): number => t * t,
  easeOutQuad: (t: number): number => 1 - (1 - t) * (1 - t),
  easeInOutQuad: (t: number): number => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,

  // Cubic easing functions
  easeInCubic: (t: number): number => t * t * t,
  easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number): number => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  
  // Elastic easing
  easeOutElastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  
  // Bounce easing
  easeOutBounce: (t: number): number => {
    const n1 = 7.5625;
    const d1 = 2.75;
    
    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  }
};

// Animation timing utility - defers animations for better performance
export const deferAnimation = (callback: () => void, delay = 100): void => {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      setTimeout(callback, delay);
    });
  } else {
    setTimeout(callback, delay);
  }
};

// Animation batching utility - for better performance
export const batchAnimations = (
  elements: HTMLElement[],
  animationClass: string,
  staggerDelay = 50,
  startDelay = 0
): void => {
  setTimeout(() => {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add(animationClass);
      }, index * staggerDelay);
    });
  }, startDelay);
};

// Check if element is in viewport for optimized animations
export const isInViewport = (element: HTMLElement, offset = 0): boolean => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  return (
    rect.top <= windowHeight + offset && 
    rect.bottom >= 0 - offset
  );
};

// IntersectionObserver factory for efficient viewport detection
export const createIntersectionObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options = { threshold: 0.1, rootMargin: '0px' }
): IntersectionObserver => {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, options);
};

// Optimized scroll event handler with throttling
export const createThrottledScrollHandler = (
  callback: () => void,
  throttleTime = 100
): () => void => {
  let lastCallTime = 0;
  let requestId: number | null = null;
  
  return () => {
    const now = Date.now();
    
    if (now - lastCallTime < throttleTime) {
      // Throttle calls
      if (requestId === null) {
        requestId = window.requestAnimationFrame(() => {
          lastCallTime = now;
          callback();
          requestId = null;
        });
      }
      return;
    }
    
    lastCallTime = now;
    callback();
  };
};

// Create smooth scroll animation
export const smoothScrollTo = (
  target: HTMLElement | number,
  duration = 800,
  easing: EasingFunction = easings.easeInOutCubic,
  offset = 0
): void => {
  const startPosition = window.pageYOffset;
  const startTime = performance.now();
  
  // If target is a number, use it as the end position
  // If target is an element, use its position
  const targetPosition = typeof target === 'number' 
    ? target 
    : target.getBoundingClientRect().top + window.pageYOffset;
  
  // Apply offset
  const endPosition = targetPosition - offset;
  const distanceToScroll = endPosition - startPosition;

  // Don't animate if there's no distance to scroll
  if (distanceToScroll === 0) return;
  
  const animateScroll = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    
    if (elapsedTime >= duration) {
      window.scrollTo(0, endPosition);
      return;
    }
    
    const progress = elapsedTime / duration;
    const easedProgress = easing(progress);
    const position = startPosition + distanceToScroll * easedProgress;
    
    window.scrollTo(0, position);
    window.requestAnimationFrame(animateScroll);
  };
  
  window.requestAnimationFrame(animateScroll);
};

// Apply cool tilt effect to an element
export const applyTiltEffect = (
  element: HTMLElement,
  intensity = 15,
  perspective = 1000,
  transitionSpeed = 400
) => {
  if (!element) return;
  
  // Set initial style properties
  element.style.transformStyle = 'preserve-3d';
  element.style.transition = `transform ${transitionSpeed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
  element.style.perspective = `${perspective}px`;
  
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate position relative to element
    const xPos = (e.clientX - rect.left) / width;
    const yPos = (e.clientY - rect.top) / height;
    
    // Calculate rotation angles
    const tiltX = ((yPos - 0.5) * intensity).toFixed(2);
    const tiltY = (-(xPos - 0.5) * intensity).toFixed(2);
    
    // Apply transformation
    element.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };
  
  const handleMouseLeave = () => {
    // Reset transform when mouse leaves
    element.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };
  
  // Set up event listeners
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  // Return function to remove event listeners when needed
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
    element.style.transform = '';
    element.style.transition = '';
  };
};

// Optimize CSS animations by enabling hardware acceleration
export const enableHardwareAcceleration = (element: HTMLElement): void => {
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
  element.style.willChange = 'transform, opacity';
};

// Disable hardware acceleration when not needed (to save memory)
export const disableHardwareAcceleration = (element: HTMLElement): void => {
  element.style.transform = '';
  element.style.backfaceVisibility = '';
  element.style.willChange = '';
};

// Create a staggered reveal effect for multiple elements
export const staggeredReveal = (
  elements: HTMLElement[],
  baseDelay = 100,
  baseClass = 'opacity-0',
  activeClass = 'opacity-100 translate-y-0',
  staggerAmount = 50
): void => {
  elements.forEach((element, index) => {
    // Set initial state
    element.classList.add(baseClass, 'transition-all', 'duration-500');
    element.style.transitionDelay = `${baseDelay + (index * staggerAmount)}ms`;
    
    // Use RAF to batch changes
    requestAnimationFrame(() => {
      deferAnimation(() => {
        element.classList.remove(baseClass);
        element.classList.add(activeClass);
      }, 10);
    });
  });
};

// Create a typewriter text effect
export const typewriterEffect = (
  element: HTMLElement,
  text: string,
  speed = 50,
  startDelay = 0,
  cursorElement?: HTMLElement
): () => void => {
  let isStopped = false;
  let i = 0;
  
  // Clear any existing content
  element.textContent = '';
  
  // Add cursor if provided
  if (cursorElement) {
    cursorElement.style.opacity = '1';
  }
  
  // Delay start if needed
  setTimeout(() => {
    const typing = () => {
      if (isStopped) return;
      
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else if (cursorElement) {
        // Animation complete, blink cursor
        cursorElement.style.animation = 'blink 1s step-end infinite';
      }
    };
    
    typing();
  }, startDelay);
  
  // Return function to stop the animation if needed
  return () => {
    isStopped = true;
    if (cursorElement) {
      cursorElement.style.opacity = '0';
      cursorElement.style.animation = '';
    }
  };
};

// Parallax scroll effect for backgrounds
export const createParallaxEffect = (
  element: HTMLElement,
  speedFactor = 0.5
): () => void => {
  if (!element) return () => {};
  
  const handleScroll = createThrottledScrollHandler(() => {
    const scrollY = window.pageYOffset;
    const offset = scrollY * speedFactor;
    
    // Apply transform for better performance instead of changing top/backgroundPosition
    element.style.transform = `translateY(${offset}px)`;
  });
  
  // Initialize
  handleScroll();
  
  // Add event listener
  window.addEventListener('scroll', handleScroll);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Apply hover effect with gradient shift
export const applyGradientShift = (
  element: HTMLElement,
  baseGradient: string,
  hoverGradient: string
): () => void => {
  if (!element) return () => {};
  
  // Store original background
  const originalBackground = element.style.background;
  element.style.background = baseGradient;
  element.style.transition = 'background 0.8s ease';
  
  const handleMouseEnter = () => {
    element.style.background = hoverGradient;
  };
  
  const handleMouseLeave = () => {
    element.style.background = baseGradient;
  };
  
  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
    element.style.background = originalBackground;
    element.style.transition = '';
  };
};

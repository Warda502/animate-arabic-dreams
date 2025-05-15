
/**
 * Animation Performance Utilities
 * 
 * A specialized utility library for optimizing animations and visual effects
 * throughout the application, focusing on performance and smooth rendering.
 */

// Performance-optimized version of setTimeout with requestAnimationFrame
export const rafTimeout = (callback: () => void, delay: number = 0): number => {
  const start = performance.now();
  let rafId: number;

  const checkTime = () => {
    const elapsed = performance.now() - start;
    
    if (elapsed >= delay) {
      callback();
    } else {
      rafId = requestAnimationFrame(checkTime);
    }
  };
  
  rafId = requestAnimationFrame(checkTime);
  return rafId;
};

// Clear a rafTimeout
export const clearRafTimeout = (id: number): void => {
  cancelAnimationFrame(id);
};

// Throttle a function using requestAnimationFrame for better performance
export const rafThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  skipFrames: number = 0
): ((...funcArgs: Parameters<T>) => void) => {
  let frameCount = 0;
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  return (...args: Parameters<T>) => {
    lastArgs = args;
    
    if (rafId !== null) return;
    
    const executeCallback = () => {
      if (frameCount >= skipFrames) {
        if (lastArgs !== null) {
          callback(...lastArgs);
          frameCount = 0;
          lastArgs = null;
        }
        rafId = null;
      } else {
        frameCount++;
        rafId = requestAnimationFrame(executeCallback);
      }
    };
    
    rafId = requestAnimationFrame(executeCallback);
  };
};

// Batch animations via requestAnimationFrame for better performance
export const batchAnimations = (
  elements: HTMLElement[],
  applyAnimation: (element: HTMLElement, index: number) => void,
  staggerDelay: number = 50
): void => {
  if (!elements.length) return;
  
  let index = 0;
  const maxIndex = elements.length - 1;
  
  const animate = (timestamp: number, lastTimestamp: number = timestamp) => {
    // Apply animation to current element
    if (timestamp - lastTimestamp >= staggerDelay) {
      if (index <= maxIndex) {
        applyAnimation(elements[index], index);
        index++;
        lastTimestamp = timestamp;
      }
    }
    
    // Continue animation loop if there are more elements
    if (index <= maxIndex) {
      requestAnimationFrame((newTimestamp) => animate(newTimestamp, lastTimestamp));
    }
  };
  
  // Start the animation
  requestAnimationFrame(animate);
};

// Check if an element is visible in viewport with optimized calculation
export const isInViewport = (element: Element, offset: number = 0): boolean => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const vertInView = (rect.top - offset) <= windowHeight && (rect.top + rect.height + offset) >= 0;
  const horInView = (rect.left - offset) <= windowWidth && (rect.left + rect.width + offset) >= 0;
  
  return vertInView && horInView;
};

// Create an optimized IntersectionObserver
export const createOptimizedObserver = (
  callback: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  // Default options optimized for animation triggers
  const defaultOptions = {
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry, observer);
      }
    });
  }, defaultOptions);
};

// Fade element in when it becomes visible
export const fadeInWhenVisible = (
  element: Element,
  className: string = 'animate-fade-in',
  unobserveAfter: boolean = true
): IntersectionObserver => {
  const observer = createOptimizedObserver((entry, observer) => {
    entry.target.classList.add(className);
    if (unobserveAfter) {
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.1 });
  
  observer.observe(element);
  return observer;
};

// Smooth parallax effect with performance optimizations
export const applyParallax = (
  element: HTMLElement, 
  speed: number = 0.2,
  property: 'backgroundPosition' | 'transform' = 'transform'
): () => void => {
  if (!element) return () => {};
  
  // Store initial position
  const initialValue = property === 'transform' 
    ? window.getComputedStyle(element).transform
    : window.getComputedStyle(element).backgroundPosition;
  
  // Use optimized handler with animation frame
  const handleScroll = rafThrottle(() => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const offset = scrollY * speed;
    
    if (property === 'transform') {
      // Use transform for better performance
      element.style.transform = `translateY(${offset}px)`;
    } else {
      // Use background-position (less performant)
      element.style.backgroundPosition = `center ${offset}px`;
    }
  });
  
  // Attach scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initialize on first load
  handleScroll();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
    if (property === 'transform') {
      element.style.transform = initialValue;
    } else {
      element.style.backgroundPosition = initialValue;
    }
  };
};

// Apply hardware acceleration to element for better performance
export const enableHardwareAcceleration = (element: HTMLElement): void => {
  if (!element) return;
  
  element.style.transform = 'translateZ(0)'; 
  element.style.backfaceVisibility = 'hidden';
  element.style.willChange = 'transform, opacity';
};

// Remove hardware acceleration when no longer needed to save memory
export const disableHardwareAcceleration = (element: HTMLElement): void => {
  if (!element) return;
  
  element.style.transform = '';
  element.style.backfaceVisibility = '';
  element.style.willChange = '';
};

// Check if device is low power (mobile, etc.) to adjust animation intensity
export const isLowPowerDevice = (): boolean => {
  // Check for mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Check for battery API if available
  if ('getBattery' in navigator) {
    (navigator as any).getBattery().then((battery: any) => {
      if (battery.charging === false && battery.level < 0.2) {
        return true;
      }
    }).catch(() => {
      return isMobile; // Fallback to userAgent check
    });
  }
  
  // Fallback to checking number of logical processors
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    return true;
  }
  
  return isMobile;
};

// Automatically handle animation intensity based on device capability
export const getAppropriateAnimationIntensity = (): 'high' | 'medium' | 'low' => {
  if (isLowPowerDevice()) {
    return 'low';
  }
  
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'low';
  }
  
  // Check hardware concurrency for medium vs high
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency >= 8) {
    return 'high';
  }
  
  return 'medium';
};

// Preload images for smoother transitions
export const preloadImages = (urls: string[]): Promise<void[]> => {
  const promises = urls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = url;
    });
  });
  
  return Promise.all(promises);
};

// Generate a performant wave animation for canvas
export const drawWaveAnimation = (
  canvas: HTMLCanvasElement,
  config: {
    color?: string;
    amplitude?: number;
    frequency?: number;
    speed?: number;
    lineWidth?: number;
  } = {}
): () => void => {
  if (!canvas) return () => {};
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  
  // Default values
  const {
    color = '#F97316',
    amplitude = 20,
    frequency = 0.02,
    speed = 0.05,
    lineWidth = 2
  } = config;
  
  let animationId: number;
  let phase = 0;
  
  // Set up canvas for proper resolution
  const setupCanvas = () => {
    // Get the display size
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
    
    // Scale the context
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  };
  
  // Draw a single frame of the wave
  const drawWave = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const centerY = height / 2;
    
    // Draw from left to right
    ctx.moveTo(0, centerY);
    
    // Draw the wave
    for (let x = 0; x < width; x++) {
      const y = centerY + amplitude * Math.sin(x * frequency + phase);
      ctx.lineTo(x, y);
    }
    
    ctx.stroke();
    
    // Update phase for animation
    phase += speed;
    
    animationId = requestAnimationFrame(drawWave);
  };
  
  // Initial setup and start
  setupCanvas();
  animationId = requestAnimationFrame(drawWave);
  
  // Handle resize
  const handleResize = rafThrottle(() => {
    setupCanvas();
  });
  
  window.addEventListener('resize', handleResize);
  
  // Return function to stop animation
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', handleResize);
  };
};

// Optimize animation for screen refresh rate
export const syncWithRefreshRate = (
  callback: (deltaTime: number) => void
): () => void => {
  let isRunning = true;
  let lastTime = performance.now();
  
  const animate = (time: number) => {
    if (!isRunning) return;
    
    const deltaTime = time - lastTime;
    lastTime = time;
    
    callback(deltaTime);
    requestAnimationFrame(animate);
  };
  
  requestAnimationFrame(animate);
  
  return () => {
    isRunning = false;
  };
};

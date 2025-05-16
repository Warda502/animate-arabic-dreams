
import { useCallback } from 'react';

export const useAnimationUtils = () => {
  // Defers animations for better performance
  const deferAnimation = useCallback((callback: () => void, delay = 100): void => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        setTimeout(callback, delay);
      });
    } else {
      setTimeout(callback, delay);
    }
  }, []);

  // Handle staggered animations with enhanced options
  const staggeredReveal = useCallback(
    (elements: HTMLElement[],
    baseDelay = 100,
    baseClass = 'opacity-0',
    activeClass = 'opacity-100 translate-y-0',
    staggerAmount = 50,
    easingFunction = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)'): void => {
      elements.forEach((element, index) => {
        // Set initial state
        element.classList.add(baseClass, 'transition-all', 'duration-500');
        element.style.transitionDelay = `${baseDelay + (index * staggerAmount)}ms`;
        element.style.transitionTimingFunction = easingFunction;
        
        // Use RAF to batch changes
        requestAnimationFrame(() => {
          deferAnimation(() => {
            element.classList.remove(baseClass);
            element.classList.add(activeClass);
          }, 10);
        });
      });
    }, 
  [deferAnimation]);

  // Create glowing effect on elements
  const createGlowEffect = useCallback((element: HTMLElement, color: string = 'rgba(249, 115, 22, 0.6)', intensity: number = 20): () => void => {
    if (!element) return () => {};
    
    const originalBoxShadow = element.style.boxShadow;
    const originalTransition = element.style.transition;
    
    element.style.transition = 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out';
    
    const handleMouseEnter = () => {
      element.style.boxShadow = `0 0 ${intensity}px ${color}`;
      element.style.transform = 'scale(1.03)';
    };
    
    const handleMouseLeave = () => {
      element.style.boxShadow = originalBoxShadow;
      element.style.transform = 'scale(1)';
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.style.boxShadow = originalBoxShadow;
      element.style.transition = originalTransition;
      element.style.transform = '';
    };
  }, []);

  // Create interactive floating effect
  const createFloatingEffect = useCallback((element: HTMLElement, amount: number = 10): () => void => {
    if (!element) return () => {};
    
    const originalTransform = element.style.transform;
    const originalTransition = element.style.transition;
    
    element.style.transition = 'transform 2s ease-in-out';
    
    let animationFrame: number;
    let startTime: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Simple floating animation based on sine wave
      const floatY = Math.sin(elapsed / 1000) * amount;
      element.style.transform = `translateY(${floatY}px)`;
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      element.style.transform = originalTransform;
      element.style.transition = originalTransition;
    };
  }, []);

  return {
    deferAnimation,
    staggeredReveal,
    createGlowEffect,
    createFloatingEffect
  };
};

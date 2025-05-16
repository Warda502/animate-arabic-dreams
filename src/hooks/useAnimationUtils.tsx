
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

  // Handle staggered animations
  const staggeredReveal = useCallback(
    (elements: HTMLElement[],
    baseDelay = 100,
    baseClass = 'opacity-0',
    activeClass = 'opacity-100 translate-y-0',
    staggerAmount = 50): void => {
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
    }, 
  [deferAnimation]);

  return {
    deferAnimation,
    staggeredReveal
  };
};


import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  className = "",
  formatter = (val) => val.toLocaleString()
}) => {
  const [count, setCount] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView || isAnimationComplete) return;
    
    let start = 0;
    const end = Math.min(value, 999999); // Cap to prevent excessive animations
    const incrementTime = Math.abs(Math.floor(duration / end));
    
    // Handle very large numbers by scaling the animation
    const range = end - start;
    const step = Math.ceil(range / (duration / 16)); // 16ms is approx 60fps
    
    let current = start;
    const timer = setInterval(() => {
      current += step;
      setCount(current);
      
      if (current >= end) {
        setCount(end);
        setIsAnimationComplete(true);
        clearInterval(timer);
      }
    }, 16);
    
    return () => {
      clearInterval(timer);
    };
  }, [isInView, value, duration, isAnimationComplete]);
  
  // Reset animation if value changes dramatically
  useEffect(() => {
    if (Math.abs(value - count) > value * 0.3 && isAnimationComplete) {
      setIsAnimationComplete(false);
      setCount(0);
    }
  }, [value, count, isAnimationComplete]);

  return (
    <span ref={ref} className={className}>
      {isAnimationComplete ? formatter(value) : formatter(count)}
    </span>
  );
};

export default AnimatedCounter;

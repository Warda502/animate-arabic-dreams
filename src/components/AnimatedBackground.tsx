
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
  children: React.ReactNode;
  particleCount?: number;
  color?: string;
  particleSize?: [number, number]; // [min, max]
  variant?: "default" | "wave" | "stars" | "bubbles";
  interactive?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className,
  children,
  particleCount = 15,
  color = "bg-pegasus-orange",
  particleSize = [5, 20],
  variant = "default",
  interactive = false
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    if (interactive) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [interactive]);

  // Generate particles based on variant
  const generateParticles = () => {
    const baseParticles = Array.from({ length: particleCount }).map((_, index) => {
      const size = Math.random() * (particleSize[1] - particleSize[0]) + particleSize[0];
      const initX = Math.random() * 100; // % position
      const initY = Math.random() * 100; // % position
      
      return {
        id: index,
        size,
        initX,
        initY,
        duration: Math.random() * 20 + 15, // Animation duration
        delay: Math.random() * 10, // Animation delay
        opacity: Math.random() * 0.2 + 0.1 // Random opacity between 0.1 and 0.3
      };
    });

    switch (variant) {
      case "wave":
        return baseParticles.map(particle => ({
          ...particle,
          waveWidth: Math.random() * 70 + 30, // Width of the wave motion
          waveSpeed: Math.random() * 5 + 5 // Speed of wave motion
        }));
      case "stars":
        return [...baseParticles, ...Array.from({ length: Math.floor(particleCount / 2) }).map((_, index) => {
          const size = Math.random() * 2 + 1; // Smaller sizes for stars
          return {
            id: index + particleCount,
            size,
            initX: Math.random() * 100,
            initY: Math.random() * 100,
            duration: Math.random() * 10 + 20, // Slower for twinkling effect
            delay: Math.random() * 20,
            opacity: Math.random() * 0.5 + 0.5, // Higher opacity for stars
            twinkle: true
          };
        })];
      case "bubbles":
        return baseParticles.map(particle => ({
          ...particle,
          size: Math.random() * 15 + 5, // Bubbles are a bit bigger
          speed: Math.random() * 10 + 5, // Rising speed
          wobble: Math.random() * 10 + 5 // Wobble amount
        }));
      default:
        return baseParticles;
    }
  };

  const particles = generateParticles();

  // Get animation based on variant
  const getAnimation = (particle: any) => {
    switch (variant) {
      case "wave":
        return {
          y: [0, -50, 0],
          x: [0, particle.waveWidth, 0],
          opacity: [particle.opacity, particle.opacity + 0.1, particle.opacity]
        };
      case "stars":
        return particle.twinkle ? {
          opacity: [particle.opacity, particle.opacity - 0.3, particle.opacity],
          scale: [1, 1.2, 1]
        } : {
          y: [0, -30, 0],
          x: [0, Math.random() * 30 - 15, 0],
          opacity: [particle.opacity, particle.opacity + 0.1, particle.opacity]
        };
      case "bubbles":
        return {
          y: [0, -100 - particle.speed * 10],
          x: [0, Math.sin(particle.wobble) * 20, Math.cos(particle.wobble) * 20],
          opacity: [particle.opacity, 0],
          scale: [1, 1.2, 0.8]
        };
      default:
        return {
          y: [0, -100, 0],
          x: [0, Math.random() * 50 - 25, 0],
          opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
          scale: [1, 1.1, 1]
        };
    }
  };

  // Get transition based on variant
  const getTransition = (particle: any) => {
    switch (variant) {
      case "wave":
        return {
          duration: particle.duration,
          repeat: Infinity,
          delay: particle.delay,
          ease: "easeInOut"
        };
      case "stars":
        return particle.twinkle ? {
          duration: Math.random() * 2 + 1,
          repeat: Infinity,
          repeatType: "reverse" as const,
          delay: particle.delay
        } : {
          duration: particle.duration,
          repeat: Infinity,
          delay: particle.delay,
          ease: "easeInOut"
        };
      case "bubbles":
        return {
          duration: particle.duration / 2,
          repeat: Infinity,
          delay: particle.delay,
          ease: "easeOut"
        };
      default:
        return {
          duration: particle.duration,
          repeat: Infinity,
          delay: particle.delay,
          ease: "easeInOut"
        };
    }
  };

  // Interactive effects
  const getInteractiveStyles = (particle: any) => {
    if (!interactive) return {};
    
    // Calculate distance from mouse to particle
    const particleX = (particle.initX / 100) * windowDimensions.width;
    const particleY = (particle.initY / 100) * windowDimensions.height;
    
    const dx = mousePosition.x - particleX;
    const dy = mousePosition.y - particleY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Define radius of effect
    const radius = 150;
    
    if (distance < radius) {
      // Calculate the repulsion force (stronger when closer)
      const force = (1 - distance / radius) * 30;
      
      // Calculate the direction vector
      const angle = Math.atan2(dy, dx);
      
      // Apply the force in the opposite direction
      return {
        x: -Math.cos(angle) * force,
        y: -Math.sin(angle) * force,
        scale: 1 + (1 - distance / radius) * 0.3
      };
    }
    
    return {};
  };

  return (
    <div className={cn(
      "relative overflow-hidden",
      className
    )}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background/30 pointer-events-none"></div>
      
      {/* Background particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={cn(
            "absolute rounded-full",
            color
          )}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initX}%`,
            top: `${particle.initY}%`,
            opacity: particle.opacity
          }}
          animate={{
            ...getAnimation(particle),
            ...getInteractiveStyles(particle)
          }}
          transition={getTransition(particle)}
          whileHover={{ scale: 1.2, opacity: 0.8 }}
        />
      ))}
      
      {/* Main content */}
      {children}
    </div>
  );
};

export default AnimatedBackground;

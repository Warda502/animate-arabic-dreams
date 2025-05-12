
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

interface AnimatedBackgroundProps {
  className?: string;
  children: React.ReactNode;
  particleCount?: number;
  color?: string;
  particleSize?: [number, number]; // [min, max]
  patternType?: "dots" | "grid" | "waves" | "circles";
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className,
  children,
  particleCount = 15,
  color = "bg-pegasus-orange",
  particleSize = [5, 20],
  patternType = "dots"
}) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Determine color based on theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className={className}>{children}</div>;
  }
  
  // Background color adjustments based on theme
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const backgroundStyles = isDarkMode 
    ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
    : "bg-gradient-to-b from-white via-orange-50/30 to-white";
    
  // Pattern opacity based on theme
  const patternOpacity = isDarkMode ? "opacity-5" : "opacity-3";
  
  // Pattern selection
  const getPatternUrl = () => {
    switch(patternType) {
      case "grid": return "url('/patterns/grid.svg')";
      case "waves": return "url('/patterns/waves.svg')";
      case "circles": return "url('/patterns/circles.svg')";
      default: return "url('/patterns/dots.svg')";
    }
  };

  // Generate random particles
  const particles = Array.from({ length: particleCount }).map((_, index) => {
    const size = Math.random() * (particleSize[1] - particleSize[0]) + particleSize[0];
    
    return {
      id: index,
      size,
      initX: Math.random() * 100, // % position
      initY: Math.random() * 100, // % position
      duration: Math.random() * 20 + 15, // Animation duration
      delay: Math.random() * 10 // Animation delay
    };
  });

  return (
    <div className={cn(
      "relative overflow-hidden transition-colors duration-500",
      backgroundStyles,
      className
    )}>
      {/* Pattern background */}
      <div 
        className={`absolute inset-0 ${patternOpacity} transition-opacity duration-500`} 
        style={{ backgroundImage: getPatternUrl() }}
      ></div>
      
      {/* Ambient glow effects */}
      <motion.div 
        className={`absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl transition-colors duration-500 ${isDarkMode ? 'bg-pegasus-orange/5' : 'bg-pegasus-orange/10'}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
      
      <motion.div 
        className={`absolute bottom-10 left-10 w-40 h-40 rounded-full blur-3xl transition-colors duration-500 ${isDarkMode ? 'bg-pegasus-orange/10' : 'bg-pegasus-orange/15'}`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>

      {/* Background particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={cn(
            "absolute rounded-full transition-colors duration-500",
            isDarkMode ? `${color}/10` : `${color}/20`
          )}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initX}%`,
            top: `${particle.initY}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [isDarkMode ? 0.1 : 0.2, isDarkMode ? 0.2 : 0.3, isDarkMode ? 0.1 : 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Additional light mode floating particles */}
      {!isDarkMode && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`light-particle-${i}`}
              className="absolute rounded-full bg-gradient-to-br from-pegasus-orange-200 to-pegasus-orange-300/50"
              style={{
                width: Math.random() * 30 + 10,
                height: Math.random() * 30 + 10,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}
      
      {/* Main content */}
      {children}
    </div>
  );
};

export default AnimatedBackground;

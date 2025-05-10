
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
  children: React.ReactNode;
  particleCount?: number;
  color?: string;
  particleSize?: [number, number]; // [min, max]
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className,
  children,
  particleCount = 10,
  color = "bg-pegasus-orange",
  particleSize = [5, 20]
}) => {
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
      "relative overflow-hidden",
      className
    )}>
      {/* Background particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={cn(
            "absolute rounded-full opacity-10",
            color
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
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Main content */}
      {children}
    </div>
  );
};

export default AnimatedBackground;

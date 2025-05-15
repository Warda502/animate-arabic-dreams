
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Star {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  opacity: number;
  color: string;
}

interface CosmicBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  starCount?: number;
  speed?: "slow" | "normal" | "fast";
  intensity?: "low" | "medium" | "high";
  colorScheme?: "blue" | "purple" | "orange" | "green" | "multi";
  interactive?: boolean;
  nebula?: boolean;
}

const getStarColor = (colorScheme: CosmicBackgroundProps["colorScheme"]) => {
  const colors = {
    blue: ["#60A5FA", "#3B82F6", "#2563EB", "#DBEAFE"],
    purple: ["#A78BFA", "#8B5CF6", "#7C3AED", "#EDE9FE"],
    orange: ["#FB923C", "#F97316", "#EA580C", "#FFEDD5"],
    green: ["#34D399", "#10B981", "#059669", "#D1FAE5"],
    multi: ["#60A5FA", "#8B5CF6", "#F97316", "#34D399", "#F472B6"]
  };
  
  const scheme = colors[colorScheme || "blue"];
  return scheme[Math.floor(Math.random() * scheme.length)];
};

const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  className,
  children,
  starCount = 100,
  speed = "normal",
  intensity = "medium",
  colorScheme = "blue",
  interactive = true,
  nebula = true
}) => {
  const [stars, setStars] = useState<Star[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Adjust star count based on intensity
  const actualStarCount = intensity === "low" 
    ? Math.floor(starCount * 0.5) 
    : intensity === "high" 
      ? Math.floor(starCount * 2) 
      : starCount;
  
  // Set animation speed multiplier
  const speedMultiplier = speed === "slow" ? 1.5 : speed === "fast" ? 0.6 : 1;
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
    
    // Generate stars
    const newStars: Star[] = [];
    for (let i = 0; i < actualStarCount; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100, // % position
        y: Math.random() * 100, // % position
        delay: Math.random() * 5,
        duration: (Math.random() * 3 + 2) * speedMultiplier,
        opacity: Math.random() * 0.7 + 0.3,
        color: getStarColor(colorScheme)
      });
    }
    setStars(newStars);
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [actualStarCount, speedMultiplier, colorScheme]);
  
  // Handle mouse movement for interactive background
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };
  
  // Get star parallax effect based on mouse position
  const getStarParallax = (depth: number) => {
    if (!interactive) return { x: 0, y: 0 };
    
    const moveX = (mousePosition.x - dimensions.width / 2) / dimensions.width;
    const moveY = (mousePosition.y - dimensions.height / 2) / dimensions.height;
    
    return {
      x: moveX * 20 * depth,
      y: moveY * 20 * depth
    };
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden bg-gray-900", className)}
      onMouseMove={handleMouseMove}
    >
      {/* Cosmic background glow and nebulas */}
      {nebula && (
        <>
          <motion.div 
            className="absolute opacity-30 w-1/2 h-1/2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colorScheme === "blue" ? "rgba(59, 130, 246, 0.3)" : 
                          colorScheme === "purple" ? "rgba(139, 92, 246, 0.3)" :
                          colorScheme === "orange" ? "rgba(249, 115, 22, 0.3)" :
                          colorScheme === "green" ? "rgba(16, 185, 129, 0.3)" :
                          "rgba(139, 92, 246, 0.3)"} 0%, transparent 70%)`,
              top: "20%",
              left: "30%",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <motion.div 
            className="absolute opacity-20 w-2/3 h-2/3 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colorScheme === "blue" ? "rgba(96, 165, 250, 0.2)" : 
                          colorScheme === "purple" ? "rgba(167, 139, 250, 0.2)" :
                          colorScheme === "orange" ? "rgba(251, 146, 60, 0.2)" :
                          colorScheme === "green" ? "rgba(52, 211, 153, 0.2)" :
                          "rgba(167, 139, 250, 0.2)"} 0%, transparent 70%)`,
              top: "50%",
              left: "60%",
            }}
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </>
      )}
      
      {/* Stars */}
      {stars.map((star) => {
        const depth = star.size / 4;
        const parallax = getStarParallax(depth);
        
        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              width: star.size,
              height: star.size,
              backgroundColor: star.color,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [star.opacity, star.opacity * 1.3, star.opacity],
              x: parallax.x,
              y: parallax.y,
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
      
      {/* Subtle star dust - tiny particles */}
      {intensity !== "low" && Array.from({ length: Math.floor(actualStarCount / 3) }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute rounded-full bg-white/30"
          style={{
            width: 1,
            height: 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default CosmicBackground;

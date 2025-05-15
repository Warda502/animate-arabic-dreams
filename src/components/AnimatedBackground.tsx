
import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
  children: React.ReactNode;
  particleCount?: number;
  color?: string;
  particleSize?: [number, number]; // [min, max]
  variant?: "default" | "wave" | "stars" | "bubbles" | "cosmic" | "neon" | "matrix";
  interactive?: boolean;
  intensity?: "low" | "medium" | "high";
  colorMode?: "single" | "multi" | "gradient";
  colorPalette?: string[];
  speed?: "slow" | "normal" | "fast";
  parallax?: boolean;
  glowEffect?: boolean;
  pulse?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className,
  children,
  particleCount = 15,
  color = "bg-pegasus-orange",
  particleSize = [5, 20],
  variant = "default",
  interactive = false,
  intensity = "medium",
  colorMode = "single",
  colorPalette = ["bg-pegasus-orange", "bg-pegasus-orange-400", "bg-pegasus-orange-600"],
  speed = "normal",
  parallax = false,
  glowEffect = false,
  pulse = false
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const [isScrolling, setIsScrolling] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [shouldRegenerate, setShouldRegenerate] = useState(false);
  
  // Adjust particle count based on intensity
  const actualParticleCount = intensity === "low" 
    ? Math.floor(particleCount * 0.6) 
    : intensity === "high" 
      ? Math.floor(particleCount * 2) 
      : particleCount;
  
  // Set animation speed multiplier
  const speedMultiplier = speed === "slow" ? 1.5 : speed === "fast" ? 0.6 : 1;
  
  useEffect(() => {
    // Force regeneration when variant changes
    setShouldRegenerate(prev => !prev);
  }, [variant, intensity, colorMode, particleCount]);
  
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
      
      const handleScroll = () => {
        if (!isScrolling) {
          setIsScrolling(true);
          setTimeout(() => setIsScrolling(false), 300);
        }
      };
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [interactive, isScrolling]);

  // Parallax effect on background when scrolling
  useEffect(() => {
    if (parallax && backgroundRef.current) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const element = backgroundRef.current;
        if (element) {
          element.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [parallax]);

  // Periodic animation effects
  useEffect(() => {
    if (pulse) {
      const pulseInterval = setInterval(() => {
        controls.start({
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
          transition: { duration: 4, ease: "easeInOut" }
        });
      }, 5000);
      
      return () => clearInterval(pulseInterval);
    }
  }, [pulse, controls]);

  // Generate particles based on variant
  const generateParticles = () => {
    const baseParticles = Array.from({ length: actualParticleCount }).map((_, index) => {
      const size = Math.random() * (particleSize[1] - particleSize[0]) + particleSize[0];
      const initX = Math.random() * 100; // % position
      const initY = Math.random() * 100; // % position
      
      // Select color based on colorMode
      let particleColor;
      if (colorMode === "single") {
        particleColor = color;
      } else if (colorMode === "multi") {
        particleColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      } else {
        // Gradient will be handled with CSS
        particleColor = color;
      }
      
      return {
        id: index,
        size,
        initX,
        initY,
        color: particleColor,
        duration: Math.random() * 20 + 15, // Animation duration
        delay: Math.random() * 10, // Animation delay
        opacity: Math.random() * 0.3 + 0.1, // Random opacity between 0.1 and 0.4
        rotation: Math.random() * 360, // Random initial rotation
      };
    });

    switch (variant) {
      case "wave":
        return baseParticles.map(particle => ({
          ...particle,
          waveWidth: Math.random() * 70 + 30, // Width of the wave motion
          waveSpeed: Math.random() * 5 + 5, // Speed of wave motion
          waveHeight: Math.random() * 40 + 20 // Height of wave
        }));
      case "stars":
        return [...baseParticles, ...Array.from({ length: Math.floor(actualParticleCount / 1.5) }).map((_, index) => {
          const size = Math.random() * 2 + 1; // Smaller sizes for stars
          return {
            id: index + actualParticleCount,
            size,
            initX: Math.random() * 100,
            initY: Math.random() * 100,
            color: colorMode === "multi" ? colorPalette[Math.floor(Math.random() * colorPalette.length)] : color,
            duration: Math.random() * 10 + 20, // Slower for twinkling effect
            delay: Math.random() * 20,
            opacity: Math.random() * 0.5 + 0.5, // Higher opacity for stars
            twinkle: true,
            rotation: Math.random() * 360
          };
        })];
      case "bubbles":
        return baseParticles.map(particle => ({
          ...particle,
          size: Math.random() * 15 + 5, // Bubbles are a bit bigger
          speed: Math.random() * 10 + 5, // Rising speed
          wobble: Math.random() * 10 + 5, // Wobble amount
          blur: Math.random() < 0.5 // Some bubbles are blurry
        }));
      case "cosmic":
        return [...baseParticles, ...Array.from({ length: Math.floor(actualParticleCount / 3) }).map((_, index) => {
          const size = Math.random() * 80 + 40; // Larger cosmic objects
          return {
            id: index + actualParticleCount * 2,
            size,
            initX: Math.random() * 100,
            initY: Math.random() * 100,
            color: colorMode === "multi" ? colorPalette[Math.floor(Math.random() * colorPalette.length)] : "bg-purple-600",
            duration: Math.random() * 40 + 60, // Very slow movement
            delay: Math.random() * 20,
            opacity: Math.random() * 0.15 + 0.05, // Very subtle opacity
            cosmic: true,
            rotation: Math.random() * 360,
            blur: true
          };
        })];
      case "neon":
        return baseParticles.map(particle => ({
          ...particle,
          size: Math.random() * 4 + 2, // Smaller for neon effect
          speed: Math.random() * 8 + 4,
          glow: true,
          tracer: Math.random() < 0.3, // Some particles leave trails
          tracerLength: Math.random() * 10 + 5
        }));
      case "matrix":
        const columns = 20;
        return Array.from({ length: columns }).map((_, colIndex) => {
          const streams = Math.floor(Math.random() * 3) + 1;
          return Array.from({ length: streams }).map((_, streamIndex) => ({
            id: colIndex * 10 + streamIndex,
            column: colIndex,
            initX: (colIndex / columns) * 100,
            initY: -(Math.random() * 100),
            speed: Math.random() * 5 + 3,
            length: Math.random() * 20 + 10,
            size: Math.random() * 2 + 2,
            color: "bg-green-500",
            opacity: Math.random() * 0.5 + 0.5,
            matrix: true
          }));
        }).flat();
      default:
        return baseParticles;
    }
  };

  const particles = generateParticles();

  // Get animation based on variant
  const getAnimation = (particle: any) => {
    let animation: any = {};
    
    switch (variant) {
      case "wave":
        animation = {
          y: [0, -particle.waveHeight, 0],
          x: [0, particle.waveWidth, 0],
          opacity: [particle.opacity, particle.opacity + 0.2, particle.opacity],
          rotate: particle.rotation + Math.random() * 360
        };
        break;
      case "stars":
        animation = particle.twinkle ? {
          opacity: [particle.opacity, particle.opacity - 0.3, particle.opacity],
          scale: [1, 1.2, 1],
          filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
        } : {
          y: [0, -30, 0],
          x: [0, Math.random() * 30 - 15, 0],
          opacity: [particle.opacity, particle.opacity + 0.2, particle.opacity],
          rotate: particle.rotation
        };
        break;
      case "bubbles":
        animation = {
          y: [0, -100 - particle.speed * 10],
          x: [0, Math.sin(particle.wobble) * 20, Math.cos(particle.wobble) * 20],
          opacity: [particle.opacity, 0],
          scale: [1, 1.2, 0.8],
          filter: particle.blur ? ["blur(0px)", "blur(2px)", "blur(1px)"] : []
        };
        break;
      case "cosmic":
        if (particle.cosmic) {
          animation = {
            rotate: [0, 360],
            scale: [1, 1.05, 0.95, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            filter: ["blur(4px)", "blur(8px)", "blur(4px)"]
          };
        } else {
          animation = {
            y: [0, Math.random() * 30 - 15],
            x: [0, Math.random() * 30 - 15],
            opacity: [particle.opacity, particle.opacity * 1.3, particle.opacity],
            scale: [1, 1.2, 1],
            rotate: particle.rotation + Math.random() * 180
          };
        }
        break;
      case "neon":
        animation = {
          y: [0, -50 - particle.speed * 5],
          x: [0, (Math.random() - 0.5) * 100],
          opacity: [particle.opacity, particle.opacity * 2, 0],
          scale: particle.tracer ? [0.3, 1, 0.5] : [1],
          filter: particle.glow ? ["blur(1px) brightness(150%)", "blur(3px) brightness(200%)", "blur(1px) brightness(150%)"] : []
        };
        break;
      case "matrix":
        if (particle.matrix) {
          animation = {
            y: [particle.initY, windowDimensions.height],
            opacity: [0, particle.opacity, particle.opacity, 0],
          };
        }
        break;
      default:
        animation = {
          y: [0, -100, 0],
          x: [0, Math.random() * 50 - 25, 0],
          opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
          scale: [1, 1.1, 1],
          rotate: particle.rotation
        };
    }
    
    return animation;
  };

  // Get transition based on variant
  const getTransition = (particle: any) => {
    let duration = particle.duration;
    
    // Apply speed multiplier
    duration *= speedMultiplier;
    
    switch (variant) {
      case "wave":
        return {
          duration,
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
          duration,
          repeat: Infinity,
          delay: particle.delay,
          ease: "easeInOut"
        };
      case "bubbles":
        return {
          duration: duration / 2,
          repeat: Infinity,
          delay: particle.delay,
          ease: "easeOut"
        };
      case "cosmic":
        return particle.cosmic ? {
          duration: duration * 2,
          repeat: Infinity,
          ease: "linear"
        } : {
          duration,
          repeat: Infinity,
          delay: particle.delay,
          ease: "easeInOut"
        };
      case "neon":
        return {
          duration: duration / 3,
          repeat: Infinity,
          delay: particle.delay,
          ease: "easeOut"
        };
      case "matrix":
        return {
          duration: particle.speed * 3,
          repeat: Infinity,
          delay: particle.delay,
          ease: "linear"
        };
      default:
        return {
          duration,
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
      const result = {
        x: -Math.cos(angle) * force,
        y: -Math.sin(angle) * force,
        scale: 1 + (1 - distance / radius) * 0.3,
        filter: glowEffect ? `brightness(${1 + (1 - distance / radius) * 0.5})` : undefined
      };
      
      // Add glow effect when near mouse
      if (glowEffect && distance < radius / 2) {
        const glowIntensity = 1 - distance / (radius / 2);
        result.filter = `brightness(${1 + glowIntensity * 1.3}) blur(${glowIntensity * 2}px)`;
      }
      
      return result;
    }
    
    return {};
  };
  
  // Generate special effects based on variant
  const renderSpecialEffects = () => {
    switch (variant) {
      case "neon":
        return (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50"
            animate={{
              opacity: [0.3, 0.5, 0.3],
              background: [
                "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%)",
                "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6) 100%)",
                "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%)"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        );
      case "cosmic":
        return (
          <>
            <motion.div 
              className="absolute inset-0 opacity-30"
              style={{ 
                background: "radial-gradient(circle, rgba(76, 29, 149, 0.5) 0%, rgba(0,0,0,0) 70%)",
                top: "30%",
                left: "40%",
                width: "60%",
                height: "60%"
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 15, repeat: Infinity }}
            />
            <motion.div 
              className="absolute inset-0 opacity-20"
              style={{ 
                background: "radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, rgba(0,0,0,0) 70%)",
                top: "10%",
                left: "20%",
                width: "70%",
                height: "70%"
              }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 20, repeat: Infinity }}
            />
          </>
        );
      case "matrix":
        return (
          <motion.div 
            className="absolute inset-0 opacity-30"
            style={{ 
              backgroundImage: "linear-gradient(0deg, rgba(0, 40, 0, 0.5) 0%, rgba(0, 20, 0, 0.2) 100%)",
            }}
            animate={{
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        );
      default:
        return null;
    }
  };

  // Get appropriate class for variant
  const getVariantClasses = () => {
    switch (variant) {
      case "cosmic":
        return "bg-gray-900 bg-opacity-90";
      case "neon":
        return "bg-gray-900 bg-opacity-95";
      case "matrix":
        return "bg-black bg-opacity-95";
      default:
        return "";
    }
  };
  
  // Get particle style based on variant
  const getParticleStyle = (particle: any) => {
    const baseStyle = {
      width: particle.size,
      height: particle.size,
      left: `${particle.initX}%`,
      top: `${particle.initY}%`,
      opacity: particle.opacity
    };
    
    if (variant === "neon" && particle.glow) {
      return {
        ...baseStyle,
        boxShadow: `0 0 ${particle.size * 2}px ${particle.color.replace('bg-', 'text-')}`
      };
    }
    
    if (variant === "cosmic" && particle.blur) {
      return {
        ...baseStyle,
        filter: `blur(${particle.size / 10}px)`
      };
    }
    
    if (variant === "matrix") {
      return {
        ...baseStyle,
        width: `2px`,
        height: `${particle.length}px`,
        opacity: particle.opacity
      };
    }
    
    return baseStyle;
  };
  
  // Get particle shape based on variant
  const getParticleShape = (particle: any) => {
    switch (variant) {
      case "stars":
        return particle.twinkle ? "rounded-full" : "mask-star";
      case "bubbles":
        return "rounded-full";
      case "cosmic":
        return particle.cosmic ? "rounded-full" : "mask-star";
      case "neon":
        return particle.tracer ? "w-0.5 h-10" : "rounded-full";
      case "matrix":
        return "";
      default:
        return Math.random() > 0.5 ? "rounded-full" : "rounded";
    }
  };
  
  // Generate a className for particle color based on mode
  const getParticleColorClass = (particle: any) => {
    if (colorMode === "gradient") {
      return "bg-gradient-to-br from-pegasus-orange to-pegasus-orange-600";
    }
    return particle.color || color;
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        getVariantClasses(),
        className
      )}
      ref={backgroundRef}
    >
      {/* Special background effects */}
      {renderSpecialEffects()}
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background/30 pointer-events-none"></div>
      
      {/* Background particles */}
      <AnimatePresence mode="sync">
        {particles.map((particle: any) => (
          <motion.div
            key={`${shouldRegenerate}-${particle.id}`}
            className={cn(
              getParticleShape(particle),
              getParticleColorClass(particle)
            )}
            style={getParticleStyle(particle)}
            animate={{
              ...getAnimation(particle),
              ...getInteractiveStyles(particle)
            }}
            transition={getTransition(particle)}
            whileHover={{ scale: 1.2, opacity: 0.8 }}
          />
        ))}
      </AnimatePresence>
      
      {/* Main content */}
      <motion.div 
        className="relative z-10"
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimatedBackground;

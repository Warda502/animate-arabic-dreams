import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "default" | "elegant" | "gradient" | "glow" | "glass" | "neo" | "minimal" | "3d";
  hoverEffect?: "scale" | "lift" | "glow" | "none" | "rotate" | "bounce" | "tilt" | "shine" | "flip" | "3d";
  whileInView?: boolean;
  onClick?: () => void;
  interactive3D?: boolean;
  contentDelay?: boolean; // Delay inner content reveal
  revealEffect?: "fade" | "slide" | "zoom" | "none";
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  delay = 0,
  variant = "default",
  hoverEffect = "lift",
  whileInView = true,
  onClick,
  interactive3D = false,
  contentDelay = false,
  revealEffect = "none"
}) => {
  // Refs and state
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const opacityControls = useAnimation();
  
  // For 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform values for tilt effect
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const getVariantClasses = () => {
    switch (variant) {
      case "elegant":
        return "bg-white dark:bg-gray-800 border border-pegasus-orange/20 dark:border-pegasus-orange/10";
      case "gradient":
        return "bg-gradient-to-br from-white to-pegasus-orange-50 dark:from-gray-800 dark:to-gray-900";
      case "glow":
        return "bg-white dark:bg-gray-800 border border-pegasus-orange/20 dark:border-pegasus-orange/10 shadow-glow";
      case "glass":
        return "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/20 dark:border-gray-700/30";
      case "neo":
        return "bg-white dark:bg-gray-800 border-none shadow-[5px_5px_15px_#d9d9d9,-5px_-5px_15px_#ffffff] dark:shadow-[5px_5px_15px_#1a1a1a,-5px_-5px_15px_#2c2c2c]";
      case "minimal":
        return "bg-transparent border border-gray-200 dark:border-gray-700 hover:border-pegasus-orange dark:hover:border-pegasus-orange/50";
      case "3d":
        return "bg-white dark:bg-gray-800 shadow-3d transform-gpu";
      default:
        return "bg-white dark:bg-gray-800";
    }
  };

  const getHoverAnimation = () => {
    if (interactive3D && (hoverEffect === "tilt" || hoverEffect === "3d")) {
      // 3D tilt is handled separately with mouse move
      return {};
    }
    
    switch (hoverEffect) {
      case "scale":
        return { scale: 1.03 };
      case "lift":
        return { y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" };
      case "glow":
        return { boxShadow: "0 0 15px rgba(249, 115, 22, 0.5)" };
      case "rotate":
        return { rotate: 1, scale: 1.02 };
      case "bounce":
        return { y: [0, -5, 0] };
      case "flip":
        return { rotateY: 180 };
      case "shine":
        return {}; // Shine effect is handled separately
      default:
        return {};
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive3D) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Update motion values for 3D effect
    x.set(mouseX);
    y.set(mouseY);
    
    // For shine effect
    const posX = (e.clientX - rect.left) / rect.width;
    const posY = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x: posX, y: posY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (revealEffect !== "none") {
      opacityControls.start({ opacity: 1, y: 0, transition: { duration: 0.3 } });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    
    if (revealEffect !== "none") {
      opacityControls.start({ opacity: 0.9, y: 0, transition: { duration: 0.3 } });
    }
  };

  // Initial animation
  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
    
    if (revealEffect !== "none" && !contentDelay) {
      opacityControls.start({ opacity: 1, y: 0 });
    } else if (contentDelay) {
      opacityControls.start({ opacity: 0, y: 10 });
    }
  }, []);

  // 3D rotation style
  const tiltStyle = interactive3D && (hoverEffect === "tilt" || hoverEffect === "3d") ? {
    rotateX: rotateX,
    rotateY: rotateY,
    transformPerspective: 1000,
  } : {};

  // Shine effect gradient style for "shine" hoverEffect
  const shineStyle = hoverEffect === "shine" && isHovered ? {
    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
  } : {};

  const motionProps = whileInView 
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.5, delay: delay * 0.2 }
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: controls,
        transition: { duration: 0.5, delay: delay * 0.2 }
      };

  // Content reveal animation
  const getContentAnimation = () => {
    switch (revealEffect) {
      case "fade":
        return { initial: { opacity: 0 }, animate: opacityControls };
      case "slide":
        return { initial: { opacity: 0, y: 10 }, animate: opacityControls };
      case "zoom":
        return { initial: { opacity: 0, scale: 0.95 }, animate: opacityControls };
      default:
        return {};
    }
  };

  // Flip animation for "flip" hoverEffect
  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 }
  };

  return (
    <motion.div 
      ref={cardRef}
      {...motionProps}
      whileHover={getHoverAnimation()}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...tiltStyle,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "will-change-transform",
        hoverEffect === "flip" && "relative perspective-1000"
      )}
    >
      {/* Shine overlay */}
      {hoverEffect === "shine" && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={shineStyle}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Flip animation */}
      {hoverEffect === "flip" ? (
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isHovered ? "back" : "front"}
            variants={flipVariants}
            initial="front"
            animate={isHovered ? "back" : "front"}
            exit="front"
            transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
            style={{ backfaceVisibility: "hidden" }}
            className="w-full"
          >
            <Card
              className={cn(
                "rounded-lg shadow-md overflow-hidden",
                getVariantClasses(),
                className,
                onClick ? "cursor-pointer" : ""
              )}
            >
              {children}
            </Card>
          </motion.div>
        </AnimatePresence>
      ) : (
        <Card
          className={cn(
            "rounded-lg shadow-md overflow-hidden",
            getVariantClasses(),
            className,
            onClick ? "cursor-pointer" : ""
          )}
        >
          {revealEffect !== "none" ? (
            <motion.div {...getContentAnimation()}>
              {children}
            </motion.div>
          ) : (
            children
          )}
        </Card>
      )}
    </motion.div>
  );
};

export default AnimatedCard;

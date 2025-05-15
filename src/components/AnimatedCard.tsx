
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "default" | "elegant" | "gradient" | "glow" | "glass";
  hoverEffect?: "scale" | "lift" | "glow" | "none" | "rotate" | "bounce";
  whileInView?: boolean;
  onClick?: () => void; // Added onClick handler to the interface
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  delay = 0,
  variant = "default",
  hoverEffect = "lift",
  whileInView = true,
  onClick // Destructure the onClick prop
}) => {
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
      default:
        return "bg-white dark:bg-gray-800";
    }
  };

  const getHoverAnimation = () => {
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
      default:
        return {};
    }
  };
  
  const motionProps = whileInView 
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.5, delay: delay * 0.2 }
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: delay * 0.2 }
      };

  return (
    <motion.div 
      {...motionProps}
      whileHover={getHoverAnimation()}
      transition={{
        duration: 0.3
      }}
      onClick={onClick} // Apply the onClick handler to the motion.div
    >
      <Card
        className={cn(
          "rounded-lg shadow-md overflow-hidden",
          getVariantClasses(),
          className,
          onClick ? "cursor-pointer" : "" // Add cursor-pointer class when onClick is provided
        )}
      >
        {children}
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;

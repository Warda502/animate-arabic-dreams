
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "default" | "elegant" | "gradient" | "glow";
  hoverEffect?: "scale" | "lift" | "glow" | "none";
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  delay = 0,
  variant = "default",
  hoverEffect = "lift"
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "elegant":
        return "bg-white dark:bg-gray-800 border border-orange-100 dark:border-orange-900/30";
      case "gradient":
        return "bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900";
      case "glow":
        return "bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-700/30 shadow-glow";
      default:
        return "bg-white dark:bg-gray-800";
    }
  };

  const getHoverEffectClasses = () => {
    switch (hoverEffect) {
      case "scale":
        return "transition-transform duration-300 hover:scale-105";
      case "lift":
        return "transition-all duration-300 hover:-translate-y-2 hover:shadow-lg";
      case "glow":
        return "transition-all duration-300 hover:shadow-glow";
      default:
        return "";
    }
  };

  const getDelayClass = () => {
    switch (delay) {
      case 0.1:
        return "animate-fade-in-delay-1";
      case 0.2:
        return "animate-fade-in-delay-2";
      case 0.3:
        return "animate-fade-in-delay-3";
      case 0.4:
        return "animate-fade-in-delay-4";
      case 0.5:
        return "animate-fade-in-delay-5";
      default:
        return "animate-fade-in";
    }
  };

  return (
    <Card
      className={cn(
        "rounded-lg shadow-md overflow-hidden opacity-0",
        getVariantClasses(),
        getHoverEffectClasses(),
        getDelayClass(),
        className
      )}
    >
      {children}
    </Card>
  );
};

export default AnimatedCard;

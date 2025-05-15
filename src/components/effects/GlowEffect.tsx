
import React, { HTMLAttributes, forwardRef } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowEffectProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
  intensity?: "low" | "medium" | "high";
  active?: boolean;
  pulse?: boolean;
  className?: string;
  containerClassName?: string;
  borderGlow?: boolean;
  motionProps?: MotionProps;
}

const GlowEffect = forwardRef<HTMLDivElement, GlowEffectProps>(({
  children,
  color = "rgba(249, 115, 22, 0.6)", // pegasus orange
  intensity = "medium",
  active = true,
  pulse = false,
  className = "",
  containerClassName = "",
  borderGlow = false,
  motionProps = {},
  ...props
}, ref) => {
  // Calculate glow size based on intensity
  const glowSize = intensity === "low" ? "15px" : intensity === "high" ? "35px" : "25px";
  const glowOpacity = intensity === "low" ? 0.4 : intensity === "high" ? 0.8 : 0.6;
  
  // Pulse animation for the glow
  const pulseAnimation = pulse ? {
    animate: {
      boxShadow: [
        `0 0 ${glowSize} ${color}`,
        `0 0 ${parseInt(glowSize) * 1.5}px ${color}`,
        `0 0 ${glowSize} ${color}`
      ],
      opacity: [glowOpacity, glowOpacity * 1.2, glowOpacity]
    },
    transition: { 
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut"
    }
  } : {};
  
  // Box shadow for the glow effect
  const glowStyles = active ? {
    position: "relative",
    boxShadow: `0 0 ${glowSize} ${color}`,
    opacity: glowOpacity,
    ...pulseAnimation.animate
  } : {};
  
  // Border glow styles
  const borderStyles = borderGlow && active ? {
    border: "1px solid",
    borderColor: color.replace("rgba", "rgb").replace(/,[^,]+\)/, ")")
  } : {};
  
  return (
    <div className={cn("relative", containerClassName)}>
      <motion.div
        ref={ref}
        className={cn("rounded-lg overflow-hidden", className)}
        style={{ ...glowStyles, ...borderStyles }}
        initial={active ? { opacity: 0 } : {}}
        animate={active ? { opacity: glowOpacity } : {}}
        {...pulseAnimation}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
});

GlowEffect.displayName = "GlowEffect";

export default GlowEffect;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  variant?: 
    "default" | 
    "primary" | 
    "secondary" | 
    "outline" | 
    "ghost" | 
    "link" | 
    "gradient" | 
    "glowing" | 
    "neon" | 
    "glass";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  animation?: 
    "pulse" | 
    "bounce" | 
    "ripple" | 
    "shine" | 
    "slide" | 
    "magnetic" |
    "none";
  fullWidth?: boolean;
  rounded?: "sm" | "md" | "lg" | "full";
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  icon: Icon,
  iconPosition = "left",
  variant = "default",
  size = "md",
  animation = "none",
  fullWidth = false,
  rounded = "md",
  ...props
}) => {
  // State for animations and interactions
  const [ripple, setRipple] = useState({ x: 0, y: 0, active: false });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Base style configs
  const variantStyles = {
    default: "bg-pegasus-orange hover:bg-pegasus-orange-600 text-white",
    primary: "bg-pegasus-orange hover:bg-pegasus-orange-600 text-white",
    secondary: "bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white",
    outline: "border-2 border-pegasus-orange text-pegasus-orange hover:bg-pegasus-orange/10",
    ghost: "text-pegasus-orange hover:bg-pegasus-orange-50 dark:hover:bg-pegasus-orange/10",
    link: "text-pegasus-orange underline hover:text-pegasus-orange-600",
    gradient: "bg-gradient-to-r from-pegasus-orange via-pegasus-orange-500 to-pegasus-orange-600 hover:opacity-90 text-white",
    glowing: "bg-pegasus-orange text-white shadow-lg hover:shadow-neon",
    neon: "bg-transparent border-2 border-pegasus-orange text-pegasus-orange shadow-[0_0_10px_rgba(249,115,22,0.5)] hover:shadow-[0_0_20px_rgba(249,115,22,0.8)]",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
  };

  const sizeStyles = {
    xs: "py-1 px-2 text-xs",
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-2.5 px-5 text-lg",
    xl: "py-3 px-6 text-xl"
  };

  const roundedStyles = {
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full"
  };

  // Magnetic effect handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (animation === "magnetic") {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePosition({ x, y });
    }
  };

  // Ripple effect handler
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (animation === "ripple") {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipple({ x, y, active: true });
      setTimeout(() => setRipple({ x: 0, y: 0, active: false }), 600);
    }
  };

  // Animation variants
  const getAnimationProps = () => {
    switch (animation) {
      case "pulse":
        return {
          whileHover: { scale: [1, 1.03, 1], transition: { repeat: Infinity, duration: 1.5 } }
        };
      case "bounce":
        return {
          whileHover: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.6 } }
        };
      case "magnetic":
        return {
          style: {
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
          }
        };
      default:
        return {
          whileHover: { scale: 1.03 },
          whileTap: { scale: 0.97 }
        };
    }
  };

  const animationProps = getAnimationProps();
  const buttonClassNames = cn(
    "shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center",
    variantStyles[variant as keyof typeof variantStyles],
    sizeStyles[size],
    roundedStyles[rounded],
    fullWidth ? "w-full" : "",
    animation === "ripple" || animation === "shine" || animation === "slide" ? "overflow-hidden relative" : "",
    className
  );

  // 3D effect for pressed state
  const pressedStyle = isPressed 
    ? { transform: "translateY(2px)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)" } 
    : {};

  return (
    <motion.div
      {...animationProps}
      className={cn("inline-block", fullWidth && "w-full")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      <Button 
        className={buttonClassNames}
        onClick={handleRipple}
        onMouseMove={handleMouseMove}
        style={{
          ...animationProps.style,
          ...pressedStyle
        }}
        {...props}
      >
        {/* Ripple effect */}
        {animation === "ripple" && ripple.active && (
          <span 
            className="absolute bg-white/30 rounded-full animate-ripple" 
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 10,
              height: 10,
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}
        
        {/* Shine effect */}
        {animation === "shine" && isHovered && (
          <span className="absolute inset-0 overflow-hidden">
            <motion.span 
              className="absolute top-0 left-[-100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-15"
              animate={{ left: ['0%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
            />
          </span>
        )}
        
        {/* Slide effect */}
        {animation === "slide" && (
          <span className="absolute inset-0 overflow-hidden">
            <motion.span 
              className="absolute inset-0 bg-white/20"
              initial={{ x: -100, opacity: 0 }}
              whileHover={{ x: 300, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </span>
        )}
        
        {/* Icon on left */}
        {Icon && iconPosition === "left" && (
          <motion.span
            animate={isHovered ? { rotate: [0, 15, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="mr-2"
          >
            <Icon className="h-4 w-4" />
          </motion.span>
        )}
        
        {/* Content */}
        <span>{children}</span>
        
        {/* Icon on right */}
        {Icon && iconPosition === "right" && (
          <motion.span
            animate={isHovered ? { x: [0, 5, 0] } : {}}
            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 0.5 }}
            className="ml-2"
          >
            <Icon className="h-4 w-4" />
          </motion.span>
        )}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;

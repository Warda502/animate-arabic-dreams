
import React from "react";
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
    "glowing";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  animation?: 
    "pulse" | 
    "bounce" | 
    "ripple" | 
    "shine" | 
    "slide" | 
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
  // Base style configs - تحديث الألوان لتكون متناسقة
  const variantStyles = {
    default: "bg-pegasus-orange hover:bg-pegasus-orange-600 text-white",
    primary: "bg-pegasus-orange hover:bg-pegasus-orange-600 text-white",
    secondary: "bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white",
    outline: "border-2 border-pegasus-orange text-pegasus-orange hover:bg-pegasus-orange/10",
    ghost: "text-pegasus-orange hover:bg-pegasus-orange-50 dark:hover:bg-pegasus-orange/10",
    link: "text-pegasus-orange underline hover:text-pegasus-orange-600",
    gradient: "bg-orange-gradient hover:opacity-90 text-white",
    glowing: "bg-pegasus-orange text-white shadow-lg hover:shadow-neon"
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
      case "ripple":
        return {
          whileHover: {},
          className: "overflow-hidden relative"
        };
      case "shine":
        return {
          whileHover: {},
          className: "overflow-hidden relative"
        };
      case "slide":
        return {
          whileHover: {},
          className: "overflow-hidden relative"
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
    variantStyles[variant],
    sizeStyles[size],
    roundedStyles[rounded],
    fullWidth ? "w-full" : "",
    animation === "ripple" || animation === "shine" || animation === "slide" ? "overflow-hidden relative" : "",
    className
  );

  // Ripple effect state
  const [ripple, setRipple] = React.useState({ x: 0, y: 0, active: false });

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

  return (
    <motion.div
      {...animationProps}
      className={cn("inline-block", fullWidth && "w-full")}
    >
      <Button 
        className={buttonClassNames}
        onClick={handleRipple}
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
        {animation === "shine" && (
          <span className="absolute inset-0 overflow-hidden">
            <span className="absolute top-0 left-[-100%] w-[60%] h-full bg-shimmer transform skew-x-15 animate-shimmer"></span>
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
            ></motion.span>
          </span>
        )}
        
        {/* Icon on left */}
        {Icon && iconPosition === "left" && <Icon className="mr-2 h-4 w-4" />}
        
        {/* Content */}
        <span>{children}</span>
        
        {/* Icon on right */}
        {Icon && iconPosition === "right" && <Icon className="ml-2 h-4 w-4" />}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;

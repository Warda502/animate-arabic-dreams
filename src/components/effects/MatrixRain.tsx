
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { rafThrottle } from "@/lib/animation-performance";

interface MatrixRainProps {
  className?: string;
  children?: React.ReactNode;
  color?: string;
  fontSize?: number;
  density?: "low" | "medium" | "high";
  speed?: "slow" | "normal" | "fast" | "high";
  fadeOut?: boolean;
  customCharacters?: string;
  interactive?: boolean;
}

const MatrixRain: React.FC<MatrixRainProps> = ({
  className,
  children,
  color = "#10B981", // Default green color
  fontSize = 14,
  density = "medium",
  speed = "normal",
  fadeOut = true,
  customCharacters = "",
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let columns: number[] = [];
    let columnCount: number = 0;
    
    // Set canvas size to match parent dimensions
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Calculate column count based on font size and density
      const densityFactor = density === "low" ? 0.5 : density === "high" ? 2 : 1;
      columnCount = Math.floor(canvas.width / (fontSize * densityFactor));
      
      // Initialize column values
      columns = Array.from({ length: columnCount }).map(() => canvas.height);
    };
    
    // Create throttled resize handler
    const handleResize = rafThrottle(resizeCanvas);
    
    // Initialize
    resizeCanvas();
    
    // Handle mouse movement for interactivity
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    // Characters to use in the rain
    let characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    // Use custom characters if provided
    if (customCharacters) {
      characters = customCharacters;
    }
    
    // Speed factor based on speed prop
    const speedFactor = speed === "slow" ? 0.5 : speed === "fast" || speed === "high" ? 2 : 1;
    
    // Draw function
    const draw = () => {
      // Apply semi-transparent black to create trail effect
      if (fadeOut) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Set color and font
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
      
      // For each column
      for (let i = 0; i < columns.length; i++) {
        // Get random character
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Calculate x position for this column
        const x = i * fontSize;
        
        // Interactive effect - increase rain speed near mouse
        let ySpeed = speedFactor;
        if (interactive) {
          const dx = x - mousePosition.x;
          const dy = columns[i] - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ySpeed = speedFactor * 3; // Triple speed near mouse
          }
        }
        
        // Draw character
        ctx.fillText(char, x, columns[i]);
        
        // Move down the column
        columns[i] += fontSize * ySpeed;
        
        // Reset if hits bottom or random reset for variation
        if (columns[i] > canvas.height && Math.random() > 0.98) {
          columns[i] = 0;
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    // Initial draw
    draw();
    
    // Event listeners
    window.addEventListener("resize", handleResize);
    if (interactive) {
      canvas.addEventListener("mousemove", handleMouseMove);
    }
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [color, fontSize, density, speed, fadeOut, customCharacters, interactive]);
  
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
      {children && (
        <div className="relative z-10">{children}</div>
      )}
    </div>
  );
};

export default MatrixRain;

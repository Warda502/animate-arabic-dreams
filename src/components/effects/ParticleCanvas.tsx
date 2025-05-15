
import React, { useEffect, useRef, useState } from "react";
import { rafThrottle } from "@/lib/animation-performance";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  shape: "circle" | "square" | "triangle" | "star";
}

interface ParticleCanvasProps {
  className?: string;
  particleCount?: number;
  particleColor?: string | string[];
  backgroundColor?: string;
  interactive?: boolean;
  speed?: number;
  shapes?: ("circle" | "square" | "triangle" | "star")[];
  maxSize?: number;
  trail?: boolean;
  connectedLines?: boolean;
  glowEffect?: boolean;
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  className,
  particleCount = 50,
  particleColor = "#F97316", // pegasus orange
  backgroundColor = "transparent",
  interactive = false,
  speed = 1,
  shapes = ["circle"],
  maxSize = 5,
  trail = false,
  connectedLines = false,
  glowEffect = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isMouseDownRef = useRef(false);
  const animationFrameRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Function to get a random color from array or return the single color
  const getRandomColor = () => {
    if (Array.isArray(particleColor)) {
      return particleColor[Math.floor(Math.random() * particleColor.length)];
    }
    return particleColor;
  };
  
  // Function to get a random shape
  const getRandomShape = () => {
    return shapes[Math.floor(Math.random() * shapes.length)];
  };
  
  // Function to initialize particles
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * maxSize + 1,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        color: getRandomColor(),
        alpha: Math.random() * 0.8 + 0.2,
        shape: getRandomShape()
      });
    }
    
    particlesRef.current = particles;
  };
  
  // Function to draw a particle
  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.globalAlpha = particle.alpha;
    ctx.fillStyle = particle.color;
    
    if (glowEffect) {
      ctx.shadowBlur = particle.size * 3;
      ctx.shadowColor = particle.color;
    }
    
    switch (particle.shape) {
      case "square":
        ctx.fillRect(
          particle.x - particle.size / 2,
          particle.y - particle.size / 2,
          particle.size,
          particle.size
        );
        break;
        
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y - particle.size);
        ctx.lineTo(particle.x + particle.size, particle.y + particle.size);
        ctx.lineTo(particle.x - particle.size, particle.y + particle.size);
        ctx.closePath();
        ctx.fill();
        break;
        
      case "star":
        let spikes = 5;
        let outerRadius = particle.size;
        let innerRadius = particle.size / 2;
        
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          let radius = i % 2 === 0 ? outerRadius : innerRadius;
          let angle = (Math.PI / spikes) * i;
          let x = particle.x + Math.cos(angle) * radius;
          let y = particle.y + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        break;
        
      default: // circle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    if (glowEffect) {
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
    }
    
    ctx.globalAlpha = 1;
  };
  
  // Function to draw connecting lines between nearby particles
  const drawConnections = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    const maxDistance = 100; // Maximum distance to draw connections
    
    ctx.strokeStyle = Array.isArray(particleColor) ? particleColor[0] : particleColor;
    ctx.lineWidth = 0.3;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          // Opacity based on distance
          const opacity = 1 - distance / maxDistance;
          ctx.globalAlpha = opacity * 0.5;
          
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    ctx.globalAlpha = 1;
  };
  
  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    
    if (!canvas || !ctx) return;
    
    // Clear canvas or create trail effect
    if (!trail) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = backgroundColor + "20"; // Add some transparency for trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Update and draw particles
    particlesRef.current.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX = -particle.speedX;
      }
      
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY = -particle.speedY;
      }
      
      // Interactive effect
      if (interactive && isMouseDownRef.current) {
        const dx = particle.x - mousePositionRef.current.x;
        const dy = particle.y - mousePositionRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.speedX += dx * force * 0.01;
          particle.speedY += dy * force * 0.01;
        }
      }
      
      // Speed limit
      const maxSpeed = 2 * speed;
      const currentSpeed = Math.sqrt(
        particle.speedX * particle.speedX + particle.speedY * particle.speedY
      );
      
      if (currentSpeed > maxSpeed) {
        particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
        particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
      }
      
      drawParticle(ctx, particle);
    });
    
    // Draw connections if enabled
    if (connectedLines) {
      drawConnections(ctx, particlesRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(animate);
  };
  
  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      setDimensions({ width: rect.width, height: rect.height });
      
      // Re-initialize particles when resizing
      initParticles(rect.width, rect.height);
    };
    
    // Optimized resize handler
    const handleResize = rafThrottle(resizeCanvas);
    
    // Initial setup
    resizeCanvas();
    
    // Mouse interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleMouseDown = () => {
      isMouseDownRef.current = true;
    };
    
    const handleMouseUp = () => {
      isMouseDownRef.current = false;
    };
    
    if (interactive) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("mouseleave", handleMouseUp);
      
      // Touch events for mobile
      canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        if (e.touches.length > 0) {
          const rect = canvas.getBoundingClientRect();
          mousePositionRef.current = {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
          };
        }
      });
      
      canvas.addEventListener("touchstart", () => {
        isMouseDownRef.current = true;
      });
      
      canvas.addEventListener("touchend", () => {
        isMouseDownRef.current = false;
      });
    }
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Listen for resize events
    window.addEventListener("resize", handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
      
      if (interactive) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("mouseleave", handleMouseUp);
        
        canvas.removeEventListener("touchmove", (e) => e.preventDefault());
        canvas.removeEventListener("touchstart", () => {
          isMouseDownRef.current = true;
        });
        canvas.removeEventListener("touchend", () => {
          isMouseDownRef.current = false;
        });
      }
    };
  }, [backgroundColor, particleCount, particleColor, speed, shapes, maxSize, trail, connectedLines, interactive, glowEffect]);
  
  return (
    <canvas 
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ParticleCanvas;

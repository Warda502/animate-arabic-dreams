
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAnimationUtils } from '@/hooks/useAnimationUtils';

const LoadingAnimation: React.FC = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const { deferAnimation } = useAnimationUtils();

  // BEOLWO TOOL colors
  const orangeColor = "#F97316";
  const whiteColor = "#FFFFFF";
  const outlineColor = "#FFFFFF";

  // SVG animation variants
  const pathVariants = {
    hidden: { 
      pathLength: 0, 
      opacity: 0,
      fill: "rgba(249, 115, 22, 0)" 
    },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      fill: "rgba(249, 115, 22, 1)",
      transition: {
        pathLength: { 
          type: "spring", 
          duration: 1.8,
          bounce: 0.3,
          delay: i * 0.15
        },
        opacity: { 
          duration: 0.5, 
          delay: i * 0.15 
        },
        fill: { 
          duration: 0.8, 
          delay: 1.8 + i * 0.15 
        }
      }
    })
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        type: "spring",
        bounce: 0.4,
        delay: 2 + i * 0.1
      }
    })
  };

  // Particle system
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 3
  }));

  useEffect(() => {
    // Complete animation after 5.5 seconds
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={animationComplete ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        if (animationComplete) {
          // Using document.body.classList to avoid needing refs
          document.body.classList.remove('loading');
          document.body.classList.add('loaded');
          
          // Remove loading root after animation
          const loadingRoot = document.getElementById('loading-root');
          if (loadingRoot && loadingRoot.parentNode) {
            loadingRoot.parentNode.removeChild(loadingRoot);
          }
        }
      }}
      className="fixed inset-0 flex items-center justify-center bg-black z-50 overflow-hidden"
    >
      {/* Particle system */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-pegasus-orange"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
              scale: 0
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: `${particle.x + (Math.random() * 20 - 10)}%`,
              y: `${particle.y + (Math.random() * 20 - 10)}%`
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 2
            }}
            style={{
              width: particle.size,
              height: particle.size
            }}
          />
        ))}
      </div>

      {/* Glow effect behind logo */}
      <motion.div
        className="absolute w-64 h-64 bg-pegasus-orange rounded-full filter blur-[80px] opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="w-full max-w-md relative">
        <motion.svg 
          viewBox="0 0 600 230" 
          className="w-full"
          initial="hidden"
          animate="visible"
        >
          {/* Triangle 1 (left triangle) */}
          <motion.path
            d="M80 65 L150 120 L80 175 Z"
            stroke={outlineColor}
            strokeWidth="3"
            fill="transparent"
            custom={0}
            variants={pathVariants}
          />
          
          {/* Triangle 2 (right triangle) */}
          <motion.path
            d="M160 65 L230 120 L160 175 Z"
            stroke={outlineColor}
            strokeWidth="3"
            fill="transparent"
            custom={0.3}
            variants={pathVariants}
          />

          {/* Text: B */}
          <motion.path
            d="M260 90 L260 160 L305 160 C315 160 325 150 325 140 C325 130 315 125 305 125 L260 125 M260 125 L305 125 C315 125 325 115 325 105 C325 95 315 90 305 90 L260 90 Z"
            stroke={outlineColor}
            strokeWidth="3"
            fill="transparent"
            custom={0.6}
            variants={pathVariants}
          />

          {/* Text: E */}
          <motion.path
            d="M335 90 L335 160 L385 160 M335 90 L385 90 M335 125 L375 125"
            stroke={outlineColor}
            strokeWidth="3"
            fill="transparent"
            custom={0.9}
            variants={pathVariants}
          />

          {/* Text: O */}
          <motion.path
            d="M395 90 C380 90 370 100 370 125 C370 150 380 160 395 160 C410 160 420 150 420 125 C420 100 410 90 395 90 Z"
            stroke={outlineColor}
            strokeWidth="3" 
            fill="transparent"
            custom={1.2}
            variants={pathVariants}
          />

          {/* Text: L */}
          <motion.path
            d="M430 90 L430 160 L480 160"
            stroke={outlineColor}
            strokeWidth="3"
            fill="transparent"
            custom={1.5}
            variants={pathVariants}
          />

          {/* Text: W */}
          <motion.path
            d="M490 90 L505 160 L520 110 L535 160 L550 90"
            stroke={outlineColor}
            strokeWidth="3"
            fill="transparent"
            custom={1.8}
            variants={pathVariants}
          />

          {/* Text: O */}
          <motion.path
            d="M560 90 C545 90 535 100 535 125 C535 150 545 160 560 160 C575 160 585 150 585 125 C585 100 575 90 560 90 Z"
            stroke={outlineColor}
            strokeWidth="3"
            fill="transparent"
            custom={2.1}
            variants={pathVariants}
          />

          {/* Text: T */}
          <motion.path
            d="M290 180 L350 180 M320 180 L320 230"
            stroke={outlineColor}
            strokeWidth="3"
            fill="transparent"
            custom={2.4}
            variants={pathVariants}
          />

          {/* Text: O */}
          <motion.path
            d="M360 180 C345 180 335 190 335 205 C335 220 345 230 360 230 C375 230 385 220 385 205 C385 190 375 180 360 180 Z"
            stroke={outlineColor}
            strokeWidth="3"
            fill="transparent"
            custom={2.7}
            variants={pathVariants}
          />

          {/* Text: O */}
          <motion.path
            d="M395 180 C380 180 370 190 370 205 C370 220 380 230 395 230 C410 230 420 220 420 205 C420 190 410 180 395 180 Z"
            stroke={outlineColor}
            strokeWidth="3"
            fill="transparent"
            custom={3.0}
            variants={pathVariants}
          />

          {/* Text: L */}
          <motion.path
            d="M430 180 L430 230 L470 230"
            stroke={outlineColor}
            strokeWidth="3"
            fill="transparent"
            custom={3.3}
            variants={pathVariants}
          />
        </motion.svg>

        {/* Additional animated elements around the logo */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-pegasus-orange"
            initial={{ x: -20, y: -20, opacity: 0 }}
            animate={{ 
              x: ['-10%', '110%'],
              y: ['10%', '90%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-pegasus-orange"
            initial={{ right: -20, bottom: -20, opacity: 0 }}
            animate={{ 
              right: ['10%', '90%'],
              bottom: ['90%', '10%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3.5,
              delay: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      {/* Loading progress bar */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <motion.div 
          className="relative w-64 h-6 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "easeInOut" }}
              className="h-full bg-pegasus-orange rounded-full"
            />
          </div>
          <motion.p 
            className="text-white mt-2 font-bold tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ 
              duration: 2, 
              repeat: 2, 
              repeatType: "reverse" 
            }}
          >
            Loading...
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;


import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAnimationUtils } from '@/hooks/useAnimationUtils';

const LoadingAnimation: React.FC = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const { deferAnimation } = useAnimationUtils();

  // Logo colors
  const orangeColor = "#F97316";
  const whiteColor = "#FFFFFF";

  // SVG animation variants
  const pathVariants = {
    hidden: { pathLength: 0, fill: "rgba(249, 115, 22, 0)" },
    visible: (i: number) => ({
      pathLength: 1,
      fill: "rgba(249, 115, 22, 1)",
      transition: {
        pathLength: { 
          type: "spring", 
          duration: 2.5,
          bounce: 0,
          delay: i * 0.3
        },
        fill: { 
          duration: 0.8, 
          delay: 2.5 + i * 0.3 
        }
      }
    })
  };

  const textVariants = {
    hidden: { 
      opacity: 0
    },
    visible: (i: number) => ({
      opacity: 1,
      transition: { 
        duration: 1,
        delay: 3 + i * 0.1
      }
    })
  };

  useEffect(() => {
    // Complete animation after 5 seconds
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
        }
      }}
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
    >
      <div className="w-full max-w-md">
        <motion.svg 
          viewBox="0 0 600 230" 
          className="w-full"
          initial="hidden"
          animate="visible"
        >
          {/* Logo shape - left block */}
          <motion.path
            d="M120 70 L120 190 L180 150 L180 110 Z"
            stroke={whiteColor}
            strokeWidth="4"
            custom={0}
            variants={pathVariants}
          />
          
          {/* Logo shape - right block */}
          <motion.path
            d="M190 70 L190 150 L240 110 L240 110 Z"
            stroke={whiteColor} 
            strokeWidth="4"
            custom={1}
            variants={pathVariants}
          />

          {/* Text: PEGASUS */}
          <motion.path
            d="M290 90 L290 110 L310 110 C315 110 320 105 320 100 C320 95 315 90 310 90 L290 90 Z M290 110 L290 130 L310 130 C315 130 320 125 320 120 C320 115 315 110 310 110 L290 110 Z"
            stroke={whiteColor}
            strokeWidth="3"
            custom={2}
            variants={pathVariants}
          />

          <motion.path
            d="M330 90 L330 130 L370 130 L370 120 L340 120 L340 115 L365 115 L365 105 L340 105 L340 100 L370 100 L370 90 Z"
            stroke={whiteColor}
            strokeWidth="3"
            custom={2.3}
            variants={pathVariants}
          />

          <motion.path
            d="M380 90 C375 90 370 95 370 100 L370 120 C370 125 375 130 380 130 L395 130 C400 130 405 125 405 120 L405 100 C405 95 400 90 395 90 Z M380 100 L395 100 L395 120 L380 120 Z"
            stroke={whiteColor}
            strokeWidth="3"
            custom={2.6}
            variants={pathVariants}
          />

          <motion.path
            d="M415 90 L415 130 L455 130 L455 120 L425 120 L425 90 Z"
            stroke={whiteColor}
            strokeWidth="3"
            custom={2.9}
            variants={pathVariants}
          />

          <motion.path
            d="M465 90 L465 115 C465 125 475 135 485 130 L495 130 C505 135 515 125 515 115 L515 90 L505 90 L505 115 C505 120 495 120 495 115 L495 90 L485 90 L485 115 C485 120 475 120 475 115 L475 90 Z"
            stroke={whiteColor}
            strokeWidth="3"
            custom={3.2}
            variants={pathVariants}
          />

          <motion.path
            d="M525 90 C520 90 515 95 515 100 L515 120 C515 125 520 130 525 130 L540 130 C545 130 550 125 550 120 L550 100 C550 95 545 90 540 90 Z M525 100 L540 100 L540 120 L525 120 Z"
            stroke={whiteColor}
            strokeWidth="3"
            custom={3.5}
            variants={pathVariants}
          />

          {/* Text: TOOL */}
          <motion.path
            d="M320 150 L320 170 L360 170 L360 160 L345 160 L345 190 L335 190 L335 160 L320 160 Z"
            stroke={whiteColor}
            strokeWidth="3"
            custom={4}
            variants={pathVariants}
          />

          <motion.path
            d="M370 150 C365 150 360 155 360 160 L360 180 C360 185 365 190 370 190 L385 190 C390 190 395 185 395 180 L395 160 C395 155 390 150 385 150 Z M370 160 L385 160 L385 180 L370 180 Z"
            stroke={whiteColor}
            strokeWidth="3"
            custom={4.3}
            variants={pathVariants}
          />

          <motion.path
            d="M405 150 C400 150 395 155 395 160 L395 180 C395 185 400 190 405 190 L420 190 C425 190 430 185 430 180 L430 160 C430 155 425 150 420 150 Z M405 160 L420 160 L420 180 L405 180 Z"
            stroke={whiteColor}
            strokeWidth="3"
            custom={4.6}
            variants={pathVariants}
          />

          <motion.path
            d="M440 150 L440 190 L450 190 L450 150 Z"
            stroke={whiteColor}
            strokeWidth="3"
            custom={5}
            variants={pathVariants}
          />
        </motion.svg>
      </div>

      {/* Loading text */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 text-center text-white text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.span
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "easeInOut" }}
          className="inline-block h-1 bg-pegasus-orange rounded-full absolute bottom-0 left-0"
        />
        Loading...
      </motion.div>
    </motion.div>
  );
};

export default LoadingAnimation;

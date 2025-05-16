
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
  const pegasusPathData = "m360.6 212.1h-25.7v20.9h-20.1v-20.8l19.2-17.7h23.5q4.1 0 6.5-2.4 2.6-2.5 2.6-6.6 0-4.1-2.6-6.3-2.4-2.2-6.5-2.2h-28l-14.7-17.6h45.8q5.9 0 10.7 1.9 4.8 1.9 8.2 5.4 3.5 3.5 5.3 8.3 1.9 4.8 1.9 10.7 0 6-1.9 10.9-1.8 4.9-5.3 8.3-3.4 3.4-8.2 5.3-4.8 1.9-10.7 1.9zm35.6-52.7h62.3v17.6h-42.1v9.3h42.1l-18.8 17.6h-23.2v11.6h42v17.5h-62.3zm110.9 75.7q-8.8 0-16.3-2.8-7.5-2.8-13.1-8-5.5-5.1-8.7-12.3-3.1-7.1-3.1-15.9 0-8.7 3.1-15.9 3.2-7.1 8.7-12.2 5.6-5.1 13.2-7.9 7.5-2.8 16.3-2.8 8.5 0 16.1 2.6 7.8 2.7 13 7.6l-14.1 12.8q-2.5-2.6-6-4-3.5-1.5-7.9-1.5-4.5 0-8.5 1.6-4 1.5-7 4.3-3.1 2.9-4.9 6.9-1.7 3.9-1.7 8.6 0 4.8 1.7 8.8 1.8 3.9 4.9 6.7 3 2.8 7 4.3 4.1 1.5 8.6 1.5 1.2 0 2.8-0.1 1.5-0.1 3.1-0.3 1.6-0.2 3-0.4 1.4-0.3 2.4-0.8v-8.6l-15.4-17.6h35.7v43.3h-14.4q-1.6 0.5-4 0.9-2.5 0.3-5.1 0.6-2.5 0.2-5 0.5-2.5 0.1-4.4 0.1zm42.3-2.1l10.7-38.5h31.1l-9.8-35.1h20.9l20.7 73.6h-21l-5.9-21h-19.9l-5.9 21zm116-45.9q8.2 0 13.9 2 5.7 1.9 9.1 5.2 3.6 3.2 5.2 7.3 1.7 4.1 1.7 8.6 0 4.5-1.8 8.9-1.7 4.4-5.6 8-3.9 3.5-10.2 5.8-6.3 2.2-15.3 2.2-4.4 0-8.5-0.9-4.1-0.9-7.6-2.4-3.5-1.5-6.3-3.3-2.7-1.7-4.7-3.6l14.1-12.9q2.1 2.5 5.4 4 3.4 1.5 8.3 1.5 5.7 0 8.7-1.8 3.2-1.9 3.2-4.1 0-2.4-3.6-4.4-3.5-2-11.2-2-8.3 0-14-1.9-5.7-2-9.2-5.1-3.5-3.3-5.1-7.4-1.6-4.2-1.6-8.5 0-4.5 1.7-8.9 1.8-4.5 5.7-8.1 3.9-3.6 10.2-5.8 6.3-2.2 15.3-2.2 4.4 0 8.5 0.9 4.1 0.9 7.6 2.4 3.5 1.4 6.2 3.2 2.8 1.8 4.8 3.7l-14 12.8q-2.1-2.4-5.5-3.9-3.4-1.6-8.3-1.6-5.7 0-8.8 1.9-3.1 1.8-3.1 4 0 2.4 3.6 4.4 3.6 2 11.2 2zm91.5-8.9l20.1-18.8v40.2q0 8.9-3.1 15.5-3.1 6.6-8.2 11.1-5.1 4.4-11.6 6.7-6.4 2.2-13.2 2.2-6.7 0-13.3-2.2-6.5-2.3-11.6-6.7-5.1-4.5-8.2-11.1-3.1-6.6-3.1-15.5v-40.2h20.2v38.9q0 4.8 1.4 8.4 1.3 3.6 3.6 6 2.3 2.4 5.1 3.7 2.9 1.1 5.9 1.1 3 0 5.9-1.1 2.8-1.3 5-3.7 2.3-2.4 3.7-6 1.4-3.6 1.4-8.4zm64.7 8.9q8.2 0 13.9 2 5.6 1.9 9.1 5.2 3.6 3.2 5.2 7.3 1.6 4.1 1.6 8.5 0 4.5-1.8 9-1.6 4.4-5.5 7.9-3.9 3.6-10.2 5.8-6.3 2.2-15.4 2.2-4.4 0-8.5-0.8-4.1-1-7.5-2.4-3.5-1.5-6.3-3.3-2.8-1.8-4.8-3.7l14.1-12.8q2.1 2.4 5.5 4 3.3 1.5 8.3 1.5 5.7 0 8.7-1.8 3.2-1.9 3.2-4.1 0-2.4-3.6-4.4-3.6-2-11.3-2-8.3 0-13.9-1.9-5.7-2-9.3-5.2-3.5-3.2-5-7.3-1.6-4.2-1.6-8.5 0-4.5 1.7-9 1.8-4.5 5.6-8 3.9-3.6 10.2-5.8 6.3-2.2 15.4-2.2 4.4 0 8.5 0.9 4.1 0.9 7.6 2.3 3.4 1.5 6.2 3.3 2.8 1.8 4.8 3.7l-14.1 12.8q-2.1-2.4-5.4-3.9-3.4-1.6-8.4-1.6-5.6 0-8.8 1.9-3 1.8-3 4 0 2.4 3.5 4.4 3.6 2 11.3 2zm-508.9 80.8v-17.5h72.3v17.5h-25.6v37.4l-20.1 18.6v-56zm76.2 19.1q0-8.7 2.8-15.8 2.8-7.2 7.9-12.2 5.1-5.2 12.3-7.9 7.1-2.8 15.8-2.8 8.8 0 16 2.8 7.1 2.7 12.3 7.9 5.1 5 7.9 12.2 2.8 7.1 2.8 15.8 0 8.9-2.8 16-2.8 7.2-7.9 12.3-5.2 5.2-12.3 8-7.2 2.7-16 2.7-8.7 0-15.8-2.7-7.2-2.8-12.3-8-5.1-5.1-7.9-12.3-2.8-7.1-2.8-16zm20.3 0.2q0 9.6 4.7 15.5 4.7 5.8 13.7 5.8 4.6 0 8.1-1.5 3.5-1.6 5.9-4.3 2.4-2.8 3.6-6.7 1.2-4 1.2-8.8 0-4.8-1.2-8.7-1.2-4-3.6-6.8-2.4-2.8-5.9-4.3-3.5-1.6-8.1-1.6-9 0-13.7 5.9-4.7 5.9-4.7 15.5zm64.9-0.2q0-8.7 2.7-15.8 2.8-7.2 7.9-12.2 5.1-5.2 12.3-7.9 7.1-2.8 15.8-2.8 8.9 0 16 2.8 7.2 2.7 12.3 7.9 5.2 5 7.9 12.2 2.8 7.1 2.8 15.8 0 8.9-2.8 16-2.7 7.2-7.9 12.3-5.1 5.2-12.3 8-7.1 2.7-16 2.7-8.7 0-15.8-2.7-7.2-2.8-12.3-8-5.1-5.1-7.9-12.3-2.7-7.1-2.7-16zm20.2 0.2q0 9.6 4.7 15.5 4.7 5.8 13.7 5.8 4.7 0 8.1-1.5 3.5-1.6 5.9-4.3 2.4-2.8 3.6-6.7 1.2-4 1.2-8.8 0-4.8-1.2-8.7-1.2-4-3.6-6.8-2.4-2.8-5.9-4.3-3.4-1.6-8.1-1.6-9 0-13.7 5.9-4.7 5.9-4.7 15.5zm65-18l20.3-18.8v56h42v17.5h-62.3z"
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
  viewBox="0 0 930 465" 
  className="w-full max-w-2xl" // Adjust based on screen size
  initial="hidden"
  animate="visible"
>
  <motion.path
    d={pegasusPathData}
    stroke={outlineColor}
    strokeWidth="3"
    fill="transparent"
    custom={0}
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

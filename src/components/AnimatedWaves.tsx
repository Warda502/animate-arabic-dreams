
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface AnimatedWavesProps {
  waveCount?: number;
  className?: string;
  position?: 'top' | 'bottom';
  height?: string;
  colors?: string[];
}

const AnimatedWaves: React.FC<AnimatedWavesProps> = ({ 
  waveCount = 3, 
  className = "",
  position = 'bottom',
  height = "10vh",
  colors = ["rgba(249,115,22,0.2)", "rgba(249,115,22,0.15)", "rgba(249,115,22,0.1)"]
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  // Adjust opacity for light mode
  const getWaveColors = () => {
    if (isDarkMode) {
      return colors;
    }
    
    // Slightly more opaque for light mode
    return [
      "rgba(249,115,22,0.3)",
      "rgba(249,115,22,0.2)", 
      "rgba(249,115,22,0.15)"
    ];
  };
  
  const waveColors = getWaveColors();

  return (
    <div
      className={`absolute w-full overflow-hidden ${position === 'top' ? 'top-0 rotate-180' : 'bottom-0'} pointer-events-none ${className}`}
      style={{ height }}
    >
      {Array.from({ length: waveCount }).map((_, index) => {
        // Alternate wave directions and speeds
        const direction = index % 2 === 0 ? 1 : -1;
        const duration = 10 + index * 5; // Increasing duration for each wave
        
        return (
          <motion.div
            key={index}
            className="absolute w-[200%] h-full"
            style={{
              backgroundColor: waveColors[index % waveColors.length] || waveColors[0],
              opacity: 1 - (index * 0.1), // Decreasing opacity for deeper waves
            }}
            animate={{
              x: [`${direction * 0}%`, `${direction * -50}%`]
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: duration,
              ease: 'linear',
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
                transform: 'scale(1.2, 1)'
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default AnimatedWaves;

import { motion } from "framer-motion";

const logoPaths = [
  "M64 48C64 74.5097 42.5097 96 16 96C7.16344 96 0 88.8366 0 80C0 71.1634 7.16344 64 16 64C24.8366 64 32 56.8366 32 48C32 39.1634 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C42.5097 0 64 21.4903 64 48Z",
  "M104 0C110.627 0 116 5.37258 116 12V84C116 90.6274 110.627 96 104 96H76V84H104V12H76V0H104Z",
  "M152 0C158.627 0 164 5.37258 164 12V84C164 90.6274 158.627 96 152 96H136C129.373 96 124 90.6274 124 84V12C124 5.37258 129.373 0 136 0H152ZM152 12H136V84H152V12Z",
  "M184 0C190.627 0 196 5.37258 196 12V84C196 90.6274 190.627 96 184 96H176C169.373 96 164 90.6274 164 84V12C164 5.37258 169.373 0 176 0H184ZM184 12H176V84H184V12Z",
  "M216 0C222.627 0 228 5.37258 228 12V84C228 90.6274 222.627 96 216 96H200C193.373 96 188 90.6274 188 84V12C188 5.37258 193.373 0 200 0H216ZM216 12H200V84H216V12Z",
];

const pathVariant = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: i * 0.3,
      duration: 1.2,
      ease: "easeInOut",
    },
  }),
};

export function Logo() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 250 100"
      className="w-40 h-40 text-white"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f0ff" />
          <stop offset="100%" stopColor="#ff00c8" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#ffffff" />
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00f0ff" />
        </filter>
      </defs>

      {logoPaths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="url(#logoGradient)"
          stroke="white"
          strokeWidth={1.5}
          filter="url(#glow)"
          variants={pathVariant}
          initial="hidden"
          animate="visible"
          custom={i}
        />
      ))}
    </motion.svg>
  );
}

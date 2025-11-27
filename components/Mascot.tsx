import React from 'react';
import { motion } from 'framer-motion';

interface MascotProps {
  emotion?: 'happy' | 'sad' | 'thinking' | 'neutral' | 'excited';
  size?: number;
}

const Mascot: React.FC<MascotProps> = ({ emotion = 'neutral', size = 100 }) => {
  const getEyes = () => {
    switch (emotion) {
      case 'happy':
      case 'excited':
        return (
          <>
            <motion.circle cx="35" cy="45" r="5" fill="black" initial={{ scaleY: 0.1 }} animate={{ scaleY: 1 }} transition={{ duration: 0.3 }} />
            <motion.circle cx="65" cy="45" r="5" fill="black" initial={{ scaleY: 0.1 }} animate={{ scaleY: 1 }} transition={{ duration: 0.3 }} />
            <path d="M 35 35 Q 35 30 45 35" stroke="black" strokeWidth="2" fill="transparent" />
            <path d="M 65 35 Q 65 30 55 35" stroke="black" strokeWidth="2" fill="transparent" />
          </>
        );
      case 'sad':
        return (
          <>
             <circle cx="35" cy="50" r="5" fill="black" />
             <circle cx="65" cy="50" r="5" fill="black" />
             <path d="M 30 40 L 40 45" stroke="black" strokeWidth="2" />
             <path d="M 70 40 L 60 45" stroke="black" strokeWidth="2" />
          </>
        );
      default: // Neutral/Thinking
        return (
          <>
            <circle cx="35" cy="45" r="5" fill="black" />
            <circle cx="65" cy="45" r="5" fill="black" />
          </>
        );
    }
  };

  const getMouth = () => {
    switch (emotion) {
      case 'happy':
      case 'excited':
        return <path d="M 40 60 Q 50 70 60 60" stroke="black" strokeWidth="3" fill="transparent" strokeLinecap="round" />;
      case 'sad':
        return <path d="M 40 65 Q 50 55 60 65" stroke="black" strokeWidth="3" fill="transparent" strokeLinecap="round" />;
      case 'thinking':
        return <circle cx="50" cy="65" r="3" fill="black" />;
      default:
        return <path d="M 45 65 L 55 65" stroke="black" strokeWidth="3" strokeLinecap="round" />;
    }
  };

  const bounceVariant = {
    animate: {
      y: [0, -10, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const exciteVariant = {
    animate: {
      y: [0, -20, 0, -10, 0],
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
      }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      variants={emotion === 'excited' ? exciteVariant : bounceVariant}
      animate="animate"
      className="drop-shadow-lg"
    >
      {/* Body */}
      <motion.path
        d="M 20 50 Q 20 20 50 20 Q 80 20 80 50 Q 80 90 50 90 Q 20 90 20 50"
        fill="#4ADE80" /* Green-400 */
        stroke="#22C55E" /* Green-500 */
        strokeWidth="3"
      />
      {/* Belly */}
      <path
        d="M 35 60 Q 50 85 65 60"
        fill="#86EFAC" /* Green-300 */
        opacity="0.5"
      />
      {getEyes()}
      {getMouth()}
    </motion.svg>
  );
};

export default Mascot;
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

type BackgroundEffectsProps = {
  giftOpened: boolean;
};

type HeartProps = {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ giftOpened }) => {
  // Generate heart positions and animations
  const hearts = useMemo(() => {
    return Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 15 + Math.random() * 25,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }, []);

  // Generate sparkle positions and animations
  const sparkles = useMemo(() => {
    return Array.from({ length: giftOpened ? 50 : 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 10,
      duration: 2 + Math.random() * 4,
      opacity: 0.5 + Math.random() * 0.5,
    }));
  }, [giftOpened]);

  const renderHeart = ({ x, y, size, delay, duration, opacity }: HeartProps) => (
    <motion.div
      className="absolute"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, opacity, 0],
        scale: [0, 1, 0],
        y: ["0%", "10%", "20%"]
      }}
      transition={{ 
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
    >
      <div 
        style={{ 
          width: size, 
          height: size,
          fontSize: size,
          color: 'rgba(255, 105, 180, 0.8)',
          filter: 'drop-shadow(0 0 5px rgba(255, 105, 180, 0.3))'
        }}
      >
        ❤️
      </div>
    </motion.div>
  );

  const renderSparkle = ({ x, y, size, delay, duration, opacity }: HeartProps) => (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, opacity, 0],
        scale: [0, 1, 0],
      }}
      transition={{ 
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut",
      }}
    />
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Hearts */}
      {hearts.map((heart, index) => (
        <React.Fragment key={`heart-${index}`}>
          {renderHeart(heart)}
        </React.Fragment>
      ))}
      
      {/* Sparkles */}
      {sparkles.map((sparkle, index) => (
        <React.Fragment key={`sparkle-${index}`}>
          {renderSparkle(sparkle)}
        </React.Fragment>
      ))}
      
      {/* Additional particles for the open gift animation */}
      {giftOpened && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/0 via-secondary-900/10 to-secondary-900/30"></div>
        </motion.div>
      )}
    </div>
  );
};
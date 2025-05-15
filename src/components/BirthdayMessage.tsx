import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const BirthdayMessage: React.FC = () => {
  const [visibleText, setVisibleText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  const messageText =
    "Happy Birthday, my love. Every moment with you fills my heart with joy. I cherish our journey together and look forward to celebrating many more birthdays with you. ❤️";

  useEffect(() => {
    if (currentIndex < messageText.length) {
      const timer = setTimeout(() => {
        setVisibleText((prevText) => prevText + messageText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 50); // Changed from 10ms to 5ms for faster typing effect
      return () => clearTimeout(timer);
    } else {
      setTypingComplete(true);
    }
  }, [currentIndex, messageText]);

  const confettiElements = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 100,
    size: 5 + Math.random() * 10,
    color: [
      'primary-300', 'primary-400', 'primary-500',
      'secondary-300', 'secondary-400', 'secondary-500',
      'accent-200', 'accent-300', 'white'
    ][Math.floor(Math.random() * 9)],
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 7
  }));

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center max-w-4xl p-8 mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Confetti Animation */}
      {confettiElements.map((confetti) => (
        <motion.div
          key={confetti.id}
          className={`absolute rounded-full bg-${confetti.color}`}
          style={{
            left: `${confetti.x}%`,
            width: confetti.size,
            height: confetti.size
          }}
          initial={{ y: confetti.y, opacity: 1, rotate: 0 }}
          animate={{
            y: `calc(100vh + ${confetti.size}px)`,
            opacity: [1, 1, 0],
            rotate: Math.random() > 0.5 ? 360 : -360
          }}
          transition={{
            duration: confetti.duration,
            delay: confetti.delay,
            ease: 'linear',
            repeat: Infinity,
            repeatDelay: Math.random() * 5
          }}
        />
      ))}

      <motion.div
        className="px-8 py-2 mb-8 rounded-full shadow-lg bg-gradient-to-r from-primary-500 to-secondary-500"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.2
        }}
      >
        <motion.h1
          className="text-4xl font-bold text-center text-white md:text-6xl lg:text-7xl font-dancing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Happy Birthday චූQ!
        </motion.h1>
      </motion.div>

      <motion.div
        className="relative max-w-2xl p-8 border shadow-2xl bg-white/10 backdrop-blur-md rounded-3xl border-white/20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <div className="text-xl leading-relaxed text-white md:text-2xl font-poppins">
          {visibleText}
          {!typingComplete && (
            <span className="inline-block ml-1 animate-pulse">❤️</span>
          )}
        </div>

        {typingComplete && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {[1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-center w-20 h-20 rounded-lg md:w-24 md:h-24 bg-primary-400/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 * i }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: 'rgba(255, 105, 180, 0.5)'
                  }}
                >
                  <span className="text-4xl">❤️</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
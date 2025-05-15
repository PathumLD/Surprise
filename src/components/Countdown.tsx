import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type CountdownProps = {
  onComplete: () => void;
};

export const Countdown: React.FC<CountdownProps> = ({ onComplete }) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (currentNumber <= 25) {
      timer = setInterval(() => {
        setCurrentNumber(prev => {
          if (prev < 25) {
            return prev + 1;
          } else {
            clearInterval(timer);
            setTimeout(() => {
              setShowMessage(true);
              setTimeout(() => {
                onComplete();
              }, 3000);
            }, 1000);
            return prev;
          }
        });
      }, 500); // Slower countdown for better effect
    }

    return () => clearInterval(timer);
  }, [currentNumber, onComplete]);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full space-y-12 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2 
        className="text-4xl md:text-5xl font-dancing text-accent-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Counting moments from...
      </motion.h2>

      <div className="flex flex-col items-center space-y-8">
        <motion.div
          key={currentNumber}
          className="relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: [0.5, 1.2, 1],
            opacity: [0, 1, 1],
          }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(255,255,255,0)',
                '0 0 50px rgba(255,255,255,0.8)',
                '0 0 20px rgba(255,255,255,0)'
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {currentNumber}
          </motion.div>
        </motion.div>

        {showMessage && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              className="mb-4 text-3xl md:text-4xl font-dancing text-accent-100"
              animate={{ 
                scale: [1, 1.05, 1],
                textShadow: [
                  '0 0 20px rgba(255,105,180,0)',
                  '0 0 50px rgba(255,105,180,0.8)',
                  '0 0 20px rgba(255,105,180,0)'
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              It's your special day
            </motion.p>
            <motion.p 
              className="text-2xl text-pink-300 md:text-3xl font-dancing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              I have to give you a special message
            </motion.p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
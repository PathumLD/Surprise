import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart } from 'lucide-react';

type GiftBoxProps = {
  onOpen: () => void;
};

export const GiftBox: React.FC<GiftBoxProps> = ({ onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  const boxVariants = {
    closed: {
      scale: 1,
      rotate: 0,
    },
    open: {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  const lidVariants = {
    closed: {
      y: 0,
      rotateX: 0,
      originY: 1,
    },
    open: {
      y: -60,
      rotateX: 90,
      originY: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const ribbonVariants = {
    closed: {
      scale: 1,
    },
    open: {
      scale: 1.1,
      transition: {
        duration: 0.3,
      },
    },
  };


  // const boxVariants = {
  //   idle: { 
  //     scale: 1,
  //     rotate: 0,
  //     y: [0, -15, 0],
  //     transition: { 
  //       y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  //     }
  //   },
  //   hover: { 
  //     scale: 1.1,
  //     rotate: [0, -5, 5, -5, 0],
  //     transition: { 
  //       rotate: { duration: 0.5 },
  //       scale: { duration: 0.3 }
  //     }
  //   },
  //   clicked: {
  //     scale: [1.1, 0.9, 1.5],
  //     rotate: [0, 0, 360],
  //     opacity: [1, 1, 0],
  //     transition: { 
  //       duration: 1.2,
  //       times: [0, 0.4, 1]
  //     }
  //   }
  // };

  // const ribbonVariants = {
  //   idle: {
  //     scaleY: [0.95, 1.05, 0.95],
  //     transition: {
  //       repeat: Infinity,
  //       duration: 2,
  //       ease: "easeInOut"
  //     }
  //   },
  //   hover: {
  //     scaleY: 1.2,
  //     transition: { duration: 0.3 }
  //   }
  // };

  const getBoxClasses = () => {
    let classes = "relative cursor-pointer transition-all duration-500 transform";
    
    if (isOpen) {
      classes += " scale-110";
    }
    
    if (isHovering) {
      classes += " scale-105";
    }
    
    return classes;
  };

  const getLidClasses = () => {
    let classes = "absolute top-0 left-0 w-64 h-12 bg-gradient-to-b from-red-600 to-red-700 rounded-t-lg shadow-lg border-b-2 border-red-900 transition-all duration-500 transform origin-bottom";
    
    if (isOpen) {
      classes += " -translate-y-16 rotate-45";
    }
    
    return classes;
  };

  const getRibbonClasses = () => {
    let classes = "absolute top-0 left-0 right-0 flex justify-center transition-all duration-300";
    
    if (isOpen) {
      classes += " scale-110";
    }
    
    return classes;
  };

  const heartVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [-20, -40, -60],
      transition: {
        repeat: Infinity,
        duration: 2,
        delay: i * 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className="mb-12 text-4xl text-center text-white md:text-5xl font-dancing"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        A special gift for you!
      </motion.h2>
      
      <div className="relative">
        {/* Floating Hearts */}
        {isHovered && Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            custom={i}
            variants={heartVariants}
            initial="hidden"
            animate="visible"
            style={{
              left: `${(i * 20) - 50}%`,
              top: "50%"
            }}
          >
            <Heart 
              size={24} 
              className="text-pink-400 fill-pink-400"
              strokeWidth={1.5}
            />
          </motion.div>
        ))}
        
        <motion.div
          className="relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          variants={boxVariants}
          initial="idle"
          animate={isAnimating ? "clicked" : isHovered ? "hover" : "idle"}
        >
          <div className="relative">
            {/* Glow Effect */}
            <motion.div 
              className="absolute inset-0 opacity-50 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 rounded-2xl blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Gift Box */}
            <div className="flex flex-col items-center justify-center h-full p-8">
      <div
        className={getBoxClasses()}
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Gift Box Base */}
        <div className="relative w-64 h-40 overflow-hidden rounded-lg shadow-xl bg-gradient-to-b from-red-700 to-red-800">
          {/* Ribbon */}
          <div className={getRibbonClasses()}>
            <div className="w-48 h-8 bg-yellow-300 rounded-full shadow-md"></div>
          </div>
          <div className="absolute w-8 h-32 transform -translate-x-1/2 bg-yellow-300 rounded-full shadow-md top-4 left-1/2"></div>

          {/* Inside Gift Content - Only visible when opened */}
          {isOpen && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Sparkles size={32} className="mb-2 text-yellow-200 animate-pulse" />
              <div className="text-lg font-bold text-white">Surprise!</div>
              <div className="mt-2 text-sm text-yellow-200">Your gift awaits</div>
            </div>
          )}

          {/* Subtle shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-10"></div>
          
          {/* Box shadows for depth */}
          <div className="absolute inset-0 shadow-inner"></div>
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-black opacity-20"></div>
        </div>

        {/* Gift Box Lid */}
        <div className={getLidClasses()}>
          {/* Lid Ribbon */}
          <div className="absolute w-48 h-6 transform -translate-x-1/2 bg-yellow-200 rounded-full top-1 left-1/2"></div>
          
          {/* Lid shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"></div>
          
          {/* Lid edge */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-red-900 opacity-30"></div>
        </div>
      </div>

      {/* Text that appears when opened with fade in effect */}
      {isOpen && (
        <div 
          className="mt-8 text-xl font-bold text-red-600 animate-fadeIn"
          style={{
            animation: "fadeIn 0.5s ease-in-out 0.3s forwards",
            opacity: 0
          }}
        >
          <div className="flex items-center gap-2">
            <Gift size={24} className="text-red-600" />
            <span>Happy Gifting!</span>
            <Gift size={24} className="text-red-600" />
          </div>
        </div>
      )}
      
      {/* Instruction text */}
      <div className="mt-6 text-sm text-gray-500">
        {isOpen ? "" : ""}
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
          </div>
        </motion.div>
      </div>
      
      <motion.p 
        className="max-w-md mt-12 text-xl text-center md:text-2xl text-accent-100 font-poppins"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Click to unwrap your birthday surprise!
      </motion.p>
    </motion.div>
  );
};
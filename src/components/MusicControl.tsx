import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';

export const MusicControl: React.FC = () => {
  const { isMuted, toggleMusic } = useAudio();
  
  return (
    <motion.button
      className="p-3 text-white transition-colors rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30"
      onClick={toggleMusic}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {!isMuted ? (
        <Volume2 size={24} />
      ) : (
        <VolumeX size={24} />
      )}
    </motion.button>
  );
};
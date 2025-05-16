import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import music from '../assets/music.mp3';

type AudioContextType = {
  isPlaying: boolean;
  isMuted: boolean;
  toggleMusic: () => void;
};

const AudioContext = createContext<AudioContextType>({
  isPlaying: true,
  isMuted: true,
  toggleMusic: () => {},
});

export const useAudio = () => useContext(AudioContext);

type AudioProviderProps = {
  children: React.ReactNode;
};

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true); // Default to playing
  const [isMuted, setIsMuted] = useState(true);    // Default to muted
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(music);
    audio.loop = true;
    audio.volume = 0.3;
    audio.muted = true; // Start muted
    audioRef.current = audio;

    // Try to autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error('Autoplay prevented:', error);
        setIsPlaying(false); // Update state if autoplay fails
      });
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    // Toggle muted state
    setIsMuted(!isMuted);
    
    if (audioRef.current.muted) {
      audioRef.current.muted = false;
      
      // If paused, also play
      if (!isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error('Playback prevented:', error);
            setIsPlaying(false);
          });
        }
        setIsPlaying(true);
      }
    } else {
      audioRef.current.muted = true;
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, toggleMusic }}>
      {children}
    </AudioContext.Provider>
  );
};

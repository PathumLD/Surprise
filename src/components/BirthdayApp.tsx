import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Countdown } from './Countdown';
import {GiftBox} from './GiftBox'
import { BirthdayMessage } from './BirthdayMessage';
import { BackgroundEffects } from './BackgroundEffects';
import { MusicControl } from './MusicControl';

export const BirthdayApp: React.FC = () => {
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Simulate loading time for a more dramatic effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCountdownComplete = () => {
    setCountdownComplete(true);
  };

  const handleGiftOpen = () => {
    setGiftOpened(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary-900 via-primary-800 to-secondary-900">
      <BackgroundEffects giftOpened={giftOpened} />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <AnimatePresence mode="wait">
          {!loadingComplete ? (
            <div key="loading" className="flex items-center justify-center">
              <div className="w-16 h-16 border-4 rounded-full border-primary-200 border-t-primary-500 animate-spin"></div>
            </div>
          ) : !countdownComplete ? (
            <Countdown key="countdown" onComplete={handleCountdownComplete} />
          ) : !giftOpened ? (
            <GiftBox key="gift" onOpen={handleGiftOpen} />
          ) : (
            <BirthdayMessage key="message" />
          )}
        </AnimatePresence>
      </div>
      
      <div className="absolute z-20 bottom-10 md:bottom-4 right-4">
        <MusicControl />
      </div>
    </div>
  );
};
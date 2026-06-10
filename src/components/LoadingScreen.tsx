'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '@/providers/AudioProvider';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { isPlaying, togglePlay } = useAudio();

  useEffect(() => {
    // Increment progress bar over 3 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }
        return prev + 1;
      });
    }, 28); // 28 * 100 = ~2.8 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleStart = () => {
    if (!isPlaying) {
      togglePlay();
    }
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-midnight-950 flex flex-col items-center justify-center select-none"
        >
          {/* Main Pulsing Loading Heart */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-rose-500 rounded-full filter blur-xl opacity-30 animate-pulse-heart" />
            <span className="relative block text-6xl sm:text-7xl animate-pulse-heart cursor-default">
              ❤️
            </span>
          </div>

          {/* Subtitle / Romantic Greeting */}
          <h2 className="font-script text-2xl sm:text-3xl text-rose-300 mb-6 text-center px-4">
            Menyiapkan hadiah spesial untukmu...
          </h2>

          {/* Progress Bar / Start Button Container */}
          <div className="h-24 flex flex-col items-center justify-center mt-4">
            <AnimatePresence mode="wait">
              {!isLoaded ? (
                <motion.div
                  key="loading-ui"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-64 h-1.5 bg-midnight-900 border border-white/5 rounded-full overflow-hidden relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 transition-all duration-75 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-rose-300/60 font-mono tracking-widest mt-2 uppercase">
                    {progress}% Loading
                  </span>
                </motion.div>
              ) : (
                <motion.button
                  key="start-button"
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 150 }}
                  onClick={handleStart}
                  className="btn-romantic font-semibold text-sm sm:text-base tracking-wider uppercase flex items-center gap-2 group active:scale-95 focus:outline-none"
                >
                  <span>🎁</span>
                  <span>Buka Kado Spesial ❤️</span>
                  <span>🎁</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

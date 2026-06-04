'use client';

import React, { useState, useEffect } from 'react';
import { useAudio } from '@/providers/AudioProvider';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioPlayer() {
  const { isPlaying, togglePlay } = useAudio();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 2.5 seconds (after loading screen fades out)
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);

    // Hide tooltip automatically after 8 seconds of display
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 10500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClick = () => {
    togglePlay();
    setShowTooltip(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none flex flex-col items-end">
      {/* Music Tooltip Guide */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-3 mr-2 bg-rose-950/85 border border-rose-500/30 text-rose-200 text-[10px] sm:text-xs font-semibold px-3.5 py-2 rounded-2xl shadow-2xl backdrop-blur-md max-w-[210px] text-center relative animate-float-mini"
          >
            {/* Little pointer arrow pointing down to button */}
            <div className="absolute bottom-[-5px] right-6 w-2.5 h-2.5 bg-rose-950 border-r border-b border-rose-500/30 rotate-45" />
            Klik di sini untuk mematikan atau menyetel musik ya! 🎵
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleClick}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 glass-card text-white hover:scale-105 active:scale-95 ${
          isPlaying ? 'animate-glow-pulse border-rose-500/50' : 'border-white/10'
        }`}
        title="Klik untuk play/pause musik"
      >
        {isPlaying ? (
          // Equalizer/Music Visualizer animation when playing
          <div className="flex items-end gap-0.5 h-6">
            <span className="w-0.75 bg-rose-400 rounded-full animate-[equalize_0.8s_ease-in-out_infinite]" style={{ animationDelay: '0.1s' }} />
            <span className="w-0.75 bg-rose-400 rounded-full animate-[equalize_1.2s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
            <span className="w-0.75 bg-rose-400 rounded-full animate-[equalize_0.9s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
            <span className="w-0.75 bg-rose-400 rounded-full animate-[equalize_1.1s_ease-in-out_infinite]" style={{ animationDelay: '0.6s' }} />
          </div>
        ) : (
          // Play icon when paused
          <svg
            className="w-6 h-6 text-rose-300 ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Styled animation helper for equalizer bars and tooltip floating */}
      <style jsx global>{`
        @keyframes equalize {
          0%, 100% { height: 4px; }
          50% { height: 18px; }
        }
        @keyframes float-mini {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-float-mini {
          animation: float-mini 2s ease-in-out infinite;
        }
        .w-0.75 {
          width: 3px;
        }
      `}</style>
    </div>
  );
}

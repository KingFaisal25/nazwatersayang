'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function LoveMeter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Mengukur...');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      if (currentProgress >= 100) {
        setProgress(100);
        setStatusText('Rasa Sayang: Tak Terbatas ❤️');
        clearInterval(interval);
        
        // Trigger overflow error after 1 second
        setTimeout(() => {
          setIsError(true);
        }, 1000);
      } else {
        setProgress(currentProgress);
        
        // Status text progression based on progress percentage
        if (currentProgress < 25) {
          setStatusText('Mengukur rasa sayang...');
        } else if (currentProgress < 50) {
          setStatusText('Sangat besar...');
        } else if (currentProgress < 75) {
          setStatusText('Luar biasa besar...');
        } else {
          setStatusText('Hampir tak terhingga...');
        }
      }
    }, 30); // ~3 seconds to reach 100%

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      id="love-meter"
      ref={containerRef}
      className="relative section-padding flex flex-col items-center justify-center min-h-[70vh] z-10 select-none"
    >
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-4xl sm:text-5xl block mb-4 animate-[pulse-heart_1.5s_infinite]">💕</span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gradient tracking-wide">
          Seberapa Besar Rasa Sayangku?
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/60 uppercase tracking-widest mt-2">
          Sistem Pendeteksi Tingkat Kasih Sayang
        </p>
      </motion.div>

      {/* Meter Glass Panel */}
      <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl glass-card border border-rose-500/10 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Decorative ambient light behind meter */}
        <div className="absolute -inset-10 bg-rose-500/5 rounded-full filter blur-3xl pointer-events-none" />

        {/* Status Text Indicator */}
        <div className="text-lg sm:text-xl md:text-2xl font-bold text-rose-100 mb-6 text-center h-8 flex items-center justify-center tracking-wide">
          <span className={progress === 100 ? 'text-glow text-gradient font-heading font-extrabold scale-110 transition-transform duration-500' : ''}>
            {statusText}
          </span>
        </div>

        {/* Progress Bar Frame */}
        <div className="w-full h-8 bg-midnight-950 rounded-full border border-white/5 p-1 relative overflow-hidden flex items-center shadow-inner">
          <motion.div
            initial={{ width: '0%' }}
            animate={isInView ? { width: '100%' } : { width: '0%' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 relative flex items-center justify-end px-3 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]"
          >
            {/* Twinkling glow ball at the tip of loading bar */}
            <span className="w-4 h-4 bg-white rounded-full filter blur-[2px] animate-pulse" />
          </motion.div>
        </div>

        {/* Numeric percentage tracking */}
        <div className="mt-4 text-xs font-mono tracking-widest text-rose-300/40 font-semibold uppercase">
          Kasih Sayang: {progress}%
        </div>

        {/* Secret/Funny Overflow Error Dialog */}
        <div className="h-16 mt-6 flex items-center justify-center">
          {isError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="text-center p-3 px-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold tracking-wide animate-pulse flex items-center gap-2"
            >
              <span>⚠️</span>
              <span>
                ERROR: Overflow! Cinta melebihi batas maksimal kapasitas memori.
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

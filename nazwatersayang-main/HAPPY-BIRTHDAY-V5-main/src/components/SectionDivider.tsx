'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DividerProps {
  variant?: 'heart' | 'stars' | 'wave';
}

export default function SectionDivider({ variant = 'heart' }: DividerProps) {
  return (
    <div className="w-full flex items-center justify-center py-10 relative z-10 select-none overflow-hidden">
      {variant === 'heart' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="divider-heart w-full max-w-lg"
        >
          <span className="text-rose-500 text-lg hover:scale-125 transition-transform duration-300">
            ❤️
          </span>
        </motion.div>
      )}

      {variant === 'stars' && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-6 w-full max-w-lg justify-center"
        >
          {/* Left Line */}
          <div className="flex-1 max-w-[150px] h-[0.5px] bg-gradient-to-r from-transparent to-rose-400/30" />
          
          {/* Three Stars */}
          <div className="flex items-center gap-2 text-rose-300/40 text-xs">
            <span>✦</span>
            <span className="text-sm text-rose-400/60">✦</span>
            <span>✦</span>
          </div>

          {/* Right Line */}
          <div className="flex-1 max-w-[150px] h-[0.5px] bg-gradient-to-l from-transparent to-rose-400/30" />
        </motion.div>
      )}

      {variant === 'wave' && (
        <motion.div
          initial={{ opacity: 0, width: '0%' }}
          whileInView={{ opacity: 0.25, width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-rose-400 to-transparent"
        />
      )}
    </div>
  );
}

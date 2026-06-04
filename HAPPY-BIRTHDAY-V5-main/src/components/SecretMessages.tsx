'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecretMessage {
  id: number;
  text: string;
  top: string;
  left?: string;
  right?: string;
  icon: string;
}

export default function SecretMessages() {
  const [foundSecrets, setFoundSecrets] = useState<Record<number, boolean>>({});
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const secrets: SecretMessage[] = [
    {
      id: 1,
      text: 'Tahukah kamu? Sejak pertama mengenalmu, aku tahu kamu adalah sosok yang sangat istimewa. ✨',
      top: '15%',
      left: '10%',
      icon: '✨',
    },
    {
      id: 2,
      text: 'Kamu menemukan pesan rahasia! Sama seperti dirimu yang berhasil menemukan jalan masuk terindah ke hatiku. 💕',
      top: '32%',
      right: '8%',
      icon: '🌸',
    },
    {
      id: 3,
      text: 'Setiap detik bersamamu terasa jauh lebih berharga daripada seluruh harta di dunia ini. 💎',
      top: '48%',
      left: '12%',
      icon: '✦',
    },
    {
      id: 4,
      text: 'Psst... asal kamu tahu saja, senyumanmu adalah alasan utamaku untuk ikut bahagia hari ini. 😊',
      top: '65%',
      right: '15%',
      icon: '🍀',
    },
    {
      id: 5,
      text: 'Rahasia kecil dari aku: namamu selalu menjadi doa manis yang kusebut diam-diam di setiap sujud malamku. 🌙',
      top: '78%',
      left: '8%',
      icon: '🌙',
    },
    {
      id: 6,
      text: 'Kamu berhasil menemukan pesan terakhir! Kamu memang selalu dipenuhi kejutan manis. 🎉',
      top: '92%',
      right: '12%',
      icon: '🎈',
    },
  ];

  const handleReveal = (secret: SecretMessage) => {
    setFoundSecrets((prev) => ({
      ...prev,
      [secret.id]: true,
    }));
    setActiveMessage(secret.text);
  };

  const foundCount = Object.keys(foundSecrets).length;
  const allFound = foundCount === secrets.length;

  return (
    <>
      {/* Floating Pill Tracker (fixed top right) */}
      <div className="fixed top-6 left-6 z-40 select-none pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`glass-card border px-4 py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all duration-500 shadow-lg ${
            allFound
              ? 'border-yellow-400/40 shadow-yellow-500/10 text-yellow-300'
              : 'border-rose-500/20 text-rose-200'
          }`}
        >
          <span>🔍</span>
          <span>
            {allFound
              ? 'Semua rahasia ditemukan! 🎊'
              : `Rahasia Ditemukan: ${foundCount}/${secrets.length}`}
          </span>
        </motion.div>
      </div>

      {/* Subtle triggers scattered across layout height */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-20">
        {secrets.map((secret) => {
          const isFound = foundSecrets[secret.id];

          return (
            <button
              key={secret.id}
              onClick={() => handleReveal(secret)}
              className="absolute pointer-events-auto cursor-pointer focus:outline-none transition-all duration-300 hover:scale-125 z-20"
              style={{
                top: secret.top,
                left: secret.left,
                right: secret.right,
              }}
            >
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: isFound ? 0.1 : [0.2, 0.5, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2 + secret.id,
                  ease: 'easeInOut',
                }}
                className={`block text-xs sm:text-sm filter drop-shadow-[0_0_5px_rgba(244,63,94,0.8)]`}
              >
                {secret.icon}
              </motion.span>
            </button>
          );
        })}
      </div>

      {/* Secret Message Popup Modal */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMessage(null)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm p-6 sm:p-8 rounded-3xl glass-premium border border-rose-500/20 text-center cursor-default shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -inset-10 bg-rose-500/5 filter blur-2xl pointer-events-none" />

              {/* Sparkle icon header */}
              <div className="text-3xl mb-4 animate-bounce">💖</div>

              <h4 className="font-heading text-lg text-rose-300 font-semibold mb-3 tracking-wide select-none">
                Pesan Rahasia Tersembunyi
              </h4>

              <p className="font-script text-rose-100 text-lg sm:text-xl leading-relaxed py-2">
                &ldquo;{activeMessage}&rdquo;
              </p>

              {/* Close button inside dialog */}
              <button
                onClick={() => setActiveMessage(null)}
                className="mt-6 px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 transition-colors focus:outline-none"
              >
                Tutup ✦
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

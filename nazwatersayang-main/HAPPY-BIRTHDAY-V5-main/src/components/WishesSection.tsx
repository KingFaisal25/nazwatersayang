'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Wish {
  id: number;
  text: string;
}

export default function WishesSection() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const wishes: Wish[] = [
    { id: 1, text: 'Mugi Gusti nangtayungan tur ngaping Nazwa dina unggal léngkah 🤲' },
    { id: 2, text: 'Semoga cita-cita jadi orang kaya tanpa harus kerja keras tercapai ya! 💸' },
    { id: 3, text: 'Mugi Gusti maparin kasehatan anu waluya sareng yuswa anu berkah 🌸' },
    { id: 4, text: 'Semoga kadar keimutanmu nggak berkurang meskipun umur nambah tua 😜' },
    { id: 5, text: 'Semoga makin sabar ngadepin semua tingkah kocak aku yaa 💑' },
    { id: 6, text: 'Mugi Gusti maparin kabagjaan anu salawasna ngalir dina kahirupan Nazwa 🌊' },
    { id: 7, text: 'Semoga jerawat sungkan mampir di wajah cantikmu, kabur semua! 💅' },
    { id: 8, text: 'Semoga tidurmu selalu nyenyak dan nggak ngorok lagi (eh canda!) 😴' },
    { id: 9, text: 'Semoga cita-citamu tercapai satu per satu, dari yang kecil sampai yang super besar! 🎯' },
    { id: 10, text: 'Mugi Gusti maparin kalancaran dina sagala urusan sakola sareng masa depan 🎓' },
    { id: 11, text: 'Semoga berkurang kadar magerannya, ayo lebih semangat rebahannya (eh?) 🛌' },
    { id: 12, text: 'Semoga kamu selalu tahu betapa berharganya dirimu di hidupku 👑' },
    { id: 13, text: 'Mugi Gusti maparin kaberkahan anu melimpah ruah kanggo kulawarga anjeun 🏡' },
    { id: 14, text: 'Semoga makin jago dandan tapi tetep sayang sama aku apa adanya 💄' },
    { id: 15, text: 'Semoga jajannya lancar tapi timbangannya tetep stabil ya sayang! 🍰' },
    { id: 16, text: 'Mugi Gusti ngabulkeun sagala doa-doa sae anu disebatkeun ku anjeun 🌙' },
    { id: 17, text: 'Semoga dompetnya nggak pernah kena penyakit kanker (kantong kering) 💳' },
    { id: 18, text: 'Semoga setiap air mata kesedihanmu di masa lalu berganti jadi tawa bahagia 🌈' },
    { id: 19, text: 'Semoga kita terus barengan, dari kamu umur 21 sampai kakek nenek nanti 👵👴' },
    { id: 20, text: 'Semoga dunia selalu bersikap lembut dan baik padamu, sayangku 🌍' },
    { id: 21, text: 'Mugi Gusti maparin kawijaksanaan sareng kasabaran dina nyanghareupan hirup 💎' },
  ];

  const handleCardClick = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const flippedCount = Object.values(flippedCards).filter(Boolean).length;

  return (
    <section
      id="wishes"
      className="relative section-padding min-h-screen z-10 flex flex-col items-center justify-center"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <span className="text-4xl sm:text-5xl block mb-4 animate-pulse">✨</span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gradient tracking-wide">
          21 Doa & Harapan Untukmu
        </h2>
        <p className="text-sm sm:text-base text-rose-200/70 mt-2 max-w-md mx-auto">
          Satu harapan tulus untuk setiap tahun kehidupanmu yang indah
        </p>
      </motion.div>

      {/* Progress display pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-10 px-6 py-2.5 rounded-full glass-card border border-rose-500/20 text-xs sm:text-sm font-semibold tracking-wide text-rose-200 flex items-center gap-2 select-none"
      >
        <span>🔓</span> Kamu sudah membuka
        <span className="text-rose-400 font-bold text-base px-1 bg-rose-500/10 rounded font-mono">
          {flippedCount}
        </span>
        dari 21 harapan
      </motion.div>

      {/* 21 Wish Cards Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 max-w-6xl w-full px-4">
        {wishes.map((wish, index) => {
          const isFlipped = !!flippedCards[wish.id];

          // Alternating colors based on card ID
          const gradientClass =
            wish.id % 3 === 0
              ? 'from-rose-500/20 to-pink-500/10 border-rose-500/30'
              : wish.id % 3 === 1
              ? 'from-purple-500/20 to-indigo-500/10 border-purple-500/30'
              : 'from-pink-500/20 to-purple-500/10 border-pink-500/30';

          return (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              onClick={() => handleCardClick(wish.id)}
              className={`flip-card h-28 sm:h-32 aspect-[3/4] sm:aspect-square md:aspect-[3/4] ${
                isFlipped ? 'flipped' : ''
              }`}
            >
              <div className="flip-card-inner">
                {/* Front Side */}
                <div
                  className={`flip-card-front flex flex-col items-center justify-center border bg-gradient-to-br ${gradientClass} transition-shadow hover:shadow-[0_0_15px_rgba(244,63,94,0.2)]`}
                >
                  <span className="font-heading text-2xl sm:text-3xl font-extrabold text-rose-200">
                    {wish.id}
                  </span>
                  <span className="text-[10px] sm:text-xs text-rose-300/40 uppercase tracking-widest mt-1">
                    Buka ✦
                  </span>
                </div>

                {/* Back Side */}
                <div className="flip-card-back flex items-center justify-center p-2 text-center glass-premium border border-rose-500/30">
                  <p className="text-[9px] sm:text-xs md:text-sm font-medium leading-relaxed text-rose-100 font-body select-none">
                    {wish.text}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

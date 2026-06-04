'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Photo {
  src: string;
  caption: string;
  rotate: string;
}

export default function MemoryGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const photos: Photo[] = [
    { src: '/images/r1.png', caption: 'Senyum manismu yang menenangkan 💖', rotate: '-4deg' },
    { src: '/images/r2.png', caption: 'Momen tawa bersamamu ✨', rotate: '3deg' },
    { src: '/images/r3.png', caption: 'Saat dunia terasa milik berdua 💕', rotate: '-2deg' },
    { src: '/images/r4.png', caption: 'Kamu yang selalu cantik setiap saat 🌸', rotate: '5deg' },
    { src: '/images/r5.jpg', caption: 'Hari indah bersamamu 💫', rotate: '-5deg' },
    { src: '/images/r6.png', caption: 'Tatapan mata yang meluluhkan hati 😍', rotate: '4deg' },
    { src: '/images/r7.png', caption: 'Cerita manis yang terukir indah 🌹', rotate: '-3deg' },
    { src: '/images/r8.png', caption: 'Setiap detik bersamamu berharga ⏳', rotate: '2deg' },
    { src: '/images/r9.png', caption: 'Kamu adalah definisi kebahagiaanku ❤️', rotate: '-4deg' },
    { src: '/images/r10.png', caption: 'Menatap masa depan bersamamu 💑', rotate: '3deg' },
  ];

  return (
    <section
      id="gallery"
      className="relative section-padding min-h-screen z-10 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="text-4xl sm:text-5xl block mb-4">📸</span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gradient tracking-wide">
          Galeri Kenangan Kita
        </h2>
        <p className="text-sm sm:text-base text-rose-200/70 mt-2 max-w-md mx-auto">
          Setiap foto menyimpan cerita indah dan manis tentang perjalanan kita
        </p>
      </motion.div>

      {/* Gallery Polaroid Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 max-w-7xl px-4">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -5, rotate: '0deg', zIndex: 10 }}
            onClick={() => setSelectedPhoto(photo)}
            className="polaroid cursor-pointer group"
            style={{ '--rotate': photo.rotate } as React.CSSProperties}
          >
            {/* Polaroid image box */}
            <div className="relative overflow-hidden aspect-square bg-midnight-900 border border-black/5 rounded-sm">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  // Fallback if png vs jpg mismatch occurs
                  const target = e.target as HTMLImageElement;
                  if (target.src.endsWith('.png')) {
                    target.src = target.src.replace('.png', '.jpg');
                  } else if (target.src.endsWith('.jpg')) {
                    target.src = target.src.replace('.jpg', '.png');
                  }
                }}
              />
            </div>

            {/* Polaroid caption */}
            <p className="font-script text-rose-900 text-center mt-3 text-xs sm:text-sm font-medium tracking-wide line-clamp-2 px-1">
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal (Framer Motion AnimatePresence) */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light hover:scale-110 transition-transform p-2 z-50"
            >
              ✕
            </button>

            {/* Zoomed Polaroid */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="polaroid max-w-lg w-full p-4 pb-12 cursor-default"
            >
              <div className="relative overflow-hidden aspect-square rounded-sm bg-midnight-900">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.endsWith('.png')) {
                      target.src = target.src.replace('.png', '.jpg');
                    } else if (target.src.endsWith('.jpg')) {
                      target.src = target.src.replace('.jpg', '.png');
                    }
                  }}
                />
              </div>
              <p className="font-script text-rose-900 text-center mt-4 text-base sm:text-xl font-semibold tracking-wide">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

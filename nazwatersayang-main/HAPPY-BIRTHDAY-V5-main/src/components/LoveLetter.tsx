'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LoveLetter() {
  const letterParagraphs = [
    "Kanggo Nazwa anu dipikacinta ,",
    "Di hari istimewa ini, aku ingin menulis sesuatu yang gak apa apa ngucapinya awalan yah biar surprise soalnya hihi :)",
    "Setiap hari mengenalmu adalah hadiah terindah yang pernah kuterima. Senyummu mampu mengubah hari terburuk menjadi yang terbaik. Tawamu adalah melodi yang selalu ingin kudengar berulang kali.",
    "Anjeun teh bukti yen Gusti Nu Maha Suci maparin kanyaah anu kacida ageungna ka abdi. Karena dari sekian banyak orang di dunia ini, Dia mengizinkanku untuk mengenalmu, mendekatimu, dan menjadi bagian dari ceritamu.",
    "Di usia ke-21 ini, mugi Gusti maparin kaséhatan, kabagjaan, sareng sagala kabagéan kanggo anjeun. Semoga setiap langkahmu dipenuhi berkah, setiap mimpimu menjadi kenyataan, dan setiap hari yang kamu jalani dipenuhi kebahagiaan yang tak terhingga.",
    "Hatur nuhun tos janten anjeun anu ayeuna — yang selalu membuatku ingin menjadi versi terbaik dari diriku",
    "Disarengan ku sadaya rasa cinta anu abdi kagungan,",
    "Pikeun Nazwa Aulia Ingdana Zulfa ❤️"
  ];

  return (
    <section
      id="love-letter"
      className="relative section-padding flex flex-col items-center justify-center min-h-screen z-10"
    >
      {/* Scroll animation headers */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <span className="text-4xl sm:text-5xl block mb-4 animate-bounce">💌</span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gradient tracking-wide">
          Surat Cinta Untukmu
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/60 uppercase tracking-widest mt-2">
          Goresan rasa yang paling tulus wkwk
        </p>
      </motion.div>

      {/* Main glass card container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="w-full max-w-2xl px-6 py-10 sm:p-12 rounded-3xl glass-premium relative overflow-hidden"
      >
        {/* Shimmer Effect */}
        <div className="absolute inset-0 shimmer pointer-events-none opacity-20" />

        {/* Decorative corner stars */}
        <div className="absolute top-4 left-4 text-rose-400/40 text-sm">✦</div>
        <div className="absolute top-4 right-4 text-rose-400/40 text-sm">✦</div>
        <div className="absolute bottom-4 left-4 text-rose-400/40 text-sm">✦</div>
        <div className="absolute bottom-4 right-4 text-rose-400/40 text-sm">✦</div>

        {/* Love Letter Content */}
        <div className="space-y-6 text-rose-100/90 leading-relaxed font-body text-sm sm:text-base md:text-lg">
          {letterParagraphs.map((paragraph, index) => {
            const isHeader = index === 0;
            const isFooter = index >= letterParagraphs.length - 2;

            return (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`${isHeader ? 'font-heading font-semibold text-rose-300 text-lg sm:text-xl' : ''} ${
                  isFooter ? 'text-right font-script text-rose-300 text-lg sm:text-2xl pt-2' : ''
                }`}
              >
                {paragraph}
              </motion.p>
            );
          })}
        </div>

        {/* Romantic quote quote decorator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-12 pt-8 border-t border-white/10 text-center"
        >
          <p className="font-script text-rose-300 text-xl sm:text-2xl max-w-md mx-auto leading-relaxed">
            &ldquo;Cinta sajati lain ngeunaan kasampurnaan, tapi ngeunaan narima kateusampurnaan kalayan sagemblengna hate hehe.&rdquo;
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

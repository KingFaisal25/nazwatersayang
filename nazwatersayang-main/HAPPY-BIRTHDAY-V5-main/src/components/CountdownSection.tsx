'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeDiff {
  years?: number;
  months?: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownSection() {
  const [ageTime, setAgeTime] = useState<TimeDiff>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [togetherTime, setTogetherTime] = useState<TimeDiff>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Helper to calculate exact age differences (June 15, 2005)
  const calculateAge = (): TimeDiff => {
    const birthDate = new Date('2005-06-15T00:00:00');
    const now = new Date();
    
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
      // Get previous month length
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    
    if (months < 0) {
      months += 12;
      years--;
    }

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return { years, months, days, hours, minutes, seconds };
  };

  // Helper to calculate time elapsed since they got close (March 1, 2026)
  const calculateTogether = (): TimeDiff => {
    const startDate = new Date('2026-03-01T00:00:00');
    const now = new Date();
    
    const diffMs = now.getTime() - startDate.getTime();
    
    // Total days difference
    const totalSecs = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSecs / (3600 * 24));
    
    const hours = Math.floor((totalSecs % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    // Initial calls
    setAgeTime(calculateAge());
    setTogetherTime(calculateTogether());

    // Setup 1-second ticking timer
    const timer = setInterval(() => {
      setAgeTime(calculateAge());
      setTogetherTime(calculateTogether());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="countdown"
      className="relative section-padding min-h-screen z-10 flex flex-col items-center justify-center select-none"
    >
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="text-4xl sm:text-5xl block mb-4 animate-[float_6s_infinite]">⏳</span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gradient tracking-wide">
          Setiap Detik Berharga
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/60 uppercase tracking-widest mt-2">
          Detak Waktu Kehidupan & Kebersamaan Kita
        </p>
      </motion.div>

      {/* Main Container for the two Countdown Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full px-4">
        {/* Card 1: Age Counter */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-premium p-6 sm:p-8 rounded-3xl border border-rose-500/10 flex flex-col items-center relative overflow-hidden"
        >
          <div className="absolute top-4 left-4 text-xs font-mono tracking-widest text-rose-300/30 uppercase">
            Usia Nazwa
          </div>
          <h3 className="font-heading text-xl sm:text-2xl text-rose-200 font-bold mb-8 mt-2 text-center">
            Usia Nazwa Sekarang
          </h3>

          <div className="grid grid-cols-3 gap-3 w-full">
            {/* Years */}
            <div className="glass-card border border-white/5 p-3 rounded-2xl flex flex-col items-center">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-glow text-gradient font-mono">
                {ageTime.years ?? 21}
              </span>
              <span className="text-[10px] sm:text-xs text-rose-200/50 uppercase tracking-widest mt-1">
                Tahun
              </span>
            </div>
            {/* Months */}
            <div className="glass-card border border-white/5 p-3 rounded-2xl flex flex-col items-center">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-glow text-gradient font-mono">
                {ageTime.months ?? 0}
              </span>
              <span className="text-[10px] sm:text-xs text-rose-200/50 uppercase tracking-widest mt-1">
                Bulan
              </span>
            </div>
            {/* Days */}
            <div className="glass-card border border-white/5 p-3 rounded-2xl flex flex-col items-center">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-glow text-gradient font-mono">
                {ageTime.days}
              </span>
              <span className="text-[10px] sm:text-xs text-rose-200/50 uppercase tracking-widest mt-1">
                Hari
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full mt-4">
            {/* Hours */}
            <div className="glass-card border border-white/5 p-3 rounded-2xl flex flex-col items-center">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-rose-200/80 font-mono">
                {String(ageTime.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-rose-200/40 uppercase tracking-widest mt-1">
                Jam
              </span>
            </div>
            {/* Minutes */}
            <div className="glass-card border border-white/5 p-3 rounded-2xl flex flex-col items-center">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-rose-200/80 font-mono">
                {String(ageTime.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-rose-200/40 uppercase tracking-widest mt-1">
                Menit
              </span>
            </div>
            {/* Seconds */}
            <div className="glass-card border border-white/5 p-3 rounded-2xl flex flex-col items-center">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-rose-400 font-mono animate-pulse">
                {String(ageTime.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-rose-200/40 uppercase tracking-widest mt-1">
                Detik
              </span>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Time Together Counter */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-premium p-6 sm:p-8 rounded-3xl border border-purple-500/10 flex flex-col items-center relative overflow-hidden"
        >
          <div className="absolute top-4 left-4 text-xs font-mono tracking-widest text-purple-300/30 uppercase">
            Kebersamaan Kita
          </div>
          <h3 className="font-heading text-xl sm:text-2xl text-purple-200 font-bold mb-8 mt-2 text-center">
            Waktu Sejak Kita Dekat
          </h3>

          <div className="w-full flex items-center justify-center mb-4">
            {/* Days block: full-width since it can be large */}
            <div className="glass-card border border-white/5 p-5 rounded-2xl flex flex-col items-center w-full max-w-sm">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-glow text-gradient font-mono">
                {togetherTime.days}
              </span>
              <span className="text-xs text-purple-200/50 uppercase tracking-widest mt-2 font-semibold">
                Hari Bersama
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full">
            {/* Hours */}
            <div className="glass-card border border-white/5 p-3 rounded-2xl flex flex-col items-center">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-purple-200/80 font-mono">
                {String(togetherTime.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-purple-200/40 uppercase tracking-widest mt-1">
                Jam
              </span>
            </div>
            {/* Minutes */}
            <div className="glass-card border border-white/5 p-3 rounded-2xl flex flex-col items-center">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-purple-200/80 font-mono">
                {String(togetherTime.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-purple-200/40 uppercase tracking-widest mt-1">
                Menit
              </span>
            </div>
            {/* Seconds */}
            <div className="glass-card border border-white/5 p-3 rounded-2xl flex flex-col items-center">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono animate-pulse">
                {String(togetherTime.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-purple-200/40 uppercase tracking-widest mt-1">
                Detik
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Romantic bottom sentence */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-12 text-center text-rose-300 font-script text-xl sm:text-2xl px-4"
      >
        Dan aku berharap setiap detik bersamamu tidak pernah berakhir... ❤️
      </motion.p>
    </section>
  );
}

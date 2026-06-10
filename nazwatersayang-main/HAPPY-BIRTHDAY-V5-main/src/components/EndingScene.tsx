'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function EndingScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const starsBgRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const finalTitleRef = useRef<HTMLHeadingElement>(null);
  const finalNameRef = useRef<HTMLHeadingElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reset initial positions (invisible)
    gsap.set([text1Ref.current, text2Ref.current, finalTitleRef.current, finalNameRef.current], {
      opacity: 0,
      y: 40,
    });
    gsap.set(starsBgRef.current, { opacity: 0 });
    gsap.set(footerRef.current, { opacity: 0 });

    // GSAP Auto timeline
    const tl = gsap.timeline();

    // Timeline steps with automatic sequence and delays
    tl.to(starsBgRef.current, { opacity: 0.6, duration: 1.5 })
      .to(text1Ref.current, { opacity: 1, y: 0, duration: 1.5 })
      .to(text1Ref.current, { opacity: 0, y: -20, duration: 1, delay: 2.0 }) // wait 2s, then fade out
      
      .to(text2Ref.current, { opacity: 1, y: 0, duration: 1.5 })
      .to(text2Ref.current, { opacity: 0, y: -20, duration: 1, delay: 2.0 }) // wait 2s, then fade out
      
      // Final reveal
      .to(finalTitleRef.current, { opacity: 1, y: 0, duration: 1.5 })
      .to(finalNameRef.current, { opacity: 1, y: 0, duration: 2.0 }, '-=0.5')
      .to(footerRef.current, { opacity: 0.5, duration: 1.5 }, '-=0.5');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="ending"
      className="relative w-full min-h-screen bg-midnight-950 flex flex-col items-center justify-center text-center overflow-hidden z-10 select-none"
    >
      {/* Decorative Full Star field background (faded in via scroll timeline) */}
      <div
        ref={starsBgRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_80%)]"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)), radial-gradient(2px 2px at 80px 120px, #fff, rgba(0,0,0,0))',
          backgroundSize: '150px 150px',
        }}
      />

      {/* Main Cinematic Cinematic sequence containers */}
      <div className="max-w-4xl px-6 relative z-10 w-full flex flex-col items-center justify-center min-h-[60vh]">
        {/* Step 1: Thank you */}
        <div
          ref={text1Ref}
          className="absolute font-accent text-rose-200 text-lg sm:text-2xl md:text-3xl leading-relaxed tracking-wider max-w-2xl px-4"
        >
          Terima kasih sudah hadir dan menjadi bagian terindah dalam hidupku.
        </div>

        {/* Step 2: Birthday sentence */}
        <div
          ref={text2Ref}
          className="absolute font-script text-rose-300 text-2xl sm:text-4xl md:text-5xl leading-relaxed tracking-wide px-4"
        >
          &ldquo;Setiap hari mengenalmu adalah hadiah terbaik yang semesta berikan untukku.&rdquo;
        </div>

        {/* Step 3: Birthday Title Card Reveal */}
        <div className="flex flex-col items-center justify-center">
          <h3
            ref={finalTitleRef}
            className="font-heading text-xl sm:text-3xl text-rose-200 font-light mb-3 select-none tracking-widest uppercase"
          >
            Selamat Ulang Tahun Ke-21
          </h3>
          <h2
            ref={finalNameRef}
            className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-gradient text-glow tracking-wider py-4 select-none"
          >
            Nazwa Aulia Ingdana Zulfa ❤️
          </h2>
        </div>
      </div>

      {/* Subtle footer */}
      <div
        ref={footerRef}
        className="absolute bottom-6 font-body text-xs text-rose-200/50 uppercase tracking-widest font-medium z-10"
      >
        Dibuat dengan ❤️ penuh cinta
      </div>
    </div>
  );
}

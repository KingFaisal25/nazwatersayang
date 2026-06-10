'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection({ onNext }: { onNext: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial setup (hidden states for animation)
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, dateRef.current], {
      opacity: 0,
      y: 40,
    });
    gsap.set(scrollIndicatorRef.current, {
      opacity: 0,
      y: 20,
    });

    const tl = gsap.timeline({ delay: 1.5 }); // Starts after loading screen is closed

    // Stagger reveal lines
    tl.to(line1Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power4.out',
    })
    .to(line2Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power4.out',
    }, '-=0.9')
    .to(line3Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power4.out',
    }, '-=0.9')
    .to(dateRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.6')
    .to(scrollIndicatorRef.current, {
      opacity: 0.8,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    }, '-=0.3');

    // Smooth bounce for scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'sine.inOut',
    });
  }, []);

  const handleScrollDown = () => {
    onNext();
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden z-10"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Decorative Top Heart Icon */}
        <div className="text-red-500 text-3xl animate-pulse-heart mb-6 select-none">
          ❤️
        </div>

        {/* Hero Text Lines */}
        <h1 className="font-heading font-extrabold tracking-tight select-none">
          <span
            ref={line1Ref}
            className="block text-2xl sm:text-4xl md:text-5xl text-rose-100 font-light mb-2"
          >
            Selamat Ulang Tahun Ke-21
          </span>
          <span
            ref={line2Ref}
            className="block text-3xl sm:text-5xl md:text-6xl text-rose-300 font-script font-normal py-2 mb-2"
          >
            Sayangku,
          </span>
          <span
            ref={line3Ref}
            className="block text-4xl sm:text-6xl md:text-7xl font-black text-gradient text-glow tracking-wide mt-2"
          >
            Nazwa Aulia Ingdana Zulfa
          </span>
        </h1>

        {/* Subtitle Date */}
        <div
          ref={dateRef}
          className="mt-8 text-xl sm:text-2xl font-script text-amber-200 select-none flex items-center gap-2"
        >
          <span>✦</span> 14 Juni 2026 <span>✦</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        onClick={handleScrollDown}
        className="absolute bottom-10 flex flex-col items-center cursor-pointer select-none opacity-80 group hover:opacity-100 transition-opacity"
      >
        <span className="text-xs tracking-widest text-rose-200 uppercase mb-2 group-hover:text-rose-100 transition-colors">
          Mulai Cerita 💖
        </span>
        <svg
          className="w-6 h-6 text-rose-400 group-hover:text-rose-300 transition-colors animate-pulse"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

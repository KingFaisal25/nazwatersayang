'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import AudioProvider from '@/providers/AudioProvider';

// Dynamic imports to handle SSR for browser-only components
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });
const GalaxyBackground = dynamic(() => import('@/components/GalaxyBackground'), { ssr: false });
const AuroraBackground = dynamic(() => import('@/components/AuroraBackground'), { ssr: false });
const BalloonsBackground = dynamic(() => import('@/components/BalloonsBackground'), { ssr: false });
const HeartInteraction = dynamic(() => import('@/components/HeartInteraction'), { ssr: false });
const AudioPlayer = dynamic(() => import('@/components/AudioPlayer'), { ssr: false });
const SecretMessages = dynamic(() => import('@/components/SecretMessages'), { ssr: false });

// Section components
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: false });
const LoveLetter = dynamic(() => import('@/components/LoveLetter'), { ssr: false });
const MemoryGallery = dynamic(() => import('@/components/MemoryGallery'), { ssr: false });
const WishesSection = dynamic(() => import('@/components/WishesSection'), { ssr: false });
const LoveMeter = dynamic(() => import('@/components/LoveMeter'), { ssr: false });
const CountdownSection = dynamic(() => import('@/components/CountdownSection'), { ssr: false });
const BirthdayCelebration = dynamic(() => import('@/components/BirthdayCelebration'), { ssr: false });
const EndingScene = dynamic(() => import('@/components/EndingScene'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);

  const nextSection = () => {
    if (activeSection < 7) {
      setActiveSection((prev) => prev + 1);
    }
  };

  const prevSection = () => {
    if (activeSection > 0) {
      setActiveSection((prev) => prev - 1);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 0:
        return <HeroSection onNext={nextSection} />;
      case 1:
        return <LoveLetter />;
      case 2:
        return <MemoryGallery />;
      case 3:
        return <WishesSection />;
      case 4:
        return <LoveMeter />;
      case 5:
        return <CountdownSection />;
      case 6:
        return <BirthdayCelebration />;
      case 7:
        return <EndingScene />;
      default:
        return null;
    }
  };

  return (
    <AudioProvider>
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Fixed Background Layers */}
      <GalaxyBackground />
      <AuroraBackground />
      <BalloonsBackground />

      {/* Interactive Effects (global) */}
      <HeartInteraction />
      <AudioPlayer />
      <SecretMessages />

      {/* Main Content */}
      {!isLoading && (
        <main className="relative z-10 w-screen h-screen overflow-hidden flex flex-col justify-between">
          <div className="flex-1 w-full relative overflow-y-auto overflow-x-hidden focus:outline-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="w-full min-h-full flex flex-col justify-center"
              >
                {renderActiveSection()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating Navigation Controls */}
          {activeSection < 7 && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none max-w-sm w-full px-4">
              <div className="glass-premium rounded-full px-4 py-2.5 border border-rose-500/20 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(244,63,94,0.1)]">
                {/* Back button */}
                <button
                  onClick={prevSection}
                  disabled={activeSection === 0}
                  className="px-4 py-1.5 rounded-full flex items-center gap-1 border border-white/5 text-xs font-medium transition-all text-rose-200 active:scale-95 disabled:opacity-0 disabled:pointer-events-none hover:bg-white/5"
                  title="Kembali"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Kembali</span>
                </button>

                {/* Page Indicator */}
                <div className="text-xs font-semibold tracking-widest text-rose-300/80 font-mono">
                  {activeSection + 1} / 8
                </div>

                {/* Next button */}
                <button
                  onClick={nextSection}
                  className="px-4 py-1.5 rounded-full flex items-center gap-1 border border-rose-500/30 bg-rose-500/10 text-xs font-semibold text-rose-100 hover:bg-rose-500/20 active:scale-95 transition-all animate-glow-pulse"
                  title="Lanjut"
                >
                  <span>Lanjut 💖</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </main>
      )}
    </AudioProvider>
  );
}

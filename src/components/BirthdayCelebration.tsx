'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function BirthdayCelebration() {
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Triggers canvas-confetti bursts sequentially
  const fireConfetti = async () => {
    try {
      const confettiModule = await import('canvas-confetti');
      const confetti = confettiModule.default;

      // Burst from left side
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#f43f5e', '#fda4af', '#a855f7', '#fbbf24'],
      });

      // Burst from right side
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ['#f43f5e', '#fda4af', '#a855f7', '#fbbf24'],
        });
      }, 250);

      // Center burst
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#f43f5e', '#ec4899', '#ffeb3b'],
        });
      }, 500);
    } catch (e) {
      console.error(e);
    }
  };

  // Canvas-based Fireworks display
  const startFireworks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      decay: number;
      size: number;
    }

    interface Firework {
      x: number;
      y: number;
      tx: number;
      ty: number;
      color: string;
      speed: number;
      exploded: boolean;
      particles: Particle[];
    }

    const fireworks: Firework[] = [];

    const colors = [
      '#f43f5e', // red-rose
      '#d946ef', // purple
      '#3b82f6', // blue
      '#22c55e', // green
      '#eab308', // gold/yellow
      '#a855f7', // violet
    ];

    const spawnFirework = () => {
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const tx = Math.random() * canvas.width;
      const ty = Math.random() * (canvas.height * 0.5); // explode on top half of canvas
      const color = colors[Math.floor(Math.random() * colors.length)];

      fireworks.push({
        x,
        y,
        tx,
        ty,
        color,
        speed: 8 + Math.random() * 5,
        exploded: false,
        particles: [],
      });
    };

    // Spawn initial fireworks
    for (let i = 0; i < 3; i++) {
      spawnFirework();
    }

    let frameCount = 0;
    const animate = () => {
      ctx.fillStyle = 'rgba(8, 5, 16, 0.2)'; // trail backdrop overlay
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Periodically spawn fireworks
      if (frameCount % 45 === 0 && fireworks.length < 8) {
        spawnFirework();
      }
      frameCount++;

      fireworks.forEach((fw, fIndex) => {
        if (!fw.exploded) {
          // Launch to target position
          const dx = fw.tx - fw.x;
          const dy = fw.ty - fw.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 10) {
            fw.exploded = true;
            // Create explosion particles
            const particleCount = 40 + Math.floor(Math.random() * 20);
            for (let i = 0; i < particleCount; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = 2 + Math.random() * 5;
              fw.particles.push({
                x: fw.x,
                y: fw.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: fw.color,
                alpha: 1,
                decay: 0.015 + Math.random() * 0.01,
                size: 2 + Math.random() * 2,
              });
            }
          } else {
            const angle = Math.atan2(dy, dx);
            fw.x += Math.cos(angle) * fw.speed;
            fw.y += Math.sin(angle) * fw.speed;

            // Draw missile shell
            ctx.beginPath();
            ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = fw.color;
            ctx.fill();
          }
        } else {
          // Update and draw explosion particles
          fw.particles.forEach((p, pIndex) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.03; // gravity
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
              fw.particles.splice(pIndex, 1);
            } else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.globalAlpha = p.alpha;
              ctx.fill();
              ctx.globalAlpha = 1.0;
            }
          });

          // Remove firework if exploded and all particles decayed
          if (fw.particles.length === 0) {
            fireworks.splice(fIndex, 1);
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const handleCelebrate = () => {
    setHasCelebrated(true);
    fireConfetti();
    startFireworks();

    // End fireworks after 5 seconds to preserve performance
    setTimeout(() => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    }, 6000);
  };

  // Auto burst after 4 seconds (after loading screen)
  useEffect(() => {
    const timer = setTimeout(() => {
      fireConfetti();
    }, 4500);

    return () => {
      clearTimeout(timer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      id="celebration"
      className="relative section-padding min-h-screen z-10 flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Fireworks canvas overlay */}
      {hasCelebrated && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
      )}

      {/* Main glass box content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl p-8 rounded-3xl glass-premium border border-rose-500/10 flex flex-col items-center text-center relative z-10"
      >
        <span className="text-4xl sm:text-5xl block mb-6 animate-bounce">🎂</span>

        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-gradient tracking-wide mb-3">
          Saatnya Merayakan!
        </h2>
        <p className="text-sm sm:text-base text-rose-200/70 mb-8 max-w-md">
          Ketuk tombol di bawah untuk menyalakan kembang api dan merayakan hari paling indah ini.
        </p>

        {/* Celebration button */}
        <button
          onClick={handleCelebrate}
          className="btn-romantic font-semibold text-sm sm:text-base tracking-wider uppercase flex items-center gap-2 group active:scale-95 focus:outline-none"
        >
          <span>✨</span>
          <span>
            {hasCelebrated ? 'Selamat Ulang Ulang Tahun! 🥳' : 'Tiup Lilin & Rayakan! 🎉'}
          </span>
          <span>✨</span>
        </button>

        {/* Dynamic Wish Message Reveal */}
        {hasCelebrated && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-rose-300 font-script text-xl sm:text-2xl leading-relaxed max-w-sm animate-pulse"
          >
            &ldquo;Semoga seluruh doa, harapan, dan mimpimu di tahun ke-21 ini menjadi kenyataan nyata. Kamu sangat istimewa!&rdquo;
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

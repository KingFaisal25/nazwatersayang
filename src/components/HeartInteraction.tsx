'use client';

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  type: 'heart' | 'sparkle';
  rotation: number;
  rotSpeed: number;
}

export default function HeartInteraction() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastTrailTime = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
      '#f43f5e', // rose-500
      '#fda4af', // rose-300
      '#ec4899', // pink-500
      '#d946ef', // fuchsia-500
      '#a855f7', // purple-500
      '#ff85a2', // soft coral-pink
    ];

    const createExplosion = (x: number, y: number) => {
      // 8-12 Heart particles
      const heartCount = 8 + Math.floor(Math.random() * 5);
      for (let i = 0; i < heartCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1, // slight upward bias
          size: 12 + Math.random() * 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 0.015 + Math.random() * 0.01,
          type: 'heart',
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1,
        });
      }

      // 5-8 Sparkle particles
      const sparkleCount = 5 + Math.floor(Math.random() * 4);
      for (let i = 0; i < sparkleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 6 + Math.random() * 6,
          color: '#fef08a', // light yellow-gold
          alpha: 1,
          decay: 0.025 + Math.random() * 0.015,
          type: 'sparkle',
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      context.globalAlpha = alpha;
      context.fillStyle = color;

      // Draw heart path
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      // Top left curve
      context.bezierCurveTo(
        -size / 2,
        -size / 2,
        -size,
        topCurveHeight,
        0,
        size
      );
      // Top right curve
      context.bezierCurveTo(
        size,
        topCurveHeight,
        size / 2,
        -size / 2,
        0,
        topCurveHeight
      );

      context.closePath();
      context.fill();
      context.restore();
    };

    const drawSparkle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      context.globalAlpha = alpha;
      context.fillStyle = color;

      // Draw a 4-pointed star / sparkle
      for (let i = 0; i < 4; i++) {
        context.lineTo(0, size);
        context.lineTo(size * 0.2, size * 0.2);
        context.rotate(Math.PI / 2);
      }

      context.closePath();
      context.fill();
      context.restore();
    };

    const handleWindowClick = (e: MouseEvent) => {
      createExplosion(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTrailTime.current > 60) {
        // Spawn trail heart
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -1 - Math.random() * 1.2, // Floats upward
          size: 8 + Math.random() * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.8,
          decay: 0.02 + Math.random() * 0.01,
          type: 'heart',
          rotation: (Math.random() - 0.5) * 0.5,
          rotSpeed: (Math.random() - 0.5) * 0.05,
        });
        lastTrailTime.current = now;
      }
    };

    window.addEventListener('click', handleWindowClick);
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, index) => {
        // Update physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        // Render particle based on type
        if (p.alpha <= 0) {
          particlesRef.current.splice(index, 1);
        } else {
          if (p.type === 'heart') {
            drawHeart(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
          } else {
            drawSparkle(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleWindowClick);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none select-none"
    />
  );
}

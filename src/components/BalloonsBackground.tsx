'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BalloonColor {
  bg: string;
  shadow: string;
}

interface Balloon {
  id: number;
  x: number; // percentage (vw)
  size: number; // width in px
  delay: number; // seconds
  duration: number; // seconds
  color: BalloonColor;
}

export default function BalloonsBackground() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const colors: BalloonColor[] = [
      { bg: '#fb7185', shadow: 'rgba(251, 113, 133, 0.4)' }, // rose-400
      { bg: '#f472b6', shadow: 'rgba(244, 114, 182, 0.4)' }, // pink-400
      { bg: '#c084fc', shadow: 'rgba(192, 132, 252, 0.4)' }, // purple-400
      { bg: '#818cf8', shadow: 'rgba(129, 140, 248, 0.4)' }, // indigo-400
      { bg: '#f59e0b', shadow: 'rgba(245, 158, 11, 0.4)' },  // amber-500
      { bg: '#fb923c', shadow: 'rgba(251, 146, 60, 0.4)' },  // orange-400
    ];

    const generated: Balloon[] = Array.from({ length: 15 }).map((_, i) => {
      const size = 50 + Math.random() * 30; // 50px to 80px
      const x = Math.random() * 90 + 5; // 5% to 95%
      const delay = Math.random() * 15; // stagger delay
      const duration = 15 + Math.random() * 10; // 15s to 25s
      const color = colors[i % colors.length];

      return {
        id: i,
        x,
        size,
        delay,
        duration,
        color,
      };
    });

    setBalloons(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 w-full h-full select-none">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          initial={{ y: '115vh', x: `${balloon.x}vw`, rotate: balloon.id % 2 === 0 ? -8 : 8 }}
          animate={{
            y: '-25vh',
            x: [
              `${balloon.x}vw`,
              `${balloon.x + (Math.random() * 6 - 3)}vw`,
              `${balloon.x + (Math.random() * 6 - 3)}vw`,
              `${balloon.x}vw`,
            ],
            rotate: [
              balloon.id % 2 === 0 ? -12 : 12,
              balloon.id % 2 === 0 ? 12 : -12,
              balloon.id % 2 === 0 ? -12 : 12,
            ],
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute flex flex-col items-center"
          style={{ width: balloon.size }}
        >
          {/* Balloon body with 3D gradient */}
          <div
            className="w-full rounded-t-full rounded-b-[60px] relative shadow-lg"
            style={{
              height: balloon.size * 1.25,
              background: `radial-gradient(circle at 35% 35%, ${balloon.color.bg} 40%, rgba(0,0,0,0.2) 100%), ${balloon.color.bg}`,
              boxShadow: `0 10px 25px -5px ${balloon.color.shadow}, inset -6px -6px 15px rgba(0,0,0,0.25)`
            }}
          >
            {/* Glossy highlight/shine reflection */}
            <div className="absolute top-[12%] left-[16%] w-[20%] h-[35%] bg-white/35 rounded-full rotate-[15deg] filter blur-[0.5px]" />
          </div>

          {/* Knot */}
          <div
            className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] -mt-[1px]"
            style={{ borderBottomColor: balloon.color.bg }}
          />

          {/* Hanging string */}
          <div
            className="w-[1px] bg-white/15 rounded-full"
            style={{ height: balloon.size * 1.5 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

'use client';

import React from 'react';

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-1 pointer-events-none overflow-hidden select-none">
      {/* Aurora Layer 1 - Rose */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full mix-blend-screen filter blur-[120px] opacity-20 bg-rose-500 animate-aurora"
      />
      {/* Aurora Layer 2 - Violet */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] rounded-full mix-blend-screen filter blur-[150px] opacity-15 bg-purple-600 animate-aurora-2"
      />
      {/* Aurora Layer 3 - Blue */}
      <div 
        className="absolute top-[30%] left-[20%] w-[70%] h-[70%] rounded-full mix-blend-screen filter blur-[130px] opacity-10 bg-blue-500 animate-float-slow"
      />
    </div>
  );
}

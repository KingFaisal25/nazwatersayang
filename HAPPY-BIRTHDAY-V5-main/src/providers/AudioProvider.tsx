'use client';

import { createContext, useContext, useRef, useState, useEffect, ReactNode } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  setVolume: (v: number) => void;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  togglePlay: () => {},
  setVolume: () => {},
});

export function useAudio() {
  return useContext(AudioContext);
}

export default function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = new Audio('/music/setlove.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      audio.pause();
      audio.src = '';
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const setVolume = (v: number) => {
    if (audioRef.current) audioRef.current.volume = Math.max(0, Math.min(1, v));
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
}

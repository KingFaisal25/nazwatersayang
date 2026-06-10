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
    const audio = new Audio('/music/india.mp3');
    audio.loop = false; // first song does not loop
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

    const handleSongEnded = () => {
      // When first song ends, switch to second song and loop it
      audio.src = '/music/india.mp3';
      audio.loop = true;
      audio.play().catch(() => {});
    };

    audio.addEventListener('ended', handleSongEnded);
    window.addEventListener('click', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      audio.removeEventListener('ended', handleSongEnded);
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

'use client';

import { createContext, useContext, useRef, useState, useEffect, ReactNode, useCallback } from 'react';

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

  const playAudio = useCallback(async () => {
    if (!audioRef.current) return false;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, []);

  useEffect(() => {
    const audio = new Audio('/music/india.mp3');
    audio.loop = false; // first song does not loop
    audio.volume = 0.3;
    audio.preload = 'auto';
    audioRef.current = audio;

    const removeInteractionListeners = () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    const handleInteraction = () => {
      void playAudio();
      removeInteractionListeners();
    };

    const handleSongEnded = () => {
      // When first song ends, switch to second song and loop it
      audio.src = '/music/india.mp3';
      audio.loop = true;
      void playAudio();
    };

    audio.addEventListener('ended', handleSongEnded);

    void playAudio().then((started) => {
      if (!started) {
        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });
        window.addEventListener('keydown', handleInteraction, { once: true });
      }
    });

    return () => {
      removeInteractionListeners();
      audio.removeEventListener('ended', handleSongEnded);
      audio.pause();
      audio.src = '';
    };
  }, [playAudio]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      void playAudio();
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

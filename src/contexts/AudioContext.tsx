"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AUDIO_CONFIG } from "@/lib/constants";
import type { AudioContextType } from "@/lib/types";

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeInRef = useRef<() => void>(() => {});
  const isPlayingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(AUDIO_CONFIG.VOLUME_KEY);
      if (saved) {
        const parsed = Number(saved);
        if (!Number.isNaN(parsed)) {
          return Math.max(0, Math.min(1, parsed));
        }
      }
    }
    return AUDIO_CONFIG.DEFAULT_VOLUME;
  });
  const initialVolumeRef = useRef(volume);

  const clearFadeInterval = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeIn = useCallback(() => {
    if (!audioRef.current) return;
    clearFadeInterval();
    const audio = audioRef.current;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        isPlayingRef.current = true;
        localStorage.setItem(AUDIO_CONFIG.STORAGE_KEY, "true");
        let current = 0;
        const target = volume;
        const step = target / (AUDIO_CONFIG.FADE_DURATION / 50);
        fadeIntervalRef.current = setInterval(() => {
          current += step;
          if (current >= target || !audioRef.current) {
            audio.volume = target;
            clearFadeInterval();
          } else {
            audio.volume = current;
          }
        }, 50);
      })
      .catch((err) => {
        console.warn("Autoplay engellendi:", err);
      });
  }, [volume, clearFadeInterval]);

  const fadeOut = useCallback(() => {
    if (!audioRef.current) return;
    clearFadeInterval();
    const audio = audioRef.current;
    let current = audio.volume;
    const step = current / (AUDIO_CONFIG.FADE_DURATION / 50);
    fadeIntervalRef.current = setInterval(() => {
      current -= step;
      if (current <= 0 || !audioRef.current) {
        audio.volume = 0;
        audio.pause();
        setIsPlaying(false);
        isPlayingRef.current = false;
        localStorage.setItem(AUDIO_CONFIG.STORAGE_KEY, "false");
        clearFadeInterval();
      } else {
        audio.volume = current;
      }
    }, 50);
  }, [clearFadeInterval]);

  useEffect(() => {
    fadeInRef.current = fadeIn;
  }, [fadeIn]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (audioRef.current) return;

    const audio = new Audio(AUDIO_CONFIG.BACKGROUND_MUSIC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = initialVolumeRef.current;
    audioRef.current = audio;

    const cleanupListeners = () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    const handleFirstInteraction = () => {
      if (!isPlayingRef.current) {
        fadeInRef.current();
      }
      cleanupListeners();
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
      cleanupListeners();
    };
  }, []); 

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      fadeOut();
    } else {
      fadeIn();
    }
  }, [isPlaying, fadeIn, fadeOut]);

  const setVolume = (newVolume: number) => {
    const clamped = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clamped);
    localStorage.setItem(AUDIO_CONFIG.VOLUME_KEY, clamped.toString());
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "m") {
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [togglePlay]);

  const value = useMemo(
    () => ({
      isPlaying,
      volume,
      togglePlay,
      setVolume,
      fadeIn,
      fadeOut,
    }),
    [isPlaying, volume, togglePlay, fadeIn, fadeOut],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}


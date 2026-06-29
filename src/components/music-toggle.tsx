"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/contexts/AudioContext";

const barVariants = {
  playing: (i: number) => ({
    scaleY: [0.2, 1.0, 0.2] as number[],
    transition: {
      duration: 0.6 + i * 0.12,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: i * 0.08,
    },
  }),
  paused: {
    scaleY: 0.15,
  },
};

export function MusicToggle() {
  const { isPlaying, togglePlay, volume, setVolume } = useAudio();
  const [showSlider, setShowSlider] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <AnimatePresence>
        {showSlider && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-white shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/60">🔊</span>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(volume * 100)}
                onChange={(e) => setVolume(Number(e.target.value) / 100)}
                className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-white/20
                [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white"
              />
              <span className="w-10 text-right text-xs font-semibold text-white/80">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={togglePlay}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:border-fuchsia-500/40 hover:bg-black/70"
        style={{
          boxShadow: isPlaying 
            ? "0 0 25px rgba(217, 70, 239, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.05)" 
            : "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.02)",
        }}
        aria-label={isPlaying ? "Müziği durdur" : "Müziği başlat"}
      >
        {/* Glow behind when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 opacity-15 blur-sm"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        {/* Visual equalizer lines */}
        <div className="relative flex h-5 w-6 items-end justify-center gap-[3px]">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={barVariants}
              animate={isPlaying ? "playing" : "paused"}
              style={{ originY: 1 }}
              className="w-[3px] h-full rounded-full bg-gradient-to-t from-indigo-400 via-purple-400 to-fuchsia-400"
            />
          ))}
        </div>

        {/* Mini play/pause badge on stopped state */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 20 20" className="h-5 w-5 text-white/80" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.445-10.832A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        <div className="pointer-events-none absolute bottom-full mb-3 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:translate-y-[-4px]">
          <div className="rounded-lg bg-black/80 border border-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-white shadow-xl backdrop-blur-md">
            {isPlaying ? "Müziği Durdur" : "Müziği Başlat"}
          </div>
        </div>
      </motion.button>
    </div>
  );
}



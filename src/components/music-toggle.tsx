"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/contexts/AudioContext";

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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="rounded-full border border-white/10 bg-slate-900/90 px-4 py-3 text-white shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/70">🔊</span>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(volume * 100)}
                onChange={(e) => setVolume(Number(e.target.value) / 100)}
                className="h-1 w-28 cursor-pointer appearance-none rounded-full bg-white/20
                [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white"
              />
              <span className="w-10 text-right text-xs text-white/70">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={togglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-white shadow-lg shadow-fuchsia-600/40 transition hover:shadow-xl hover:shadow-fuchsia-500/60"
        aria-label={isPlaying ? "Müziği durdur" : "Müziği başlat"}
      >
        {isPlaying && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-fuchsia-400"
              animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-indigo-300"
              animate={{ scale: [1, 1.45, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
          </>
        )}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
        >
          {isPlaying ? (
            <svg viewBox="0 0 20 20" className="h-6 w-6" fill="currentColor">
              <path d="M18 10A8 8 0 112 10a8 8 0 0116 0zM8 7a1 1 0 112 0v6a1 1 0 11-2 0V7zm4-1a1 1 0 00-1 1v6a1 1 0 102 0V7a1 1 0 00-1-1z" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" className="h-6 w-6" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.445-10.832A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </motion.div>

        <div className="pointer-events-none absolute bottom-full mb-2 opacity-0 transition group-hover:opacity-100">
          <div className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white shadow-lg">
            {isPlaying ? "Müziği Durdur" : "Müziği Başlat"}
          </div>
        </div>
      </motion.button>
    </div>
  );
}


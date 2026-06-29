"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { SpotifyData } from "@/lib/types";

type SpotifyWidgetProps = {
  spotify: SpotifyData;
};

export function SpotifyWidget({ spotify }: SpotifyWidgetProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const elapsed = Date.now() - spotify.timestamps.start;
      const total = spotify.timestamps.end - spotify.timestamps.start;
      setProgress(Math.min((elapsed / total) * 100, 100));
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [spotify]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="mb-4 relative overflow-hidden rounded-2xl border border-emerald-500/10 bg-black/45 p-4 shadow-[0_8px_32px_rgba(16,185,129,0.06)] backdrop-blur-xl"
    >
      {/* Ambient background glow */}
      <div className="absolute -right-10 -top-10 -z-10 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl" />

      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400/90 tracking-custom">
            Spotify&apos;da Dinliyor
          </span>
        </div>

        {/* Mini music equalizer indicator */}
        <div className="flex items-end gap-[3px] h-3 w-4 pr-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ height: ["30%", "100%", "30%"] }}
              transition={{
                duration: 0.5 + i * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.05,
              }}
              style={{ originY: 1 }}
              className="w-[2px] h-full rounded-full bg-emerald-400"
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <motion.div 
          whileHover={{ scale: 1.04, rotate: 3 }}
          className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10"
        >
          <Image
            src={spotify.album_art_url}
            alt={spotify.album}
            fill
            className="object-cover"
            sizes="64px"
          />
        </motion.div>
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <h4 className="truncate text-base font-semibold text-white tracking-wide hover:text-emerald-300 transition-colors">
            {spotify.song}
          </h4>
          <p className="truncate text-sm text-white/60 mt-0.5">
            {spotify.artist}
          </p>
          <div className="mt-3 relative h-1.5 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}



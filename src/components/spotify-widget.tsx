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
    const interval = setInterval(() => {
      const elapsed = Date.now() - spotify.timestamps.start;
      const total = spotify.timestamps.end - spotify.timestamps.start;
      setProgress(Math.min((elapsed / total) * 100, 100));
    }, 1000);

    return () => clearInterval(interval);
  }, [spotify]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 p-4 backdrop-blur-md"
    >
      <div className="mb-3 flex items-center gap-2">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="h-3 w-3 rounded-full bg-emerald-400"
        />
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-200">
          Spotify&apos;da Dinliyor
        </span>
      </div>
      <div className="flex gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-xl shadow-lg">
          <Image
            src={spotify.album_art_url}
            alt={spotify.album}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-base font-semibold text-white">{spotify.song}</h4>
          <p className="truncate text-sm text-white/70">{spotify.artist}</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-emerald-400"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}


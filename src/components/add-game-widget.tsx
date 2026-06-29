"use client";

import { motion } from "framer-motion";
import type { GameCategory } from "@/lib/types";

type AddGameWidgetProps = {
  category: GameCategory;
};

export function AddGameWidget({ category }: AddGameWidgetProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="flex h-60 w-full max-w-[170px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-white/5 px-4 text-white shadow-inner backdrop-blur-md transition hover:border-purple-500/60 hover:bg-white/10 sm:w-40"
      aria-label={`${category === "favorite" ? "Favori" : "Dönüşümlü"} oyun ekle`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-purple-500/20">
        <svg
          className="h-6 w-6 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-white/70">Oyun Ekle</p>
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
          {category === "favorite" ? "Favori" : "Rotation"}
        </p>
      </div>
    </motion.button>
  );
}


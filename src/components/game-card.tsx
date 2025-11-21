"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { GameCardProps } from "@/lib/types";

export function GameCard({ game, index, variant = "scroll" }: GameCardProps) {
  const gradients = useMemo(() => {
    const palette = [
      "linear-gradient(135deg, rgba(139, 92, 246, 0.45), rgba(236, 72, 153, 0.45))",
      "linear-gradient(135deg, rgba(59, 130, 246, 0.45), rgba(16, 185, 129, 0.45))",
      "linear-gradient(135deg, rgba(236, 72, 153, 0.45), rgba(249, 115, 22, 0.45))",
    ];
    return palette[index % palette.length];
  }, [index]);

  const cardHeight = variant === "scroll" ? "h-60" : "h-64";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.04, y: -8 }}
      className={`group relative flex-shrink-0 cursor-pointer ${variant === "scroll" ? "w-40" : "w-full"}`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-[#10121a] ${cardHeight}`}
        style={{
          backgroundImage: `${gradients}, url(${game.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 rounded-2xl border border-white/5 opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-3xl bg-purple-500/30 blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 space-y-1 p-4">
          {game.playTime && <p className="text-xs font-medium text-white/80">🎮 {game.playTime}</p>}
          {game.lastPlayed && <p className="text-[11px] text-white/60">Son oynanma: {game.lastPlayed}</p>}
          {game.tags && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {game.tags.slice(0, 3).map((tag) => (
                <span
                  key={`${game.id}-${tag}`}
                  className="text-[10px] font-medium uppercase tracking-wide text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 px-1">
        <h3 className="truncate text-sm font-semibold text-white transition group-hover:text-purple-300">
          {game.title}
        </h3>
        {game.subtitle && <p className="text-xs text-white/50">{game.subtitle}</p>}
      </div>
    </motion.div>
  );
}


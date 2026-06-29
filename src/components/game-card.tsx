"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { GameCardProps } from "@/lib/types";

export function GameCard({ game, index, variant = "scroll" }: GameCardProps) {

  const wrapperClasses = variant === "scroll" ? "w-40" : "w-full max-w-[220px]";
  const cardShape = variant === "scroll" ? "h-60" : "aspect-[3/4]";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.04, y: -8 }}
      className={`group relative z-10 flex-shrink-0 cursor-pointer ${wrapperClasses}`}
    >
      <div className={`relative overflow-hidden rounded-2xl ${cardShape} w-full`}>
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          className="object-cover"
          sizes={variant === "scroll" ? "160px" : "220px"}
          priority={index < 2}
        />
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


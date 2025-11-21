"use client";

import { motion } from "framer-motion";
import { FAVORITE_GAMES, ROTATION_GAMES } from "@/lib/game-data";
import { GameCard } from "./game-card";

export function GameProfile() {
  return (
    <section className="mx-auto mb-24 mt-10 w-full max-w-6xl px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">Discord Game ID</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Oyun vitrinim - Bakımda</h2>
        <p className="mt-2 text-sm text-white/60">Sevdiğim tüm oyunlar</p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mb-12 space-y-4 rounded-3xl border border-white/5 bg-white/5 p-6 shadow-[0_30px_120px_rgba(59,7,100,0.25)] backdrop-blur-2xl"
      >
        <header className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.45em] text-white/50">Rotation</p>
            <h3 className="text-xl font-semibold text-white">Dönüşümlü oyunlar</h3>
            <p className="text-sm text-white/60">Şu anda radarımda olan oyunlar — en fazla 5 oyun.</p>
          </div>
          <button className="text-sm font-medium text-purple-300 transition hover:text-purple-100">
            Tümünü gör
          </button>
        </header>
        <div className="scrollbar-thin flex gap-4 overflow-x-auto pb-2">
          {ROTATION_GAMES.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} variant="scroll" />
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="space-y-4 rounded-3xl border border-white/5 bg-white/5 p-6 shadow-[0_30px_120px_rgba(59,7,100,0.25)] backdrop-blur-2xl"
      >
        <header className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.45em] text-white/50">Spotlight</p>
            <h3 className="text-xl font-semibold text-white">Favori oyunlar</h3>
            <p className="text-sm text-white/60">Profilimde sabitlediğim klasikler.</p>
          </div>
          <span className="text-xs text-white/50">+ Oyun ekle</span>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FAVORITE_GAMES.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} variant="grid" />
          ))}
        </div>
      </motion.section>
    </section>
  );
}


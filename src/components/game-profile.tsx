"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FAVORITE_GAMES, ROTATION_GAMES } from "@/lib/game-data";
import { GameCard } from "./game-card";

const VSCO_GALLERY = ["vsco.png"];

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
        <h2 className="mt-2 text-3xl font-semibold text-white">Oyun vitrinim</h2>
        <p className="mt-2 text-sm text-white/60">Sevdiğim tüm oyunlar</p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: "-100px 0px" }}
        className="mb-12 space-y-4 rounded-3xl border border-white/5 bg-white/5 p-6 shadow-[0_30px_120px_rgba(59,7,100,0.25)] backdrop-blur-2xl"
      >
        <header className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.45em] text-white/50">Rotation</p>
            <h3 className="text-xl font-semibold text-white">Dönüşümlü oyunlar</h3>
            <p className="text-sm text-white/60">Şu anda radarımda olan oyunlar — en fazla 5 oyun.</p>
          </div>
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
        viewport={{ once: true, amount: 0.1, margin: "-100px 0px" }}
        className="mb-12 space-y-4 rounded-3xl border border-white/5 bg-white/5 p-6 shadow-[0_30px_120px_rgba(59,7,100,0.25)] backdrop-blur-2xl"
      >
        <header className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.45em] text-white/50">Spotlight</p>
            <h3 className="text-xl font-semibold text-white">Favori oyunlar</h3>
            <p className="text-sm text-white/60">Profilimde sabitlediğim klasikler.</p>
          </div>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {FAVORITE_GAMES.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} variant="grid" />
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: "-100px 0px" }}
        className="mt-12 grid gap-6 rounded-3xl border border-white/5 bg-white/5 p-6 text-white shadow-[0_30px_120px_rgba(59,7,100,0.25)] backdrop-blur-2xl md:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="space-y-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.5em] text-white/50">VSCO</p>
            <h3 className="mt-2 text-2xl font-semibold">Çizimlerim</h3>
            <p className="text-sm text-white/70">VSCO’dan seçili kareler</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <div className="relative h-72 w-full sm:h-96">
              <Image
                src={`/assets/vsco/${VSCO_GALLERY[0]}`}
                alt="VSCO çizimi"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
                priority
              />
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5/30 p-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.45em] text-white/60">Galeri</p>
            <h4 className="text-xl font-semibold text-white">Tüm çizimlere göz at</h4>
            <p className="text-sm text-white/70">
              VSCO galerimde haftalık çizim güncellemeleri paylaşıyorum. Daha fazla kare için profili aç.
            </p>
          </div>
          <a
            href="https://vsco.co/cizimgalerim/gallery"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/60"
          >
            Tümünü gör
          </a>
        </div>
      </motion.section>
    </section>
  );
}


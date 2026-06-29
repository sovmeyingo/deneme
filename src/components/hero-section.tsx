"use client";

import { motion, type Variants } from "framer-motion";
import type { HeroContent, ProfileContent, SocialCollection } from "@/data/profile";
import { ProfileCard } from "./profile-card";
import { SocialLinks } from "./social-links";
import { VideoBackground } from "./video-background";
import { DiscordPresence } from "./discord-presence";

type HeroSectionProps = {
  hero: HeroContent;
  profile: ProfileContent;
  socials: SocialCollection;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: 0.15,
    },
  },
};

export function HeroSection({ hero, profile, socials }: HeroSectionProps) {
  return (
    <section className="mx-auto w-full max-w-none px-4 pb-20 pt-24 sm:px-8 lg:px-10 xl:px-16 2xl:px-24">
      <div className="relative isolate overflow-hidden rounded-[40px] border border-white/5 bg-black/40 shadow-[0_0_80px_rgba(59,7,100,0.35)]">
        <VideoBackground src="/media/hero-loop.mp4" className="rounded-[40px]" />
        <div className="relative z-10 flex flex-col gap-10 p-6 text-white sm:p-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xs font-semibold uppercase tracking-[0.7em] text-white/60"
          >
            {hero.badge}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="space-y-5 text-balance"
          >
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
              {hero.headline}
            </h1>
            <p className="text-lg text-white/80 md:text-xl">{hero.subline}</p>
            <p className="max-w-2xl text-base text-white/60 md:text-lg">{hero.summary}</p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col gap-6 min-w-0">
              <ProfileCard profile={profile} />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-white/60 tracking-custom">Sistem & Donanım</p>
                <p className="mt-3 text-base leading-relaxed text-white/90">
                  {hero.about}
                </p>
              </motion.div>
            </div>
            <div className="flex flex-col gap-6 min-w-0">
              <SocialLinks links={socials} />
              <DiscordPresence />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="mt-10 flex flex-col items-center gap-2 opacity-50 hover:opacity-90 transition-opacity duration-300">
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-medium tracking-custom">Aşağı Kaydır</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/60" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}


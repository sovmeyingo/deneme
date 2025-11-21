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
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xs font-semibold uppercase tracking-[0.7em] text-white/60"
          >
            {hero.badge}
          </motion.p>

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
            <ProfileCard profile={profile} />
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-white/60">Snapshot</p>
                <p className="mt-3 text-xl text-white/90">
                  Kartvizit deneyimini video, buton ve animasyon destekli tek sayfada topluyorum.
                </p>
              </motion.div>
              <SocialLinks links={socials} />
              <DiscordPresence />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


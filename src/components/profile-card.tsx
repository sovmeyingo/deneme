"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import type { ProfileContent } from "@/data/profile";
import { cn } from "@/lib/utils";

type ProfileCardProps = {
  profile: ProfileContent;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="relative flex flex-col gap-8 overflow-hidden rounded-[28px] border border-white/5 bg-white/5 p-8 backdrop-blur-2xl md:p-10"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[26px] border border-white/10 bg-black/40 px-6 py-8 md:px-8 md:py-10",
        )}
      >
        {profile.banner ? (
          <>
            <Image
              src={profile.banner.src}
              alt={profile.banner.alt}
              fill
              priority={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/55 to-black/80" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/70" />
        )}
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-3xl border border-white/20 bg-black/50 md:h-36 md:w-36">
            <Image
              src={profile.avatar}
              alt={profile.role}
              width={160}
              height={160}
              priority
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
          <div className="space-y-2 text-balance">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-zinc-200">
              {profile.location}
            </p>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">{profile.name}</h1>
            <p className="text-lg text-zinc-200">{profile.role}</p>
            <p className="text-sm font-medium text-emerald-300">{profile.availability}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {profile.highlights.map((highlight) => (
          <div
            key={highlight.label}
            className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-200"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              {highlight.label}
            </p>
            <p className="mt-2 text-base text-zinc-100">{highlight.description}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 rounded-3xl border border-white/10 bg-black/20 p-6 sm:grid-cols-3">
        {profile.stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="text-3xl font-semibold text-white">{stat.value}</p>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {profile.ctas && (
        <div className="flex flex-col gap-3 md:flex-row">
          <a
            href={profile.ctas.primary.href}
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-zinc-200"
          >
            {profile.ctas.primary.label}
          </a>
          <a
            href={profile.ctas.secondary.href}
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/40"
          >
            {profile.ctas.secondary.label}
          </a>
        </div>
      )}
    </motion.section>
  );
}


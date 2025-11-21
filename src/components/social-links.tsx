"use client";

import { motion, type Variants } from "framer-motion";
import {
  type LucideIcon,
  Disc,
  Github,
  Instagram,
  Link2,
  Mail,
  Music4,
  Twitter,
  Youtube,
} from "lucide-react";
import type { SocialCollection, SocialLink } from "@/data/profile";
import { cn } from "@/lib/utils";

const iconMap: Record<SocialLink["platform"], LucideIcon> = {
  github: Github,
  x: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Music4,
  discord: Disc,
  email: Mail,
  link: Link2,
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  },
};

type SocialLinksProps = {
  links: SocialCollection;
};

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-3 md:grid-cols-2"
    >
      {links.map((social) => {
        const Icon = iconMap[social.platform] ?? Link2;
        const borderColor = `${social.accent}66`;
        const backgroundColor = `${social.accent}1f`;
        const glowColor = `${social.accent}44`;
        const iconBackground = `linear-gradient(135deg, ${social.accent}, ${social.accent}cc)`;

        return (
          <motion.a
            variants={itemVariants}
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noreferrer noopener"
            style={{
              borderColor,
              backgroundColor,
              boxShadow: `0 20px 45px ${glowColor}`,
            }}
            className="group flex items-center justify-between rounded-2xl border px-5 py-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/80 hover:bg-white/10"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/80">{social.label}</p>
              <p className="text-lg font-semibold text-white drop-shadow">{social.handle}</p>
            </div>
            <div
              style={{ backgroundImage: iconBackground, boxShadow: `0 15px 30px ${glowColor}` }}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl text-white transition duration-300 group-hover:scale-110",
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
          </motion.a>
        );
      })}
    </motion.div>
  );
}


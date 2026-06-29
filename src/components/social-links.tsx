"use client";

import { motion, type Variants } from "framer-motion";
import {
  Instagram,
  Link2,
  Twitter,
  Youtube,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import type { SocialCollection, SocialLink } from "@/data/profile";
import { cn } from "@/lib/utils";

const iconMap: Record<SocialLink["platform"], React.ComponentType<any> | null> = {
  x: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  steam: null,
  link: Link2,
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
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
      className="grid w-full gap-4 md:grid-cols-2"
    >
      {links.map((social) => {
        const Icon = iconMap[social.platform];
        
        return (
          <motion.a
            variants={itemVariants}
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noreferrer noopener"
            whileHover={{
              y: -4,
              borderColor: social.accent,
              backgroundColor: "rgba(0, 0, 0, 0.55)",
              boxShadow: `0 12px 30px ${social.accent}14`,
            }}
            transition={{ duration: 0.25 }}
            style={{
              borderColor: "rgba(255, 255, 255, 0.06)",
              backgroundColor: "rgba(0, 0, 0, 0.35)",
            }}
            className="group relative flex w-full items-center justify-between rounded-[22px] border px-6 py-4.5 backdrop-blur-md transition-shadow"
          >
            {/* Top-Right Click Indicator */}
            <div className="absolute top-3.5 right-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-40 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight className="h-4 w-4 text-white" />
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold tracking-custom">
                {social.label}
              </p>
              <p className="text-lg font-bold text-white tracking-wide">
                {social.handle}
              </p>
            </div>

            {/* Glowing Icon Wrapper */}
            <div
              className={cn(
                "relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300",
                "group-hover:border-white/20 group-hover:text-white overflow-hidden"
              )}
            >
              {/* Radial Brand Glow Effect */}
              <div 
                style={{ backgroundColor: social.accent }}
                className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-[5px] transition-opacity duration-300 rounded-full"
              />

              {social.platform === "steam" ? (
                <div className="relative h-[18px] w-[18px] select-none pointer-events-none transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/media/steam-logo.png"
                    alt="Steam"
                    fill
                    className="object-contain"
                    sizes="20px"
                  />
                </div>
              ) : (
                Icon && <Icon className="h-4.5 w-4.5 z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
              )}
            </div>
          </motion.a>
        );
      })}
    </motion.div>
  );
}



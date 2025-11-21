"use client";

import type { PerformanceCollection } from "@/data/profile";
import { motion } from "framer-motion";

type PerformanceHighlightsProps = {
  items: PerformanceCollection;
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export function PerformanceHighlights({ items }: PerformanceHighlightsProps) {
  return (
    <section className="mx-auto mt-6 w-full max-w-6xl px-4 pb-24 sm:px-8 lg:px-10">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="grid gap-4 md:grid-cols-2"
      >
        {items.map((item) => (
          <motion.div
            key={item.title}
            variants={card}
            className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 text-white backdrop-blur-2xl"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-white/50">{item.metric}</p>
            <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-base text-white/70">{item.detail}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}


"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/contexts/AudioContext";

export function IntroOverlay() {
  const { isPlaying, fadeIn } = useAudio();
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = sessionStorage.getItem("intro-dismissed");
    if (dismissed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasAccepted(true);
    }
  }, []);

  const handleStart = () => {
    fadeIn();
    setHasAccepted(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("intro-dismissed", "true");
    }
  };

  const shouldShow = !hasAccepted && !isPlaying;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            onClick={handleStart}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="rounded-3xl border border-white/20 px-10 py-5 text-base font-semibold uppercase tracking-[0.5em] text-white transition hover:border-white/60"
          >
            Tıkla
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


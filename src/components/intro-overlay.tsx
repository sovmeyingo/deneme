"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/contexts/AudioContext";
import Image from "next/image";
import { Headphones } from "lucide-react";

export function IntroOverlay() {
  const { fadeIn } = useAudio();
  const [isJoined, setIsJoined] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  const handleEnter = () => {
    setIsJoined(true);
    fadeIn();
    // Allow animation to finish before unmounting
    setTimeout(() => {
      setIsRendered(false);
    }, 1000);
  };

  if (!isRendered) return null;

  return (
    <AnimatePresence>
      {!isJoined && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05, 
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#02010a]"
        >
          {/* Background Ambient Glows */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[40%] -left-[40%] h-[80%] w-[80%] rounded-full bg-fuchsia-600/10 blur-[150px]" />
            <div className="absolute -bottom-[40%] -right-[40%] h-[80%] w-[80%] rounded-full bg-indigo-600/10 blur-[150px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center px-4 text-center"
          >
            {/* Avatar container with pulse effect */}
            <div className="relative mb-6">
              <motion.div 
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 opacity-20 blur-lg"
              />
              <div className="relative h-24 w-24 overflow-hidden rounded-full border border-white/10 ring-4 ring-white/5 ring-offset-4 ring-offset-[#02010a]">
                <Image
                  src="/media/avatar.png"
                  alt="Sovmey Avatar"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <h1 className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-4xl font-extrabold uppercase tracking-[0.4em] text-transparent md:text-5xl">
              Sovmey
            </h1>
            <p className="mt-2 text-xs uppercase tracking-[0.5em] text-zinc-500 tracking-custom">
              Hoş Geldiniz
            </p>

            <motion.button
              onClick={handleEnter}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group mt-12 flex items-center justify-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-fuchsia-500/10"
            >
              <span className="relative z-10">Tıklayıp Girin</span>
            </motion.button>

            <div className="mt-8 flex items-center gap-2 text-xs text-zinc-600">
              <Headphones className="h-4 w-4 animate-pulse text-zinc-500" />
              <span className="tracking-wide">En iyi deneyim için sesleri açın</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Activity } from "@/lib/types";
import { getActivityTypeName, getElapsedTime } from "@/lib/discord-utils";

type ActivityCardProps = {
  activities: Activity[];
};

export function ActivityCard({ activities }: ActivityCardProps) {
  const [elapsed, setElapsed] = useState("0:00");
  const activity = activities[0];

  useEffect(() => {
    if (!activity?.timestamps?.start) return;

    const timer = setInterval(() => {
      setElapsed(getElapsedTime(activity.timestamps!.start!));
    }, 1000);

    return () => clearInterval(timer);
  }, [activity]);

  if (!activity) return null;

  const largeImage = activity.assets?.large_image
    ? activity.assets.large_image.startsWith("mp:")
      ? `https://media.discordapp.net/${activity.assets.large_image.slice(3)}`
      : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/15 to-blue-500/10 p-4 backdrop-blur-md"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-purple-300">
          {getActivityTypeName(activity.type)}
        </span>
      </div>
      <div className="flex gap-4">
        {largeImage && (
          <div className="relative h-16 w-16 overflow-hidden rounded-xl">
            <Image src={largeImage} alt={activity.name} fill className="object-cover" sizes="64px" />
          </div>
        )}
        <div className="flex-1">
          <h4 className="text-base font-semibold text-white">{activity.name}</h4>
          {activity.details && <p className="text-sm text-white/70">{activity.details}</p>}
          {activity.state && <p className="text-xs text-white/50">{activity.state}</p>}
          {activity.timestamps?.start && (
            <p className="mt-2 text-xs text-white/40">{elapsed} geçti</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}


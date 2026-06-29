"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Monitor, Smartphone, Globe, Gamepad2, Sparkles } from "lucide-react";
import { DISCORD_CONFIG } from "@/lib/constants";
import type { LanyardData, LanyardResponse } from "@/lib/types";
import { STATUS_CONFIG, getAvatarUrl } from "@/lib/discord-utils";
import { SpotifyWidget } from "./spotify-widget";
import { ActivityCard } from "./activity-card";

const NITRO_BADGE = {
  1: { label: "Nitro Classic", gradient: "from-pink-500/70 to-purple-500/70" },
  2: { label: "Nitro", gradient: "from-purple-500/70 to-indigo-500/70" },
  3: { label: "Nitro Basic", gradient: "from-fuchsia-500/70 to-cyan-500/70" },
} as const;

export function DiscordPresence() {
  const [presence, setPresence] = useState<LanyardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInitial = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(DISCORD_CONFIG.API_URL, { cache: "no-store" });
      if (!response.ok) throw new Error("API yanıtı başarısız");
      const json = (await response.json()) as LanyardResponse;
      setPresence(json.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Discord verisi alınamadı");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let heartbeat: ReturnType<typeof setInterval>;
    let reconnect: ReturnType<typeof setTimeout>;

    const connect = () => {
      ws = new WebSocket(DISCORD_CONFIG.WS_URL);

      ws.onopen = () => {
        ws?.send(
          JSON.stringify({
            op: 2,
            d: { subscribe_to_id: DISCORD_CONFIG.USER_ID },
          }),
        );
      };

      ws.onmessage = (event) => {
        const payload = JSON.parse(event.data);

        if (payload.op === 1 && payload.d?.heartbeat_interval) {
          clearInterval(heartbeat);
          heartbeat = setInterval(() => {
            if (ws?.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ op: 3 }));
            }
          }, payload.d.heartbeat_interval);
        }

        if (payload.t === "INIT_STATE" || payload.t === "PRESENCE_UPDATE") {
          setPresence(payload.d as LanyardData);
          setIsLoading(false);
          setError(null);
        }
      };

      ws.onerror = () => {
        setError("Discord bağlantısı koptu");
      };

      ws.onclose = () => {
        clearInterval(heartbeat);
        reconnect = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      clearInterval(heartbeat);
      clearTimeout(reconnect);
      ws?.close();
    };
  }, []);

  const statusConfig = presence ? STATUS_CONFIG[presence.discord_status] : null;
  const avatarUrl = presence
    ? getAvatarUrl(presence.discord_user.id, presence.discord_user.avatar, 256)
    : null;

  const activePlatforms = useMemo(
    () => [
      presence?.active_on_discord_desktop && { label: "Masaüstü", icon: Monitor },
      presence?.active_on_discord_mobile && { label: "Mobil", icon: Smartphone },
      presence?.active_on_discord_web && { label: "Web", icon: Globe },
    ].filter(Boolean) as Array<{ label: string; icon: React.ComponentType<any> }>,
    [presence],
  );

  const nitroInfo = presence?.discord_user.premium_type
    ? NITRO_BADGE[presence.discord_user.premium_type as 1 | 2 | 3]
    : undefined;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !presence || !statusConfig || !avatarUrl) {
    return <ErrorState message={error ?? "Veri yüklenemedi"} />;
  }

  const activity = presence.activities.find(
    (act) =>
      act.type !== 4 &&
      act.type !== 2 &&
      act.name &&
      typeof act.type === "number" &&
      act.type >= 0,
  );

  const spotifyActive = Boolean(
    presence.listening_to_spotify && presence.spotify && !activity,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded-3xl border border-white/10 bg-black/30 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl hover:border-white/15 transition-all duration-300"
    >
      <div className="mb-4 flex items-start gap-4">
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative h-16 w-16 overflow-hidden rounded-2xl ring-2 ring-white/10 bg-zinc-900"
          >
            <Image
              src={avatarUrl}
              alt={presence.discord_user.display_name}
              fill
              sizes="80px"
              className="object-cover"
              priority={false}
            />
          </motion.div>
          <span
            className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-4 border-slate-900 ${statusConfig.color} ${
              statusConfig.pulse ? "animate-pulse" : ""
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-bold tracking-custom">Discord</p>
          <h3 className="text-xl font-bold truncate">{presence.discord_user.display_name}</h3>
          <p className="text-xs text-white/40 font-medium tracking-custom">@{presence.discord_user.username}</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-white/60 font-semibold">
            <span className="relative flex h-1.5 w-1.5">
              {statusConfig.pulse && (
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${statusConfig.color} opacity-75`}></span>
              )}
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${statusConfig.color}`}></span>
            </span>
            {statusConfig.label}
          </div>
          {nitroInfo && (
            <div
              className={`mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-gradient-to-r ${nitroInfo.gradient} px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] tracking-custom`}
            >
              <Sparkles className="h-3 w-3" />
              <span>{nitroInfo.label}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        {activePlatforms.length > 0 ? (
          activePlatforms.map((platform) => (
            <PlatformBadge key={platform.label} icon={platform.icon} label={platform.label} />
          ))
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-white/50 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-pulse" />
            <span className="tracking-wide">Çevrimdışı / Pasif</span>
          </span>
        )}
      </div>

      <AnimatePresence>{spotifyActive && presence.spotify && <SpotifyWidget spotify={presence.spotify} />}</AnimatePresence>

      <AnimatePresence>
        {activity && (
          <div className="mt-4">
            <ActivityCard activities={[activity]} />
          </div>
        )}
      </AnimatePresence>

      {!spotifyActive && !activity && (
        <div className="py-4 text-center text-sm text-white/40 font-medium italic">
          Şu anda paylaşılan bir aktivite yok
        </div>
      )}
    </motion.div>
  );
}

function PlatformBadge({ icon: Icon, label }: { icon: React.ComponentType<any>; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
      <Icon className="h-3.5 w-3.5" />
      <span className="tracking-wide">{label}</span>
    </span>
  );
}

function LoadingSkeleton() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-2xl">
      <div className="mb-6 flex items-start gap-4">
        <div className="h-20 w-20 rounded-2xl bg-white/10" />
        <div className="flex-1 space-y-3">
          <div className="h-6 w-40 rounded bg-white/10" />
          <div className="h-4 w-32 rounded bg-white/10" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-7 w-16 rounded bg-white/10" />
        <div className="h-7 w-16 rounded bg-white/10" />
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-center text-sm text-red-300">
      {message}
    </div>
  );
}


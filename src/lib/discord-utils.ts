import { DISCORD_CONFIG } from "./constants";

export function getAvatarUrl(
  userId: string,
  avatarHash: string,
  size: number = 256,
): string {
  return `${DISCORD_CONFIG.AVATAR_BASE}/${userId}/${avatarHash}.png?size=${size}`;
}

export function getElapsedTime(startTimestamp: number): string {
  const elapsed = Date.now() - startTimestamp;
  const hours = Math.floor(elapsed / 3600000);
  const minutes = Math.floor((elapsed % 3600000) / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function getActivityTypeName(type: number): string {
  const types = ["Oynuyor", "Yayında", "Dinliyor", "İzliyor", "Özel", "Yarışıyor"];
  return types[type] || "Bilinmiyor";
}

export const STATUS_CONFIG = {
  online: { color: "bg-emerald-500", label: "Çevrimiçi", pulse: true },
  idle: { color: "bg-yellow-500", label: "Boşta", pulse: false },
  dnd: { color: "bg-red-500", label: "Rahatsız Etmeyin", pulse: false },
  offline: { color: "bg-gray-500", label: "Çevrimdışı", pulse: false },
} as const;


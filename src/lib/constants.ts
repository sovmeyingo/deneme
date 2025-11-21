export const DISCORD_CONFIG = {
  USER_ID: "846641377173569537",
  API_URL: "https://api.lanyard.rest/v1/users/846641377173569537",
  WS_URL: "wss://api.lanyard.rest/socket",
  AVATAR_BASE: "https://cdn.discordapp.com/avatars",
} as const;

export const AUDIO_CONFIG = {
  BACKGROUND_MUSIC: "/audio/background-music.mp3",
  AMBIENT_SOUND: "/audio/ambient-sound.mp3",
  DEFAULT_VOLUME: 0.25,
  FADE_DURATION: 1000,
  STORAGE_KEY: "music-enabled",
  VOLUME_KEY: "audio-volume",
} as const;


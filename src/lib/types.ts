export interface LanyardData {
  kv: Record<string, string>;
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    global_name: string;
    display_name: string;
    collectibles?: {
      nameplate?: {
        label: string;
        palette: "violet" | "pink" | "blue" | string;
      };
    };
  };
  activities: Activity[];
  discord_status: "online" | "idle" | "dnd" | "offline";
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_embedded: boolean;
  listening_to_spotify: boolean;
  spotify: SpotifyData | null;
}

export interface Activity {
  id: string;
  name: string;
  type: 0 | 1 | 2 | 3 | 4 | 5;
  state?: string;
  details?: string;
  application_id?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

export interface SpotifyData {
  track_id: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: {
    start: number;
    end: number;
  };
}

export interface LanyardResponse {
  data: LanyardData;
  success: boolean;
}

export interface AudioContextType {
  isPlaying: boolean;
  volume: number;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  fadeIn: () => void;
  fadeOut: () => void;
}

export type GameCategory = "favorite" | "rotation";

export interface Game {
  id: string;
  title: string;
  subtitle?: string;
  coverImage: string;
  category: GameCategory;
  playTime?: string;
  lastPlayed?: string;
  achievements?: {
    unlocked: number;
    total: number;
  };
  tags?: string[];
}

export interface GameCardProps {
  game: Game;
  index: number;
  variant?: "scroll" | "grid";
  onHover?: (gameId: string) => void;
}

export interface GameSectionProps {
  title: string;
  description?: string;
  games: Game[];
  maxDisplay?: number;
  showAddButton?: boolean;
}


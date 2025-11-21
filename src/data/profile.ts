export type SpotlightStat = {
  label: string;
  value: string;
};

export type Highlight = {
  label: string;
  description: string;
};

export type PerformanceMetric = {
  title: string;
  detail: string;
  metric: string;
};

export type SocialPlatform =
  | "x"
  | "instagram"
  | "youtube"
  | "steam"
  | "link";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  handle: string;
  url: string;
  accent: string;
};

export const profileData = {
  hero: {
    badge: "Oyun oynayan rastgele birisi",
    headline: "Jva",
    subline: "Bir bakıma Jva",
    summary: "Sayfama hoş geldin",
  },
  profile: {
    avatar: "/media/avatar.jpg",
    banner: {
      src: "/media/profile-banner.jpg",
      alt: "Yumuşak gradientli profil banner arka planı",
    },
    name: "Jva",
    role: "Full-stack oyuncu",
    location: "Antartika, Kutuplar",
    availability: "",
    highlights: [
      {
        label: "Son Proje",
        description: "Fortnitede üst üste 5 win",
      },
      {
        label: "Öne Çıkan",
        description: "Last of us'u 6 kere bitirmek",
      },
    ] as Highlight[],
    stats: [
      { label: "Fortnite", value: "89000h" },
      { label: "Oyun oynamak", value: "Günde 10h" },
      { label: "Full-stack Last of Us fanı", value: "%100" },
    ] as SpotlightStat[],
    ctas: {
      primary: {
        label: "Tıkla",
        href: "https://x.com/VioraziStore/status/1978940298156757328/photo/1",
      },
      secondary: {
        label: "Supriz",
        href: "https://x.com/i/status/1980043690375589917",
      },
    },
  },
  performance: [
    {
      title: "Video üstünde 0.9s LCP",
      detail: "Statik export + optimize mp4 preload ile hero 1 saniyenin altında.",
      metric: "0.9s",
    },
    {
      title: "SSR + Edge cache",
      detail: "Next.js app router + incremental static regen ile otomatik cache kontrolü.",
      metric: "Edge",
    },
    {
      title: "Tip güvenli JSON",
      detail: "Tüm içerik TypeScript ile lokal dosyalardan çekilir, dış API yok.",
      metric: "TS",
    },
    {
      title: "Framer Motion girişleri",
      detail: "Hero, kart ve sosyal linkler için GPU hızlandırılmış animasyonlar.",
      metric: "60fps",
    },
  ] as PerformanceMetric[],
  socials: [
    {
      platform: "x",
      label: "X / Twitter",
      handle: "Korkuyorum",
      url: "https://x.com/VioraziStore",
      accent: "#0ea5e9",
    },
    {
      platform: "instagram",
      label: "Instagram",
      handle: "qiironth",
      url: "https://instagram.com/qiironth",
      accent: "#f43f5e",
    },
    {
      platform: "youtube",
      label: "YouTube",
      handle: "@walkoftheearths",
      url: "https://www.youtube.com/@walkoftheearths",
      accent: "#ef4444",
    },
    {
      platform: "steam",
      label: "Steam",
      handle: "Njól",
      url: "https://steamcommunity.com/id/checkits/",
      accent: "#66c0f4",
    },
  ] as SocialLink[],
} as const;

export type ProfileContent = typeof profileData.profile;
export type HeroContent = typeof profileData.hero;
export type SocialCollection = typeof profileData.socials;
export type PerformanceCollection = typeof profileData.performance;


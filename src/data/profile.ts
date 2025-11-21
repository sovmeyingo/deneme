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
  | "github"
  | "x"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "discord"
  | "email"
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
    badge: "Creative Developer & Storyteller",
    headline: "Selim Kaya",
    subline:
      "Kurumsal ürünlerden viral kişisel projelere uzanan deneyimle dijital kimliğini büyütmeyi seviyorum.",
    summary:
      "Kişisel markalar, içerik yaratıcıları ve sanat kolektifleri için yüksek performanslı tek sayfa deneyimleri tasarlarım.",
  },
  profile: {
    avatar: "/media/avatar.jpg",
    banner: {
      src: "/media/profile-banner.jpg",
      alt: "Yumuşak gradientli profil banner arka planı",
    },
    name: "Selim Kaya",
    role: "Full-stack Developer · Creative Technologist",
    location: "İstanbul, Türkiye",
    availability: "Aralık 2025 itibarıyla 2 boşluk",
    highlights: [
      {
        label: "Son Proje",
        description: "guns.lol tabanlı 120K görüntülenme alan micro-site ağı",
      },
      {
        label: "Öne Çıkan",
        description: "Card.co tarzı 8 saniyelik başvuru akışı",
      },
    ] as Highlight[],
    stats: [
      { label: "Tamamlanan site", value: "86" },
      { label: "Ortalama teslim", value: "4 gün" },
      { label: "Retention", value: "%78" },
    ] as SpotlightStat[],
    ctas: {
      primary: {
        label: "Direkt İletişim",
        href: "mailto:hey@selim.studio",
      },
      secondary: {
        label: "Kısa Demo İzle",
        href: "https://cal.com/",
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
      platform: "github",
      label: "GitHub",
      handle: "@selimkaya",
      url: "https://github.com/selimkaya",
      accent: "#a855f7",
    },
    {
      platform: "x",
      label: "X / Twitter",
      handle: "@selim.codes",
      url: "https://x.com/selim",
      accent: "#0ea5e9",
    },
    {
      platform: "instagram",
      label: "Instagram",
      handle: "@selim.visuals",
      url: "https://instagram.com/selim.visuals",
      accent: "#f43f5e",
    },
    {
      platform: "youtube",
      label: "YouTube",
      handle: "selim studio",
      url: "https://youtube.com/@selimstudio",
      accent: "#ef4444",
    },
    {
      platform: "tiktok",
      label: "TikTok",
      handle: "@selimplays",
      url: "https://www.tiktok.com/@selimplays",
      accent: "#14b8a6",
    },
    {
      platform: "discord",
      label: "Discord",
      handle: "club/selimlabs",
      url: "https://discord.gg/selimlabs",
      accent: "#6366f1",
    },
    {
      platform: "email",
      label: "E-posta",
      handle: "hey@selim.studio",
      url: "mailto:hey@selim.studio",
      accent: "#facc15",
    },
  ] as SocialLink[],
} as const;

export type ProfileContent = typeof profileData.profile;
export type HeroContent = typeof profileData.hero;
export type SocialCollection = typeof profileData.socials;
export type PerformanceCollection = typeof profileData.performance;


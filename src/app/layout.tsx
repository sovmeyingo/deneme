import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/contexts/AudioContext";
import { MusicToggle } from "@/components/music-toggle";
import { IntroOverlay } from "@/components/intro-overlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jva.studio"),
  title: "Jva — Kişisel Profil",
  description:
    "Card.co ve guns.lol esintileriyle hazırlanmış, videolu modern kişisel profil kartı.",
  openGraph: {
    title: "Jva — Kişisel Profil",
    description:
      "Videolu hero, Framer Motion animasyonlar ve tip güvenli içerikle tek sayfa profil deneyimi.",
    url: "https://jva.studio",
    type: "website",
    images: [
      {
        url: "/media/avatar.svg",
        width: 1200,
        height: 630,
        alt: "Jva Profil Önizlemesi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@jva",
    title: "Jva — Kişisel Profil",
    description:
      "Video arkaplanı ve performans optimizasyonlarıyla tasarlanmış kişisel link hub.",
    images: ["/media/avatar.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05010a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AudioProvider>
          <IntroOverlay />
          {children}
          <MusicToggle />
        </AudioProvider>
      </body>
    </html>
  );
}

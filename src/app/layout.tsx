import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/contexts/AudioContext";
import { MusicToggle } from "@/components/music-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://selim.studio"),
  title: "Selim Kaya — Kişisel Profil",
  description:
    "Card.co ve guns.lol esintileriyle hazırlanmış, videolu modern kişisel profil kartı.",
  openGraph: {
    title: "Selim Kaya — Kişisel Profil",
    description:
      "Videolu hero, Framer Motion animasyonlar ve tip güvenli içerikle tek sayfa profil deneyimi.",
    url: "https://selim.studio",
    type: "website",
    images: [
      {
        url: "/media/avatar.svg",
        width: 1200,
        height: 630,
        alt: "Selim Kaya Profil Önizlemesi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@selim.codes",
    title: "Selim Kaya — Kişisel Profil",
    description:
      "Video arkaplanı ve performans optimizasyonlarıyla tasarlanmış kişisel link hub.",
    images: ["/media/avatar.svg"],
  },
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
          {children}
          <MusicToggle />
        </AudioProvider>
      </body>
    </html>
  );
}

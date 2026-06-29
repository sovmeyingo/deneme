import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/contexts/AudioContext";
import { MusicToggle } from "@/components/music-toggle";
import { IntroOverlay } from "@/components/intro-overlay";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jva.studio"),
  title: "Sovmey Hakkında",
  description:
    "Card.co ve guns.lol esintileriyle hazırlanmış, videolu modern kişisel profil kartı.",
  openGraph: {
    title: "Sovmey Hakkında",
    description:
      "Videolu hero, Framer Motion animasyonlar ve tip güvenli içerikle tek sayfa profil deneyimi.",
    url: "https://jva.studio",
    type: "website",
    images: [
      {
        url: "/media/avatar.png",
        width: 1200,
        height: 630,
        alt: "Sovmey Profil Önizlemesi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sovmey",
    title: "Sovmey Hakkında",
    description:
      "Video arkaplanı ve performans optimizasyonlarıyla tasarlanmış kişisel link hub.",
    images: ["/media/avatar.png"],
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
      <body className={`${outfit.variable} ${spaceGrotesk.variable} antialiased`}>
        <AudioProvider>
          <IntroOverlay />
          {children}
          <MusicToggle />
        </AudioProvider>
      </body>
    </html>
  );
}


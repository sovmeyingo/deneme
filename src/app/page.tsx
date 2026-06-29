import { HeroSection } from "@/components/hero-section";
import { GameProfile } from "@/components/game-profile";
import { profileData } from "@/data/profile";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden pb-16">
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Subtle grid of dots */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Animated glowing organic blobs */}
        <div className="absolute top-[5%] left-[10%] h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[130px] animate-blob-1" />
        <div className="absolute bottom-[20%] right-[5%] h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[150px] animate-blob-2" />
        <div className="absolute top-[40%] right-[25%] h-[400px] w-[400px] rounded-full bg-sky-500/5 blur-[120px] animate-blob-3" />
      </div>
      <HeroSection
        hero={profileData.hero}
        profile={profileData.profile}
        socials={profileData.socials}
      />
      <GameProfile />
    </main>
  );
}

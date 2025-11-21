import { HeroSection } from "@/components/hero-section";
import { GameProfile } from "@/components/game-profile";
import { profileData } from "@/data/profile";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden pb-16">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-0 opacity-50 blur-3xl">
          <div className="absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-fuchsia-600/40" />
          <div className="absolute bottom-10 right-0 h-64 w-64 translate-x-1/3 rounded-full bg-sky-500/30" />
          <div className="absolute -left-10 top-1/3 h-72 w-72 rounded-full bg-orange-500/20" />
        </div>
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

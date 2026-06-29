import { cn } from "@/lib/utils";

type VideoBackgroundProps = {
  src: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
};

export function VideoBackground({
  src,
  poster,
  className,
  overlayClassName,
}: VideoBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[32px] bg-zinc-900/80",
        className,
      )}
    >
      <video
        className="h-full w-full object-cover opacity-70"
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent",
          overlayClassName,
        )}
      />
    </div>
  );
}


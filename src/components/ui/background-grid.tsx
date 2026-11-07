import { cn } from "@/lib/utils";

interface BackgroundGridProps {
  className?: string;
  dotSize?: number;
}

export function BackgroundGrid({ className }: BackgroundGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden",
        className
      )}
    >
      {/* Light Mode Precision Engineering Grid with Radial Vignette */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70"
      />
      {/* Soft Ambient Radiance in AVANZA Blue */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-gradient-to-b from-blue-100/50 via-sky-50/20 to-transparent blur-3xl pointer-events-none" />
    </div>
  );
}

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
      {/* Ambient Radial Gradient Mask */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      />
    </div>
  );
}

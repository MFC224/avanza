import React from "react";
import { cn } from "@/lib/utils";

interface ShimmerBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function ShimmerBadge({ children, className, ...props }: ShimmerBadgeProps) {
  return (
    <div
      className={cn(
        "group relative inline-flex items-center overflow-hidden rounded-full p-[1px] focus:outline-none",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4f46e5_0%,#06b6d4_50%,#4f46e5_100%)] opacity-80" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-3xl transition-colors hover:text-white">
        {children}
      </span>
    </div>
  );
}

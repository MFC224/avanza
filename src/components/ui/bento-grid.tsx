import React from "react";
import { cn } from "@/lib/utils";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "row-span-1 rounded-2xl group/bento hover:shadow-xl transition duration-300 p-6 bg-white border border-slate-200/90 hover:border-blue-500/40 justify-between flex flex-col space-y-4 overflow-hidden relative shadow-xs",
        className
      )}
    >
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover/bento:bg-blue-500/10 transition-colors" />
      {header}
      <div className="group-hover/bento:translate-x-1 transition duration-300 z-10">
        <div className="mb-3 text-blue-600">{icon}</div>
        <div className="font-bold text-slate-900 text-xl mb-1.5">{title}</div>
        <div className="font-normal text-slate-600 text-sm leading-relaxed">{description}</div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function PublicMainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={cn(
        "flex-1 flex flex-col focus:outline-none",
        !isHome && "pt-16 md:pt-20"
      )}
    >
      {children}
    </main>
  );
}

"use client";

import { docsConfig } from "@/config/siteLayout";
import { cn } from "@/lib/utils";
import { Torus } from "lucide-react";

export function MainNav({ pathname }: { pathname: string }) {
  return (
    <div className="mr-4 hidden md:flex">
      <a href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Torus className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">torus</span>
      </a>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        {docsConfig.mainNav?.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === item.href ? "text-foreground" : "text-foreground/80"
            )}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}

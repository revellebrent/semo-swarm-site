"use client";

import Link from "next/link";

import { Nav } from "@/components/layout/nav";
import { siteConfig } from "@/data/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(8,14,24,0.82)] backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-4 px-5 py-4 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:px-8">
        <Link href="/" className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-400/40 bg-amber-400/10 text-sm font-black tracking-[0.35em] text-amber-300">
              SS
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                {siteConfig.location}
              </p>
              <p className="truncate text-base font-semibold text-white">{siteConfig.shortName}</p>
            </div>
          </div>
        </Link>

        <Nav />

        <Link
          href="/tryouts"
          className="w-fit rounded-full border border-amber-300/40 bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 lg:justify-self-end"
        >
          Join Swarm
        </Link>
      </div>
    </header>
  );
}

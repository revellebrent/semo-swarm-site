import Link from "next/link";

import { Button } from "@/components/ui/button";
import { navigationItems, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.9fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Semo Swarm</p>
          <h2 className="max-w-md text-2xl font-semibold text-white">
            A premium youth club environment with standards players can feel.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Training ambitious players from first touch to final whistle with identity, intensity, and long-term development in mind.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="secondary">
              Contact The Club
            </Button>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Site Map</p>
          <div className="mt-4 grid gap-3">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-400 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Contact</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <p>{siteConfig.location}</p>
            <a href={`mailto:${siteConfig.email}`} className="transition hover:text-white">
              {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`} className="transition hover:text-white">
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs uppercase tracking-[0.2em] text-slate-500 sm:px-6 lg:px-8">
        {siteConfig.shortName} | Southeast Missouri Youth Soccer Club
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { navigationItems } from "@/data/site";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuId = "mobile-primary-nav";

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
        aria-controls={menuId}
      >
        <span className="space-y-1.5">
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </span>
      </button>

      {isOpen ? (
        <div className="absolute inset-x-5 top-[calc(100%+0.75rem)] rounded-[1.75rem] border border-white/10 bg-[rgba(8,14,24,0.98)] p-5 shadow-[0_22px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:inset-x-6">
          <nav id={menuId} className="grid gap-2" aria-label="Mobile navigation">
            {navigationItems.map((item) => {
              const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isActive ? "bg-white text-slate-950" : "bg-white/5 text-slate-200 hover:bg-white/10",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4">
            <Button href="/tryouts" className="w-full" size="lg">
              Start Registration
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

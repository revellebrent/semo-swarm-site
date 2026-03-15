"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/data/site";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:block" aria-label="Primary navigation">
      <div className="flex min-w-max items-center gap-1">
        {navigationItems.map((item) => {
          const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition duration-200",
                isActive ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/8 hover:text-white",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

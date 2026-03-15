"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { RoleKey } from "@/types/models";

type InternalNavItem = {
  href: string;
  label: string;
  description: string;
  allowedRoles: RoleKey[];
};

type InternalNavProps = {
  roleKeys: RoleKey[];
};

const navItems: InternalNavItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    description: "Platform summary and next actions.",
    allowedRoles: ["super_admin", "club_admin", "coach"],
  },
  {
    href: "/coach",
    label: "Coach View",
    description: "Assigned teams and coach workflows.",
    allowedRoles: ["coach"],
  },
  {
    href: "/dashboard#teams",
    label: "Teams",
    description: "Team records and assignments.",
    allowedRoles: ["super_admin", "club_admin", "coach"],
  },
  {
    href: "/dashboard#tryouts",
    label: "Tryouts",
    description: "Evaluation programs and status.",
    allowedRoles: ["super_admin", "club_admin", "coach"],
  },
  {
    href: "/dashboard#announcements",
    label: "Announcements",
    description: "Club-wide and team updates.",
    allowedRoles: ["super_admin", "club_admin", "coach"],
  },
  {
    href: "/dashboard#registrations",
    label: "Registrations",
    description: "Player interest and review queue.",
    allowedRoles: ["super_admin", "club_admin", "coach"],
  },
  {
    href: "/dashboard#sponsors",
    label: "Sponsors",
    description: "Partnership records and inquiries.",
    allowedRoles: ["super_admin", "club_admin"],
  },
];

function canAccessNavItem(item: InternalNavItem, roleKeys: RoleKey[]) {
  return roleKeys.some((roleKey) => item.allowedRoles.includes(roleKey));
}

export function InternalNav({ roleKeys }: InternalNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Internal dashboard navigation">
      <div className="grid gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const hasAccess = canAccessNavItem(item, roleKeys);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "rounded-[1.45rem] border px-4 py-4 transition",
                hasAccess
                  ? isActive
                    ? "border-amber-300/30 bg-amber-300/12"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                  : "border-white/8 bg-slate-950/55 opacity-65",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="mt-1 text-xs leading-6 text-slate-400">{item.description}</p>
                </div>
                <span
                  className={[
                    "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
                    hasAccess
                      ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                      : "border border-white/10 bg-white/5 text-slate-400",
                  ].join(" ")}
                >
                  {hasAccess ? "Open" : "Limited"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

import Link from "next/link";

import { homeQuickLinks } from "@/data/site";

export function QuickLinksGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {homeQuickLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-amber-300/30 hover:bg-white/8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">{item.accent}</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">{item.label}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
          <p className="mt-6 text-sm font-semibold text-white transition group-hover:text-amber-200">Open page</p>
        </Link>
      ))}
    </div>
  );
}

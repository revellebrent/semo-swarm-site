import Link from "next/link";

import { homeAnnouncements } from "@/data/site";

export function AnnouncementList() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {homeAnnouncements.map((announcement) => (
        <article
          key={announcement.title}
          className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/7"
        >
          <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.22em]">
            <span className="text-amber-300">{announcement.category}</span>
            <span className="text-slate-500">{announcement.date}</span>
          </div>
          <h3 className="mt-5 text-2xl font-semibold text-white">{announcement.title}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">{announcement.summary}</p>
          <Link href={announcement.href} className="mt-6 inline-flex text-sm font-semibold text-white hover:text-amber-200">
            Read more
          </Link>
        </article>
      ))}
    </div>
  );
}

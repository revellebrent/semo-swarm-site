import Link from "next/link";

import { Card, CardTitle } from "@/components/ui/card";

type AnnouncementCardProps = {
  category: string;
  date: string;
  title: string;
  summary: string;
  href?: string;
};

export function AnnouncementCard({
  category,
  date,
  title,
  summary,
  href,
}: AnnouncementCardProps) {
  return (
    <Card className="transition hover:border-white/20 hover:bg-white/7" tone="default">
      <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.22em]">
        <span className="text-amber-300">{category}</span>
        <span className="text-slate-500">{date}</span>
      </div>
      <CardTitle className="mt-5 text-xl">{title}</CardTitle>
      <p className="mt-4 text-sm leading-7 text-slate-300">{summary}</p>
      {href ? (
        <Link href={href} className="mt-6 inline-flex text-sm font-semibold text-white hover:text-amber-200">
          Read more
        </Link>
      ) : null}
    </Card>
  );
}

import type { TeamAnnouncement } from "@/types/site";

type TeamAnnouncementCardProps = {
  announcement: TeamAnnouncement;
};

export function TeamAnnouncementCard({ announcement }: TeamAnnouncementCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.22em]">
        <span className="text-amber-300">{announcement.category}</span>
        <span className="text-slate-500">{announcement.date}</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{announcement.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{announcement.summary}</p>
    </article>
  );
}

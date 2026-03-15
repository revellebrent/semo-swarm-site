import { AnnouncementCard } from "@/components/ui/announcement-card";
import type { Announcement } from "@/types/site";

type AnnouncementListProps = {
  announcements: Announcement[];
};

export function AnnouncementList({ announcements }: AnnouncementListProps) {
  if (announcements.length === 0) {
    return (
      <div className="rounded-[1.8rem] border border-dashed border-white/15 bg-white/5 p-8 text-sm leading-7 text-slate-400">
        No announcements are published yet. Club updates will appear here once they are available in Supabase.
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          category={announcement.category}
          date={announcement.date}
          title={announcement.title}
          summary={announcement.summary}
          href={announcement.href}
        />
      ))}
    </div>
  );
}

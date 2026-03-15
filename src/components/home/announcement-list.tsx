import { AnnouncementCard } from "@/components/ui/announcement-card";
import { homeAnnouncements } from "@/data/site";

export function AnnouncementList() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {homeAnnouncements.map((announcement) => (
        <AnnouncementCard
          key={announcement.title}
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

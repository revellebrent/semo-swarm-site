import { AnnouncementCard } from "@/components/ui/announcement-card";
import type { TeamAnnouncement } from "@/types/site";

type TeamAnnouncementCardProps = {
  announcement: TeamAnnouncement;
};

export function TeamAnnouncementCard({ announcement }: TeamAnnouncementCardProps) {
  return (
    <AnnouncementCard
      category={announcement.category}
      date={announcement.date}
      title={announcement.title}
      summary={announcement.summary}
    />
  );
}

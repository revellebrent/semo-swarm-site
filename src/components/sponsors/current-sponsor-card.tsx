import { SponsorCard } from "@/components/ui/sponsor-card";
import type { Sponsor } from "@/types/site";

type CurrentSponsorCardProps = {
  sponsor: Sponsor;
};

export function CurrentSponsorCard({ sponsor }: CurrentSponsorCardProps) {
  return <SponsorCard sponsor={sponsor} />;
}

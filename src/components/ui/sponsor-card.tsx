import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import type { Sponsor } from "@/types/site";

type SponsorCardProps = {
  sponsor: Sponsor;
  compact?: boolean;
};

export function SponsorCard({ sponsor, compact = false }: SponsorCardProps) {
  if (compact) {
    return (
      <div className="flex min-h-20 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-5 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">{sponsor.name}</p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">{sponsor.category}</p>
        </div>
      </div>
    );
  }

  return (
    <Card tone="elevated">
      <CardEyebrow className="text-sm tracking-[0.2em]">{sponsor.category}</CardEyebrow>
      <CardTitle className="mt-3">{sponsor.name}</CardTitle>
      <p className="mt-4 text-sm leading-7 text-slate-300">{sponsor.description}</p>
    </Card>
  );
}

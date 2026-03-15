import { Card, CardTitle } from "@/components/ui/card";
import type { SponsorTier } from "@/types/site";

type SponsorTierCardProps = {
  tier: SponsorTier;
};

export function SponsorTierCard({ tier }: SponsorTierCardProps) {
  return (
    <Card className="h-full">
      <div className="flex items-center justify-between gap-4">
        <CardTitle className="text-xl">{tier.name}</CardTitle>
        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
          {tier.investment}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">{tier.description}</p>
      <ul className="mt-6 grid gap-3 text-sm leading-7 text-slate-300">
        {tier.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </Card>
  );
}

import { SponsorCard } from "@/components/ui/sponsor-card";
import type { Sponsor } from "@/types/site";

type SponsorStripProps = {
  sponsors: Sponsor[];
};

export function SponsorStrip({ sponsors }: SponsorStripProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.02))] p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">Trusted Partners</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Community organizations helping strengthen the Swarm experience.
          </p>
        </div>

        {sponsors.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[38rem]">
            {sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} compact />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950/55 px-5 py-6 text-sm text-slate-400 lg:min-w-[24rem]">
            Sponsor logos will appear here once active public sponsors are added.
          </div>
        )}
      </div>
    </div>
  );
}

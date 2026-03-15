import type { Sponsor } from "@/types/site";

type CurrentSponsorCardProps = {
  sponsor: Sponsor;
};

export function CurrentSponsorCard({ sponsor }: CurrentSponsorCardProps) {
  return (
    <article className="rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.03))] p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-amber-300">{sponsor.category}</p>
      <h3 className="mt-3 text-2xl font-semibold text-white">{sponsor.name}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{sponsor.description}</p>
    </article>
  );
}

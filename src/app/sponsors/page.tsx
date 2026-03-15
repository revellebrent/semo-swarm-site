import type { Metadata } from "next";

import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { sponsors } from "@/data/site";

export const metadata: Metadata = {
  title: "Sponsors",
};

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        content={{
          eyebrow: "Sponsors",
          title: "Community partners who help elevate the player experience.",
          description:
            "Semo Swarm is built with local support. Sponsor visibility can grow later into logo grids, partner tiers, and activation pages without changing the overall structure.",
        }}
      />

      <SectionWrapper>
        <SectionHeading
          eyebrow="Partners"
          title="Organizations that believe in local player development."
          description="These placeholder profiles show how sponsor content can be presented with a premium, editorial feel instead of a generic badge wall."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {sponsors.map((sponsor) => (
            <article key={sponsor.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300">{sponsor.category}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{sponsor.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{sponsor.description}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

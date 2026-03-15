import type { Metadata } from "next";

import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "Learn about Semo Swarm, a premium youth soccer club in Southeast Missouri focused on player development, coaching quality, and a strong club identity.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        content={{
          eyebrow: "About The Club",
          title: "A clear identity for families who want more than a rec team experience.",
          description:
            "Semo Swarm exists to create a premium youth soccer environment in Southeast Missouri where coaching quality, player standards, and club culture all feel intentional.",
        }}
      />

      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeading
            eyebrow="Mission"
            title="Develop complete players and confident competitors."
            description="Our training model blends technical repetition, tactical understanding, and a demanding team culture so athletes can grow on the ball, off the ball, and under pressure."
          />
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <h2 className="text-sm uppercase tracking-[0.2em] text-slate-400">What families can expect</h2>
            <ul className="mt-5 grid gap-4 text-sm leading-7 text-slate-300">
              <li>Year-round communication with a professional, organized club touchpoint.</li>
              <li>Coaches who teach with consistency across every age group.</li>
              <li>A player-first environment that balances ambition with support.</li>
              <li>Competition schedules that challenge development without losing sight of long-term growth.</li>
            </ul>
          </aside>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white/[0.03]">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Club Standard",
              text: "Players learn how we train, how we compete, and how we represent the crest every week.",
            },
            {
              title: "Player Pathway",
              text: "Each age group has a progression model so the jump to the next team feels earned and supported.",
            },
            {
              title: "Family Experience",
              text: "We aim for a polished, dependable experience from registration and scheduling to matchday communication.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

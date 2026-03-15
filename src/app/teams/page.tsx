import type { Metadata } from "next";

import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { teams } from "@/data/site";

export const metadata: Metadata = {
  title: "Teams",
};

export default function TeamsPage() {
  return (
    <>
      <PageHero
        content={{
          eyebrow: "Teams",
          title: "Competitive rosters connected by one club identity.",
          description:
            "Semo Swarm teams train with shared principles while tailoring each environment to the needs of its age group and stage of development.",
        }}
      />

      <SectionWrapper>
        <SectionHeading
          eyebrow="Current Groups"
          title="Squads designed to challenge players the right way."
          description="These sample rosters show how the club can present team-level details today while staying ready for future CMS, roster management, and database-backed content."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {teams.map((team) => (
            <article key={team.slug} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{team.ageGroup}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{team.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{team.summary}</p>
              <dl className="mt-6 grid gap-3 text-sm text-slate-400">
                <div>
                  <dt className="font-semibold text-white">Training Days</dt>
                  <dd>{team.trainingDays}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">Home Base</dt>
                  <dd>{team.homeBase}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <Button href={`/teams/${team.slug}`} variant="secondary">
                  Open Team Page
                </Button>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

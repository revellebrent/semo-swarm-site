import type { Metadata } from "next";

import { TeamCard } from "@/components/teams/team-card";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { getTeamsGroupedByAgeGroup } from "@/data/teams";

export const metadata: Metadata = {
  title: "Teams",
};

export default function TeamsPage() {
  const teamsByAgeGroup = getTeamsGroupedByAgeGroup();
  const ageGroups = Object.keys(teamsByAgeGroup);

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
          title="Team cards organized by age group and ready for future live data."
          description="The page is intentionally structured around reusable data and UI so mock content can later be replaced with database-driven roster, coach, and schedule records."
        />

        <div className="mt-10 space-y-10">
          {ageGroups.map((ageGroup) => (
            <section key={ageGroup} className="space-y-5">
              <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Age Group</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{ageGroup}</h2>
                </div>
                <p className="text-sm text-slate-400">{teamsByAgeGroup[ageGroup].length} active team listing</p>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {teamsByAgeGroup[ageGroup].map((team) => (
                  <TeamCard key={team.slug} team={team} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

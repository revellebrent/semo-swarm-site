import type { Metadata } from "next";

import { AnnouncementList } from "@/components/home/announcement-list";
import { FamilyValuesGrid } from "@/components/home/family-values-grid";
import { HomeHero } from "@/components/home/home-hero";
import { QuickLinksGrid } from "@/components/home/quick-links-grid";
import { SponsorStrip } from "@/components/home/sponsor-strip";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { TeamCard } from "@/components/teams/team-card";
import { Button } from "@/components/ui/button";
import { CtaPanel } from "@/components/ui/cta-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllTeams } from "@/data/teams";
import { clubPillars } from "@/data/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  description:
    "Semo Swarm is a premium youth soccer club in Southeast Missouri offering elite training, competitive teams, tryouts, and a modern family experience.",
  path: "/",
});

export default function HomePage() {
  const featuredTeams = getAllTeams();

  return (
    <>
      <HomeHero />

      <SectionWrapper className="pt-8 sm:pt-10">
        <QuickLinksGrid />
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Club Intro"
            title="A modern soccer club built with the standards of a bigger brand and the attention of a local community."
            description="Semo Swarm is shaping a premium soccer experience in Southeast Missouri with intentional training, a recognizable playing identity, and a club presentation families can trust."
          />
          <div className="grid gap-4">
            {clubPillars.map((pillar) => (
              <article key={pillar.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <SponsorStrip />
      </SectionWrapper>

      <SectionWrapper className="bg-white/[0.03]">
        <SectionHeading
          eyebrow="Latest Announcements"
          title="Fresh club updates families can scan quickly."
          description="The homepage is set up for easy content edits now, and it can later connect to a CMS, database, or admin workflow without redesigning the section."
        />
        <div className="mt-10">
          <AnnouncementList />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured Teams"
            title="Development environments for every stage of the player pathway."
            description="Each roster follows the same club principles while meeting players where they are in their technical, tactical, and competitive journey."
          />
          <Button href="/teams" variant="secondary">
            See All Teams
          </Button>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {featuredTeams.map((team) => (
            <TeamCard key={team.slug} team={team} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white/[0.03]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Why Families Choose Swarm"
            title="The difference is in the details, consistency, and club feel."
            description="Families want more than a jersey and a schedule. They want a development environment that feels organized, ambitious, and worth committing to over time."
          />
          <FamilyValuesGrid />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <CtaPanel
          eyebrow="Next Step"
          title="Ready to find the right team, tryout, or next conversation?"
          description="Start with the path that fits best today, and the site structure is ready to grow with future registrations, announcements, and club operations."
          actions={[
            { href: "/tryouts", label: "Start Registration" },
            { href: "/contact", label: "Contact The Club", variant: "secondary" },
          ]}
        />
      </SectionWrapper>
    </>
  );
}

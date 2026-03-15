import { AnnouncementList } from "@/components/home/announcement-list";
import { FamilyValuesGrid } from "@/components/home/family-values-grid";
import { HomeHero } from "@/components/home/home-hero";
import { QuickLinksGrid } from "@/components/home/quick-links-grid";
import { SponsorStrip } from "@/components/home/sponsor-strip";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { TeamCard } from "@/components/teams/team-card";
import { getAllTeams } from "@/data/teams";
import { clubPillars } from "@/data/site";

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
        <div className="rounded-[2rem] border border-amber-300/20 bg-[linear-gradient(135deg,_rgba(245,158,11,0.18),_rgba(255,255,255,0.03))] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">Final CTA</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Ready to find the right team, tryout, or next conversation?
            </h2>
            <p className="text-base leading-8 text-slate-200">
              Start with the path that fits best today, and the site structure is ready to grow with future registrations, announcements, and club operations.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
            <Button href="/tryouts">Reserve a Tryout Spot</Button>
            <Button href="/contact" variant="secondary">
              Contact The Club
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

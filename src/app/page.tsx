import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { clubPillars, homeHero, teams } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <PageHero content={homeHero} />

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Club Identity"
            title="A modern soccer club built around detail, discipline, and development."
            description="Swarm is designed to feel different from the first session onward: purposeful training plans, premium communication, and a standard of play that pushes athletes to grow."
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

      <SectionWrapper className="bg-white/[0.03]">
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
          {teams.map((team) => (
            <article key={team.slug} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{team.ageGroup}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{team.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{team.summary}</p>
              <p className="mt-5 text-sm text-slate-400">Focus: {team.focus}</p>
              <div className="mt-6">
                <Button href={`/teams/${team.slug}`} variant="ghost">
                  View Team Details
                </Button>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="rounded-[2rem] border border-amber-300/20 bg-[linear-gradient(135deg,_rgba(245,158,11,0.18),_rgba(255,255,255,0.03))] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">Next Opportunity</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Tryouts open this spring for players ready to raise their standard.
            </h2>
            <p className="text-base leading-8 text-slate-200">
              Families can expect a professional, welcoming process with age-group evaluations, transparent communication, and clear next steps.
            </p>
          </div>
          <div className="mt-6 lg:mt-0">
            <Button href="/tryouts">Reserve a Tryout Spot</Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

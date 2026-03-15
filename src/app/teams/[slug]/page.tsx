import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { teams } from "@/data/site";

type TeamDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: TeamDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = teams.find((entry) => entry.slug === slug);

  return {
    title: team ? team.name : "Team Not Found",
  };
}

export async function generateStaticParams() {
  return teams.map((team) => ({
    slug: team.slug,
  }));
}

export default async function TeamDetailsPage({ params }: TeamDetailsPageProps) {
  const { slug } = await params;
  const team = teams.find((entry) => entry.slug === slug);

  if (!team) {
    notFound();
  }

  return (
    <>
      <PageHero
        content={{
          eyebrow: team.ageGroup,
          title: team.name,
          description: team.summary,
          actions: [
            { href: "/tryouts", label: "Register Interest", variant: "primary" },
            { href: "/teams", label: "Back to Teams", variant: "secondary" },
          ],
        }}
      />

      <SectionWrapper>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Team Snapshot</p>
            <dl className="mt-5 grid gap-5">
              <div>
                <dt className="text-sm font-semibold text-white">Primary Focus</dt>
                <dd className="mt-1 text-sm leading-7 text-slate-300">{team.focus}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-white">Training Schedule</dt>
                <dd className="mt-1 text-sm leading-7 text-slate-300">{team.trainingDays}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-white">Home Facility</dt>
                <dd className="mt-1 text-sm leading-7 text-slate-300">{team.homeBase}</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-3xl border border-amber-300/20 bg-[linear-gradient(180deg,_rgba(245,158,11,0.12),_rgba(255,255,255,0.03))] p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-200">Season Development Goals</p>
            <ul className="mt-5 grid gap-4 text-sm leading-7 text-slate-200">
              {team.seasonGoals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-950/70 p-7">
          <h2 className="text-2xl font-semibold text-white">Interested in this group?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            Team detail pages are set up to scale into future roster, staff, schedule, and results modules. For now, they provide a polished public-facing destination for families exploring the club.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact">Contact The Club</Button>
            <Link href="/teams" className="inline-flex items-center text-sm font-semibold text-slate-300 hover:text-white">
              Browse all teams
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

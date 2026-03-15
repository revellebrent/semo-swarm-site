import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionWrapper } from "@/components/layout/section-wrapper";
import { TeamAnnouncementCard } from "@/components/teams/team-announcement-card";
import { TeamCoachCard } from "@/components/teams/team-coach-card";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { getAllTeams, getTeamBySlug } from "@/data/teams";

type TeamDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: TeamDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = getTeamBySlug(slug);

  return {
    title: team ? team.name : "Team Not Found",
  };
}

export async function generateStaticParams() {
  return getAllTeams().map((team) => ({
    slug: team.slug,
  }));
}

export default async function TeamDetailsPage({ params }: TeamDetailsPageProps) {
  const { slug } = await params;
  const team = getTeamBySlug(slug);

  if (!team) {
    notFound();
  }

  return (
    <>
      <PageHero
        content={{
          eyebrow: `${team.ageGroup} • ${team.level}`,
          title: team.name,
          description: team.overview,
          actions: [
            team.tryoutCallout
              ? { href: team.tryoutCallout.href, label: team.tryoutCallout.ctaLabel, variant: "primary" }
              : { href: "/contact", label: "Contact The Club", variant: "primary" },
            { href: "/teams", label: "Back to Teams", variant: "secondary" },
          ],
        }}
      />

      <SectionWrapper>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Team Overview</p>
            <dl className="mt-5 grid gap-5">
              <div>
                <dt className="text-sm font-semibold text-white">Primary Focus</dt>
                <dd className="mt-1 text-sm leading-7 text-slate-300">{team.focus}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-white">Player Profile</dt>
                <dd className="mt-1 text-sm leading-7 text-slate-300">{team.playerProfile}</dd>
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

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-10">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold text-white">Coach Info</h2>
                <p className="text-sm text-slate-400">{team.coaches.length} staff members</p>
              </div>
              <div className="mt-6 grid gap-5">
                {team.coaches.map((coach) => (
                  <TeamCoachCard key={coach.id} coach={coach} />
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h2 className="text-2xl font-semibold text-white">Announcements</h2>
              <div className="mt-6 grid gap-5">
                {team.announcements.map((announcement) => (
                  <TeamAnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-7">
              <h2 className="text-2xl font-semibold text-white">Practice Details</h2>
              <dl className="mt-6 grid gap-5 text-sm">
                <div>
                  <dt className="font-semibold text-white">Practice Days</dt>
                  <dd className="mt-1 leading-7 text-slate-300">{team.practice.days.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">Time</dt>
                  <dd className="mt-1 leading-7 text-slate-300">{team.practice.time}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">Location</dt>
                  <dd className="mt-1 leading-7 text-slate-300">{team.practice.location}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">Season Window</dt>
                  <dd className="mt-1 leading-7 text-slate-300">{team.practice.season}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">Notes</dt>
                  <dd className="mt-1 leading-7 text-slate-300">{team.practice.notes}</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-7">
              <h2 className="text-2xl font-semibold text-white">Schedule Placeholder</h2>
              <div className="mt-6 grid gap-4">
                {team.schedule.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base font-semibold text-white">vs {item.opponent}</h3>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.type}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-300">{item.date}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.location}</p>
                  </article>
                ))}
              </div>
            </section>

            {team.tryoutCallout ? (
              <section className="rounded-3xl border border-amber-300/20 bg-[linear-gradient(135deg,_rgba(245,158,11,0.18),_rgba(255,255,255,0.03))] p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">Team Tryout Callout</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">{team.tryoutCallout.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-200">{team.tryoutCallout.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={team.tryoutCallout.href}>{team.tryoutCallout.ctaLabel}</Button>
                  <Link href="/teams" className="inline-flex items-center text-sm font-semibold text-slate-200 hover:text-white">
                    Browse all teams
                  </Link>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

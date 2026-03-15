import type { Metadata } from "next";

import { CoachTeamCard } from "@/components/dashboard/coach-team-card";
import { DashboardSectionCard } from "@/components/dashboard/dashboard-section-card";
import { requireCoachUser } from "@/lib/auth/server";
import { getCoachDashboardData } from "@/lib/dashboard/coach";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Coach Dashboard",
  description: "Protected coach dashboard for assigned Semo Swarm teams and team-related workflows.",
  path: "/coach",
});

export default async function CoachDashboardPage() {
  const authContext = await requireCoachUser("/coach");
  const coachData = await getCoachDashboardData(authContext.user.id);

  return (
    <div className="space-y-8">
      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[1.9rem] border border-amber-300/20 bg-[linear-gradient(180deg,_rgba(245,158,11,0.12),_rgba(255,255,255,0.04))] p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Coach Workspace</p>
          <h1 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Your teams, your workflow, one clean view.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">
            This shell is scoped to the teams currently assigned to your coach account, so future announcement, tryout, registration, and media tools can stay focused on the groups you actually manage.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Assigned Teams</p>
              <p className="mt-2 text-3xl font-semibold text-white">{coachData.totals.teams}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Team Tryouts</p>
              <p className="mt-2 text-3xl font-semibold text-white">{coachData.totals.tryouts}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Registrations</p>
              <p className="mt-2 text-3xl font-semibold text-white">{coachData.totals.registrations}</p>
            </div>
          </div>
        </article>

        <article className="rounded-[1.9rem] border border-white/10 bg-white/5 p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Access Scope</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Coach-specific permissions</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            This route is reserved for users with the <code className="rounded bg-white/5 px-2 py-1 text-slate-200">coach</code> role and is intentionally shaped around assigned team management rather than club-wide admin controls.
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "Team announcements tied to your assignments",
              "Coach-owned or team-specific tryouts",
              "Registration review for your teams",
              "Team media space reserved for a later phase",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                <p className="text-sm leading-7 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section id="coach-teams" className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Assigned Teams</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Teams currently in your lane.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            These cards are pulled from your coach assignments so future tools can remain tightly scoped.
          </p>
        </div>

        {coachData.teams.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {coachData.teams.map((team) => (
              <CoachTeamCard key={team.id} team={team} />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.8rem] border border-dashed border-white/15 bg-white/5 p-8 text-sm leading-7 text-slate-400">
            No teams are currently assigned to this coach account. Once assignments are added in Supabase, this dashboard will scope itself automatically.
          </div>
        )}
      </section>

      <div className="grid gap-6">
        <DashboardSectionCard
          id="team-announcements"
          eyebrow="Team Announcements"
          title="Announcement workspace for your teams"
          description="This section will hold team-level updates, publish states, and future editing tools connected only to the squads you coach."
          plannedActions={[
            "Draft and publish team-specific announcements",
            "Review recent updates across assigned teams",
            "Expand later into richer editorial tools",
          ]}
          allowedRoles={["coach"]}
          roleKeys={authContext.roleKeys}
          accent="highlight"
        />

        <DashboardSectionCard
          id="team-tryouts"
          eyebrow="Team Tryouts"
          title="Coach-managed tryout area"
          description="Reserved for coach-owned tryouts and team-related evaluation workflows without exposing club-wide admin controls."
          plannedActions={[
            "Review assigned or owned tryout listings",
            "Track team-specific evaluation needs",
            "Prepare for later tryout editing and status changes",
          ]}
          allowedRoles={["coach"]}
          roleKeys={authContext.roleKeys}
        />

        <DashboardSectionCard
          id="registrations"
          eyebrow="Registrations"
          title="Player interest review queue"
          description="Future registration tools can stay focused on players tied to your teams or evaluation responsibilities."
          plannedActions={[
            "View registration flow by assigned team",
            "Track new, reviewing, accepted, and waitlisted players",
            "Support future assignment and note-taking workflows",
          ]}
          allowedRoles={["coach"]}
          roleKeys={authContext.roleKeys}
        />

        <DashboardSectionCard
          id="team-media"
          eyebrow="Team Media"
          title="Media placeholder for a later phase"
          description="This reserved section will support team photos, highlight reels, and other coach-managed media once the content workflow is ready."
          plannedActions={[
            "Store team-level media references later",
            "Support public site tie-ins when appropriate",
            "Keep media ownership scoped by assigned team",
          ]}
          allowedRoles={["coach"]}
          roleKeys={authContext.roleKeys}
        />
      </div>
    </div>
  );
}

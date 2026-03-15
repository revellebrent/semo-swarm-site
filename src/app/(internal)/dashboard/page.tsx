import type { Metadata } from "next";

import { DashboardSectionCard } from "@/components/dashboard/dashboard-section-card";
import { buildPageMetadata } from "@/lib/metadata";
import { requireInternalUser } from "@/lib/auth/server";
import type { RoleKey } from "@/types/models";

export const metadata: Metadata = buildPageMetadata({
  title: "Dashboard",
  description: "Protected internal dashboard foundation for Semo Swarm admins and coaches.",
  path: "/dashboard",
});

type DashboardSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  plannedActions: string[];
  allowedRoles: RoleKey[];
  accent?: "default" | "highlight";
};

const dashboardSections: DashboardSection[] = [
  {
    id: "teams",
    eyebrow: "Teams",
    title: "Team management space",
    description:
      "This section will hold team records, coach assignments, season notes, and any future roster or schedule management tools.",
    plannedActions: [
      "Browse and edit active team profiles",
      "Review coach-to-team assignments",
      "Add future tools for schedules and season planning",
    ],
    allowedRoles: ["super_admin", "club_admin", "coach"],
    accent: "highlight",
  },
  {
    id: "tryouts",
    eyebrow: "Tryouts",
    title: "Tryout and evaluation workspace",
    description:
      "Built for club-wide and coach-managed tryouts, with room for publishing status, owner assignment, and future evaluation workflows.",
    plannedActions: [
      "Manage open, draft, and closed tryouts",
      "Assign ownership to coaches where appropriate",
      "Prepare a clean handoff into registration review tools",
    ],
    allowedRoles: ["super_admin", "club_admin", "coach"],
  },
  {
    id: "announcements",
    eyebrow: "Announcements",
    title: "Club and team communication hub",
    description:
      "This area will support club-wide updates for admins and team-specific posts for coaches working within their assigned groups.",
    plannedActions: [
      "Publish and unpublish announcements",
      "Separate club-wide and team-specific content",
      "Expand later into editorial workflows and archives",
    ],
    allowedRoles: ["super_admin", "club_admin", "coach"],
  },
  {
    id: "registrations",
    eyebrow: "Registrations",
    title: "Tryout registration review queue",
    description:
      "Future registration tools can live here for screening incoming interest, assigning coaches, and moving players through a review pipeline.",
    plannedActions: [
      "Review new registration submissions",
      "Assign follow-up ownership to staff",
      "Track status from new through accepted or declined",
    ],
    allowedRoles: ["super_admin", "club_admin", "coach"],
  },
  {
    id: "sponsors",
    eyebrow: "Sponsors",
    title: "Sponsorship management area",
    description:
      "Reserved for admin-level partnership workflows, including sponsor listings, inquiry intake, and future outreach or fulfillment steps.",
    plannedActions: [
      "Manage public sponsor listings",
      "Review inbound sponsor inquiries",
      "Prepare for future partner status and notes",
    ],
    allowedRoles: ["super_admin", "club_admin"],
  },
];

export default async function DashboardPage() {
  const authContext = await requireInternalUser();

  return (
    <div className="space-y-8">
      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[1.9rem] border border-amber-300/20 bg-[linear-gradient(180deg,_rgba(245,158,11,0.12),_rgba(255,255,255,0.04))] p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Phase 2</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Dashboard shell is live.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">
            The protected route, internal navigation, and role-aware content structure are in place so the club can grow into a proper operational dashboard without rebuilding the foundation.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Protected App Router layout already active",
              "Sections mapped to the club platform schema",
              "Ready for future CRUD screens and permission checks",
              "Styled to match the public site without feeling disconnected",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                <p className="text-sm leading-7 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[1.9rem] border border-white/10 bg-white/5 p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Role Snapshot</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Current internal access</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            These role badges are already available to future permission checks and navigation branching throughout the dashboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {authContext.roleKeys.map((roleKey) => (
              <span
                key={roleKey}
                className="rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200"
              >
                {roleKey.replace("_", " ")}
              </span>
            ))}
          </div>
        </article>
      </section>

      <div className="grid gap-6">
        {dashboardSections.map((section) => (
          <DashboardSectionCard
            key={section.id}
            id={section.id}
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            plannedActions={section.plannedActions}
            allowedRoles={section.allowedRoles}
            roleKeys={authContext.roleKeys}
            accent={section.accent}
          />
        ))}
      </div>
    </div>
  );
}

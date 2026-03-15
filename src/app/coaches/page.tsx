import type { Metadata } from "next";

import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { coaches } from "@/data/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Coaches",
  description:
    "Meet the Semo Swarm coaching staff and learn how the club develops players through technical detail, tactical clarity, and strong team culture.",
  path: "/coaches",
});

export default function CoachesPage() {
  return (
    <>
      <PageHero
        content={{
          eyebrow: "Coaching Staff",
          title: "Experienced leaders who coach with clarity and standards.",
          description:
            "Swarm coaches are selected for their ability to teach, connect, and build environments where players improve with purpose.",
        }}
      />

      <SectionWrapper>
        <SectionHeading
          eyebrow="Staff"
          title="Coaches who shape the club from training design to matchday details."
          description="This starter structure is intentionally reusable, so future staff pages can easily expand with bios, credentials, headshots, and team assignments."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {coaches.map((coach) => (
            <article key={coach.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300">{coach.role}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{coach.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{coach.bio}</p>
              <p className="mt-5 text-sm text-slate-400">Specialty: {coach.specialty}</p>
              <p className="mt-2 text-sm text-slate-400">License: {coach.license}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

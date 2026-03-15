import type { Metadata } from "next";

import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = {
  title: "Tryouts",
};

export default function TryoutsPage() {
  return (
    <>
      <PageHero
        content={{
          eyebrow: "Tryouts",
          title: "A polished evaluation process for players ready to compete.",
          description:
            "Our tryout flow is designed to feel clear, welcoming, and professional for both new and returning families.",
          actions: [{ href: "/contact", label: "Request Tryout Info", variant: "primary" }],
        }}
      />

      <SectionWrapper>
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "1. Register Interest",
              text: "Share your player’s birth year, current team, and experience so we can place them in the right evaluation group.",
            },
            {
              title: "2. Attend Assessment",
              text: "Players are evaluated on technical quality, decision-making, competitiveness, and coachability in a live environment.",
            },
            {
              title: "3. Follow-Up",
              text: "Families receive clear next steps, roster decisions, and guidance on fit within the Swarm pathway.",
            },
          ].map((step) => (
            <article key={step.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">{step.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{step.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-amber-300/20 bg-[linear-gradient(135deg,_rgba(245,158,11,0.15),_rgba(255,255,255,0.03))] p-8">
          <h2 className="text-3xl font-semibold text-white">Sample tryout windows</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "U10-U12: Early May evening sessions",
              "U13-U15: Mid May performance blocks",
              "Supplemental placements: Summer by request",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button href="/contact">Contact The Club</Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

import type { Metadata } from "next";

import { FaqList } from "@/components/tryouts/faq-list";
import { RegistrationCtaCard } from "@/components/tryouts/registration-cta-card";
import { TryoutProgramCard } from "@/components/tryouts/tryout-program-card";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  clubWideTryoutPrograms,
  currentTryoutOverview,
  independentCoachTryouts,
  tryoutFaqs,
  tryoutRegistrationCards,
} from "@/data/tryouts";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Tryouts",
};

export default function TryoutsPage() {
  return (
    <>
      <PageHero
        content={{
          eyebrow: "Tryouts",
          title: "Professional tryouts for players ready to enter the Swarm pathway.",
          description:
            "Built for clarity and confidence, the Semo Swarm tryout page is structured to support club-wide evaluations today and a full registration workflow later.",
          actions: [
            { href: "/contact", label: "Request Tryout Info", variant: "primary" },
            { href: "#registration", label: "View Registration Paths", variant: "secondary" },
          ],
        }}
      />

      <SectionWrapper>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
              {currentTryoutOverview.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              {currentTryoutOverview.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              {currentTryoutOverview.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Club Year</p>
                <p className="mt-2 text-lg font-semibold text-white">{currentTryoutOverview.season}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Status</p>
                <p className="mt-2 text-lg font-semibold text-white">{currentTryoutOverview.registrationStatus}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-300/20 bg-[linear-gradient(135deg,_rgba(245,158,11,0.15),_rgba(255,255,255,0.03))] p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">How The Process Works</p>
            <div className="mt-6 grid gap-4">
              {currentTryoutOverview.notes.map((note, index) => (
                <div key={note} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-200">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white/[0.03]">
        <SectionHeading
          eyebrow="Age Groups And Programs"
          title="Program listings built for clean editing and future registration integration."
          description="Each listing is driven by mock data today so a real registration form, database table, or admin-managed schedule can replace it later without rebuilding the page."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {clubWideTryoutPrograms.map((program) => (
            <TryoutProgramCard key={program.id} program={program} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading
          eyebrow="Club-Wide Tryouts"
          title="One pathway for players entering the broader Semo Swarm environment."
          description="These are the main tryout windows for most families and are organized to create the right balance of age grouping, coach evaluation, and placement clarity."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {clubWideTryoutPrograms.map((program) => (
            <article key={`${program.id}-overview`} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{program.ageGroup}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{program.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{program.description}</p>
              <p className="mt-5 text-sm text-slate-400">Window: {program.dates}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white/[0.03]">
        <SectionHeading
          eyebrow="Independent Coach Tryouts"
          title="Coach-specific evaluation opportunities for targeted player profiles."
          description="Some players are best served by direct coach-led sessions before entering a broader roster conversation. This section is designed to scale into coach-managed registration later."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {independentCoachTryouts.map((tryout) => (
            <article key={tryout.id} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{tryout.ageFocus}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{tryout.program}</h3>
              <p className="mt-2 text-sm font-medium text-slate-400">
                {tryout.coachName} • {tryout.role}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{tryout.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button href={tryout.registrationHref} variant="secondary">
                  Request Coach Session
                </Button>
                <span className="text-sm text-slate-400">{tryout.contact}</span>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="registration">
        <SectionHeading
          eyebrow="Registration CTAs"
          title="Clear paths for registration, coach inquiry, and family questions."
          description="These CTA cards can point to a future hosted form, embedded registration flow, or internal club admin system without changing the visual structure."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {tryoutRegistrationCards.map((card) => (
            <RegistrationCtaCard key={card.id} card={card} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white/[0.03]">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers to the most common tryout questions."
            description="This section is ready to expand later into policy, timing, roster, or payment questions as the club registration process becomes more detailed."
          />
          <FaqList items={tryoutFaqs} />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Questions</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Need help finding the right tryout path?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              Families can contact the club for help with age-group fit, coach-specific sessions, timing, or what to expect during evaluations.
            </p>
          </div>

          <div className="rounded-[2rem] border border-amber-300/20 bg-[linear-gradient(135deg,_rgba(245,158,11,0.18),_rgba(255,255,255,0.03))] p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">Contact The Club</p>
            <div className="mt-5 grid gap-4 text-sm text-slate-200">
              <p>{siteConfig.email}</p>
              <p>{siteConfig.phone}</p>
              <p>{siteConfig.location}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact">Contact Semo Swarm</Button>
              <Button href="/teams" variant="secondary">
                Explore Teams
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

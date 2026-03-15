import type { Metadata } from "next";

import { SectionWrapper } from "@/components/layout/section-wrapper";
import { FaqList } from "@/components/tryouts/faq-list";
import { RegistrationCtaCard } from "@/components/tryouts/registration-cta-card";
import { TryoutProgramCard } from "@/components/tryouts/tryout-program-card";
import { TryoutRegistrationForm } from "@/components/tryouts/tryout-registration-form";
import { CtaPanel } from "@/components/ui/cta-panel";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPublicTryouts } from "@/data/public-content";
import { currentTryoutOverview, splitTryouts, tryoutFaqs, tryoutRegistrationCards } from "@/data/tryouts";
import { siteConfig } from "@/data/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Tryouts",
  description:
    "View Semo Swarm tryout opportunities, coach-led evaluations, registration details, and answers for families exploring the club pathway.",
  path: "/tryouts",
});

export default async function TryoutsPage() {
  const tryouts = await getPublicTryouts();
  const { clubWideTryoutPrograms, independentCoachTryouts } = splitTryouts(tryouts);

  return (
    <>
      <PageHero
        content={{
          eyebrow: "Tryouts",
          title: "Professional tryouts for players ready to enter the Swarm pathway.",
          description:
            "Built for clarity and confidence, the Semo Swarm tryout page is structured to support club-wide evaluations now and a full registration workflow later.",
          actions: [
            { href: "#registration-form", label: "Start Registration", variant: "primary" },
            { href: "/contact", label: "Request Tryout Info", variant: "secondary" },
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
          description="Each listing is driven by live Supabase data where available, while the page continues to render cleanly even when no tryouts have been published yet."
        />

        {clubWideTryoutPrograms.length > 0 ? (
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {clubWideTryoutPrograms.map((program) => (
              <TryoutProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[1.8rem] border border-dashed border-white/15 bg-white/5 p-8 text-sm leading-7 text-slate-400">
            No public club-wide tryouts are available yet. Add open public tryouts in Supabase and they will appear here automatically.
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading
          eyebrow="Independent Coach Tryouts"
          title="Coach-specific evaluation opportunities for targeted player profiles."
          description="Some players are best served by direct coach-led sessions before entering a broader roster conversation. This section is designed to scale into coach-managed registration later."
        />

        {independentCoachTryouts.length > 0 ? (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {independentCoachTryouts.map((tryout) => (
              <article key={tryout.id} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{tryout.ageFocus}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{tryout.program}</h3>
                <p className="mt-2 text-sm font-medium text-slate-400">
                  {tryout.coachName} | {tryout.role}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-300">{tryout.summary}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#registration-form"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Request Coach Session
                  </a>
                  <span className="text-sm text-slate-400">{tryout.contact}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[1.8rem] border border-dashed border-white/15 bg-white/5 p-8 text-sm leading-7 text-slate-400">
            No coach-managed tryouts are published yet.
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper id="registration-form" className="bg-white/[0.03]">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Registration"
              title="Front-end registration UI designed for a future API or Supabase connection."
              description="The form uses typed controlled inputs, client-side validation, and clean structure so it can be hooked into a real submission flow without changing the page layout."
            />

            <div className="grid gap-5">
              {tryoutRegistrationCards.map((card) => (
                <RegistrationCtaCard key={card.id} card={card} />
              ))}
            </div>
          </div>

          <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.03))] p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Tryout Registration Form</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Submit a player interest form.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              This is a front-end placeholder flow with validation, loading state, and success messaging already built in.
            </p>

            <div className="mt-8">
              <TryoutRegistrationForm
                clubWideTryoutPrograms={clubWideTryoutPrograms}
                independentCoachTryouts={independentCoachTryouts}
              />
            </div>
          </section>
        </div>
      </SectionWrapper>

      <SectionWrapper>
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
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Questions</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Need help finding the right tryout path?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              Families can contact the club for help with age-group fit, coach-specific sessions, timing, or what to expect during evaluations.
            </p>
          </section>

          <CtaPanel
            eyebrow="Contact The Club"
            title="Talk with the staff before registering."
            description={`${siteConfig.email} | ${siteConfig.phone} | ${siteConfig.location}`}
            actions={[
              { href: "/contact", label: "Contact The Club" },
              { href: "/teams", label: "Explore Teams", variant: "secondary" },
            ]}
          />
        </div>
      </SectionWrapper>
    </>
  );
}

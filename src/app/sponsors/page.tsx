import type { Metadata } from "next";

import { SectionWrapper } from "@/components/layout/section-wrapper";
import { CurrentSponsorCard } from "@/components/sponsors/current-sponsor-card";
import { SponsorInquiryForm } from "@/components/sponsors/sponsor-inquiry-form";
import { SponsorTierCard } from "@/components/sponsors/sponsor-tier-card";
import { CtaPanel } from "@/components/ui/cta-panel";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPublicSponsors } from "@/data/public-content";
import { sponsorBenefits, sponsorIntro, sponsorTiers } from "@/data/sponsors";
import { siteConfig } from "@/data/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Sponsors",
  description:
    "Explore Semo Swarm sponsorship opportunities, current partners, business benefits, and a front-end inquiry flow ready for future production integration.",
  path: "/sponsors",
});

export default async function SponsorsPage() {
  const currentSponsors = await getPublicSponsors();

  return (
    <>
      <PageHero
        content={{
          eyebrow: "Sponsors",
          title: "Partner with a club that is building a stronger local soccer experience.",
          description:
            "Semo Swarm sponsorships are designed to support player development while giving local businesses meaningful visibility with families across Southeast Missouri.",
          actions: [
            { href: "#inquiry-form", label: "Sponsor Inquiry", variant: "primary" },
            { href: "/contact", label: "Contact The Club", variant: "secondary" },
          ],
        }}
      />

      <SectionWrapper>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">{sponsorIntro.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              {sponsorIntro.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">{sponsorIntro.description}</p>
          </div>

          <div className="rounded-[2rem] border border-amber-300/20 bg-[linear-gradient(135deg,_rgba(245,158,11,0.18),_rgba(255,255,255,0.03))] p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">Why It Matters</p>
            <div className="mt-6 grid gap-4">
              {[
                "Support training environments, events, and player-facing experiences",
                "Build authentic visibility with engaged local families",
                "Help shape a premium club identity rooted in the Southeast Missouri community",
              ].map((item, index) => (
                <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white/[0.03]">
        <SectionHeading
          eyebrow="Sponsor Tiers"
          title="Partnership options built for local businesses of different sizes."
          description="These tier cards stay editable in code for now, while current sponsor listings can come from live Supabase data."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {sponsorTiers.map((tier) => (
            <SponsorTierCard key={tier.id} tier={tier} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading
          eyebrow="Current Sponsors"
          title="Businesses already helping Semo Swarm grow."
          description="Active public sponsors are loaded from Supabase and shown here automatically."
        />

        {currentSponsors.length > 0 ? (
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {currentSponsors.map((sponsor) => (
              <CurrentSponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[1.8rem] border border-dashed border-white/15 bg-white/5 p-8 text-sm leading-7 text-slate-400">
            No public sponsors are listed yet. Add active sponsor records in Supabase and they will appear here automatically.
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper className="bg-white/[0.03]">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="Sponsor Benefits"
            title="A partnership with Swarm can be both visible and meaningful."
            description="Businesses are not just funding a logo placement. They are helping create better club infrastructure, stronger player support, and a more complete family experience."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {sponsorBenefits.map((benefit) => (
              <article key={benefit.id} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="inquiry-form">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Sponsor Inquiry"
              title="Front-end sponsor form built for a later backend connection."
              description="The inquiry experience now has typed controlled fields, validation, and placeholder success states so it can plug into Supabase or an API route cleanly."
            />

            <CtaPanel
              eyebrow="Next Step"
              title="Start a sponsorship conversation with the club."
              description={`We can talk through visibility goals, community alignment, seasonal opportunities, and the sponsorship level that fits your business best. Reach us at ${siteConfig.email} or ${siteConfig.phone}.`}
              actions={[
                { href: "/contact", label: "Contact The Club" },
                { href: "/about", label: "Learn About The Club", variant: "secondary" },
              ]}
            />
          </div>

          <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.03))] p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Sponsor Inquiry Form</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Tell us about your business and partnership goals.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              This is a polished front-end placeholder flow that can later submit to an API route, server action, or Supabase-backed table.
            </p>

            <div className="mt-8">
              <SponsorInquiryForm />
            </div>
          </section>
        </div>
      </SectionWrapper>
    </>
  );
}

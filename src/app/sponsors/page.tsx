import type { Metadata } from "next";

import { CurrentSponsorCard } from "@/components/sponsors/current-sponsor-card";
import { SponsorTierCard } from "@/components/sponsors/sponsor-tier-card";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  currentSponsors,
  sponsorBenefits,
  sponsorInquiryFields,
  sponsorIntro,
  sponsorTiers,
} from "@/data/sponsors";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Sponsors",
};

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        content={{
          eyebrow: "Sponsors",
          title: "Partner with a club that is building a stronger local soccer experience.",
          description:
            "Semo Swarm sponsorships are designed to support player development while giving local businesses meaningful visibility with families across Southeast Missouri.",
          actions: [
            { href: "#inquiry", label: "Sponsor Inquiry", variant: "primary" },
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
          description="These tier cards are mock content today, but they are structured so a backend-managed sponsorship package system can replace them later without changing the page layout."
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
          description="These realistic placeholder partners show how current sponsors can be presented in a more polished editorial style instead of a simple logo wall."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {currentSponsors.map((sponsor) => (
            <CurrentSponsorCard key={sponsor.name} sponsor={sponsor} />
          ))}
        </div>
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
              <article
                key={benefit.id}
                className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="inquiry">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Sponsor Inquiry</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Placeholder form area ready for a real backend submission flow.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              This section is intentionally structured for a future embedded form, server action, CRM integration, or sponsorship workflow without redesigning the page.
            </p>

            <div className="mt-8 grid gap-4">
              {sponsorInquiryFields.map((field) => (
                <div
                  key={field.id}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{field.label}</p>
                  <p className="mt-2 text-sm text-slate-300">{field.placeholder}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-300/20 bg-[linear-gradient(135deg,_rgba(245,158,11,0.18),_rgba(255,255,255,0.03))] p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">Next Step</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Start a sponsorship conversation with the club.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              We can talk through visibility goals, community alignment, seasonal opportunities, and the sponsorship level that fits your business best.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-slate-200">
              <p>{siteConfig.email}</p>
              <p>{siteConfig.phone}</p>
              <p>{siteConfig.location}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact">Contact Semo Swarm</Button>
              <Button href="/about" variant="secondary">
                Learn About The Club
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

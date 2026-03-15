import type { Metadata } from "next";

import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        content={{
          eyebrow: "Contact",
          title: "Start the conversation with Semo Swarm.",
          description:
            "Whether your family is exploring teams, tryouts, sponsorships, or coaching opportunities, this page is ready for a future form integration while still looking complete today.",
        }}
      />

      <SectionWrapper>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Club Contact</p>
            <div className="mt-5 grid gap-5 text-sm leading-7 text-slate-300">
              <div>
                <p className="font-semibold text-white">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="text-slate-300 transition hover:text-white">
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="font-semibold text-white">Phone</p>
                <a href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`} className="text-slate-300 transition hover:text-white">
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <p className="font-semibold text-white">Region</p>
                <p>{siteConfig.location}</p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Future Form Area</p>
            <div className="mt-5 grid gap-4">
              {[
                "Player name and birth year",
                "Parent contact information",
                "Reason for inquiry",
                "Message or player background",
              ].map((field) => (
                <div key={field} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-400">
                  {field}
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              This layout is intentionally ready for a future server action, form library, or external CRM integration without needing to redesign the page.
            </p>
          </article>
        </div>
      </SectionWrapper>
    </>
  );
}

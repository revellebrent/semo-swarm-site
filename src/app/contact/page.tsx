import type { Metadata } from "next";

import { ContactFormField } from "@/components/contact/contact-form-field";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactBlocks, contactQuickAnswers, generalInquiryFields } from "@/data/contact";
import { siteConfig } from "@/data/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact Semo Swarm for team questions, tryout information, sponsorship inquiries, and general club support across Southeast Missouri.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        content={{
          eyebrow: "Contact",
          title: "Start the conversation with Semo Swarm.",
          description:
            "Whether your family is exploring teams, tryouts, sponsorships, or general club questions, this page is designed to feel complete now and connect to a real backend form later.",
          actions: [
            { href: "#inquiry-form", label: "General Inquiry", variant: "primary" },
            { href: "/tryouts", label: "Tryout Information", variant: "secondary" },
          ],
        }}
      />

      <SectionWrapper>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/5 p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Club Contact Info</p>
            <div className="mt-6 grid gap-5 text-sm leading-7 text-slate-300">
              <div>
                <p className="font-semibold text-white">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="text-slate-300 transition hover:text-white">
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="font-semibold text-white">Phone</p>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`}
                  className="text-slate-300 transition hover:text-white"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <p className="font-semibold text-white">Region</p>
                <p>{siteConfig.location}</p>
              </div>
            </div>
          </article>

          <section
            id="inquiry-form"
            className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-7 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">General Inquiry Form</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Front-end form UI ready for future backend hookup.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              This form is intentionally structured so it can later connect to a server action, API route, CRM, or hosted form provider without redesigning the page.
            </p>

            <div className="mt-8 grid gap-4">
              {generalInquiryFields.map((field) => (
                <ContactFormField key={field.id} field={field} />
              ))}
            </div>

            <div className="mt-6">
              <Button href="/contact">Submit Placeholder</Button>
            </div>
          </section>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-white/[0.03]">
        <div className="grid gap-5 lg:grid-cols-2">
          {contactBlocks.map((block) => (
            <article key={block.id} className="rounded-[1.9rem] border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">{block.eyebrow}</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">{block.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{block.description}</p>
              <p className="mt-5 text-sm text-slate-400">{block.primaryContact}</p>
              <div className="mt-6">
                <Button href={block.ctaHref} variant="secondary">
                  {block.ctaLabel}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Map / Location</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Placeholder map area for future embed or directions module.
            </h2>
            <div className="mt-8 flex min-h-72 items-center justify-center rounded-[1.75rem] border border-dashed border-white/15 bg-slate-950/55 p-8 text-center text-sm leading-7 text-slate-400">
              Map embed placeholder
              <br />
              Cape Girardeau region training and club activity locations can be connected here later.
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-300/20 bg-[linear-gradient(135deg,_rgba(245,158,11,0.18),_rgba(255,255,255,0.03))] p-7 sm:p-8">
            <SectionHeading
              eyebrow="Quick Answers"
              title="A few fast answers before you reach out."
              description="This block can later expand into a more detailed FAQ, help center, or knowledge base without changing the page structure."
            />

            <div className="mt-8 grid gap-4">
              {contactQuickAnswers.map((item) => (
                <article key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                  <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-200">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </SectionWrapper>
    </>
  );
}

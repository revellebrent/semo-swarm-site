import { sponsorInquiries } from "@/data/club-management";
import type { Sponsor, SponsorBenefit, SponsorInquiry, SponsorInquiryField, SponsorTier } from "@/types/site";

export const sponsorIntro = {
  eyebrow: "Why Sponsor Swarm",
  title: "Local sponsorships help create a more complete club experience for players and families.",
  description:
    "Semo Swarm is building a premium youth soccer environment in Southeast Missouri, and strong community partnerships help elevate everything from training gear and travel support to matchday atmosphere and family experience.",
};

export const currentSponsors: Sponsor[] = [
  {
    id: "sponsor-mercy-sports-medicine",
    createdAt: "2026-01-20",
    updatedAt: "2026-03-14",
    name: "Mercy Sports Medicine",
    category: "Performance Partner",
    description:
      "Supporting player wellness, recovery education, and injury prevention resources for Swarm families.",
    website: "https://example.com/mercy-sports-medicine",
    active: true,
    tierId: "title-partner",
    contactName: "Morgan Hale",
  },
  {
    id: "sponsor-riverfront-bank",
    createdAt: "2026-01-22",
    updatedAt: "2026-03-14",
    name: "Riverfront Bank",
    category: "Community Sponsor",
    description:
      "Investing in local youth opportunities and helping make regional travel and competition more accessible.",
    website: "https://example.com/riverfront-bank",
    active: true,
    tierId: "community-partner",
    contactName: "Abigail Ross",
  },
  {
    id: "sponsor-cape-athletic-supply",
    createdAt: "2026-01-25",
    updatedAt: "2026-03-14",
    name: "Cape Athletic Supply",
    category: "Club Gear Partner",
    description:
      "Equipping the club with training apparel, sideline essentials, and custom supporter merchandise.",
    website: "https://example.com/cape-athletic-supply",
    active: true,
    tierId: "team-partner",
    contactName: "Drew Morgan",
  },
];

export const sponsorTiers: SponsorTier[] = [
  {
    id: "title-partner",
    name: "Title Partner",
    investment: "$5,000+",
    description:
      "A top-tier partnership for businesses that want year-round visibility and a strong presence alongside the club brand.",
    highlights: [
      "Featured visibility on club website and sponsor materials",
      "Priority matchday and event recognition",
      "Premium logo placement on club partnership assets",
    ],
  },
  {
    id: "community-partner",
    name: "Community Partner",
    investment: "$2,500+",
    description:
      "Designed for local businesses that want consistent community exposure while supporting player development directly.",
    highlights: [
      "Recognition across club communications and events",
      "Sponsor spotlight placement on club channels",
      "Supporter-facing association with player pathway initiatives",
    ],
  },
  {
    id: "team-partner",
    name: "Team Partner",
    investment: "$1,000+",
    description:
      "A focused partnership option for businesses that want to back a specific team, age group, or seasonal initiative.",
    highlights: [
      "Targeted visibility tied to team-level support",
      "Inclusion in club sponsor listings",
      "Flexible fit for first-time soccer club sponsors",
    ],
  },
];

export const sponsorBenefits: SponsorBenefit[] = [
  {
    id: "benefit-1",
    title: "Local Brand Visibility",
    description:
      "Reach engaged families across Southeast Missouri through a polished club platform, matchday presence, and community-facing communication.",
  },
  {
    id: "benefit-2",
    title: "Community Investment",
    description:
      "Align your business with youth development, healthy activity, and a club identity families are proud to support.",
  },
  {
    id: "benefit-3",
    title: "Professional Presentation",
    description:
      "Semo Swarm is building a premium public-facing experience, helping sponsors show up in a cleaner and more intentional way.",
  },
  {
    id: "benefit-4",
    title: "Flexible Activation",
    description:
      "Partnerships can later expand into events, gear support, team backing, digital campaigns, or hosted family experiences.",
  },
];

export const sponsorInquiryFields: SponsorInquiryField[] = [
  {
    id: "business-name",
    label: "Business Name",
    placeholder: "Enter company or organization name",
  },
  {
    id: "contact-name",
    label: "Primary Contact",
    placeholder: "Enter contact person name",
  },
  {
    id: "email",
    label: "Email Address",
    placeholder: "Enter best email for follow-up",
  },
  {
    id: "interest",
    label: "Partnership Interest",
    placeholder: "Title Partner, Community Partner, Team Partner, or custom",
  },
  {
    id: "message",
    label: "Message",
    placeholder: "Share goals, budget range, or questions about partnering with Semo Swarm",
  },
];

export const sponsorInquiryRecords: SponsorInquiry[] = sponsorInquiries;

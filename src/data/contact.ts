import type { ContactBlock, ContactFormField, ContactQuickAnswer } from "@/types/site";

export const generalInquiryFields: ContactFormField[] = [
  {
    id: "name",
    label: "Full Name",
    placeholder: "Enter parent, player, or business contact name",
    type: "text",
  },
  {
    id: "email",
    label: "Email Address",
    placeholder: "Enter best email for follow-up",
    type: "email",
  },
  {
    id: "phone",
    label: "Phone Number",
    placeholder: "Enter best number for follow-up",
    type: "tel",
  },
  {
    id: "subject",
    label: "Inquiry Type",
    placeholder: "General club question, teams, tryouts, sponsorships, or other",
    type: "text",
  },
  {
    id: "message",
    label: "Message",
    placeholder: "Share the details of your question, player background, or business inquiry",
    type: "textarea",
  },
];

export const contactBlocks: ContactBlock[] = [
  {
    id: "tryout-contact",
    eyebrow: "Tryout Questions",
    title: "Need help finding the right evaluation or age-group path?",
    description:
      "Families can reach out for guidance on age-group fit, timing, placement windows, and what to expect during the Semo Swarm tryout process.",
    primaryContact: "hello@semoswarmfc.com",
    ctaHref: "/tryouts",
    ctaLabel: "View Tryouts",
  },
  {
    id: "sponsor-contact",
    eyebrow: "Sponsor Inquiry",
    title: "Interested in supporting the club as a local business partner?",
    description:
      "We welcome sponsorship conversations with businesses that want to support youth development and connect with local families through a premium club platform.",
    primaryContact: "hello@semoswarmfc.com",
    ctaHref: "/sponsors",
    ctaLabel: "View Sponsor Page",
  },
];

export const contactQuickAnswers: ContactQuickAnswer[] = [
  {
    id: "quick-1",
    question: "Where is Semo Swarm based?",
    answer: "The club serves families across Southeast Missouri, with programming centered around the Cape Girardeau region.",
  },
  {
    id: "quick-2",
    question: "Can I ask about teams without attending tryouts yet?",
    answer: "Yes. Families can contact the club at any stage to ask about fit, pathway options, and upcoming opportunities.",
  },
  {
    id: "quick-3",
    question: "Is this page ready for a real form later?",
    answer: "Yes. The form UI is front-end only for now, but its structure is ready for server actions, API routes, or a CRM integration later.",
  },
];

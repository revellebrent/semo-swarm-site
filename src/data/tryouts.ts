import type {
  IndependentTryout,
  RegistrationCard,
  TryoutFaq,
  TryoutOverview,
  TryoutProgram,
} from "@/types/site";

export const currentTryoutOverview: TryoutOverview = {
  eyebrow: "Current Tryout Overview",
  title: "Spring and summer evaluations are open for families planning ahead.",
  description:
    "Semo Swarm uses a polished evaluation process that keeps communication clear, age groups organized, and next steps easy to understand for both new and returning families.",
  season: "2026-2027 Club Year",
  registrationStatus: "Interest form and evaluation requests are open",
  notes: [
    "Players are grouped by age and development stage to create a sharper evaluation environment.",
    "Families receive follow-up with roster fit, next-step guidance, and timing expectations.",
    "This page is ready for a future real registration form, CRM hook-in, or server action workflow.",
  ],
};

export const clubWideTryoutPrograms: TryoutProgram[] = [
  {
    id: "academy-u10-u12",
    title: "Academy Player Evaluations",
    ageGroup: "U10-U12",
    format: "Club-wide tryouts",
    location: "Cape Girardeau SportsPlex",
    dates: "May 6-8 • Evening sessions",
    description:
      "Designed for younger players entering the Swarm pathway with emphasis on technique, coachability, and confidence on the ball.",
    registrationLabel: "Register Academy Interest",
    registrationHref: "/contact",
  },
  {
    id: "premier-u13-u15",
    title: "Premier Team Evaluations",
    ageGroup: "U13-U15",
    format: "Club-wide tryouts",
    location: "Semo Training Grounds",
    dates: "May 13-16 • Performance blocks",
    description:
      "For players pursuing a higher training standard, regional competition, and a more demanding tactical environment.",
    registrationLabel: "Request Premier Evaluation",
    registrationHref: "/contact",
  },
  {
    id: "supplemental-placement",
    title: "Supplemental Placement Window",
    ageGroup: "Invite / By request",
    format: "Club-wide tryouts",
    location: "Assigned by age group",
    dates: "June through July",
    description:
      "For late movers, relocation families, or players seeking placement after the primary tryout window has closed.",
    registrationLabel: "Ask About Placement",
    registrationHref: "/contact",
  },
];

export const independentCoachTryouts: IndependentTryout[] = [
  {
    id: "coach-elena-finishing",
    coachName: "Elena Brooks",
    role: "Girls Premier Head Coach",
    program: "Attacking Unit Evaluation Sessions",
    ageFocus: "U13-U15 Girls",
    summary:
      "Independent small-group evaluations for players who may fit advanced attacking roles and want direct feedback before the full club process.",
    contact: "elena@semoswarmfc.com",
    registrationHref: "/contact",
  },
  {
    id: "coach-jordan-midfield",
    coachName: "Jordan Ellis",
    role: "Boys Premier Head Coach",
    program: "Midfield and Pressing Profile Sessions",
    ageFocus: "U12-U14 Boys",
    summary:
      "Coach-led assessment sessions focused on game understanding, work rate, and ability to operate in a faster pressing model.",
    contact: "jordan@semoswarmfc.com",
    registrationHref: "/contact",
  },
];

export const tryoutRegistrationCards: RegistrationCard[] = [
  {
    id: "club-registration",
    title: "Start Club-Wide Registration",
    description:
      "Best for most families. This CTA is ready to swap to a real registration form, external platform, or internal workflow later.",
    href: "/contact",
    ctaLabel: "Open Registration Path",
    variant: "primary",
  },
  {
    id: "coach-inquiry",
    title: "Ask About Coach-Specific Sessions",
    description:
      "Use this route when a player may fit an independent evaluation or needs help finding the best age-group entry point.",
    href: "/contact",
    ctaLabel: "Contact A Coach",
    variant: "secondary",
  },
  {
    id: "family-questions",
    title: "Talk Through The Process",
    description:
      "Ideal for families new to competitive soccer who want clarity on timeline, fit, or what to expect at evaluations.",
    href: "/contact",
    ctaLabel: "Speak With The Club",
    variant: "secondary",
  },
];

export const tryoutFaqs: TryoutFaq[] = [
  {
    id: "faq-1",
    question: "What should players bring to tryouts?",
    answer:
      "Players should bring a ball, shin guards, cleats, water, and both light and dark training gear if available. Arrival 15 minutes early is recommended.",
  },
  {
    id: "faq-2",
    question: "Can a player attend if they are currently with another club?",
    answer:
      "In most cases yes, but families should follow any applicable team or league policies. The club can help clarify timing and communication expectations.",
  },
  {
    id: "faq-3",
    question: "Will every player be offered a roster spot?",
    answer:
      "Not always. Evaluations are used to determine best fit, development pathway, and whether immediate placement or a future recommendation is most appropriate.",
  },
  {
    id: "faq-4",
    question: "How will follow-up happen after tryouts?",
    answer:
      "Families receive next-step communication after evaluations with placement guidance, roster decisions, or recommendations for future opportunities.",
  },
];

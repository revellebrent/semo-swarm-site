import type {
  Announcement,
  CoachProfile,
  FamilyValue,
  HeroContent,
  NavItem,
  QuickLink,
  Sponsor,
  TeamSummary,
} from "@/types/site";

export const siteConfig = {
  name: "Semo Swarm Soccer Club",
  shortName: "Semo Swarm",
  location: "Southeast Missouri",
  email: "hello@semoswarmfc.com",
  phone: "(573) 555-0118",
};

export const navigationItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/teams", label: "Teams" },
  { href: "/coaches", label: "Coaches" },
  { href: "/tryouts", label: "Tryouts" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/contact", label: "Contact" },
];

export const homeHero: HeroContent = {
  eyebrow: "Elite Player Pathway",
  title: "Built for ambitious players across Southeast Missouri.",
  description:
    "Semo Swarm develops fearless, technical soccer players through a high-standard training culture, competitive match environments, and a club identity families are proud to represent.",
  actions: [
    { href: "/tryouts", label: "View Tryouts", variant: "primary" },
    { href: "/teams", label: "Explore Teams", variant: "secondary" },
  ],
  stats: [
    { label: "Teams", value: "6" },
    { label: "Certified Coaches", value: "9" },
    { label: "Year-Round Training Months", value: "10" },
  ],
};

export const clubPillars = [
  {
    title: "Technical Standard",
    description:
      "Every age group trains with a clear ball mastery, positional awareness, and decision-making model.",
  },
  {
    title: "Competitive Culture",
    description:
      "Players are challenged weekly with intentional goals, film feedback, and matchday accountability.",
  },
  {
    title: "Long-Term Development",
    description:
      "We prioritize progression over shortcuts so players grow with confidence, resilience, and tactical IQ.",
  },
];

export const teams: TeamSummary[] = [
  {
    slug: "u11-girls-academy",
    name: "Swarm U11 Girls Academy",
    ageGroup: "U11 Girls",
    focus: "Ball mastery and confidence in possession",
    summary:
      "A foundation-focused squad for developing players ready to sharpen technique and embrace a fast, team-first playing style.",
    trainingDays: "Monday and Thursday",
    homeBase: "Cape Girardeau SportsPlex",
    seasonGoals: [
      "Build confidence receiving under pressure",
      "Introduce attacking principles in wide spaces",
      "Strengthen competitive match habits",
    ],
  },
  {
    slug: "u13-boys-premier",
    name: "Swarm U13 Boys Premier",
    ageGroup: "U13 Boys",
    focus: "Press-resistant buildup and game tempo",
    summary:
      "An advanced environment for committed players who want faster decisions, cleaner combination play, and disciplined pressing.",
    trainingDays: "Tuesday and Friday",
    homeBase: "Shawnee Park Complex",
    seasonGoals: [
      "Improve buildout patterns from the back",
      "Develop coordinated team pressing triggers",
      "Raise physical readiness for tournament play",
    ],
  },
  {
    slug: "u15-girls-premier",
    name: "Swarm U15 Girls Premier",
    ageGroup: "U15 Girls",
    focus: "Tactical maturity and attacking variety",
    summary:
      "A high-expectation group preparing for top regional competition with a focus on speed of play and mentality.",
    trainingDays: "Monday, Wednesday, and Sunday",
    homeBase: "Semo Training Grounds",
    seasonGoals: [
      "Create more chances through central overloads",
      "Refine transition defending after turnovers",
      "Develop leadership across the spine of the team",
    ],
  },
];

export const coaches: CoachProfile[] = [
  {
    name: "Mason Carter",
    role: "Club Technical Director",
    specialty: "Positional play and player development planning",
    bio:
      "Mason leads the club game model and supports every age group with session design, individual growth targets, and coach mentoring.",
    license: "USSF B License",
  },
  {
    name: "Elena Brooks",
    role: "Girls Premier Head Coach",
    specialty: "Attacking patterns and competitive mentality",
    bio:
      "Elena brings a demanding but player-centered approach that helps teams attack with confidence and defend with urgency.",
    license: "United Soccer Coaches Premier Diploma",
  },
  {
    name: "Jordan Ellis",
    role: "Boys Premier Head Coach",
    specialty: "Pressing structure and transition play",
    bio:
      "Jordan emphasizes fast reactions, smart spacing, and repeatable team habits that translate directly into matchday performance.",
    license: "USSF C License",
  },
];

export const sponsors: Sponsor[] = [
  {
    name: "Mercy Sports Medicine",
    category: "Performance Partner",
    description:
      "Supporting player wellness, recovery education, and injury prevention resources for Swarm families.",
  },
  {
    name: "Riverfront Bank",
    category: "Community Sponsor",
    description:
      "Investing in local youth opportunities and helping make regional travel and competition more accessible.",
  },
  {
    name: "Cape Athletic Supply",
    category: "Club Gear Partner",
    description:
      "Equipping the club with training apparel, sideline essentials, and custom supporter merchandise.",
  },
];

export const homeQuickLinks: QuickLink[] = [
  {
    href: "/teams",
    label: "Teams",
    description: "Explore age-group pathways, team standards, and development focuses.",
    accent: "Player Pathway",
  },
  {
    href: "/tryouts",
    label: "Tryouts",
    description: "See the evaluation process and next opportunities to join the club.",
    accent: "Next Entry Point",
  },
  {
    href: "/sponsors",
    label: "Sponsors",
    description: "Meet the partners helping raise the experience for Swarm families.",
    accent: "Community Backing",
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Start a conversation about teams, training, or partnership opportunities.",
    accent: "Club Contact",
  },
];

export const homeAnnouncements: Announcement[] = [
  {
    title: "Spring tryout registration opens for U10-U15 players",
    date: "April 28",
    category: "Club News",
    summary:
      "Families can now submit interest for spring evaluations, with age-group placement details shared after registration.",
    href: "/tryouts",
  },
  {
    title: "Swarm technical staff launches weekly finishing labs",
    date: "May 6",
    category: "Player Development",
    summary:
      "New supplemental sessions will focus on first touch in the box, decision speed, and repeatable attacking habits.",
    href: "/coaches",
  },
  {
    title: "Community sponsor weekend planned for opening home fixtures",
    date: "May 18",
    category: "Events",
    summary:
      "The club will spotlight local partners and create a stronger matchday atmosphere for players and families.",
    href: "/sponsors",
  },
];

export const familyValues: FamilyValue[] = [
  {
    title: "Professional Communication",
    description:
      "Families know what to expect with clear schedules, organized updates, and a polished club presentation.",
  },
  {
    title: "Demanding Development",
    description:
      "Training sessions are designed with intent so players build technique, resilience, and tactical maturity over time.",
  },
  {
    title: "Competitive Standards",
    description:
      "Swarm teams compete with intensity while staying grounded in a long-term player pathway, not short-term shortcuts.",
  },
  {
    title: "A Club That Feels Connected",
    description:
      "Players, coaches, and families share one identity across every age group, from academy years through premier competition.",
  },
];

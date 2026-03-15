export type NavItem = {
  href: string;
  label: string;
};

export type Cta = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type Stat = {
  label: string;
  value: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: Cta[];
  stats?: Stat[];
  align?: "left" | "center";
};

export type TeamSummary = {
  slug: string;
  name: string;
  ageGroup: string;
  focus: string;
  summary: string;
  trainingDays: string;
  homeBase: string;
  seasonGoals: string[];
};

export type CoachProfile = {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  license: string;
};

export type Sponsor = {
  name: string;
  category: string;
  description: string;
};

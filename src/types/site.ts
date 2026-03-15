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
  level: string;
  gender: "Girls" | "Boys" | "Coed";
  focus: string;
  summary: string;
  homeBase: string;
};

export type TeamCoach = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  license: string;
  email?: string;
};

export type TeamAnnouncement = {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
};

export type TeamPracticeDetails = {
  days: string[];
  time: string;
  location: string;
  season: string;
  notes: string;
};

export type TeamScheduleItem = {
  id: string;
  opponent: string;
  date: string;
  location: string;
  type: string;
};

export type TeamTryoutCallout = {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
};

export type Team = TeamSummary & {
  overview: string;
  playerProfile: string;
  coaches: TeamCoach[];
  practice: TeamPracticeDetails;
  schedule: TeamScheduleItem[];
  announcements: TeamAnnouncement[];
  tryoutCallout?: TeamTryoutCallout;
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

export type QuickLink = {
  href: string;
  label: string;
  description: string;
  accent: string;
};

export type Announcement = {
  title: string;
  date: string;
  category: string;
  summary: string;
  href: string;
};

export type FamilyValue = {
  title: string;
  description: string;
};

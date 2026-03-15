import type {
  AnnouncementModel,
  CoachModel,
  RoleKey,
  RoleModel,
  SponsorInquiryModel,
  SponsorModel,
  TeamPracticeDetails,
  TeamScheduleItem,
  TeamTryoutCallout,
  TeamViewModel,
  TryoutModel,
  TryoutRegistrationModel,
  UserModel,
} from "@/types/models";

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

export type Team = TeamViewModel;
export type TeamSummary = Pick<Team, "slug" | "name" | "ageGroup" | "level" | "gender" | "focus" | "summary" | "homeBase">;
export type TeamCoach = CoachModel;
export type TeamAnnouncement = AnnouncementModel;
export type CoachProfile = CoachModel;
export type Sponsor = SponsorModel;
export type User = UserModel;
export type Role = RoleModel;
export type RoleId = RoleKey;
export type Tryout = TryoutModel;
export type SponsorInquiry = SponsorInquiryModel;
export type TryoutRegistration = TryoutRegistrationModel;
export type { TeamPracticeDetails, TeamScheduleItem, TeamTryoutCallout };

export type QuickLink = {
  href: string;
  label: string;
  description: string;
  accent: string;
};

export type Announcement = AnnouncementModel;

export type FamilyValue = {
  title: string;
  description: string;
};

export type TryoutOverview = {
  eyebrow: string;
  title: string;
  description: string;
  season: string;
  registrationStatus: string;
  notes: string[];
};

export type TryoutProgram = {
  id: string;
  title: string;
  ageGroup: string;
  format: string;
  location: string;
  dates: string;
  description: string;
  registrationLabel: string;
  registrationHref: string;
};

export type IndependentTryout = {
  id: string;
  coachName: string;
  role: string;
  program: string;
  ageFocus: string;
  summary: string;
  contact: string;
  registrationHref: string;
};

export type RegistrationCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  variant?: "primary" | "secondary";
};

export type TryoutFaq = {
  id: string;
  question: string;
  answer: string;
};

export type SponsorTier = {
  id: string;
  name: string;
  investment: string;
  description: string;
  highlights: string[];
};

export type SponsorBenefit = {
  id: string;
  title: string;
  description: string;
};

export type SponsorInquiryField = {
  id: string;
  label: string;
  placeholder: string;
};

export type ContactFormField = {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "textarea";
};

export type ContactQuickAnswer = {
  id: string;
  question: string;
  answer: string;
};

export type ContactBlock = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryContact: string;
  ctaHref: string;
  ctaLabel: string;
};

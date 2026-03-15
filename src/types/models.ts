export type RoleKey = "super_admin" | "club_admin" | "coach";

export type UserStatus = "active" | "invited" | "inactive";

export type AnnouncementScope = "club" | "team";

export type TryoutFormat = "club_wide" | "coach_independent";

export type TryoutStatus = "draft" | "open" | "closed";

export type SponsorInquiryStatus = "new" | "in_review" | "contacted" | "closed";

export type TryoutRegistrationStatus =
  | "new"
  | "reviewing"
  | "accepted"
  | "waitlisted"
  | "declined";

export type TeamGender = "Girls" | "Boys" | "Coed";

type BaseModel = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type RoleModel = {
  key: RoleKey;
  label: string;
  description: string;
  permissions: string[];
};

export type UserModel = BaseModel & {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  status: UserStatus;
  roleKeys: RoleKey[];
};

export type CoachModel = BaseModel & {
  userId: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  license: string;
  email: string;
  assignedTeamIds: string[];
  ownedTryoutIds: string[];
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

export type TeamModel = BaseModel & {
  slug: string;
  name: string;
  ageGroup: string;
  level: string;
  gender: TeamGender;
  focus: string;
  summary: string;
  overview: string;
  playerProfile: string;
  homeBase: string;
  practice: TeamPracticeDetails;
  schedule: TeamScheduleItem[];
  seasonGoals: string[];
  coachIds: string[];
  announcementIds: string[];
  tryoutIds: string[];
  tryoutCallout?: TeamTryoutCallout;
};

export type AnnouncementModel = BaseModel & {
  title: string;
  date: string;
  category: string;
  summary: string;
  href: string;
  scope: AnnouncementScope;
  authorUserId: string;
  teamId?: string;
  published: boolean;
};

export type TryoutModel = BaseModel & {
  slug: string;
  title: string;
  ageGroup: string;
  format: TryoutFormat;
  location: string;
  dates: string;
  description: string;
  registrationLabel: string;
  registrationHref: string;
  season: string;
  status: TryoutStatus;
  ownerUserId: string;
  ownerCoachId?: string;
  teamId?: string;
};

export type SponsorModel = BaseModel & {
  name: string;
  category: string;
  description: string;
  website?: string;
  active: boolean;
  tierId?: string;
  contactName?: string;
};

export type SponsorInquiryModel = BaseModel & {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  status: SponsorInquiryStatus;
  assignedUserId?: string;
};

export type TryoutRegistrationModel = BaseModel & {
  tryoutId: string;
  playerName: string;
  birthYear: number;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  status: TryoutRegistrationStatus;
  assignedCoachId?: string;
  assignedTeamId?: string;
  notes?: string;
};

export type TeamViewModel = Omit<TeamModel, "coachIds" | "announcementIds"> & {
  coaches: CoachModel[];
  announcements: AnnouncementModel[];
};

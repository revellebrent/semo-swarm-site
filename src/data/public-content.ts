import { coaches as fallbackCoaches } from "@/data/club-management";
import { sponsorBenefits, sponsorInquiryFields, sponsorIntro, sponsorTiers } from "@/data/sponsors";
import { familyValues, homeHero, homeQuickLinks, navigationItems, siteConfig, clubPillars } from "@/data/site";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import type {
  Announcement,
  CoachProfile,
  IndependentTryout,
  Sponsor,
  Team,
  TeamAnnouncement,
  TeamCoach,
  Tryout,
  TryoutFaq,
  TryoutOverview,
  TryoutProgram,
} from "@/types/site";

type TeamRow = Database["public"]["Tables"]["teams"]["Row"];
type CoachRow = Database["public"]["Tables"]["coaches"]["Row"];
type CoachAssignmentRow = Database["public"]["Tables"]["coach_team_assignments"]["Row"];
type AnnouncementRow = Database["public"]["Tables"]["announcements"]["Row"];
type TryoutRow = Database["public"]["Tables"]["tryouts"]["Row"];
type SponsorRow = Database["public"]["Tables"]["sponsors"]["Row"];

function formatDisplayDate(value: string | null) {
  if (!value) {
    return "Date to be announced";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatTryoutWindow(startDate: string | null, endDate: string | null) {
  if (!startDate && !endDate) {
    return "Dates to be announced";
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime())) {
      const sameMonth = start.getMonth() === end.getMonth();
      const startMonth = new Intl.DateTimeFormat("en-US", { month: "short" }).format(start);
      const endMonth = new Intl.DateTimeFormat("en-US", { month: "short" }).format(end);

      return sameMonth
        ? `${startMonth} ${start.getDate()}-${end.getDate()}`
        : `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}`;
    }
  }

  return [startDate, endDate].filter(Boolean).join(" - ");
}

function mapCoachRow(row: CoachRow, assignedTeamIds: string[] = [], ownedTryoutIds: string[] = []): CoachProfile {
  const fallbackCoach = fallbackCoaches.find((coach) => coach.id === row.id);

  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    userId: row.profile_id,
    name: fallbackCoach?.name ?? row.role_title,
    role: row.role_title,
    specialty: row.specialty ?? fallbackCoach?.specialty ?? "Player development",
    bio: row.bio ?? fallbackCoach?.bio ?? "Coach bio coming soon.",
    license: row.license ?? fallbackCoach?.license ?? "License in progress",
    email: row.email ?? siteConfig.email,
    assignedTeamIds,
    ownedTryoutIds,
  };
}

function mapAnnouncementRow(row: AnnouncementRow): Announcement {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    title: row.title,
    date: formatDisplayDate(row.published_at ?? row.created_at),
    category: row.category ?? "Club Update",
    summary: row.summary,
    href: "/",
    scope: row.scope,
    authorUserId: row.author_profile_id ?? "",
    teamId: row.team_id ?? undefined,
    published: row.is_published,
  };
}

function mapSponsorRow(row: SponsorRow): Sponsor {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    name: row.name,
    category: row.category ?? "Club Partner",
    description: row.description ?? "Supporter of Semo Swarm.",
    website: row.website_url ?? undefined,
    active: row.is_active,
    tierId: row.tier ?? undefined,
    contactName: row.contact_name ?? undefined,
  };
}

function mapTryoutRow(row: TryoutRow): Tryout {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    slug: row.slug,
    title: row.title,
    ageGroup: row.age_group,
    format: row.format,
    location: row.location ?? "Location to be announced",
    dates: formatTryoutWindow(row.start_date, row.end_date),
    description: row.description ?? "Tryout details coming soon.",
    registrationLabel: row.registration_label ?? "Request Info",
    registrationHref: row.registration_href ?? "/contact",
    season: row.season ?? "Upcoming Club Year",
    status: row.status,
    ownerUserId: row.owner_profile_id ?? "",
    ownerCoachId: row.owner_coach_id ?? undefined,
    teamId: row.team_id ?? undefined,
  };
}

function buildTeamFromRow(
  row: TeamRow,
  coachesByTeamId: Map<string, TeamCoach[]>,
  announcementsByTeamId: Map<string, TeamAnnouncement[]>,
  tryoutsByTeamId: Map<string, Tryout[]>,
): Team {
  const coaches = coachesByTeamId.get(row.id) ?? [];
  const teamAnnouncements = announcementsByTeamId.get(row.id) ?? [];
  const teamTryouts = tryoutsByTeamId.get(row.id) ?? [];
  const primaryTryout = teamTryouts[0];

  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    slug: row.slug,
    name: row.name,
    ageGroup: row.age_group,
    level: row.level,
    gender: row.gender,
    focus: row.focus ?? "Club development model",
    summary: row.summary ?? "Team summary coming soon.",
    overview: row.overview ?? "Team overview coming soon.",
    playerProfile: row.player_profile ?? "Player profile details coming soon.",
    homeBase: row.home_base ?? "Training location to be announced",
    practice: {
      days: [],
      time: "Schedule coming soon",
      location: row.home_base ?? "Training location to be announced",
      season: row.season ?? "Season details coming soon",
      notes: "Practice details will be added soon.",
    },
    schedule: [],
    seasonGoals: [],
    tryoutIds: teamTryouts.map((tryout) => tryout.id),
    tryoutCallout: primaryTryout
      ? {
          title: `Interested in ${row.name}?`,
          description: "Families can view the current tryout path or contact the club for placement guidance.",
          href: "/tryouts",
          ctaLabel: primaryTryout.registrationLabel,
        }
      : undefined,
    coaches,
    announcements: teamAnnouncements,
  };
}

async function safeSelect<T>(query: PromiseLike<{ data: T | null; error: { message: string } | null }>, fallback: T) {
  try {
    const result = await query;
    if (result.error || !result.data) {
      return fallback;
    }
    return result.data;
  } catch {
    return fallback;
  }
}

function withAnnouncementLinks(announcements: Announcement[], teams: Team[]) {
  const teamsById = new Map(teams.map((team) => [team.id, team.slug]));

  return announcements.map((announcement) => ({
    ...announcement,
    href: announcement.teamId ? `/teams/${teamsById.get(announcement.teamId) ?? ""}` : announcement.href,
  }));
}

export async function getPublicAnnouncements() {
  const supabase = createServerSupabaseClient();
  const rows = await safeSelect(
    supabase
      .from("announcements")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(6),
    [] as AnnouncementRow[],
  );

  return rows.map(mapAnnouncementRow);
}

export async function getPublicSponsors() {
  const supabase = createServerSupabaseClient();
  const rows = await safeSelect(
    supabase
      .from("sponsors")
      .select("*")
      .eq("is_public", true)
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("name", { ascending: true }),
    [] as SponsorRow[],
  );

  return rows.map(mapSponsorRow);
}

export async function getPublicTryouts() {
  const supabase = createServerSupabaseClient();
  const rows = await safeSelect(
    supabase
      .from("tryouts")
      .select("*")
      .eq("is_public", true)
      .in("status", ["open", "closed"])
      .order("start_date", { ascending: true }),
    [] as TryoutRow[],
  );

  return rows.map(mapTryoutRow);
}

export async function getPublicTeams() {
  const supabase = createServerSupabaseClient();

  const [teamRows, coachRows, assignmentRows, announcementRows, tryoutRows] = await Promise.all([
    safeSelect(
      supabase.from("teams").select("*").eq("is_active", true).order("age_group", { ascending: true }),
      [] as TeamRow[],
    ),
    safeSelect(
      supabase.from("coaches").select("*").eq("is_active", true).order("created_at", { ascending: true }),
      [] as CoachRow[],
    ),
    safeSelect(
      supabase.from("coach_team_assignments").select("*"),
      [] as CoachAssignmentRow[],
    ),
    safeSelect(
      supabase.from("announcements").select("*").eq("is_published", true).eq("scope", "team"),
      [] as AnnouncementRow[],
    ),
    safeSelect(
      supabase.from("tryouts").select("*").eq("is_public", true).in("status", ["open", "closed"]),
      [] as TryoutRow[],
    ),
  ]);

  if (teamRows.length === 0) {
    return [] as Team[];
  }

  const coachesById = new Map(
    coachRows.map((coachRow) => [coachRow.id, mapCoachRow(coachRow)]),
  );

  const coachesByTeamId = new Map<string, TeamCoach[]>();
  for (const assignment of assignmentRows) {
    const coach = coachesById.get(assignment.coach_id);
    if (!coach) {
      continue;
    }

    const existing = coachesByTeamId.get(assignment.team_id) ?? [];
    coachesByTeamId.set(assignment.team_id, [...existing, coach]);
  }

  const announcementsByTeamId = new Map<string, TeamAnnouncement[]>();
  for (const row of announcementRows) {
    if (!row.team_id) {
      continue;
    }

    const existing = announcementsByTeamId.get(row.team_id) ?? [];
    announcementsByTeamId.set(row.team_id, [...existing, mapAnnouncementRow(row)]);
  }

  const tryoutsByTeamId = new Map<string, Tryout[]>();
  for (const row of tryoutRows) {
    if (!row.team_id) {
      continue;
    }

    const existing = tryoutsByTeamId.get(row.team_id) ?? [];
    tryoutsByTeamId.set(row.team_id, [...existing, mapTryoutRow(row)]);
  }

  const teams = teamRows.map((row) => buildTeamFromRow(row, coachesByTeamId, announcementsByTeamId, tryoutsByTeamId));

  return teams.map((team) => ({
    ...team,
    announcements: withAnnouncementLinks(team.announcements, teams),
  }));
}

export async function getTeamBySlug(slug: string) {
  const teams = await getPublicTeams();
  return teams.find((team) => team.slug === slug);
}

export async function getTeamsGroupedByAgeGroup() {
  const teams = await getPublicTeams();

  return teams.reduce<Record<string, Team[]>>((groups, team) => {
    if (!groups[team.ageGroup]) {
      groups[team.ageGroup] = [];
    }

    groups[team.ageGroup].push(team);
    return groups;
  }, {});
}

export async function getHomepageData() {
  const [teams, announcements, sponsors, tryouts] = await Promise.all([
    getPublicTeams(),
    getPublicAnnouncements(),
    getPublicSponsors(),
    getPublicTryouts(),
  ]);

  const teamsById = new Map(teams.map((team) => [team.id, team.slug]));
  const linkedAnnouncements = announcements.map((announcement) => ({
    ...announcement,
    href: announcement.teamId ? `/teams/${teamsById.get(announcement.teamId) ?? ""}` : announcement.href,
  }));

  return {
    featuredTeams: teams.slice(0, 3),
    announcements: linkedAnnouncements.slice(0, 3),
    sponsors,
    tryouts,
  };
}

export function getFallbackCoachProfiles() {
  return fallbackCoaches;
}

export function getStaticSiteContent() {
  return {
    clubPillars,
    familyValues,
    homeHero,
    homeQuickLinks,
    navigationItems,
    siteConfig,
    sponsorBenefits,
    sponsorInquiryFields,
    sponsorIntro,
    sponsorTiers,
  };
}

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

export const tryoutRegistrationCards = [
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
] as const;

export function splitTryouts(tryouts: Tryout[]) {
  const clubWideTryoutPrograms: TryoutProgram[] = tryouts
    .filter((tryout) => tryout.format === "club_wide")
    .map((tryout) => ({
      id: tryout.id,
      title: tryout.title,
      ageGroup: tryout.ageGroup,
      format: "Club-wide tryouts",
      location: tryout.location,
      dates: tryout.dates,
      description: tryout.description,
      registrationLabel: tryout.registrationLabel,
      registrationHref: tryout.registrationHref,
    }));

  const coachLookup = new Map(fallbackCoaches.map((coach) => [coach.id, coach]));

  const independentCoachTryouts: IndependentTryout[] = tryouts
    .filter((tryout) => tryout.format === "coach_independent")
    .map((tryout) => {
      const ownerCoach = tryout.ownerCoachId ? coachLookup.get(tryout.ownerCoachId) : undefined;

      return {
        id: tryout.id,
        coachName: ownerCoach?.name ?? "Assigned Coach",
        role: ownerCoach?.role ?? "Coach",
        program: tryout.title,
        ageFocus: tryout.ageGroup,
        summary: tryout.description,
        contact: ownerCoach?.email ?? siteConfig.email,
        registrationHref: tryout.registrationHref,
      };
    });

  return {
    clubWideTryoutPrograms,
    independentCoachTryouts,
  };
}

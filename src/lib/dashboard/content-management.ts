import { coaches as fallbackCoaches } from "@/data/club-management";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type AnnouncementRow = Database["public"]["Tables"]["announcements"]["Row"];
type TryoutRow = Database["public"]["Tables"]["tryouts"]["Row"];
type TeamRow = Database["public"]["Tables"]["teams"]["Row"];
type CoachRow = Database["public"]["Tables"]["coaches"]["Row"];
type CoachAssignmentRow = Database["public"]["Tables"]["coach_team_assignments"]["Row"];

export type ManagementTeamOption = {
  id: string;
  label: string;
};

export type ManagementCoachOption = {
  id: string;
  label: string;
};

export type ManagedAnnouncement = {
  id: string;
  title: string;
  category: string;
  summary: string;
  body: string;
  scope: "club" | "team";
  teamId: string | null;
  teamLabel: string | null;
  isPublished: boolean;
  publishedAt: string | null;
};

export type ManagedTryout = {
  id: string;
  slug: string;
  title: string;
  ageGroup: string;
  format: "club_wide" | "coach_independent";
  location: string;
  season: string;
  description: string;
  startDate: string;
  endDate: string;
  registrationLabel: string;
  registrationHref: string;
  status: "draft" | "open" | "closed";
  teamId: string | null;
  teamLabel: string | null;
  ownerCoachId: string | null;
  ownerCoachLabel: string | null;
  isPublic: boolean;
};

export type AdminContentManagementData = {
  announcements: ManagedAnnouncement[];
  tryouts: ManagedTryout[];
  teamOptions: ManagementTeamOption[];
  coachOptions: ManagementCoachOption[];
};

export type CoachContentManagementData = {
  announcements: ManagedAnnouncement[];
  tryouts: ManagedTryout[];
  teamOptions: ManagementTeamOption[];
};

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

function mapTeamOptions(teams: TeamRow[]) {
  return teams.map((team) => ({
    id: team.id,
    label: `${team.name} | ${team.age_group}`,
  }));
}

function mapCoachOptions(coaches: CoachRow[]) {
  return coaches.map((coach) => {
    const fallbackCoach = fallbackCoaches.find((item) => item.id === coach.id);

    return {
      id: coach.id,
      label: fallbackCoach?.name ?? coach.role_title,
    };
  });
}

function mapAnnouncements(announcements: AnnouncementRow[], teamsById: Map<string, string>) {
  return announcements.map((announcement) => ({
    id: announcement.id,
    title: announcement.title,
    category: announcement.category ?? "Club Update",
    summary: announcement.summary,
    body: announcement.body ?? "",
    scope: announcement.scope,
    teamId: announcement.team_id,
    teamLabel: announcement.team_id ? teamsById.get(announcement.team_id) ?? null : null,
    isPublished: announcement.is_published,
    publishedAt: announcement.published_at,
  }));
}

function mapTryouts(
  tryouts: TryoutRow[],
  teamsById: Map<string, string>,
  coachesById: Map<string, string>,
) {
  return tryouts.map((tryout) => ({
    id: tryout.id,
    slug: tryout.slug,
    title: tryout.title,
    ageGroup: tryout.age_group,
    format: tryout.format,
    location: tryout.location ?? "",
    season: tryout.season ?? "",
    description: tryout.description ?? "",
    startDate: tryout.start_date ?? "",
    endDate: tryout.end_date ?? "",
    registrationLabel: tryout.registration_label ?? "",
    registrationHref: tryout.registration_href ?? "",
    status: tryout.status,
    teamId: tryout.team_id,
    teamLabel: tryout.team_id ? teamsById.get(tryout.team_id) ?? null : null,
    ownerCoachId: tryout.owner_coach_id,
    ownerCoachLabel: tryout.owner_coach_id ? coachesById.get(tryout.owner_coach_id) ?? null : null,
    isPublic: tryout.is_public,
  }));
}

export async function getAdminContentManagementData(): Promise<AdminContentManagementData> {
  const supabase = await createServerSupabaseClient();

  const [announcements, tryouts, teams, coaches] = await Promise.all([
    safeSelect(
      supabase.from("announcements").select("*").eq("scope", "club").order("created_at", { ascending: false }),
      [] as AnnouncementRow[],
    ),
    safeSelect(
      supabase.from("tryouts").select("*").order("created_at", { ascending: false }),
      [] as TryoutRow[],
    ),
    safeSelect(
      supabase.from("teams").select("*").eq("is_active", true).order("age_group", { ascending: true }),
      [] as TeamRow[],
    ),
    safeSelect(
      supabase.from("coaches").select("*").eq("is_active", true).order("created_at", { ascending: true }),
      [] as CoachRow[],
    ),
  ]);

  const teamsById = new Map(teams.map((team) => [team.id, `${team.name} | ${team.age_group}`]));
  const coachesById = new Map(mapCoachOptions(coaches).map((coach) => [coach.id, coach.label]));

  return {
    announcements: mapAnnouncements(announcements, teamsById),
    tryouts: mapTryouts(tryouts, teamsById, coachesById),
    teamOptions: mapTeamOptions(teams),
    coachOptions: mapCoachOptions(coaches),
  };
}

export async function getCoachContentManagementData(profileId: string): Promise<CoachContentManagementData> {
  const supabase = await createServerSupabaseClient();

  const coach = await safeSelect(
    supabase.from("coaches").select("*").eq("profile_id", profileId).maybeSingle(),
    null as CoachRow | null,
  );

  if (!coach) {
    return {
      announcements: [],
      tryouts: [],
      teamOptions: [],
    };
  }

  const assignments = await safeSelect(
    supabase.from("coach_team_assignments").select("*").eq("coach_id", coach.id),
    [] as CoachAssignmentRow[],
  );

  const teamIds = assignments.map((assignment) => assignment.team_id);

  if (teamIds.length === 0) {
    return {
      announcements: [],
      tryouts: [],
      teamOptions: [],
    };
  }

  const [teams, announcements, tryouts] = await Promise.all([
    safeSelect(
      supabase.from("teams").select("*").in("id", teamIds).order("age_group", { ascending: true }),
      [] as TeamRow[],
    ),
    safeSelect(
      supabase.from("announcements").select("*").eq("scope", "team").in("team_id", teamIds).order("created_at", { ascending: false }),
      [] as AnnouncementRow[],
    ),
    safeSelect(
      supabase.from("tryouts").select("*").eq("owner_coach_id", coach.id).order("created_at", { ascending: false }),
      [] as TryoutRow[],
    ),
  ]);

  const teamsById = new Map(teams.map((team) => [team.id, `${team.name} | ${team.age_group}`]));
  const coachesById = new Map<string, string>([[coach.id, fallbackCoaches.find((item) => item.id === coach.id)?.name ?? coach.role_title]]);

  return {
    announcements: mapAnnouncements(announcements, teamsById),
    tryouts: mapTryouts(tryouts, teamsById, coachesById),
    teamOptions: mapTeamOptions(teams),
  };
}

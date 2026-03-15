import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type CoachRow = Database["public"]["Tables"]["coaches"]["Row"];
type CoachAssignmentRow = Database["public"]["Tables"]["coach_team_assignments"]["Row"];
type TeamRow = Database["public"]["Tables"]["teams"]["Row"];
type AnnouncementRow = Database["public"]["Tables"]["announcements"]["Row"];
type TryoutRow = Database["public"]["Tables"]["tryouts"]["Row"];
type TryoutRegistrationRow = Database["public"]["Tables"]["tryout_registrations"]["Row"];

export type CoachDashboardTeam = {
  id: string;
  slug: string;
  name: string;
  ageGroup: string;
  level: string;
  announcementCount: number;
  tryoutCount: number;
  registrationCount: number;
};

export type CoachDashboardData = {
  coach: CoachRow | null;
  teams: CoachDashboardTeam[];
  totals: {
    teams: number;
    announcements: number;
    tryouts: number;
    registrations: number;
  };
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

export async function getCoachDashboardData(profileId: string): Promise<CoachDashboardData> {
  const supabase = await createServerSupabaseClient();

  const coach = await safeSelect(
    supabase.from("coaches").select("*").eq("profile_id", profileId).maybeSingle(),
    null as CoachRow | null,
  );

  if (!coach) {
    return {
      coach: null,
      teams: [],
      totals: {
        teams: 0,
        announcements: 0,
        tryouts: 0,
        registrations: 0,
      },
    };
  }

  const assignments = await safeSelect(
    supabase.from("coach_team_assignments").select("*").eq("coach_id", coach.id),
    [] as CoachAssignmentRow[],
  );

  const teamIds = assignments.map((assignment) => assignment.team_id);

  if (teamIds.length === 0) {
    return {
      coach,
      teams: [],
      totals: {
        teams: 0,
        announcements: 0,
        tryouts: 0,
        registrations: 0,
      },
    };
  }

  const [teams, announcements, tryouts, registrations] = await Promise.all([
    safeSelect(
      supabase.from("teams").select("*").in("id", teamIds).order("age_group", { ascending: true }),
      [] as TeamRow[],
    ),
    safeSelect(
      supabase.from("announcements").select("*").in("team_id", teamIds),
      [] as AnnouncementRow[],
    ),
    safeSelect(
      supabase.from("tryouts").select("*").in("team_id", teamIds),
      [] as TryoutRow[],
    ),
    safeSelect(
      supabase
        .from("tryout_registrations")
        .select("*")
        .or(`assigned_coach_id.eq.${coach.id},assigned_team_id.in.(${teamIds.join(",")})`),
      [] as TryoutRegistrationRow[],
    ),
  ]);

  const teamsForDashboard: CoachDashboardTeam[] = teams.map((team) => {
    const teamAnnouncements = announcements.filter((announcement) => announcement.team_id === team.id);
    const teamTryouts = tryouts.filter((tryout) => tryout.team_id === team.id);
    const teamRegistrations = registrations.filter((registration) => registration.assigned_team_id === team.id);

    return {
      id: team.id,
      slug: team.slug,
      name: team.name,
      ageGroup: team.age_group,
      level: team.level,
      announcementCount: teamAnnouncements.length,
      tryoutCount: teamTryouts.length,
      registrationCount: teamRegistrations.length,
    };
  });

  return {
    coach,
    teams: teamsForDashboard,
    totals: {
      teams: teamsForDashboard.length,
      announcements: announcements.length,
      tryouts: tryouts.length,
      registrations: registrations.length,
    },
  };
}

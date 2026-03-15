"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireInternalUser } from "@/lib/auth/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type CoachRow = Database["public"]["Tables"]["coaches"]["Row"];
type AnnouncementRow = Database["public"]["Tables"]["announcements"]["Row"];
type TryoutRow = Database["public"]["Tables"]["tryouts"]["Row"];

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getNullableStringValue(formData: FormData, key: string) {
  const value = getStringValue(formData, key);
  return value || null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPublishedValues(publishState: string) {
  if (publishState === "published") {
    return {
      is_published: true,
      published_at: new Date().toISOString(),
    };
  }

  return {
    is_published: false,
    published_at: null,
  };
}

function getBooleanValue(formData: FormData, key: string) {
  return getStringValue(formData, key) === "true";
}

async function getCoachContext(profileId: string) {
  const supabase = await createServerSupabaseClient();
  const coach = await supabase.from("coaches").select("*").eq("profile_id", profileId).maybeSingle();

  if (!coach.data) {
    return {
      coach: null as CoachRow | null,
      teamIds: [] as string[],
    };
  }

  const assignments = await supabase.from("coach_team_assignments").select("team_id").eq("coach_id", coach.data.id);

  return {
    coach: coach.data,
    teamIds: assignments.data?.map((assignment) => assignment.team_id) ?? [],
  };
}

function revalidateDashboardContent() {
  revalidatePath("/", "layout");
  revalidatePath("/teams", "layout");
  revalidatePath("/tryouts", "page");
  revalidatePath("/dashboard", "page");
  revalidatePath("/coach", "page");
}

export async function createAnnouncementAction(formData: FormData) {
  const authContext = await requireInternalUser("/dashboard");
  const supabase = await createServerSupabaseClient();
  const title = getStringValue(formData, "title");
  const category = getNullableStringValue(formData, "category");
  const summary = getStringValue(formData, "summary");
  const body = getNullableStringValue(formData, "body");
  const publishState = getStringValue(formData, "publishState");
  const teamId = getNullableStringValue(formData, "teamId");
  const isAdmin = authContext.roleKeys.includes("super_admin") || authContext.roleKeys.includes("club_admin");

  if (!title || !summary) {
    redirect(authContext.roleKeys.includes("coach") ? "/coach" : "/dashboard");
  }

  if (isAdmin) {
    await supabase.from("announcements").insert({
      title,
      category,
      summary,
      body,
      scope: "club",
      team_id: null,
      author_profile_id: authContext.user.id,
      ...getPublishedValues(publishState),
    });

    revalidateDashboardContent();
    redirect("/dashboard");
  }

  const coachContext = await getCoachContext(authContext.user.id);

  if (!coachContext.coach || !teamId || !coachContext.teamIds.includes(teamId)) {
    redirect("/coach");
  }

  await supabase.from("announcements").insert({
    title,
    category,
    summary,
    body,
    scope: "team",
    team_id: teamId,
    author_profile_id: authContext.user.id,
    ...getPublishedValues(publishState),
  });

  revalidateDashboardContent();
  redirect("/coach");
}

export async function updateAnnouncementAction(formData: FormData) {
  const authContext = await requireInternalUser("/dashboard");
  const supabase = await createServerSupabaseClient();
  const announcementId = getStringValue(formData, "announcementId");
  const title = getStringValue(formData, "title");
  const category = getNullableStringValue(formData, "category");
  const summary = getStringValue(formData, "summary");
  const body = getNullableStringValue(formData, "body");
  const publishState = getStringValue(formData, "publishState");
  const teamId = getNullableStringValue(formData, "teamId");
  const isAdmin = authContext.roleKeys.includes("super_admin") || authContext.roleKeys.includes("club_admin");

  const announcement = await supabase.from("announcements").select("*").eq("id", announcementId).maybeSingle();
  const existing = announcement.data as AnnouncementRow | null;

  if (!existing || !title || !summary) {
    redirect(authContext.roleKeys.includes("coach") ? "/coach" : "/dashboard");
  }

  if (isAdmin) {
    if (existing.scope !== "club") {
      redirect("/dashboard");
    }

    await supabase
      .from("announcements")
      .update({
        title,
        category,
        summary,
        body,
        ...getPublishedValues(publishState),
      })
      .eq("id", announcementId);

    revalidateDashboardContent();
    redirect("/dashboard");
  }

  const coachContext = await getCoachContext(authContext.user.id);

  if (existing.scope !== "team" || !existing.team_id || !coachContext.teamIds.includes(existing.team_id)) {
    redirect("/coach");
  }

  const nextTeamId = teamId && coachContext.teamIds.includes(teamId) ? teamId : existing.team_id;

  await supabase
    .from("announcements")
    .update({
      title,
      category,
      summary,
      body,
      team_id: nextTeamId,
      ...getPublishedValues(publishState),
    })
    .eq("id", announcementId);

  revalidateDashboardContent();
  redirect("/coach");
}

export async function deleteAnnouncementAction(formData: FormData) {
  const authContext = await requireInternalUser("/dashboard");
  const supabase = await createServerSupabaseClient();
  const announcementId = getStringValue(formData, "announcementId");
  const isAdmin = authContext.roleKeys.includes("super_admin") || authContext.roleKeys.includes("club_admin");

  const announcement = await supabase.from("announcements").select("*").eq("id", announcementId).maybeSingle();
  const existing = announcement.data as AnnouncementRow | null;

  if (!existing) {
    redirect(authContext.roleKeys.includes("coach") ? "/coach" : "/dashboard");
  }

  if (isAdmin) {
    if (existing.scope !== "club") {
      redirect("/dashboard");
    }

    await supabase.from("announcements").delete().eq("id", announcementId);
    revalidateDashboardContent();
    redirect("/dashboard");
  }

  const coachContext = await getCoachContext(authContext.user.id);

  if (existing.scope !== "team" || !existing.team_id || !coachContext.teamIds.includes(existing.team_id)) {
    redirect("/coach");
  }

  await supabase.from("announcements").delete().eq("id", announcementId);
  revalidateDashboardContent();
  redirect("/coach");
}

export async function createTryoutAction(formData: FormData) {
  const authContext = await requireInternalUser("/dashboard");
  const supabase = await createServerSupabaseClient();
  const title = getStringValue(formData, "title");
  const slugInput = getStringValue(formData, "slug");
  const ageGroup = getStringValue(formData, "ageGroup");
  const formatInput = getStringValue(formData, "format");
  const teamId = getNullableStringValue(formData, "teamId");
  const ownerCoachId = getNullableStringValue(formData, "ownerCoachId");
  const location = getNullableStringValue(formData, "location");
  const season = getNullableStringValue(formData, "season");
  const description = getNullableStringValue(formData, "description");
  const startDate = getNullableStringValue(formData, "startDate");
  const endDate = getNullableStringValue(formData, "endDate");
  const registrationLabel = getNullableStringValue(formData, "registrationLabel");
  const registrationHref = getNullableStringValue(formData, "registrationHref");
  const status = getStringValue(formData, "status") as TryoutRow["status"];
  const isPublic = getBooleanValue(formData, "isPublic");
  const isAdmin = authContext.roleKeys.includes("super_admin") || authContext.roleKeys.includes("club_admin");

  if (!title || !ageGroup) {
    redirect(authContext.roleKeys.includes("coach") ? "/coach" : "/dashboard");
  }

  if (isAdmin) {
    let nextOwnerProfileId: string | null = authContext.user.id;

    if (ownerCoachId) {
      const coach = await supabase.from("coaches").select("profile_id").eq("id", ownerCoachId).maybeSingle();
      nextOwnerProfileId = coach.data?.profile_id ?? null;
    }

    const format = formatInput === "coach_independent" ? "coach_independent" : "club_wide";

    await supabase.from("tryouts").insert({
      slug: slugInput || slugify(title),
      title,
      age_group: ageGroup,
      format,
      team_id: teamId,
      owner_coach_id: format === "coach_independent" ? ownerCoachId : null,
      owner_profile_id: format === "coach_independent" ? nextOwnerProfileId : authContext.user.id,
      location,
      season,
      description,
      start_date: startDate,
      end_date: endDate,
      registration_label: registrationLabel,
      registration_href: registrationHref,
      status,
      is_public: isPublic,
    });

    revalidateDashboardContent();
    redirect("/dashboard");
  }

  const coachContext = await getCoachContext(authContext.user.id);

  if (!coachContext.coach) {
    redirect("/coach");
  }

  await supabase.from("tryouts").insert({
    slug: slugInput || slugify(title),
    title,
    age_group: ageGroup,
    format: "coach_independent",
    team_id: teamId && coachContext.teamIds.includes(teamId) ? teamId : null,
    owner_coach_id: coachContext.coach.id,
    owner_profile_id: authContext.user.id,
    location,
    season,
    description,
    start_date: startDate,
    end_date: endDate,
    registration_label: registrationLabel,
    registration_href: registrationHref,
    status,
    is_public: isPublic,
  });

  revalidateDashboardContent();
  redirect("/coach");
}

export async function updateTryoutAction(formData: FormData) {
  const authContext = await requireInternalUser("/dashboard");
  const supabase = await createServerSupabaseClient();
  const tryoutId = getStringValue(formData, "tryoutId");
  const title = getStringValue(formData, "title");
  const slugInput = getStringValue(formData, "slug");
  const ageGroup = getStringValue(formData, "ageGroup");
  const formatInput = getStringValue(formData, "format");
  const teamId = getNullableStringValue(formData, "teamId");
  const ownerCoachId = getNullableStringValue(formData, "ownerCoachId");
  const location = getNullableStringValue(formData, "location");
  const season = getNullableStringValue(formData, "season");
  const description = getNullableStringValue(formData, "description");
  const startDate = getNullableStringValue(formData, "startDate");
  const endDate = getNullableStringValue(formData, "endDate");
  const registrationLabel = getNullableStringValue(formData, "registrationLabel");
  const registrationHref = getNullableStringValue(formData, "registrationHref");
  const status = getStringValue(formData, "status") as TryoutRow["status"];
  const isPublic = getBooleanValue(formData, "isPublic");
  const isAdmin = authContext.roleKeys.includes("super_admin") || authContext.roleKeys.includes("club_admin");

  const tryout = await supabase.from("tryouts").select("*").eq("id", tryoutId).maybeSingle();
  const existing = tryout.data as TryoutRow | null;

  if (!existing || !title || !ageGroup) {
    redirect(authContext.roleKeys.includes("coach") ? "/coach" : "/dashboard");
  }

  if (isAdmin) {
    let nextOwnerProfileId: string | null = existing.owner_profile_id;
    const format = formatInput === "coach_independent" ? "coach_independent" : "club_wide";

    if (ownerCoachId) {
      const coach = await supabase.from("coaches").select("profile_id").eq("id", ownerCoachId).maybeSingle();
      nextOwnerProfileId = coach.data?.profile_id ?? null;
    }

    await supabase
      .from("tryouts")
      .update({
        slug: slugInput || slugify(title),
        title,
        age_group: ageGroup,
        format,
        team_id: teamId,
        owner_coach_id: format === "coach_independent" ? ownerCoachId : null,
        owner_profile_id: format === "coach_independent" ? nextOwnerProfileId : authContext.user.id,
        location,
        season,
        description,
        start_date: startDate,
        end_date: endDate,
        registration_label: registrationLabel,
        registration_href: registrationHref,
        status,
        is_public: isPublic,
      })
      .eq("id", tryoutId);

    revalidateDashboardContent();
    redirect("/dashboard");
  }

  const coachContext = await getCoachContext(authContext.user.id);

  if (!coachContext.coach || existing.owner_coach_id !== coachContext.coach.id) {
    redirect("/coach");
  }

  await supabase
    .from("tryouts")
    .update({
      slug: slugInput || slugify(title),
      title,
      age_group: ageGroup,
      format: "coach_independent",
      team_id: teamId && coachContext.teamIds.includes(teamId) ? teamId : null,
      owner_coach_id: coachContext.coach.id,
      owner_profile_id: authContext.user.id,
      location,
      season,
      description,
      start_date: startDate,
      end_date: endDate,
      registration_label: registrationLabel,
      registration_href: registrationHref,
      status,
      is_public: isPublic,
    })
    .eq("id", tryoutId);

  revalidateDashboardContent();
  redirect("/coach");
}

export async function deleteTryoutAction(formData: FormData) {
  const authContext = await requireInternalUser("/dashboard");
  const supabase = await createServerSupabaseClient();
  const tryoutId = getStringValue(formData, "tryoutId");
  const isAdmin = authContext.roleKeys.includes("super_admin") || authContext.roleKeys.includes("club_admin");

  const tryout = await supabase.from("tryouts").select("*").eq("id", tryoutId).maybeSingle();
  const existing = tryout.data as TryoutRow | null;

  if (!existing) {
    redirect(authContext.roleKeys.includes("coach") ? "/coach" : "/dashboard");
  }

  if (isAdmin) {
    await supabase.from("tryouts").delete().eq("id", tryoutId);
    revalidateDashboardContent();
    redirect("/dashboard");
  }

  const coachContext = await getCoachContext(authContext.user.id);

  if (!coachContext.coach || existing.owner_coach_id !== coachContext.coach.id) {
    redirect("/coach");
  }

  await supabase.from("tryouts").delete().eq("id", tryoutId);
  revalidateDashboardContent();
  redirect("/coach");
}

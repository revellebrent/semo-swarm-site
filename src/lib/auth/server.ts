import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { INTERNAL_ROLE_KEYS, isRoleKey } from "@/lib/auth/roles";
import type { Database } from "@/types/database";
import type { RoleKey } from "@/types/models";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export type InternalAuthContext = {
  user: User;
  profile: ProfileRow | null;
  roleKeys: RoleKey[];
};

export async function getRoleKeysForProfile(
  profileId: string,
  supabaseClient?: SupabaseClient<Database>,
) {
  const supabase = supabaseClient ?? (await createServerSupabaseClient());

  const { data: profileRoles, error: profileRolesError } = await supabase
    .from("profile_roles")
    .select("role_id")
    .eq("profile_id", profileId);

  if (profileRolesError || !profileRoles || profileRoles.length === 0) {
    return [] as RoleKey[];
  }

  const roleIds = profileRoles.map((role) => role.role_id);
  const { data: roles, error: rolesError } = await supabase
    .from("roles")
    .select("key")
    .in("id", roleIds);

  if (rolesError || !roles) {
    return [] as RoleKey[];
  }

  return roles
    .map((role) => role.key)
    .filter((role): role is RoleKey => isRoleKey(role));
}

export async function getInternalAuthContext(supabaseClient?: SupabaseClient<Database>) {
  const supabase = supabaseClient ?? (await createServerSupabaseClient());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const [{ data: profile }, roleKeys] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    getRoleKeysForProfile(user.id, supabase),
  ]);

  return {
    user,
    profile: profile ?? null,
    roleKeys,
  } satisfies InternalAuthContext;
}

export async function requireInternalUser(nextPath = "/dashboard") {
  const authContext = await getInternalAuthContext();

  if (!authContext?.user) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  if (authContext.profile && !authContext.profile.is_active) {
    redirect("/login?error=inactive");
  }

  if (!authContext.roleKeys.some((roleKey) => INTERNAL_ROLE_KEYS.includes(roleKey))) {
    redirect("/login?error=unauthorized");
  }

  return authContext;
}

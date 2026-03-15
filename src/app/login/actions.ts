"use server";

import { redirect } from "next/navigation";

import { getRoleKeysForProfile } from "@/lib/auth/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { INTERNAL_ROLE_KEYS } from "@/lib/auth/roles";

export type LoginActionState = {
  error: string | null;
};

function getSafeRedirectPath(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}

export async function signInAction(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const nextPath = getSafeRedirectPath(formData.get("next"));

  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return {
      error: "Enter both email and password to sign in.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return {
      error: "We couldn't sign you in with those credentials.",
    };
  }

  const [{ data: profile }, roleKeys] = await Promise.all([
    supabase.from("profiles").select("is_active").eq("id", data.user.id).maybeSingle(),
    getRoleKeysForProfile(data.user.id, supabase),
  ]);

  if (profile && !profile.is_active) {
    await supabase.auth.signOut();

    return {
      error: "This internal account is inactive. Contact a super admin for help.",
    };
  }

  if (!roleKeys.some((roleKey) => INTERNAL_ROLE_KEYS.includes(roleKey))) {
    await supabase.auth.signOut();

    return {
      error: "This account does not have internal access.",
    };
  }

  redirect(nextPath);
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}

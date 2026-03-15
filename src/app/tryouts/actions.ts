"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type TryoutRegistrationActionState = {
  status: "idle" | "success" | "error";
  message: string | null;
};

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getBirthYearValue(value: string) {
  if (!/^\d{4}$/.test(value)) {
    return null;
  }

  const birthYear = Number(value);

  if (!Number.isInteger(birthYear) || birthYear < 2000 || birthYear > 2100) {
    return null;
  }

  return birthYear;
}

export async function submitTryoutRegistration(
  _previousState: TryoutRegistrationActionState,
  formData: FormData,
): Promise<TryoutRegistrationActionState> {
  const tryoutId = getStringValue(formData, "tryoutId");
  const playerFirstName = getStringValue(formData, "playerFirstName");
  const playerLastName = getStringValue(formData, "playerLastName");
  const birthYearValue = getStringValue(formData, "birthYear");
  const parentName = getStringValue(formData, "parentName");
  const parentEmail = getStringValue(formData, "parentEmail");
  const parentPhone = getStringValue(formData, "parentPhone");
  const notes = getStringValue(formData, "notes");

  const birthYear = getBirthYearValue(birthYearValue);
  const hasRequiredFields =
    Boolean(tryoutId) &&
    Boolean(playerFirstName) &&
    Boolean(playerLastName) &&
    Boolean(parentName) &&
    Boolean(parentEmail) &&
    Boolean(parentPhone) &&
    birthYear !== null;

  if (!hasRequiredFields) {
    return {
      status: "error",
      message: "Please complete the required registration fields before submitting.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentEmail)) {
    return {
      status: "error",
      message: "Enter a valid parent or guardian email address.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const { data: tryout, error: tryoutError } = await supabase
    .from("tryouts")
    .select("id")
    .eq("id", tryoutId)
    .eq("is_public", true)
    .maybeSingle();

  if (tryoutError || !tryout) {
    return {
      status: "error",
      message: "That tryout is no longer available for online registration. Please refresh the page and try again.",
    };
  }

  const { error } = await supabase.from("tryout_registrations").insert({
    tryout_id: tryoutId,
    player_first_name: playerFirstName,
    player_last_name: playerLastName,
    birth_year: birthYear,
    parent_name: parentName,
    parent_email: parentEmail,
    parent_phone: parentPhone,
    notes: notes || null,
    current_club: null,
  });

  if (error) {
    return {
      status: "error",
      message: "We couldn't submit the registration right now. Please try again in a moment.",
    };
  }

  return {
    status: "success",
    message: "Registration submitted successfully. The club can now review this tryout entry in Supabase.",
  };
}

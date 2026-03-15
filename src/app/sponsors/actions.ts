"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type SponsorInquiryActionState = {
  status: "idle" | "success" | "error";
  message: string | null;
};

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitSponsorInquiry(
  _previousState: SponsorInquiryActionState,
  formData: FormData,
): Promise<SponsorInquiryActionState> {
  const businessName = getStringValue(formData, "businessName");
  const contactName = getStringValue(formData, "contactName");
  const email = getStringValue(formData, "email");
  const phone = getStringValue(formData, "phone");
  const interest = getStringValue(formData, "interest");
  const message = getStringValue(formData, "message");

  const hasRequiredFields =
    Boolean(businessName) &&
    Boolean(contactName) &&
    Boolean(email) &&
    Boolean(interest) &&
    Boolean(message);

  if (!hasRequiredFields) {
    return {
      status: "error",
      message: "Please complete the required sponsor inquiry fields before submitting.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: "error",
      message: "Enter a valid email address for follow-up.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("sponsor_inquiries").insert({
    business_name: businessName,
    contact_name: contactName,
    email,
    phone: phone || null,
    interest,
    message,
  });

  if (error) {
    return {
      status: "error",
      message: "We couldn't submit your inquiry right now. Please try again in a moment.",
    };
  }

  return {
    status: "success",
    message: "Sponsor inquiry submitted successfully. The club can now review this lead in the dashboard later.",
  };
}

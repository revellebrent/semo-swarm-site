"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { sponsorTiers } from "@/data/sponsors";

type SponsorInquiryFormState = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

type SponsorInquiryFormErrors = Partial<Record<keyof SponsorInquiryFormState, string>>;

const initialState: SponsorInquiryFormState = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
};

export function SponsorInquiryForm() {
  const [formState, setFormState] = useState<SponsorInquiryFormState>(initialState);
  const [errors, setErrors] = useState<SponsorInquiryFormErrors>({});
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tierOptions = useMemo(
    () => [
      ...sponsorTiers.map((tier) => ({ label: tier.name, value: tier.id })),
      { label: "Custom Partnership", value: "custom" },
    ],
    [],
  );

  function updateField<Key extends keyof SponsorInquiryFormState>(key: Key, value: string) {
    setFormState((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitState("idle");
  }

  function validate(values: SponsorInquiryFormState) {
    const nextErrors: SponsorInquiryFormErrors = {};

    if (!values.businessName.trim()) {
      nextErrors.businessName = "Business name is required.";
    }

    if (!values.contactName.trim()) {
      nextErrors.contactName = "Primary contact is required.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!values.interest.trim()) {
      nextErrors.interest = "Please select a sponsorship interest.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "A short message is required.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(formState);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitState("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitState("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setSubmitState("success");
      setErrors({});
      setFormState(initialState);
    } catch {
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          id="businessName"
          label="Business Name"
          value={formState.businessName}
          onChange={(event) => updateField("businessName", event.target.value)}
          placeholder="Enter your business or organization name"
          required
          error={errors.businessName}
        />
        <FormField
          id="contactName"
          label="Primary Contact"
          value={formState.contactName}
          onChange={(event) => updateField("contactName", event.target.value)}
          placeholder="Enter the main contact name"
          required
          error={errors.contactName}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          id="email"
          label="Email Address"
          value={formState.email}
          onChange={(event) => updateField("email", event.target.value)}
          type="email"
          placeholder="Enter the best email for follow-up"
          required
          error={errors.email}
        />
        <FormField
          id="phone"
          label="Phone Number"
          value={formState.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          type="tel"
          placeholder="Optional phone number"
        />
      </div>

      <FormField
        id="interest"
        label="Sponsorship Interest"
        value={formState.interest}
        onChange={(event) => updateField("interest", event.target.value)}
        fieldType="select"
        placeholder="Select a sponsor tier"
        options={tierOptions}
        required
        error={errors.interest}
        helperText="This can later map directly to a sponsor inquiry record or CRM workflow."
      />

      <FormField
        id="message"
        label="Message"
        value={formState.message}
        onChange={(event) => updateField("message", event.target.value)}
        fieldType="textarea"
        placeholder="Tell the club about your goals, preferred sponsorship level, or partnership ideas."
        required
        error={errors.message}
      />

      {submitState === "success" ? (
        <div className="rounded-[1.4rem] border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          Sponsor inquiry placeholder submitted successfully. This form is ready for a future Supabase or API route connection.
        </div>
      ) : null}

      {submitState === "error" && Object.keys(errors).length > 0 ? (
        <div className="rounded-[1.4rem] border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          Please complete the required fields before submitting.
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </Button>
        <p className="text-sm text-slate-400">Front-end only for now. No inquiry is being stored yet.</p>
      </div>
    </form>
  );
}

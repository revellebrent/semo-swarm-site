"use client";

import type { FormEvent } from "react";
import { useMemo, useState, useTransition } from "react";

import { submitSponsorInquiry, type SponsorInquiryActionState } from "@/app/sponsors/actions";
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

const initialActionState: SponsorInquiryActionState = {
  status: "idle",
  message: null,
};

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" size="lg" disabled={isPending}>
      {isPending ? "Submitting..." : "Submit Inquiry"}
    </Button>
  );
}

export function SponsorInquiryForm() {
  const [formState, setFormState] = useState<SponsorInquiryFormState>(initialState);
  const [errors, setErrors] = useState<SponsorInquiryFormErrors>({});
  const [actionState, setActionState] = useState<SponsorInquiryActionState>(initialActionState);
  const [isPending, startTransition] = useTransition();

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
    if (actionState.status !== "idle") {
      setActionState(initialActionState);
    }
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(formState);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setActionState({
        status: "error",
        message: "Please complete the required fields before submitting.",
      });
      return;
    }

    const submissionData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await submitSponsorInquiry(initialActionState, submissionData);
      setActionState(result);

      if (result.status === "success") {
        setErrors({});
        setFormState(initialState);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          id="businessName"
          name="businessName"
          label="Business Name"
          value={formState.businessName}
          onChange={(event) => updateField("businessName", event.target.value)}
          placeholder="Enter your business or organization name"
          required
          error={errors.businessName}
        />
        <FormField
          id="contactName"
          name="contactName"
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
          name="email"
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
          name="phone"
          label="Phone Number"
          value={formState.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          type="tel"
          placeholder="Optional phone number"
        />
      </div>

      <FormField
        id="interest"
        name="interest"
        label="Sponsorship Interest"
        value={formState.interest}
        onChange={(event) => updateField("interest", event.target.value)}
        fieldType="select"
        placeholder="Select a sponsor tier"
        options={tierOptions}
        required
        error={errors.interest}
        helperText="This inquiry is stored in Supabase so admins can review it later."
      />

      <FormField
        id="message"
        name="message"
        label="Message"
        value={formState.message}
        onChange={(event) => updateField("message", event.target.value)}
        fieldType="textarea"
        placeholder="Tell the club about your goals, preferred sponsorship level, or partnership ideas."
        required
        error={errors.message}
      />

      {actionState.status === "success" ? (
        <div className="rounded-[1.4rem] border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {actionState.message}
        </div>
      ) : null}

      {Object.keys(errors).length > 0 ? (
        <div className="rounded-[1.4rem] border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          Please complete the required fields before submitting.
        </div>
      ) : null}

      {actionState.status === "error" && actionState.message ? (
        <div className="rounded-[1.4rem] border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {actionState.message}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <SubmitButton isPending={isPending} />
        <p className="text-sm text-slate-400">Sponsor leads now submit directly into the club&apos;s Supabase inquiry table.</p>
      </div>
    </form>
  );
}

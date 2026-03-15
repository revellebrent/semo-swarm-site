"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { clubWideTryoutPrograms, independentCoachTryouts } from "@/data/tryouts";

type TryoutRegistrationFormState = {
  tryoutId: string;
  playerName: string;
  birthYear: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  notes: string;
};

type TryoutRegistrationFormErrors = Partial<Record<keyof TryoutRegistrationFormState, string>>;

const initialState: TryoutRegistrationFormState = {
  tryoutId: "",
  playerName: "",
  birthYear: "",
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  notes: "",
};

export function TryoutRegistrationForm() {
  const [formState, setFormState] = useState<TryoutRegistrationFormState>(initialState);
  const [errors, setErrors] = useState<TryoutRegistrationFormErrors>({});
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tryoutOptions = useMemo(
    () => [
      ...clubWideTryoutPrograms.map((program) => ({
        label: `${program.title} | ${program.ageGroup}`,
        value: program.id,
      })),
      ...independentCoachTryouts.map((program) => ({
        label: `${program.program} | ${program.ageFocus}`,
        value: program.id,
      })),
    ],
    [],
  );

  function updateField<Key extends keyof TryoutRegistrationFormState>(key: Key, value: string) {
    setFormState((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitState("idle");
  }

  function validate(values: TryoutRegistrationFormState) {
    const nextErrors: TryoutRegistrationFormErrors = {};

    if (!values.tryoutId.trim()) {
      nextErrors.tryoutId = "Please choose a tryout or evaluation option.";
    }

    if (!values.playerName.trim()) {
      nextErrors.playerName = "Player name is required.";
    }

    if (!values.birthYear.trim()) {
      nextErrors.birthYear = "Birth year is required.";
    } else if (!/^\d{4}$/.test(values.birthYear.trim())) {
      nextErrors.birthYear = "Enter a valid four-digit birth year.";
    }

    if (!values.parentName.trim()) {
      nextErrors.parentName = "Parent or guardian name is required.";
    }

    if (!values.parentEmail.trim()) {
      nextErrors.parentEmail = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.parentEmail.trim())) {
      nextErrors.parentEmail = "Enter a valid email address.";
    }

    if (!values.parentPhone.trim()) {
      nextErrors.parentPhone = "Phone number is required.";
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
          id="tryoutId"
          label="Tryout Selection"
          value={formState.tryoutId}
          onChange={(event) => updateField("tryoutId", event.target.value)}
          fieldType="select"
          placeholder="Select a tryout path"
          options={tryoutOptions}
          required
          error={errors.tryoutId}
        />
        <FormField
          id="birthYear"
          label="Player Birth Year"
          value={formState.birthYear}
          onChange={(event) => updateField("birthYear", event.target.value)}
          type="number"
          placeholder="Example: 2013"
          required
          error={errors.birthYear}
          helperText="This can later map directly into a Supabase table or API payload."
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          id="playerName"
          label="Player Name"
          value={formState.playerName}
          onChange={(event) => updateField("playerName", event.target.value)}
          placeholder="Enter player full name"
          required
          error={errors.playerName}
        />
        <FormField
          id="parentName"
          label="Parent Or Guardian Name"
          value={formState.parentName}
          onChange={(event) => updateField("parentName", event.target.value)}
          placeholder="Enter parent or guardian name"
          required
          error={errors.parentName}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          id="parentEmail"
          label="Parent Email"
          value={formState.parentEmail}
          onChange={(event) => updateField("parentEmail", event.target.value)}
          type="email"
          placeholder="Enter best email for follow-up"
          required
          error={errors.parentEmail}
        />
        <FormField
          id="parentPhone"
          label="Parent Phone"
          value={formState.parentPhone}
          onChange={(event) => updateField("parentPhone", event.target.value)}
          type="tel"
          placeholder="Enter best phone number"
          required
          error={errors.parentPhone}
        />
      </div>

      <FormField
        id="notes"
        label="Player Notes"
        value={formState.notes}
        onChange={(event) => updateField("notes", event.target.value)}
        fieldType="textarea"
        placeholder="Share current team, experience level, or anything the club should know."
        helperText="Optional notes can later be stored as registration metadata."
      />

      {submitState === "success" ? (
        <div className="rounded-[1.4rem] border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          Registration placeholder submitted successfully. This form is ready to connect to Supabase or an API route next.
        </div>
      ) : null}

      {submitState === "error" && Object.keys(errors).length > 0 ? (
        <div className="rounded-[1.4rem] border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          Please fix the required fields before submitting.
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </Button>
        <p className="text-sm text-slate-400">Front-end only for now. No data is being saved yet.</p>
      </div>
    </form>
  );
}

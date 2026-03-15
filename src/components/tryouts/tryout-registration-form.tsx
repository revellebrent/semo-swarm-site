"use client";

import type { FormEvent } from "react";
import { useMemo, useState, useTransition } from "react";

import { FormField } from "@/components/forms/form-field";
import { submitTryoutRegistration, type TryoutRegistrationActionState } from "@/app/tryouts/actions";
import { Button } from "@/components/ui/button";
import type { IndependentTryout, TryoutProgram } from "@/types/site";

type TryoutRegistrationFormState = {
  tryoutId: string;
  playerFirstName: string;
  playerLastName: string;
  birthYear: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  notes: string;
};

type TryoutRegistrationFormErrors = Partial<Record<keyof TryoutRegistrationFormState, string>>;

const initialState: TryoutRegistrationFormState = {
  tryoutId: "",
  playerFirstName: "",
  playerLastName: "",
  birthYear: "",
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  notes: "",
};

type TryoutRegistrationFormProps = {
  clubWideTryoutPrograms: TryoutProgram[];
  independentCoachTryouts: IndependentTryout[];
};

const initialActionState: TryoutRegistrationActionState = {
  status: "idle",
  message: null,
};

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" size="lg" disabled={isPending}>
      {isPending ? "Submitting..." : "Submit Registration"}
    </Button>
  );
}

export function TryoutRegistrationForm({
  clubWideTryoutPrograms,
  independentCoachTryouts,
}: TryoutRegistrationFormProps) {
  const [formState, setFormState] = useState<TryoutRegistrationFormState>(initialState);
  const [errors, setErrors] = useState<TryoutRegistrationFormErrors>({});
  const [actionState, setActionState] = useState<TryoutRegistrationActionState>(initialActionState);
  const [isPending, startTransition] = useTransition();

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
    [clubWideTryoutPrograms, independentCoachTryouts],
  );
  const hasTryoutOptions = tryoutOptions.length > 0;

  function updateField<Key extends keyof TryoutRegistrationFormState>(key: Key, value: string) {
    setFormState((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (actionState.status !== "idle") {
      setActionState(initialActionState);
    }
  }

  function validate(values: TryoutRegistrationFormState) {
    const nextErrors: TryoutRegistrationFormErrors = {};

    if (!values.tryoutId.trim()) {
      nextErrors.tryoutId = "Please choose a tryout or evaluation option.";
    }

    if (!values.playerFirstName.trim()) {
      nextErrors.playerFirstName = "Player first name is required.";
    }

    if (!values.playerLastName.trim()) {
      nextErrors.playerLastName = "Player last name is required.";
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasTryoutOptions) {
      setActionState({
        status: "error",
        message: "No public tryouts are available for registration yet.",
      });
      return;
    }

    const nextErrors = validate(formState);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setActionState({
        status: "error",
        message: "Please complete the required registration fields before submitting.",
      });
      return;
    }

    const submissionData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await submitTryoutRegistration(initialActionState, submissionData);
      setActionState(result);

      if (result.status === "success") {
        setErrors({});
        setFormState(initialState);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!hasTryoutOptions ? (
        <div className="rounded-[1.4rem] border border-dashed border-white/15 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-300">
          No public tryouts are open for registration yet. Families can still contact the club below for placement guidance while new sessions are being posted.
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          id="tryoutId"
          name="tryoutId"
          label="Tryout Selection"
          value={formState.tryoutId}
          onChange={(event) => updateField("tryoutId", event.target.value)}
          fieldType="select"
          placeholder="Select a tryout path"
          options={tryoutOptions}
          required
          error={errors.tryoutId}
          disabled={!hasTryoutOptions || isPending}
        />
        <FormField
          id="birthYear"
          name="birthYear"
          label="Player Birth Year"
          value={formState.birthYear}
          onChange={(event) => updateField("birthYear", event.target.value)}
          type="number"
          placeholder="Example: 2013"
          required
          error={errors.birthYear}
          helperText="This is submitted directly to the tryout registration record in Supabase."
          disabled={!hasTryoutOptions || isPending}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          id="playerFirstName"
          name="playerFirstName"
          label="Player First Name"
          value={formState.playerFirstName}
          onChange={(event) => updateField("playerFirstName", event.target.value)}
          placeholder="Enter player first name"
          required
          error={errors.playerFirstName}
          disabled={!hasTryoutOptions || isPending}
        />
        <FormField
          id="playerLastName"
          name="playerLastName"
          label="Player Last Name"
          value={formState.playerLastName}
          onChange={(event) => updateField("playerLastName", event.target.value)}
          placeholder="Enter player last name"
          required
          error={errors.playerLastName}
          disabled={!hasTryoutOptions || isPending}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          id="parentName"
          name="parentName"
          label="Parent Or Guardian Name"
          value={formState.parentName}
          onChange={(event) => updateField("parentName", event.target.value)}
          placeholder="Enter parent or guardian name"
          required
          error={errors.parentName}
          disabled={!hasTryoutOptions || isPending}
        />
        <FormField
          id="parentEmail"
          name="parentEmail"
          label="Parent Email"
          value={formState.parentEmail}
          onChange={(event) => updateField("parentEmail", event.target.value)}
          type="email"
          placeholder="Enter best email for follow-up"
          required
          error={errors.parentEmail}
          disabled={!hasTryoutOptions || isPending}
        />
        <FormField
          id="parentPhone"
          name="parentPhone"
          label="Parent Phone"
          value={formState.parentPhone}
          onChange={(event) => updateField("parentPhone", event.target.value)}
          type="tel"
          placeholder="Enter best phone number"
          required
          error={errors.parentPhone}
          disabled={!hasTryoutOptions || isPending}
        />
      </div>

      <FormField
        id="notes"
        name="notes"
        label="Player Notes"
        value={formState.notes}
        onChange={(event) => updateField("notes", event.target.value)}
        fieldType="textarea"
        placeholder="Share current team, experience level, or anything the club should know."
        helperText="Optional notes are stored with the Supabase registration record."
        disabled={!hasTryoutOptions || isPending}
      />

      {actionState.message ? (
        <div
          aria-live="polite"
          className={[
            "rounded-[1.4rem] px-4 py-3 text-sm",
            actionState.status === "success"
              ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
              : "border border-rose-400/25 bg-rose-400/10 text-rose-200",
          ].join(" ")}
        >
          {actionState.message}
        </div>
      ) : Object.keys(errors).length > 0 ? (
        <div
          aria-live="polite"
          className="rounded-[1.4rem] border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
        >
          Please fix the required fields before submitting.
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        {hasTryoutOptions ? <SubmitButton isPending={isPending} /> : null}
        <p className="text-sm text-slate-400">Registrations now submit directly into the club&apos;s Supabase table.</p>
      </div>
    </form>
  );
}

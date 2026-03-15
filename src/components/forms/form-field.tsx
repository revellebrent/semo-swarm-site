"use client";

import type { ChangeEvent } from "react";

type FormFieldOption = {
  label: string;
  value: string;
};

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  type?: "text" | "email" | "tel" | "number";
  fieldType?: "input" | "textarea" | "select";
  rows?: number;
  options?: FormFieldOption[];
  helperText?: string;
};

const baseClasses =
  "mt-3 w-full rounded-[1.35rem] border bg-slate-950/70 px-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-500 transition focus:outline-none";

export function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  type = "text",
  fieldType = "input",
  rows = 5,
  options = [],
  helperText,
}: FormFieldProps) {
  const fieldClasses = [
    baseClasses,
    error
      ? "border-rose-400/60 focus:border-rose-300"
      : "border-white/10 focus:border-amber-300/50",
  ].join(" ");

  return (
    <label htmlFor={id} className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
        {required ? " *" : ""}
      </span>

      {fieldType === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`${fieldClasses} resize-none`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        />
      ) : null}

      {fieldType === "select" ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={fieldClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        >
          <option value="">{placeholder ?? "Select an option"}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {fieldType === "input" ? (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={fieldClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        />
      ) : null}

      {helperText && !error ? (
        <p id={`${id}-helper`} className="mt-2 text-xs leading-6 text-slate-500">
          {helperText}
        </p>
      ) : null}

      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs font-medium text-rose-300">
          {error}
        </p>
      ) : null}
    </label>
  );
}

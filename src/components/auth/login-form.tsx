"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { signInAction, type LoginActionState } from "@/app/login/actions";

type LoginFormProps = {
  nextPath: string;
};

const initialState: LoginActionState = {
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full border border-amber-300/40 bg-amber-300 px-6 py-3.5 text-base font-semibold text-slate-950 shadow-[0_12px_30px_rgba(245,158,11,0.25)] transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Signing In..." : "Sign In"}
    </button>
  );
}

export function LoginForm({ nextPath }: LoginFormProps) {
  const [state, formAction] = useActionState(signInAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={nextPath} />

      <label htmlFor="email" className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Email Address
        </span>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-3 w-full rounded-[1.35rem] border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-amber-300/50 focus:outline-none"
          placeholder="Enter your internal account email"
        />
      </label>

      <label htmlFor="password" className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Password
        </span>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-3 w-full rounded-[1.35rem] border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-amber-300/50 focus:outline-none"
          placeholder="Enter your password"
        />
      </label>

      {state.error ? (
        <div className="rounded-[1.4rem] border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {state.error}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <SubmitButton />
        <p className="text-sm text-slate-400">Internal access only for super admins, club admins, and coaches.</p>
      </div>
    </form>
  );
}

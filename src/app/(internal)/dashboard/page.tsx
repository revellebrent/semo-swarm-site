import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Dashboard",
  description: "Protected internal dashboard foundation for Semo Swarm admins and coaches.",
  path: "/dashboard",
});

export default function DashboardPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <article className="rounded-[1.8rem] border border-white/10 bg-slate-950/55 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Phase 2</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Auth foundation is ready.</h2>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          This page confirms the protected route pattern is working. Future club dashboards can now live under this internal route group.
        </p>
      </article>

      <article className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">What comes next</h2>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Admin and coach tools can be added here without changing the auth foundation, middleware setup, or role guard pattern.
        </p>
      </article>

      <article className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Current scope</h2>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Login, session refresh, and protected routing are in place. Public sign-up and full dashboard modules are intentionally not built yet.
        </p>
      </article>
    </div>
  );
}

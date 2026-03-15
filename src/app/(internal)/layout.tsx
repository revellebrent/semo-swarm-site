import Link from "next/link";

import { signOutAction } from "@/app/login/actions";
import { InternalNav } from "@/components/dashboard/internal-nav";
import { requireInternalUser } from "@/lib/auth/server";

export default async function InternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authContext = await requireInternalUser();
  const fullName = [authContext.profile?.first_name, authContext.profile?.last_name].filter(Boolean).join(" ");
  const displayName =
    authContext.profile?.display_name ??
    fullName ||
    authContext.user.email ??
    "Internal User";

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start">
        <aside className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.07),_rgba(255,255,255,0.03))] p-5 sm:p-6 lg:sticky lg:top-24">
          <div className="border-b border-white/10 pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Semo Swarm</p>
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">Internal Dashboard</h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Protected workspace for club operations, content, and registration workflows.
            </p>
          </div>

          <div className="mt-5">
            <InternalNav roleKeys={authContext.roleKeys} />
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Signed In As</p>
            <p className="mt-2 text-lg font-semibold text-white">{displayName}</p>
            <p className="mt-1 text-sm text-slate-400">{authContext.user.email}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {authContext.roleKeys.map((roleKey) => (
                <span
                  key={roleKey}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-200"
                >
                  {roleKey.replace("_", " ")}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Protected Route</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Club management shell for future admin tools.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                The structure is role-aware and ready for team, tryout, sponsor, announcement, and registration modules as those workflows move into the dashboard.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back To Site
              </Link>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-300/15"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>

          <div className="pt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

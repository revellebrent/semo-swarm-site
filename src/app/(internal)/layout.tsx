import { signOutAction } from "@/app/login/actions";
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
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Internal Portal</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Welcome back, {displayName}
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              This protected route group is the foundation for future dashboards and internal tools.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {authContext.roleKeys.map((roleKey) => (
              <span
                key={roleKey}
                className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200"
              >
                {roleKey.replace("_", " ")}
              </span>
            ))}

            <form action={signOutAction}>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8">{children}</div>
      </div>
    </section>
  );
}

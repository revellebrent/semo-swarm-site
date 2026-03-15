import type { RoleKey } from "@/types/models";

type DashboardSectionCardProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  plannedActions: string[];
  allowedRoles: RoleKey[];
  roleKeys: RoleKey[];
  accent?: "default" | "highlight";
};

function formatRoleLabel(roleKey: RoleKey) {
  return roleKey.replace("_", " ");
}

export function DashboardSectionCard({
  id,
  eyebrow,
  title,
  description,
  plannedActions,
  allowedRoles,
  roleKeys,
  accent = "default",
}: DashboardSectionCardProps) {
  const hasAccess = roleKeys.some((roleKey) => allowedRoles.includes(roleKey));

  return (
    <section
      id={id}
      className={[
        "scroll-mt-28 rounded-[1.9rem] border p-6 sm:p-7",
        accent === "highlight"
          ? "border-amber-300/20 bg-[linear-gradient(180deg,_rgba(245,158,11,0.12),_rgba(255,255,255,0.04))]"
          : "border-white/10 bg-white/5",
      ].join(" ")}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">{eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <span
            className={[
              "inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]",
              hasAccess
                ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                : "border-white/10 bg-slate-950/60 text-slate-400",
            ].join(" ")}
          >
            {hasAccess ? "Available To You" : "Admin-Managed"}
          </span>
          <p className="text-xs leading-6 text-slate-400">
            Access: {allowedRoles.map(formatRoleLabel).join(", ")}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {plannedActions.map((action) => (
          <div key={action} className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
            <p className="text-sm leading-7 text-slate-200">{action}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

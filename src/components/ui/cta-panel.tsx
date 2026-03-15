import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

type CtaAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
};

type CtaPanelProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions: CtaAction[];
  aside?: ReactNode;
  className?: string;
};

export function CtaPanel({
  eyebrow,
  title,
  description,
  actions,
  aside,
  className = "",
}: CtaPanelProps) {
  return (
    <section
      className={[
        "rounded-[2rem] border border-amber-300/20 bg-[linear-gradient(135deg,_rgba(245,158,11,0.18),_rgba(255,255,255,0.03))] p-8 sm:p-10",
        className,
      ].join(" ")}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">{eyebrow}</p>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{title}</h2>
          <p className="text-base leading-8 text-slate-200">{description}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {actions.map((action) => (
            <Button key={`${action.href}-${action.label}`} href={action.href} variant={action.variant}>
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {aside ? <div className="mt-6">{aside}</div> : null}
    </section>
  );
}

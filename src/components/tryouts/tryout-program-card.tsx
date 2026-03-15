import { Button } from "@/components/ui/button";
import type { TryoutProgram } from "@/types/site";

type TryoutProgramCardProps = {
  program: TryoutProgram;
};

export function TryoutProgramCard({ program }: TryoutProgramCardProps) {
  return (
    <article className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{program.ageGroup}</p>
        <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
          {program.format}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-white">{program.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{program.description}</p>

      <dl className="mt-6 grid gap-3 text-sm text-slate-400">
        <div>
          <dt className="font-semibold text-white">Dates</dt>
          <dd>{program.dates}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Location</dt>
          <dd>{program.location}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <Button href={program.registrationHref} variant="secondary">
          {program.registrationLabel}
        </Button>
      </div>
    </article>
  );
}

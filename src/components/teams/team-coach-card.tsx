import type { TeamCoach } from "@/types/site";

type TeamCoachCardProps = {
  coach: TeamCoach;
};

export function TeamCoachCard({ coach }: TeamCoachCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-amber-300">{coach.role}</p>
      <h3 className="mt-3 text-2xl font-semibold text-white">{coach.name}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{coach.bio}</p>
      <div className="mt-5 grid gap-2 text-sm text-slate-400">
        <p>Specialty: {coach.specialty}</p>
        <p>License: {coach.license}</p>
        {coach.email ? <p>Email: {coach.email}</p> : null}
      </div>
    </article>
  );
}

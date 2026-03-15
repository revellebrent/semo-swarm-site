import type { CoachDashboardTeam } from "@/lib/dashboard/coach";

type CoachTeamCardProps = {
  team: CoachDashboardTeam;
};

export function CoachTeamCard({ team }: CoachTeamCardProps) {
  return (
    <article className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
        {team.ageGroup} | {team.level}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">{team.name}</h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Announcements</p>
          <p className="mt-2 text-2xl font-semibold text-white">{team.announcementCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Tryouts</p>
          <p className="mt-2 text-2xl font-semibold text-white">{team.tryoutCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Registrations</p>
          <p className="mt-2 text-2xl font-semibold text-white">{team.registrationCount}</p>
        </div>
      </div>
    </article>
  );
}

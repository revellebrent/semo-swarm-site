import { Button } from "@/components/ui/button";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import type { Team } from "@/types/site";

type TeamCardProps = {
  team: Team;
};

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card className="h-full">
      <div className="flex items-center justify-between gap-4">
        <CardEyebrow className="text-sm tracking-[0.2em]">{team.ageGroup}</CardEyebrow>
        <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
          {team.level}
        </span>
      </div>
      <CardTitle className="mt-4">{team.name}</CardTitle>
      <p className="mt-3 text-sm leading-7 text-slate-300">{team.summary}</p>

      <dl className="mt-6 grid gap-4 text-sm text-slate-400">
        <div>
          <dt className="font-semibold text-white">Focus</dt>
          <dd>{team.focus}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Practice Base</dt>
          <dd>{team.practice.location}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Lead Coach</dt>
          <dd>{team.coaches[0]?.name}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <Button href={`/teams/${team.slug}`} variant="secondary">
          Open Team Page
        </Button>
      </div>
    </Card>
  );
}

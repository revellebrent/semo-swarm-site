import { Button } from "@/components/ui/button";
import { homeHero } from "@/data/site";

export function HomeHero() {
  return (
    <header className="relative overflow-hidden border-b border-white/10 px-5 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,_#08101d_0%,_#0e1830_42%,_#070b14_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_15%_20%,_rgba(245,158,11,0.22),_transparent_25%),radial-gradient(circle_at_85%_10%,_rgba(59,130,246,0.18),_transparent_26%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-amber-300">{homeHero.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
            {homeHero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            {homeHero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {homeHero.actions?.map((action) => (
              <Button key={action.href} href={action.href} variant={action.variant}>
                {action.label}
              </Button>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {homeHero.stats?.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle,_rgba(245,158,11,0.22),_transparent_58%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.03))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Matchday Standard</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Club culture you can feel on arrival.</h2>
              </div>
              <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                Swarm FC
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {[
                "Technical training blocks with purpose-built session progressions",
                "Competitive teams with a clear identity in and out of possession",
                "A polished family experience ready to scale with the club",
              ].map((item, index) => (
                <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-200">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-amber-300/15 bg-amber-300/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">Club Focus</p>
              <p className="mt-3 text-sm leading-7 text-slate-100">
                Building a premium soccer environment in Southeast Missouri for players who want serious development and families who value professionalism.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

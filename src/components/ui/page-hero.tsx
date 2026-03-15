import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { HeroContent } from "@/types/site";

type PageHeroProps = {
  content: HeroContent;
};

export function PageHero({ content }: PageHeroProps) {
  const isCentered = content.align === "center";

  return (
    <header className="overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.22),_transparent_30%),radial-gradient(circle_at_85%_10%,_rgba(59,130,246,0.14),_transparent_25%),linear-gradient(180deg,_#08101d_0%,_#0b1324_55%,_#070b14_100%)] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className={`mx-auto max-w-7xl ${isCentered ? "text-center" : ""}`}>
        <div className={`max-w-4xl space-y-6 ${isCentered ? "mx-auto" : ""}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">{content.eyebrow}</p>
          <h1 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            {content.description}
          </p>
          {content.actions ? (
            <div className={`flex flex-wrap gap-3 pt-1 ${isCentered ? "justify-center" : ""}`}>
              {content.actions.map((action) => (
                <Button key={action.href} href={action.href} variant={action.variant} size="lg">
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>

        {content.stats?.length ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {content.stats.map((stat) => (
              <Card key={stat.label} className="text-left" tone="elevated">
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
              </Card>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}

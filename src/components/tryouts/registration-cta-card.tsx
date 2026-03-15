import { Button } from "@/components/ui/button";
import type { RegistrationCard } from "@/types/site";

type RegistrationCtaCardProps = {
  card: RegistrationCard;
};

export function RegistrationCtaCard({ card }: RegistrationCtaCardProps) {
  return (
    <article className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.03))] p-6">
      <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
      <div className="mt-6">
        <Button href={card.href} variant={card.variant === "secondary" ? "secondary" : "primary"}>
          {card.ctaLabel}
        </Button>
      </div>
    </article>
  );
}

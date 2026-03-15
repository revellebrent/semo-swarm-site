import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "elevated" | "accent" | "dark";
};

const toneClasses: Record<NonNullable<CardProps["tone"]>, string> = {
  default: "border-white/10 bg-white/5",
  elevated: "border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.07),_rgba(255,255,255,0.03))]",
  accent: "border-amber-300/20 bg-[linear-gradient(135deg,_rgba(245,158,11,0.18),_rgba(255,255,255,0.03))]",
  dark: "border-white/10 bg-slate-950/70",
};

export function Card({ children, className = "", tone = "default" }: CardProps) {
  return (
    <article
      className={[
        "rounded-[1.85rem] border p-6 shadow-[0_18px_50px_rgba(0,0,0,0.16)]",
        toneClasses[tone],
        className,
      ].join(" ")}
    >
      {children}
    </article>
  );
}

type CardTitleProps = {
  children: ReactNode;
  className?: string;
};

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return <h3 className={`text-2xl font-semibold text-white ${className}`.trim()}>{children}</h3>;
}

type CardEyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function CardEyebrow({ children, className = "" }: CardEyebrowProps) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.28em] text-amber-300 ${className}`.trim()}>
      {children}
    </p>
  );
}

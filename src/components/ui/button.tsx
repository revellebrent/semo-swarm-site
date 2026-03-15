import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-amber-300 text-slate-950 hover:bg-amber-200",
  secondary: "border border-white/15 bg-white/5 text-white hover:bg-white/10",
  ghost: "text-slate-200 hover:text-white",
};

export function Button({ href, children, variant = "primary" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
        variantClasses[variant],
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

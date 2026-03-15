import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type SharedButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

type LinkButtonProps = SharedButtonProps & {
  href: string;
  type?: never;
  disabled?: never;
  onClick?: never;
};

type NativeButtonProps = SharedButtonProps & {
  href?: undefined;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border border-amber-300/40 bg-amber-300 text-slate-950 shadow-[0_12px_30px_rgba(245,158,11,0.25)] hover:bg-amber-200",
  secondary: "border border-white/15 bg-white/5 text-white hover:bg-white/10",
  ghost: "border border-transparent text-slate-200 hover:border-white/10 hover:bg-white/5 hover:text-white",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-full font-semibold tracking-[0.01em] transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  if ("href" in props && props.href) {
    const { href } = props;

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type, disabled, onClick } = props as NativeButtonProps;

  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}

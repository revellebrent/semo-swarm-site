import type { ReactNode } from "react";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
  width?: "default" | "narrow";
};

const widthClasses: Record<NonNullable<SectionWrapperProps["width"]>, string> = {
  default: "max-w-7xl",
  narrow: "max-w-5xl",
};

export function SectionWrapper({
  children,
  className = "",
  id,
  containerClassName = "",
  width = "default",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${className}`.trim()}>
      <div className={`mx-auto ${widthClasses[width]} ${containerClassName}`.trim()}>{children}</div>
    </section>
  );
}

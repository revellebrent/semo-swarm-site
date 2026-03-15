import type { ReactNode } from "react";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function SectionWrapper({ children, className = "", id }: SectionWrapperProps) {
  return (
    <section id={id} className={`px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${className}`.trim()}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

import type { ContactFormField } from "@/types/site";

type ContactFormFieldProps = {
  field: ContactFormField;
};

export function ContactFormField({ field }: ContactFormFieldProps) {
  const baseClasses =
    "mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-amber-300/40 focus:outline-none";

  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{field.label}</span>
      {field.type === "textarea" ? (
        <textarea className={`${baseClasses} min-h-32 resize-none`} placeholder={field.placeholder} />
      ) : (
        <input className={baseClasses} type={field.type ?? "text"} placeholder={field.placeholder} />
      )}
    </label>
  );
}

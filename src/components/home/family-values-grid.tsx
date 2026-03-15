import { familyValues } from "@/data/site";

export function FamilyValuesGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {familyValues.map((value, index) => (
        <article
          key={value.title}
          className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.03))] p-6"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-300 text-sm font-bold text-slate-950">
              0{index + 1}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{value.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{value.description}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

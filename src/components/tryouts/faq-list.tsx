import type { TryoutFaq } from "@/types/site";

type FaqListProps = {
  items: TryoutFaq[];
};

export function FaqList({ items }: FaqListProps) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <details key={item.id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <summary className="cursor-pointer list-none text-lg font-semibold text-white marker:content-none">
            {item.question}
          </summary>
          <p className="mt-4 text-sm leading-7 text-slate-300">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

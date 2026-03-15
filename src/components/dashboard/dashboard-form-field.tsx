type Option = {
  label: string;
  value: string;
};

type DashboardFormFieldProps = {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  type?: "text" | "url" | "date";
  fieldType?: "input" | "textarea" | "select";
  rows?: number;
  options?: Option[];
};

const baseClasses =
  "mt-3 w-full rounded-[1.2rem] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-amber-300/50 focus:outline-none";

export function DashboardFormField({
  id,
  name,
  label,
  defaultValue = "",
  placeholder,
  required = false,
  helperText,
  type = "text",
  fieldType = "input",
  rows = 4,
  options = [],
}: DashboardFormFieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
        {required ? " *" : ""}
      </span>

      {fieldType === "textarea" ? (
        <textarea
          id={id}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={rows}
          className={`${baseClasses} resize-none`}
          required={required}
        />
      ) : null}

      {fieldType === "select" ? (
        <select
          id={id}
          name={name}
          defaultValue={defaultValue}
          className={baseClasses}
          required={required}
        >
          <option value="">{placeholder ?? "Select an option"}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {fieldType === "input" ? (
        <input
          id={id}
          name={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={baseClasses}
          required={required}
        />
      ) : null}

      {helperText ? <p className="mt-2 text-xs leading-6 text-slate-500">{helperText}</p> : null}
    </label>
  );
}

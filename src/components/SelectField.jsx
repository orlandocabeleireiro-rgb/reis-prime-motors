export default function SelectField({ label, value, onChange, options }) {
  return (
    <div className="flex-1">
      <label className="mb-1.5 block font-sans text-[11px] uppercase tracking-wide text-paper-muted/70">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full cursor-pointer appearance-none border border-paper-line bg-white px-3.5 py-3 pr-9 font-sans text-sm text-paper-text outline-none transition-colors focus:border-paper-text"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

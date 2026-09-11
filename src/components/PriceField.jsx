import { useId } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function PriceField({ label, value, onChange, options = [] }) {
  const listId = useId();
  const { t } = useLanguage();

  return (
    <div className="flex-1">
      <label className="mb-1.5 block font-sans text-[11px] uppercase tracking-wide text-paper-muted/70">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          list={listId}
          min="0"
          step="1000"
          value={value ?? ""}
          onChange={onChange}
          placeholder={t("home.semLimite")}
          className="w-full border border-paper-line bg-white px-3.5 py-3 pr-10 font-sans text-sm text-paper-text outline-none transition-colors placeholder:text-paper-muted/60 focus:border-paper-text"
        />
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 font-sans text-sm text-paper-muted">
          €
        </span>
        {/* Sugestões de valores — o campo continua editável livremente */}
        <datalist id={listId}>
          {options.map((o) => (
            <option key={o} value={o}>
              {`${t("home.ate")} ${o.toLocaleString("pt-PT")} €`}
            </option>
          ))}
        </datalist>
      </div>
    </div>
  );
}

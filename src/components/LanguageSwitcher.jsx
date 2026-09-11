import { useEffect, useRef, useState } from "react";
import FlagIcon from "./FlagIcon.jsx";
import { LANGUAGES } from "../i18n/translations.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t("header.language")}
        aria-expanded={open}
        className="block h-7 w-7 overflow-hidden rounded-full ring-1 ring-paper-line transition-shadow hover:ring-paper-text"
      >
        <FlagIcon code={current.flag} className="h-7 w-7" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 min-w-[9.5rem] border border-paper-line bg-white py-1.5 shadow-lg">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left font-sans text-sm transition-colors hover:bg-paper ${
                l.code === lang ? "text-paper-text" : "text-paper-muted"
              }`}
            >
              <FlagIcon code={l.flag} className="h-5 w-5" />
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

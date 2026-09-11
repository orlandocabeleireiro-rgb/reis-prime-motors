import { createContext, useContext, useMemo, useState } from "react";
import dict, { DEFAULT_LANG } from "./translations.js";

const LanguageContext = createContext(null);

function readInitialLang() {
  try {
    const saved = localStorage.getItem("reis-lang");
    if (saved && dict[saved]) return saved;
  } catch {
    // localStorage indisponível (ex. private browsing) — usa o padrão
  }
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang);

  function setLang(code) {
    if (!dict[code]) return;
    setLangState(code);
    try {
      localStorage.setItem("reis-lang", code);
    } catch {
      // ignora se não for possível guardar
    }
  }

  function t(path) {
    const parts = path.split(".");
    let node = dict[lang];
    for (const p of parts) {
      node = node?.[p];
    }
    if (node === undefined) return path;
    return node;
  }

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage tem de ser usado dentro de LanguageProvider");
  return ctx;
}

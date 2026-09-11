import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import MenuOverlay from "./MenuOverlay.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

// Na página inicial o cabeçalho fica sobreposto ao vídeo do hero (sem
// fundo, texto claro); nas restantes páginas é o cabeçalho sólido normal.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const overlay = pathname === "/";

  return (
    <>
      <header
        className={`flex items-center justify-between px-6 py-5 sm:px-12 ${
          overlay
            ? "absolute inset-x-0 top-0 z-30 border-b-0 bg-transparent"
            : "relative border-b border-paper-line bg-white"
        }`}
      >
        <button
          onClick={() => setMenuOpen(true)}
          aria-label={t("header.menu")}
          className={`flex items-center gap-2.5 font-sans text-sm transition-opacity ${
            overlay
              ? "text-cream drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)] hover:opacity-75"
              : "text-paper-text transition-colors hover:text-paper-muted"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          <span className="hidden sm:inline">{t("header.menu")}</span>
        </button>

        <NavLink
          to="/"
          className={`absolute left-1/2 flex -translate-x-1/2 items-center gap-3 ${
            overlay ? "drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]" : ""
          }`}
        >
          <img
            src="/reis-mark.png"
            alt="Reis Prime Motors"
            className={`block h-4 w-auto ${overlay ? "brightness-0 invert" : ""}`}
          />
          <span
            className={`hidden font-sans text-[13px] font-normal tracking-[0.3em] min-[480px]:inline ${
              overlay ? "text-cream/80" : "text-silver"
            }`}
          >
            PRIME MOTORS
          </span>
        </NavLink>

        <div className="flex items-center gap-4">
          <LanguageSwitcher overlay={overlay} />
          <button
            aria-label={t("header.account")}
            title={t("header.account")}
            className={`flex h-7 w-7 items-center justify-center transition-opacity ${
              overlay
                ? "text-cream drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)] hover:opacity-75"
                : "text-paper-muted transition-colors hover:text-paper-text"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4.5 20c1.6-3.5 5-5.5 7.5-5.5s5.9 2 7.5 5.5" />
            </svg>
          </button>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

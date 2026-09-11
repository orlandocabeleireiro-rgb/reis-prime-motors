import { useState } from "react";
import { NavLink } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import MenuOverlay from "./MenuOverlay.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <header className="relative flex items-center justify-between border-b border-paper-line bg-white px-6 py-5 sm:px-12">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label={t("header.menu")}
          className="flex items-center gap-2.5 font-sans text-sm text-paper-text transition-colors hover:text-paper-muted"
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
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3"
        >
          <img src="/reis-mark.png" alt="Reis Prime Motors" className="block h-4 w-auto" />
          <span className="hidden font-sans text-[13px] font-normal tracking-[0.3em] text-silver min-[480px]:inline">
            PRIME MOTORS
          </span>
        </NavLink>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            aria-label={t("header.account")}
            title={t("header.account")}
            className="flex h-7 w-7 items-center justify-center text-paper-muted transition-colors hover:text-paper-text"
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

import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import MenuOverlay from "./MenuOverlay.jsx";
import AccountModal from "./AccountModal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

// Na página inicial o cabeçalho fica sobreposto ao vídeo do hero (sem
// fundo, texto claro); nas restantes páginas é o cabeçalho sólido normal.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const { t } = useLanguage();
  const { user, isAdmin, signOut } = useAuth();
  const { pathname } = useLocation();
  const overlay = pathname === "/";

  useEffect(() => {
    if (!accountMenuOpen) return;
    function onClickOutside(e) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [accountMenuOpen]);

  const iniciais = (user?.user_metadata?.nome || user?.email || "?").trim().charAt(0).toUpperCase();

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
          {user ? (
            <div className="relative" ref={accountMenuRef}>
              <button
                onClick={() => setAccountMenuOpen((o) => !o)}
                aria-label={t("header.account")}
                aria-expanded={accountMenuOpen}
                className={`flex h-7 w-7 items-center justify-center rounded-full font-sans text-xs font-medium transition-colors ${
                  overlay
                    ? "bg-white/15 text-cream drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)] hover:bg-white/25"
                    : "bg-ink text-white hover:opacity-85"
                }`}
              >
                {iniciais}
              </button>
              {accountMenuOpen && (
                <div className="absolute right-0 top-full z-20 mt-2 min-w-[11rem] border border-paper-line bg-white py-1.5 shadow-lg">
                  <div className="truncate border-b border-paper-line px-3.5 py-2 font-sans text-xs text-paper-muted">
                    {user.email}
                  </div>
                  {isAdmin && (
                    <NavLink
                      to="/admin"
                      onClick={() => setAccountMenuOpen(false)}
                      className="block w-full px-3.5 py-2 text-left font-sans text-sm text-paper-text transition-colors hover:bg-paper"
                    >
                      Administração
                    </NavLink>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      setAccountMenuOpen(false);
                    }}
                    className="w-full px-3.5 py-2 text-left font-sans text-sm text-paper-text transition-colors hover:bg-paper"
                  >
                    {t("account.sair")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setAccountOpen(true)}
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
          )}
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  );
}

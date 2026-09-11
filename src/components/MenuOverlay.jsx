import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { siInstagram, siWhatsapp } from "simple-icons";
import SocialIcon from "./SocialIcon.jsx";
import { INSTAGRAM_URL, WHATSAPP_URL } from "../data/social.js";
import { CARS } from "../data/cars.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

function MenuLink({ to, title, desc, onClose }) {
  return (
    <NavLink
      to={to}
      onClick={onClose}
      className="group flex items-center justify-between border-b border-line py-6 transition-colors hover:text-silver"
    >
      <span>
        <span className="block font-head text-3xl font-medium text-cream group-hover:text-silver sm:text-4xl">
          {title}
        </span>
        <span className="mt-1.5 block font-sans text-sm text-muted">{desc}</span>
      </span>
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 flex-shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-silver"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </NavLink>
  );
}

function Chip({ to, onClick, children }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className="border border-line px-4 py-2 font-sans text-sm text-cream transition-colors hover:border-silver hover:text-silver"
    >
      {children}
    </NavLink>
  );
}

// "Viaturas" só navega quando se clica num atalho específico — o
// título abre/fecha a secção com os atalhos rápidos e a lista de
// marcas, sem sair do menu.
function VeiculosSection({ onClose }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const marcas = useMemo(
    () => [...new Set(CARS.map((c) => c.marca))].sort((a, b) => a.localeCompare(b)),
    []
  );

  return (
    <div className="border-b border-line py-6">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between text-left transition-colors hover:text-silver"
      >
        <span>
          <span className="block font-head text-3xl font-medium text-cream group-hover:text-silver sm:text-4xl">
            {t("menu.viaturas")}
          </span>
          <span className="mt-1.5 block font-sans text-sm text-muted">
            {t("menu.viaturas_desc")}
          </span>
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`h-6 w-6 flex-shrink-0 text-muted transition-transform group-hover:text-silver ${
            open ? "rotate-90" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      {open && (
        <div className="mt-5">
          <div className="flex flex-wrap gap-2.5">
            <Chip to="/" onClick={onClose}>
              {t("menu.verTodas")}
            </Chip>
            <Chip to={`/?combustivel=${encodeURIComponent("Elétrico")}`} onClick={onClose}>
              {t("menu.eletricos")}
            </Chip>
            <Chip to={`/?combustivel=${encodeURIComponent("Híbrido")}`} onClick={onClose}>
              {t("menu.hibridos")}
            </Chip>
            <Chip to="/?ordenar=recentes" onClick={onClose}>
              {t("menu.recentes")}
            </Chip>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {marcas.map((m) => (
              <NavLink
                key={m}
                to={`/?marca=${encodeURIComponent(m)}`}
                onClick={onClose}
                className="font-sans text-sm text-muted transition-colors hover:text-cream"
              >
                {m}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MenuOverlay({ open, onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ink">
      <div className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-12">
        <span className="font-sans text-xs tracking-[0.3em] text-silver">{t("menu.title")}</span>
        <button
          onClick={onClose}
          aria-label={t("menu.close")}
          className="flex h-9 w-9 items-center justify-center text-cream transition-colors hover:text-silver"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-6 py-4 sm:px-12">
        <div className="mx-auto max-w-2xl">
          <VeiculosSection onClose={onClose} />
          <MenuLink
            to="/contactos"
            title={t("menu.financiamento")}
            desc={t("menu.financiamento_desc")}
            onClose={onClose}
          />
          <MenuLink
            to="/contactos"
            title={t("menu.sobre")}
            desc={t("menu.sobre_desc")}
            onClose={onClose}
          />
          <MenuLink
            to="/contactos"
            title={t("menu.contactos")}
            desc={t("menu.contactos_desc")}
            onClose={onClose}
          />
        </div>
      </nav>

      <div className="flex items-center justify-center gap-5 border-t border-line px-6 py-6 sm:px-12">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-muted transition-colors hover:text-cream"
        >
          <SocialIcon icon={siInstagram} />
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="text-muted transition-colors hover:text-cream"
        >
          <SocialIcon icon={siWhatsapp} />
        </a>
      </div>
    </div>
  );
}

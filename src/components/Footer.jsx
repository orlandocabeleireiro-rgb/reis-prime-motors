import { Link } from "react-router-dom";
import { siInstagram, siWhatsapp } from "simple-icons";
import SocialIcon from "./SocialIcon.jsx";
import { INSTAGRAM_URL, WHATSAPP_URL } from "../data/social.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

function SocialButton({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-silver hover:text-cream"
    >
      <SocialIcon icon={icon} />
    </a>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    [t("menu.viaturas"), "/"],
    [t("menu.financiamento"), "/financiamento"],
    [t("menu.sobre"), "/sobre-nos"],
    [t("menu.contactos"), "/contactos"],
  ];

  return (
    <footer className="bg-ink px-6 py-14 font-sans text-sm text-muted sm:px-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src="/reis-mark.png" alt="Reis Prime Motors" className="h-5 w-auto brightness-0 invert" />
            <span className="font-head text-base tracking-wide text-cream">
              REIS <span className="text-silver">PRIME MOTORS</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs leading-[1.6] text-muted/90">{t("footer.tagline")}</p>
          <div className="mt-5 flex gap-3">
            <SocialButton href={INSTAGRAM_URL} icon={siInstagram} label="Instagram" />
            <SocialButton href={WHATSAPP_URL} icon={siWhatsapp} label="WhatsApp" />
          </div>
        </div>

        <div>
          <div className="font-sans text-xs font-medium tracking-[0.2em] text-silver">
            {t("footer.navegacao").toUpperCase()}
          </div>
          <nav className="mt-5 flex flex-col gap-3">
            {links.map(([label, to]) => (
              <Link key={to} to={to} className="w-fit transition-colors hover:text-cream">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <div className="font-sans text-xs font-medium tracking-[0.2em] text-silver">
            {t("footer.contacto").toUpperCase()}
          </div>
          <div className="mt-5 flex flex-col gap-3">
            <p>{t("footer.morada")}</p>
            <a href="mailto:geral@reisprimemotors.pt" className="w-fit transition-colors hover:text-cream">
              geral@reisprimemotors.pt
            </a>
            <a href="tel:+351220000000" className="w-fit transition-colors hover:text-cream">
              220 000 000
            </a>
            <Link to="/contactos" className="w-fit text-silver transition-colors hover:text-cream">
              {t("footer.verContactos")}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-line pt-6 text-xs text-muted/70">
        © {new Date().getFullYear()} Reis Prime Motors. {t("footer.direitos")}
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { siInstagram, siWhatsapp } from "simple-icons";
import SocialIcon from "./SocialIcon.jsx";
import { INSTAGRAM_URL, WHATSAPP_URL } from "../data/social.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-ink px-6 py-10 font-sans text-sm text-muted sm:px-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-head text-base tracking-wide text-cream">
            REIS <span className="text-silver">PRIME MOTORS</span>
          </div>
          <p className="mt-2 text-muted">{t("footer.morada")}</p>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <a href="mailto:geral@reisprimemotors.pt" className="hover:text-cream">
            geral@reisprimemotors.pt
          </a>
          <a href="tel:+351220000000" className="hover:text-cream">
            220 000 000
          </a>
          <Link to="/contactos" className="text-silver hover:text-cream">
            {t("footer.verContactos")}
          </Link>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center gap-5">
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
      <div className="mt-6 border-t border-line pt-6 text-xs text-muted/70">
        © {new Date().getFullYear()} Reis Prime Motors. {t("footer.direitos")}
      </div>
    </footer>
  );
}

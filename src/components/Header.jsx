import { NavLink } from "react-router-dom";
import { siInstagram, siWhatsapp } from "simple-icons";
import SocialIcon from "./SocialIcon.jsx";
import { INSTAGRAM_URL, WHATSAPP_URL } from "../data/social.js";

const navLinkClass = ({ isActive }) =>
  `transition-colors hover:text-paper-text ${
    isActive ? "text-paper-text" : "text-paper-muted"
  }`;

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-paper-line bg-white px-6 py-5 sm:px-12">
      <NavLink to="/" className="flex items-center gap-3">
        <img src="/reis-mark.png" alt="Reis Prime Motors" className="block h-4 w-auto" />
        <span className="hidden font-sans text-[13px] font-normal tracking-[0.3em] text-silver min-[350px]:inline">
          PRIME MOTORS
        </span>
      </NavLink>
      <nav className="flex items-center gap-6 font-sans text-sm sm:gap-8">
        <NavLink to="/" end className={navLinkClass}>
          Viaturas
        </NavLink>
        <span className="hidden text-paper-muted/60 sm:inline">Financiamento</span>
        <span className="hidden text-paper-muted/60 sm:inline">Sobre nós</span>
        <NavLink to="/contactos" className={navLinkClass}>
          Contactos
        </NavLink>
        <span className="flex items-center gap-4 border-l border-paper-line pl-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-paper-muted transition-colors hover:text-paper-text"
          >
            <SocialIcon icon={siInstagram} className="h-4 w-4" />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-paper-muted transition-colors hover:text-paper-text"
          >
            <SocialIcon icon={siWhatsapp} className="h-4 w-4" />
          </a>
        </span>
      </nav>
    </header>
  );
}

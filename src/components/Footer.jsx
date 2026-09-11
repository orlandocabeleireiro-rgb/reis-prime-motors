import { Link } from "react-router-dom";
import { siInstagram, siWhatsapp } from "simple-icons";

// TODO: substituir por "https://instagram.com/<utilizador>" assim que a
// conta do Instagram for criada.
const INSTAGRAM_URL = "#";
const WHATSAPP_URL = "https://wa.me/351220000000";

function SocialIcon({ icon }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-10 font-sans text-sm text-muted sm:px-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-head text-base tracking-wide text-cream">
            REIS <span className="text-silver">PRIME MOTORS</span>
          </div>
          <p className="mt-2 text-muted">Gondomar, Porto</p>
          <div className="mt-4 flex items-center gap-4">
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
        <div className="flex flex-col gap-1 sm:items-end">
          <a href="mailto:geral@reisprimemotors.pt" className="hover:text-cream">
            geral@reisprimemotors.pt
          </a>
          <a href="tel:+351220000000" className="hover:text-cream">
            220 000 000
          </a>
          <Link to="/contactos" className="text-silver hover:text-cream">
            Ver contactos e localização →
          </Link>
        </div>
      </div>
      <div className="mt-8 border-t border-line pt-6 text-xs text-muted/70">
        © {new Date().getFullYear()} Reis Prime Motors. Todos os direitos reservados.
      </div>
    </footer>
  );
}

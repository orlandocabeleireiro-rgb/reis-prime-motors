import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-10 font-sans text-sm text-muted sm:px-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-head text-base tracking-wide text-cream">
            REIS <span className="text-silver">PRIME MOTORS</span>
          </div>
          <p className="mt-2 text-muted">Gondomar, Porto</p>
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

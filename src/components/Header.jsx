import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `transition-colors hover:text-paper-text ${
    isActive ? "text-paper-text" : "text-paper-muted"
  }`;

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-paper-line bg-white px-6 py-4 sm:px-12">
      <NavLink to="/" className="flex min-w-0 items-center gap-2 lg:gap-4">
        <img
          src="/reis-mark.png"
          alt="Reis Prime Motors"
          className="block h-10 w-auto flex-shrink-0 sm:h-12 lg:h-16"
        />
        <span className="hidden whitespace-nowrap font-sans text-base font-normal tracking-[0.3em] text-silver lg:inline">
          PRIME MOTORS
        </span>
      </NavLink>
      <nav className="flex flex-shrink-0 items-center gap-4 font-sans text-sm sm:gap-6 lg:gap-8">
        <NavLink to="/" end className={navLinkClass}>
          Viaturas
        </NavLink>
        <span className="hidden text-paper-muted/60 lg:inline">Financiamento</span>
        <span className="hidden text-paper-muted/60 lg:inline">Sobre nós</span>
        <NavLink to="/contactos" className={navLinkClass}>
          Contactos
        </NavLink>
      </nav>
    </header>
  );
}

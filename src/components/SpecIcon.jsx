import BrandIcon from "./BrandIcon.jsx";
import KmIcon from "./KmIcon.jsx";
import FuelIcon from "./FuelIcon.jsx";

function Base({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// Pequeno ícone por linha da ficha técnica — mantém o mesmo traço fino
// usado nos restantes símbolos do site.
export default function SpecIcon({ label, car }) {
  switch (label) {
    case "Marca":
      return <BrandIcon marca={car.marca} className="h-4 w-4 flex-shrink-0" />;
    case "Modelo":
      return (
        <Base>
          <path d="M4 7a2 2 0 0 1 2-2h5l9 9-7 7-9-9V7z" />
          <circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" />
        </Base>
      );
    case "Ano":
      return (
        <Base>
          <rect x="3.5" y="5" width="17" height="16" rx="1.5" />
          <path d="M3.5 9.5h17M8 3v4M16 3v4" />
        </Base>
      );
    case "Quilometragem":
      return <KmIcon className="h-4 w-4 flex-shrink-0" />;
    case "Combustível":
      return <FuelIcon combustivel={car.combustivel} className="h-4 w-4 flex-shrink-0" />;
    case "Transmissão":
      return (
        <Base>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
        </Base>
      );
    case "Potência":
      return (
        <Base>
          <path d="M13 2 4 14h7l-1 8 10-12h-7l1-8z" fill="currentColor" stroke="none" />
        </Base>
      );
    case "Consumo médio":
      return (
        <Base>
          <path d="M12 3c3.5 4 6 7.3 6 10.5a6 6 0 1 1-12 0C6 10.3 8.5 7 12 3z" />
        </Base>
      );
    case "Cor":
      return (
        <Base>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 3.5a8.5 8.5 0 0 1 0 17" fill="currentColor" stroke="none" />
        </Base>
      );
    case "Portas":
      return (
        <Base>
          <rect x="5" y="3" width="14" height="18" rx="1" />
          <path d="M14.5 12h.01" strokeWidth="2.4" />
        </Base>
      );
    default:
      return null;
  }
}

function Base({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// Ícone por categoria de destaques (Segurança, Faróis, Bancos, ...) na
// página da viatura — mesmo traço fino usado nos restantes símbolos do
// site (ver SpecIcon.jsx).
export default function DestaqueCategoriaIcon({ icone }) {
  switch (icone) {
    case "escudo":
      return (
        <Base>
          <path d="M12 3 4.5 6v6c0 4.5 3.2 7.6 7.5 9 4.3-1.4 7.5-4.5 7.5-9V6L12 3z" />
          <path d="m9 12 2 2 4-4.5" />
        </Base>
      );
    case "farol":
      return (
        <Base>
          <path d="M4 9a8 8 0 0 1 8-8c3 3 5 6 5 8s-2 5-5 8a8 8 0 0 1-8-8z" />
          <circle cx="12" cy="9" r="2.5" />
        </Base>
      );
    case "retrovisor":
      return (
        <Base>
          <ellipse cx="12" cy="9" rx="6" ry="4.5" />
          <path d="M8.5 13 6 20M15.5 13 18 20" />
        </Base>
      );
    case "vidro":
      return (
        <Base>
          <path d="M3 9c3-4 15-4 18 0-3 3-15 3-18 0z" />
          <path d="M6 9v3.5c2 1.8 10 1.8 12 0V9" />
        </Base>
      );
    case "banco":
      return (
        <Base>
          <path d="M7 4v8a3 3 0 0 0 3 3h4" />
          <path d="M7 4h6v9" />
          <path d="M7 15h10l1.5 5h-13z" />
        </Base>
      );
    case "multimedia":
      return (
        <Base>
          <rect x="3.5" y="5" width="17" height="11" rx="1.5" />
          <path d="M8 20h8M12 16v4" />
        </Base>
      );
    case "jante":
      return (
        <Base>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="2.3" />
          <path d="M12 5.5V9.7M12 18.5v-4.2M5.5 12h4.2M18.5 12h-4.2M7.3 7.3l3 3M16.7 16.7l-3-3M7.3 16.7l3-3M16.7 7.3l-3 3" />
        </Base>
      );
    case "info":
    default:
      return (
        <Base>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5.5M12 7.5h.01" strokeWidth="2.2" />
        </Base>
      );
  }
}

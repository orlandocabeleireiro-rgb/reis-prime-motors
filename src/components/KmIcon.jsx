// Pequeno ícone de conta-quilómetros, no mesmo estilo de traço fino do
// FuelIcon, para acompanhar a quilometragem nos cartões das viaturas.
export default function KmIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <title>Quilometragem</title>
      <path d="M4.5 17a8 8 0 1 1 15 0" />
      <path d="M12 13 15.5 8.5" />
      <circle cx="12" cy="13" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

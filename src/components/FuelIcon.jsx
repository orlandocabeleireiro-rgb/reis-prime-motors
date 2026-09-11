// Pequenos ícones genéricos por tipo de combustível — no mesmo estilo de
// traço fino usado nos restantes ícones (não são logótipos de marcas).
export default function FuelIcon({ combustivel, className = "h-4 w-4" }) {
  if (!combustivel) return null;

  if (combustivel.includes("Elétrico")) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
        aria-hidden="true"
      >
        <title>Elétrico</title>
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    );
  }

  if (combustivel.includes("Híbrido")) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
        aria-hidden="true"
      >
        <title>Híbrido</title>
        <path d="M4 20c0-8.8 7.2-16 16-16-1.6 9.7-8.3 16-16 16z" />
      </svg>
    );
  }

  // Gasolina / Diesel
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
      <title>{combustivel}</title>
      <path d="M4 21V8.5a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 12 8.5V21" />
      <path d="M3 21h10" />
      <path d="M6.5 12h3" />
      <path d="M13.5 6.5 16 9v8a1.5 1.5 0 0 0 3 0v-4l-2-2" />
    </svg>
  );
}

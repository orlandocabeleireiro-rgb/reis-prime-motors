import {
  siBmw,
  siAudi,
  siPeugeot,
  siRenault,
  siVolkswagen,
  siTesla,
  siPorsche,
  siFord,
  siToyota,
  siFiat,
  siNissan,
  siKia,
  siCitroen,
  siVolvo,
  siPolestar,
} from "simple-icons";

// Nem todas as marcas têm símbolo disponível na biblioteca Simple Icons
// (ex.: Mercedes-Benz e BYD) — nesses casos usamos um pequeno emblema
// genérico com as iniciais da marca, no mesmo estilo visual dos restantes.
const ICONS = {
  BMW: siBmw,
  Audi: siAudi,
  Peugeot: siPeugeot,
  Renault: siRenault,
  Volkswagen: siVolkswagen,
  Tesla: siTesla,
  Porsche: siPorsche,
  Ford: siFord,
  Toyota: siToyota,
  Fiat: siFiat,
  Nissan: siNissan,
  Kia: siKia,
  "Citroën": siCitroen,
  Volvo: siVolvo,
  Polestar: siPolestar,
};

const INITIALS = {
  "Mercedes-Benz": "MB",
  BYD: "BYD",
};

export default function BrandIcon({ marca, className = "h-4 w-4" }) {
  const icon = ICONS[marca];
  if (icon) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
        aria-hidden="true"
      >
        <title>{icon.title}</title>
        <path d={icon.path} />
      </svg>
    );
  }

  const initials = INITIALS[marca];
  if (initials) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <title>{marca}</title>
        <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text
          x="12"
          y="12"
          textAnchor="middle"
          dominantBaseline="central"
          fill="currentColor"
          fontSize={initials.length > 2 ? "7" : "9"}
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          {initials}
        </text>
      </svg>
    );
  }

  return null;
}

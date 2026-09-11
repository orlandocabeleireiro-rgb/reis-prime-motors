import { siBmw, siAudi, siPeugeot, siRenault, siVolkswagen } from "simple-icons";

// Nem todas as marcas têm símbolo disponível na biblioteca Simple Icons
// (ex.: Mercedes-Benz não está disponível) — nesses casos mostramos só o nome.
const ICONS = {
  BMW: siBmw,
  Audi: siAudi,
  Peugeot: siPeugeot,
  Renault: siRenault,
  Volkswagen: siVolkswagen,
};

export default function BrandIcon({ marca, className = "h-4 w-4" }) {
  const icon = ICONS[marca];
  if (!icon) return null;

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

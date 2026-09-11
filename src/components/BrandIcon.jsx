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
  siMini,
} from "simple-icons";

// Estas marcas não estão disponíveis na biblioteca Simple Icons — usamos o
// símbolo oficial de cada uma (imagem fornecida à parte), recortado como
// máscara para herdar a mesma cor (currentColor) dos restantes símbolos e
// manter tudo visualmente uniforme.
const MASK_ICONS = {
  "Mercedes-Benz": "/brands/mercedes-benz.png",
  BYD: "/brands/byd.png",
  Jaguar: "/brands/jaguar.png",
  Cupra: "/brands/cupra.png",
  Mustang: "/brands/mustang.png",
};

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
  Mini: siMini,
};

export default function BrandIcon({ marca, className = "h-4 w-4" }) {
  const maskSrc = MASK_ICONS[marca];
  if (maskSrc) {
    return (
      <span
        role="img"
        aria-label={marca}
        className={`${className} inline-block flex-shrink-0 bg-current`}
        style={{
          WebkitMaskImage: `url(${maskSrc})`,
          maskImage: `url(${maskSrc})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    );
  }

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

  return null;
}

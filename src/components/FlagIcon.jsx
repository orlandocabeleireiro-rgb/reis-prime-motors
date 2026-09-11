// Bandeiras reais (SVG detalhado), recortadas em círculo — usadas no
// seletor de idioma do cabeçalho. Ficheiros em public/flags/*.svg
// (biblioteca flag-icons, licença MIT).
const FILES = {
  PT: "/flags/pt.svg",
  ES: "/flags/es.svg",
  GB: "/flags/gb.svg",
};

export default function FlagIcon({ code, className = "h-6 w-6" }) {
  const src = FILES[code];

  return (
    <span
      className={`${className} inline-block flex-shrink-0 overflow-hidden rounded-full ring-1 ring-inset ring-black/10`}
    >
      {src && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          draggable="false"
        />
      )}
    </span>
  );
}

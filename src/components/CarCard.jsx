import { Link } from "react-router-dom";
import CarImage from "./CarImage.jsx";
import FuelIcon from "./FuelIcon.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

// Cartão arredondado e "clean" (inspirado no estilo Porsche): o cartão
// inteiro é clicável, a foto não tem margens/borda visível e só mostra
// uma pill discreta com o combustível — o resto da informação fica por
// baixo, terminando num botão circular com seta em vez do botão retangular.
export default function CarCard({ car }) {
  const { t } = useLanguage();

  return (
    <Link
      to={`/carros/${car.id}`}
      aria-label={`${car.marca} ${car.modelo} — ${t("car.verDetalhes")}`}
      className="group flex flex-col overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-paper-line transition-all hover:shadow-lg hover:shadow-black/5 hover:ring-paper-text/20"
    >
      <div className="relative">
        <CarImage car={car} className="aspect-[4/3]" overlayClassName="hidden" />
        {/* Sombra leve no topo — garante contraste mesmo sobre fotos claras */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />
        {/* Nome do modelo em destaque sobre a foto, tipo "911"/"718" da Porsche */}
        <div className="pointer-events-none absolute inset-x-4 top-4 text-center">
          <div className="font-display text-3xl uppercase leading-none tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-4xl">
            {car.modelo}
          </div>
        </div>
        <span className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 font-sans text-[11px] font-medium text-white backdrop-blur-sm">
          <FuelIcon combustivel={car.combustivel} className="h-3.5 w-3.5" />
          {car.combustivel}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="font-sans text-xs font-medium text-silver">{car.marca}</div>
        <div className="mt-1.5 font-sans text-[13px] text-paper-muted">
          {car.ano} · {car.km.toLocaleString("pt-PT")} km
        </div>

        <div className="mt-4 flex flex-1 items-end justify-between">
          <span className="font-head text-xl text-paper-text">
            {car.preco.toLocaleString("pt-PT")} €
          </span>
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-paper-line text-paper-text transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

import { Link } from "react-router-dom";
import CarImage from "./CarImage.jsx";
import KmIcon from "./KmIcon.jsx";
import FuelIcon from "./FuelIcon.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function CarCard({ car }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col border border-paper-line bg-white">
      <CarImage car={car} className="aspect-[16/10]" overlayClassName="flex items-end p-3.5">
        <span className="font-sans text-xs tracking-wide text-paper-muted">{car.ano}</span>
      </CarImage>
      <div className="flex flex-1 flex-col p-4 pb-5 sm:p-[18px] sm:pb-5">
        <div className="mb-1 font-sans text-xs font-medium text-silver">{car.marca}</div>
        <div className="font-head text-xl font-medium text-paper-text">{car.modelo}</div>
        <div className="mt-2.5 flex gap-4 font-sans text-[13px] text-paper-muted">
          <span className="flex items-center gap-1.5">
            <KmIcon className="h-4 w-4 flex-shrink-0" />
            {car.km.toLocaleString("pt-PT")} km
          </span>
          <span className="flex items-center gap-1.5">
            <FuelIcon combustivel={car.combustivel} className="h-4 w-4 flex-shrink-0" />
            {car.combustivel}
          </span>
        </div>
        <div className="mt-4 flex flex-1 items-end justify-between border-t border-paper-line pt-3.5">
          <span className="font-head text-xl text-paper-text">
            {car.preco.toLocaleString("pt-PT")} €
          </span>
          <Link
            to={`/carros/${car.id}`}
            className="border border-ink bg-ink px-3.5 py-2 font-sans text-xs text-white transition-opacity hover:opacity-85"
          >
            {t("car.verDetalhes")}
          </Link>
        </div>
      </div>
    </div>
  );
}

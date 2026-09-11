import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <div className="flex flex-col border border-paper-line bg-white">
      <div
        className="flex aspect-[16/10] items-end p-3.5"
        style={{
          background:
            "repeating-linear-gradient(135deg, #ececea, #ececea 10px, #e2e2df 10px, #e2e2df 20px)",
        }}
      >
        <span className="font-sans text-xs tracking-wide text-paper-muted">{car.ano}</span>
      </div>
      <div className="flex flex-1 flex-col p-4 pb-5 sm:p-[18px] sm:pb-5">
        <div className="mb-1 font-sans text-xs font-medium text-silver">{car.marca}</div>
        <div className="font-head text-xl font-medium text-paper-text">{car.modelo}</div>
        <div className="mt-2.5 flex gap-3.5 font-sans text-[13px] text-paper-muted">
          <span>{car.km.toLocaleString("pt-PT")} km</span>
          <span>{car.combustivel}</span>
        </div>
        <div className="mt-4 flex flex-1 items-end justify-between border-t border-paper-line pt-3.5">
          <span className="font-head text-xl text-paper-text">
            {car.preco.toLocaleString("pt-PT")} €
          </span>
          <Link
            to={`/carros/${car.id}`}
            className="border border-ink bg-ink px-3.5 py-2 font-sans text-xs text-white transition-opacity hover:opacity-85"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}

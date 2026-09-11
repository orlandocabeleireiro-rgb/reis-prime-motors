import { useParams, Link, Navigate } from "react-router-dom";
import { getCarById } from "../data/cars.js";
import CarImage from "../components/CarImage.jsx";
import SpecIcon from "../components/SpecIcon.jsx";

const SPEC_ROWS = (car) => [
  ["Marca", car.marca],
  ["Modelo", car.modelo],
  ["Ano", car.ano],
  ["Quilometragem", `${car.km.toLocaleString("pt-PT")} km`],
  ["Combustível", car.combustivel],
  ["Transmissão", car.transmissao],
  ["Potência", `${car.potencia} cv`],
  ["Consumo médio", car.consumo],
  ["Cor", car.cor],
  ["Portas", car.portas],
];

export default function CarDetail() {
  const { id } = useParams();
  const car = getCarById(id);

  if (!car) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <div className="border-b border-paper-line bg-white px-6 py-4 sm:px-12">
        <Link to="/" className="font-sans text-sm text-paper-muted hover:text-paper-text">
          ← Voltar às viaturas
        </Link>
      </div>

      <section className="grid gap-10 px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-[1.4fr_1fr]">
        {/* Galeria */}
        <div>
          <CarImage
            car={car}
            className="aspect-[16/10]"
            overlayClassName="flex items-end justify-between p-6"
          >
            <span className="font-sans text-xs tracking-wide text-paper-muted">
              {car.marca} {car.modelo}
            </span>
            <span className="font-sans text-xs tracking-wide text-paper-muted">{car.ano}</span>
          </CarImage>
          {!car.imagem && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="aspect-[4/3]"
                  style={{
                    background:
                      "repeating-linear-gradient(135deg, #ececea, #ececea 10px, #e2e2df 10px, #e2e2df 20px)",
                  }}
                />
              ))}
            </div>
          )}

          <div className="mt-10">
            <h2 className="font-head text-xl font-medium text-paper-text">Descrição</h2>
            <p className="mt-3 max-w-2xl font-sans text-[15px] leading-[1.75] text-paper-muted">
              {car.descricao}
            </p>
          </div>

          <div className="mt-10">
            <h2 className="flex items-center gap-2 font-head text-xl font-medium text-paper-text">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-silver"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12.5 2.5 2.5L16 9.5" />
              </svg>
              Destaques
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {car.destaques.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 border border-paper-line bg-white px-3.5 py-3 font-sans text-[13px] text-paper-text"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 flex-shrink-0 text-silver"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12.5 9.5 17 19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ficha técnica + CTA */}
        <div className="lg:self-start">
          <div className="border border-paper-line bg-white p-6">
            <div className="font-sans text-xs font-medium tracking-wide text-silver">
              {car.marca}
            </div>
            <h1 className="mt-1 font-head text-2xl font-medium text-paper-text">{car.modelo}</h1>
            <div className="mt-4 font-head text-3xl text-paper-text">
              {car.preco.toLocaleString("pt-PT")} €
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                to="/contactos"
                className="bg-ink px-5 py-3.5 text-center font-sans text-sm font-medium text-white transition-opacity hover:opacity-85"
              >
                Tenho interesse — contactar
              </Link>
              <a
                href="tel:+351220000000"
                className="border border-paper-line px-5 py-3.5 text-center font-sans text-sm text-paper-text transition-colors hover:border-paper-text"
              >
                Ligar: 220 000 000
              </a>
            </div>
          </div>

          <div className="mt-6 border border-line bg-ink p-6">
            <div className="mb-1 font-sans text-xs tracking-wide text-silver">Ficha técnica</div>
            {SPEC_ROWS(car).map(([label, val]) => (
              <div
                key={label}
                className="flex items-center justify-between border-t border-line py-3 font-sans"
              >
                <span className="flex items-center gap-2.5 text-sm text-muted">
                  <SpecIcon label={label} car={car} />
                  {label}
                </span>
                <span className="text-sm text-cream">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

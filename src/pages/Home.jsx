import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CarCard from "../components/CarCard.jsx";
import BrandIcon from "../components/BrandIcon.jsx";
import FuelIcon from "../components/FuelIcon.jsx";
import FeaturedCarousel from "../components/FeaturedCarousel.jsx";
import CarCarousel from "../components/CarCarousel.jsx";
import { CARS } from "../data/cars.js";

const PRECO_MIN = 10000;
const PRECO_MAX = 100000;

export default function Home() {
  const [marca, setMarca] = useState("Todas");
  const [combustivel, setCombustivel] = useState("Todos");
  const [precoMax, setPrecoMax] = useState(PRECO_MAX);
  const [vista, setVista] = useState("grelha");

  const marcas = useMemo(() => ["Todas", ...new Set(CARS.map((c) => c.marca))], []);
  const combustiveis = useMemo(
    () => ["Todos", ...new Set(CARS.map((c) => c.combustivel))],
    []
  );

  const destaques = useMemo(
    () => [...CARS].sort((a, b) => b.preco - a.preco).slice(0, 5),
    []
  );

  const filtrados = useMemo(
    () =>
      CARS.filter(
        (c) =>
          (marca === "Todas" || c.marca === marca) &&
          (combustivel === "Todos" || c.combustivel === combustivel) &&
          c.preco <= precoMax
      ),
    [marca, combustivel, precoMax]
  );

  return (
    <>
      {/* Hero */}
      <section className="grid gap-10 bg-ink px-6 py-16 text-cream sm:px-12 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-10 lg:py-[90px]">
        <div>
          <h1 className="max-w-[640px] font-head text-4xl font-medium leading-[1.05] text-cream sm:text-5xl lg:text-[40px]">
            Escolhidos com rigor.
            <br />
            Conduzidos com confiança.
          </h1>
          <p className="mt-5 max-w-[460px] font-sans text-base leading-[1.7] text-muted">
            Selecionamos cada viatura com atenção ao detalhe, procurando qualidade, transparência
            e confiança em cada escolha.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#viaturas"
              className="bg-white px-6 py-3.5 font-sans text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              Ver todas as viaturas
            </a>
            <Link
              to="/contactos"
              className="border border-line px-6 py-3.5 font-sans text-sm text-cream transition-colors hover:border-silver"
            >
              Falar connosco
            </Link>
          </div>
        </div>
        <FeaturedCarousel cars={destaques} />
      </section>

      {/* Catálogo */}
      <section id="viaturas" className="bg-paper px-6 py-14 sm:px-12 sm:py-[70px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-head text-2xl font-medium text-paper-text sm:text-3xl">
            Viaturas disponíveis
          </h2>
          <div className="flex items-center gap-4">
            <span className="font-sans text-[13px] text-paper-muted">
              {filtrados.length} de {CARS.length}
            </span>
            <div className="flex border border-paper-line">
              <button
                onClick={() => setVista("grelha")}
                aria-label="Ver em grelha"
                aria-pressed={vista === "grelha"}
                className={`flex h-8 w-9 items-center justify-center transition-colors ${
                  vista === "grelha"
                    ? "bg-ink text-white"
                    : "text-paper-muted hover:text-paper-text"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => setVista("carrossel")}
                aria-label="Ver em carrossel"
                aria-pressed={vista === "carrossel"}
                className={`flex h-8 w-9 items-center justify-center border-l border-paper-line transition-colors ${
                  vista === "carrossel"
                    ? "bg-ink text-white"
                    : "text-paper-muted hover:text-paper-text"
                }`}
              >
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
                  <rect x="7" y="5" width="10" height="14" rx="1" />
                  <path d="M3 9v6M21 9v6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-9 flex flex-col gap-5">
          <div>
            <div className="mb-2 font-sans text-[11px] uppercase tracking-wide text-paper-muted/70">
              Marca
            </div>
            <div className="flex flex-wrap gap-2">
              {marcas.map((m) => (
                <button
                  key={m}
                  onClick={() => setMarca(m)}
                  className={`flex items-center gap-2 border px-4 py-2 font-sans text-[13px] transition-colors ${
                    marca === m
                      ? "border-ink bg-ink text-white"
                      : "border-paper-line text-paper-muted hover:border-paper-text hover:text-paper-text"
                  }`}
                >
                  <BrandIcon marca={m} className="h-5 w-5 flex-shrink-0" />
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-7">
            <div>
              <div className="mb-2 font-sans text-[11px] uppercase tracking-wide text-paper-muted/70">
                Combustível
              </div>
              <div className="flex flex-wrap gap-2">
                {combustiveis.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCombustivel(c)}
                    className={`flex items-center gap-2 border px-4 py-2 font-sans text-[13px] transition-colors ${
                      combustivel === c
                        ? "border-ink bg-ink text-white"
                        : "border-paper-line text-paper-muted hover:border-paper-text hover:text-paper-text"
                    }`}
                  >
                    <FuelIcon combustivel={c === "Todos" ? null : c} className="h-4 w-4 flex-shrink-0" />
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <span className="font-sans text-[13px] text-paper-muted">
                Até {precoMax.toLocaleString("pt-PT")} €
              </span>
              <input
                type="range"
                min={PRECO_MIN}
                max={PRECO_MAX}
                step="5000"
                value={precoMax}
                onChange={(e) => setPrecoMax(Number(e.target.value))}
                className="w-40 accent-silver"
              />
            </div>
          </div>
        </div>

        {filtrados.length > 0 ? (
          vista === "grelha" ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtrados.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <CarCarousel cars={filtrados} />
          )
        ) : (
          <p className="font-sans text-sm text-paper-muted">
            Não há viaturas que correspondam aos filtros selecionados.
          </p>
        )}
      </section>
    </>
  );
}

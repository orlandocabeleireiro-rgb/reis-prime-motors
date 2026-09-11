import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CarCard from "../components/CarCard.jsx";
import BrandIcon from "../components/BrandIcon.jsx";
import FeaturedCarousel from "../components/FeaturedCarousel.jsx";
import { CARS } from "../data/cars.js";

const PRECO_MIN = 10000;
const PRECO_MAX = 100000;

export default function Home() {
  const [marca, setMarca] = useState("Todas");
  const [precoMax, setPrecoMax] = useState(PRECO_MAX);

  const marcas = useMemo(() => ["Todas", ...new Set(CARS.map((c) => c.marca))], []);

  const destaques = useMemo(
    () => [...CARS].sort((a, b) => b.preco - a.preco).slice(0, 5),
    []
  );

  const filtrados = useMemo(
    () => CARS.filter((c) => (marca === "Todas" || c.marca === marca) && c.preco <= precoMax),
    [marca, precoMax]
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
          <span className="font-sans text-[13px] text-paper-muted">
            {filtrados.length} de {CARS.length}
          </span>
        </div>

        <div className="mb-9 flex flex-wrap items-center gap-7">
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

        {filtrados.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <p className="font-sans text-sm text-paper-muted">
            Não há viaturas que correspondam aos filtros selecionados.
          </p>
        )}
      </section>
    </>
  );
}

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CarCard from "../components/CarCard.jsx";
import { CARS } from "../data/cars.js";

const STATS = [
  ["Viaturas disponíveis", String(CARS.length)],
  ["Anos de experiência", "12"],
  ["Garantia em todas as viaturas", "12 meses"],
];

export default function Home() {
  const [marca, setMarca] = useState("Todas");
  const [precoMax, setPrecoMax] = useState(40000);

  const marcas = useMemo(() => ["Todas", ...new Set(CARS.map((c) => c.marca))], []);

  const filtrados = useMemo(
    () => CARS.filter((c) => (marca === "Todas" || c.marca === marca) && c.preco <= precoMax),
    [marca, precoMax]
  );

  return (
    <>
      {/* Hero */}
      <section className="grid gap-10 bg-ink px-6 py-16 text-cream sm:px-12 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:gap-10 lg:py-[90px]">
        <div>
          <h1 className="max-w-[560px] font-head text-4xl font-medium leading-[1.05] text-cream sm:text-5xl lg:text-[56px]">
            Carros com história.
            <br />
            Escolhidos a rigor.
          </h1>
          <p className="mt-5 max-w-[460px] font-sans text-base leading-[1.7] text-muted">
            Em Gondomar, selecionamos cada viatura usada com inspeção própria antes de chegar até
            si — sem surpresas, sem pressa.
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
        <div className="self-start border border-line bg-surface p-7">
          <div className="mb-4.5 font-sans text-xs tracking-wide text-silver">Em números</div>
          {STATS.map(([label, val]) => (
            <div
              key={label}
              className="flex justify-between border-t border-line py-3.5 font-sans"
            >
              <span className="text-sm text-muted">{label}</span>
              <span className="text-sm text-cream">{val}</span>
            </div>
          ))}
        </div>
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
                className={`border px-4 py-2 font-sans text-[13px] transition-colors ${
                  marca === m
                    ? "border-ink bg-ink text-white"
                    : "border-paper-line text-paper-muted hover:border-paper-text hover:text-paper-text"
                }`}
              >
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
              min="10000"
              max="40000"
              step="1000"
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

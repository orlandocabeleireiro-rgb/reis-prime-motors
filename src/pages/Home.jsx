import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CarCard from "../components/CarCard.jsx";
import CarSearch from "../components/CarSearch.jsx";
import FeaturedCarousel from "../components/FeaturedCarousel.jsx";
import CarCarousel from "../components/CarCarousel.jsx";
import { CARS } from "../data/cars.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { localizeCar } from "../i18n/localizeCar.js";

const PRECO_OPCOES = [15000, 20000, 30000, 40000, 60000, 80000, 100000];

function scrollToResultados() {
  document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const { t, lang } = useLanguage();
  const [marca, setMarca] = useState("Todas");
  const [modelo, setModelo] = useState("Todos");
  const [combustivel, setCombustivel] = useState("Todos");
  const [precoMax, setPrecoMax] = useState(null); // null = sem limite de preço
  const [vista, setVista] = useState("grelha");

  const marcas = useMemo(() => [...new Set(CARS.map((c) => c.marca))], []);
  const combustiveis = useMemo(() => [...new Set(CARS.map((c) => c.combustivel))], []);
  const modelos = useMemo(
    () => [
      ...new Set(
        CARS.filter((c) => marca === "Todas" || c.marca === marca).map((c) => c.modelo)
      ),
    ],
    [marca]
  );

  function handleSelectMarca(m, { scroll = true } = {}) {
    setMarca(m);
    setModelo("Todos");
    if (scroll) scrollToResultados();
  }

  const destaques = useMemo(
    () => [...CARS].sort((a, b) => b.preco - a.preco).slice(0, 5).map((c) => localizeCar(c, lang)),
    [lang]
  );

  const filtrados = useMemo(
    () =>
      CARS.filter(
        (c) =>
          (marca === "Todas" || c.marca === marca) &&
          (modelo === "Todos" || c.modelo === modelo) &&
          (combustivel === "Todos" || c.combustivel === combustivel) &&
          (precoMax === null || c.preco <= precoMax)
      ).map((c) => localizeCar(c, lang)),
    [marca, modelo, combustivel, precoMax, lang]
  );

  return (
    <>
      {/* Hero */}
      <section className="grid gap-10 bg-ink px-6 py-16 text-cream sm:px-12 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-10 lg:py-[90px]">
        <div>
          <h1 className="max-w-[640px] font-head text-4xl font-medium leading-[1.05] text-cream sm:text-5xl lg:text-[40px]">
            {t("home.heroTitle1")}
            <br />
            {t("home.heroTitle2")}
          </h1>
          <p className="mt-5 max-w-[460px] font-sans text-base leading-[1.7] text-muted">
            {t("home.heroText")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#viaturas"
              className="bg-white px-6 py-3.5 font-sans text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              {t("home.ctaVer")}
            </a>
            <Link
              to="/contactos"
              className="border border-line px-6 py-3.5 font-sans text-sm text-cream transition-colors hover:border-silver"
            >
              {t("home.ctaFalar")}
            </Link>
          </div>
        </div>
        <FeaturedCarousel cars={destaques} />
      </section>

      {/* Catálogo */}
      <section id="viaturas" className="bg-paper px-6 py-14 sm:px-12 sm:py-[70px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-head text-2xl font-medium text-paper-text sm:text-3xl">
            {t("home.catalogo")}
          </h2>
          <div className="flex items-center gap-4">
            <span className="font-sans text-[13px] text-paper-muted">
              {filtrados.length} {t("home.de")} {CARS.length}
            </span>
            <div className="flex border border-paper-line">
              <button
                onClick={() => setVista("grelha")}
                aria-label={t("home.grelha")}
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
                aria-label={t("home.carrossel")}
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

        <div className="mb-10">
          <CarSearch
            marcas={marcas}
            marca={marca}
            onSelectMarca={handleSelectMarca}
            modelos={modelos}
            modelo={modelo}
            setModelo={setModelo}
            combustiveis={combustiveis}
            combustivel={combustivel}
            setCombustivel={setCombustivel}
            precoMax={precoMax}
            setPrecoMax={setPrecoMax}
            precoOpcoes={PRECO_OPCOES}
            resultCount={filtrados.length}
            onSearch={scrollToResultados}
          />
        </div>

        <div id="resultados" />
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
          <p className="font-sans text-sm text-paper-muted">{t("home.vazio")}</p>
        )}
      </section>
    </>
  );
}

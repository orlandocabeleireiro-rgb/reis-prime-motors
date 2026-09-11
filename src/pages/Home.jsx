import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const [marca, setMarca] = useState("Todas");
  const [modelo, setModelo] = useState("Todos");
  const [combustivel, setCombustivel] = useState("Todos");
  const [precoMax, setPrecoMax] = useState(null); // null = sem limite de preço
  const [vista, setVista] = useState("grelha");

  // Atalhos vindos do menu (ex.: /?marca=BMW, /?combustivel=Elétrico,
  // /?ordenar=recentes) — aplicam o filtro e vão direto aos resultados.
  const ordenar = searchParams.get("ordenar");
  useEffect(() => {
    const m = searchParams.get("marca");
    const c = searchParams.get("combustivel");
    const ord = searchParams.get("ordenar");
    if (!m && !c && !ord) return;
    setMarca(m ?? "Todas");
    setModelo("Todos");
    setCombustivel(c ?? "Todos");
    setPrecoMax(null);
    requestAnimationFrame(scrollToResultados);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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

  const filtrados = useMemo(() => {
    let list = CARS.filter(
      (c) =>
        (marca === "Todas" || c.marca === marca) &&
        (modelo === "Todos" || c.modelo === modelo) &&
        // startsWith em vez de igualdade estrita: permite ao menu filtrar por
        // "Híbrido" e apanhar tanto "Híbrido (Gasolina)" como "Híbrido (Diesel)"
        (combustivel === "Todos" || c.combustivel.startsWith(combustivel)) &&
        (precoMax === null || c.preco <= precoMax)
    );
    if (ordenar === "recentes") {
      list = [...list].sort((a, b) => b.ano - a.ano || a.km - b.km);
    }
    return list.map((c) => localizeCar(c, lang));
  }, [marca, modelo, combustivel, precoMax, lang, ordenar]);

  return (
    <>
      {/* Hero — vídeo de fundo, cabeçalho sobreposto (ver Header.jsx) */}
      <section className="relative min-h-[640px] overflow-hidden bg-ink text-cream sm:min-h-[680px] lg:min-h-[760px]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/video/hero-car.mp4"
          poster="/video/hero-car-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Sombra escura leve — só o suficiente para o texto se ler bem */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/55" />

        <div className="relative grid gap-10 px-6 pb-16 pt-32 sm:px-12 sm:pb-20 sm:pt-36 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-10 lg:pb-[90px] lg:pt-40">
          <div>
            <h1 className="max-w-[640px] font-head text-4xl font-medium leading-[1.05] text-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-[40px]">
              {t("home.heroTitle1")}
              <br />
              {t("home.heroTitle2")}
            </h1>
            <p className="mt-5 max-w-[460px] font-sans text-base leading-[1.7] text-cream/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
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
                className="border border-white/40 px-6 py-3.5 font-sans text-sm text-cream backdrop-blur-[2px] transition-colors hover:border-white"
              >
                {t("home.ctaFalar")}
              </Link>
            </div>
          </div>
          <FeaturedCarousel cars={destaques} />
        </div>
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

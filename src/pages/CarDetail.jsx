import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import CarImage from "../components/CarImage.jsx";
import SpecIcon from "../components/SpecIcon.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { localizeCar } from "../i18n/localizeCar.js";
import { useCars } from "../cars/CarsContext.jsx";
import { agruparDestaques } from "../data/destaqueCategorias.js";
import DestaqueCategoriaIcon from "../components/DestaqueCategoriaIcon.jsx";

const SPEC_ROWS = (car, t) => [
  ["marca", t("home.marca"), car.marca],
  ["modelo", t("home.modelo"), car.modelo],
  ["ano", t("car.ano"), car.ano],
  ["km", t("car.km"), `${car.km.toLocaleString("pt-PT")} km`],
  ["combustivel", t("home.combustivel"), car.combustivel],
  ["transmissao", t("car.transmissao"), car.transmissao],
  ["potencia", t("car.potencia"), `${car.potencia} cv`],
  ["consumo", t("car.consumo"), car.consumo],
  ["cor", t("car.cor"), car.cor],
  ["portas", t("car.portas"), car.portas],
];

export default function CarDetail() {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const { cars, loading } = useCars();
  const carRaw = cars.find((c) => c.id === Number(id));
  const car = carRaw ? localizeCar(carRaw, lang) : null;
  const [activeImg, setActiveImg] = useState(0);
  const [menuPartilhaAberto, setMenuPartilhaAberto] = useState(false);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const partilhaRef = useRef(null);

  useEffect(() => {
    setActiveImg(0);
  }, [id]);

  useEffect(() => {
    if (!menuPartilhaAberto) return;
    function onClickOutside(e) {
      if (partilhaRef.current && !partilhaRef.current.contains(e.target)) {
        setMenuPartilhaAberto(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuPartilhaAberto]);

  if (!car) {
    // Enquanto as viaturas ainda estão a carregar, não se sabe ainda se
    // este id existe — só redireciona para 404 depois de confirmado.
    if (loading) return null;
    return <Navigate to="/404" replace />;
  }

  // Galeria: usa "imagens" (várias fotos, definidas na área de admin) e,
  // para viaturas mais antigas que só têm uma foto, cai para "imagem".
  const galeria = car.imagens?.length ? car.imagens : car.imagem ? [car.imagem] : [];
  const carPrincipal = galeria.length ? { ...car, imagem: galeria[activeImg] ?? galeria[0] } : car;

  // Destaques agrupados por categoria (Segurança, Faróis, Bancos, ...)
  const gruposDestaques = agruparDestaques(carRaw?.destaques, car.destaques, lang);

  const linkPartilha = typeof window !== "undefined" ? window.location.href : "";
  const textoPartilha = `${car.marca} ${car.modelo} — ${car.preco.toLocaleString("pt-PT")} € · Reis Prime Motors`;

  async function partilhar() {
    if (navigator.share) {
      try {
        await navigator.share({ title: textoPartilha, url: linkPartilha });
      } catch {
        // utilizador cancelou a partilha — não é um erro
      }
      return;
    }
    setMenuPartilhaAberto((o) => !o);
  }

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(linkPartilha);
      setLinkCopiado(true);
      setTimeout(() => setLinkCopiado(false), 2000);
    } catch {
      // clipboard indisponível — ignora silenciosamente
    }
  }

  return (
    <>
      <div className="border-b border-paper-line bg-white px-6 py-4 print:hidden sm:px-12">
        <Link to="/" className="font-sans text-sm text-paper-muted hover:text-paper-text">
          {t("car.voltar")}
        </Link>
      </div>

      <section className="grid gap-10 px-6 py-10 print:hidden sm:px-12 sm:py-14 lg:grid-cols-[1.4fr_1fr]">
        {/* Galeria */}
        <div>
          <CarImage
            car={carPrincipal}
            className="aspect-[16/10]"
            overlayClassName="flex items-end justify-between p-6"
          >
            <span className="font-sans text-xs tracking-wide text-paper-muted">
              {car.marca} {car.modelo}
            </span>
            <span className="font-sans text-xs tracking-wide text-paper-muted">{car.ano}</span>
          </CarImage>
          {galeria.length > 1 ? (
            <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-5">
              {galeria.map((url, i) => (
                <button
                  key={url + i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={`${t("car.verDetalhes")} ${i + 1}`}
                  className={`aspect-[4/3] overflow-hidden border bg-white transition-colors ${
                    i === activeImg ? "border-paper-text" : "border-paper-line hover:border-paper-muted"
                  }`}
                >
                  <img src={url} alt="" className="h-full w-full object-contain p-1" />
                </button>
              ))}
            </div>
          ) : (
            galeria.length === 0 && (
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
            )
          )}

          <div className="mt-10">
            <h2 className="font-head text-xl font-medium text-paper-text">{t("car.descricao")}</h2>
            <p className="mt-3 max-w-2xl font-sans text-[15px] leading-[1.75] text-paper-muted">
              {car.descricao}
            </p>
          </div>

          {gruposDestaques.map((grupo) => (
            <div key={grupo.id} className="mt-10">
              <h2 className="flex items-center gap-2.5 font-head text-xl font-medium text-paper-text">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-paper text-silver">
                  <DestaqueCategoriaIcon icone={grupo.icone} />
                </span>
                {grupo.label}
              </h2>
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {grupo.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 rounded-lg border border-paper-line bg-white px-3.5 py-3 font-sans text-[13px] text-paper-text"
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
          ))}
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
                {t("car.interesse")}
              </Link>
              <a
                href="tel:+351220000000"
                className="border border-paper-line px-5 py-3.5 text-center font-sans text-sm text-paper-text transition-colors hover:border-paper-text"
              >
                {t("car.ligar")}: 220 000 000
              </a>
            </div>

            <div className="relative mt-4 grid grid-cols-2 gap-2.5 border-t border-paper-line pt-4" ref={partilhaRef}>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 border border-paper-line px-3 py-2.5 font-sans text-xs text-paper-muted transition-colors hover:border-paper-text hover:text-paper-text"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M6 14h12v7H6v-7z" />
                </svg>
                {t("car.imprimirFicha")}
              </button>

              <button
                type="button"
                onClick={partilhar}
                aria-expanded={menuPartilhaAberto}
                className="flex items-center justify-center gap-2 border border-paper-line px-3 py-2.5 font-sans text-xs text-paper-muted transition-colors hover:border-paper-text hover:text-paper-text"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="18" cy="5" r="2.5" />
                  <circle cx="6" cy="12" r="2.5" />
                  <circle cx="18" cy="19" r="2.5" />
                  <path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" />
                </svg>
                {t("car.partilhar")}
              </button>

              {menuPartilhaAberto && (
                <div className="absolute right-0 top-full z-20 mt-2 w-full min-w-[13rem] border border-paper-line bg-white py-1.5 shadow-lg">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${textoPartilha} ${linkPartilha}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3.5 py-2 text-left font-sans text-sm text-paper-text transition-colors hover:bg-paper"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkPartilha)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3.5 py-2 text-left font-sans text-sm text-paper-text transition-colors hover:bg-paper"
                  >
                    Facebook
                  </a>
                  <button
                    type="button"
                    onClick={copiarLink}
                    className="block w-full px-3.5 py-2 text-left font-sans text-sm text-paper-text transition-colors hover:bg-paper"
                  >
                    {linkCopiado ? t("car.linkCopiado") : "Copiar link"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 border border-line bg-ink p-6">
            <div className="mb-1 font-sans text-xs tracking-wide text-silver">
              {t("car.fichaTecnica")}
            </div>
            {SPEC_ROWS(car, t).map(([specKey, label, val]) => (
              <div
                key={specKey}
                className="flex items-center justify-between border-t border-line py-3 font-sans"
              >
                <span className="flex items-center gap-2.5 text-sm text-muted">
                  <SpecIcon specKey={specKey} car={car} />
                  {label}
                </span>
                <span className="text-sm text-cream">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ficha para impressão / PDF — só aparece ao imprimir (botão "Imprimir
          ficha" chama window.print(); o resto da página fica escondido). */}
      <div className="hidden print:block">
        <div className="flex items-center justify-between border-b border-black/20 pb-4">
          <img src="/reis-mark.png" alt="Reis Prime Motors" className="h-8 w-auto" />
          <div className="text-right">
            <div className="text-lg font-semibold">
              {car.marca} {car.modelo}
            </div>
            <div className="text-2xl font-bold">{car.preco.toLocaleString("pt-PT")} €</div>
          </div>
        </div>

        {galeria.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-2">
            {galeria.slice(0, 3).map((url, i) => (
              <img
                key={url + i}
                src={url}
                alt=""
                className="aspect-[4/3] w-full border border-black/10 object-contain"
              />
            ))}
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm">
          {SPEC_ROWS(car, t).map(([specKey, label, val]) => (
            <div key={specKey} className="flex justify-between border-b border-black/10 py-1.5">
              <span className="text-black/60">{label}</span>
              <span className="font-medium">{val}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="text-xs font-semibold uppercase tracking-wide text-black/60">
            {t("car.descricao")}
          </div>
          <p className="mt-1 text-sm leading-relaxed">{car.descricao}</p>
        </div>

        {car.destaques?.length > 0 && (
          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-black/60">
              {t("car.destaques")}
            </div>
            <p className="mt-1 text-sm leading-relaxed">{car.destaques.join(" · ")}</p>
          </div>
        )}

        <div className="mt-10 border-t border-black/20 pt-4 text-xs text-black/60">
          Reis Prime Motors · geral@reisprimemotors.pt · 220 000 000
        </div>
      </div>
    </>
  );
}

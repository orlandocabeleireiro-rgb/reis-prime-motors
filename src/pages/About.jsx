import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function About() {
  const { t } = useLanguage();

  const valores = [
    [t("about.valor1Title"), t("about.valor1Texto")],
    [t("about.valor2Title"), t("about.valor2Texto")],
    [t("about.valor3Title"), t("about.valor3Texto")],
    [t("about.valor4Title"), t("about.valor4Texto")],
  ];

  return (
    <>
      <section className="bg-ink px-6 py-14 text-cream sm:px-12 sm:py-16">
        <h1 className="font-head text-4xl font-medium text-cream sm:text-5xl">
          {t("about.title")}
        </h1>
        <p className="mt-4 max-w-[560px] font-sans text-base leading-[1.7] text-muted">
          {t("about.subtitle")}
        </p>
      </section>

      <section className="px-6 py-14 sm:px-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-head text-2xl font-medium text-paper-text">
            {t("about.missaoTitle")}
          </h2>
          <p className="mt-4 font-sans text-[15px] leading-[1.75] text-paper-muted">
            {t("about.missaoTexto")}
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-head text-2xl font-medium text-paper-text">
            {t("about.valoresTitle")}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {valores.map(([title, texto]) => (
              <div key={title} className="border border-paper-line p-6">
                <div className="font-head text-lg font-medium text-paper-text">{title}</div>
                <p className="mt-2 font-sans text-sm leading-[1.7] text-paper-muted">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-6 py-14 text-center text-cream sm:px-12 sm:py-16">
        <h2 className="font-head text-2xl font-medium text-cream sm:text-3xl">
          {t("about.ctaTexto")}
        </h2>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="bg-white px-6 py-3.5 font-sans text-sm font-medium text-ink transition-opacity hover:opacity-90"
          >
            {t("about.ctaVer")}
          </Link>
          <Link
            to="/contactos"
            className="border border-line px-6 py-3.5 font-sans text-sm text-cream transition-colors hover:border-silver"
          >
            {t("about.ctaFalar")}
          </Link>
        </div>
      </section>
    </>
  );
}

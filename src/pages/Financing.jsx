import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Financing() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", valor: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);

  const passos = [
    [t("financing.passo1Title"), t("financing.passo1Texto")],
    [t("financing.passo2Title"), t("financing.passo2Texto")],
    [t("financing.passo3Title"), t("financing.passo3Texto")],
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Sem backend ligado: preparado para ser substituído por uma chamada
    // a um serviço de formulários ou a uma API própria.
    setEnviado(true);
  }

  return (
    <>
      <section className="bg-ink px-6 py-14 text-cream sm:px-12 sm:py-16">
        <h1 className="font-head text-4xl font-medium text-cream sm:text-5xl">
          {t("financing.title")}
        </h1>
        <p className="mt-4 max-w-[560px] font-sans text-base leading-[1.7] text-muted">
          {t("financing.subtitle")}
        </p>
      </section>

      <section className="bg-white px-6 py-14 sm:px-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-head text-2xl font-medium text-paper-text">
            {t("financing.comoFuncionaTitle")}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {passos.map(([title, texto], i) => (
              <div key={title} className="border border-paper-line p-6">
                <div className="font-head text-2xl text-silver">{i + 1}</div>
                <div className="mt-2 font-head text-lg font-medium text-paper-text">{title}</div>
                <p className="mt-2 font-sans text-sm leading-[1.7] text-paper-muted">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-12 sm:py-16">
        <div className="mx-auto max-w-xl">
          {enviado ? (
            <div className="border border-paper-line bg-white p-8 text-center">
              <h2 className="font-head text-xl font-medium text-paper-text">
                {t("financing.enviado")}
              </h2>
              <p className="mt-2 font-sans text-sm text-paper-muted">
                {t("financing.enviadoTexto")}
              </p>
              <button
                onClick={() => {
                  setForm({ nome: "", email: "", telefone: "", valor: "", mensagem: "" });
                  setEnviado(false);
                }}
                className="mt-6 border border-ink bg-ink px-5 py-3 font-sans text-sm text-white transition-opacity hover:opacity-85"
              >
                {t("financing.novoPedido")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-paper-line bg-white p-8">
              <h2 className="mb-6 font-head text-xl font-medium text-paper-text">
                {t("financing.formTitle")}
              </h2>

              <div className="flex flex-col gap-5">
                <label className="flex flex-col gap-1.5">
                  <span className="font-sans text-xs tracking-wide text-paper-muted">
                    {t("financing.nome")}
                  </span>
                  <input
                    required
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    className="border border-paper-line bg-paper px-3.5 py-2.5 font-sans text-sm text-paper-text outline-none focus:border-paper-text"
                  />
                </label>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="font-sans text-xs tracking-wide text-paper-muted">
                      {t("financing.email")}
                    </span>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="border border-paper-line bg-paper px-3.5 py-2.5 font-sans text-sm text-paper-text outline-none focus:border-paper-text"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-sans text-xs tracking-wide text-paper-muted">
                      {t("financing.telefone")}
                    </span>
                    <input
                      type="tel"
                      name="telefone"
                      value={form.telefone}
                      onChange={handleChange}
                      className="border border-paper-line bg-paper px-3.5 py-2.5 font-sans text-sm text-paper-text outline-none focus:border-paper-text"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="font-sans text-xs tracking-wide text-paper-muted">
                    {t("financing.valorPretendido")}
                  </span>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="500"
                      name="valor"
                      value={form.valor}
                      onChange={handleChange}
                      className="w-full border border-paper-line bg-paper px-3.5 py-2.5 pr-10 font-sans text-sm text-paper-text outline-none focus:border-paper-text"
                    />
                    <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 font-sans text-sm text-paper-muted">
                      €
                    </span>
                  </div>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-sans text-xs tracking-wide text-paper-muted">
                    {t("financing.mensagem")}
                  </span>
                  <textarea
                    name="mensagem"
                    rows={4}
                    value={form.mensagem}
                    onChange={handleChange}
                    className="resize-none border border-paper-line bg-paper px-3.5 py-2.5 font-sans text-sm text-paper-text outline-none focus:border-paper-text"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-2 bg-ink px-5 py-3.5 font-sans text-sm font-medium text-white transition-opacity hover:opacity-85"
                >
                  {t("financing.enviar")}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="bg-ink px-6 py-12 text-center text-cream sm:px-12">
        <p className="font-sans text-sm text-muted">{t("financing.ctaTexto")}</p>
        <Link
          to="/contactos"
          className="mt-4 inline-block border border-line px-6 py-3 font-sans text-sm text-cream transition-colors hover:border-silver"
        >
          {t("financing.ctaFalar")}
        </Link>
      </section>
    </>
  );
}

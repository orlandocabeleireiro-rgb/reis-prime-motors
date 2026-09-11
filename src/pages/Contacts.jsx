import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const HORARIO = {
  pt: "Seg–Sex 09h30–19h00 · Sáb 10h00–13h00",
  es: "Lun–Vie 09:30–19:00 · Sáb 10:00–13:00",
  en: "Mon–Fri 9:30am–7pm · Sat 10am–1pm",
};

export default function Contacts() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);

  const info = [
    [t("contacts.morada"), "Rua Principal, 123 — 4420 Gondomar, Porto"],
    [t("contacts.telefone"), "220 000 000"],
    [t("contacts.email"), "geral@reisprimemotors.pt"],
    [t("contacts.horario"), HORARIO[lang] ?? HORARIO.pt],
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Sem backend ligado: preparado para ser substituído por uma chamada
    // a um serviço de formulários (ex. Formspree) ou a uma API própria.
    setEnviado(true);
  }

  return (
    <>
      <section className="bg-ink px-6 py-14 text-cream sm:px-12 sm:py-16">
        <h1 className="font-head text-4xl font-medium text-cream sm:text-5xl">
          {t("contacts.title")}
        </h1>
        <p className="mt-4 max-w-[520px] font-sans text-base leading-[1.7] text-muted">
          {t("contacts.subtitle")}
        </p>
      </section>

      <section className="grid gap-12 px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <img
            src="/reis-lockup.png"
            alt="Reis Prime Motors"
            className="mb-8 h-auto w-full max-w-[280px]"
          />

          <dl className="flex flex-col gap-5">
            {info.map(([label, val]) => (
              <div key={label} className="border-t border-paper-line pt-4 first:border-t-0 first:pt-0">
                <dt className="font-sans text-xs tracking-wide text-silver">{label}</dt>
                <dd className="mt-1 font-sans text-[15px] text-paper-text">{val}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 overflow-hidden border border-paper-line">
            <iframe
              title="Localização — Reis Prime Motors, Gondomar"
              src="https://www.google.com/maps?q=Gondomar,+Porto,+Portugal&output=embed"
              className="h-64 w-full grayscale"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div>
          {enviado ? (
            <div className="border border-paper-line bg-white p-8">
              <h2 className="font-head text-xl font-medium text-paper-text">
                {t("contacts.enviado")}
              </h2>
              <p className="mt-2 font-sans text-sm text-paper-muted">{t("contacts.enviadoTexto")}</p>
              <button
                onClick={() => {
                  setForm({ nome: "", email: "", telefone: "", mensagem: "" });
                  setEnviado(false);
                }}
                className="mt-6 border border-ink bg-ink px-5 py-3 font-sans text-sm text-white transition-opacity hover:opacity-85"
              >
                {t("contacts.novaMensagem")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-paper-line bg-white p-8">
              <h2 className="mb-6 font-head text-xl font-medium text-paper-text">
                {t("contacts.formTitle")}
              </h2>

              <div className="flex flex-col gap-5">
                <label className="flex flex-col gap-1.5">
                  <span className="font-sans text-xs tracking-wide text-paper-muted">
                    {t("contacts.nome")}
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
                      {t("contacts.email")}
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
                      {t("contacts.telefone")}
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
                    {t("contacts.mensagem")}
                  </span>
                  <textarea
                    required
                    name="mensagem"
                    rows={5}
                    value={form.mensagem}
                    onChange={handleChange}
                    className="resize-none border border-paper-line bg-paper px-3.5 py-2.5 font-sans text-sm text-paper-text outline-none focus:border-paper-text"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-2 bg-ink px-5 py-3.5 font-sans text-sm font-medium text-white transition-opacity hover:opacity-85"
                >
                  {t("contacts.enviar")}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

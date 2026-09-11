import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

// Ecrã de login/criar conta. Ainda sem sistema de autenticação ligado
// (fica preparado para, no futuro, ligar a um backend real) — por agora
// mostra o formulário e, ao submeter, avisa que a funcionalidade está
// a ser preparada.
export default function AccountModal({ open, onClose }) {
  const { t } = useLanguage();
  const [mode, setMode] = useState("entrar"); // "entrar" | "criarConta"
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    setSubmitted(false);
    setMode("entrar");
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-[24px] bg-white p-7 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex gap-6 font-head text-lg font-medium">
            <button
              onClick={() => setMode("entrar")}
              className={mode === "entrar" ? "text-paper-text" : "text-paper-muted"}
            >
              {t("account.entrar")}
            </button>
            <button
              onClick={() => setMode("criarConta")}
              className={mode === "criarConta" ? "text-paper-text" : "text-paper-muted"}
            >
              {t("account.criarConta")}
            </button>
          </div>
          <button
            onClick={onClose}
            aria-label={t("account.fechar")}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-paper-muted transition-colors hover:text-paper-text"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="py-4">
            <div className="font-head text-lg font-medium text-paper-text">
              {t("account.emBreveTitulo")}
            </div>
            <p className="mt-2 font-sans text-sm leading-[1.6] text-paper-muted">
              {t("account.emBreveTexto")}
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full bg-ink px-5 py-3 font-sans text-sm text-white transition-opacity hover:opacity-85"
            >
              {t("account.fechar")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "criarConta" && (
              <label className="flex flex-col gap-1.5">
                <span className="font-sans text-xs tracking-wide text-paper-muted">
                  {t("account.nome")}
                </span>
                <input
                  required
                  type="text"
                  className="border border-paper-line bg-paper px-3.5 py-2.5 font-sans text-sm text-paper-text outline-none focus:border-paper-text"
                />
              </label>
            )}
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-xs tracking-wide text-paper-muted">
                {t("account.email")}
              </span>
              <input
                required
                type="email"
                className="border border-paper-line bg-paper px-3.5 py-2.5 font-sans text-sm text-paper-text outline-none focus:border-paper-text"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-xs tracking-wide text-paper-muted">
                {t("account.palavraPasse")}
              </span>
              <input
                required
                type="password"
                className="border border-paper-line bg-paper px-3.5 py-2.5 font-sans text-sm text-paper-text outline-none focus:border-paper-text"
              />
            </label>

            <button
              type="submit"
              className="mt-1 bg-ink px-5 py-3 font-sans text-sm font-medium text-white transition-opacity hover:opacity-85"
            >
              {mode === "entrar" ? t("account.entrarBotao") : t("account.criarContaBotao")}
            </button>

            <button
              type="button"
              onClick={() => setMode(mode === "entrar" ? "criarConta" : "entrar")}
              className="font-sans text-xs text-paper-muted underline-offset-2 hover:text-paper-text hover:underline"
            >
              {mode === "entrar" ? t("account.semConta") : t("account.jaTemConta")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

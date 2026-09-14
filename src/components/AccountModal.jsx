import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

export default function AccountModal({ open, onClose }) {
  const { t } = useLanguage();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState("entrar"); // "entrar" | "criarConta"
  const [confirmado, setConfirmado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [palavraPasse, setPalavraPasse] = useState("");

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    setConfirmado(false);
    setErro(null);
    setLoading(false);
    setMode("entrar");
    setNome("");
    setEmail("");
    setPalavraPasse("");
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

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setLoading(true);

    const { error } = mode === "entrar" ? await signIn(email, palavraPasse) : await signUp(email, palavraPasse, nome);

    setLoading(false);

    if (error) {
      setErro(error);
      return;
    }

    if (mode === "entrar") {
      onClose();
    } else {
      // Por omissão o Supabase pede confirmação por email antes de deixar
      // iniciar sessão.
      setConfirmado(true);
    }
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
              onClick={() => {
                setMode("entrar");
                setErro(null);
              }}
              className={mode === "entrar" ? "text-paper-text" : "text-paper-muted"}
            >
              {t("account.entrar")}
            </button>
            <button
              onClick={() => {
                setMode("criarConta");
                setErro(null);
              }}
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

        {confirmado ? (
          <div className="py-4">
            <div className="font-head text-lg font-medium text-paper-text">
              {t("account.confirmeTitulo")}
            </div>
            <p className="mt-2 font-sans text-sm leading-[1.6] text-paper-muted">
              {t("account.confirmeTexto")}
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
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                minLength={6}
                value={palavraPasse}
                onChange={(e) => setPalavraPasse(e.target.value)}
                className="border border-paper-line bg-paper px-3.5 py-2.5 font-sans text-sm text-paper-text outline-none focus:border-paper-text"
              />
            </label>

            {erro && <p className="font-sans text-xs text-red-600">{t("account.erroGenerico")}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 bg-ink px-5 py-3 font-sans text-sm font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-60"
            >
              {mode === "entrar" ? t("account.entrarBotao") : t("account.criarContaBotao")}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode(mode === "entrar" ? "criarConta" : "entrar");
                setErro(null);
              }}
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

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-28 text-center sm:px-12">
      <div className="font-head text-6xl text-silver">404</div>
      <h1 className="mt-4 font-head text-2xl font-medium text-paper-text">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-sm font-sans text-sm text-paper-muted">
        A página que procura não existe ou foi removida.
      </p>
      <Link
        to="/"
        className="mt-8 border border-ink bg-ink px-5 py-3 font-sans text-sm text-white transition-opacity hover:opacity-85"
      >
        Voltar à página inicial
      </Link>
    </section>
  );
}

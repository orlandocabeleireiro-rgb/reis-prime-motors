import { useEffect, useState } from "react";
import CarCard from "./CarCard.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const ROWS = 3;

// Nº de colunas conforme os breakpoints do grid (ver classes abaixo) —
// usado só para calcular quantos cartões cabem em 3 filas por página.
function useColumns() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      setCols(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

// Mostra sempre no máximo 3 filas de cada vez — em vez de uma grelha
// enorme a exigir muito scroll, pagina-se para o lado com setas.
export default function CarCarousel({ cars }) {
  const { t } = useLanguage();
  const cols = useColumns();
  const perPage = cols * ROWS;
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [cars, perPage]);

  if (cars.length === 0) return null;

  const pageCount = Math.max(1, Math.ceil(cars.length / perPage));
  const current = Math.min(page, pageCount - 1);
  const start = current * perPage;
  const pageCars = cars.slice(start, start + perPage);

  return (
    <div>
      {pageCount > 1 && (
        <div className="mb-4 flex items-center justify-end gap-3">
          <span className="font-sans text-[13px] text-paper-muted">
            {current + 1} / {pageCount}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={current === 0}
              aria-label={t("home.anteriores")}
              className="flex h-9 w-9 items-center justify-center border border-paper-line text-paper-muted transition-colors hover:border-paper-text hover:text-paper-text disabled:pointer-events-none disabled:opacity-30"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={current === pageCount - 1}
              aria-label={t("home.seguintes")}
              className="flex h-9 w-9 items-center justify-center border border-paper-line text-paper-muted transition-colors hover:border-paper-text hover:text-paper-text disabled:pointer-events-none disabled:opacity-30"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pageCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}

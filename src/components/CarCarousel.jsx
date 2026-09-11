import { useRef } from "react";
import CarCard from "./CarCard.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function CarCarousel({ cars }) {
  const { t } = useLanguage();
  const trackRef = useRef(null);

  function scrollByPage(direction) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  }

  if (cars.length === 0) return null;

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <button
          onClick={() => scrollByPage(-1)}
          aria-label={t("home.anteriores")}
          className="flex h-9 w-9 items-center justify-center border border-paper-line text-paper-muted transition-colors hover:border-paper-text hover:text-paper-text"
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
          onClick={() => scrollByPage(1)}
          aria-label={t("home.seguintes")}
          className="flex h-9 w-9 items-center justify-center border border-paper-line text-paper-muted transition-colors hover:border-paper-text hover:text-paper-text"
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

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
      >
        {cars.map((car) => (
          <div
            key={car.id}
            className="w-[85%] flex-shrink-0 snap-start sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]"
          >
            <CarCard car={car} />
          </div>
        ))}
      </div>
    </div>
  );
}

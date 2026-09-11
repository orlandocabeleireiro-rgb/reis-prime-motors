import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const INTERVAL_MS = 5000;

export default function FeaturedCarousel({ cars }) {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (cars.length <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setIndex((i) => (i + 1) % cars.length);
      }
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [cars.length]);

  if (cars.length === 0) return null;

  return (
    <div
      className="min-w-0 self-start border border-line bg-surface"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="flex items-center justify-between px-7 pt-6">
        <span className="font-sans text-xs tracking-wide text-silver">Em destaque</span>
        <span className="font-sans text-xs text-muted">
          {index + 1} / {cars.length}
        </span>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {cars.map((car) => (
            <Link
              key={car.id}
              to={`/carros/${car.id}`}
              className="block w-full flex-shrink-0 px-7 pb-7 pt-5"
            >
              <div
                className="flex aspect-[16/9] items-end p-4"
                style={{
                  background:
                    "repeating-linear-gradient(135deg, #232323, #232323 10px, #1c1c1c 10px, #1c1c1c 20px)",
                }}
              >
                <span className="font-sans text-xs tracking-wide text-muted">{car.ano}</span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <div className="font-sans text-xs font-medium text-silver">{car.marca}</div>
                  <div className="font-head text-lg font-medium text-cream">{car.modelo}</div>
                </div>
                <div className="whitespace-nowrap font-head text-lg text-cream">
                  {car.preco.toLocaleString("pt-PT")} €
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {cars.length > 1 && (
        <div className="flex justify-center gap-1.5 pb-6">
          {cars.map((car, i) => (
            <button
              key={car.id}
              onClick={() => setIndex(i)}
              aria-label={`Ver ${car.marca} ${car.modelo}`}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === index ? "bg-silver" : "bg-line"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

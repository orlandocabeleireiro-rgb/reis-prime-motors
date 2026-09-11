import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CarImage from "./CarImage.jsx";

const INTERVAL_MS = 5000;
const DRAG_THRESHOLD_PX = 60;
const CLICK_SUPPRESS_PX = 8;

export default function FeaturedCarousel({ cars }) {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const pausedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const draggedRef = useRef(false);

  useEffect(() => {
    if (cars.length <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setIndex((i) => (i + 1) % cars.length);
      }
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [cars.length]);

  // Arrasto: usa listeners no window (em vez de pointer capture no
  // elemento) para não desviar o evento de "click" do link de cada slide.
  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e) => {
      const delta = e.clientX - dragStartXRef.current;
      if (Math.abs(delta) > CLICK_SUPPRESS_PX) draggedRef.current = true;
      dragOffsetRef.current = delta;
      setDragOffset(delta);
    };

    const handleUp = () => {
      const delta = dragOffsetRef.current;
      if (delta <= -DRAG_THRESHOLD_PX) {
        setIndex((i) => (i + 1) % cars.length);
      } else if (delta >= DRAG_THRESHOLD_PX) {
        setIndex((i) => (i - 1 + cars.length) % cars.length);
      }
      setDragging(false);
      setDragOffset(0);
      dragOffsetRef.current = 0;
      pausedRef.current = false;
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [dragging, cars.length]);

  if (cars.length === 0) return null;

  const goTo = (i) => setIndex((i + cars.length) % cars.length);

  function handlePointerDown(e) {
    if (cars.length <= 1) return;
    dragStartXRef.current = e.clientX;
    dragOffsetRef.current = 0;
    draggedRef.current = false;
    pausedRef.current = true;
    setDragging(true);
  }

  function handleSlideClick(e) {
    if (draggedRef.current) {
      e.preventDefault();
      draggedRef.current = false;
    }
  }

  return (
    <div
      className="min-w-0 self-start border border-line bg-surface"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = dragging ? pausedRef.current : false;
      }}
    >
      <div className="flex items-center justify-between px-7 pt-6">
        <span className="font-sans text-xs tracking-wide text-silver">Em destaque</span>
        <span className="font-sans text-xs text-muted">
          {index + 1} / {cars.length}
        </span>
      </div>

      <div
        className="touch-pan-y select-none overflow-hidden"
        onPointerDown={handlePointerDown}
      >
        <div
          className={`flex ${dragging ? "" : "transition-transform duration-700 ease-out"}`}
          style={{ transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))` }}
        >
          {cars.map((car) => (
            <Link
              key={car.id}
              to={`/carros/${car.id}`}
              onClick={handleSlideClick}
              draggable={false}
              className="block w-full flex-shrink-0 px-8 pb-8 pt-6"
            >
              <CarImage
                car={car}
                theme="dark"
                className="aspect-[4/3]"
                overlayClassName="flex items-end p-4"
              >
                <span className="font-sans text-xs tracking-wide text-muted">{car.ano}</span>
              </CarImage>
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
              onClick={() => goTo(i)}
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

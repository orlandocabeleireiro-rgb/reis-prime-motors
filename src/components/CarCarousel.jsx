import CarCard from "./CarCard.jsx";

// Grelha simples dos cartões de uma página — a paginação (3 filas de
// cada vez, com setas) é controlada pelo componente pai (Home.jsx).
export default function CarCarousel({ cars }) {
  if (cars.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

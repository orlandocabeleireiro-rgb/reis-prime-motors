// Mostra a fotografia real da viatura quando existe (car.imagem); caso
// contrário, mostra o padrão placeholder (diagonal) usado em todo o site
// enquanto não há fotos. O texto/legenda (children) só aparece sobre o
// placeholder — sobre uma fotografia real não faz sentido sobrepor texto.
export default function CarImage({ car, className = "", overlayClassName = "", theme = "light", children }) {
  const stripe =
    theme === "dark"
      ? "repeating-linear-gradient(135deg, #232323, #232323 10px, #1c1c1c 10px, #1c1c1c 20px)"
      : "repeating-linear-gradient(135deg, #ececea, #ececea 10px, #e2e2df 10px, #e2e2df 20px)";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: car.imagem ? (theme === "dark" ? "#181818" : "#ffffff") : stripe,
      }}
    >
      {car.imagem && (
        <img
          src={car.imagem}
          alt={`${car.marca} ${car.modelo}`}
          className="absolute inset-0 h-full w-full object-contain p-2"
        />
      )}
      {!car.imagem && children && (
        <div className={`absolute inset-0 ${overlayClassName}`}>{children}</div>
      )}
    </div>
  );
}

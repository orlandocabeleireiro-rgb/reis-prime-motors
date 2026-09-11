import { useEffect, useState } from "react";

// Nº de colunas conforme os breakpoints do grid de viaturas
// (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3).
export function useColumns() {
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

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import { CARS as CARS_ESTATICO } from "../data/cars.js";

const CarsContext = createContext(null);

// Vai buscar as viaturas à base de dados (Supabase). Se o Supabase não
// estiver configurado (ex. ambiente local sem as variáveis definidas),
// usa os dados estáticos como reserva, para o site nunca ficar vazio.
export function CarsProvider({ children }) {
  const [cars, setCars] = useState(CARS_ESTATICO);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!supabase) {
      setCars(CARS_ESTATICO);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.from("cars").select("*").order("id");
    if (!error && data) {
      setCars(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <CarsContext.Provider value={{ cars, loading, refetch }}>{children}</CarsContext.Provider>
  );
}

export function useCars() {
  const ctx = useContext(CarsContext);
  if (!ctx) throw new Error("useCars deve ser usado dentro de <CarsProvider>");
  return ctx;
}

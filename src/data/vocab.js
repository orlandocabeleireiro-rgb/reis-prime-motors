// Traduções de vocabulário controlado usado nos dados dos carros
// (combustível, transmissão, cor). A chave é sempre o valor em
// português, tal como está em cars.js — é esse valor que continua a
// ser usado internamente para filtrar; isto só serve para apresentação.
export const COMBUSTIVEL_MAP = {
  Diesel: { es: "Diésel", en: "Diesel" },
  Gasolina: { es: "Gasolina", en: "Petrol" },
  "Elétrico": { es: "Eléctrico", en: "Electric" },
  "Híbrido (Gasolina)": { es: "Híbrido (Gasolina)", en: "Hybrid (Petrol)" },
  "Híbrido (Diesel)": { es: "Híbrido (Diésel)", en: "Hybrid (Diesel)" },
};

export const TRANSMISSAO_MAP = {
  "Automática": { es: "Automática", en: "Automatic" },
  Manual: { es: "Manual", en: "Manual" },
};

export const COR_MAP = {
  "Cinzento Mineral": { es: "Gris Mineral", en: "Mineral Grey" },
  "Branco Polar": { es: "Blanco Polar", en: "Polar White" },
  "Preto Mítico": { es: "Negro Mítico", en: "Mythos Black" },
  "Prateado": { es: "Plateado", en: "Silver" },
  "Vermelho Flame": { es: "Rojo Flame", en: "Flame Red" },
  "Cinzento Artense": { es: "Gris Artense", en: "Artense Grey" },
  "Branco Pérola": { es: "Blanco Perla", en: "Pearl White" },
  "Preto Ébano": { es: "Negro Ébano", en: "Ebony Black" },
  "Cinzento Magnetic": { es: "Gris Magnetic", en: "Magnetic Grey" },
  "Prateado Metalizado": { es: "Plateado Metalizado", en: "Metallic Silver" },
  "Verde Menta": { es: "Verde Menta", en: "Mint Green" },
  "Cinzento Gun Metallic": { es: "Gris Gun Metallic", en: "Gun Metallic Grey" },
  "Azul Ocean": { es: "Azul Ocean", en: "Ocean Blue" },
  "Vermelho Aden": { es: "Rojo Aden", en: "Aden Red" },
  "Azul Surf": { es: "Azul Surf", en: "Surf Blue" },
  "Cinzento Osmium": { es: "Gris Osmium", en: "Osmium Grey" },
  "Cinzento Magnésio": { es: "Gris Magnesio", en: "Magnesium Grey" },
  "Vermelho Chili": { es: "Rojo Chili", en: "Chili Red" },
  "Cinzento Corris": { es: "Gris Corris", en: "Corris Grey" },
  "Preto Shadow": { es: "Negro Shadow", en: "Shadow Black" },
  "Gris Magnetic": { es: "Gris Magnetic", en: "Magnetic Grey" },
  "Prateado Iridium": { es: "Plateado Iridium", en: "Iridium Silver" },
  "Preto Obsidiana": { es: "Negro Obsidiana", en: "Obsidian Black" },
  "Prateado GT": { es: "Plateado GT", en: "GT Silver" },
  "Cinzento GT Silver": { es: "Gris GT Silver", en: "GT Silver Grey" },
};

export function translateVocab(map, value, lang) {
  if (lang === "pt" || !value) return value;
  return map[value]?.[lang] ?? value;
}

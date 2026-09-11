// Traduções de vocabulário controlado usado nos dados dos carros
// (combustível, transmissão, cor). A chave é sempre o valor em
// português, tal como está em cars.js — é esse valor que continua a
// ser usado internamente para filtrar; isto só serve para apresentação.
export const COMBUSTIVEL_MAP = {
  Diesel: { es: "Diésel", en: "Diesel", fr: "Diesel" },
  Gasolina: { es: "Gasolina", en: "Petrol", fr: "Essence" },
  "Elétrico": { es: "Eléctrico", en: "Electric", fr: "Électrique" },
  "Híbrido (Gasolina)": {
    es: "Híbrido (Gasolina)",
    en: "Hybrid (Petrol)",
    fr: "Hybride (Essence)",
  },
  "Híbrido (Diesel)": { es: "Híbrido (Diésel)", en: "Hybrid (Diesel)", fr: "Hybride (Diesel)" },
};

export const TRANSMISSAO_MAP = {
  "Automática": { es: "Automática", en: "Automatic", fr: "Automatique" },
  Manual: { es: "Manual", en: "Manual", fr: "Manuelle" },
};

export const COR_MAP = {
  "Cinzento Mineral": { es: "Gris Mineral", en: "Mineral Grey", fr: "Gris Minéral" },
  "Branco Polar": { es: "Blanco Polar", en: "Polar White", fr: "Blanc Polaire" },
  "Preto Mítico": { es: "Negro Mítico", en: "Mythos Black", fr: "Noir Mythos" },
  "Prateado": { es: "Plateado", en: "Silver", fr: "Argent" },
  "Vermelho Flame": { es: "Rojo Flame", en: "Flame Red", fr: "Rouge Flame" },
  "Cinzento Artense": { es: "Gris Artense", en: "Artense Grey", fr: "Gris Artense" },
  "Branco Pérola": { es: "Blanco Perla", en: "Pearl White", fr: "Blanc Perle" },
  "Preto Ébano": { es: "Negro Ébano", en: "Ebony Black", fr: "Noir Ébène" },
  "Cinzento Magnetic": { es: "Gris Magnetic", en: "Magnetic Grey", fr: "Gris Magnetic" },
  "Prateado Metalizado": {
    es: "Plateado Metalizado",
    en: "Metallic Silver",
    fr: "Argent Métallisé",
  },
  "Verde Menta": { es: "Verde Menta", en: "Mint Green", fr: "Vert Menthe" },
  "Cinzento Gun Metallic": {
    es: "Gris Gun Metallic",
    en: "Gun Metallic Grey",
    fr: "Gris Gun Metallic",
  },
  "Azul Ocean": { es: "Azul Ocean", en: "Ocean Blue", fr: "Bleu Océan" },
  "Vermelho Aden": { es: "Rojo Aden", en: "Aden Red", fr: "Rouge Aden" },
  "Azul Surf": { es: "Azul Surf", en: "Surf Blue", fr: "Bleu Surf" },
  "Cinzento Osmium": { es: "Gris Osmium", en: "Osmium Grey", fr: "Gris Osmium" },
  "Cinzento Magnésio": { es: "Gris Magnesio", en: "Magnesium Grey", fr: "Gris Magnésium" },
  "Vermelho Chili": { es: "Rojo Chili", en: "Chili Red", fr: "Rouge Chili" },
  "Cinzento Corris": { es: "Gris Corris", en: "Corris Grey", fr: "Gris Corris" },
  "Preto Shadow": { es: "Negro Shadow", en: "Shadow Black", fr: "Noir Shadow" },
  "Gris Magnetic": { es: "Gris Magnetic", en: "Magnetic Grey", fr: "Gris Magnetic" },
  "Prateado Iridium": { es: "Plateado Iridium", en: "Iridium Silver", fr: "Argent Iridium" },
  "Preto Obsidiana": { es: "Negro Obsidiana", en: "Obsidian Black", fr: "Noir Obsidienne" },
  "Prateado GT": { es: "Plateado GT", en: "GT Silver", fr: "Argent GT" },
  "Cinzento GT Silver": { es: "Gris GT Silver", en: "GT Silver Grey", fr: "Gris GT Silver" },
  "Vermelho Rapid Red": { es: "Rojo Rapid Red", en: "Rapid Red", fr: "Rouge Rapid Red" },
};

export function translateVocab(map, value, lang) {
  if (lang === "pt" || !value) return value;
  return map[value]?.[lang] ?? value;
}

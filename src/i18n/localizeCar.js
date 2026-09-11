import TRANSLATIONS from "../data/carTranslations.js";
import { COMBUSTIVEL_MAP, TRANSMISSAO_MAP, COR_MAP, translateVocab } from "../data/vocab.js";

// Devolve uma cópia do carro com descrição/destaques traduzidos e o
// vocabulário controlado (combustível, transmissão, cor) apresentado no
// idioma escolhido. Marca e modelo mantêm-se sempre (nomes próprios).
// O português continua a ser a fonte de verdade usada nos filtros — esta
// função só afeta o que é mostrado ao utilizador.
export function localizeCar(car, lang) {
  if (!car) return car;

  const content = lang === "pt" ? null : TRANSLATIONS[car.id]?.[lang];

  return {
    ...car,
    descricao: content?.descricao ?? car.descricao,
    destaques: content?.destaques ?? car.destaques,
    combustivel: translateVocab(COMBUSTIVEL_MAP, car.combustivel, lang),
    transmissao: translateVocab(TRANSMISSAO_MAP, car.transmissao, lang),
    cor: translateVocab(COR_MAP, car.cor, lang),
  };
}

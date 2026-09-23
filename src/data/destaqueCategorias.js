// Agrupa a lista de destaques (equipamento) da viatura em categorias —
// Segurança, Faróis, Bancos, Multimédia, etc. — para uma apresentação
// mais organizada na página da viatura, com um ícone por secção, à
// semelhança dos grandes sites de anúncios de automóveis.
//
// A deteção da categoria de cada destaque é sempre feita a partir do
// texto em português (fonte de verdade, escrito pelo administrador),
// por palavras-chave — assim o agrupamento fica correto independentemente
// do idioma em que o destaque está a ser mostrado ao visitante.

const CATEGORIAS = [
  {
    id: "seguranca",
    icone: "escudo",
    label: {
      pt: "Segurança & Desempenho",
      es: "Seguridad y prestaciones",
      en: "Safety & performance",
      fr: "Sécurité et performance",
    },
    palavras: [
      "airbag", "abs", "esp", "isofix", "travao", "traves", "suspensao",
      "estabilidade", "assistente", "sensor de estacionamento", "camara",
      "start/stop", "start-stop", "pressao dos pneus", "tracao integral",
      "direcao assistida", "pasm", "brembo",
    ],
  },
  {
    id: "farois",
    icone: "farol",
    label: { pt: "Faróis & Iluminação", es: "Faros e iluminación", en: "Lights", fr: "Phares et éclairage" },
    palavras: ["farol", "farois", "luz", "luzes", "led", "xenon"],
  },
  {
    id: "retrovisores",
    icone: "retrovisor",
    label: { pt: "Retrovisores", es: "Retrovisores", en: "Mirrors", fr: "Rétroviseurs" },
    palavras: ["retrovisor", "espelho"],
  },
  {
    id: "vidros",
    icone: "vidro",
    label: { pt: "Vidros & Teto", es: "Cristales y techo", en: "Windows & roof", fr: "Vitres et toit" },
    palavras: ["vidro", "para-brisas", "parabrisas", "teto panoramico", "teto solar", "tejadilho"],
  },
  {
    id: "bancos",
    icone: "banco",
    label: { pt: "Bancos & Interior", es: "Asientos e interior", en: "Seats & interior", fr: "Sièges et intérieur" },
    palavras: [
      "banco", "bancos", "assento", "apoio de braco", "estofo", "lombar",
      "pele", "couro", "alcantara", "recaro", "volante",
    ],
  },
  {
    id: "multimedia",
    icone: "multimedia",
    label: { pt: "Conforto & Multimédia", es: "Confort y multimedia", en: "Comfort & multimedia", fr: "Confort et multimédia" },
    palavras: [
      "bluetooth", "gps", "navegacao", "carplay", "android auto", "usb",
      "ecra", "som", "harman", "meridian", "wireless", "internet", "mbux",
      "cockpit", "head-up", "por voz", "atualizacoes", "over-the-air",
    ],
  },
  {
    id: "exterior",
    icone: "jante",
    label: { pt: "Exterior", es: "Exterior", en: "Exterior", fr: "Extérieur" },
    palavras: ["jante", "jantes", "pneu", "pneus", "escape", "pintura", "portada"],
  },
];

const GERAL = {
  id: "geral",
  icone: "info",
  label: { pt: "Informação Geral", es: "Información general", en: "General information", fr: "Informations générales" },
};

function semAcentos(texto) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

// destaquesPt: array de destaques em português (fonte), usado só para
// detetar a categoria de cada item pela posição.
// destaquesExibir: array (mesma ordem/comprimento) com o texto a mostrar,
// já no idioma escolhido pelo visitante.
export function agruparDestaques(destaquesPt, destaquesExibir, lang) {
  const fonte = destaquesPt?.length ? destaquesPt : destaquesExibir ?? [];
  const grupos = new Map();

  fonte.forEach((textoPt, i) => {
    const textoExibir = destaquesExibir?.[i] ?? textoPt;
    const normalizado = semAcentos(textoPt);
    const categoria =
      CATEGORIAS.find((c) => c.palavras.some((p) => normalizado.includes(semAcentos(p)))) ?? GERAL;
    if (!grupos.has(categoria.id)) grupos.set(categoria.id, { ...categoria, items: [] });
    grupos.get(categoria.id).items.push(textoExibir);
  });

  const ordem = [GERAL.id, ...CATEGORIAS.map((c) => c.id)];
  return ordem
    .map((id) => grupos.get(id))
    .filter(Boolean)
    .map((g) => ({ ...g, label: g.label[lang] ?? g.label.pt }));
}

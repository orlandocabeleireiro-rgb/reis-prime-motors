import BrandIcon from "./BrandIcon.jsx";
import SelectField from "./SelectField.jsx";
import PriceField from "./PriceField.jsx";

export default function CarSearch({
  marcas,
  marca,
  onSelectMarca,
  modelos,
  modelo,
  setModelo,
  combustiveis,
  combustivel,
  setCombustivel,
  precoMax,
  setPrecoMax,
  resultCount,
  onSearch,
}) {
  return (
    <div className="border border-paper-line bg-white p-6 sm:p-8">
      {/* Marcas — fila a deslizar sozinha; clicar filtra e vai aos resultados */}
      <div className="overflow-hidden">
        <div className="marcas-marquee-track flex w-max items-center gap-10">
          {[...marcas, ...marcas].map((m, i) => (
            <button
              key={`${m}-${i}`}
              onClick={() => onSelectMarca(m)}
              title={m}
              className={`flex flex-shrink-0 flex-col items-center gap-2 text-paper-muted transition-colors hover:text-paper-text ${
                marca === m ? "text-paper-text" : ""
              }`}
            >
              <BrandIcon marca={m} className="h-9 w-9" />
              <span
                className={`h-0.5 w-6 transition-colors ${
                  marca === m ? "bg-silver" : "bg-transparent"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 border-t border-paper-line pt-7">
        <div className="mb-4 font-head text-lg font-medium tracking-wide text-paper-text">
          Pesquisa de viaturas
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:flex-wrap">
          <SelectField
            label="Marca"
            value={marca}
            onChange={(e) => onSelectMarca(e.target.value, { scroll: false })}
            options={[
              { value: "Todas", label: "Todas as marcas" },
              ...marcas.map((m) => ({ value: m, label: m })),
            ]}
          />
          <SelectField
            label="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            options={[
              { value: "Todos", label: "Todos os modelos" },
              ...modelos.map((m) => ({ value: m, label: m })),
            ]}
          />
          <SelectField
            label="Combustível"
            value={combustivel}
            onChange={(e) => setCombustivel(e.target.value)}
            options={[
              { value: "Todos", label: "Todos os combustíveis" },
              ...combustiveis.map((c) => ({ value: c, label: c })),
            ]}
          />
          <PriceField
            label="Preço máximo"
            value={precoMax}
            onChange={(e) => {
              const v = e.target.value;
              setPrecoMax(v === "" ? null : Number(v));
            }}
          />
          <button
            onClick={onSearch}
            className="flex items-center justify-center gap-2 bg-ink px-6 py-3 font-sans text-sm font-medium text-white transition-opacity hover:opacity-85 sm:w-auto"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Pesquisar ({resultCount})
          </button>
        </div>
      </div>
    </div>
  );
}

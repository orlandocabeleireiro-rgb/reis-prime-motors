import BrandIcon from "./BrandIcon.jsx";
import SelectField from "./SelectField.jsx";

export default function CarSearch({
  marcas,
  marca,
  setMarca,
  combustiveis,
  combustivel,
  setCombustivel,
  precoMax,
  setPrecoMax,
  precoOpcoes,
  resultCount,
  onSearch,
}) {
  return (
    <div className="border border-paper-line bg-white p-6 sm:p-8">
      {/* Marcas — atalho visual, clica para filtrar diretamente */}
      <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
        {marcas.map((m) => (
          <button
            key={m}
            onClick={() => setMarca(marca === m ? "Todas" : m)}
            title={m}
            className={`flex flex-col items-center gap-1.5 text-paper-muted transition-colors hover:text-paper-text ${
              marca === m ? "text-paper-text" : ""
            }`}
          >
            <BrandIcon marca={m} className="h-7 w-7" />
            <span
              className={`h-0.5 w-5 transition-colors ${
                marca === m ? "bg-silver" : "bg-transparent"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="mt-7 border-t border-paper-line pt-7">
        <div className="mb-4 font-head text-lg font-medium tracking-wide text-paper-text">
          Pesquisa de viaturas
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <SelectField
            label="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            options={[
              { value: "Todas", label: "Todas as marcas" },
              ...marcas.map((m) => ({ value: m, label: m })),
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
          <SelectField
            label="Preço máximo"
            value={String(precoMax)}
            onChange={(e) => setPrecoMax(Number(e.target.value))}
            options={precoOpcoes.map((p) => ({
              value: String(p),
              label: `Até ${p.toLocaleString("pt-PT")} €`,
            }))}
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

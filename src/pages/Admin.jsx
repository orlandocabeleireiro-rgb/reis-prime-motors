import { useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { useCars } from "../cars/CarsContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
import CarForm from "../components/CarForm.jsx";

export default function Admin() {
  const { user, loading, isAdmin, signIn } = useAuth();
  const { cars, loading: carsLoading, refetch } = useCars();
  const [editing, setEditing] = useState(null); // null = fechado, {} = novo, car = editar
  const [email, setEmail] = useState("");
  const [palavraPasse, setPalavraPasse] = useState("");
  const [erroLogin, setErroLogin] = useState(null);
  const [apagando, setApagando] = useState(null);

  if (loading) return null;

  // Sem sessão — mostra um mini-login em vez de redirecionar, para não
  // haver confusão com o resto do site.
  if (!user) {
    return (
      <section className="mx-auto max-w-sm px-6 py-20 sm:px-12">
        <h1 className="font-head text-2xl font-medium text-paper-text">Administração</h1>
        <p className="mt-2 font-sans text-sm text-paper-muted">Inicie sessão para continuar.</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setErroLogin(null);
            const { error } = await signIn(email, palavraPasse);
            if (error) setErroLogin(error);
          }}
          className="mt-6 flex flex-col gap-4"
        >
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-paper-line bg-paper px-3.5 py-2.5 font-sans text-sm outline-none focus:border-paper-text"
          />
          <input
            required
            type="password"
            placeholder="Palavra-passe"
            value={palavraPasse}
            onChange={(e) => setPalavraPasse(e.target.value)}
            className="border border-paper-line bg-paper px-3.5 py-2.5 font-sans text-sm outline-none focus:border-paper-text"
          />
          {erroLogin && <p className="font-sans text-xs text-red-600">{erroLogin}</p>}
          <button
            type="submit"
            className="bg-ink px-5 py-3 font-sans text-sm font-medium text-white transition-opacity hover:opacity-85"
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-sm px-6 py-20 text-center sm:px-12">
        <h1 className="font-head text-2xl font-medium text-paper-text">Acesso restrito</h1>
        <p className="mt-2 font-sans text-sm text-paper-muted">
          A sua conta não tem permissões de administração.
        </p>
      </section>
    );
  }

  async function handleDelete(car) {
    if (!confirm(`Remover "${car.marca} ${car.modelo}"? Esta ação não pode ser desfeita.`)) return;
    setApagando(car.id);
    await supabase.from("cars").delete().eq("id", car.id);
    await refetch();
    setApagando(null);
  }

  return (
    <section className="px-6 py-10 sm:px-12 sm:py-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-head text-2xl font-medium text-paper-text sm:text-3xl">
          Administração — Viaturas
        </h1>
        {!editing && (
          <button
            onClick={() => setEditing({})}
            className="bg-ink px-5 py-2.5 font-sans text-sm font-medium text-white transition-opacity hover:opacity-85"
          >
            + Adicionar viatura
          </button>
        )}
      </div>

      {editing ? (
        <CarForm
          car={editing.id ? editing : null}
          onSaved={() => setEditing(null)}
          onCancel={() => setEditing(null)}
        />
      ) : carsLoading ? (
        <p className="font-sans text-sm text-paper-muted">A carregar...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {cars.map((car) => (
            <div
              key={car.id}
              className="flex flex-wrap items-center justify-between gap-3 border border-paper-line bg-white p-4"
            >
              <div className="flex items-center gap-4">
                {car.imagem ? (
                  <img src={car.imagem} alt="" className="h-14 w-20 object-contain bg-paper" />
                ) : (
                  <div className="h-14 w-20 bg-paper" />
                )}
                <div>
                  <div className="font-sans text-xs text-silver">{car.marca}</div>
                  <div className="font-head text-base font-medium text-paper-text">{car.modelo}</div>
                  <div className="font-sans text-xs text-paper-muted">
                    {car.ano} · {car.preco?.toLocaleString("pt-PT")} €
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(car)}
                  className="border border-paper-line px-4 py-2 font-sans text-xs text-paper-text transition-colors hover:border-paper-text"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(car)}
                  disabled={apagando === car.id}
                  className="border border-red-200 px-4 py-2 font-sans text-xs text-red-600 transition-colors hover:border-red-600 disabled:opacity-50"
                >
                  {apagando === car.id ? "..." : "Remover"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

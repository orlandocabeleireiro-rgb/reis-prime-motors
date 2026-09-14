import { useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import { useCars } from "../cars/CarsContext.jsx";

const COMBUSTIVEL_OPCOES = [
  "Gasolina",
  "Diesel",
  "Elétrico",
  "Híbrido (Gasolina)",
  "Híbrido (Diesel)",
];
const TRANSMISSAO_OPCOES = ["Manual", "Automática"];

const VAZIO = {
  marca: "",
  modelo: "",
  ano: "",
  km: "",
  preco: "",
  combustivel: "Gasolina",
  transmissao: "Automática",
  cor: "",
  portas: "",
  potencia: "",
  consumo: "",
  descricao: "",
  destaquesTexto: "",
};

let proximoId = 1;

// A ordem deste array é a ordem final das fotos no site — a primeira é
// sempre a foto de capa (a que aparece nos cartões e nos destaques).
function imagensIniciais(car) {
  const urls = car?.imagens?.length ? car.imagens : car?.imagem ? [car.imagem] : [];
  return urls.map((url) => ({ key: `imagem-${proximoId++}`, url, file: null }));
}

// Formulário para criar/editar uma viatura — usado dentro da área de
// administração. Escreve diretamente na tabela "cars" do Supabase.
//
// Fica guardado como rascunho até se clicar em "Publicar" — enquanto for
// rascunho, só quem tem sessão de administrador consegue ver a viatura
// (via "Pré-visualizar"); no site público não aparece.
export default function CarForm({ car, onSaved, onCancel }) {
  const { refetch } = useCars();
  const [form, setForm] = useState(
    car ? { ...car, destaquesTexto: (car.destaques ?? []).join("\n") } : VAZIO
  );
  const [imagens, setImagens] = useState(() => imagensIniciais(car));
  const [savedCar, setSavedCar] = useState(car ?? null);
  const [saving, setSaving] = useState(null); // null | "rascunho" | "publicar"
  const [erro, setErro] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleFiles(e) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const novas = files.map((file) => ({
      key: `nova-${proximoId++}`,
      url: URL.createObjectURL(file),
      file,
    }));
    setImagens((imgs) => [...imgs, ...novas]);
    e.target.value = "";
  }

  function moverImagem(index, direcao) {
    setImagens((imgs) => {
      const alvo = index + direcao;
      if (alvo < 0 || alvo >= imgs.length) return imgs;
      const copia = [...imgs];
      [copia[index], copia[alvo]] = [copia[alvo], copia[index]];
      return copia;
    });
  }

  function removerImagem(index) {
    setImagens((imgs) => imgs.filter((_, i) => i !== index));
  }

  async function guardar(publicado) {
    setErro(null);
    setSaving(publicado ? "publicar" : "rascunho");

    try {
      const urls = [];
      for (const img of imagens) {
        if (img.file) {
          const ext = img.file.name.split(".").pop();
          const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
          const { error: uploadError } = await supabase.storage
            .from("car-images")
            .upload(path, img.file);
          if (uploadError) throw uploadError;
          const { data: urlData } = supabase.storage.from("car-images").getPublicUrl(path);
          urls.push(urlData.publicUrl);
        } else {
          urls.push(img.url);
        }
      }

      const payload = {
        marca: form.marca.trim(),
        modelo: form.modelo.trim(),
        imagem: urls[0] ?? null,
        imagens: urls,
        publicado,
        ano: Number(form.ano),
        km: Number(form.km),
        preco: Number(form.preco),
        combustivel: form.combustivel,
        transmissao: form.transmissao,
        cor: form.cor.trim(),
        portas: Number(form.portas),
        potencia: Number(form.potencia),
        consumo: form.consumo.trim(),
        descricao: form.descricao.trim(),
        destaques: form.destaquesTexto
          .split("\n")
          .map((linha) => linha.trim())
          .filter(Boolean),
      };

      const query = savedCar?.id
        ? supabase.from("cars").update(payload).eq("id", savedCar.id).select().single()
        : supabase.from("cars").insert(payload).select().single();

      const { data, error } = await query;
      if (error) throw error;

      setSavedCar(data);
      await refetch();
    } catch (err) {
      setErro(err.message || "Não foi possível guardar.");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-paper-line bg-white p-6 shadow-sm sm:p-8">
      {savedCar?.id && (
        <div
          className={`flex flex-wrap items-center justify-between gap-3 rounded-lg px-4 py-3 font-sans text-xs ${
            savedCar.publicado === false
              ? "border border-amber-200 bg-amber-50 text-amber-800"
              : "border border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          <span>
            {savedCar.publicado === false ? (
              <>
                <strong>Rascunho</strong> — guardado, mas ainda invisível no site. Só tu consegues
                vê-lo através da pré-visualização.
              </>
            ) : (
              <>
                <strong>Publicado</strong> — já está visível no site para todos.
              </>
            )}
          </span>
          <a
            href={`/carros/${savedCar.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 whitespace-nowrap font-medium underline underline-offset-2"
          >
            Pré-visualizar ↗
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Campo label="Marca">
          <input required name="marca" value={form.marca} onChange={handleChange} className={inputClass} />
        </Campo>
        <Campo label="Modelo">
          <input required name="modelo" value={form.modelo} onChange={handleChange} className={inputClass} />
        </Campo>
        <Campo label="Ano">
          <input required type="number" name="ano" value={form.ano} onChange={handleChange} className={inputClass} />
        </Campo>
        <Campo label="Quilometragem">
          <input required type="number" name="km" value={form.km} onChange={handleChange} className={inputClass} />
        </Campo>
        <Campo label="Preço (€)">
          <input required type="number" name="preco" value={form.preco} onChange={handleChange} className={inputClass} />
        </Campo>
        <Campo label="Cor">
          <input required name="cor" value={form.cor} onChange={handleChange} className={inputClass} />
        </Campo>
        <Campo label="Combustível">
          <select name="combustivel" value={form.combustivel} onChange={handleChange} className={inputClass}>
            {COMBUSTIVEL_OPCOES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Campo>
        <Campo label="Transmissão">
          <select name="transmissao" value={form.transmissao} onChange={handleChange} className={inputClass}>
            {TRANSMISSAO_OPCOES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Campo>
        <Campo label="Portas">
          <input required type="number" name="portas" value={form.portas} onChange={handleChange} className={inputClass} />
        </Campo>
        <Campo label="Potência (cv)">
          <input required type="number" name="potencia" value={form.potencia} onChange={handleChange} className={inputClass} />
        </Campo>
        <Campo label="Consumo (ex.: 4,5 l/100km)">
          <input required name="consumo" value={form.consumo} onChange={handleChange} className={inputClass} />
        </Campo>
      </div>

      <Campo label="Descrição">
        <textarea
          required
          name="descricao"
          rows={4}
          value={form.descricao}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </Campo>

      <Campo label="Destaques (um por linha)">
        <textarea
          name="destaquesTexto"
          rows={5}
          value={form.destaquesTexto}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </Campo>

      <Campo label="Fotografias — a primeira é a foto de capa; usa as setas para mudar a ordem">
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-paper-line bg-paper px-4 py-6 font-sans text-sm text-paper-muted transition-colors hover:border-paper-text hover:text-paper-text">
          <span>+ Adicionar fotografias</span>
          <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
        </label>

        {imagens.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {imagens.map((img, i) => (
              <div
                key={img.key}
                className="relative overflow-hidden rounded-lg border border-paper-line bg-paper p-2"
              >
                {i === 0 && (
                  <span className="absolute left-2 top-2 z-10 rounded bg-ink px-1.5 py-0.5 font-sans text-[10px] font-medium text-white">
                    Capa
                  </span>
                )}
                <img src={img.url} alt="" className="aspect-[4/3] w-full object-contain" />
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => moverImagem(i, -1)}
                      disabled={i === 0}
                      aria-label="Mover para trás"
                      className={miniBtn}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => moverImagem(i, 1)}
                      disabled={i === imagens.length - 1}
                      aria-label="Mover para a frente"
                      className={miniBtn}
                    >
                      →
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removerImagem(i)}
                    className="font-sans text-[11px] text-red-600 hover:underline"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Campo>

      {erro && <p className="font-sans text-sm text-red-600">{erro}</p>}

      <div className="flex flex-wrap items-center gap-3 border-t border-paper-line pt-5">
        <button
          type="button"
          onClick={() => guardar(true)}
          disabled={saving !== null}
          className="bg-ink px-5 py-3 font-sans text-sm font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-60"
        >
          {saving === "publicar" ? "A publicar..." : "Publicar"}
        </button>
        <button
          type="button"
          onClick={() => guardar(false)}
          disabled={saving !== null}
          className="border border-paper-line px-5 py-3 font-sans text-sm text-paper-text transition-colors hover:border-paper-text disabled:opacity-60"
        >
          {saving === "rascunho" ? "A guardar..." : "Guardar como rascunho"}
        </button>
        <button
          type="button"
          onClick={onCancel ?? onSaved}
          className="ml-auto px-5 py-3 font-sans text-sm text-paper-muted transition-colors hover:text-paper-text"
        >
          Voltar à lista
        </button>
      </div>
    </div>
  );
}

const inputClass =
  "rounded-md border border-paper-line bg-paper px-3.5 py-2.5 font-sans text-sm text-paper-text outline-none focus:border-paper-text";

const miniBtn =
  "flex h-7 w-7 items-center justify-center rounded border border-paper-line bg-white font-sans text-xs text-paper-text transition-colors hover:border-paper-text disabled:pointer-events-none disabled:opacity-30";

function Campo({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-xs tracking-wide text-paper-muted">{label}</span>
      {children}
    </label>
  );
}

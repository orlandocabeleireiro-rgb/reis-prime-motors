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
  imagem: "",
};

// Formulário para criar/editar uma viatura — usado dentro da página de
// administração. Escreve diretamente na tabela "cars" do Supabase.
export default function CarForm({ car, onSaved, onCancel }) {
  const { refetch } = useCars();
  const [form, setForm] = useState(
    car
      ? { ...car, destaquesTexto: (car.destaques ?? []).join("\n") }
      : VAZIO
  );
  const [ficheiro, setFicheiro] = useState(null);
  const [preview, setPreview] = useState(car?.imagem ?? "");
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFicheiro(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setSaving(true);

    try {
      let imagemUrl = form.imagem || null;

      if (ficheiro) {
        const ext = ficheiro.name.split(".").pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("car-images")
          .upload(path, ficheiro);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("car-images").getPublicUrl(path);
        imagemUrl = urlData.publicUrl;
      }

      const payload = {
        marca: form.marca.trim(),
        modelo: form.modelo.trim(),
        imagem: imagemUrl,
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

      const query = car
        ? supabase.from("cars").update(payload).eq("id", car.id)
        : supabase.from("cars").insert(payload);

      const { error } = await query;
      if (error) throw error;

      await refetch();
      onSaved();
    } catch (err) {
      setErro(err.message || "Não foi possível guardar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 border border-paper-line bg-white p-6">
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

      <Campo label="Fotografia">
        <input type="file" accept="image/*" onChange={handleFile} className="font-sans text-sm" />
        {preview && (
          <img src={preview} alt="" className="mt-3 h-40 w-full max-w-xs object-contain border border-paper-line bg-paper p-2" />
        )}
      </Campo>

      {erro && <p className="font-sans text-sm text-red-600">{erro}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-ink px-5 py-3 font-sans text-sm font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-60"
        >
          {saving ? "A guardar..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-paper-line px-5 py-3 font-sans text-sm text-paper-text transition-colors hover:border-paper-text"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "border border-paper-line bg-paper px-3.5 py-2.5 font-sans text-sm text-paper-text outline-none focus:border-paper-text";

function Campo({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-xs tracking-wide text-paper-muted">{label}</span>
      {children}
    </label>
  );
}

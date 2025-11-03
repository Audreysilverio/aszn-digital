import { useState } from "react";
import api from "../../services/api";

export default function Doacoes() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    // telefone não é salvo no back atual; pode manter na UI se quiser, mas não enviaremos
    telefone: "",
    tipo: "dinheiro",
    valor: "",
    descricao: "",
    imagem_url: "",
    aceiteLGPD: false,
  });

  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk(false);

    if (!form.aceiteLGPD) {
      setErr("Você precisa aceitar a LGPD.");
      return;
    }

    // monta o payload do JEITO que o back espera
    const payload = {
      doador_nome: form.nome.trim(),
      doador_email: form.email.trim(),
      tipo: form.tipo, // dinheiro | alimento | livro | roupa | outro
      descricao: form.descricao.trim(),
      imagem_url: form.imagem_url.trim() || undefined,
    };
    if (form.tipo === "dinheiro") {
      payload.valor = form.valor; // API valida numérico > 0
    }

    try {
      setLoading(true);
      await api.post("/doacoes", payload);
      setOk(true);
      setForm({
        nome: "",
        email: "",
        telefone: "",
        tipo: "dinheiro",
        valor: "",
        descricao: "",
        imagem_url: "",
        aceiteLGPD: false,
      });
    } catch (e) {
      // interceptor do axios já transforma resposta do back em e.message (ex: "doador_email inválido", "tipo inválido", etc.)
      setErr(e.message || "Não foi possível enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto", padding: "0 1rem" }}>
      <h1 style={{ marginBottom: ".75rem" }}>Faça sua Doação</h1>
      <p style={{ marginBottom: "1.25rem", color: "#555" }}>
        Preencha seus dados e como deseja contribuir. Obrigado pelo apoio!
      </p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <input
          name="nome"
          value={form.nome}
          onChange={onChange}
          placeholder="Nome completo"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="E-mail"
          required
        />

        {/* Telefone é opcional; não é persistido no back atual */}
        <input
          name="telefone"
          value={form.telefone}
          onChange={onChange}
          placeholder="WhatsApp (opcional)"
        />

        <select name="tipo" value={form.tipo} onChange={onChange}>
          <option value="dinheiro">Dinheiro</option>
          <option value="alimento">Alimento</option>
          <option value="livro">Livro</option>
          <option value="roupa">Roupa</option>
          <option value="outro">Outro</option>
        </select>

        {form.tipo === "dinheiro" && (
          <input
            name="valor"
            value={form.valor}
            onChange={onChange}
            placeholder="Valor (ex.: 100.00)"
          />
        )}

        <textarea
          name="descricao"
          value={form.descricao}
          onChange={onChange}
          placeholder="Descrição / Observações"
          rows={4}
        />

        <input
          name="imagem_url"
          value={form.imagem_url}
          onChange={onChange}
          placeholder="Link de imagem (opcional)"
        />

        <label style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
          <input
            type="checkbox"
            name="aceiteLGPD"
            checked={form.aceiteLGPD}
            onChange={onChange}
          />
          Autorizo o uso dos meus dados conforme a LGPD.
        </label>

        <button
          disabled={loading}
          style={{
            background: "#c8102e",
            color: "#fff",
            border: 0,
            borderRadius: 8,
            padding: "0.75rem 1rem",
            fontWeight: 700,
          }}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {ok && (
          <p style={{ color: "#1a7f37" }}>
            ✅ Recebido! Obrigado pela contribuição.
          </p>
        )}
        {err && <p style={{ color: "#c8102e" }}>⚠️ {err}</p>}
      </form>
    </div>
  );
}

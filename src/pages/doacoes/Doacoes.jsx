import { useState } from "react";
import api from "../../services/api";

export default function Doacoes() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
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

    const payload = {
      doador_nome: form.nome.trim(),
      doador_email: form.email.trim(),
      tipo: form.tipo,
      descricao: form.descricao.trim(),
      imagem_url: form.imagem_url.trim() || undefined,
    };
    if (form.tipo === "dinheiro") payload.valor = form.valor;

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
      setErr(e.message || "Não foi possível enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="doacoes">
      <style>{`
        .doacoes {
          background-color: #fff;
          min-height: 100vh;
          padding: 3rem 1rem 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }

        .form-box {
          width: 100%;
          max-width: 600px;
          background: #fafafa;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          margin-bottom: 3rem;
        }

        h1 {
          text-align: center;
          margin-bottom: 0.5rem;
          font-size: 1.75rem;
          color: #111;
          text-transform: uppercase;
        }

        p.descricao {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #555;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        input, select, textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.2s ease;
        }

        input:focus, select:focus, textarea:focus {
          border-color: #c8102e;
          outline: none;
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        /* ===== LGPD: checkbox e texto lado a lado ===== */
        .checkbox-container {
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          gap: 0.5rem;
          width: 100%;
          font-size: 0.95rem;
          color: #333;
          line-height: 1.4;
          margin: 0.5rem 0 0.25rem;
        }

        .checkbox-container input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #c8102e; /* cor do check */
          margin: 0;
          position: relative;
          top: 1px;
        }

        button {
          background-color: #c8102e;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.9rem;
          font-weight: 700;
          font-size: 1rem;
          text-transform: uppercase;
          margin-top: 0.75rem;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.1s ease;
        }

        button:hover {
          background-color: #a20c23;
          transform: translateY(-1px);
        }

        button:disabled {
          background-color: #aaa;
          cursor: not-allowed;
          transform: none;
        }

        .msg-ok {
          background-color: #e8f5e9;
          color: #1a7f37;
          border: 1px solid #1a7f37;
          border-radius: 8px;
          padding: 0.8rem;
          text-align: center;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .msg-err {
          background-color: #fdecea;
          color: #c8102e;
          border: 1px solid #c8102e;
          border-radius: 8px;
          padding: 0.8rem;
          text-align: center;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .form-box {
            padding: 1.5rem;
            margin-bottom: 2rem;
          }
          h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="form-box">
        <h1>Faça sua Doação</h1>
        <p className="descricao">
          Preencha seus dados e como deseja contribuir. Obrigado pelo apoio!
        </p>

        <form onSubmit={onSubmit}>
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
              placeholder="Somente números (ex.: 100)"
            />
          )}
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={onChange}
            placeholder="Descrição / Observações"
          />
          <input
            name="imagem_url"
            value={form.imagem_url}
            onChange={onChange}
            placeholder="Link de imagem (opcional)"
          />

          {/* checkbox LGPD alinhado */}
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="aceiteLGPD"
              checked={form.aceiteLGPD}
              onChange={onChange}
            />
            <span>Autorizo o uso dos meus dados conforme a LGPD.</span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>

          {ok && (
            <p className="msg-ok">✅ Recebido! Obrigado pela contribuição.</p>
          )}
          {err && <p className="msg-err">⚠️ {err}</p>}
        </form>
      </div>
    </section>
  );
}

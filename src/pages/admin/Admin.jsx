import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

// opções de status por tipo (valores exatamente como o back espera)
const STATUS_VOLUNTARIOS = ["pendente", "aprovado", "recusado"];
const STATUS_DOACOES = ["pendente", "confirmada", "cancelada"];

// rótulos bonitinhos (opcional)
const label = {
  pendente: "Pendente",
  aprovado: "Aprovado",
  recusado: "Recusado",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
};

function StatusSelect({ value, onChange, tipo }) {
  const opcoes = tipo === "voluntarios" ? STATUS_VOLUNTARIOS : STATUS_DOACOES;
  return (
    <select value={value || "pendente"} onChange={(e)=>onChange(e.target.value)}>
      {opcoes.map((s) => (
        <option key={s} value={s}>{label[s] ?? s}</option>
      ))}
    </select>
  );
}

function Tabela({ dados, tipo, onAtualizar }) {
  // tipo: "voluntarios" | "doacoes"
  const cols = useMemo(() => {
    if (tipo === "voluntarios") {
      return ["Data", "Nome", "Área", "Disponibilidade", "Telefone", "Status", "Ações"];
    }
    return ["Data", "Doador", "Tipo", "Valor/Descrição", "Telefone", "Status", "Ações"];
  }, [tipo]);

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {cols.map((c) => (
              <th
                key={c}
                style={{
                  textAlign: "left",
                  padding: "10px 8px",
                  borderBottom: "1px solid #eee",
                  fontWeight: 700,
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f3f3" }}>
                {item.criado_em ? new Date(item.criado_em).toLocaleDateString() : "-"}
              </td>

              {tipo === "voluntarios" ? (
                <>
                  <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f3f3" }}>{item.nome}</td>
                  <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f3f3" }}>{item.area_interesse || "-"}</td>
                  <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f3f3" }}>{item.disponibilidade || "-"}</td>
                </>
              ) : (
                <>
                  <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f3f3" }}>
                    {item.doador_nome} ({item.doador_email})
                  </td>
                  <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f3f3" }}>{item.tipo}</td>
                  <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f3f3" }}>
                    {item.tipo === "dinheiro" ? (item.valor ?? "-") : (item.descricao || "-")}
                  </td>
                </>
              )}

              <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f3f3" }}>
                {item.telefone ? (
                  <a href={`https://wa.me/55${String(item.telefone).replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                ) : (
                  "-"
                )}
              </td>

              <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f3f3" }}>
                <StatusSelect value={item.status} onChange={(s) => onAtualizar(item, s)} tipo={tipo} />
              </td>

              <td style={{ padding: "10px 8px", borderBottom: "1px solid #f3f3f3" }}>
                {item.email ? <a href={`mailto:${item.email}`}>E-mail</a> : "-"}
              </td>
            </tr>
          ))}
          {dados.length === 0 && (
            <tr>
              <td colSpan={cols.length} style={{ padding: "16px", color: "#777" }}>
                Nenhum registro.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function Admin() {
  const [tab, setTab] = useState("voluntarios"); // "voluntarios" | "doacoes"
  const [voluntarios, setVoluntarios] = useState([]);
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(false);

  // auth
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [authErr, setAuthErr] = useState("");
  const token = localStorage.getItem("aszn_token");
  const logado = Boolean(token);

  async function login(e) {
    e.preventDefault();
    setAuthErr("");
    try {
      const { data } = await api.post("/auth/login", { email, senha });
      // back retorna { ok, access_token }
      localStorage.setItem("aszn_token", data.access_token);
      window.location.reload();
    } catch (err) {
      setAuthErr(err.message || "Credenciais inválidas.");
    }
  }

  async function carregar() {
    setLoading(true);
    try {
      if (tab === "voluntarios") {
        const { data } = await api.get("/admin/voluntarios");
        // back retorna { ok, total, voluntarios: [...] }
        setVoluntarios(data.voluntarios || []);
      } else {
        const { data } = await api.get("/admin/doacoes");
        // back retorna { ok, total, doacoes: [...] }
        setDoacoes(data.doacoes || []);
      }
    } catch (e) {
      // pode ser 401 sem token; login resolve
    } finally {
      setLoading(false);
    }
  }

  async function atualizarStatus(item, novo) {
    try {
      if (tab === "voluntarios") {
        // PUT /admin/voluntarios/:id/status  { status }
        await api.put(`/admin/voluntarios/${item.id}/status`, { status: novo });
        setVoluntarios((arr) => arr.map((v) => (v.id === item.id ? { ...v, status: novo } : v)));
      } else {
        // PUT /admin/doacoes/:id/status  { status }
        await api.put(`/admin/doacoes/${item.id}/status`, { status: novo });
        setDoacoes((arr) => arr.map((d) => (d.id === item.id ? { ...d, status: novo } : d)));
      }
    } catch (e) {
      alert(e.message || "Erro ao atualizar status.");
    }
  }

  useEffect(() => {
    if (logado) carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, logado]);

  if (!logado) {
    return (
      <div style={{ maxWidth: 420, margin: "2rem auto", padding: "0 1rem" }}>
        <h1 style={{ marginBottom: "1rem" }}>Intranet – Acesso</h1>
        <form onSubmit={login} style={{ display: "grid", gap: "0.75rem" }}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button
            style={{
              background: "#c8102e",
              color: "#fff",
              border: 0,
              borderRadius: 8,
              padding: "0.75rem 1rem",
              fontWeight: 700,
            }}
          >
            Entrar
          </button>
          {authErr && <p style={{ color: "#c8102e" }}>⚠️ {authErr}</p>}
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: "2rem auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h1>Intranet</h1>
        <button
          onClick={() => {
            localStorage.removeItem("aszn_token");
            window.location.reload();
          }}
          style={{ background: "#eee", border: 0, borderRadius: 6, padding: "0.5rem .8rem" }}
        >
          Sair
        </button>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button
          onClick={() => setTab("voluntarios")}
          style={{
            padding: ".5rem .9rem",
            borderRadius: 8,
            border: 0,
            background: tab === "voluntarios" ? "#c8102e" : "#f3f3f3",
            color: tab === "voluntarios" ? "#fff" : "#111",
            fontWeight: 700,
          }}
        >
          Voluntários
        </button>
        <button
          onClick={() => setTab("doacoes")}
          style={{
            padding: ".5rem .9rem",
            borderRadius: 8,
            border: 0,
            background: tab === "doacoes" ? "#c8102e" : "#f3f3f3",
            color: tab === "doacoes" ? "#fff" : "#111",
            fontWeight: 700,
          }}
        >
          Doações
        </button>
      </div>

      {loading && <p>Carregando...</p>}

      {tab === "voluntarios" ? (
        <Tabela dados={voluntarios} tipo="voluntarios" onAtualizar={atualizarStatus} />
      ) : (
        <Tabela dados={doacoes} tipo="doacoes" onAtualizar={atualizarStatus} />
      )}
    </div>
  );
}

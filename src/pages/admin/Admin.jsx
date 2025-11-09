import { useEffect, useMemo, useState, useRef } from "react";
import api from "../../services/api";

const STATUS_VOLUNTARIOS = ["pendente", "aprovado", "recusado"];
const STATUS_DOACOES = ["pendente", "confirmada", "cancelada"];

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
    <select value={value || "pendente"} onChange={(e) => onChange(e.target.value)}>
      {opcoes.map((s) => (
        <option key={s} value={s}>
          {label[s] ?? s}
        </option>
      ))}
    </select>
  );
}

function Tabela({ dados, tipo, onAtualizar, onExcluir }) {
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
              <th key={c} style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #eee" }}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.map((item) => (
            <tr key={item.id}>
              <td>{item.criado_em ? new Date(item.criado_em).toLocaleDateString() : "-"}</td>

              {tipo === "voluntarios" ? (
                <>
                  <td>{item.nome}</td>
                  <td>{item.area_interesse || "-"}</td>
                  <td>{item.disponibilidade || "-"}</td>
                </>
              ) : (
                <>
                  <td>
                    {item.doador_nome} ({item.doador_email})
                  </td>
                  <td>{item.tipo}</td>
                  <td>{item.tipo === "dinheiro" ? item.valor ?? "-" : item.descricao || "-"}</td>
                </>
              )}

              <td>
                {item.telefone ? (
                  <a
                    href={`https://wa.me/55${String(item.telefone).replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    WhatsApp
                  </a>
                ) : (
                  "-"
                )}
              </td>

              <td>
                <StatusSelect value={item.status} onChange={(s) => onAtualizar(item, s)} tipo={tipo} />
              </td>

              <td>
                <div style={{ display: "flex", gap: 8 }}>
                  {item.email ? <a href={`mailto:${item.email}`}>E-mail</a> : <span>-</span>}
                  <button
                    onClick={() => onExcluir(item)}
                    style={{
                      background: "#c8102e",
                      color: "#fff",
                      border: 0,
                      borderRadius: 6,
                      padding: "4px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Excluir
                  </button>
                </div>
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
  const [tab, setTab] = useState("voluntarios");
  const [voluntarios, setVoluntarios] = useState([]);
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(false);

  // undo snackbar
  const [undo, setUndo] = useState(null);
  const undoTimer = useRef(null);

  // login inline
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
        setVoluntarios(data.voluntarios || []);
      } else {
        const { data } = await api.get("/admin/doacoes");
        setDoacoes(data.doacoes || []);
      }
    } finally {
      setLoading(false);
    }
  }

  // Atualização de status (PUT nas rotas do back)
  async function atualizarStatus(item, novo) {
    try {
      if (tab === "voluntarios") {
        await api.put(`/admin/voluntarios/${item.id}/status`, { status: novo });
        setVoluntarios((arr) => arr.map((v) => (v.id === item.id ? { ...v, status: novo } : v)));
      } else {
        await api.put(`/admin/doacoes/${item.id}/status`, { status: novo });
        setDoacoes((arr) => arr.map((d) => (d.id === item.id ? { ...d, status: novo } : d)));
      }
    } catch (e) {
      alert(e.message || "Erro ao atualizar status.");
    }
  }

  // Exclusão otimista + Undo (soft delete no back após 10s)
  async function excluirRegistro(item) {
    const tipo = tab;
    const nomeItem = tipo === "voluntarios" ? item.nome : item.doador_nome;
    const palavra = tipo === "voluntarios" ? "voluntário" : "doação";
    const ok = confirm(`Excluir ${palavra} "${nomeItem}"?`);
    if (!ok) return;

    if (undoTimer.current) clearTimeout(undoTimer.current);

    // remove visualmente
    if (tipo === "voluntarios") setVoluntarios((arr) => arr.filter((v) => v.id !== item.id));
    else setDoacoes((arr) => arr.filter((d) => d.id !== item.id));

    // guarda item para possível restauração
    setUndo({ tipo, item });

    // após 10s, confirma no back (DELETE => marca deleted_at)
    undoTimer.current = setTimeout(async () => {
      try {
        await api.delete(`/admin/${tipo}/${item.id}`);
      } catch (e) {
        alert("Erro ao excluir no servidor.");
      } finally {
        setUndo(null);
      }
    }, 10000);
  }

  // Desfazer: chama /restore no back e recarrega a lista
  async function desfazer() {
    if (!undo) return;
    clearTimeout(undoTimer.current);
    try {
      await api.patch(`/admin/${undo.tipo}/${undo.item.id}/restore`);
      await carregar();
    } catch (e) {
      alert("Erro ao restaurar.");
    } finally {
      setUndo(null);
    }
  }

  useEffect(() => {
    if (logado) carregar();
  }, [tab, logado]);

  if (!logado) {
    return (
      <div style={{ maxWidth: 420, margin: "2rem auto" }}>
        <h1>Intranet – Acesso</h1>
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Intranet</h1>
        <button
          onClick={() => {
            localStorage.removeItem("aszn_token");
            window.location.reload();
          }}
        >
          Sair
        </button>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", margin: "1rem 0" }}>
        <button
          onClick={() => setTab("voluntarios")}
          style={{
            background: tab === "voluntarios" ? "#c8102e" : "#eee",
            color: tab === "voluntarios" ? "#fff" : "#111",
            border: 0,
            borderRadius: 6,
            padding: ".5rem 1rem",
          }}
        >
          Voluntários
        </button>
        <button
          onClick={() => setTab("doacoes")}
          style={{
            background: tab === "doacoes" ? "#c8102e" : "#eee",
            color: tab === "doacoes" ? "#fff" : "#111",
            border: 0,
            borderRadius: 6,
            padding: ".5rem 1rem",
          }}
        >
          Doações
        </button>
      </div>

      {loading && <p>Carregando...</p>}

      {tab === "voluntarios" ? (
        <Tabela dados={voluntarios} tipo="voluntarios" onAtualizar={atualizarStatus} onExcluir={excluirRegistro} />
      ) : (
        <Tabela dados={doacoes} tipo="doacoes" onAtualizar={atualizarStatus} onExcluir={excluirRegistro} />
      )}

      {undo && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#111",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 6,
          }}
        >
          <span>Registro removido.</span>
          <button onClick={desfazer} style={{ marginLeft: 10, textDecoration: "underline", color: "#fff" }}>
            Desfazer
          </button>
        </div>
      )}
    </div>
  );
}

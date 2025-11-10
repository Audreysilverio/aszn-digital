import { useEffect, useState, useRef } from "react";
import api from "../../services/api";

const STATUS_VOLUNTARIOS = ["pendente", "aprovado", "recusado"];
const STATUS_DOACOES = ["pendente", "confirmada", "cancelada"];
const LABEL = {
  pendente: "Pendente",
  aprovado: "Aprovado",
  recusado: "Recusado",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
};

// Helpers
const moneyBR = (v) =>
  v == null || v === ""
    ? "-"
    : Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const phoneDigits = (s = "") => String(s).replace(/\D/g, "");

// === COMPONENTE PRINCIPAL ===
export default function Admin() {
  const [tab, setTab] = useState("voluntarios");
  const [dados, setDados] = useState([]);
  const [backup, setBackup] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 50;

  const [busca, setBusca] = useState("");

  const [undo, setUndo] = useState(null);
  const undoTimer = useRef(null);

  // Auth
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [authErr, setAuthErr] = useState("");
  const token = localStorage.getItem("aszn_token");
  const logado = Boolean(token);

  // === LOGIN ===
  async function login(e) {
    e.preventDefault();
    setAuthErr("");
    try {
      const { data } = await api.post("/auth/login", { email, senha });
      localStorage.setItem("aszn_token", data.access_token);
      window.location.reload();
    } catch {
      setAuthErr("Credenciais inválidas.");
    }
  }

  // === CARREGAR LISTA ===
  async function carregar() {
    setLoading(true);
    try {
      const url = tab === "voluntarios" ? "/admin/voluntarios" : "/admin/doacoes";
      const { data } = await api.get(url);
      const lista = tab === "voluntarios" ? data.voluntarios : data.doacoes;
      setBackup(lista || []);
      setDados(lista.slice(0, perPage));
      setPage(1);
    } finally {
      setLoading(false);
    }
  }

  // === BUSCA ===
  useEffect(() => {
    if (!busca.trim()) {
      setDados(backup.slice(0, perPage * page));
      return;
    }
    const lower = busca.toLowerCase();
    const filtrado = backup.filter((d) =>
      Object.values(d).some((v) =>
        String(v).toLowerCase().includes(lower)
      )
    );
    setDados(filtrado.slice(0, perPage * page));
  }, [busca, backup, page]);

  // === STATUS ===
  async function atualizarStatus(item, novo) {
    try {
      const rota =
        tab === "voluntarios"
          ? `/admin/voluntarios/${item.id}/status`
          : `/admin/doacoes/${item.id}/status`;
      await api.put(rota, { status: novo });
      setDados((arr) => arr.map((d) => (d.id === item.id ? { ...d, status: novo } : d)));
    } catch {
      alert("Erro ao atualizar status.");
    }
  }

  // === EXCLUIR ===
  async function excluir(item) {
    const tipo = tab;
    const nome = tipo === "voluntarios" ? item.nome : item.doador_nome;
    if (!confirm(`Excluir ${tipo.slice(0, -1)} "${nome}"?`)) return;

    if (undoTimer.current) clearTimeout(undoTimer.current);
    setDados((arr) => arr.filter((d) => d.id !== item.id));
    setUndo({ tipo, item });
    undoTimer.current = setTimeout(async () => {
      await api.delete(`/admin/${tipo}/${item.id}`);
      setUndo(null);
    }, 8000);
  }

  async function desfazer() {
    if (!undo) return;
    clearTimeout(undoTimer.current);
    await api.patch(`/admin/${undo.tipo}/${undo.item.id}/restore`);
    await carregar();
    setUndo(null);
  }

  useEffect(() => {
    if (logado) carregar();
  }, [tab, logado]);

  // === LOGIN VIEW ===
  if (!logado)
    return (
      <div className="adm-login">
        <style>{css}</style>
        <h1>Intranet – Acesso</h1>
        <form onSubmit={login}>
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
          <button className="btn-primary">Entrar</button>
          {authErr && <p className="err">⚠️ {authErr}</p>}
        </form>
      </div>
    );

  // === TABELA ===
  const colunas =
    tab === "voluntarios"
      ? ["Data", "Nome", "Área", "Disponibilidade", "Telefone", "Status", "Ações"]
      : ["Data", "Doador", "Tipo", "Valor/Descrição", "Telefone", "Status", "Ações"];

  return (
    <div className="adm-wrap">
      <style>{css}</style>

      <div className="adm-head">
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

      <div className="tabs">
        <button
          className={tab === "voluntarios" ? "active" : ""}
          onClick={() => setTab("voluntarios")}
        >
          Voluntários
        </button>
        <button
          className={tab === "doacoes" ? "active" : ""}
          onClick={() => setTab("doacoes")}
        >
          Doações
        </button>
      </div>

      <input
        type="search"
        placeholder="Buscar nome, e-mail, tipo..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="busca"
      />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="tableWrap">
          <table className="adm-table">
            <thead>
              <tr>
                {colunas.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dados.map((d) => (
                <tr key={d.id} className="adm-row">
                  <td>{new Date(d.criado_em).toLocaleString("pt-BR")}</td>
                  {tab === "voluntarios" ? (
                    <>
                      <td className="strong">{d.nome}</td>
                      <td>{d.area_interesse}</td>
                      <td>{d.disponibilidade}</td>
                    </>
                  ) : (
                    <>
                      <td className="strong">
                        {d.doador_nome}{" "}
                        <span className="muted">({d.doador_email})</span>
                      </td>
                      <td className="caps">{d.tipo}</td>
                      <td>
                        {d.tipo === "dinheiro"
                          ? moneyBR(d.valor)
                          : d.descricao || "-"}
                      </td>
                    </>
                  )}
                  <td>
                    {d.telefone ? (
                      <a
                        href={`https://wa.me/55${phoneDigits(d.telefone)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-link"
                      >
                        WhatsApp
                      </a>
                    ) : (
                      <span className="muted">—</span>
                    )}
                  </td>
                  <td>
                    <div
                      className={`status status--${(d.status || "pendente").toLowerCase()}`}
                    >
                      <span className="dot" />
                      <select
                        value={d.status}
                        onChange={(e) => atualizarStatus(d, e.target.value)}
                      >
                        {(tab === "voluntarios"
                          ? STATUS_VOLUNTARIOS
                          : STATUS_DOACOES
                        ).map((s) => (
                          <option key={s}>{LABEL[s]}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="actions">
                    {d.email && (
                      <a href={`mailto:${d.email}`} className="btn-link">
                        E-mail
                      </a>
                    )}
                    <button
                      className="btn-float danger"
                      onClick={() => excluir(d)}
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}

              {dados.length === 0 && (
                <tr>
                  <td colSpan={colunas.length} className="empty">
                    Nenhum registro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {!busca && dados.length < backup.length && (
            <button className="btn-more" onClick={() => setPage(page + 1)}>
              Mostrar mais
            </button>
          )}
        </div>
      )}

      {undo && (
        <div className="snackbar">
          <span>Registro removido.</span>
          <button onClick={desfazer}>Desfazer</button>
        </div>
      )}
    </div>
  );
}

// === CSS embutido ===
const css = `
.adm-wrap{max-width:1100px;margin:2rem auto;padding:0 1rem;color:#111}
.adm-head{display:flex;justify-content:space-between;align-items:center}
.adm-head button{background:#eee;border:0;border-radius:6px;padding:.5rem 1rem;cursor:pointer;font-weight:700}
.tabs{display:flex;gap:.5rem;margin:1rem 0}
.tabs button{background:#eee;border:0;border-radius:6px;padding:.5rem 1rem;cursor:pointer;font-weight:700}
.tabs .active{background:#c8102e;color:#fff}
.busca{width:100%;padding:.6rem .8rem;margin-bottom:1rem;border:1px solid #ddd;border-radius:8px;font-size:1rem}
.tableWrap{overflow-x:auto;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.05)}
.adm-table{width:100%;border-collapse:collapse;min-width:900px}
.adm-table th{text-align:left;padding:10px;border-bottom:1px solid #ddd;font-weight:800}
.adm-table td{padding:10px;border-bottom:1px solid #eee;vertical-align:middle}
.adm-row:hover{background:#fafafa}
.strong{font-weight:700}.muted{color:#777}.caps{text-transform:uppercase;font-size:.9rem}.btn-link{color:#c8102e;text-decoration:none;font-weight:600}
.btn-link:hover{text-decoration:underline}
.status{display:flex;align-items:center;gap:.4rem}
.status .dot{width:10px;height:10px;border-radius:50%}
.status--pendente .dot{background:#f4c20d}
.status--aprovado .dot,.status--confirmada .dot{background:#1a7f37}
.status--recusado .dot,.status--cancelada .dot{background:#c8102e}
.actions{display:flex;align-items:center;gap:.5rem}
.btn-float{background:transparent;border:none;cursor:pointer;opacity:.15;font-size:1.1rem;transition:.2s}
.adm-row:hover .btn-float{opacity:1}
.btn-float:hover{transform:scale(1.15);color:#b3051a}
.empty{text-align:center;padding:2rem;color:#666}
.btn-more{display:block;margin:1rem auto;padding:.6rem 1.2rem;background:#eee;border:0;border-radius:8px;font-weight:700;cursor:pointer}
.btn-more:hover{background:#ddd}
.snackbar{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#111;color:#fff;padding:.7rem 1rem;border-radius:8px;display:flex;gap:.5rem}
.snackbar button{background:transparent;border:0;color:#fff;text-decoration:underline;cursor:pointer}
.adm-login{max-width:400px;margin:2rem auto;text-align:center}
.adm-login form{display:grid;gap:.75rem}
.adm-login input{border:1px solid #ddd;border-radius:8px;padding:.7rem .9rem;font-size:1rem}
.btn-primary{background:#c8102e;color:#fff;border:0;border-radius:8px;padding:.7rem 1rem;font-weight:800;cursor:pointer}
.err{color:#c8102e;font-weight:700}
`;

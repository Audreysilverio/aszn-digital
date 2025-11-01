import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

const STATUS_OPCOES = ["Novo", "Contatado", "Em andamento", "Concluído"];

function StatusSelect({ value, onChange }) {
  return (
    <select value={value || "Novo"} onChange={(e)=>onChange(e.target.value)}>
      {STATUS_OPCOES.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}

function Tabela({ dados, tipo, onAtualizar }) {
  // colunas diferentes para cada tipo
  const cols = useMemo(() => {
    if (tipo === "volunteers") {
      return ["Data", "Nome", "Área", "Dispon.", "Telefone", "Status", "Ações"];
    }
    return ["Data", "Nome", "Tipo", "Valor/Desc.", "Telefone", "Status", "Ações"];
  }, [tipo]);

  return (
    <div style={{overflowX:"auto"}}>
      <table style={{width:"100%", borderCollapse:"collapse"}}>
        <thead>
          <tr>
            {cols.map((c)=>(
              <th key={c} style={{textAlign:"left", padding:"10px 8px", borderBottom:"1px solid #eee", fontWeight:700}}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.map((item)=>(
            <tr key={item.id || item._id}>
              <td style={{padding:"10px 8px", borderBottom:"1px solid #f3f3f3"}}>
                {item.created_at ? new Date(item.created_at).toLocaleDateString() : "-"}
              </td>
              <td style={{padding:"10px 8px", borderBottom:"1px solid #f3f3f3"}}>{item.nome}</td>

              {tipo === "volunteers" ? (
                <>
                  <td style={{padding:"10px 8px", borderBottom:"1px solid #f3f3f3"}}>{item.areaInteresse}</td>
                  <td style={{padding:"10px 8px", borderBottom:"1px solid #f3f3f3"}}>{item.disponibilidade}</td>
                </>
              ) : (
                <>
                  <td style={{padding:"10px 8px", borderBottom:"1px solid #f3f3f3"}}>{item.tipo}</td>
                  <td style={{padding:"10px 8px", borderBottom:"1px solid #f3f3f3"}}>
                    {item.tipo === "dinheiro" ? (item.valor || "-") : (item.descricao || "-")}
                  </td>
                </>
              )}

              <td style={{padding:"10px 8px", borderBottom:"1px solid #f3f3f3"}}>
                {item.telefone ? <a href={`https://wa.me/55${item.telefone.replace(/\D/g,"")}`} target="_blank">WhatsApp</a> : "-"}
              </td>

              <td style={{padding:"10px 8px", borderBottom:"1px solid #f3f3f3"}}>
                <StatusSelect value={item.status} onChange={(s)=>onAtualizar(item, s)} />
              </td>

              <td style={{padding:"10px 8px", borderBottom:"1px solid #f3f3f3"}}>
                {item.email ? <a href={`mailto:${item.email}`}>E-mail</a> : "-"}
              </td>
            </tr>
          ))}
          {dados.length === 0 && (
            <tr><td colSpan={cols.length} style={{padding:"16px", color:"#777"}}>Nenhum registro.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function Admin() {
  const [tab, setTab] = useState("volunteers"); // "volunteers" | "donations"
  const [volunteers, setVolunteers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  // auth
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [authErr, setAuthErr] = useState("");
  const token = localStorage.getItem("aszntoken");

  const logado = Boolean(token);

  async function login(e) {
    e.preventDefault();
    setAuthErr("");
    try {
      const { data } = await api.post("/auth/login", { email, senha });
      localStorage.setItem("aszntoken", data.token);
      window.location.reload();
    } catch {
      setAuthErr("Credenciais inválidas.");
    }
  }

  async function carregar() {
    setLoading(true);
    try {
      if (tab === "volunteers") {
        const { data } = await api.get("/volunteers");
        setVolunteers(data || []);
      } else {
        const { data } = await api.get("/donations");
        setDonations(data || []);
      }
    } catch (e) {
      // sem API ou 401 → não faz nada aqui
    } finally {
      setLoading(false);
    }
  }

  async function atualizarStatus(item, novoStatus) {
    try {
      const rota = tab === "volunteers" ? "/volunteers" : "/donations";
      await api.patch(`${rota}/${item.id || item._id}`, { status: novoStatus });
      // atualiza no estado local
      if (tab === "volunteers") {
        setVolunteers((arr)=>arr.map(v => (v.id===item.id || v._id===item._id) ? {...v, status: novoStatus} : v));
      } else {
        setDonations((arr)=>arr.map(d => (d.id===item.id || d._id===item._id) ? {...d, status: novoStatus} : d));
      }
    } catch (e) {
      alert("Erro ao atualizar status.");
    }
  }

  useEffect(() => { if (logado) carregar(); }, [tab, logado]);

  if (!logado) {
    return (
      <div style={{maxWidth: 420, margin:"2rem auto", padding:"0 1rem"}}>
        <h1 style={{marginBottom:"1rem"}}>Intranet – Acesso</h1>
        <form onSubmit={login} style={{display:"grid", gap:"0.75rem"}}>
          <input type="email" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)} required />
          <button style={{background:"#c8102e", color:"#fff", border:0, borderRadius:8, padding:"0.75rem 1rem", fontWeight:700}}>
            Entrar
          </button>
          {authErr && <p style={{color:"#c8102e"}}>⚠️ {authErr}</p>}
        </form>
       
      </div>
    );
  }

  return (
    <div style={{maxWidth: 1100, margin:"2rem auto", padding:"0 1rem"}}>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem"}}>
        <h1>Intranet</h1>
        <button
          onClick={() => { localStorage.removeItem("aszntoken"); window.location.reload(); }}
          style={{background:"#eee", border:0, borderRadius:6, padding:"0.5rem .8rem"}}
        >
          Sair
        </button>
      </div>

      <div style={{display:"flex", gap:"0.5rem", marginBottom:"1rem"}}>
        <button
          onClick={()=>setTab("volunteers")}
          style={{padding:".5rem .9rem", borderRadius:8, border:0,
            background: tab==="volunteers" ? "#c8102e" : "#f3f3f3",
            color: tab==="volunteers" ? "#fff" : "#111",
            fontWeight:700}}
        >
          Voluntários
        </button>
        <button
          onClick={()=>setTab("donations")}
          style={{padding:".5rem .9rem", borderRadius:8, border:0,
            background: tab==="donations" ? "#c8102e" : "#f3f3f3",
            color: tab==="donations" ? "#fff" : "#111",
            fontWeight:700}}
        >
          Doações
        </button>
      </div>

      {loading && <p>Carregando...</p>}

      {tab === "volunteers" ? (
        <Tabela dados={volunteers} tipo="volunteers" onAtualizar={atualizarStatus} />
      ) : (
        <Tabela dados={donations} tipo="donations" onAtualizar={atualizarStatus} />
      )}
    </div>
  );
}

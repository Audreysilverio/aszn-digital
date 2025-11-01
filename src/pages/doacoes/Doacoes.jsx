import { useState } from "react";
import api from "../../services/api";

export default function Doacoes() {
  const [form, setForm] = useState({
    nome:"", email:"", telefone:"", tipo:"dinheiro",
    valor:"", descricao:"", aceiteLGPD:false,
  });
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f)=>({ ...f, [name]: type==="checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setOk(false);
    if (!form.aceiteLGPD) { setErr("Você precisa aceitar a LGPD."); return; }
    try {
      setLoading(true);
      await api.post("/donations", form);
      setOk(true);
      setForm({ nome:"", email:"", telefone:"", tipo:"dinheiro", valor:"", descricao:"", aceiteLGPD:false });
    } catch (e) {
      setErr("Não foi possível enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth: 720, margin: "2rem auto", padding:"0 1rem"}}>
      <h1 style={{marginBottom: ".75rem"}}>Faça sua Doação</h1>
      <p style={{marginBottom: "1.25rem", color:"#555"}}>
        Preencha seus dados e como deseja contribuir. Obrigado pelo apoio!
      </p>

      <form onSubmit={onSubmit} style={{display:"grid", gap:"0.75rem"}}>
        <input name="nome" value={form.nome} onChange={onChange} placeholder="Nome completo" required />
        <input type="email" name="email" value={form.email} onChange={onChange} placeholder="E-mail" required />
        <input name="telefone" value={form.telefone} onChange={onChange} placeholder="WhatsApp" required />
        <select name="tipo" value={form.tipo} onChange={onChange}>
          <option value="dinheiro">Dinheiro</option>
          <option value="produto">Produto</option>
          <option value="serviço">Serviço</option>
        </select>
        {form.tipo === "dinheiro" && (
          <input name="valor" value={form.valor} onChange={onChange} placeholder="Valor estimado (R$)" />
        )}
        <textarea name="descricao" value={form.descricao} onChange={onChange} placeholder="Descrição / Observações" rows={4} />
        <label style={{display:"flex", gap:".5rem", alignItems:"center"}}>
          <input type="checkbox" name="aceiteLGPD" checked={form.aceiteLGPD} onChange={onChange} />
          Autorizo o uso dos meus dados conforme a LGPD.
        </label>

        <button disabled={loading} style={{background:"#c8102e", color:"#fff", border:0, borderRadius:8, padding:"0.75rem 1rem", fontWeight:700}}>
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {ok && <p style={{color:"#1a7f37"}}>✅ Recebido! Obrigado pela contribuição.</p>}
        {err && <p style={{color:"#c8102e"}}>⚠️ {err}</p>}
      </form>
    </div>
  );
}

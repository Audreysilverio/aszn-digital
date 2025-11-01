import { useState } from "react";
import api from "../../services/api";

export default function Voluntariado() {
  const [form, setForm] = useState({
    nome: "", email: "", telefone: "",
    areaInteresse: "", disponibilidade: "",
    mensagem: "", aceiteLGPD: false,
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
    setErr(""); setOk(false);
    if (!form.aceiteLGPD) { setErr("Você precisa aceitar a LGPD."); return; }
    try {
      setLoading(true);
      await api.post("/volunteers", form);
      setOk(true);
      setForm({
        nome: "", email: "", telefone: "",
        areaInteresse: "", disponibilidade: "",
        mensagem: "", aceiteLGPD: false,
      });
    } catch (e) {
      setErr("Não foi possível enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth: 720, margin: "2rem auto", padding: "0 1rem"}}>
      <h1 style={{marginBottom: ".75rem"}}>Seja Voluntário(a)</h1>
      <p style={{marginBottom: "1.25rem", color:"#555"}}>
        Preencha o formulário e retornaremos em breve.
      </p>

      <form onSubmit={onSubmit} style={{display:"grid", gap:"0.75rem"}}>
        <input name="nome" value={form.nome} onChange={onChange} placeholder="Nome completo" required />
        <input type="email" name="email" value={form.email} onChange={onChange} placeholder="E-mail" required />
        <input name="telefone" value={form.telefone} onChange={onChange} placeholder="WhatsApp" required />
        <select name="areaInteresse" value={form.areaInteresse} onChange={onChange} required>
          <option value="">Área de interesse</option>
          <option>Ballet</option><option>Capoeira</option><option>Reforço Escolar</option>
          <option>Informática</option><option>Administração/Eventos</option><option>Outra</option>
        </select>
        <select name="disponibilidade" value={form.disponibilidade} onChange={onChange} required>
          <option value="">Disponibilidade</option>
          <option>Manhã</option><option>Tarde</option><option>Noite</option><option>Finais de semana</option>
        </select>
        <textarea name="mensagem" value={form.mensagem} onChange={onChange} placeholder="Mensagem (opcional)" rows={4} />

        <label style={{display:"flex", gap:".5rem", alignItems:"center"}}>
          <input type="checkbox" name="aceiteLGPD" checked={form.aceiteLGPD} onChange={onChange} />
          Autorizo o uso dos meus dados conforme a LGPD.
        </label>

        <button disabled={loading} style={{background:"#c8102e", color:"#fff", border:0, borderRadius:8, padding:"0.75rem 1rem", fontWeight:700}}>
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {ok && <p style={{color:"#1a7f37"}}>✅ Recebido! Em breve entraremos em contato.</p>}
        {err && <p style={{color:"#c8102e"}}>⚠️ {err}</p>}
      </form>
    </div>
  );
}

import { useEffect } from "react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import s from "./inicio.module.scss";

export default function Inicio() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const perfilInstagram = "https://www.instagram.com/sempre_zakinarchi/";
  const perfilFacebook = "https://www.facebook.com/asznong/?locale=pt_BR";
  const perfilTiktok = "http://www.tiktok.com/@sempre_zakinarchi";

  return (
    <section className={s.inicio}>
      <h2>Bem-vindo(a) à Associação Sempre Zaki Narchi</h2>

      <p>
        Somos uma organização sem fins lucrativos que atua com crianças, adolescentes e famílias da
        comunidade Zaki Narchi, promovendo educação, cultura e cidadania.
      </p>

      <p>
        Aqui você encontra informações sobre nossos projetos, eventos, campanhas e como contribuir
        com nossas ações solidárias.
      </p>

      {/* ---- FEED DO INSTAGRAM ---- */}
      <div className={s.feedContainer}>
        <h3>Últimas do nosso Instagram</h3>

        <div className={s.feedWrapper}>
          <iframe
  title="Feed Instagram ASZN"
  src="https://cdn.lightwidget.com/widgets/da75afa70c26559ea044467291f726c0.html?theme=light"
  scrolling="no"
  allowTransparency="true"
  className="lightwidget-widget"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  style={{
    display: "block",
    width: "100%",
    border: 0,
    backgroundColor: "#fff", // evita bordas pretas
    lineHeight: 0,
  }}
  onLoad={() => setTimeout(() => window.dispatchEvent(new Event("resize")), 100)}
></iframe>

        </div>

        <p className={s.fallback}>
          Não carregou? Acesse nosso perfil:&nbsp;
          <a href={perfilInstagram} target="_blank" rel="noopener noreferrer">
            @sempre_zakinarchi
          </a>
        </p>
      </div>

      {/* ---- BOTÕES DAS REDES ---- */}
      <div className={s.redesContainer}>
        <a
          href={perfilInstagram}
          target="_blank"
          rel="noopener noreferrer"
          className={`${s.btn} ${s.btnInstagram}`}
        >
          <FaInstagram className={s.icon} />
          Instagram
        </a>

        <a
          href={perfilFacebook}
          target="_blank"
          rel="noopener noreferrer"
          className={`${s.btn} ${s.btnFacebook}`}
        >
          <FaFacebookF className={s.icon} />
          Facebook
        </a>

        <a
          href={perfilTiktok}
          target="_blank"
          rel="noopener noreferrer"
          className={`${s.btn} ${s.btnTiktok}`}
        >
          <FaTiktok className={s.icon} />
          TikTok
        </a>
      </div>
    </section>
  );
}

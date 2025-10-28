import s from "./inicio.module.scss";

export default function Inicio() {
  const perfilInstagram = "https://www.instagram.com/sempre_zakinarchi/";
  const perfilFacebook = "https://www.facebook.com/asznong/?locale=pt_BR";

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
            src="https://cdn.lightwidget.com/widgets/SEU_WIDGET_ID.html"
            loading="lazy"
            className={s.iframe}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <p className={s.fallback}>
          Não carregou? Acesse nosso perfil:&nbsp;
          <a href={perfilInstagram} target="_blank" rel="noopener noreferrer">
            @sempre_zakinarchi
          </a>
        </p>
      </div>

      {/* ---- CTA REDES SOCIAIS ---- */}
      <div className={s.redesContainer}>
        <a
          href={perfilInstagram}
          target="_blank"
          rel="noopener noreferrer"
          className={`${s.btn} ${s.btnInstagram}`}
        >
          📸 Siga no Instagram
        </a>

        <a
          href={perfilFacebook}
          target="_blank"
          rel="noopener noreferrer"
          className={`${s.btn} ${s.btnFacebook}`}
        >
          👍 Siga no Facebook
        </a>
      </div>
    </section>
  );
}

import s from "./footer.module.scss";
import iconeFacebook from "../../assets/iconeFacebook.png";
import iconeYoutube from "../../assets/iconeYoutube.png";
import iconeLinkedin from "../../assets/iconeLinkedin.png";
import iconeInstagram from "../../assets/iconeInstagram.png";
import iconeTiktok from "../../assets/iconeTiktok.svg";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <section className={s.contatosFooter}>
        <p>Associação Sempre Zaki Narchi — São Paulo/SP</p>

        <nav className={s.redes}>
          {/* --- Facebook --- */}
          <a
            href="https://www.facebook.com/asznong/?locale=pt_BR"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook da ONG Sempre Zaki Narchi"
          >
            <img
              src={iconeFacebook}
              alt="Ícone branco do Facebook"
              className={s.icon}
            />
          </a>

          {/* --- Instagram --- */}
          <a
            href="https://www.instagram.com/sempre_zakinarchi/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da ONG Sempre Zaki Narchi"
          >
            <img
              src={iconeInstagram}
              alt="Ícone branco do Instagram"
              className={s.icon}
            />
          </a>

          {/* --- TikTok --- */}
          <a
            href="https://www.tiktok.com/@sempre_zakinarchi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok da ONG Sempre Zaki Narchi"
          >
            <img
              src={iconeTiktok}
              alt="Ícone branco do TikTok"
              className={s.icon}
            />
          </a>

          {/* --- LinkedIn --- */}
          <a
            href="https://www.linkedin.com/in/seu-perfil-aqui/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil LinkedIn do Projeto"
          >
            <img
              src={iconeLinkedin}
              alt="Ícone branco do LinkedIn"
              className={s.icon}
            />
          </a>

          {/* --- YouTube --- */}
          <a
            href="https://www.youtube.com/seu-video-aqui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Canal ou vídeo do Projeto Integrador no YouTube"
          >
            <img
              src={iconeYoutube}
              alt="Ícone branco do YouTube"
              className={s.icon}
            />
          </a>
        </nav>
      </section>

      <section className={s.copyright}>
        <p>
          Layout desenvolvido pelos alunos da UNIVESP do Eixo de Computação 2025 • Projeto Plataforma Associação Sempre Zaki Narchi Digital
        </p>
      </section>
    </footer>
  );
}

import s from "./footer.module.scss";

import iconeFacebook from "../../assets/iconeFacebook.png";
import iconeYoutube from "../../assets/iconeYoutube.png";
import iconeLinkedin from "../../assets/iconeLinkedin.png";
import iconeInstagram from "../../assets/iconeInstagram.png";
import iconeTiktok from "../../assets/iconeTiktok.svg";

export default function Footer() {
  return (
    <footer className={s.footer}>
      
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
          href="https://www.linkedin.com/company/associacao-sempre-zaki-narchi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn da Associação Sempre Zaki Narchi"
        >
          <img
            src={iconeLinkedin}
            alt="Ícone branco do LinkedIn"
            className={s.icon}
          />
        </a>

        {/* --- YouTube --- */}
        <a
          href="https://www.youtube.com/@semprezakinarchidigital"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Canal YouTube da ONG Sempre Zaki Narchi"
        >
          <img
            src={iconeYoutube}
            alt="Ícone branco do YouTube"
            className={s.icon}
          />
        </a>
      </nav>

      <section className={s.copyright}>
        <p>
          © 2025 Associação Sempre Zaki Narchi Digital — Todos os direitos
          reservados.
        </p>
        <p>
          Desenvolvido pelos alunos da UNIVESP do Eixo de Computação 2025 • Projeto Plataforma Sempre Zaki Narchi Digital </p>
      </section>
    </footer>
  );
}

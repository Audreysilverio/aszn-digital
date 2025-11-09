import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import s from "./contato.module.scss";

export default function Contato() {
  const redes = {
    instagram: "https://www.instagram.com/sempre_zakinarchi/",
    facebook: "https://www.facebook.com/asznong/?locale=pt_BR",
    tiktok: "https://www.tiktok.com/@sempre_zakinarchi",
    telefone: "(11) 95281-2491",
    whatsappLink: "https://wa.me/5511952812491",
  };

  return (
    <section className={s.contato}>
      <div className={s.card}>
        <h2>Fale Conosco</h2>

        <p>
          Quer saber mais sobre nossos projetos ou participar das atividades da{" "}
          <strong>Associação Sempre Zaki Narchi?</strong>
        </p>

        <p>
          Fique por dentro das novidades e envie suas mensagens pelas nossas
          redes sociais:
        </p>

        <div className={s.botoes}>
          {redes.instagram && (
            <a
              href={redes.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.btn} ${s.btnInstagram}`}
            >
              <FaInstagram className={s.icon} />
              Instagram
            </a>
          )}

          {redes.facebook && (
            <a
              href={redes.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.btn} ${s.btnFacebook}`}
            >
              <FaFacebookF className={s.icon} />
              Facebook
            </a>
          )}

          {redes.tiktok && (
            <a
              href={redes.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.btn} ${s.btnTiktok}`}
            >
              <FaTiktok className={s.icon} />
              TikTok
            </a>
          )}
        </div>

        {/* Telefone do presidente */}
        <div className={s.telefoneBox}>
          <div className={s.linhaTelefone}>
            <FaPhoneAlt className={s.iconTel} />
            <strong>Presidente:</strong>
            <span>{redes.telefone}</span>
          </div>

          <a
            href={redes.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={s.btnWhatsapp}
          >
            <FaWhatsapp />
            Conversar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logoFavicon from "../../assets/logoFavicon.png";
import s from "./header.module.scss";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();
  const btnRef = useRef(null);

  // Fecha o menu ao trocar de rota
  useEffect(() => {
    setMenuAberto(false);
  }, [location.pathname]);

  // Fecha o menu com ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuAberto(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={s.header}>
      <div className={s.container}>
        {/* ESQUERDA: marca */}
        <Link to="/" className={s.brand} aria-label="Voltar ao início">
          <img
            src={logoFavicon}
            alt="Logotipo da Associação Sempre Zaki Narchi"
            className={s.logo}
          />
          <span className={s.title}>Associação Sempre Zaki Narchi</span>
        </Link>

        {/* DIREITA: navegação (desktop) */}
        <div className={s.right}>
          <nav className={s.navHeader} aria-label="Navegação principal">
            <ul className={s.menu}>
              <li><Link className={s.link} to="/">Início</Link></li>
              <li><Link className={s.link} to="/quem-somos">Quem Somos</Link></li>
              <li><Link className={s.link} to="/nossas-atividades">Nossas Atividades</Link></li>
              <li><Link className={s.link} to="/voluntariado">Voluntariado</Link></li>
              <li><Link className={s.link} to="/doacoes">Doações</Link></li>
              <li><Link className={s.link} to="/contato">Contato</Link></li>
              <li><Link className={`${s.link} ${s.adminLink}`} to="/admin">Intranet</Link></li>
            </ul>
          </nav>

          {/* Botão hambúrguer (mobile) */}
          <button
            ref={btnRef}
            className={s.menuToggle}
            onClick={() => setMenuAberto((v) => !v)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
          >
            <span className={`${s.bar} ${menuAberto ? s.barTopOpen : ""}`}></span>
            <span className={`${s.bar} ${menuAberto ? s.barMidOpen : ""}`}></span>
            <span className={`${s.bar} ${menuAberto ? s.barBotOpen : ""}`}></span>
          </button>
        </div>
      </div>

      {/* Overlay (mobile) */}
      {menuAberto && <div className={s.overlay} onClick={() => setMenuAberto(false)} />}

      {/* MENU MOBILE */}
      <nav
        id="menu-mobile"
        className={`${s.navMobile} ${menuAberto ? s.ativo : ""}`}
        aria-label="Navegação principal (mobile)"
      >
        <ul onClick={() => setMenuAberto(false)}>
          <li><Link className={s.link} to="/">Início</Link></li>
          <li><Link className={s.link} to="/quem-somos">Quem Somos</Link></li>
          <li><Link className={s.link} to="/nossas-atividades">Nossas Atividades</Link></li>
          <li><Link className={s.link} to="/voluntariado">Voluntariado</Link></li>
          <li><Link className={s.link} to="/doacoes">Doações</Link></li>
          <li><Link className={s.link} to="/contato">Contato</Link></li>
          <li><Link className={`${s.link} ${s.adminLink}`} to="/admin">Intranet</Link></li>
        </ul>
      </nav>
    </header>
  );
}

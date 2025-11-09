import React from "react";
import styles from "./nossasAtividades.module.scss";

// Imagens
import promotorVendas from "../../assets/promotorVendas.png";
import ioga from "../../assets/ioga.png";
import bale from "../../assets/bale.png";
import capoeira from "../../assets/capoeira.png";
import reforco from "../../assets/reforco.png";
import manicurePedicure from "../../assets/manicurePedicure.png";
import designSobrancelha from "../../assets/designSobrancelha.png";
import alongamento from "../../assets/alongamento.png";
import eletrica from "../../assets/eletrica.png";
import escolinhaFutebol from "../../assets/escolinhaFutebol.png";
import percussao from "../../assets/percussao.png";
import desenvolvimentoProfissional from "../../assets/desenvolvimentoProfissional.png";
import mulheresEmpreendedoras from "../../assets/mulheresEmpreendedoras.png";
import informatica from "../../assets/informatica.png";
import jiuJitsu from "../../assets/jiuJitsu.png";
import beachTennis from "../../assets/beachTennis.png";
import maquiagem from "../../assets/maquiagem.png";
import arrumadeira from "../../assets/arrumadeira.png";
import mercadoTrabalho from "../../assets/mercadoTrabalho.png";
import escolaMecanico from "../../assets/escolaMecanico.png";

const linkCadastro =
  "https://docs.google.com/forms/d/e/1FAIpQLScxkkHtIWXQgQkRDj5oYKd2tQWonG4bOIo2efqG-er6mn5wYw/viewform";

// 🔗 Redes oficiais
const social = {
  instagram: "https://www.instagram.com/sempre_zakinarchi/",
  facebook: "https://www.facebook.com/asznong/?locale=pt_BR",
  tiktok: "https://www.tiktok.com/@sempre_zakinarchi",
};

const atividades = [
  { id: 1, titulo: "Promotor de Vendas", descricao: "Curso que desenvolve noções fundamentais de comunicação, atendimento e técnicas básicas de venda para iniciar no comércio com segurança.", imagem: promotorVendas },
  { id: 2, titulo: "Ioga", descricao: "Prática que integra corpo e mente, com exercícios de respiração, alongamentos e relaxamento, respeitando o ritmo de cada participante.", imagem: ioga },
  { id: 3, titulo: "Ballet", descricao: "Atividade artística que favorece postura, coordenação e expressão, em ambiente acolhedor e adequado a diferentes faixas etárias.", imagem: bale },
  { id: 4, titulo: "Capoeira", descricao: "Expressão cultural brasileira que une movimento, musicalidade e história, promovendo respeito e pertencimento.", imagem: capoeira },
  { id: 5, titulo: "Reforço Escolar", descricao: "Acompanhamento pedagógico para fortalecimento de conteúdos e hábitos de estudo, com foco nas necessidades de cada estudante.", imagem: reforco },
  { id: 6, titulo: "Manicure e Pedicure", descricao: "Introdução às rotinas de cuidados com as unhas, higiene, organização do material e noções de atendimento ao cliente.", imagem: manicurePedicure },
  { id: 7, titulo: "Design de Sobrancelhas", descricao: "Conteúdos básicos sobre simetria facial, biossegurança e técnicas iniciais de modelagem.", imagem: designSobrancelha },
  { id: 8, titulo: "Alongamento de Unhas", descricao: "Noções introdutórias sobre materiais, preparo das unhas e boas práticas para resultados seguros.", imagem: alongamento },
  { id: 9, titulo: "Elétrica", descricao: "Conceitos fundamentais de instalações residenciais, segurança e uso responsável de ferramentas.", imagem: eletrica },
  { id: 10, titulo: "Escolinha de Futebol", descricao: "Prática esportiva que estimula cooperação, disciplina e respeito às regras, além do desenvolvimento motor.", imagem: escolinhaFutebol },
  { id: 11, titulo: "Percussão", descricao: "Vivência musical com ritmos brasileiros, improvisação e trabalho coletivo.", imagem: percussao },
  { id: 12, titulo: "Desenvolvimento Profissional", descricao: "Oficinas sobre empregabilidade, postura profissional, comunicação e preparação para processos seletivos.", imagem: desenvolvimentoProfissional },
  { id: 13, titulo: "Mulheres Empreendedoras", descricao: "Espaço de fortalecimento e troca para planejamento financeiro, formalização e estratégias de vendas.", imagem: mulheresEmpreendedoras },
  { id: 14, titulo: "Informática", descricao: "Introdução ao uso do computador, organização de arquivos e aplicativos úteis para estudo e trabalho.", imagem: informatica },
  { id: 15, titulo: "Jiu-jitsu", descricao: "Arte marcial com foco em disciplina, respeito e noções básicas de defesa pessoal.", imagem: jiuJitsu },
  { id: 16, titulo: "Beach Tennis", descricao: "Atividade dinâmica ao ar livre que trabalha resistência, coordenação e socialização.", imagem: beachTennis },
  { id: 17, titulo: "Maquiagem", descricao: "Princípios de preparação de pele, seleção de produtos e técnicas iniciais para diferentes ocasiões.", imagem: maquiagem },
  { id: 18, titulo: "Arrumadeira", descricao: "Boas práticas de organização, limpeza e rotina de ambientes, com foco em qualidade e segurança.", imagem: arrumadeira },
  { id: 19, titulo: "Mercado de Trabalho", descricao: "Orientações introdutórias para planejamento de carreira, elaboração de currículo e participação em processos seletivos.", imagem: mercadoTrabalho },
  { id: 20, titulo: "Lubrificação Automotiva – Escola do Mecânico", descricao: "Noções básicas sobre troca de óleo e cuidados essenciais, com foco em procedimentos seguros e responsabilidade ambiental.", imagem: escolaMecanico },
];

// títulos com fotos “em pé”
const portrait = new Set([
  "Ballet",
  "Jiu-jitsu",
  "Ioga",
  "Arrumadeira",
  "Manicure e Pedicure",
  "Design de Sobrancelhas",
  "Alongamento de Unhas",
]);

// foco de imagem por atividade
const focus = {
  Ballet: "img--top",
  "Beach Tennis": "img--bottom",
  Capoeira: "img--center",
  "Escolinha de Futebol": "img--center",
  "Design de Sobrancelhas": "img--contain",
};

export default function NossasAtividades() {
  const sorted = [...atividades].sort((a, b) =>
    a.titulo.localeCompare(b.titulo, "pt-BR")
  );

  return (
    <section className={styles["nossas-atividades"]}>
      <h2>Nossas Atividades</h2>

      {/* CTA no topo */}
      <a
        href={linkCadastro}
        target="_blank"
        rel="noopener noreferrer"
        className={styles["btn-saiba-mais"]}
        style={{ marginBottom: "2rem" }}
      >
        Inscreva-se
      </a>

      <div className={styles["cards-container"]}>
        {sorted.map((atv) => {
          const cardMods = portrait.has(atv.titulo)
            ? ` ${styles["card--portrait"]}`
            : "";
          const imgFocus = focus[atv.titulo]
            ? ` ${styles[focus[atv.titulo]]}`
            : ` ${styles["img--center"]}`;

          return (
            <article className={`${styles.card}${cardMods}`} key={atv.id}>
              <figure className={styles.mediaWrapper}>
                <img
                  src={atv.imagem}
                  alt={`Imagem ilustrativa da atividade ${atv.titulo}`}
                  className={`${styles.media}${imgFocus}`}
                  loading="lazy"
                />
                <figcaption className={styles.figcaption}>
                  {atv.titulo}
                </figcaption>
              </figure>
              <div className={styles["card-content"]}>
                <h3>{atv.titulo}</h3>
                <p>{atv.descricao}</p>
              </div>
            </article>
          );
        })}
      </div>

      {/* CTA no final */}
      <a
        href={linkCadastro}
        target="_blank"
        rel="noopener noreferrer"
        className={styles["btn-saiba-mais"]}
        style={{ marginTop: "2rem" }}
      >
        Inscreva-se
      </a>

      {/* 📣 Redes sociais */}
      <div className={styles["social-container"]}>
        <h3>Fique ligado nas nossas redes sociais</h3>
        <p>Acompanhe novidades, inscrições e fotos das atividades:</p>
        <nav aria-label="Redes sociais">
          {social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["btn-saiba-mais"]}
            >
              📸 Instagram
            </a>
          )}
          {social.facebook && (
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["btn-saiba-mais"]}
            >
              👍 Facebook
            </a>
          )}
          {social.tiktok && (
            <a
              href={social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["btn-saiba-mais"]}
            >
              🎵 TikTok
            </a>
          )}
        </nav>
      </div>
    </section>
  );
}

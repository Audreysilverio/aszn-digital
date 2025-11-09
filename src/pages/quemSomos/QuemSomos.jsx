import s from "./quemSomos.module.scss";

export default function QuemSomos() {
  return (
    <section className={s.quemSomos}>
      <div className={s.container}>
        <h2>Quem Somos</h2>

        <p>
          A <strong>Associação Sempre Zaki Narchi</strong> nasceu do desejo de
          transformar realidades por meio da solidariedade, da educação e do
          fortalecimento comunitário. Atuamos há mais de uma década oferecendo
          oficinas, cursos, atividades culturais e apoio às famílias da região.
        </p>

        <p>
          Nosso compromisso é com o <strong>desenvolvimento humano e social</strong>,
          acreditando que cada pessoa tem potencial para crescer e contribuir
          para uma sociedade mais justa, acolhedora e solidária.
        </p>

        <div className={s.missaoBox}>
          <h3>🌱 Nossa Missão</h3>
          <p>
            Promover oportunidades de aprendizado, cultura, esporte e
            empreendedorismo para fortalecer vínculos e transformar vidas.
          </p>
        </div>
      </div>
    </section>
  );
}

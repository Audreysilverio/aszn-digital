export default function Contato() {
  const redes = {
    instagram: "https://www.instagram.com/sempre_zakinarchi/",
    facebook: "https://www.facebook.com/asznong/?locale=pt_BR",
  };

  return (
    <section
      style={{
        color: "#1a1a1a",
        textAlign: "center",
        padding: "3rem 2rem",
        background: "#f5f5f5",
      }}
    >
      <h2
        style={{
          color: "#111",
          fontSize: "2rem",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "1.5rem",
        }}
      >
        Fale Conosco
      </h2>

      <p
        style={{
          maxWidth: "700px",
          margin: "0 auto 1.5rem",
          lineHeight: "1.6",
          fontSize: "1rem",
          color: "#444",
        }}
      >
        Quer saber mais sobre nossos projetos ou participar das atividades da
        Associação Sempre Zaki Narchi?
      </p>

      <p
        style={{
          maxWidth: "700px",
          margin: "0 auto 2rem",
          lineHeight: "1.6",
          fontSize: "1rem",
          color: "#444",
        }}
      >
        Fique por dentro das novidades e envie suas mensagens pelas nossas redes sociais:
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        {redes.instagram && (
          <a
            href={redes.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.8rem 1.6rem",
              border: "2px solid #c8102e",
              color: "#c8102e",
              borderRadius: "8px",
              fontWeight: "600",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              transition: "all 0.25s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#c8102e";
              e.target.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#c8102e";
            }}
          >
            📸 Instagram
          </a>
        )}

        {redes.facebook && (
          <a
            href={redes.facebook}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.8rem 1.6rem",
              border: "2px solid #c8102e",
              color: "#c8102e",
              borderRadius: "8px",
              fontWeight: "600",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              transition: "all 0.25s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#c8102e";
              e.target.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#c8102e";
            }}
          >
            👍 Facebook
          </a>
        )}
      </div>

    </section>
  );
}

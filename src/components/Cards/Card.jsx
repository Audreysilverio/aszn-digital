export default function Card({ icon, title, text, cta }) {
  return (
    <article className="card">
      {icon && <div className="card__icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{text}</p>
      {cta}
    </article>
  );
}

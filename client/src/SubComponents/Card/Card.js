import "../CSS/Card.css";

export default function Card({ text, action, style }) {
  return (
    <div style={{ ...style }} className="card" onClick={action}>
      <span className="content">{text}</span>
    </div>
  );
}

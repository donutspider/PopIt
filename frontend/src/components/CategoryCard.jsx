import "../index.css";

export default function CategoryCard({ name, emoji, color, onClick }) {
  return (
    <div
      className="category-card"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <div className="category-emoji">{emoji}</div>
      <h2 className="category-name">{name}</h2>
    </div>
  );
}

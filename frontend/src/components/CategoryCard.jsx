import "../index.css";

export default function CategoryCard({
  name,
  emoji,
  gradient,
  glowColor,
  onClick,
}) {
  const handleMouseOver = (e) => {
    e.currentTarget.style.setProperty("--glow-color", glowColor);
  };

  return (
    <div
      className="category-card"
      style={{ background: gradient }}
      onClick={onClick}
      onMouseOver={handleMouseOver}
    >
      <div className="category-emoji">{emoji}</div>
      <h2 className="category-name">{name}</h2>
    </div>
  );
}
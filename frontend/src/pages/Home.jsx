import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import "../index.css";

const categories = [
  { name: "Movies", emoji: "🎬", color: "#e74c3c" },
  { name: "Music", emoji: "🎵", color: "#3498db" },
  { name: "Shows", emoji: "📺", color: "#27ae60" },
  { name: "Books", emoji: "📚", color: "#f1c40f" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="app-title">PopIt</h1>
      <div className="categories-grid">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.name}
            name={cat.name}
            emoji={cat.emoji}
            color={cat.color}
            onClick={() => navigate(`/recommend/${cat.name.toLowerCase()}`)}
          />
        ))}
      </div>
    </div>
  );
}

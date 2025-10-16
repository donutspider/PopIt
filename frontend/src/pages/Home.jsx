import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import "../index.css";

const categories = [
  {
    name: "Movies",
    emoji: "🎬",
    gradient: "linear-gradient(135deg, #ff6b6b, #d35400)",
    glowColor: "#ff6b6b",
  },
  {
    name: "Music",
    emoji: "🎵",
    gradient: "linear-gradient(135deg, #54a0ff, #2e86de)",
    glowColor: "#54a0ff",
  },
  {
    name: "Shows",
    emoji: "📺",
    gradient: "linear-gradient(135deg, #1dd1a1, #10ac84)",
    glowColor: "#1dd1a1",
  },
  {
    name: "Books",
    emoji: "📚",
    gradient: "linear-gradient(135deg, #feca57, #ff9f43)",
    glowColor: "#feca57",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="app-title">PopIt</h1>
      <p className="app-subtitle">Your personal guide to entertainment.</p>
      <div className="categories-grid">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.name}
            name={cat.name}
            emoji={cat.emoji}
            gradient={cat.gradient}
            glowColor={cat.glowColor}
            onClick={() => navigate(`/recommend/${cat.name.toLowerCase()}`)}
          />
        ))}
      </div>
    </div>
  );
}
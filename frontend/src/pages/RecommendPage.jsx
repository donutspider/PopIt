import { useParams } from "react-router-dom";
import { useState } from "react";
import RecommendationForm from "../components/RecommendationForm";
import MultiMovieBox from "../components/MultiMovieBox";
import "../index.css";

export default function RecommendPage() {
  const { category } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (preferences, specifics) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          description: preferences, // first box
          similar: specifics,       // second box
        }),
      });

      const data = await response.json();
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommend-page">
      <h1 className="recommend-title">
        {category.charAt(0).toUpperCase() + category.slice(1)} Preferences
      </h1>

      <RecommendationForm onSubmit={handleSubmit} />

      {/* Multi-movie unified recommendation (frontend-only, reuses same endpoint) */}
      <MultiMovieBox category={category} />

      {loading && <p>Loading recommendations...</p>}

      {recommendations.length > 0 && (
        <div className="recommend-results">
          <h2>Your Recommendations:</h2>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

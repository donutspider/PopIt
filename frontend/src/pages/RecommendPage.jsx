import { useParams } from "react-router-dom";
import { useState } from "react";
import RecommendationForm from "../components/RecommendationForm";
import "../index.css";

export default function RecommendPage() {
  const { category } = useParams();
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (preferences) => {
    // Placeholder mock data — connect to backend later
    const mockResults = [
      `${category} recommendation 1 based on "${preferences}"`,
      `${category} recommendation 2 based on "${preferences}"`,
      `${category} recommendation 3 based on "${preferences}"`,
    ];
    setRecommendations(mockResults);
  };

  return (
    <div className="recommend-page">
      <h1 className="recommend-title">
        {category.charAt(0).toUpperCase() + category.slice(1)} Preferences
      </h1>

      <RecommendationForm onSubmit={handleSubmit} />

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

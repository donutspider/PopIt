import { useState } from "react";
import "../index.css";

export default function RecommendationForm({ onSubmit }) {
  const [preferences, setPreferences] = useState("");
  const [specifics, setSpecifics] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (preferences.trim() || specifics.trim()) {
      onSubmit(preferences, specifics);
      setPreferences("");
      setSpecifics("");
    }
  };

  return (
    <form className="recommend-form" onSubmit={handleSubmit}>
      <textarea
        className="preferences-input"
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)}
        placeholder="Describe what you like (e.g., 'action movies with a strong female lead')"
      />
      <input
        type="text"
        className="preferences-input"
        value={specifics}
        onChange={(e) => setSpecifics(e.target.value)}
        placeholder="Enter specific names (e.g., 'The Matrix, Daft Punk')"
      />
      <button className="submit-btn" type="submit">
        Get Recommendations
      </button>
    </form>
  );
}
import { useState } from "react";
import "../index.css";

export default function RecommendationForm({ onSubmit }) {
  const [preferences, setPreferences] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (preferences.trim()) {
      onSubmit(preferences);
      setPreferences("");
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
      <button className="submit-btn" type="submit">
        Get Recommendations
      </button>
    </form>
  );
}

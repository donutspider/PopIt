import { useState } from "react";
import "../index.css";

export default function MultiMovieBox({ category }) {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const addMovie = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    // Avoid duplicates (case-insensitive)
    if (movies.some((m) => m.toLowerCase() === trimmed.toLowerCase())) return;
    setMovies((prev) => [...prev, trimmed]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addMovie(inputValue);
      setInputValue("");
    }
  };

  const handleRemove = (movie) => {
    setMovies((prev) => prev.filter((m) => m !== movie));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (movies.length === 0) return;
    setLoading(true);
    setError("");
    setRecommendation("");
    try {
      const combined = movies.join("; ");
      const response = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          description: "",
          similar: combined,
        }),
      });

      const data = await response.json();
      const list = Array.isArray(data.recommendations) ? data.recommendations : [];
      setRecommendation(list[0] || "No recommendation returned.");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommend-form" style={{ marginTop: 24 }}>
      <h2 style={{ margin: "0 0 8px 0" }}>Multi-Movie Unified Recommendation</h2>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            backgroundColor: "#1f1f1f",
            borderRadius: 8,
            padding: 8,
            marginBottom: 12,
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#2a2a2a",
                borderRadius: 999,
                padding: "6px 10px",
              }}
            >
              <span style={{ fontSize: "0.95rem" }}>{movie}</span>
              <button
                type="button"
                onClick={() => handleRemove(movie)}
                aria-label={`Remove ${movie}`}
                style={{
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: 999,
                  width: 22,
                  height: 22,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
          ))}

          <input
            type="text"
            className="preferences-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a movie title and press Enter or comma"
            style={{ flex: 1, minWidth: 160, marginBottom: 0, background: "transparent" }}
          />
        </div>

        <button className="submit-btn" type="submit" disabled={loading || movies.length === 0}>
          {loading ? "Getting Recommendation..." : "Get Recommendation"}
        </button>
      </form>

      {error && <p style={{ color: "#e74c3c", marginTop: 12 }}>{error}</p>}

      {recommendation && (
        <div className="recommend-results" style={{ marginTop: 16 }}>
          <h3>Unified Recommendation:</h3>
          <ul>
            <li>{recommendation}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

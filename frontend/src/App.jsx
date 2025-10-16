import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecommendPage from "./pages/RecommendPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend/:category" element={<RecommendPage />} />
      </Routes>
    </Router>
  );
}

export default App;

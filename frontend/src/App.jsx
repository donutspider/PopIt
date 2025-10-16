import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import RecommendPage from "./pages/RecommendPage";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);


  return (
    <Router>
      <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend/:category" element={<RecommendPage />} />
      </Routes>
    </Router>
  );
}

export default App;
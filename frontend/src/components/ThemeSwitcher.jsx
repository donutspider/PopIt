import React from 'react';
import '../index.css';

const ThemeSwitcher = ({ theme, toggleTheme }) => {
  return (
    <button onClick={toggleTheme} className="theme-switcher">
      {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ThemeSwitcher;
import React from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ isDark, onToggle, isMobile = false }) => {
  const size = isMobile ? 18 : 20;
  const buttonSize = isMobile ? "p-2.5" : "p-3";
  
  return (
    <button
      onClick={onToggle}
      className={`${buttonSize} rounded-xl transition-all hover:scale-105 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
        isDark
          ? "bg-gray-700/80 text-yellow-400 hover:bg-gray-600/80"
          : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80"
      }`}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Sun size={size} /> : <Moon size={size} />}
    </button>
  );
};

export default ThemeToggle;
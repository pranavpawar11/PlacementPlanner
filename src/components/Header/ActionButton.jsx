// components/Header/components/ActionButton.jsx
import React from "react";

const ActionButton = ({
  onClick,
  children,
  isActive = false,
  title,
  ariaLabel,
  className = "",
  size = "md", // sm, md, lg
  variant = "default", // default, gradient
  badge = null,
  isDark
}) => {
  const sizeClasses = {
    sm: "p-2.5",
    md: "p-3",
    lg: "p-3.5"
  };

  const getBaseClasses = () => {
    if (variant === "gradient") {
      return "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg";
    }
    
    if (isActive) {
      return "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg";
    }
    
    return isDark
      ? "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80"
      : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80";
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} rounded-xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm relative ${
        isDark ? "focus:ring-offset-gray-800" : "focus:ring-offset-white"
      } ${getBaseClasses()} ${className}`}
      title={title}
      aria-label={ariaLabel || title}
    >
      {children}
      {badge && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          {badge}
        </span>
      )}
    </button>
  );
};

export default ActionButton;
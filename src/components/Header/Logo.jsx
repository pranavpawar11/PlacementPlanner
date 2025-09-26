// components/Header/components/Logo.jsx
import React from "react";

const Logo = ({ isDark }) => {
  return (
    <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
      {/* Logo */}
      <div className="p-1 md:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-sm shadow-md flex items-center justify-center">
        <img
          src="/logo.png"
          alt="PlaceMate Logo"
          className="w-6 h-6 md:w-8 md:h-8 object-contain"
        />
      </div>

      {/* Title */}
      <div className="min-w-0">
        <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
          PlaceMate
        </h1>
        <p
          className={`text-xs md:text-sm ${
            isDark ? "text-gray-400" : "text-gray-600"
          } hidden sm:block`}
        >
          Organize your preparation journey
        </p>
      </div>
    </div>
  );
};

export default Logo;
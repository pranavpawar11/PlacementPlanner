import React from "react";
import { useApp } from "../../context/AppProvider"; // same place as isDark, isMobile

const Loader = ({ label = "Loading..." }) => {
  const { isDark } = useApp();

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen w-full px-4 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Spinner */}
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-4 rounded-full animate-spin ${
          isDark
            ? "border-gray-700 border-t-gray-300"
            : "border-gray-200 border-t-gray-600"
        }`}
      />

      {/* Label */}
      <p
        className={`mt-4 text-sm sm:text-base font-medium ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {label}
      </p>
    </div>
  );
};

export default Loader;

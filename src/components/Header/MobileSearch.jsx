import React from "react";
import { Search, X } from "lucide-react";

const MobileSearch = ({ 
  isOpen, 
  onClose, 
  searchTerm, 
  setSearchTerm, 
  isDark 
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-3 animate-in slide-in-from-top-2 duration-200">
      <div className="relative">
        <Search
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
          size={16}
        />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-10 pr-4 py-2.5 w-full border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${
            isDark
              ? "bg-gray-700/80 border-gray-600 text-gray-100 placeholder-gray-400"
              : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
          autoFocus
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              isDark
                ? "hover:bg-gray-600 text-gray-400"
                : "hover:bg-gray-200 text-gray-500"
            }`}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileSearch;
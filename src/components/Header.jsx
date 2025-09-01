import React, { useState } from 'react';
import { Calendar, Sun, Moon, Search, Menu, X } from 'lucide-react';

const Header = ({ isDark, toggleTheme, onSearch, searchTerm }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className={`${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} sticky top-0 z-40 shadow-sm`}>
      <div className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            <div className="p-1.5 md:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <Calendar className="text-white" size={20} />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                Placement Planner
              </h1>
              <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} hidden sm:block`}>
                Organize your preparation journey
              </p>
            </div>
          </div>

          {/* Desktop Search and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search 
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} 
                size={16} 
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className={`pl-10 pr-4 py-2.5 w-64 lg:w-80 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${
                  isDark 
                    ? 'bg-gray-700/80 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all hover:scale-105 shadow-sm ${
                isDark 
                  ? 'bg-gray-700/80 text-yellow-400 hover:bg-gray-600/80' 
                  : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80'
              }`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2.5 rounded-xl transition-all hover:scale-105 ${
                isSearchOpen
                  ? 'bg-blue-500 text-white shadow-lg'
                  : isDark 
                  ? 'bg-gray-700/80 text-gray-300 hover:bg-gray-600/80' 
                  : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80'
              }`}
              title="Search tasks"
            >
              {isSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>
            
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all hover:scale-105 ${
                isDark 
                  ? 'bg-gray-700/80 text-yellow-400 hover:bg-gray-600/80' 
                  : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80'
              }`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden mt-3 animate-in slide-in-from-top-2 duration-200">
            <div className="relative">
              <Search 
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} 
                size={16} 
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className={`pl-10 pr-4 py-2.5 w-full border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${
                  isDark 
                    ? 'bg-gray-700/80 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
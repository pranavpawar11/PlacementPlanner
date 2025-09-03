// components/Header/Header.jsx - Corrected header using context
import React, { useState } from 'react';
import { Calendar, Sun, Moon, Search, X, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppProvider';

const Header = () => {
  // Get state and actions from context (removed duplicate props)
  const {
    isDark,
    toggleTheme,
    searchTerm,
    setSearchTerm,
    currentView,
    selectedDayData,
    backToCalendar
  } = useApp();

  // Local state for mobile search toggle
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className={`${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} sticky top-0 z-40 shadow-sm transition-theme`}>
      <div className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Left section - Back button for day view + Logo and Title */}
          <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            {/* Back button for day view */}
            {currentView === 'day' && (
              <button
                onClick={backToCalendar}
                className={`p-2 rounded-lg transition-colors hover:${isDark ? 'bg-gray-700' : 'bg-gray-100'} focus-ring mr-2`}
                aria-label="Back to calendar"
              >
                <ArrowLeft size={20} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
              </button>
            )}

            {/* Logo */}
            <div className="p-1.5 md:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <Calendar className="text-white" size={20} />
            </div>

            {/* Title */}
            <div className="min-w-0">
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                {currentView === 'day' && selectedDayData
                  ? `Tasks for ${new Date(selectedDayData.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}`
                  : 'Placement Planner'}
              </h1>
              <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} hidden sm:block`}>
                {currentView === 'day' ? 'Daily task view' : 'Organize your preparation journey'}
              </p>
            </div>
          </div>

          {/* Desktop Search and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search - only show for calendar view */}
            {currentView === 'calendar' && (
              <div className="relative">
                <Search 
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} 
                  size={16} 
                />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2.5 w-64 lg:w-80 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-gray-100 placeholder-gray-400' 
                      : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            )}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all hover:scale-105 shadow-sm focus-ring ${
                isDark 
                  ? 'bg-gray-700/80 text-yellow-400 hover:bg-gray-600/80' 
                  : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80'
              }`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Search Toggle - only show for calendar view */}
            {currentView === 'calendar' && (
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2.5 rounded-xl transition-all hover:scale-105 focus-ring ${
                  isSearchOpen
                    ? 'bg-blue-500 text-white shadow-lg'
                    : isDark 
                    ? 'bg-gray-700/80 text-gray-300 hover:bg-gray-600/80' 
                    : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80'
                }`}
                title="Search tasks"
                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
              >
                {isSearchOpen ? <X size={18} /> : <Search size={18} />}
              </button>
            )}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all hover:scale-105 focus-ring ${
                isDark 
                  ? 'bg-gray-700/80 text-yellow-400 hover:bg-gray-600/80' 
                  : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80'
              }`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && currentView === 'calendar' && (
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2.5 w-full border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${
                  isDark 
                    ? 'bg-gray-700/80 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                autoFocus
              />
              {/* Clear search button */}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                    isDark ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
                  }`}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
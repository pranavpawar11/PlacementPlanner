// components/Header/Header.jsx - Updated header with profile dropdown
import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Sun, Moon, Search, X, Bell, CalendarDays, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { useApp } from "../../context/AppProvider";
import { useAuthManager } from "../../hooks/useAuthManager";

const Header = () => {
  // Get state and actions from context
  const { 
    isDark, 
    toggleTheme, 
    searchTerm, 
    setSearchTerm, 
    currentView, 
    setCurrentView,
    categories 
  } = useApp();

  const navigate = useNavigate()

  const { user, logout, isLoggedIn, userInitials } = useAuthManager();

  // Local state for mobile search toggle and profile dropdown
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calculate notification count
  const notificationCount = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const allTasks = categories.flatMap(cat => cat.tasks);
    const incompleteTasks = allTasks.filter(task => !task.completed);
    const overdueTasks = incompleteTasks.filter(task => task.date < today);
    return overdueTasks.length;
  }, [categories]);

  // Toggle between calendar and notifications view
  const handleNotificationsToggle = () => {
    if (currentView === 'notifications') {
      setCurrentView('calendar');
    } else {
      setCurrentView('notifications');
    }
  };

  // Handle calendar view toggle (for when in day view or other views)
  const handleCalendarToggle = () => {
    setCurrentView('calendar');
  };

  // Handle logout
  const handleLogout = async () => {
    setIsProfileOpen(false);
    const res = await logout();
    if(res.success){
      navigate('/login')
    }
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Profile dropdown component
  const ProfileDropdown = ({ isMobile = false }) => (
    <div className={`absolute ${isMobile ? 'right-0 top-12' : 'right-0 top-14'} w-64 z-50`}>
      <div className={`${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border rounded-xl shadow-xl backdrop-blur-md animate-in slide-in-from-top-2 duration-200`}>
        {/* User Info Section */}
        <div className={`p-4 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
              isDark ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            }`}>
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                userInitials
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                {user?.name || 'User'}
              </p>
              <p className={`text-xs truncate ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <button
            onClick={() => {
              setIsProfileOpen(false);
              // Add profile settings navigation logic here
            }}
            className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors ${
              isDark ? "hover:bg-gray-700/50 text-gray-300" : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <Settings size={16} />
            <span className="text-sm">Account Settings</span>
          </button>
          
          <button
            onClick={() => {
              setIsProfileOpen(false);
              // Add profile view navigation logic here
            }}
            className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors ${
              isDark ? "hover:bg-gray-700/50 text-gray-300" : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <User size={16} />
            <span className="text-sm">View Profile</span>
          </button>

          <hr className={`my-2 ${isDark ? "border-gray-700" : "border-gray-200"}`} />

          <button
            onClick={handleLogout}
            onMouseDown={(e) => e.stopPropagation()}
            className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors ${
              isDark ? "hover:bg-red-900/20 text-red-400" : "hover:bg-red-50 text-red-600"
            }`}
          >
            <LogOut size={16} />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <header
      className={`${
        isDark ? "bg-gray-800/90" : "bg-white/90"
      } backdrop-blur-md border-b ${
        isDark ? "border-gray-700" : "border-gray-200"
      } sticky top-0 z-40 shadow-sm transition-theme`}
    >
      <div className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Left section - Logo and Title (Always consistent) */}
          <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            {/* Logo */}
            <div className="p-1 md:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-sm shadow-md flex items-center justify-center">
              <img
                src="/logo.png"
                alt="PlaceMate Logo"
                className="w-6 h-6 md:w-8 md:h-8 object-contain"
              />
            </div>

            {/* Title - Always shows PlaceMate */}
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

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search - Always visible */}
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
                className={`pl-10 pr-4 py-2.5 w-64 lg:w-80 border rounded-xl focus:ring-2 focus:border-transparent transition-all shadow-sm ${
                  isDark
                    ? "bg-gray-700/80 border-gray-600 text-gray-100 placeholder-gray-400"
                    : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
              {/* Clear search button */}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
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

            {/* View Toggle Button - Calendar/Notifications */}
            <button
              onClick={currentView === 'notifications' ? handleCalendarToggle : handleNotificationsToggle}
              className={`relative p-3 rounded-xl transition-all hover:scale-105 shadow-sm focus-ring ${
                currentView === 'notifications'
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                  : isDark
                  ? "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80"
                  : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80"
              }`}
              title={currentView === 'notifications' ? "Switch to Calendar View" : "View Notifications"}
              aria-label={currentView === 'notifications' ? "Switch to Calendar View" : "View Notifications"}
            >
              {currentView === 'notifications' ? <CalendarDays size={20} /> : <Bell size={20} />}
              {/* Notification badge - only show when in calendar view and there are notifications */}
              {currentView !== 'notifications' && notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all hover:scale-105 shadow-sm focus-ring ${
                isDark
                  ? "bg-gray-700/80 text-yellow-400 hover:bg-gray-600/80"
                  : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80"
              }`}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Profile Dropdown - Desktop */}
            {isLoggedIn && (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center space-x-2 p-2 rounded-xl transition-all hover:scale-105 shadow-sm focus-ring ${
                    isProfileOpen
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : isDark
                      ? "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80"
                      : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80"
                  }`}
                  title="Profile menu"
                  aria-label="Profile menu"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    isProfileOpen 
                      ? "bg-white/20" 
                      : isDark 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600" 
                      : "bg-gradient-to-r from-blue-500 to-purple-600"
                  } ${isProfileOpen ? "text-white" : "text-white"}`}>
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      userInitials
                    )}
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {isProfileOpen && <ProfileDropdown />}
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Search Toggle - Always available */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2.5 rounded-xl transition-all hover:scale-105 focus-ring ${
                isSearchOpen
                  ? "bg-blue-500 text-white shadow-lg"
                  : isDark
                  ? "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80"
                  : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80"
              }`}
              title="Search tasks"
              aria-label={isSearchOpen ? "Close search" : "Open search"}
            >
              {isSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            {/* View Toggle Button - Mobile */}
            <button
              onClick={currentView === 'notifications' ? handleCalendarToggle : handleNotificationsToggle}
              className={`relative p-2.5 rounded-xl transition-all hover:scale-105 focus-ring ${
                currentView === 'notifications'
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                  : isDark
                  ? "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80"
                  : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80"
              }`}
              title={currentView === 'notifications' ? "Switch to Calendar View" : "View Notifications"}
              aria-label={currentView === 'notifications' ? "Switch to Calendar View" : "View Notifications"}
            >
              {currentView === 'notifications' ? <CalendarDays size={18} /> : <Bell size={18} />}
              {/* Notification badge - mobile */}
              {currentView !== 'notifications' && notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all hover:scale-105 focus-ring ${
                isDark
                  ? "bg-gray-700/80 text-yellow-400 hover:bg-gray-600/80"
                  : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80"
              }`}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Profile Dropdown - Mobile */}
            {isLoggedIn && (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`p-2.5 rounded-xl transition-all hover:scale-105 focus-ring ${
                    isProfileOpen
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : isDark
                      ? "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80"
                      : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80"
                  }`}
                  title="Profile menu"
                  aria-label="Profile menu"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    isProfileOpen 
                      ? "bg-white/20 text-white" 
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  }`}>
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      userInitials
                    )}
                  </div>
                </button>

                {isProfileOpen && <ProfileDropdown isMobile={true} />}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar - Always available when toggled */}
        {isSearchOpen && (
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
                className={`pl-10 pr-4 py-2.5 w-full border rounded-xl focus:ring-2 focus:border-transparent transition-all shadow-sm ${
                  isDark
                    ? "bg-gray-700/80 border-gray-600 text-gray-100 placeholder-gray-400"
                    : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                autoFocus
              />
              {/* Clear search button */}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
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
        )}
      </div>
    </header>
  );
};

export default Header;
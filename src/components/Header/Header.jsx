import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppProvider";
import { useAuthManager } from "../../hooks/useAuthManager";

// Import components
import HeaderLogo from "./HeaderLogo";
import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import ThemeToggle from "./ThemeToggle";
import ProfileButton from "./ProfileButton";
import ProfileDropdown from "./ProfileDropdown";
import MobileSearch from "./MobileSearch";
import { Search, X } from "lucide-react";

const Header = () => {
  const { 
    isDark, 
    toggleTheme, 
    searchTerm, 
    setSearchTerm, 
    currentView, 
    setCurrentView,
    categories 
  } = useApp();

  const navigate = useNavigate();
  const { user, logout, isLoggedIn, userInitials } = useAuthManager();

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

  // Handle logout
  const handleLogout = async () => {
    setIsProfileOpen(false);
    const res = await logout();
    if(res.success){
      navigate('/login');
    }
  };

  // Mobile search toggle button
  const MobileSearchToggle = () => (
    <button
      onClick={() => setIsSearchOpen(!isSearchOpen)}
      className={`p-2.5 rounded-xl transition-all hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
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
          {/* Logo Section */}
          <HeaderLogo isDark={isDark} />

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              isDark={isDark} 
            />

            {/* Notification Button */}
            <NotificationButton 
              currentView={currentView}
              onToggle={handleNotificationsToggle}
              notificationCount={notificationCount}
              isDark={isDark}
            />

            {/* Theme Toggle */}
            <ThemeToggle 
              isDark={isDark} 
              onToggle={toggleTheme} 
            />

            {/* Profile Dropdown */}
            {isLoggedIn && (
              <div className="relative" ref={profileDropdownRef}>
                <ProfileButton 
                  isOpen={isProfileOpen}
                  onToggle={() => setIsProfileOpen(!isProfileOpen)}
                  user={user}
                  userInitials={userInitials}
                  isDark={isDark}
                />
                
                <ProfileDropdown 
                  isOpen={isProfileOpen}
                  onClose={() => setIsProfileOpen(false)}
                  user={user}
                  userInitials={userInitials}
                  onLogout={handleLogout}
                  isDark={isDark}
                />
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <MobileSearchToggle />
            
            <NotificationButton 
              currentView={currentView}
              onToggle={handleNotificationsToggle}
              notificationCount={notificationCount}
              isDark={isDark}
              isMobile={true}
            />

            <ThemeToggle 
              isDark={isDark} 
              onToggle={toggleTheme} 
              isMobile={true}
            />

            {isLoggedIn && (
              <div className="relative" ref={profileDropdownRef}>
                <ProfileButton 
                  isOpen={isProfileOpen}
                  onToggle={() => setIsProfileOpen(!isProfileOpen)}
                  user={user}
                  userInitials={userInitials}
                  isDark={isDark}
                  isMobile={true}
                />
                
                <ProfileDropdown 
                  isOpen={isProfileOpen}
                  onClose={() => setIsProfileOpen(false)}
                  user={user}
                  userInitials={userInitials}
                  onLogout={handleLogout}
                  isDark={isDark}
                  isMobile={true}
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <MobileSearch 
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isDark={isDark}
        />
      </div>
    </header>
  );
};

export default Header;
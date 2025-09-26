import React from "react";
import { Bell, CalendarDays } from "lucide-react";

const NotificationButton = ({ 
  currentView, 
  onToggle, 
  notificationCount, 
  isDark,
  isMobile = false 
}) => {
  const size = isMobile ? 18 : 20;
  const buttonSize = isMobile ? "p-2.5" : "p-3";
  
  return (
    <button
      onClick={onToggle}
      className={`relative ${buttonSize} rounded-xl transition-all hover:scale-105 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
        currentView === 'notifications'
          ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
          : isDark
          ? "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80"
          : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80"
      }`}
      title={currentView === 'notifications' ? "Switch to Calendar View" : "View Notifications"}
      aria-label={currentView === 'notifications' ? "Switch to Calendar View" : "View Notifications"}
    >
      {currentView === 'notifications' ? <CalendarDays size={size} /> : <Bell size={size} />}
      {currentView !== 'notifications' && notificationCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
          {notificationCount > 9 ? '9+' : notificationCount}
        </span>
      )}
    </button>
  );
};

export default NotificationButton;
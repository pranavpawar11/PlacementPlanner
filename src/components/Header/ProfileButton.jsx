import React from "react";
import { ChevronDown } from "lucide-react";

const ProfileButton = ({ 
  isOpen, 
  onToggle, 
  user, 
  userInitials, 
  isDark, 
  isMobile = false 
}) => {
  const buttonSize = isMobile ? "p-2.5" : "p-2";
  const avatarSize = isMobile ? "w-6 h-6 text-xs" : "w-8 h-8 text-xs";
  
  return (
    <button
      onClick={onToggle}
      className={`flex items-center space-x-2 ${buttonSize} rounded-xl transition-all hover:scale-105 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
        isOpen
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
          : isDark
          ? "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80"
          : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80"
      }`}
      title="Profile menu"
      aria-label="Profile menu"
    >
      <div className={`${avatarSize} rounded-full flex items-center justify-center font-semibold ${
        isOpen ? "bg-white/20" : "bg-gradient-to-r from-blue-500 to-purple-600"
      } text-white`}>
        {user?.avatar ? (
          <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
        ) : (
          userInitials
        )}
      </div>
      {!isMobile && (
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      )}
    </button>
  );
};

export default ProfileButton;
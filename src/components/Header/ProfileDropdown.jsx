import React from "react";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";

const ProfileDropdown = ({ 
  isOpen, 
  onClose, 
  user, 
  userInitials, 
  onLogout, 
  isDark, 
  isMobile = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className={`absolute ${isMobile ? 'right-0 top-12' : 'right-0 top-14'} w-64 z-50`}>
      <div className={`${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border rounded-xl shadow-xl backdrop-blur-md animate-in slide-in-from-top-2 duration-200`}>
        {/* User Info Section */}
        <div className={`p-4 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white`}>
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
            onClick={onClose}
            className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none rounded mx-2 ${
              isDark ? "hover:bg-gray-700/50 text-gray-300" : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <Settings size={16} />
            <span className="text-sm">Account Settings</span>
          </button>
          
          <button
            onClick={onClose}
            className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none rounded mx-2 ${
              isDark ? "hover:bg-gray-700/50 text-gray-300" : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <User size={16} />
            <span className="text-sm">View Profile</span>
          </button>

          <hr className={`my-2 ${isDark ? "border-gray-700" : "border-gray-200"}`} />

          <button
            onClick={onLogout}
            onMouseDown={(e) => e.stopPropagation()} 
            className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none rounded mx-2 ${
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
};

export default ProfileDropdown;
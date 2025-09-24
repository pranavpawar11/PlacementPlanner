
// components/Notifications/NotificationsView.jsx
import React, { useState, useMemo } from 'react';
import { 
  Bell, 
} from 'lucide-react';

const NotificationsHeader = ({ stats, isDark, isMobile, onBackToCalendar, onBulkReschedule }) => (
  <div className={`${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} p-4 md:p-6`}>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={onBackToCalendar}
          className={`p-2 rounded-xl transition-all hover:scale-105 ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          ←
        </button>
        
        <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
          <Bell className="w-6 h-6 text-white" />
        </div>
        
        <div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your incomplete tasks
          </p>
        </div>
      </div>

      {!isMobile && (
        <button
          onClick={onBulkReschedule}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          Bulk Reschedule
        </button>
      )}
    </div>

    {/* Stats Cards */}
    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-xl bg-${stat.color}-500/20`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default NotificationsHeader;

// components/Notifications/NotificationsView.jsx
import React, { useState, useMemo } from 'react';

const NotificationsSidebar = ({ suggestedDates, overdueTasks, isDark, onBulkReschedule }) => {
  const getWorkloadColor = (workload) => {
    switch (workload) {
      case 'light': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'heavy': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className={`w-80 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50/50'} backdrop-blur-md border-l ${isDark ? 'border-gray-700' : 'border-gray-200'} p-4 space-y-6`}>
      {/* Quick Actions */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
        <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          ⚡ Quick Actions
        </h3>
        
        <div className="space-y-3">
          <button 
            onClick={onBulkReschedule}
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Reschedule All Overdue ({overdueTasks.length})
          </button>
          
          <button className="w-full p-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
            Mark Low Priority as Done
          </button>
          
          <button className="w-full p-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
            Focus Mode: High Priority
          </button>
        </div>
      </div>

      {/* Best Days to Reschedule */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
        <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          📅 Best Days to Reschedule
        </h3>
        
        <div className="space-y-3">
          {suggestedDates.slice(0, 5).map((suggestion, index) => (
            <div
              key={suggestion.date}
              className={`p-3 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-700/30 hover:border-blue-500/50' : 'border-gray-200 bg-gray-50 hover:border-blue-500/50'} transition-all cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {suggestion.displayDate}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {suggestion.tasksCount} tasks • {suggestion.totalHours}h total
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded border ${getWorkloadColor(suggestion.workload)}`}>
                    {suggestion.workload}
                  </span>
                  {index === 0 && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30">
                      Best
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default NotificationsSidebar;
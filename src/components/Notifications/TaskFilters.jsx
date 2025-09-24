
// components/Notifications/NotificationsView.jsx
import React from 'react';

const TaskFilters = ({ filterOptions, activeFilter, setActiveFilter, isDark, isMobile }) => (
  <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-md p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-5'} gap-2`}>
      {filterOptions.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`p-3 rounded-xl text-left transition-all hover:scale-[1.02] ${
            activeFilter === filter.id
              ? `bg-gradient-to-r from-${filter.color}-500 to-${filter.color}-600 text-white shadow-lg`
              : isDark
              ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* <filter.icon className="w-4 h-4" /> */}
            <span className="text-xs font-bold bg-white/20 rounded-full px-2 py-1">
              {filter.count}
            </span>
          </div>
          <p className="text-sm font-medium mt-1">{filter.label}</p>
        </button>
      ))}
    </div>
  </div>
);

export default TaskFilters;
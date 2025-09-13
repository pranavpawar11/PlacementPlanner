import React from 'react';

const FilterSelect = ({ label, value, onChange, options, icon: Icon, isDark }) => (
  <div className="w-full">
    {/* Mobile-First: Vertical Layout */}
    <div className="sm:hidden">
      {/* <div className="flex items-center space-x-2 mb-2">
        <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-800/60' : 'bg-white/60'} border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} backdrop-blur-sm shadow-sm`}>
          <Icon size={14} className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </div>
        <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
          {label}
        </label>
      </div> */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-10 px-4 py-2 rounded-xl text-sm border transition-all duration-200 ${
          isDark 
            ? 'bg-gray-800/80 border-gray-600/50 text-gray-200 focus:border-blue-500/70 focus:bg-gray-800' 
            : 'bg-white/80 border-gray-300/50 text-gray-700 focus:border-blue-500/70 focus:bg-white'
        } focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm hover:border-blue-500/50 shadow-sm font-medium`}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>

    {/* Desktop: Horizontal Layout */}
    <div className="hidden sm:flex items-center space-x-3">
      <div className={`p-2.5 rounded-lg ${isDark ? 'bg-gray-800/60' : 'bg-white/60'} border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} backdrop-blur-sm shadow-sm`}>
        <Icon size={16} className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
      </div>
      <div className="flex flex-col min-w-0">
        {/* <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider mb-1.5`}>
          {label}
        </label> */}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`min-w-[140px] h-10 px-4 py-2 rounded-xl text-sm border transition-all duration-200 focus:scale-[1.02] ${
            isDark 
              ? 'bg-gray-800/80 border-gray-600/50 text-gray-200 focus:border-blue-500/70 focus:bg-gray-800' 
              : 'bg-white/80 border-gray-300/50 text-gray-700 focus:border-blue-500/70 focus:bg-white'
          } focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm hover:border-blue-500/50 shadow-sm font-medium`}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

export default FilterSelect;
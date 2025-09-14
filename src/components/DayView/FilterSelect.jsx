import React from 'react';
import { ChevronDown } from 'lucide-react';

const FilterSelect = ({ label, value, onChange, options, icon: Icon, isDark, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Mobile-First: Clean Vertical Layout */}
      <div className="sm:hidden">
        <div className="relative">
          {/* Icon and Select Container */}
          <div className="relative flex items-center">
            {/* Icon */}
            <div className={`absolute left-3 z-10 flex items-center justify-center w-5 h-5 rounded-md ${
              isDark ? 'bg-gray-700/60' : 'bg-gray-100/80'
            }`}>
              <Icon size={12} className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
            
            {/* Select */}
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`w-full h-11 pl-12 pr-10 py-3 rounded-xl text-sm border transition-all duration-200 appearance-none cursor-pointer ${
                isDark 
                  ? 'bg-gray-800/90 border-gray-600/60 text-gray-200 hover:border-gray-500/70 focus:border-blue-500/80 focus:bg-gray-800' 
                  : 'bg-white/90 border-gray-300/60 text-gray-700 hover:border-gray-400/70 focus:border-blue-500/80 focus:bg-white'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm shadow-sm font-medium hover:shadow-md focus:shadow-md`}
            >
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            {/* Dropdown Arrow */}
            <div className="absolute right-3 pointer-events-none">
              <ChevronDown size={16} className={`${isDark ? 'text-gray-400' : 'text-gray-600'} transition-transform duration-200`} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Enhanced Horizontal Layout */}
      <div className="hidden sm:block">
        <div className="flex items-center gap-3">
          {/* Icon Container */}
          <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl ${
            isDark 
              ? 'bg-gradient-to-br from-gray-800/80 to-gray-700/60 border border-gray-700/50' 
              : 'bg-gradient-to-br from-white/80 to-gray-50/60 border border-gray-200/50'
          } backdrop-blur-sm shadow-sm`}>
            <Icon size={16} className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
          
          {/* Select Container */}
          <div className="flex-1 min-w-0 max-w-[200px]">
            <div className="relative">
              <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full h-10 px-4 pr-10 py-2 rounded-xl text-sm border transition-all duration-200 appearance-none cursor-pointer hover:scale-[1.01] focus:scale-[1.02] ${
                  isDark 
                    ? 'bg-gray-800/90 border-gray-600/60 text-gray-200 hover:border-gray-500/70 focus:border-blue-500/80 focus:bg-gray-800' 
                    : 'bg-white/90 border-gray-300/60 text-gray-700 hover:border-gray-400/70 focus:border-blue-500/80 focus:bg-white'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm shadow-sm font-medium hover:shadow-md focus:shadow-md`}
              >
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              {/* Dropdown Arrow */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown size={14} className={`${isDark ? 'text-gray-400' : 'text-gray-600'} transition-transform duration-200 group-hover:rotate-180`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSelect;
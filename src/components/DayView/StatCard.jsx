import React from 'react';

const StatCard = ({ icon: Icon, value, label, color, isDark, compact = false }) => {
  const getColorClasses = (color) => {
    const colors = {
      green: isDark ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-green-600 bg-green-50 border-green-200',
      blue: isDark ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : 'text-blue-600 bg-blue-50 border-blue-200',
      orange: isDark ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' : 'text-orange-600 bg-orange-50 border-orange-200',
      purple: isDark ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' : 'text-purple-600 bg-purple-50 border-purple-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`${compact ? 'p-3' : 'p-4'} rounded-xl backdrop-blur-sm border transition-all duration-200 hover:scale-[1.02] ${
      isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/60 border-gray-200/50'
    } hover:shadow-lg group`}>
      <div className="flex items-center space-x-3">
        <div className={`${compact ? 'p-1.5' : 'p-2'} rounded-lg border ${getColorClasses(color)} group-hover:scale-110 transition-transform duration-200`}>
          <Icon size={compact ? 14 : 16} />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`${compact ? 'text-lg' : 'text-xl'} font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'} leading-tight`}>
            {value}
          </div>
          <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wide`}>
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
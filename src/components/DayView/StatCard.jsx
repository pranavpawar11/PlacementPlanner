import React from 'react';

const StatCard = ({ icon: Icon, value, label, color, isDark, compact = false }) => {
  const getColorClasses = (color) => {
    const colors = {
      green: {
        icon: isDark ? 'text-green-400 bg-green-500/15 border-green-500/30' : 'text-green-600 bg-green-50 border-green-200',
        bg: isDark ? 'hover:bg-green-500/5' : 'hover:bg-green-50/50',
        glow: 'hover:shadow-green-500/20'
      },
      blue: {
        icon: isDark ? 'text-blue-400 bg-blue-500/15 border-blue-500/30' : 'text-blue-600 bg-blue-50 border-blue-200',
        bg: isDark ? 'hover:bg-blue-500/5' : 'hover:bg-blue-50/50',
        glow: 'hover:shadow-blue-500/20'
      },
      orange: {
        icon: isDark ? 'text-orange-400 bg-orange-500/15 border-orange-500/30' : 'text-orange-600 bg-orange-50 border-orange-200',
        bg: isDark ? 'hover:bg-orange-500/5' : 'hover:bg-orange-50/50',
        glow: 'hover:shadow-orange-500/20'
      },
      purple: {
        icon: isDark ? 'text-purple-400 bg-purple-500/15 border-purple-500/30' : 'text-purple-600 bg-purple-50 border-purple-200',
        bg: isDark ? 'hover:bg-purple-500/5' : 'hover:bg-purple-50/50',
        glow: 'hover:shadow-purple-500/20'
      }
    };
    return colors[color] || colors.blue;
  };

  const colorConfig = getColorClasses(color);

  return (
    <div className={`${compact ? 'p-4' : 'p-5'} rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] group ${
      isDark ? 'bg-gray-800/70 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
    } hover:shadow-xl ${colorConfig.glow} ${colorConfig.bg}`}>
      <div className="flex items-center space-x-4">
        <div className={`${compact ? 'p-2.5' : 'p-3'} rounded-xl border ${colorConfig.icon} group-hover:scale-110 transition-all duration-300 shadow-sm`}>
          <Icon size={compact ? 16 : 18} />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`${compact ? 'text-xl' : 'text-2xl'} font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'} leading-tight`}>
            {value}
          </div>
          <div className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider mt-1`}>
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatCard;
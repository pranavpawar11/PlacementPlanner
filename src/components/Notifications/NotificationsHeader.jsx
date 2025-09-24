import React from 'react';
import { ArrowLeft, Bell, RotateCcw, Check } from 'lucide-react';

const NotificationsHeader = ({
  isDark,
  isMobile,
  stats,
  activeFilter,
  filteredTasks,
  suggestedDates,
  onBackToCalendar,
  onIntelligentReschedule,
  onBulkMarkLowPriority
}) => {
  const getHeaderTitle = () => {
    if (isMobile) return 'Alerts';
    return 'Task Alert Center';
  };

  const getSubtitle = () => {
    if (activeFilter === 'insights') {
      return `${suggestedDates.length} AI recommendations`;
    }
    return `${filteredTasks.length} task${filteredTasks.length !== 1 ? 's' : ''} need attention`;
  };

  return (
    <div className={`relative ${
      isDark ? 'bg-gray-900/90' : 'bg-white/90'
    } backdrop-blur-xl border-b ${
      isDark ? 'border-gray-800/60' : 'border-gray-100/60'
    } flex-shrink-0 h-20 sm:h-24`}>
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      </div>

      <div className="relative px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5 h-full flex items-center">
        <div className="flex items-center gap-2 sm:gap-3 w-full">
          
          {/* Back Button */}
          <button
            onClick={onBackToCalendar}
            className={`flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
              isDark
                ? "bg-gray-800/40 hover:bg-gray-800/70 text-gray-300 border border-gray-700/30"
                : "bg-gray-50/80 hover:bg-gray-100/80 text-gray-600 border border-gray-200/30"
            } backdrop-blur-sm`}
          >
            <ArrowLeft size={18} />
          </button>

          {/* Icon and Title Section */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`flex-shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl shadow-md ${
              isDark 
                ? 'bg-gradient-to-br from-orange-500 to-red-500' 
                : 'bg-gradient-to-br from-orange-400 to-red-400'
            }`}>
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className={`text-lg sm:text-xl font-bold ${
                isDark ? 'text-gray-50' : 'text-gray-900'
              } leading-tight`}>
                {getHeaderTitle()}
              </h1>
              <div className="flex items-center gap-1.5 text-sm">
                <span className={`font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {getSubtitle()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Smart Reschedule */}
            {stats.overdue > 0 && (
              <button
                onClick={onIntelligentReschedule}
                className={`group flex items-center gap-1.5 h-9 sm:h-10 px-3 sm:px-4 rounded-xl transition-all duration-200 hover:scale-105 font-medium text-sm ${
                  isDark
                    ? 'bg-blue-600/80 hover:bg-blue-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                } shadow-sm hover:shadow-md`}
              >
                <RotateCcw size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                <span className="hidden min-[380px]:inline">Smart</span>
                <span className="hidden sm:inline">Fix</span>
                <span className="flex items-center justify-center min-w-[18px] h-4 text-xs rounded-full font-semibold bg-white/20 text-white">
                  {stats.overdue}
                </span>
              </button>
            )}
            
            {/* Clear Low Priority */}
            <button
              onClick={onBulkMarkLowPriority}
              className={`group flex items-center gap-1.5 h-9 sm:h-10 px-3 sm:px-4 rounded-xl transition-all duration-200 hover:scale-105 font-medium text-sm ${
                isDark
                  ? 'bg-emerald-600/80 hover:bg-emerald-600 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              } shadow-sm hover:shadow-md`}
            >
              <Check size={14} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="hidden min-[380px]:inline">Clear</span>
              <span className="hidden sm:inline">Low</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsHeader;
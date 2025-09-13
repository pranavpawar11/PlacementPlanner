import React from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { dateUtils } from '../../utils/dateUtils';

const CalendarHeader = ({ currentDate, isDark, navigateMonth, goToToday }) => {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const isCurrentMonth = dateUtils.isCurrentMonth(currentDate);

  return (
    <div className="p-4 lg:p-6 flex-shrink-0">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
            <button
            onClick={() => navigateMonth(-1)}
            className={`flex items-center space-x-2 px-3 lg:px-4 py-2 lg:py-3 rounded-xl ${
                isDark 
                ? 'bg-gray-800/80 text-gray-300 hover:bg-gray-700' 
                : 'bg-white/80 text-gray-600 hover:bg-gray-50'
            } transition-all hover:scale-105 shadow-lg backdrop-blur-sm font-medium`}
            >
            <ChevronLeft size={18} />
            <span className="hidden lg:inline">Previous</span>
            </button>

        <div className="flex items-center space-x-4">
          <h2 className={`text-xl lg:text-3xl font-bold ${
            isDark ? 'text-gray-100' : 'text-gray-800'
          }`}>
            {dateUtils.getMonthName(month)} {year}
          </h2>
          
          {!isCurrentMonth && (
            <button
              onClick={goToToday}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 shadow-md ${
                isDark 
                  ? 'bg-blue-600/80 hover:bg-blue-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              title="Go to current month"
            >
              <CalendarDays size={16} />
              <span className="hidden sm:inline">Today</span>
            </button>
          )}
        </div>

        <button
          onClick={() => navigateMonth(1)}
          className={`flex items-center space-x-2 px-3 lg:px-4 py-2 lg:py-3 rounded-xl ${
            isDark 
              ? 'bg-gray-800/80 text-gray-300 hover:bg-gray-700' 
              : 'bg-white/80 text-gray-600 hover:bg-gray-50'
          } transition-all hover:scale-105 shadow-lg backdrop-blur-sm font-medium`}
        >
          <span className="hidden lg:inline">Next</span>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 lg:gap-3 mb-3 lg:mb-4">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
          <div key={day} className={`p-2 lg:p-3 text-center font-semibold text-xs lg:text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <span className="hidden lg:inline">{day}</span>
            <span className="lg:hidden">{day.substring(0, 3)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;
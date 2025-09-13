import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Plus, 
  Eye, 
  CalendarDays, 
  Clock, 
  CheckCircle2, 
  Circle, 
  History,
  ArrowUp,
  Filter,
  Zap,
  MoreHorizontal
} from 'lucide-react';
import TaskCard from '../TaskCard';
import { dateUtils } from '../../utils/dateUtils';

const MobileCalendarView = ({
  currentDate,
  days,
  isDark,
  navigateMonth,
  goToToday,
  handleViewDayTasks,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
  handleToggleTask
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const isCurrentMonth = dateUtils.isCurrentMonth(currentDate);
  const daysWithTasks = days.filter(day => day && day.tasks.length > 0);
  
  // Separate days based on current date
  const currentDay = daysWithTasks.find(day => day.isToday);
  const today = new Date();
  const todayDay = today.getDate();
  
  const pastDays = daysWithTasks.filter(day => 
    !day.isToday && parseInt(day.day) < todayDay
  ).sort((a, b) => parseInt(b.day) - parseInt(a.day));
  
  const upcomingDays = daysWithTasks.filter(day => 
    !day.isToday && parseInt(day.day) > todayDay
  ).sort((a, b) => parseInt(a.day) - parseInt(b.day));

  const getTaskStats = (tasks) => {
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  const renderProgressBar = (percentage) => (
    <div className={`w-full h-1.5 rounded-full overflow-hidden ${
      isDark ? 'bg-gray-700/40' : 'bg-gray-200/60'
    }`}>
      <div 
        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-700 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );

  const getFilteredDays = () => {
    switch (activeFilter) {
      case 'today':
        return currentDay ? [currentDay] : [];
      case 'upcoming':
        return upcomingDays;
      case 'past':
        return pastDays;
      default:
        return [
          ...(currentDay ? [currentDay] : []),
          ...upcomingDays,
          ...pastDays
        ];
    }
  };

  const filterOptions = [
    { key: 'all', label: 'All Tasks', icon: Calendar, count: daysWithTasks.length },
    { key: 'today', label: 'Today', icon: Zap, count: currentDay ? 1 : 0 },
    { key: 'upcoming', label: 'Upcoming', icon: CalendarDays, count: upcomingDays.length },
    { key: 'past', label: 'Past', icon: History, count: pastDays.length }
  ];

  const activeFilterOption = filterOptions.find(f => f.key === activeFilter);

  const renderDayCard = (day, isCurrentDay = false, isPastDay = false) => {
    const stats = getTaskStats(day.tasks);
    
    return (
      <div key={day.dateString} 
        className={`group relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 transform hover:-translate-y-1 ${
          isDark 
            ? 'bg-gray-800/80 border-gray-700/50 hover:border-gray-600/60' 
            : 'bg-white/90 border-gray-200/60 hover:border-gray-300/70'
        } backdrop-blur-xl shadow-lg hover:shadow-2xl ${
          isCurrentDay 
            ? isDark
              ? 'ring-2 ring-blue-500/40 bg-gradient-to-br from-blue-900/20 to-purple-900/10'
              : 'ring-2 ring-blue-500/40 bg-gradient-to-br from-blue-50/90 to-purple-50/70'
            : ''
        } ${isPastDay ? 'opacity-75' : ''}`}
      >
        {/* Status indicator */}
        <div className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${
          isCurrentDay 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse shadow-md' 
            : isPastDay
              ? isDark ? 'bg-gray-600' : 'bg-gray-400'
              : isDark ? 'bg-emerald-500' : 'bg-emerald-400'
        }`} />
        
        {/* Date header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg transition-all duration-300 ${
              isCurrentDay 
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
                : isPastDay
                  ? isDark 
                    ? 'bg-gray-700/60 text-gray-400 border border-gray-600/40' 
                    : 'bg-gray-100/70 text-gray-500 border border-gray-300/40'
                  : isDark 
                    ? 'bg-gray-700/70 text-gray-200 border border-gray-600/40' 
                    : 'bg-gray-50/80 text-gray-700 border border-gray-300/40'
            }`}>
              {day.day}
            </div>
            
            <div className="flex flex-col">
              <span className={`text-sm font-semibold ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {dateUtils.getMonthName(month)}
              </span>
              <div className="flex items-center space-x-2 mt-1">
                {isCurrentDay && (
                  <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full font-medium shadow-sm">
                    Today
                  </span>
                )}
                {isPastDay && (
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                    isDark 
                      ? 'bg-gray-700/40 text-gray-400 border border-gray-600/30' 
                      : 'bg-gray-100/70 text-gray-500 border border-gray-300/40'
                  }`}>
                    Past
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleViewDayTasks(day)}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 ${
                isDark 
                  ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-500/15' 
                  : 'text-purple-500 hover:text-purple-600 hover:bg-purple-500/10'
              }`}
              title="View details"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => handleAddTask(day.dateString)}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 ${
                isDark 
                  ? 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/15' 
                  : 'text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10'
              }`}
              title="Add task"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Task statistics */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {stats.completed === stats.total && stats.total > 0 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <Circle className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              )}
              <span className={`text-xs font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {stats.completed}/{stats.total} done
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                stats.percentage === 100 
                  ? isDark 
                    ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/40'
                    : 'bg-emerald-100/80 text-emerald-700 border border-emerald-200/60'
                  : stats.percentage > 50
                    ? isDark
                      ? 'bg-amber-900/30 text-amber-300 border border-amber-700/40'
                      : 'bg-amber-100/80 text-amber-700 border border-amber-200/60'
                    : isDark
                      ? 'bg-red-900/30 text-red-300 border border-red-700/40'
                      : 'bg-red-100/80 text-red-700 border border-red-200/60'
              }`}>
                {Math.round(stats.percentage)}%
              </span>
            </div>
          </div>
          {renderProgressBar(stats.percentage)}
        </div>

        {/* Task preview */}
        <div className="space-y-2.5">
          {day.tasks.slice(0, 2).map((task, index) => (
            <div key={task.id} 
              className={`transform transition-all duration-300 ${
                index === 1 ? 'delay-75' : ''
              } group-hover:translate-x-1`}
            >
              <TaskCard
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
                isDark={isDark}
              />
            </div>
          ))}
          
          {day.tasks.length > 2 && (
            <button
              onClick={() => handleViewDayTasks(day)}
              className={`w-full text-center py-2.5 px-3 rounded-lg text-xs font-medium border transition-all duration-300 hover:scale-[1.02] ${
                isDark 
                  ? 'text-purple-400 hover:text-purple-300 border-purple-500/25 hover:bg-purple-500/10 hover:border-purple-400/40' 
                  : 'text-purple-600 hover:text-purple-700 border-purple-300/40 hover:bg-purple-50/60 hover:border-purple-400/60'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>View all {day.tasks.length} tasks</span>
                <ArrowUp size={12} className="rotate-90" />
              </div>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`flex-1 overflow-hidden flex flex-col ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20'
    }`}>
      {/* Redesigned header with better layout */}
      <div className={`flex-shrink-0 border-b backdrop-blur-xl ${
        isDark 
          ? 'bg-gray-800/60 border-gray-700/30' 
          : 'bg-white/60 border-gray-200/30'
      }`}>
        {/* Month navigation and title */}
        <div className="flex items-center justify-between p-6 pb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm ${
              isDark 
                ? 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/80 border border-gray-700/40' 
                : 'bg-white/70 text-gray-600 hover:bg-white/80 border border-gray-200/40'
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex flex-col items-center">
            <h2 className={`text-xl font-bold text-center ${
              isDark 
                ? 'bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'
            }`}>
              {dateUtils.getMonthName(month)} {year}
            </h2>
            
            {!isCurrentMonth && (
              <button
                onClick={goToToday}
                className="flex items-center space-x-2 mt-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md"
              >
                <CalendarDays size={12} />
                <span>Today</span>
              </button>
            )}
          </div>

          <button
            onClick={() => navigateMonth(1)}
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm ${
              isDark 
                ? 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/80 border border-gray-700/40' 
                : 'bg-white/70 text-gray-600 hover:bg-white/80 border border-gray-200/40'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Redesigned filter section with better mobile UX */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between">
            {/* Active filter display */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-md ${
                  isDark 
                    ? 'bg-gray-800/80 text-gray-200 border border-gray-700/50 hover:bg-gray-700/90' 
                    : 'bg-white/80 text-gray-700 border border-gray-200/50 hover:bg-white/90'
                }`}
              >
                <activeFilterOption.icon size={16} />
                <span>{activeFilterOption.label}</span>
                {activeFilterOption.count > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    isDark 
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                      : 'bg-blue-100 text-blue-600 border border-blue-200'
                  }`}>
                    {activeFilterOption.count}
                  </span>
                )}
                <MoreHorizontal size={14} className={`transition-transform duration-200 ${
                  showFilterMenu ? 'rotate-90' : ''
                }`} />
              </button>
            </div>

            {/* Quick today button */}
            {isCurrentMonth && currentDay && (
              <button
                onClick={() => setActiveFilter(activeFilter === 'today' ? 'all' : 'today')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeFilter === 'today'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md scale-105'
                    : isDark
                      ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 border border-blue-500/20'
                      : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50/60 border border-blue-200/40'
                }`}
              >
                <Zap size={14} />
                <span>Today</span>
              </button>
            )}
          </div>

          {/* Expandable filter menu */}
          {showFilterMenu && (
            <div className={`mt-3 p-3 rounded-xl border backdrop-blur-sm animate-in slide-in-from-top-1 duration-200 ${
              isDark 
                ? 'bg-gray-800/90 border-gray-700/50' 
                : 'bg-white/90 border-gray-200/50'
            } shadow-lg`}>
              <div className="grid grid-cols-2 gap-2">
                {filterOptions.map(({ key, label, icon: Icon, count }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveFilter(key);
                      setShowFilterMenu(false);
                    }}
                    className={`flex items-center space-x-2 p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeFilter === key
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                        : isDark
                          ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700/50'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/60'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="flex-1 text-left">{label}</span>
                    {count > 0 && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                        activeFilter === key
                          ? 'bg-white/20 text-white'
                          : isDark
                            ? 'bg-gray-600/40 text-gray-300'
                            : 'bg-gray-200/60 text-gray-600'
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content area with better scrolling */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="space-y-4 pt-6">
          {getFilteredDays().map((day) => {
            const isCurrentDay = day.isToday;
            const isPastDay = !day.isToday && parseInt(day.day) < todayDay;
            return renderDayCard(day, isCurrentDay, isPastDay);
          })}
          
          {/* Enhanced Empty State */}
          {getFilteredDays().length === 0 && (
            <div className={`rounded-2xl p-10 text-center border shadow-xl ${
              isDark 
                ? 'bg-gray-800/60 border-gray-700/30' 
                : 'bg-white/60 border-gray-200/30'
            } backdrop-blur-xl`}>
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                isDark ? 'bg-gray-700/40' : 'bg-gray-100/60'
              }`}>
                <Filter className={`w-10 h-10 ${
                  isDark ? 'text-gray-400' : 'text-gray-400'
                }`} />
              </div>
              <p className={`text-lg font-semibold mb-2 ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {activeFilter === 'today' && !currentDay ? 'No tasks for today' :
                 activeFilter === 'upcoming' ? 'No upcoming tasks' :
                 activeFilter === 'past' ? 'No past tasks' :
                 'Ready to get organized?'}
              </p>
              <p className={`text-sm mb-6 max-w-sm mx-auto ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {activeFilter === 'all' 
                  ? 'Start planning your month by adding your first task.'
                  : `Try switching to a different filter or add some tasks.`
                }
              </p>
              <button
                onClick={() => handleAddTask(new Date().toISOString().split('T')[0])}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Add Your First Task
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileCalendarView;
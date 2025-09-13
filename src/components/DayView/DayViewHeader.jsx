import React from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  BookOpen,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Target,
  CheckCircle2,
  Circle,
  Clock
} from 'lucide-react';
import StatCard from './StatCard';

const DayViewHeader = ({
  selectedDayData,
  dayTasks,
  allResources,
  isDark,
  isMobile,
  headerExpanded,
  setHeaderExpanded,
  showResources,
  setShowResources,
  onBackToCalendar,
  onAddTask
}) => {
  const formattedDate = new Date(selectedDayData.dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const shortDate = new Date(selectedDayData.dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const completedTasks = dayTasks.filter(task => task.completed).length;
  const totalTasks = dayTasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalEstimatedTime = dayTasks.reduce((sum, task) => sum + (task.estimatedTime || 0), 0);
  const completedTime = dayTasks.filter(task => task.completed).reduce((sum, task) => sum + (task.estimatedTime || 0), 0);

  const formatTime = (minutes) => {
    if (!minutes) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  // Consistent button styles
  const baseButtonStyles = "flex items-center justify-center h-10 rounded-xl transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm font-medium text-sm shadow-lg";
  const secondaryButtonStyles = `${baseButtonStyles} ${
    isDark 
      ? 'bg-gray-800/60 text-gray-300 hover:bg-gray-800/80 border border-gray-700/50' 
      : 'bg-white/60 text-gray-600 hover:bg-white/80 border border-gray-200/50'
  }`;
  const activeButtonStyles = `${baseButtonStyles} bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30`;
  const primaryButtonStyles = `${baseButtonStyles} bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30`;

  return (
    <div className={`relative ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-b ${isDark ? 'border-gray-700/30' : 'border-gray-200/30'} flex-shrink-0 transition-all duration-300`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
      </div>
      
      <div className="relative">
        <div className="px-4 py-4 sm:px-6 sm:py-5">
          
          {/* DESKTOP: Single Line Layout (hidden on mobile) */}
          <div className="hidden sm:flex items-center justify-between gap-4">
            {/* Left Section - Back Button + Date Info */}
            <div className="flex items-center space-x-4 min-w-0 flex-1">
              <button
                onClick={onBackToCalendar}
                className={`group ${secondaryButtonStyles} px-4 min-w-[44px] flex-shrink-0`}
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                <span className="ml-2">Back</span>
              </button>

              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <div className={`p-3 rounded-xl shadow-lg flex-shrink-0 ${
                  selectedDayData.isToday 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/25' 
                    : isDark 
                    ? 'bg-gray-800/80 border border-gray-700/50' 
                    : 'bg-white/80 border border-gray-200/50'
                }`}>
                  <Calendar className={`${
                    selectedDayData.isToday 
                      ? 'text-white' 
                      : isDark 
                      ? 'text-gray-300' 
                      : 'text-gray-600'
                  }`} size={20} />
                </div>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h1 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'} truncate leading-tight`}>
                      {formattedDate}
                    </h1>
                    {selectedDayData.isToday && (
                      <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs rounded-full shadow-lg font-medium flex-shrink-0">
                        Today
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {totalTasks} task{totalTasks !== 1 ? 's' : ''}
                    </span>
                    {totalTasks > 0 && (
                      <>
                        <span className={`${isDark ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                        <span className={`font-medium ${
                          completionPercentage === 100 
                            ? 'text-green-500' 
                            : isDark ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {completionPercentage}% complete
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              {totalTasks > 0 && (
                <button
                  onClick={() => setHeaderExpanded(!headerExpanded)}
                  className={`group px-4 min-w-[44px] ${headerExpanded ? activeButtonStyles : secondaryButtonStyles}`}
                >
                  <BarChart3 size={18} />
                  <span className="ml-2">Stats</span>
                  <div className="flex ml-2">
                    {headerExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>
              )}

              {totalTasks > 0  && (
                <button
                  onClick={() => setShowResources(!showResources)}
                  className={`group px-4 min-w-[44px] ${showResources ? activeButtonStyles : secondaryButtonStyles}`}
                >
                  <BookOpen size={18} />
                  <span className="ml-2">Resources</span>
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium ${
                    showResources 
                      ? 'bg-white/20 text-white' 
                      : isDark 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-blue-500/10 text-blue-600'
                  }`}>
                    {allResources.length > 9 ? '9+' : allResources.length}
                  </span>
                </button>
              )}
              
              <button
                onClick={onAddTask}
                className={`group px-5 min-w-[44px] ${primaryButtonStyles}`}
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
                <span className="ml-2">Add Task</span>
              </button>
            </div>
          </div>

          {/* MOBILE: Two Line Layout */}
          <div className="sm:hidden">
            {/* Line 1: Back Button + Date Info */}
            <div className="flex items-center space-x-3 mb-4">
              <button
                onClick={onBackToCalendar}
                className={`group ${secondaryButtonStyles} px-3 min-w-[44px] flex-shrink-0`}
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                <span className="hidden xs:inline ml-1.5">Back</span>
              </button>

              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className={`p-2.5 rounded-xl shadow-lg flex-shrink-0 ${
                  selectedDayData.isToday 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/25' 
                    : isDark 
                    ? 'bg-gray-800/80 border border-gray-700/50' 
                    : 'bg-white/80 border border-gray-200/50'
                }`}>
                  <Calendar className={`${
                    selectedDayData.isToday 
                      ? 'text-white' 
                      : isDark 
                      ? 'text-gray-300' 
                      : 'text-gray-600'
                  }`} size={18} />
                </div>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h1 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'} truncate leading-tight`}>
                      {shortDate}
                      {/* {formattedDate} */}
                    </h1>
                    
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {totalTasks} task{totalTasks !== 1 ? 's' : ''}
                    </span>
                    {totalTasks > 0 && (
                      <>
                        <span className={`${isDark ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                        <span className={`font-medium ${
                          completionPercentage === 100 
                            ? 'text-green-500' 
                            : isDark ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {completionPercentage}%
                        </span>
                      </>
                    )}
                    {selectedDayData.isToday && (
                      <span className="px-2.5 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs rounded-full shadow-lg font-medium flex-shrink-0">
                        Today
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Line 2: Action Buttons */}
            <div className="flex items-center justify-center space-x-2">
              {totalTasks > 0 && (
                <button
                  onClick={() => setHeaderExpanded(!headerExpanded)}
                  className={`group px-3 flex-1 max-w-[100px] ${headerExpanded ? activeButtonStyles : secondaryButtonStyles}`}
                >
                  <BarChart3 size={16} />
                  <span className="ml-1.5 text-xs">Stats</span>
                  {headerExpanded ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}
                </button>
              )}

              {totalTasks > 0  && (
                <button
                  onClick={() => setShowResources(!showResources)}
                  className={`group relative px-3 flex-1 max-w-[120px] ${showResources ? activeButtonStyles : secondaryButtonStyles}`}
                >
                  <BookOpen size={16} />
                  <span className="ml-1.5 text-xs">Resources</span>
                  <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full font-medium ${
                    showResources 
                      ? 'bg-white/20 text-white' 
                      : isDark 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-blue-500/10 text-blue-600'
                  }`}>
                    {allResources.length > 9 ? '9+' : allResources.length}
                  </span>
                </button>
              )}
              
              <button
                onClick={onAddTask}
                className={`group px-3 flex-1 max-w-[100px] ${primaryButtonStyles}`}
              >
                <Plus size={16} className="group-hover:rotate-90 transition-transform duration-200" />
                <span className="ml-1.5 text-xs">Add Task</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {totalTasks > 0 && (
            <div className="mt-4">
              <div className={`relative w-full h-3 ${isDark ? 'bg-gray-800/80' : 'bg-gray-200/80'} rounded-full overflow-hidden shadow-inner`}>
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-700 ease-out rounded-full ${
                    completionPercentage === 100 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30'
                  }`}
                  style={{ width: `${completionPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
                </div>
              </div>
              
              {/* Mobile Progress Text */}
              <div className="sm:hidden flex items-center justify-between mt-3 text-sm">
                <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {completedTasks}/{totalTasks} tasks
                </span>
                <span className={`font-medium ${
                  completionPercentage === 100 
                    ? 'text-green-500' 
                    : isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {completionPercentage}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Expanded Stats Section */}
        {headerExpanded && totalTasks > 0 && (
          <div className={`px-4 pb-6 sm:px-6 border-t ${isDark ? 'border-gray-700/30' : 'border-gray-200/30'} animate-in slide-in-from-top-2 duration-200`}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <StatCard
                icon={Target}
                value={`${completionPercentage}%`}
                label="Complete"
                color={completionPercentage === 100 ? 'green' : 'blue'}
                isDark={isDark}
                compact
              />
              <StatCard
                icon={CheckCircle2}
                value={completedTasks}
                label="Done"
                color="green"
                isDark={isDark}
                compact
              />
              <StatCard
                icon={Circle}
                value={totalTasks - completedTasks}
                label="Pending"
                color="orange"
                isDark={isDark}
                compact
              />
              <StatCard
                icon={Clock}
                value={formatTime(completedTime)}
                label="Time"
                color="purple"
                isDark={isDark}
                compact
              />
            </div>

            <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-gray-800/40' : 'bg-gray-50/60'} backdrop-blur-sm`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700/60' : 'bg-white/60'} shadow-sm`}>
                    <BarChart3 size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                  </div>
                  <span className={`font-semibold text-base ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    Daily Progress
                  </span>
                </div>
                <div className="flex items-center justify-between sm:space-x-8">
                  <div className="text-center sm:text-right">
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                      Tasks
                    </div>
                    <div className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {completedTasks}/{totalTasks}
                    </div>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                      Time
                    </div>
                    <div className={`font-semibold ${
                      completionPercentage === 100 
                        ? 'text-green-500' 
                        : isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {formatTime(completedTime)}/{formatTime(totalEstimatedTime)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayViewHeader;
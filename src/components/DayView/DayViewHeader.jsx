import React from "react";
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
  Clock,
  Zap,
  TrendingUp,
} from "lucide-react";
import StatCard from "./StatCard";

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
  onAddTask,
}) => {
  const formattedDate = new Date(selectedDayData.dateString).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Better responsive date formatting
  const shortDate = new Date(selectedDayData.dateString).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );

  const mediumDate = new Date(selectedDayData.dateString).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
    }
  );

  const completedTasks = dayTasks.filter((task) => task.completed).length;
  const totalTasks = dayTasks.length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalEstimatedTime = dayTasks.reduce(
    (sum, task) => sum + (task.estimatedTime || 0),
    0
  );
  const completedTime = dayTasks
    .filter((task) => task.completed)
    .reduce((sum, task) => sum + (task.estimatedTime || 0), 0);

  const formatTime = (minutes) => {
    if (!minutes) return "0m";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  return (
    <div
      className={`relative ${
        isDark ? "bg-gray-900/95" : "bg-white/95"
      } backdrop-blur-xl border-b ${
        isDark ? "border-gray-700/30" : "border-gray-200/30"
      } flex-shrink-0`}
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      </div>

      <div className="relative">
        {/* Main Header */}
        <div className="px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5">
          <div className="flex items-start gap-2 sm:gap-3">
            {/* Back Button */}
            <button
              onClick={onBackToCalendar}
              className={`flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                isDark
                  ? "bg-gray-800/60 hover:bg-gray-800/80 text-gray-300 border border-gray-700/50"
                  : "bg-white/60 hover:bg-white/80 text-gray-600 border border-gray-200/50"
              } backdrop-blur-sm shadow-lg`}
            >
              <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Date Info Section */}
            <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
              {/* Calendar Icon */}
              <div
                className={`flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl shadow-lg ${
                  selectedDayData.isToday
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/25"
                    : isDark
                    ? "bg-gray-800/80 border border-gray-700/50"
                    : "bg-white/80 border border-gray-200/50"
                }`}
              >
                <Calendar
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    selectedDayData.isToday
                      ? "text-white"
                      : isDark
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                />
              </div>

              {/* Date Text and Info */}
              <div className="min-w-0 flex-1 pt-1">
                {/* Date Title with Better Responsive Design */}
                <div className="flex items-center gap-1.5 mb-1">
                  <h1
                    className={`text-base sm:text-lg lg:text-xl font-bold ${
                      isDark ? "text-gray-100" : "text-gray-900"
                    } leading-tight`}
                  >
                    {/* Ultra small screens: Just date */}
                    <span className="inline min-[360px]:hidden">
                      {shortDate}
                    </span>
                    {/* Small screens: Short format */}
                    <span className="hidden min-[360px]:inline sm:hidden">
                      {mediumDate}
                    </span>
                    {/* Medium+ screens: Full format */}
                    <span className="hidden sm:inline">{formattedDate}</span>
                  </h1>

                  {/* Today Badge - More Compact */}
                  {selectedDayData.isToday && (
                    <div className="flex-shrink-0">
                      {/* Dot indicator for very small screens */}
                      {/* <div className="inline min-[380px]:hidden w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse" /> */}
                      {/* Small badge for medium screens */}
                      {/* <span className="hidden min-[380px]:inline sm:hidden px-1.5 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs rounded-full font-medium shadow-lg">
                        <Zap size={8} />
                      </span> */}
                      {/* Full badge for larger screens */}
                      <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs rounded-full font-medium shadow-lg">
                        <Zap size={10} />
                        Today
                      </span>
                    </div>
                  )}
                </div>

                {/* Task Stats - Improved Layout */}
                <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <span
                    className={`font-medium ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {totalTasks} task{totalTasks !== 1 ? "s" : ""}
                  </span>
                  {totalTasks > 0 && (
                    <>
                      <span
                        className={`${
                          isDark ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        •
                      </span>
                      <span
                        className={`font-semibold ${
                          completionPercentage === 100
                            ? "text-green-500"
                            : isDark
                            ? "text-blue-400"
                            : "text-blue-600"
                        }`}
                      >
                        {completionPercentage}%
                      </span>
                      {completionPercentage === 100 && (
                        <span className="text-green-500">
                          <CheckCircle2 size={12} />
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons - Improved Responsive Design */}
            <div className="flex items-start gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Stats Toggle - Better Mobile Visibility */}
              {totalTasks > 0 && (
                <button
                  onClick={() => setHeaderExpanded(!headerExpanded)}
                  className={`flex items-center justify-center gap-1.5 h-9 sm:h-10 lg:h-11 px-2 sm:px-3 lg:px-4 rounded-xl transition-all duration-200 hover:scale-105 text-xs sm:text-sm font-medium ${
                    headerExpanded
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : isDark
                      ? "bg-gray-800/60 hover:bg-gray-800/80 text-gray-300 border border-gray-700/50"
                      : "bg-white/60 hover:bg-white/80 text-gray-600 border border-gray-200/50"
                  } backdrop-blur-sm shadow-lg`}
                >
                  <TrendingUp size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline lg:hidden">Stats</span>
                  <span className="hidden lg:inline">Statistics</span>
                  {headerExpanded ? (
                    <ChevronUp size={12} className="sm:w-3.5 sm:h-3.5" />
                  ) : (
                    <ChevronDown size={12} className="sm:w-3.5 sm:h-3.5" />
                  )}
                </button>
              )}

              {/* Resources Toggle */}
              {totalTasks > 0 && allResources.length > 0 && (
                <button
                  onClick={() => setShowResources(!showResources)}
                  className={`flex items-center justify-center gap-1.5 h-9 sm:h-10 lg:h-11 px-2 sm:px-3 lg:px-4 rounded-xl transition-all duration-200 hover:scale-105 text-xs sm:text-sm font-medium ${
                    showResources
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : isDark
                      ? "bg-gray-800/60 hover:bg-gray-800/80 text-gray-300 border border-gray-700/50"
                      : "bg-white/60 hover:bg-white/80 text-gray-600 border border-gray-200/50"
                  } backdrop-blur-sm shadow-lg`}
                >
                  <BookOpen size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden lg:inline">Resources</span>
                  <span
                    className={`flex items-center justify-center min-w-[16px] h-4 sm:min-w-[18px] sm:h-[18px] text-xs rounded-full font-semibold ${
                      showResources
                        ? "bg-white/20 text-white"
                        : isDark
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-blue-500/10 text-blue-600"
                    }`}
                  >
                    {allResources.length > 9 ? "9+" : allResources.length}
                  </span>
                </button>
              )}

              {/* Add Task Button */}
              <button
                onClick={onAddTask}
                className="flex items-center justify-center gap-1.5 h-9 sm:h-10 lg:h-11 px-2 sm:px-3 lg:px-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-200 hover:scale-105 shadow-lg font-medium text-xs sm:text-sm group"
              >
                <Plus
                  size={14}
                  className="sm:w-4 sm:h-4 transition-transform duration-200 group-hover:rotate-90"
                />
                <span className="hidden min-[380px]:inline">Add</span>
                <span className="hidden sm:inline">Task</span>
              </button>
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          {totalTasks > 0 && (
            <div className="mt-3 sm:mt-4">
              <div
                className={`relative w-full h-2 ${
                  isDark ? "bg-gray-800/60" : "bg-gray-200/60"
                } rounded-full overflow-hidden shadow-inner`}
              >
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-700 ease-out rounded-full ${
                    completionPercentage === 100
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25"
                  }`}
                  style={{ width: `${completionPercentage}%` }}
                />
                {/* Animated shimmer effect */}
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Stats Section */}
        {headerExpanded && totalTasks > 0 && (
          <div
            className={`px-3 sm:px-4 lg:px-6 pb-4 sm:pb-6 border-t ${
              isDark ? "border-gray-700/30" : "border-gray-200/30"
            } animate-in slide-in-from-top-2 duration-300`}
          >
            {/* Stats Grid - Better Mobile Layout */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-6">
              <StatCard
                icon={Target}
                value={`${completionPercentage}%`}
                label="Complete"
                color={completionPercentage === 100 ? "green" : "blue"}
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

            {/* Enhanced Summary Card */}
            <div
              className={`mt-4 sm:mt-6 p-3 sm:p-4 lg:p-5 rounded-xl ${
                isDark ? "bg-gray-800/40" : "bg-gray-50/60"
              } backdrop-blur-sm border ${
                isDark ? "border-gray-700/30" : "border-gray-200/30"
              } shadow-lg`}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Header */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isDark ? "bg-gray-700/60" : "bg-white/60"
                    } shadow-sm`}
                  >
                    <TrendingUp
                      size={14}
                      className={`sm:w-4 sm:h-4 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-semibold text-sm sm:text-base ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Progress Overview
                  </span>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-center">
                      <div
                        className={`text-xs ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        } font-medium uppercase tracking-wide mb-1`}
                      >
                        Tasks
                      </div>
                      <div
                        className={`font-bold text-sm sm:text-base ${
                          isDark ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {completedTasks}/{totalTasks}
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-xs ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        } font-medium uppercase tracking-wide mb-1`}
                      >
                        Time
                      </div>
                      <div
                        className={`font-bold text-sm sm:text-base ${
                          completionPercentage === 100
                            ? "text-green-500"
                            : isDark
                            ? "text-blue-400"
                            : "text-blue-600"
                        }`}
                      >
                        {formatTime(completedTime)}/
                        {formatTime(totalEstimatedTime)}
                      </div>
                    </div>
                  </div>

                  {/* Completion Badge */}
                  {completionPercentage === 100 && (
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded-full font-medium shadow-lg">
                      <CheckCircle2 size={12} />
                      <span className="hidden sm:inline">Complete!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        /* Custom breakpoint utilities */
        @media (min-width: 360px) {
          .min-\[360px\]\:hidden {
            display: none;
          }
          .min-\[360px\]\:inline {
            display: inline;
          }
        }

        @media (min-width: 380px) {
          .min-\[380px\]\:hidden {
            display: none;
          }
          .min-\[380px\]\:inline {
            display: inline;
          }
        }
      `}</style>
    </div>
  );
};

export default DayViewHeader;

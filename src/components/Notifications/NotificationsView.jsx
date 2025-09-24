// components/Notifications/NotificationsView.jsx
import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppProvider";
import { useNotificationManager } from "../../hooks/useNotificationManager";
import { ArrowLeft, Bell, RotateCcw, Check } from "lucide-react";
import FilterBar from "./FilterBar";
import TaskCard from "./TaskCard";
import AIInsightsSection from "./AIInsightsSection";
import RescheduleModal from "./RescheduleModal";
import EmptyState from "./EmptyState";
import DesktopSidebar from "./DesktopSidebar";

const NotificationsView = () => {
  const { isDark, isMobile, setCurrentView } = useApp();
  const {
    getTasksByFilter,
    getOptimalRescheduleDates,
    getTaskStats,
    toggleTaskComplete,
    rescheduleTask,
    intelligentRescheduleOverdue,
    bulkMarkLowPriorityComplete,
  } = useNotificationManager();

  const [activeFilter, setActiveFilter] = useState("intervention");
  const [expandedTask, setExpandedTask] = useState(null);
  const [showReschedule, setShowReschedule] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(0);

  const stats = getTaskStats();
  const suggestedDates = getOptimalRescheduleDates();

  // Get filtered tasks based on current filter
  const getFilteredTasks = () => {
    const today = new Date().toISOString().split("T")[0];

    switch (activeFilter) {
      case "intervention":
        const overdueTasks = getTasksByFilter("overdue");
        const todayTasks = getTasksByFilter("today");
        return [...overdueTasks, ...todayTasks].sort((a, b) => {
          if (a.date < today && b.date >= today) return -1;
          if (a.date >= today && b.date < today) return 1;

          const priorityOrder = { high: 3, medium: 2, low: 1 };
          const aPriority = priorityOrder[a.priority] || 2;
          const bPriority = priorityOrder[b.priority] || 2;
          if (aPriority !== bPriority) return bPriority - aPriority;

          return (a.estimatedTime || 60) - (b.estimatedTime || 60);
        });
      case "insights":
        return [];
      default:
        return getTasksByFilter(activeFilter);
    }
  };

  const filteredTasks = getFilteredTasks();

  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [stats.total, stats.overdue, stats.today]);

  const handleMarkComplete = async (taskId) => {
    await toggleTaskComplete(taskId);
    setExpandedTask(null);
    setTimeout(() => setForceUpdate((prev) => prev + 1), 0);
  };

  const handleReschedule = async (taskId, newDate) => {
    if (!newDate || typeof newDate !== "string") {
      console.error("Invalid date provided:", newDate);
      return;
    }

    const success = await rescheduleTask(taskId, newDate);
    if (success) {
      setShowReschedule(null);
      setExpandedTask(null);
      setTimeout(() => setForceUpdate((prev) => prev + 1), 10);
    }
  };

  const handleIntelligentReschedule = async () => {
    await intelligentRescheduleOverdue();
    setExpandedTask(null);
    setTimeout(() => setForceUpdate((prev) => prev + 1), 0);
  };

  return (
    <div className="flex-1 flex flex-col overflow-h-scroll scrollbar-thin">
      {/* Enhanced Header */}
      <div
        className={`relative ${
          isDark ? "bg-gray-900/50" : "bg-white/95"
        } backdrop-blur-xl border-b ${
          isDark ? "border-gray-700/30" : "border-gray-200/30"
        } flex-shrink-0`}
      >
        <div className="relative px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5">
          <div className="flex items-start gap-2 sm:gap-3">
            <button
              onClick={() => setCurrentView("calendar")}
              className={`flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                isDark
                  ? "bg-gray-800/60 hover:bg-gray-800/80 text-gray-300 border border-gray-700/50"
                  : "bg-white/60 hover:bg-white/80 text-gray-600 border border-gray-200/50"
              } backdrop-blur-sm shadow-lg`}
            >
              <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>

            <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
              <div
                className={`flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl shadow-lg ${ isDark
                    ? "bg-gray-800/80 border border-gray-700/50"
                    : "bg-white/80 border border-gray-200/50"
                }`}
              >
                <Bell className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
              </div>

              <div className="min-w-0 flex-1 pt-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <h1
                    className={`text-base sm:text-lg lg:text-xl font-bold ${
                      isDark ? "text-gray-100" : "text-gray-900"
                    } leading-tight`}
                  >
                    <span className="inline sm:hidden">Alerts</span>
                    <span className="hidden sm:inline lg:hidden">Task Alerts</span>
                    <span className="hidden lg:inline">Task Alert Center</span>
                  </h1>
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <span
                    className={`font-medium ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {activeFilter === "insights"
                      ? `${suggestedDates.length} AI suggestions`
                      : `${filteredTasks.length} task${
                          filteredTasks.length !== 1 ? "s" : ""
                        } need attention`}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-start gap-1.5 sm:gap-2 flex-shrink-0">
              {stats.overdue > 0 && (
                <button
                  onClick={handleIntelligentReschedule}
                  className={`group flex items-center justify-center gap-1.5 h-9 sm:h-10 lg:h-11 px-2 sm:px-3 lg:px-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg font-medium text-xs sm:text-sm ${
                    isDark
                      ? "bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white"
                      : "bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white"
                  }`}
                >
                  <RotateCcw
                    size={14}
                    className="sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-300"
                  />
                  <span className="hidden min-[380px]:inline">Smart</span>
                  <span className="hidden sm:inline">Fix</span>
                  <span className="flex items-center justify-center min-w-[16px] h-4 sm:min-w-[18px] sm:h-[18px] text-xs rounded-full font-semibold bg-white/20 text-white">
                    {stats.overdue}
                  </span>
                </button>
              )}

              <button
                onClick={bulkMarkLowPriorityComplete}
                className={`group flex items-center justify-center gap-1.5 h-9 sm:h-10 lg:h-11 px-2 sm:px-3 lg:px-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg font-medium text-xs sm:text-sm ${
                  isDark
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                }`}
              >
                <Check
                  size={14}
                  className="sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="hidden min-[380px]:inline">Clear</span>
                <span className="hidden sm:inline">Low</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        stats={stats}
        suggestedDates={suggestedDates}
        isDark={isDark}
        isMobile={isMobile}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {activeFilter === "insights" ? (
              <div className="p-3 sm:p-4 lg:p-6 pb-20 sm:pb-24">
                <AIInsightsSection 
                  suggestedDates={suggestedDates}
                  isDark={isDark}
                />
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 sm:p-12">
                <EmptyState 
                  activeFilter={activeFilter}
                  isDark={isDark}
                />
              </div>
            ) : (
              <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 pb-20 sm:pb-24">
                {filteredTasks.map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task}
                    expandedTask={expandedTask}
                    setExpandedTask={setExpandedTask}
                    setShowReschedule={setShowReschedule}
                    onMarkComplete={handleMarkComplete}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Sidebar */}
        {!isMobile && activeFilter !== "insights" && (
          <DesktopSidebar 
            stats={stats}
            suggestedDates={suggestedDates}
            isDark={isDark}
          />
        )}
      </div>

      {/* Reschedule Modal */}
      <RescheduleModal
        task={showReschedule}
        onClose={() => setShowReschedule(null)}
        onReschedule={handleReschedule}
        suggestedDates={suggestedDates}
        isDark={isDark}
        isMobile={isMobile}
      />

      <style>{`
        @media (min-width: 380px) {
          .min-\[380px\]\:inline {
            display: inline;
          }
        }

        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 2px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default NotificationsView;
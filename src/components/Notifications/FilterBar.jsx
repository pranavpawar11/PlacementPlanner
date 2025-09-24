// components/Notifications/FilterBar.jsx
import React from "react";
import { AlertTriangle, Clock, Target, Zap, Brain } from "lucide-react";

const FilterBar = ({ 
  activeFilter, 
  setActiveFilter, 
  stats, 
  suggestedDates, 
  isDark, 
  isMobile 
}) => {
  const filters = [
    {
      id: "intervention",
      label: "Critical",
      count: stats.overdue + stats.today,
      icon: AlertTriangle,
      iconColor: isDark ? "text-rose-300" : "text-rose-600",
      activeStyles: isDark 
        ? "bg-rose-900/40 text-rose-200 border-rose-800/50 shadow-lg shadow-rose-900/20" 
        : "bg-rose-50/90 text-rose-800 border-rose-200/80 shadow-md shadow-rose-200/50",
      description: "Tasks needing immediate attention",
    },
    {
      id: "overdue",
      label: "Overdue",
      count: stats.overdue,
      icon: Clock,
      iconColor: isDark ? "text-orange-300" : "text-orange-600",
      activeStyles: isDark 
        ? "bg-orange-900/40 text-orange-200 border-orange-800/50 shadow-lg shadow-orange-900/20" 
        : "bg-orange-50/90 text-orange-800 border-orange-200/80 shadow-md shadow-orange-200/50",
      description: "Past due tasks",
    },
    {
      id: "today",
      label: "Due Today",
      count: stats.today,
      icon: Target,
      iconColor: isDark ? "text-emerald-300" : "text-emerald-600",
      activeStyles: isDark 
        ? "bg-emerald-900/40 text-emerald-200 border-emerald-800/50 shadow-lg shadow-emerald-900/20" 
        : "bg-emerald-50/90 text-emerald-800 border-emerald-200/80 shadow-md shadow-emerald-200/50",
      description: "Tasks due today",
    },
    {
      id: "high",
      label: "Priority",
      count: stats.highPriority,
      icon: Zap,
      iconColor: isDark ? "text-amber-300" : "text-amber-600",
      activeStyles: isDark 
        ? "bg-amber-900/40 text-amber-200 border-amber-800/50 shadow-lg shadow-amber-900/20" 
        : "bg-amber-50/90 text-amber-800 border-amber-200/80 shadow-md shadow-amber-200/50",
      description: "High priority tasks",
    },
    {
      id: "insights",
      label: "AI Tips",
      count: Math.min(suggestedDates.length, 5),
      icon: Brain,
      iconColor: isDark ? "text-violet-300" : "text-violet-600",
      activeStyles: isDark 
        ? "bg-violet-900/40 text-violet-200 border-violet-800/50 shadow-lg shadow-violet-900/20" 
        : "bg-violet-50/90 text-violet-800 border-violet-200/80 shadow-md shadow-violet-200/50",
      description: "Smart scheduling recommendations",
    },
  ];

  const FilterButton = ({ filter, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`group relative flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] border ${
        isActive
          ? filter.activeStyles
          : isDark
          ? "bg-gray-800/50 hover:bg-gray-800/70 text-gray-300 border-gray-700/40 hover:border-gray-600/60"
          : "bg-white/70 hover:bg-white/90 text-gray-600 border-gray-200/50 hover:border-gray-300/70 shadow-sm hover:shadow-md"
      } backdrop-blur-sm overflow-hidden`}
    >
      <filter.icon
        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 z-10 ${
          isActive ? "" : filter.iconColor
        } transition-transform duration-300 ${isActive ? "scale-110" : ""}`}
      />

      {!isMobile && (
        <span className="text-xs sm:text-sm font-medium z-10">
          {filter.label}
        </span>
      )}

      <div
        className={`flex items-center justify-center min-w-[20px] h-5 sm:min-w-[24px] sm:h-6 text-xs font-bold rounded-full z-10 transition-all duration-300 ${
          isActive
            ? isDark
              ? "bg-white/15 text-current shadow-inner"
              : "bg-white/60 text-current shadow-inner"
            : isDark
            ? "bg-gray-700/60 text-gray-300"
            : "bg-gray-100/70 text-gray-600"
        }`}
      >
        {filter.count}
      </div>

      {/* Subtle active indicator */}
      {isActive && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-current opacity-60 rounded-full" />
        </>
      )}
    </button>
  );

  return (
    <div
      className={`${
        isDark ? "bg-gray-900/30" : "bg-gray-50/30"
      } backdrop-blur-xl border-b ${
        isDark ? "border-gray-700/30" : "border-gray-200/30"
      } px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex-shrink-0`}
    >
      <div
        className={`${
          isMobile
            ? "flex overflow-x-auto gap-2 sm:gap-3 pb-2"
            : "flex flex-wrap gap-2 sm:gap-3 justify-center"
        } scrollbar-none`}
      >
        {filters.map((filter) => (
          <div key={filter.id} className={isMobile ? "flex-shrink-0" : ""}>
            <FilterButton
              filter={filter}
              isActive={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            />
          </div>
        ))}
      </div>

      {/* Filter Description */}
      <div className="mt-2 px-2">
        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {filters.find((f) => f.id === activeFilter)?.description}
        </p>
      </div>
    </div>
  );
};

export default FilterBar;
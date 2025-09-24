// components/Notifications/DesktopSidebar.jsx
import React from "react";
import { Users, Clock3 } from "lucide-react";

const DesktopSidebar = ({ stats, suggestedDates, isDark }) => {
  const getWorkloadStyles = (workload) => {
    const styles = {
      light: isDark 
        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" 
        : "bg-emerald-50 text-emerald-600 border-emerald-200",
      medium: isDark 
        ? "bg-amber-500/15 text-amber-300 border-amber-500/25" 
        : "bg-amber-50 text-amber-600 border-amber-200",
      heavy: isDark 
        ? "bg-rose-500/15 text-rose-300 border-rose-500/25" 
        : "bg-rose-50 text-rose-600 border-rose-200",
    };
    return styles[workload] || styles.medium;
  };

  return (
    <div
      className={`w-80 ${
        isDark ? "bg-gray-900/30" : "bg-gray-50/30"
      } backdrop-blur-xl border-l ${
        isDark ? "border-gray-700/30" : "border-gray-200/30"
      } flex flex-col overflow-hidden`}
    >
      <div className="p-6">
        <div className="mb-6">
          <h4
            className={`text-lg font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Best Reschedule Days
          </h4>

          <div className="space-y-3 max-h-90 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
            {suggestedDates.slice(0, 5).map((suggestion, index) => (
              <div
                key={suggestion.date}
                className={`group p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] cursor-default ${
                  isDark
                    ? "border-gray-700/40 bg-gray-800/20 hover:bg-gray-800/40"
                    : "border-gray-200/50 bg-white/50 hover:bg-white/80"
                } backdrop-blur-sm`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        index === 0
                          ? isDark ? "bg-emerald-400" : "bg-emerald-500"
                          : index < 3
                          ? isDark ? "bg-sky-400" : "bg-sky-500"
                          : "bg-gray-400"
                      }`}
                    />
                    <p
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {suggestion.displayDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${getWorkloadStyles(
                        suggestion.workload
                      )}`}
                    >
                      {suggestion.workload}
                    </div>
                    {index === 0 && (
                      <div className={`px-2 py-1 text-xs rounded-full border font-semibold ${
                        isDark 
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-emerald-50 text-emerald-600 border-emerald-200"
                      }`}>
                        Best
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                      {suggestion.tasksCount} tasks
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock3 className="w-3 h-3 text-gray-400" />
                    <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                      {suggestion.totalHours}h total
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
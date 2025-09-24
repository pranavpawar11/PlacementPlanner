// components/Notifications/AIInsightsSection.jsx
import React from "react";
import { Brain, Users, Clock3 } from "lucide-react";

const AIInsightsSection = ({ suggestedDates, isDark }) => {
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
    <div className="space-y-4">
      {/* Header Section */}
      <div className={`border rounded-2xl p-6 mb-6 ${
        isDark 
          ? "bg-gradient-to-r from-violet-500/10 to-purple-500/10 border-violet-500/20" 
          : "bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200"
      }`}>
        <div className="flex items-center gap-3 mb-3">
          <Brain className={`w-6 h-6 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Smart Scheduling Insights
          </h3>
        </div>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          AI-powered recommendations based on your work patterns and task complexity
        </p>
      </div>

      {/* Suggestions Grid */}
      <div className="grid gap-4">
        {suggestedDates.slice(0, 5).map((suggestion, index) => (
          <div
            key={suggestion.date}
            className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
              isDark
                ? "border-gray-700/40 bg-gray-800/20 hover:bg-gray-800/40"
                : "border-gray-200/50 bg-white/50 hover:bg-white/80"
            } backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    index === 0
                      ? isDark ? "bg-emerald-400" : "bg-emerald-500"
                      : index < 2
                      ? isDark ? "bg-sky-400" : "bg-sky-500"
                      : "bg-gray-400"
                  }`}
                />
                <div>
                  <p
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {suggestion.displayDate}
                  </p>
                  <p className="text-xs text-gray-500">
                    Perfect for rescheduling
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`px-3 py-1 text-xs font-semibold rounded-full border ${getWorkloadStyles(
                    suggestion.workload
                  )}`}
                >
                  {suggestion.workload} day
                </div>
                {index === 0 && (
                  <div className={`px-2 py-1 text-xs rounded-full border font-semibold ${
                    isDark 
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "bg-emerald-50 text-emerald-600 border-emerald-200"
                  }`}>
                    Best Choice
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
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

              <span className={`font-medium ${
                isDark ? 'text-violet-400' : 'text-violet-600'
              }`}>
                {95 - index * 5}% confidence
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsightsSection;
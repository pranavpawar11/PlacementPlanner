// components/Notifications/RescheduleModal.jsx
import React from "react";
import { Calendar, X, Sparkles, Users, Clock3 } from "lucide-react";

const RescheduleModal = ({ 
  task, 
  onClose, 
  onReschedule, 
  suggestedDates, 
  isDark, 
  isMobile 
}) => {
  if (!task) return null;

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-4xl ${
          isDark ? "bg-gray-900/95" : "bg-white/95"
        } backdrop-blur-xl rounded-3xl shadow-2xl max-h-[85vh] overflow-hidden border ${
          isDark ? "border-gray-700/50" : "border-gray-200/50"
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 sm:p-6 border-b ${
            isDark ? "border-gray-700/50" : "border-gray-200/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${
                isDark
                  ? "bg-gradient-to-r from-sky-600 to-sky-700"
                  : "bg-gradient-to-r from-sky-500 to-sky-600"
              }`}>
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3
                  className={`text-xl sm:text-2xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Reschedule Task
                </h3>
                <p
                  className={`text-xs sm:text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  } mt-0.5`}
                >
                  Find the perfect time for "{task.title}"
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-105 ${
                isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-96">
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 ${
                isDark ? 'text-violet-400' : 'text-violet-500'
              }`} />
              <h4
                className={`text-lg sm:text-xl font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Smart Recommendations
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {suggestedDates.slice(0, 9).map((suggestion, index) => (
                <button
                  key={suggestion.date}
                  onClick={() => onReschedule(task.id, suggestion.date)}
                  className={`group p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden ${
                    isDark
                      ? "bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700/50"
                      : "bg-gray-50/80 hover:bg-white border border-gray-200/50"
                  } hover:shadow-xl`}
                >
                  <div
                    className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      index === 0
                        ? isDark ? "bg-emerald-400" : "bg-emerald-500"
                        : index < 3
                        ? isDark ? "bg-sky-400" : "bg-sky-500"
                        : "bg-gray-400"
                    }`}
                  />

                  <div className="mb-2 sm:mb-3">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <p
                        className={`font-semibold text-base sm:text-lg ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {suggestion.displayDate}
                      </p>
                      {index === 0 && (
                        <span className={`text-xs px-2 py-1 rounded-full border font-semibold ${
                          isDark 
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : "bg-emerald-50 text-emerald-600 border-emerald-200"
                        }`}>
                          Perfect
                        </span>
                      )}
                    </div>

                    <div
                      className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getWorkloadStyles(
                        suggestion.workload
                      )}`}
                    >
                      {suggestion.workload === "light" && <span className="mr-1">🟢</span>}
                      {suggestion.workload === "medium" && <span className="mr-1">🟡</span>}
                      {suggestion.workload === "heavy" && <span className="mr-1">🔴</span>}
                      {suggestion.workload} day
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                        {suggestion.tasksCount} tasks
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock3 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                        {suggestion.totalHours}h
                      </span>
                    </div>
                  </div>

                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDark 
                      ? "bg-gradient-to-r from-sky-500/5 to-violet-500/5"
                      : "bg-gradient-to-r from-sky-50/50 to-violet-50/50"
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Date Selection */}
          <div
            className={`border-t ${
              isDark ? "border-gray-700/50" : "border-gray-200/50"
            } pt-4 sm:pt-6`}
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Calendar className={`w-4 h-4 sm:w-5 sm:h-5 ${
                isDark ? 'text-sky-400' : 'text-sky-500'
              }`} />
              <h4
                className={`text-base sm:text-lg font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Choose Custom Date
              </h4>
            </div>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                if (e.target.value) {
                  onReschedule(task.id, e.target.value);
                }
              }}
              className={`w-full max-w-xs p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 focus:scale-[1.02] ${
                isDark
                  ? "bg-gray-800/50 border-gray-700/50 text-white focus:border-sky-400 focus:bg-gray-800/80"
                  : "bg-white/80 border-gray-300/50 text-gray-900 focus:border-sky-500 focus:bg-white"
              } focus:outline-none focus:ring-4 ${
                isDark ? 'focus:ring-sky-500/10' : 'focus:ring-sky-500/10'
              } backdrop-blur-sm`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;
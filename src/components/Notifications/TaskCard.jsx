// components/Notifications/TaskCard.jsx
import React from "react";
import { Calendar, CheckCircle2, ChevronRight, Flame } from "lucide-react";

const TaskCard = ({ 
  task, 
  expandedTask, 
  setExpandedTask, 
  setShowReschedule, 
  onMarkComplete, 
  isDark 
}) => {
  const today = new Date().toISOString().split("T")[0];
  const isOverdue = task.date < today;

  const getPriorityStyles = (priority) => {
    const styles = {
      high: isDark 
        ? "bg-rose-900/20 text-rose-200 border-rose-800/30" 
        : "bg-rose-50/80 text-rose-700 border-rose-200/40",
      medium: isDark 
        ? "bg-amber-900/20 text-amber-200 border-amber-800/30" 
        : "bg-amber-50/80 text-amber-700 border-amber-200/40",
      low: isDark 
        ? "bg-emerald-900/20 text-emerald-200 border-emerald-800/30" 
        : "bg-emerald-50/80 text-emerald-700 border-emerald-200/40",
    };
    return styles[priority] || styles.medium;
  };

  const getTaskRiskLevel = (task) => {
    const today = new Date().toISOString().split("T")[0];
    if (task.date < today) {
      const daysOverdue = Math.floor(
        (new Date(today) - new Date(task.date)) / (1000 * 60 * 60 * 24)
      );
      if (daysOverdue >= 3) return "critical";
      if (daysOverdue >= 1) return "high";
    }
    if (task.priority === "high") return "medium";
    return "low";
  };

  const riskLevel = getTaskRiskLevel(task);

  return (
    <div
      className={`group ${
        isDark
          ? "bg-gray-800/40 hover:bg-gray-800/60"
          : "bg-white/60 hover:bg-white/90"
      } rounded-2xl border ${
        isDark ? "border-gray-700/30" : "border-gray-200/30"
      } transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] backdrop-blur-xl overflow-hidden`}
    >
      <div className="p-4 sm:p-6">
        {/* Risk/Priority Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {isOverdue && (
              <div className={`px-2 py-1 text-xs font-bold rounded-full ${
                isDark 
                  ? "bg-rose-900/30 text-rose-300 border border-rose-800/40"
                  : "bg-rose-100/80 text-rose-800 border border-rose-200/60"
              }`}>
                OVERDUE
              </div>
            )}
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full border ${getPriorityStyles(
                task.priority
              )}`}
            >
              {(task.priority || "medium").toUpperCase()}
            </span>
          </div>
          {riskLevel === "critical" && (
            <div className="flex items-center gap-1">
              <Flame className={`w-4 h-4 ${isDark ? 'text-rose-300' : 'text-rose-600'}`} />
              <span className={`text-xs font-semibold ${isDark ? 'text-rose-300' : 'text-rose-600'}`}>
                CRITICAL
              </span>
            </div>
          )}
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl">{task.categoryIcon}</div>
              <div className="flex-1 min-w-0">
                <h4
                  className={`text-lg font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  } mb-1 line-clamp-2`}
                >
                  {task.title}
                </h4>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {task.categoryName}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span
                    className={`${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    ~{task.estimatedTime ? Math.ceil(task.estimatedTime / 60) : 1}h
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span
                  className={`text-xs font-medium ${
                    isOverdue
                      ? isDark ? "text-rose-300" : "text-rose-600"
                      : isDark
                      ? "text-gray-300"
                      : "text-gray-700"
                  }`}
                >
                  Due{" "}
                  {new Date(task.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Action buttons with subtle colors */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onMarkComplete(task.id)}
                className={`group px-3 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-1.5 text-sm ${
                  isDark
                    ? "bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-200 border border-emerald-800/40 hover:border-emerald-700/60"
                    : "bg-emerald-50/80 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200/60 hover:border-emerald-300/80 hover:shadow-md"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Complete</span>
              </button>

              <button
                onClick={() => setShowReschedule(task)}
                className={`group px-3 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-1.5 text-sm ${
                  isDark
                    ? "bg-sky-900/30 hover:bg-sky-900/50 text-sky-200 border border-sky-800/40 hover:border-sky-700/60"
                    : "bg-sky-50/80 hover:bg-sky-100/80 text-sky-800 border border-sky-200/60 hover:border-sky-300/80 hover:shadow-md"
                }`}
              >
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Reschedule</span>
              </button>

              {task.description && (
                <button
                  onClick={() =>
                    setExpandedTask(expandedTask === task.id ? null : task.id)
                  }
                  className={`px-3 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-1.5 text-sm ${
                    isDark
                      ? "bg-gray-700/40 hover:bg-gray-700/60 text-gray-300 border border-gray-600/40"
                      : "bg-gray-100/70 hover:bg-gray-200/70 text-gray-700 border border-gray-200/60 hover:shadow-sm"
                  }`}
                >
                  <span>Details</span>
                  <ChevronRight
                    className={`w-3 h-3 transition-transform duration-300 ${
                      expandedTask === task.id ? "rotate-90" : ""
                    }`}
                  />
                </button>
              )}
            </div>

            {/* Expandable details section */}
            {expandedTask === task.id && task.description && (
              <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
                <div
                  className={`p-4 rounded-xl ${
                    isDark ? "bg-gray-700/30" : "bg-gray-50/80"
                  } backdrop-blur-sm`}
                >
                  <p
                    className={`leading-relaxed text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {task.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
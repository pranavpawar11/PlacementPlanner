// components/Notifications/EmptyState.jsx
import React from "react";
import { CheckCircle } from "lucide-react";

const EmptyState = ({ activeFilter, isDark }) => {
  const filterLabels = {
    intervention: "critical",
    overdue: "overdue",
    today: "due today",
    high: "high priority",
    insights: "AI insights"
  };

  return (
    <>
      <div className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 ${
        isDark 
          ? "bg-gradient-to-br from-emerald-400/10 to-teal-400/10" 
          : "bg-gradient-to-br from-emerald-50 to-teal-50"
      }`}>
        <CheckCircle className={`w-16 h-16 sm:w-20 sm:h-20 ${
          isDark ? 'text-emerald-400' : 'text-emerald-500'
        }`} />
      </div>
      <h3
        className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {activeFilter === "intervention" ? "All Under Control!" : "Nothing Here!"}
      </h3>
      <p
        className={`text-center text-sm sm:text-base ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {activeFilter === "intervention"
          ? "No critical tasks need immediate attention."
          : `No ${filterLabels[activeFilter] || "tasks"} found.`}
        <br />
        You're staying organized like a pro!
      </p>
    </>
  );
};

export default EmptyState;
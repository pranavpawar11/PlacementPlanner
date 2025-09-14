// Empty Resources State
import React from "react";
import { BookOpen } from "lucide-react";
const EmptyResourcesState = ({ isDark }) => (
  <div className={`p-8 rounded-2xl text-center border ${
    isDark ? 'bg-gray-800/40 border-gray-700/40' : 'bg-white/60 border-gray-200/40'
  } backdrop-blur-sm`}>
    <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
      isDark ? 'bg-gray-700/50' : 'bg-gray-100/80'
    }`}>
      <BookOpen className={`w-10 h-10 ${
        isDark ? 'text-gray-400' : 'text-gray-500'
      }`} />
    </div>
    <h3 className={`text-lg font-semibold mb-3 ${
      isDark ? 'text-gray-200' : 'text-gray-800'
    }`}>
      No Resources Yet
    </h3>
    <p className={`text-sm max-w-sm mx-auto ${
      isDark ? 'text-gray-400' : 'text-gray-600'
    }`}>
      Add learning resources to your tasks to see them organized here by type.
    </p>
  </div>
);

export default EmptyResourcesState;
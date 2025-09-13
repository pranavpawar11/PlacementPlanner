// Empty Resources State
import React from "react";
import { BookOpen } from "lucide-react";
const EmptyResourcesState = ({ isDark }) => (
  <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
    <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/30' : 'bg-gray-100/30'} mb-4 inline-block`}>
      <BookOpen size={40} className="opacity-50" />
    </div>
    <h4 className={`text-base font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
      No resources yet
    </h4>
    <p className="text-sm max-w-xs mx-auto leading-relaxed">
      Add learning materials to your tasks to build your personal study library
    </p>
  </div>
);

export default EmptyResourcesState;
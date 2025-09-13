import React from 'react';
import { Plus, Calendar } from 'lucide-react';

const EmptyState = ({ onAddTask, isDark }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6">
    <div className={`relative p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'} mb-8 backdrop-blur-sm border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} group hover:scale-105 transition-transform duration-300`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
      <Calendar className={`${isDark ? 'text-gray-400' : 'text-gray-500'} group-hover:scale-110 transition-transform duration-300`} size={64} />
    </div>
    
    <div className="text-center max-w-md">
      <h3 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-4 leading-tight`}>
        Ready to start your day?
      </h3>
      <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8 leading-relaxed`}>
        Break down your goals into actionable tasks and make every moment count. Your productivity journey begins here.
      </p>
      
      <button
        onClick={onAddTask}
        className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 font-semibold text-sm sm:text-base"
      >
        <Plus size={20} className="inline mr-2 group-hover:rotate-90 transition-transform duration-300" />
        Create Your First Task
      </button>
    </div>
    
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
      <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/30 border border-gray-700/50' : 'bg-white/30 border border-gray-200/50'} text-center backdrop-blur-sm`}>
        <div className="text-2xl mb-2">📝</div>
        <h4 className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
          Organize Tasks
        </h4>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Break down goals into manageable steps
        </p>
      </div>
      
      <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/30 border border-gray-700/50' : 'bg-white/30 border border-gray-200/50'} text-center backdrop-blur-sm`}>
        <div className="text-2xl mb-2">⏱️</div>
        <h4 className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
          Track Time
        </h4>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Estimate and monitor your progress
        </p>
      </div>
      
      <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/30 border border-gray-700/50' : 'bg-white/30 border border-gray-200/50'} text-center backdrop-blur-sm`}>
        <div className="text-2xl mb-2">🎯</div>
        <h4 className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
          Stay Focused
        </h4>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Prioritize what matters most
        </p>
      </div>
    </div>
  </div>
);

export default EmptyState;
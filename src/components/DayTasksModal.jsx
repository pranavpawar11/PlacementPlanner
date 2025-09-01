import React, { useEffect } from 'react';
import { X, Plus, Calendar, TrendingUp } from 'lucide-react';
import TaskCard from './TaskCard';
import { dateUtils } from '../utils/dateUtils';

const DayTasksModal = ({ 
  isOpen, 
  onClose, 
  day, 
  onAddTask, 
  onEditTask, 
  onDeleteTask, 
  onToggleTask, 
  isDark 
}) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !day) return null;

  const formattedDate = new Date(day.dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Use current day.tasks (which gets updated from parent)
  const completedTasks = day.tasks.filter(task => task.completed).length;
  const totalTasks = day.tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className={`${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} flex flex-col animate-in fade-in-0 zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} flex-shrink-0`}>
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${
              day.isToday 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                : isDark 
                ? 'bg-gray-800' 
                : 'bg-gray-100'
            }`}>
              <Calendar className={`${
                day.isToday 
                  ? 'text-white' 
                  : isDark 
                  ? 'text-gray-300' 
                  : 'text-gray-600'
              }`} size={24} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                {formattedDate}
              </h2>
              <div className="flex items-center space-x-4 mt-1">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}
                </p>
                {day.isToday && (
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full shadow-lg">
                    Today
                  </span>
                )}
                {totalTasks > 0 && (
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={14} className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${
                      completionPercentage === 100 
                        ? 'text-green-500' 
                        : completionPercentage >= 50 
                        ? 'text-yellow-500' 
                        : isDark 
                        ? 'text-gray-400' 
                        : 'text-gray-600'
                    }`}>
                      {completionPercentage}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onAddTask(day.dateString)}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              title="Add new task"
            >
              <Plus size={18} />
            </button>
            <button
              onClick={onClose}
              className={`p-3 rounded-xl hover:bg-gray-100 ${isDark ? 'hover:bg-gray-800 text-gray-300' : 'text-gray-500'} transition-all hover:scale-105`}
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {totalTasks > 0 && (
          <div className={`px-6 py-3 border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} flex-shrink-0`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Progress
              </span>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {completedTasks} of {totalTasks} completed
              </span>
            </div>
            <div className={`w-full h-3 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
              <div
                className={`h-full transition-all duration-500 ease-out ${
                  completionPercentage === 100 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600'
                }`}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="flex-1 overflow-y-auto p-6">
          {totalTasks === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'} mb-6 backdrop-blur-sm`}>
                <Calendar className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`} size={48} />
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                No tasks scheduled
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} text-center mb-6 max-w-sm`}>
                Start organizing your day by adding your first task. Stay productive and achieve your goals!
              </p>
              <button
                onClick={() => onAddTask(day.dateString)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 font-medium"
              >
                Create First Task
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {day.tasks
                .sort((a, b) => {
                  // Sort: incomplete tasks first, then by creation order
                  if (a.completed !== b.completed) {
                    return a.completed ? 1 : -1;
                  }
                  return 0;
                })
                .map((task, index) => (
                  <div key={`${task.id}-${task.completed}-${index}`} className="animate-in fade-in-0 slide-in-from-left-2 duration-200">
                    <TaskCard
                      task={task}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                      onToggle={onToggleTask}
                      isDark={isDark}
                      compact={false}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {totalTasks > 0 && (
          <div className={`px-6 py-4 border-t ${isDark ? 'border-gray-700/50 bg-gray-900/50' : 'border-gray-200/50 bg-gray-50/50'} backdrop-blur-sm flex-shrink-0 rounded-b-2xl`}>
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
                  <span className="font-medium">{completedTasks} completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                  <span className="font-medium">{totalTasks - completedTasks} remaining</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  completionPercentage === 100 
                    ? 'text-green-500' 
                    : completionPercentage >= 75 
                    ? 'text-blue-500' 
                    : completionPercentage >= 50 
                    ? 'text-yellow-500' 
                    : isDark 
                    ? 'text-gray-400' 
                    : 'text-gray-600'
                }`}>
                  {completionPercentage}%
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Complete
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayTasksModal;
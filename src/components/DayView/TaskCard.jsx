import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Edit2,
  Trash2,
  ExternalLink
} from 'lucide-react';

const TaskCard = ({ 
  task, 
  onEdit, 
  onDelete, 
  onToggle, 
  isDark, 
  isExpanded, 
  onToggleExpand, 
  index, 
  isMobile 
}) => {
  const [showActions, setShowActions] = useState(false);

  // Close actions menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowActions(false);
    if (showActions) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showActions]);

  const getPriorityConfig = (priority) => {
    const configs = {
      high: {
        color: isDark ? 'text-red-400' : 'text-red-600',
        bg: isDark ? 'bg-red-500/10' : 'bg-red-50',
        border: isDark ? 'border-red-500/30' : 'border-red-200',
        shadow: 'shadow-red-500/20'
      },
      medium: {
        color: isDark ? 'text-yellow-400' : 'text-yellow-600',
        bg: isDark ? 'bg-yellow-500/10' : 'bg-yellow-50',
        border: isDark ? 'border-yellow-500/30' : 'border-yellow-200',
        shadow: 'shadow-yellow-500/20'
      },
      low: {
        color: isDark ? 'text-green-400' : 'text-green-600',
        bg: isDark ? 'bg-green-500/10' : 'bg-green-50',
        border: isDark ? 'border-green-500/30' : 'border-green-200',
        shadow: 'shadow-green-500/20'
      }
    };
    return configs[priority] || configs.low;
  };

  const priorityConfig = getPriorityConfig(task.priority);
  const hasResources = task.resources && task.resources.length > 0;

  const formatTime = (minutes) => {
    if (!minutes) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  return (
    <div 
      className={`group relative transition-all duration-300 hover:scale-[1.01] ${
        task.completed ? 'opacity-75' : ''
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className={`relative p-4 sm:p-5 lg:p-6 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
        task.completed 
          ? isDark 
            ? 'bg-gray-800/40 border-gray-700/40 hover:bg-gray-800/60' 
            : 'bg-gray-50/60 border-gray-200/60 hover:bg-gray-50/80'
          : isDark 
            ? 'bg-gray-800/80 border-gray-600/50 hover:bg-gray-800/90 hover:border-gray-600/70' 
            : 'bg-white/80 border-gray-200/60 hover:bg-white/90 hover:border-gray-300/70'
      } hover:shadow-xl ${task.priority === 'high' ? priorityConfig.shadow : 'shadow-lg'}`}>
        
        {/* Priority Indicator */}
        {task.priority === 'high' && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-t-2xl" />
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            {/* Enhanced Checkbox */}
            <button
              onClick={() => onToggle(task.id)}
              className={`relative mt-1 p-1.5 rounded-full transition-all duration-200 hover:scale-110 flex-shrink-0 ${
                task.completed 
                  ? 'text-green-500 bg-green-500/10' 
                  : isDark 
                    ? 'text-gray-400 hover:text-green-400 hover:bg-green-500/10' 
                    : 'text-gray-400 hover:text-green-500 hover:bg-green-50'
              }`}
            >
              {task.completed ? (
                <CheckCircle2 size={20} className="drop-shadow-sm" />
              ) : (
                <Circle size={20} />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              {/* Task Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className={`font-semibold text-base sm:text-lg leading-tight ${
                      task.completed 
                        ? isDark ? 'text-gray-500 line-through' : 'text-gray-500 line-through'
                        : isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h3>
                    
                    {task.priority && (
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${priorityConfig.color} ${priorityConfig.bg} ${priorityConfig.border} uppercase tracking-wide flex-shrink-0`}>
                        {task.priority}
                      </span>
                    )}
                  </div>
                  
                  {task.description && (
                    <p className={`text-sm leading-relaxed mb-3 ${
                      task.completed 
                        ? isDark ? 'text-gray-500' : 'text-gray-500'
                        : isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Enhanced Meta Information */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${
                  isDark ? 'bg-gray-700/50 border border-gray-600/30' : 'bg-gray-100/80 border border-gray-200/50'
                } backdrop-blur-sm`}>
                  <span className="text-base">{task.categoryIcon}</span>
                  <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {task.categoryName}
                  </span>
                </div>
                
                {task.estimatedTime && (
                  <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg ${
                    isDark ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400' : 'bg-purple-50 border border-purple-200 text-purple-600'
                  }`}>
                    <Clock size={12} />
                    <span className="text-xs font-medium">
                      {formatTime(task.estimatedTime)}
                    </span>
                  </div>
                )}

                {hasResources && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleExpand();
                    }}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                      isExpanded
                        ? isDark ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-600'
                        : isDark ? 'bg-gray-700/50 border border-gray-600/30 text-gray-400 hover:bg-blue-500/10 hover:text-blue-400' : 'bg-gray-100/80 border border-gray-200/50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <BookOpen size={12} />
                    <span className="text-xs font-medium">
                      {task.resources.length}
                    </span>
                    {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </button>
                )}
              </div>

              {/* Tags */}
              {task.tags && task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {task.tags.map((tag, idx) => (
                    <span key={idx} className={`px-2 py-1 text-xs font-medium rounded-full ${
                      isDark ? 'bg-gray-700/60 text-gray-300 border border-gray-600/30' : 'bg-gray-100/80 text-gray-600 border border-gray-200/50'
                    } backdrop-blur-sm`}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Expanded Resources */}
              {isExpanded && hasResources && (
                <div className={`mt-4 p-4 rounded-xl border transition-all duration-300 ${
                  isDark ? 'bg-gray-700/30 border-gray-600/30' : 'bg-gray-50/80 border-gray-200/50'
                } backdrop-blur-sm`}>
                  <h4 className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-3 flex items-center`}>
                    <BookOpen size={14} className="mr-2" />
                    Learning Resources
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {task.resources.map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                          isDark ? 'bg-gray-800/60 hover:bg-gray-800/80 border border-gray-600/30' : 'bg-white/80 hover:bg-white border border-gray-200/50'
                        } backdrop-blur-sm hover:shadow-md`}
                      >
                        <span className="text-base flex-shrink-0">{resource.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'} truncate`}>
                            {resource.title}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} capitalize`}>
                            {resource.type.replace('-', ' ')}
                          </div>
                        </div>
                        <ExternalLink size={12} className={`${isDark ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'} transition-colors flex-shrink-0`} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Action Menu */}
          <div className="relative flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
              }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                showActions
                  ? isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
                  : isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
              } opacity-0 group-hover:opacity-100 hover:scale-110`}
            >
              <MoreVertical size={16} />
            </button>

            {showActions && (
              <div 
                className={`absolute right-0 top-full mt-2 w-48 rounded-xl shadow-xl border backdrop-blur-xl z-50 ${
                  isDark ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50'
                } animate-in fade-in-0 slide-in-from-top-2 duration-200`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(task);
                      setShowActions(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isDark ? 'text-gray-300 hover:bg-gray-700/60 hover:text-blue-400' : 'text-gray-700 hover:bg-gray-100/80 hover:text-blue-600'
                    }`}
                  >
                    <Edit2 size={14} />
                    <span className="font-medium">Edit Task</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(task.id);
                      setShowActions(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isDark ? 'text-gray-300 hover:bg-red-500/10 hover:text-red-400' : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    <Trash2 size={14} />
                    <span className="font-medium">Delete Task</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Completion Overlay */}
        {task.completed && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-2xl pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default TaskCard;
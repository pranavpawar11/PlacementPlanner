import React, { useState } from 'react';
import { Check, Edit, Trash2, MoreHorizontal, Calendar, Clock, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onToggle, isDark, compact = false, hideDate = false }) => {
  const [showActions, setShowActions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleTaskClick = (e) => {
    e.stopPropagation();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTaskStatus = () => {
    const taskDate = new Date(task.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);
    
    if (task.completed) return 'completed';
    if (taskDate < today) return 'overdue';
    if (taskDate.getTime() === today.getTime()) return 'today';
    return 'upcoming';
  };

  const status = getTaskStatus();

  const getCardStyle = () => {
    if (task.completed) {
      return {
        border: isDark ? 'border-l-green-400 bg-green-900/20 border-gray-700/50' : 'border-l-green-400 bg-green-50/70 border-gray-200',
        opacity: 'opacity-90'
      };
    }
    
    switch (status) {
      case 'overdue':
        return {
          border: isDark ? 'border-l-red-400 bg-red-900/20 border-gray-600/50' : 'border-l-red-400 bg-red-50/70 border-gray-200',
          opacity: 'opacity-100'
        };
      case 'today':
        return {
          border: isDark ? 'border-l-yellow-400 bg-yellow-900/20 border-gray-600/50' : 'border-l-yellow-400 bg-yellow-50/70 border-gray-200',
          opacity: 'opacity-100'
        };
      default:
        return {
          border: isDark ? 'border-l-blue-400 bg-gray-800/60 border-gray-600/50' : 'border-l-blue-400 bg-white/90 border-gray-200',
          opacity: 'opacity-100'
        };
    }
  };

  const getStatusIcon = () => {
    if (task.completed) return null;
    
    switch (status) {
      case 'overdue':
        return <AlertCircle size={compact ? 8 : 10} className="text-red-500" />;
      case 'today':
        return <Clock size={compact ? 8 : 10} className="text-yellow-600" />;
      default:
        return <Calendar size={compact ? 8 : 10} className={isDark ? 'text-gray-400' : 'text-gray-500'} />;
    }
  };

  const cardStyle = getCardStyle();

  // Enhanced compact mode with better spacing and typography
  if (compact) {
    return (
      <div 
        className={`group px-2 py-1.5 rounded-md border-l-2 transition-all duration-200 hover:shadow-sm cursor-pointer ${
          cardStyle.border
        } ${cardStyle.opacity} backdrop-blur-sm relative`}
        onClick={handleTaskClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowActions(false);
        }}
      >
        <div className="flex items-center gap-2">
          {/* Completion Toggle - Smaller for compact view */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(task.id);
            }}
            className={`flex-shrink-0 w-3 h-3 rounded-full transition-all duration-200 hover:scale-110 ${
              task.completed 
                ? 'bg-green-500 text-white shadow-sm flex items-center justify-center' 
                : `border ${
                    status === 'overdue' ? 'border-red-400 hover:border-red-500 hover:bg-red-500/10' :
                    status === 'today' ? 'border-yellow-400 hover:border-yellow-500 hover:bg-yellow-500/10' :
                    isDark ? 'border-gray-400 hover:border-green-400 hover:bg-green-500/10' : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                  }`
            }`}
            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed && <Check size={8} />}
          </button>
          
          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className={`text-xs font-medium leading-tight truncate ${
                task.completed ? 'line-through opacity-70' : ''
              } ${isDark ? 'text-gray-200' : 'text-gray-800'} max-w-[120px] lg:max-w-[150px]`}>
                {task.title}
              </h4>
              
              {/* Actions Menu */}
              <div className="relative ml-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowActions(!showActions);
                  }}
                  className={`p-1 rounded transition-all duration-200 ${
                    showActions || isHovered ? 'opacity-100' : 'opacity-0'
                  } ${
                    isDark 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100/80'
                  }`}
                  title="Options"
                >
                  <MoreHorizontal size={10} />
                </button>
                
                {/* Dropdown Menu */}
                {showActions && (
                  <div className={`absolute right-0 top-full mt-1 z-30 rounded-lg shadow-xl border min-w-[100px] ${
                    isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
                  } backdrop-blur-sm overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(task);
                        setShowActions(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center gap-2 transition-colors ${
                        isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Edit size={10} />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task.id);
                        setShowActions(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center gap-2 transition-colors text-red-500 ${
                        isDark ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
                      }`}
                    >
                      <Trash2 size={10} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Metadata Row */}
            <div className="flex items-center justify-between mt-0.5">
              <div className="flex items-center gap-1.5 text-xs min-w-0">
                {/* Category indicator */}
                {task.categoryName && (
                  <div className="flex items-center gap-1 min-w-0 max-w-[60px] lg:max-w-[80px]">
                    <div className={`w-1 h-1 rounded-full ${task.categoryColor} flex-shrink-0`}></div>
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} truncate text-[10px]`}>
                      {task.categoryName}
                    </span>
                  </div>
                )}
                
                {/* Date and status for non-hidden dates */}
                {!hideDate && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {getStatusIcon()}
                    <span className={`text-[10px] ${
                      status === 'overdue' ? 'text-red-500 font-medium' :
                      status === 'today' ? 'text-yellow-600 font-medium' :
                      task.completed ? 'text-green-500' :
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {status === 'today' ? 'Today' : formatDate(task.date)}
                    </span>
                  </div>
                )}
              </div>

              {/* Priority indicator for overdue tasks */}
              {status === 'overdue' && !task.completed && (
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
              )}
            </div>
          </div>
        </div>

        {/* Completion celebration effect */}
        {/* {task.completed && (
          <div className="absolute -top-1 -right-1 text-green-500 animate-bounce pointer-events-none">
            <div className="text-[8px]">✨</div>
          </div>
        )} */}
      </div>
    );
  }

  // Full card view for non-compact mode
  return (
    <div 
      className={`p-3 rounded-lg border-l-4 border transition-all duration-200 hover:shadow-md group cursor-pointer ${
        cardStyle.border
      } ${cardStyle.opacity} backdrop-blur-sm relative`}
      onClick={handleTaskClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowActions(false);
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            {/* Completion Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle(task.id);
              }}
              className={`mt-0.5 p-0.5 rounded-full transition-all duration-200 hover:scale-110 flex-shrink-0 ${
                task.completed 
                  ? 'bg-green-500 text-white shadow-sm' 
                  : `border-2 ${
                      status === 'overdue' ? 'border-red-400 hover:border-red-500 hover:bg-red-50' :
                      status === 'today' ? 'border-yellow-400 hover:border-yellow-500 hover:bg-yellow-50' :
                      isDark ? 'border-gray-400 hover:border-green-400 hover:bg-green-500/10' : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                    }`
              }`}
              title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.completed ? (
                <Check size={10} />
              ) : (
                <div className="w-2.5 h-2.5" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              {/* Task Title */}
              <h4 className={`text-sm font-medium leading-tight ${
                task.completed ? 'line-through opacity-70' : ''
              } ${isDark ? 'text-gray-200' : 'text-gray-800'} break-words`}>
                {task.title}
              </h4>
              
              {/* Task Metadata */}
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2 text-xs min-w-0">
                  {/* Category */}
                  {task.categoryName && (
                    <div className="flex items-center gap-1 min-w-0">
                      <div className={`w-1.5 h-1.5 rounded-full ${task.categoryColor} flex-shrink-0`}></div>
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} truncate max-w-20`}>
                        {task.categoryName}
                      </span>
                    </div>
                  )}
                  
                  {/* Date and Status */}
                  {!hideDate && (
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {getStatusIcon()}
                      <span className={`text-xs ${
                        status === 'overdue' ? 'text-red-500 font-medium' :
                        status === 'today' ? 'text-yellow-600 font-medium' :
                        task.completed ? 'text-green-500' :
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {status === 'today' ? 'Today' : formatDate(task.date)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Priority indicator for overdue tasks */}
                {status === 'overdue' && !task.completed && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Full view */}
        <div className={`flex items-center space-x-1 transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className={`p-1.5 rounded-md transition-all duration-200 hover:scale-110 ${
              isDark 
                ? 'text-gray-400 hover:text-blue-400 hover:bg-blue-500/10' 
                : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
            }`}
            title="Edit task"
          >
            <Edit size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className={`p-1.5 rounded-md transition-all duration-200 hover:scale-110 ${
              isDark 
                ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/10' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            title="Delete task"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* Completion celebration effect */}
      {/* {task.completed && (
        <div className="absolute top-1 right-1 text-green-500 animate-bounce pointer-events-none">
          <div className="text-xs">✨</div>
        </div>
      )} */}
    </div>
  );
};

export default TaskCard;
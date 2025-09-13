import React from 'react';
import { Plus, Eye } from 'lucide-react';
import TaskCard from '../TaskCard';

const CalendarCell = ({
  day,
  isDark,
  layout,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleTask,
  onViewDay
}) => {
  const hasOverflow = day.tasks.length > layout.maxVisibleTasks;
  const visibleTasks = day.tasks.slice(0, layout.maxVisibleTasks);
  const hiddenTasksCount = day.tasks.length - layout.maxVisibleTasks;

  return (
    <div
      className={`p-2 lg:p-3 border rounded-lg lg:rounded-xl transition-all duration-200 hover:shadow-lg group relative overflow-hidden ${
        day.isToday 
          ? `${isDark ? 'bg-blue-900/30 border-blue-400 shadow-lg' : 'bg-blue-50 border-blue-400 shadow-lg'} border-2`
          : day.isPast
          ? `${isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50/80 border-gray-300'}`
          : `${isDark ? 'bg-gray-800/50 border-gray-600 hover:bg-gray-800/70' : 'bg-white/70 border-gray-200 hover:bg-white/90'}`
      } backdrop-blur-sm`}
      style={{ minHeight: `${layout.cellHeight}px` }}
    >
      {/* Day Header */}
      <div className="flex items-center justify-between mb-2 lg:mb-3">
        <div className="flex items-center space-x-1 lg:space-x-2">
          <span className={`text-sm lg:text-base font-semibold ${
            day.isToday 
              ? 'text-blue-600' 
              : day.isPast 
              ? `${isDark ? 'text-gray-500' : 'text-gray-400'}` 
              : `${isDark ? 'text-gray-200' : 'text-gray-700'}`
          }`}>
            {day.day}
          </span>
          {day.isToday && (
            <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-blue-500 rounded-full animate-pulse" />
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          {/* Add Task Button */}
          <button
            onClick={() => onAddTask(day.dateString)}
            className={`p-1 lg:p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 ${
              isDark ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/10' : 'text-blue-500 hover:text-blue-600 hover:bg-blue-50'
            }`}
            title="Add task"
          >
            <Plus size={12} />
          </button>

          {/* View Day Button */}
          {day.tasks.length > 0 && (
            <button
              onClick={() => onViewDay(day)}
              className={`p-1 lg:p-1.5 rounded-md transition-all duration-200 hover:scale-110 ${
                hasOverflow 
                  ? 'opacity-100' 
                  : 'opacity-0 group-hover:opacity-100'
              } ${
                isDark ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-500/10' : 'text-purple-500 hover:text-purple-600 hover:bg-purple-50'
              }`}
              title="View day details"
            >
              <Eye size={12} />
            </button>
          )}

          {/* Task Count Badge */}
          {day.tasks.length > 0 && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
              day.isToday 
                ? 'bg-blue-500 text-white' 
                : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
            }`}>
              {day.tasks.length}
            </span>
          )}
        </div>
      </div>
      
      {/* Tasks Container */}
      <div className="space-y-1">
        {day.tasks.length > 0 ? (
          <>
            {/* Show visible tasks */}
            {visibleTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onToggle={onToggleTask}
                isDark={isDark}
                compact={true}
                hideDate={true}
              />
            ))}
            
            {/* Overflow indicator */}
            {hasOverflow && (
              <button
                onClick={() => onViewDay(day)}
                className={`w-full text-xs text-center py-2 px-2 rounded-lg transition-all duration-200 font-medium border border-dashed ${
                  isDark 
                    ? 'text-purple-400 hover:text-purple-300 border-purple-400/30 hover:bg-purple-500/10 bg-gray-800/30' 
                    : 'text-purple-500 hover:text-purple-600 border-purple-300/50 hover:bg-purple-50 bg-gray-50/30'
                }`}
              >
                <div className="flex items-center justify-center space-x-1">
                  <Eye size={10} />
                  <span>View all {day.tasks.length}</span>
                </div>
              </button>
            )}
          </>
        ) : (
          /* Quick Add Overlay for Empty Days */
          <div 
            className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg cursor-pointer ${
              isDark ? 'bg-gray-800/20 hover:bg-gray-800/40' : 'bg-white/20 hover:bg-white/40'
            } backdrop-blur-[1px]`}
            onClick={() => onAddTask(day.dateString)}
          >
            <div className={`p-3 rounded-full ${
              isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/20 text-blue-600'
            } transition-all duration-200 hover:scale-110`}>
              <Plus size={20} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarCell;
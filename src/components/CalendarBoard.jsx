import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronLeft, ChevronRight, Calendar, MoreHorizontal, Eye } from 'lucide-react';
import TaskCard from './TaskCard';
import { dateUtils } from '../utils/dateUtils';

const CalendarBoard = ({ 
  categories, 
  currentDate, 
  onDateChange, 
  onAddTask, 
  onEditTask, 
  onDeleteTask, 
  onToggleTask, 
  onViewDay,
  isDark,
  isMobile,
  searchTerm,
  selectedCategory
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = dateUtils.getDaysInMonth(year, month);
  const firstDay = dateUtils.getFirstDayOfMonth(year, month);
  
  // Get all tasks for the current month
  const monthTasks = categories.flatMap(category => 
    category.tasks
      .filter(task => {
        const taskDate = new Date(task.date);
        const matchesMonth = taskDate.getMonth() === month && taskDate.getFullYear() === year;
        const matchesSearch = searchTerm === '' || task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || category.id === selectedCategory;
        return matchesMonth && matchesSearch && matchesCategory;
      })
      .map(task => ({
        ...task,
        categoryId: category.id,
        categoryName: category.name,
        categoryColor: category.color,
        categoryIcon: category.icon
      }))
  );

  // Create calendar grid
  const days = [];
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayTasks = monthTasks.filter(task => task.date === dateString);
    
    days.push({
      day,
      dateString,
      tasks: dayTasks,
      isToday: dateUtils.isToday(dateString),
      isPast: dateUtils.isPastDate(dateString)
    });
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month + direction);
    onDateChange(newDate);
  };

  const handleViewDayTasks = (day) => {
    onViewDay(day);
  };

  if (isMobile) {
    // Enhanced list view for mobile
    return (
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="p-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth(-1)}
              className={`p-3 rounded-xl ${isDark ? 'bg-gray-800/80 text-gray-300 hover:bg-gray-700' : 'bg-white/80 text-gray-600 hover:bg-gray-50'} transition-all hover:scale-105 shadow-lg backdrop-blur-sm`}
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} text-center`}>
              {dateUtils.getMonthName(month)} {year}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className={`p-3 rounded-xl ${isDark ? 'bg-gray-800/80 text-gray-300 hover:bg-gray-700' : 'bg-white/80 text-gray-600 hover:bg-gray-50'} transition-all hover:scale-105 shadow-lg backdrop-blur-sm`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-thin">
          <div className="space-y-4">
            {days.filter(day => day && day.tasks.length > 0).map((day) => (
              <div key={day.dateString} 
                className={`${isDark ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-xl p-4 border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg hover:shadow-xl transition-all duration-200`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className={`font-semibold text-lg ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {day.day}
                    </h3>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {dateUtils.getMonthName(month)}
                    </span>
                    {day.isToday && (
                      <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full font-medium shadow-md">
                        Today
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
                      {day.tasks.length} task{day.tasks.length !== 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={() => handleViewDayTasks(day)}
                      className="p-2 text-purple-500 hover:text-purple-600 hover:bg-purple-500/10 rounded-lg transition-all"
                      title="View day details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onAddTask(day.dateString)}
                      className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10 rounded-lg transition-all"
                      title="Add task"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {day.tasks.slice(0, 2).map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                      onToggle={onToggleTask}
                      isDark={isDark}
                    />
                  ))}
                  {day.tasks.length > 2 && (
                    <button
                      onClick={() => handleViewDayTasks(day)}
                      className={`w-full text-center py-2 px-3 rounded-lg text-sm font-medium border border-dashed transition-all ${
                        isDark 
                          ? 'text-purple-400 hover:text-purple-300 border-purple-400/30 hover:bg-purple-500/10' 
                          : 'text-purple-500 hover:text-purple-600 border-purple-300/50 hover:bg-purple-50'
                      }`}
                    >
                      View all {day.tasks.length} tasks
                    </button>
                  )}
                </div>
              </div>
            ))}
            {days.filter(day => day && day.tasks.length > 0).length === 0 && (
              <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm rounded-xl p-8 text-center border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <Calendar className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-300'}`} />
                <p className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                  No tasks this month
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Start planning by adding your first task
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Enhanced calendar grid view for desktop
  const getAdaptiveLayout = () => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    
    if (screenWidth >= 1536) {
      return { cellHeight: 200, maxVisibleTasks: 2, gap: 3 };
    } else if (screenWidth >= 1280) {
      return { cellHeight: 180, maxVisibleTasks: 2, gap: 2 };
    } else if (screenWidth >= 1024) {
      return { cellHeight: 160, maxVisibleTasks: 2, gap: 2 };
    } else {
      return { cellHeight: 140, maxVisibleTasks: 2, gap: 2 };
    }
  };

  const layout = getAdaptiveLayout();
  const totalCells = days.length;
  const weeksNeeded = Math.ceil(totalCells / 7);
  const gridHeight = `${weeksNeeded * layout.cellHeight}px`;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 lg:p-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className={`flex items-center space-x-2 px-3 lg:px-4 py-2 lg:py-3 rounded-xl ${isDark ? 'bg-gray-800/80 text-gray-300 hover:bg-gray-700' : 'bg-white/80 text-gray-600 hover:bg-gray-50'} transition-all hover:scale-105 shadow-lg backdrop-blur-sm font-medium`}
          >
            <ChevronLeft size={18} />
            <span className="hidden lg:inline">Previous</span>
          </button>
          <h2 className={`text-xl lg:text-3xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            {dateUtils.getMonthName(month)} {year}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className={`flex items-center space-x-2 px-3 lg:px-4 py-2 lg:py-3 rounded-xl ${isDark ? 'bg-gray-800/80 text-gray-300 hover:bg-gray-700' : 'bg-white/80 text-gray-600 hover:bg-gray-50'} transition-all hover:scale-105 shadow-lg backdrop-blur-sm font-medium`}
          >
            <span className="hidden lg:inline">Next</span>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day headers */}
        <div className={`grid grid-cols-7 gap-${layout.gap} mb-3 lg:mb-4`}>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
            <div key={day} className={`p-2 lg:p-3 text-center font-semibold text-xs lg:text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="hidden lg:inline">{day}</span>
              <span className="lg:hidden">{day.substring(0, 3)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-6 pb-4 lg:pb-6 scrollbar-thin">
        <div 
          className={`grid grid-cols-7 gap-${layout.gap} min-h-fit`}
          style={{ minHeight: gridHeight }}
        >
          {days.map((day, index) => {
            if (!day) {
              return (
                <div 
                  key={index} 
                  className={`min-h-[${layout.cellHeight}px]`}
                  style={{ minHeight: `${layout.cellHeight}px` }}
                ></div>
              );
            }

            const hasOverflow = day.tasks.length > layout.maxVisibleTasks;
            const visibleTasks = day.tasks.slice(0, layout.maxVisibleTasks);
            const hiddenTasksCount = day.tasks.length - layout.maxVisibleTasks;

            return (
              <div
                key={day.dateString}
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
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-blue-500 rounded-full animate-pulse"></div>
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
                        onClick={() => handleViewDayTasks(day)}
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
                  {day.tasks.length === 0 ? (
                    <div 
                      className={`flex flex-col items-center justify-center py-4 lg:py-6 cursor-pointer rounded-lg transition-all duration-200 ${
                        isDark ? 'hover:bg-gray-700/30 text-gray-500' : 'hover:bg-gray-100/50 text-gray-400'
                      } opacity-0 group-hover:opacity-100`}
                      onClick={() => onAddTask(day.dateString)}
                    >
                      <Plus size={16} className="mb-1 opacity-50" />
                      <span className="text-xs opacity-70">Add task</span>
                    </div>
                  ) : (
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
                          onClick={() => handleViewDayTasks(day)}
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
                  )}
                </div>

                {/* Quick Add Overlay for Empty Days */}
                {day.tasks.length === 0 && (
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarBoard;
import React from 'react';
import CalendarCell from './CalendarCell';

const CalendarGrid = ({
  days,
  isDark,
  currentDate,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
  handleToggleTask,
  handleViewDayTasks
}) => {
  // Get adaptive layout based on screen size
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
              />
            );
          }

          return (
            <CalendarCell
              key={day.dateString}
              day={day}
              isDark={isDark}
              layout={layout}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onToggleTask={handleToggleTask}
              onViewDay={handleViewDayTasks}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
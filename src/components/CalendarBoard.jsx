import React from 'react';
import { useApp } from '../context/AppProvider';
import { useTaskManager } from '../hooks/useTaskManager';
import CalendarHeader from './Calendarboard/CalendarHeader';
import CalendarGrid from './Calendarboard/CalendarGrid';
import MobileCalendarView from './Calendarboard/MobileCalendarView';
import { useCalendarData } from '../hooks/useCalendarData';

const CalendarBoard = () => {
  const {
    categories,
    currentDate,
    setCurrentDate,
    isDark,
    isMobile,
    searchTerm,
    selectedCategory,
    viewDay
  } = useApp();

  const {
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleToggleTask
  } = useTaskManager();

  const { monthTasks, days } = useCalendarData({
    categories,
    currentDate,
    searchTerm,
    selectedCategory
  });

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewDayTasks = (day) => {
    viewDay(day);
  };

  if (isMobile) {
    return (
      <MobileCalendarView
        currentDate={currentDate}
        days={days}
        isDark={isDark}
        navigateMonth={navigateMonth}
        goToToday={goToToday}
        handleViewDayTasks={handleViewDayTasks}
        handleAddTask={handleAddTask}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        handleToggleTask={handleToggleTask}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <CalendarHeader
        currentDate={currentDate}
        isDark={isDark}
        navigateMonth={navigateMonth}
        goToToday={goToToday}
      />
      
      <CalendarGrid
        days={days}
        isDark={isDark}
        currentDate={currentDate}
        handleAddTask={handleAddTask}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        handleToggleTask={handleToggleTask}
        handleViewDayTasks={handleViewDayTasks}
      />
    </div>
  );
};

export default CalendarBoard;
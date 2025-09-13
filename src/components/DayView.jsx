import React, { useState } from 'react';
import { useApp } from '../context/AppProvider';
import { useTaskManager } from '../hooks/useTaskManager';
import DayViewHeader from './DayView/DayViewHeader';
import TasksPanel from './DayView/TasksPanel';
import ResourcesSidebar from './DayView/ResourcesSidebar';
import MobileResourcesOverlay from './DayView/MobileResourcesOverlay';

const DayView = () => {
  const {
    categories,
    backToCalendar,
    selectedDayData,
    isDark,
    isMobile,
    openModal,
    setCurrentView
  } = useApp();

  const {
    handleDeleteTask,
    handleToggleTask
  } = useTaskManager();

  const [sortBy, setSortBy] = useState('priority');
  const [filterBy, setFilterBy] = useState('all');
  const [showResources, setShowResources] = useState(false);
  const [expandedTask, setExpandedTask] = useState(null);
  const [headerExpanded, setHeaderExpanded] = useState(false);

  if (!selectedDayData) return null;

  // Get updated tasks from categories
  const dayTasks = categories.flatMap(category => 
    category.tasks
      .filter(task => task.date === selectedDayData.dateString)
      .map(task => ({
        ...task,
        categoryId: category.id,
        categoryName: category.name,
        categoryColor: category.color,
        categoryIcon: category.icon
      }))
  );

  // Get all unique resources from today's tasks
  const allResources = dayTasks.flatMap(task => task.resources || []);
  const resourcesByType = allResources.reduce((acc, resource) => {
    if (!acc[resource.type]) acc[resource.type] = [];
    acc[resource.type].push(resource);
    return acc;
  }, {});

  // Handler functions
  const handleBackToCalendar = () => {
    if (backToCalendar) {
      backToCalendar();
    } else {
      setCurrentView('calendar');
    }
  };

  const handleAddTaskClick = () => {
    openModal('isTaskModalOpen', { selectedDate: selectedDayData.dateString });
  };

  const handleEditTaskClick = (task) => {
    openModal('isTaskModalOpen', { editingTask: task });
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <DayViewHeader
        selectedDayData={selectedDayData}
        dayTasks={dayTasks}
        allResources={allResources}
        isDark={isDark}
        isMobile={isMobile}
        headerExpanded={headerExpanded}
        setHeaderExpanded={setHeaderExpanded}
        showResources={showResources}
        setShowResources={setShowResources}
        onBackToCalendar={handleBackToCalendar}
        onAddTask={handleAddTaskClick}
      />

      <div className="flex-1 overflow-hidden flex">
        <TasksPanel
          dayTasks={dayTasks}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          expandedTask={expandedTask}
          setExpandedTask={setExpandedTask}
          showResources={showResources}
          isMobile={isMobile}
          isDark={isDark}
          onEditTask={handleEditTaskClick}
          onDeleteTask={handleDeleteTask}
          onToggleTask={handleToggleTask}
          onAddTask={handleAddTaskClick}
        />

        {/* Desktop Resources Sidebar */}
        {showResources && !isMobile && dayTasks.length > 0 && (
          <ResourcesSidebar 
            resourcesByType={resourcesByType} 
            isDark={isDark} 
            onClose={() => setShowResources(false)}
          />
        )}

        {/* Mobile Resources Overlay */}
        {showResources && isMobile && dayTasks.length > 0 && (
          <MobileResourcesOverlay 
            resourcesByType={resourcesByType} 
            isDark={isDark} 
            onClose={() => setShowResources(false)}
          />
        )}
      </div>
    </div>
  );
};

export default DayView;
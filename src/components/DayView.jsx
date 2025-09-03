import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppProvider';
import { useTaskManager } from '../hooks/useTaskManager';
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Tag, 
  ExternalLink,
  Filter,
  SortAsc,
  CheckCircle2,
  Circle,
  Star,
  Target,
  BookOpen,
  Play,
  FileText,
  Globe,
  GraduationCap,
  MoreVertical,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  BarChart3
} from 'lucide-react';

const DayView = () => {
  const {
    categories,
    backToCalendar,
    currentDate,
    selectedDayData,
    setCurrentDate,
    isDark,
    isMobile,
    searchTerm,
    selectedCategory,
    viewDay,
    openModal,
    setCurrentView
  } = useApp();

  // Get task management functions
  const {
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleToggleTask,
    handleSaveTask
  } = useTaskManager();

  const [sortBy, setSortBy] = useState('priority');
  const [filterBy, setFilterBy] = useState('all');
  const [showResources, setShowResources] = useState(false);
  const [expandedTask, setExpandedTask] = useState(null);
  const [headerExpanded, setHeaderExpanded] = useState(false);

  if (!selectedDayData) return null;

  const formattedDate = new Date(selectedDayData.dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const shortDate = new Date(selectedDayData.dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

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

  // Filter and sort tasks
  const filteredTasks = dayTasks.filter(task => {
    switch (filterBy) {
      case 'completed': return task.completed;
      case 'pending': return !task.completed;
      case 'high-priority': return task.priority === 'high';
      default: return true;
    }
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return (priorityOrder[b.priority] || 1) - (priorityOrder[a.priority] || 1);
      case 'time':
        return (a.estimatedTime || 0) - (b.estimatedTime || 0);
      case 'category':
        return a.categoryName.localeCompare(b.categoryName);
      case 'completion':
        return a.completed - b.completed;
      default:
        return 0;
    }
  });

  const completedTasks = dayTasks.filter(task => task.completed).length;
  const totalTasks = dayTasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalEstimatedTime = dayTasks.reduce((sum, task) => sum + (task.estimatedTime || 0), 0);
  const completedTime = dayTasks.filter(task => task.completed).reduce((sum, task) => sum + (task.estimatedTime || 0), 0);

  // Get all unique resources from today's tasks
  const allResources = dayTasks.flatMap(task => task.resources || []);
  const resourcesByType = allResources.reduce((acc, resource) => {
    if (!acc[resource.type]) acc[resource.type] = [];
    acc[resource.type].push(resource);
    return acc;
  }, {});

  const formatTime = (minutes) => {
    if (!minutes) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  // Handler functions - fixed to use proper prop names
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

  const handleDeleteTaskClick = (taskId) => {
    if (handleDeleteTask) {
      handleDeleteTask(taskId);
    }
  };

  const handleToggleTaskClick = (taskId) => {
    if (handleToggleTask) {
      handleToggleTask(taskId);
    }
  };

  return (
    <div className="flex-1 overflow-hidden scrollbar-thin flex flex-col">
      {/* Mobile-Optimized Header */}
      <div className={`relative ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-b ${isDark ? 'border-gray-700/30' : 'border-gray-200/30'} flex-shrink-0 transition-all duration-300`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
        </div>
        
        <div className="relative">
          {/* Mobile-First Top Bar */}
          <div className="p-2 sm:p-3 lg:p-4">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <button
                  onClick={handleBackToCalendar}
                  className={`group flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg ${
                    isDark 
                      ? 'bg-gray-800/60 text-gray-300 hover:bg-gray-800/80 border border-gray-700/50' 
                      : 'bg-white/60 text-gray-600 hover:bg-white/80 border border-gray-200/50'
                  } transition-all duration-200 hover:scale-[1.02] shadow-lg backdrop-blur-sm font-medium text-xs sm:text-sm flex-shrink-0`}
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                  <span className="hidden xs:inline">Back</span>
                </button>

                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl ${
                    selectedDayData.isToday 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/25' 
                      : isDark 
                      ? 'bg-gray-800/80 border border-gray-700/50' 
                      : 'bg-white/80 border border-gray-200/50'
                  } shadow-lg flex-shrink-0`}>
                    <Calendar className={`${
                      selectedDayData.isToday 
                        ? 'text-white' 
                        : isDark 
                        ? 'text-gray-300' 
                        : 'text-gray-600'
                    }`} size={16} />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <h1 className={`text-sm sm:text-lg lg:text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'} truncate`}>
                      {isMobile ? shortDate : formattedDate}
                    </h1>
                    <div className="flex items-center space-x-1 sm:space-x-2 mt-0.5">
                      {selectedDayData.isToday && (
                        <span className="px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs rounded-full shadow-lg font-medium">
                          Today
                        </span>
                      )}
                      <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                        {totalTasks} task{totalTasks !== 1 ? 's' : ''}
                      </span>
                      {totalTasks > 0 && (
                        <span className={`text-xs font-medium ${
                          completionPercentage === 100 
                            ? 'text-green-500' 
                            : isDark ? 'text-blue-400' : 'text-blue-600'
                        } hidden xs:inline`}>
                          {completionPercentage}% done
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Mobile Optimized */}
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                {/* Mobile Compact Stats Button */}
                <div className="sm:hidden">
                  {totalTasks > 0 && (
                    <button
                      onClick={() => setHeaderExpanded(!headerExpanded)}
                      className={`group p-2 rounded-lg transition-all duration-200 ${
                        headerExpanded 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                          : isDark 
                          ? 'bg-gray-800/60 text-gray-300 hover:bg-gray-800/80 border border-gray-700/50' 
                          : 'bg-white/60 text-gray-600 hover:bg-white/80 border border-gray-200/50'
                      } hover:scale-[1.02] backdrop-blur-sm`}
                    >
                      <BarChart3 size={14} />
                    </button>
                  )}
                </div>

                {/* Desktop Stats Button */}
                <div className="hidden sm:block">
                  {totalTasks > 0 && (
                    <button
                      onClick={() => setHeaderExpanded(!headerExpanded)}
                      className={`group px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                        headerExpanded 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                          : isDark 
                          ? 'bg-gray-800/60 text-gray-300 hover:bg-gray-800/80 border border-gray-700/50' 
                          : 'bg-white/60 text-gray-600 hover:bg-white/80 border border-gray-200/50'
                      } hover:scale-[1.02] backdrop-blur-sm`}
                    >
                      <BarChart3 size={14} className="inline mr-1.5" />
                      Stats
                      {headerExpanded ? <ChevronUp size={14} className="inline ml-1.5" /> : <ChevronDown size={14} className="inline ml-1.5" />}
                    </button>
                  )}
                </div>

                {/* Mobile Resources Button */}
                <div className="sm:hidden">
                  {totalTasks > 0 && allResources.length > 0 && (
                    <button
                      onClick={() => setShowResources(!showResources)}
                      className={`group relative p-2 rounded-lg transition-all duration-200 ${
                        showResources 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                          : isDark 
                          ? 'bg-gray-800/60 text-gray-300 hover:bg-gray-800/80 border border-gray-700/50' 
                          : 'bg-white/60 text-gray-600 hover:bg-white/80 border border-gray-200/50'
                      } hover:scale-[1.02] backdrop-blur-sm`}
                    >
                      <BookOpen size={14} />
                      <span className={`absolute -top-1 -right-1 w-4 h-4 text-xs rounded-full flex items-center justify-center ${
                        showResources 
                          ? 'bg-white/20 text-white' 
                          : isDark 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-blue-500/10 text-blue-600'
                      }`}>
                        {allResources.length > 9 ? '9+' : allResources.length}
                      </span>
                    </button>
                  )}
                </div>

                {/* Desktop Resources Button */}
                <div className="hidden sm:block">
                  {totalTasks > 0 && allResources.length > 0 && (
                    <button
                      onClick={() => setShowResources(!showResources)}
                      className={`group px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                        showResources 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                          : isDark 
                          ? 'bg-gray-800/60 text-gray-300 hover:bg-gray-800/80 border border-gray-700/50' 
                          : 'bg-white/60 text-gray-600 hover:bg-white/80 border border-gray-200/50'
                      } hover:scale-[1.02] backdrop-blur-sm`}
                    >
                      <BookOpen size={14} className="inline mr-1.5" />
                      <span className="hidden md:inline">Resources</span>
                      <span className="md:hidden">Res</span>
                      <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                        showResources 
                          ? 'bg-white/20' 
                          : isDark 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-blue-500/10 text-blue-600'
                      }`}>
                        {allResources.length}
                      </span>
                    </button>
                  )}
                </div>
                
                {/* Add Task Button - Mobile Optimized */}
                <button
                  onClick={handleAddTaskClick}
                  className="group px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] font-medium text-xs sm:text-sm"
                >
                  <Plus size={14} className="inline mr-1 sm:mr-1.5 group-hover:rotate-90 transition-transform duration-200" />
                  <span className="hidden xs:inline">Add</span>
                  <span className="hidden sm:inline">Task</span>
                </button>
              </div>
            </div>

            {/* Mobile-Optimized Progress Bar */}
            {totalTasks > 0 && (
              <div className="mt-2 sm:mt-3">
                <div className={`relative w-full h-1.5 sm:h-2 ${isDark ? 'bg-gray-800/80' : 'bg-gray-200/80'} rounded-full overflow-hidden shadow-inner`}>
                  <div
                    className={`absolute inset-y-0 left-0 transition-all duration-700 ease-out rounded-full ${
                      completionPercentage === 100 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30'
                    }`}
                    style={{ width: `${completionPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
                  </div>
                </div>
                
                {/* Mobile Progress Text */}
                <div className="sm:hidden flex items-center justify-between mt-1 text-xs">
                  <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {completedTasks}/{totalTasks}
                  </span>
                  <span className={`font-medium ${
                    completionPercentage === 100 
                      ? 'text-green-500' 
                      : isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {completionPercentage}%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Expanded Stats Section - Mobile Responsive */}
          {headerExpanded && totalTasks > 0 && (
            <div className={`px-2 sm:px-3 lg:px-4 pb-3 sm:pb-4 border-t ${isDark ? 'border-gray-700/30' : 'border-gray-200/30'} animate-in slide-in-from-top-2 duration-200`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
                <StatCard
                  icon={Target}
                  value={`${completionPercentage}%`}
                  label="Complete"
                  color={completionPercentage === 100 ? 'green' : 'blue'}
                  isDark={isDark}
                  compact
                  mobile
                />
                <StatCard
                  icon={CheckCircle2}
                  value={completedTasks}
                  label="Done"
                  color="green"
                  isDark={isDark}
                  compact
                  mobile
                />
                <StatCard
                  icon={Circle}
                  value={totalTasks - completedTasks}
                  label="Pending"
                  color="orange"
                  isDark={isDark}
                  compact
                  mobile
                />
                <StatCard
                  icon={Clock}
                  value={formatTime(completedTime)}
                  label="Time"
                  color="purple"
                  isDark={isDark}
                  compact
                  mobile
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 sm:mt-4 text-xs sm:text-sm space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <TrendingUp size={14} className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Daily Progress
                  </span>
                </div>
                <div className="flex items-center justify-between sm:space-x-4">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {completedTasks}/{totalTasks} tasks
                  </span>
                  <span className={`font-medium ${
                    completionPercentage === 100 
                      ? 'text-green-500' 
                      : isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {formatTime(completedTime)}/{formatTime(totalEstimatedTime)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex">
        {/* Main Tasks Panel */}
        <div className={`flex-1 flex flex-col ${showResources && !isMobile ? 'lg:w-2/3' : ''}`}>
          {/* Enhanced Controls - Mobile Responsive */}
          {totalTasks > 0 && (
            <div className={`p-2 sm:p-3 lg:p-4 border-b ${isDark ? 'border-gray-700/30' : 'border-gray-200/30'} flex-shrink-0 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50/50'} backdrop-blur-sm`}>
              <div className="flex flex-col space-y-2">
                {/* Mobile: Stacked Layout */}
                <div className="flex flex-row space-x-2 items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FilterSelect
                      label="Filter"
                      value={filterBy}
                      onChange={setFilterBy}
                      options={[
                        { value: 'all', label: 'All' },
                        { value: 'pending', label: 'Pending' },
                        { value: 'completed', label: 'Done' },
                        { value: 'high-priority', label: 'Priority' }
                      ]}
                      icon={Filter}
                      isDark={isDark}
                      compact
                      mobile
                    />

                    <FilterSelect
                      label="Sort"
                      value={sortBy}
                      onChange={setSortBy}
                      options={[
                        { value: 'priority', label: 'Priority' },
                        { value: 'time', label: 'Time' },
                        { value: 'category', label: 'Category' },
                        { value: 'completion', label: 'Status' }
                      ]}
                      icon={SortAsc}
                      isDark={isDark}
                      compact
                      mobile
                    />
                  </div>

                  <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} bg-gradient-to-r ${isDark ? 'from-gray-800/60 to-gray-700/60' : 'from-white/60 to-gray-100/60'} px-2 py-1 rounded-lg backdrop-blur-sm border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} self-start sm:self-auto`}>
                    {filteredTasks.length} of {totalTasks}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Tasks List - Mobile Optimized */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-3 lg:p-4">
            {totalTasks === 0 ? (
              <EmptyState onAddTask={handleAddTaskClick} isDark={isDark} />
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {sortedTasks.map((task, index) => (
                  <EnhancedTaskCard
                    key={`${task.id}-${task.completed}-${index}`}
                    task={task}
                    onEdit={handleEditTaskClick}
                    onDelete={handleDeleteTaskClick}
                    onToggle={handleToggleTaskClick}
                    isDark={isDark}
                    isExpanded={expandedTask === task.id}
                    onToggleExpand={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                    index={index}
                    compact
                    mobile={isMobile}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Resources Sidebar - Hidden on Mobile */}
        {showResources && !isMobile && totalTasks > 0 && (
          <ResourcesSidebar 
            resourcesByType={resourcesByType} 
            isDark={isDark} 
            onClose={() => setShowResources(false)}
          />
        )}

        {/* Mobile Resources Overlay - Full Screen on Mobile */}
        {showResources && isMobile && totalTasks > 0 && (
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

// Reusable Stat Card Component with compact mode
const StatCard = ({ icon: Icon, value, label, color, isDark, compact = false }) => {
  const getColorClasses = (color) => {
    const colors = {
      green: isDark ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-green-600 bg-green-50 border-green-200',
      blue: isDark ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : 'text-blue-600 bg-blue-50 border-blue-200',
      orange: isDark ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' : 'text-orange-600 bg-orange-50 border-orange-200',
      purple: isDark ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' : 'text-purple-600 bg-purple-50 border-purple-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`${compact ? 'p-3' : 'p-4'} rounded-xl backdrop-blur-sm border transition-all duration-200 hover:scale-[1.02] ${
      isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/60 border-gray-200/50'
    } hover:shadow-lg group`}>
      <div className="flex items-center space-x-3">
        <div className={`${compact ? 'p-1.5' : 'p-2'} rounded-lg border ${getColorClasses(color)} group-hover:scale-110 transition-transform duration-200`}>
          <Icon size={compact ? 14 : 16} />
        </div>
        <div>
          <div className={`${compact ? 'text-lg' : 'text-xl'} font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            {value}
          </div>
          <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wide`}>
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Filter Select Component with compact mode
const FilterSelect = ({ label, value, onChange, options, icon: Icon, isDark, compact = false }) => (
  <div className="flex items-center space-x-2">
    <Icon size={compact ? 14 : 16} className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${compact ? 'px-2 py-1.5' : 'px-3 py-2'} rounded-lg ${compact ? 'text-xs' : 'text-sm'} border transition-all duration-200 focus:scale-[1.02] ${
        isDark 
          ? 'bg-gray-800/80 border-gray-600/50 text-gray-200 focus:border-blue-500/50 focus:bg-gray-800' 
          : 'bg-white/80 border-gray-300/50 text-gray-700 focus:border-blue-500/50 focus:bg-white'
      } focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm`}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Enhanced Task Card Component with compact mode
const EnhancedTaskCard = ({ task, onEdit, onDelete, onToggle, isDark, isExpanded, onToggleExpand, index, compact = false }) => {
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
      <div className={`relative ${compact ? 'p-4' : 'p-5 lg:p-6'} rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
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

        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {/* Enhanced Checkbox */}
            <button
              onClick={() => onToggle(task.id)}
              className={`relative mt-1 p-1 rounded-full transition-all duration-200 hover:scale-110 ${
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
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`font-semibold ${compact ? 'text-base' : 'text-lg'} leading-tight ${
                      task.completed 
                        ? isDark ? 'text-gray-500 line-through' : 'text-gray-500 line-through'
                        : isDark ? 'text-gray-100' : 'text-gray-900'
                    } truncate`}>
                      {task.title}
                    </h3>
                    
                    {task.priority && (
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${priorityConfig.color} ${priorityConfig.bg} ${priorityConfig.border} uppercase tracking-wide`}>
                        {task.priority}
                      </span>
                    )}
                  </div>
                  
                  {task.description && (
                    <p className={`text-sm leading-relaxed ${compact ? 'mb-2' : 'mb-3'} ${
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
              <div className={`flex flex-wrap items-center gap-2 ${compact ? 'mb-2' : 'mb-4'}`}>
                <div className={`flex items-center space-x-2 px-2 py-1 rounded-lg ${
                  isDark ? 'bg-gray-700/50 border border-gray-600/30' : 'bg-gray-100/80 border border-gray-200/50'
                } backdrop-blur-sm`}>
                  <span className="text-base">{task.categoryIcon}</span>
                  <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {task.categoryName}
                  </span>
                </div>
                
                {task.estimatedTime && (
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
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
                    className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-all duration-200 ${
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
                <div className={`flex flex-wrap gap-1 ${compact ? 'mb-2' : 'mb-4'}`}>
                  {task.tags.map((tag, idx) => (
                    <span key={idx} className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      isDark ? 'bg-gray-700/60 text-gray-300 border border-gray-600/30' : 'bg-gray-100/80 text-gray-600 border border-gray-200/50'
                    } backdrop-blur-sm`}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Expanded Resources */}
              {isExpanded && hasResources && (
                <div className={`${compact ? 'mt-3 p-3' : 'mt-4 p-4'} rounded-xl border transition-all duration-300 ${
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
                        className={`group flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
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
          <div className="relative">
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
                className={`absolute right-0 top-full mt-2 w-48 rounded-xl shadow-xl border backdrop-blur-xl  ${
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

// Enhanced Resources Sidebar
const ResourcesSidebar = ({ resourcesByType, isDark, onClose }) => {
  const getResourceIcon = (type) => {
    const icons = {
      practice: '💻',
      tutorial: '📚',
      video: '🎥',
      article: '📄',
      course: '🎓',
      platform: '👥',
      guide: '📋'
    };
    return icons[type] || '🔗';
  };

  return (
    <div className={`w-2/4 border-l overflow-y-auto ${isDark ? 'border-gray-700/30 bg-gray-900/60' : 'border-gray-200/30 bg-gray-50/60'} backdrop-blur-xl animate-in slide-in-from-right-2 duration-300`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'} flex items-center`}>
            <BookOpen size={20} className="mr-2" />
            Learning Resources
          </h3>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            isDark ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-blue-50 text-blue-600 border border-blue-200'
          }`}>
            {Object.values(resourcesByType).flat().length} total
          </div>
        </div>
        
        <div className="space-y-4">
          {Object.entries(resourcesByType).map(([type, resources]) => (
            <ResourceSection
              key={type}
              type={type}
              resources={resources}
              icon={getResourceIcon(type)}
              isDark={isDark}
            />
          ))}
          
          {Object.keys(resourcesByType).length === 0 && (
            <EmptyResourcesState isDark={isDark} />
          )}
        </div>
      </div>
    </div>
  );
};

// Resource Section Component
const ResourceSection = ({ type, resources, icon, isDark }) => (
  <div>
    <h4 className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 uppercase tracking-wider flex items-center`}>
      <span className="mr-2 text-sm">{icon}</span>
      {type.replace('-', ' ')}
      <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
        isDark ? 'bg-gray-700/60 text-gray-400' : 'bg-gray-200/60 text-gray-600'
      }`}>
        {resources.length}
      </span>
    </h4>
    <div className="space-y-2">
      {resources.map((resource, idx) => (
        <a
          key={idx}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group block p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
            isDark ? 'bg-gray-800/60 hover:bg-gray-800/80 border border-gray-700/50' : 'bg-white/80 hover:bg-white border border-gray-200/50'
          } backdrop-blur-sm hover:shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <span className="text-base flex-shrink-0">{resource.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'} truncate`}>
                  {resource.title}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} capitalize mt-0.5`}>
                  {resource.type.replace('-', ' ')}
                </div>
              </div>
            </div>
            <ExternalLink size={14} className={`${isDark ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'} transition-colors flex-shrink-0 ml-2`} />
          </div>
        </a>
      ))}
    </div>
  </div>
);

// Mobile Resources Overlay
const MobileResourcesOverlay = ({ resourcesByType, isDark, onClose }) => {
  const getResourceIcon = (type) => {
    const icons = {
      practice: '💻',
      tutorial: '📚',
      video: '🎥',
      article: '📄',
      course: '🎓',
      platform: '👥',
      guide: '📋'
    };
    return icons[type] || '🔗';
  };

  return (
    <div className={`mt-15 absolute inset-0 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl  animate-in slide-in-from-right-2 duration-300`}>
      <div className={`p-4 border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'} flex items-center`}>
            <BookOpen size={20} className="mr-2" />
            Learning Resources
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl ${isDark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} transition-all duration-200 hover:scale-110`}
          >
            <ArrowLeft size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto scroll-thin p-4">
        <div className="space-y-4 ">
          {Object.entries(resourcesByType).map(([type, resources]) => (
            <ResourceSection
              key={type}
              type={type}
              resources={resources}
              icon={getResourceIcon(type)}
              isDark={isDark}
            />
          ))}
          
          {Object.keys(resourcesByType).length === 0 && (
            <EmptyResourcesState isDark={isDark} />
          )}
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ onAddTask, isDark }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className={`relative p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'} mb-6 backdrop-blur-sm border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} group`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
      <Calendar className={`${isDark ? 'text-gray-400' : 'text-gray-500'} group-hover:scale-110 transition-transform duration-300`} size={64} />
    </div>
    <h3 className={`text-2xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-3 text-center`}>
      Ready to start your day?
    </h3>
    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center mb-6 max-w-sm leading-relaxed px-4`}>
      Break down your goals into actionable tasks and make every moment count. Your productivity journey begins here.
    </p>
    <button
      onClick={onAddTask}
      className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 font-semibold"
    >
      <Plus size={18} className="inline mr-2 group-hover:rotate-90 transition-transform duration-300" />
      Create Your First Task
    </button>
  </div>
);

// Empty Resources State
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

export default DayView;
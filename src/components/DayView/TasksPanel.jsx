import React from 'react';
import { Filter, SortAsc } from 'lucide-react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import FilterSelect from './FilterSelect';

const TasksPanel = ({
  dayTasks,
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
  expandedTask,
  setExpandedTask,
  showResources,
  isMobile,
  isDark,
  onEditTask,
  onDeleteTask,
  onToggleTask,
  onAddTask
}) => {
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

  const totalTasks = dayTasks.length;

  return (
    <div className={`flex-1 flex flex-col ${showResources && !isMobile ? 'lg:w-2/3' : ''}`}>
      {/* Enhanced Controls */}
      {totalTasks > 0 && (
        <div className={`p-4 sm:p-6 border-b ${isDark ? 'border-gray-700/30' : 'border-gray-200/30'} flex-shrink-0 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50/50'} backdrop-blur-sm`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-3">
              <FilterSelect
                label="Filter"
                value={filterBy}
                onChange={setFilterBy}
                options={[
                  { value: 'all', label: 'All Tasks' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'high-priority', label: 'High Priority' }
                ]}
                icon={Filter}
                isDark={isDark}
              />

              <FilterSelect
                label="Sort"
                value={sortBy}
                onChange={setSortBy}
                options={[
                  { value: 'priority', label: 'Priority' },
                  { value: 'time', label: 'Time Est.' },
                  { value: 'category', label: 'Category' },
                  { value: 'completion', label: 'Status' }
                ]}
                icon={SortAsc}
                isDark={isDark}
              />
            </div>

           {!isMobile && (<div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} bg-gradient-to-r ${isDark ? 'from-gray-800/60 to-gray-700/60' : 'from-white/60 to-gray-100/60'} px-3 py-2 rounded-xl backdrop-blur-sm border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} self-start sm:self-auto`}>
              Showing {filteredTasks.length} of {totalTasks} tasks
            </div>)}
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-4 sm:p-6">
          {totalTasks === 0 ? (
            <EmptyState onAddTask={onAddTask} isDark={isDark} />
          ) : (
            <div className="space-y-4">
              {sortedTasks.map((task, index) => (
                <TaskCard
                  key={`${task.id}-${task.completed}-${index}`}
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                  onToggle={onToggleTask}
                  isDark={isDark}
                  isExpanded={expandedTask === task.id}
                  onToggleExpand={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                  index={index}
                  isMobile={isMobile}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPanel;
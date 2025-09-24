import React from 'react';
import { CheckCircle } from 'lucide-react';
import TaskCard from './TaskCard';
import AIInsightsSection from './AIInsightsSection';
import DesktopSidebar from './DesktopSidebar';

const ContentArea = ({
  isDark,
  isMobile,
  activeFilter,
  filteredTasks,
  filters,
  suggestedDates,
  expandedTask,
  setExpandedTask,
  showReschedule,
  setShowReschedule,
  onMarkComplete,
  onReschedule,
  getTaskStats,
  handleIntelligentReschedule,
  bulkMarkLowPriorityComplete
}) => {
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 sm:p-12 max-h-96">
      <div className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 ${
        isDark ? 'bg-emerald-400/10' : 'bg-emerald-50'
      }`}>
        <CheckCircle className={`w-16 h-16 sm:w-20 sm:h-20 ${
          isDark ? 'text-emerald-400' : 'text-emerald-500'
        }`} />
      </div>
      <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {activeFilter === 'intervention' ? 'All Under Control!' : 'Nothing Here!'}
      </h3>
      <p className={`text-center text-sm sm:text-base ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      } max-w-md leading-relaxed`}>
        {activeFilter === 'intervention' 
          ? 'No critical tasks need immediate attention.' 
          : `No ${filters.find(f => f.id === activeFilter)?.label.toLowerCase()} tasks found.`}
        <br />
        You're staying organized like a pro!
      </p>
    </div>
  );

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">          
        <div className="flex-1 overflow-y-auto">
          {/* Content based on active filter */}
          {activeFilter === 'insights' ? (
            <div className="p-3 sm:p-4 lg:p-6 pb-20 sm:pb-24 max-h-full">
              <AIInsightsSection 
                isDark={isDark}
                suggestedDates={suggestedDates}
              />
            </div>
          ) : filteredTasks.length === 0 ? (
            renderEmptyState()
          ) : (
            <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 pb-20 sm:pb-24">
              {filteredTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task}
                  isDark={isDark}
                  expandedTask={expandedTask}
                  setExpandedTask={setExpandedTask}
                  setShowReschedule={setShowReschedule}
                  onMarkComplete={onMarkComplete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sidebar - Only show for task lists, not insights */}
      {!isMobile && activeFilter !== 'insights' && (
        <DesktopSidebar
          isDark={isDark}
          stats={getTaskStats()}
          suggestedDates={suggestedDates}
          onIntelligentReschedule={handleIntelligentReschedule}
          onBulkMarkLowPriority={bulkMarkLowPriorityComplete}
        />
      )}
    </div>
  );
};

export default ContentArea;
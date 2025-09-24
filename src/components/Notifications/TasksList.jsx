
// components/Notifications/NotificationsView.jsx
import React, { useState, useMemo } from 'react';
import { 
  CheckCircle, 
  Clock, 
} from 'lucide-react';

const TasksList = ({ 
  tasks, 
  activeFilter, 
  expandedTask, 
  setExpandedTask, 
  showReschedule, 
  setShowReschedule,
  suggestedDates,
  isDark, 
  isMobile,
  onMarkComplete,
  onReschedule 
}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-500/10 text-red-400';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10 text-yellow-400';
      case 'low': return 'border-green-500 bg-green-500/10 text-green-400';
      default: return 'border-gray-500 bg-gray-500/10 text-gray-400';
    }
  };

  const getWorkloadColor = (workload) => {
    switch (workload) {
      case 'light': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'heavy': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getFilterTitle = () => {
    switch (activeFilter) {
      case 'overdue': return 'Overdue Tasks';
      case 'today': return "Today's Tasks";
      case 'upcoming': return 'Upcoming Tasks';
      case 'high': return 'High Priority Tasks';
      default: return 'All Incomplete Tasks';
    }
  };

  return (
    <div className="flex-1 overflow-hidden">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} p-4`}>
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {getFilterTitle()} ({tasks.length})
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="p-8 text-center">
            <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              No tasks to show!
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Great job staying on track!
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 border-b ${isDark ? 'border-gray-700 hover:bg-gray-700/30' : 'border-gray-200 hover:bg-gray-50'} transition-all`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg">{task.categoryIcon || '📋'}</span>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {task.title}
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {task.categoryName} • {task.estimatedTime || '1h'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-lg border ${getPriorityColor(task.priority || 'medium')}`}>
                      {(task.priority || 'medium').toUpperCase()}
                    </span>
                    <span className={`text-xs ${task.date < new Date().toISOString().split('T')[0] ? 'text-red-400' : isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Due: {new Date(task.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {expandedTask === task.id && (
                    <>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                        {task.description || 'No description available'}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => onMarkComplete(task.id)}
                          className="px-3 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Mark Complete</span>
                        </button>
                        
                        <button
                          onClick={() => setShowReschedule(showReschedule === task.id ? null : task.id)}
                          className="px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors flex items-center space-x-2"
                        >
                          <Clock className="w-4 h-4" />
                          <span>Reschedule</span>
                        </button>
                      </div>
                    </>
                  )}
                  
                  {showReschedule === task.id && (
                    <div className={`mt-3 p-3 ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-lg`}>
                      <h5 className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Choose new date:
                      </h5>
                      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-2`}>
                        {suggestedDates.slice(0, 6).map((suggestion) => (
                          <button
                            key={suggestion.date}
                            onClick={() => onReschedule(task.id, suggestion.date)}
                            className={`p-2 rounded-lg text-left transition-all hover:scale-[1.02] ${isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-50'} border ${isDark ? 'border-gray-500' : 'border-gray-200'}`}
                          >
                            <div className="text-xs font-medium">{suggestion.displayDate}</div>
                            <div className={`text-xs px-2 py-1 rounded mt-1 border ${getWorkloadColor(suggestion.workload)}`}>
                              {suggestion.workload} ({suggestion.totalHours}h)
                            </div>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setShowReschedule(null)}
                        className={`mt-2 text-xs ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'}`}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                  className={`p-2 rounded-lg ml-4 ${isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors`}
                >
                  <div className={`w-4 h-4 transition-transform ${expandedTask === task.id ? 'rotate-90' : ''}`}>
                    →
                  </div>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksList;
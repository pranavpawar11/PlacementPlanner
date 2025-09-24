// components/Notifications/NotificationsView.jsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppProvider';
import { useNotificationManager } from '../../hooks/useNotificationManager';
import { 
  Bell, 
  ArrowLeft,
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Target,
  Calendar,
  Zap,
  ChevronRight,
  ChevronDown,
  X,
  Users,
  Clock3,
  RotateCcw,
  Check,
  Sparkles,
  TrendingUp,
  Filter,
  Plus,
  Brain,
  Flame,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

const NotificationsView = () => {
  const { isDark, isMobile, setCurrentView } = useApp();
  const {
    getTasksByFilter,
    getOptimalRescheduleDates,
    getTaskStats,
    toggleTaskComplete,
    rescheduleTask,
    intelligentRescheduleOverdue,
    bulkMarkLowPriorityComplete
  } = useNotificationManager();

  const [activeFilter, setActiveFilter] = useState('intervention');
  const [expandedTask, setExpandedTask] = useState(null);
  const [showReschedule, setShowReschedule] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Force component update when categories change
  const stats = getTaskStats();
  const suggestedDates = getOptimalRescheduleDates();

  // Enhanced filters focusing on intervention
  const filters = [
    { 
      id: 'intervention', 
      label: 'Critical', 
      count: stats.overdue + stats.today, 
      icon: AlertTriangle,
      gradient: 'from-red-500 to-rose-600',
      iconColor: 'text-red-400',
      description: 'Tasks needing immediate attention'
    },
    { 
      id: 'overdue', 
      label: 'Overdue', 
      count: stats.overdue, 
      icon: Clock,
      gradient: 'from-orange-500 to-red-500',
      iconColor: 'text-orange-400',
      description: 'Past due tasks'
    },
    { 
      id: 'today', 
      label: 'Due Today', 
      count: stats.today, 
      icon: Target,
      gradient: 'from-emerald-500 to-teal-600',
      iconColor: 'text-emerald-400',
      description: 'Tasks due today'
    },
    { 
      id: 'high', 
      label: 'Priority', 
      count: stats.highPriority, 
      icon: Zap,
      gradient: 'from-amber-500 to-orange-600',
      iconColor: 'text-amber-400',
      description: 'High priority tasks'
    },
    { 
      id: 'insights', 
      label: 'AI Tips', 
      count: Math.min(suggestedDates.length, 5), 
      icon: Brain,
      gradient: 'from-purple-500 to-indigo-600',
      iconColor: 'text-purple-400',
      description: 'Smart scheduling recommendations'
    }
  ];

  // Get filtered tasks based on current filter
  const getFilteredTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (activeFilter) {
      case 'intervention':
        const overdueTasks = getTasksByFilter('overdue');
        const todayTasks = getTasksByFilter('today');
        return [...overdueTasks, ...todayTasks].sort((a, b) => {
          // Prioritize overdue first, then by priority, then by estimated time
          if (a.date < today && b.date >= today) return -1;
          if (a.date >= today && b.date < today) return 1;
          
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          const aPriority = priorityOrder[a.priority] || 2;
          const bPriority = priorityOrder[b.priority] || 2;
          if (aPriority !== bPriority) return bPriority - aPriority;
          
          return (a.estimatedTime || 60) - (b.estimatedTime || 60);
        });
      case 'insights':
        return []; // We'll handle AI insights separately
      default:
        return getTasksByFilter(activeFilter);
    }
  };

  const filteredTasks = getFilteredTasks();

  // Force re-render when tasks are modified
  useEffect(() => {
    setForceUpdate(prev => prev + 1);
  }, [stats.total, stats.overdue, stats.today]);

  const getPriorityStyles = (priority) => {
    const styles = {
      high: 'bg-red-500/15 text-red-400 border-red-500/30',
      medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      low: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    };
    return styles[priority] || styles.medium;
  };

  const getWorkloadStyles = (workload) => {
    const styles = {
      light: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      heavy: 'bg-red-500/15 text-red-300 border-red-500/30'
    };
    return styles[workload] || styles.medium;
  };

  const getTaskRiskLevel = (task) => {
    const today = new Date().toISOString().split('T')[0];
    if (task.date < today) {
      const daysOverdue = Math.floor((new Date(today) - new Date(task.date)) / (1000 * 60 * 60 * 24));
      if (daysOverdue >= 3) return 'critical';
      if (daysOverdue >= 1) return 'high';
    }
    if (task.priority === 'high') return 'medium';
    return 'low';
  };

  const handleMarkComplete = async (taskId) => {
    await toggleTaskComplete(taskId);
    setExpandedTask(null);
    setTimeout(() => setForceUpdate(prev => prev + 1), 0);
  };

  const handleReschedule = async (taskId, newDate) => {
    if (!newDate || typeof newDate !== 'string') {
      console.error('Invalid date provided:', newDate);
      return;
    }
    
    const success = await rescheduleTask(taskId, newDate);
    if (success) {
      setShowReschedule(null);
      setExpandedTask(null);
      setTimeout(() => setForceUpdate(prev => prev + 1), 10);
    }
  };

  const handleIntelligentReschedule = async () => {
    await intelligentRescheduleOverdue();
    setExpandedTask(null);
    setTimeout(() => setForceUpdate(prev => prev + 1), 0);
  };

  const FilterButton = ({ filter, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`group relative flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
        isActive
          ? `bg-gradient-to-r ${filter.gradient} text-white shadow-lg`
          : isDark
          ? 'bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 border border-gray-700/50'
          : 'bg-white/80 hover:bg-white text-gray-600 border border-gray-200/50 shadow-sm hover:shadow-md'
      } backdrop-blur-sm overflow-hidden`}
    >
      <filter.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 z-10 ${isActive ? 'text-white' : filter.iconColor}`} />
      
      {!isMobile && (
        <span className="text-xs sm:text-sm font-medium z-10">{filter.label}</span>
      )}
      
      <div className={`flex items-center justify-center min-w-[20px] h-5 sm:min-w-[24px] sm:h-6 text-xs font-bold rounded-full z-10 ${
        isActive 
          ? 'bg-white/25 text-white' 
          : isDark 
          ? 'bg-gray-700/80 text-gray-300' 
          : 'bg-gray-100/80 text-gray-600'
      }`}>
        {filter.count}
      </div>
      
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      )}
    </button>
  );

  // Enhanced Task Card with better action buttons
  const TaskCard = ({ task }) => {
    const today = new Date().toISOString().split('T')[0];
    const isOverdue = task.date < today;
    const riskLevel = getTaskRiskLevel(task);
    
    return (
      <div className={`group ${
        isDark ? 'bg-gray-800/40 hover:bg-gray-800/60' : 'bg-white/60 hover:bg-white/90'
      } rounded-2xl border ${
        isDark ? 'border-gray-700/30' : 'border-gray-200/30'
      } transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] backdrop-blur-xl overflow-hidden`}>
        
        <div className="p-4 sm:p-6">
          {/* Risk/Priority Indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {isOverdue && (
                <div className="px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white animate-pulse">
                  OVERDUE
                </div>
              )}
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getPriorityStyles(task.priority)}`}>
                {(task.priority || 'medium').toUpperCase()}
              </span>
            </div>
            {riskLevel === 'critical' && (
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-red-400" />
                <span className="text-xs text-red-400 font-semibold">CRITICAL</span>
              </div>
            )}
          </div>

          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">{task.categoryIcon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1 line-clamp-2`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {task.categoryName}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      ~{task.estimatedTime ? Math.ceil(task.estimatedTime / 60) : 1}h
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span className={`text-xs font-medium ${
                    isOverdue ? 'text-red-400' : isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Due {new Date(task.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
              
              {/* Always visible action buttons - NO EXPANDING */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleMarkComplete(task.id)}
                  className="group px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-1.5 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Complete</span>
                </button>
                
                <button
                  onClick={() => setShowReschedule(task)}
                  className="group px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-1.5 text-sm"
                >
                  <Calendar className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-300" />
                  <span>Reschedule</span>
                </button>

                {task.description && (
                  <button
                    onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                    className={`px-3 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-1.5 text-sm ${
                      isDark 
                        ? 'bg-gray-700/60 hover:bg-gray-700/80 text-gray-300' 
                        : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-700'
                    }`}
                  >
                    <span>Details</span>
                    <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${
                      expandedTask === task.id ? 'rotate-90' : ''
                    }`} />
                  </button>
                )}
              </div>

              {/* Expandable details section */}
              {expandedTask === task.id && task.description && (
                <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50/80'} backdrop-blur-sm`}>
                    <p className={`leading-relaxed text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {task.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // AI Insights Section
  const AIInsightsSection = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Brain className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg font-bold text-white">Smart Scheduling Insights</h3>
        </div>
        <p className="text-sm text-gray-400">
          AI-powered recommendations based on your work patterns and task complexity
        </p>
      </div>

      <div className="grid gap-4">
        {suggestedDates.slice(0, 5).map((suggestion, index) => (
          <div
            key={suggestion.date}
            className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
              isDark ? 'border-gray-700/50 bg-gray-800/20 hover:bg-gray-800/40' : 'border-gray-200/50 bg-white/40 hover:bg-white/70'
            } backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  index === 0 ? 'bg-emerald-400' : index < 2 ? 'bg-blue-400' : 'bg-gray-400'
                }`} />
                <div>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {suggestion.displayDate}
                  </p>
                  <p className="text-xs text-gray-500">Perfect for rescheduling</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 text-xs font-semibold rounded-full border ${getWorkloadStyles(suggestion.workload)}`}>
                  {suggestion.workload} day
                </div>
                {index === 0 && (
                  <div className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30 font-semibold">
                    Best Choice
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-gray-400" />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {suggestion.tasksCount} tasks
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock3 className="w-3 h-3 text-gray-400" />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {suggestion.totalHours}h total
                  </span>
                </div>
              </div>
              
              <span className="text-purple-400 font-medium">
                {95 - index * 5}% confidence
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Enhanced Reschedule Modal
  const RescheduleModal = ({ task, onClose }) => {
    if (!task) return null;
    
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className={`w-full max-w-4xl ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl rounded-3xl shadow-2xl max-h-[85vh] overflow-hidden border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
          {/* Header */}
          <div className={`p-4 sm:p-6 border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Reschedule Task
                  </h3>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
                    Find the perfect time for "{task.title}"
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-105 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-96">
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <h4 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Smart Recommendations
                </h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {suggestedDates.slice(0, 9).map((suggestion, index) => (
                  <button
                    key={suggestion.date}
                    onClick={() => handleReschedule(task.id, suggestion.date)}
                    className={`group p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden ${
                      isDark ? 'bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700/50' : 'bg-gray-50/80 hover:bg-white border border-gray-200/50'
                    } hover:shadow-xl`}
                  >
                    <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      index === 0 ? 'bg-emerald-400' : index < 3 ? 'bg-blue-400' : 'bg-gray-400'
                    }`} />
                    
                    <div className="mb-2 sm:mb-3">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <p className={`font-semibold text-base sm:text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {suggestion.displayDate}
                        </p>
                        {index === 0 && (
                          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/30 font-semibold">
                            Perfect
                          </span>
                        )}
                      </div>
                      
                      <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getWorkloadStyles(suggestion.workload)}`}>
                        {suggestion.workload === 'light' && <span className="mr-1">🟢</span>}
                        {suggestion.workload === 'medium' && <span className="mr-1">🟡</span>}
                        {suggestion.workload === 'heavy' && <span className="mr-1">🔴</span>}
                        {suggestion.workload} day
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          {suggestion.tasksCount} tasks
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock3 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          {suggestion.totalHours}h
                        </span>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Custom Date Selection */}
            <div className={`border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} pt-4 sm:pt-6`}>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                <h4 className={`text-base sm:text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Choose Custom Date
                </h4>
              </div>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  if (e.target.value) {
                    handleReschedule(task.id, e.target.value);
                  }
                }}
                className={`w-full max-w-xs p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 focus:scale-[1.02] ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700/50 text-white focus:border-blue-400 focus:bg-gray-800/80' 
                    : 'bg-white/80 border-gray-300/50 text-gray-900 focus:border-blue-500 focus:bg-white'
                } focus:outline-none focus:ring-4 focus:ring-blue-500/10 backdrop-blur-sm`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-h-scroll scrollbar-thin">
      {/* Enhanced Header */}
      <div className={`relative ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} flex-shrink-0`}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500" />
        </div>

        <div className="relative px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5">
          <div className="flex items-start gap-2 sm:gap-3">
            <button
              onClick={() => setCurrentView('calendar')}
              className={`flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                isDark
                  ? "bg-gray-800/60 hover:bg-gray-800/80 text-gray-300 border border-gray-700/50"
                  : "bg-white/60 hover:bg-white/80 text-gray-600 border border-gray-200/50"
              } backdrop-blur-sm shadow-lg`}
            >
              <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>

            <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl shadow-lg bg-gradient-to-br from-red-500 to-orange-600 shadow-red-500/25">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>

              <div className="min-w-0 flex-1 pt-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <h1 className={`text-base sm:text-lg lg:text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'} leading-tight`}>
                    <span className="inline sm:hidden">Alerts</span>
                    <span className="hidden sm:inline lg:hidden">Task Alerts</span>
                    <span className="hidden lg:inline">Task Alert Center</span>
                  </h1>
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {activeFilter === 'insights' ? `${suggestedDates.length} AI recommendations` : `${filteredTasks.length} task${filteredTasks.length !== 1 ? 's' : ''} need attention`}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-start gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Smart Reschedule */}
              {stats.overdue > 0 && (
                <button
                  onClick={handleIntelligentReschedule}
                  className="group flex items-center justify-center gap-1.5 h-9 sm:h-10 lg:h-11 px-2 sm:px-3 lg:px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-200 hover:scale-105 shadow-lg font-medium text-xs sm:text-sm"
                >
                  <RotateCcw size={14} className="sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-300" />
                  <span className="hidden min-[380px]:inline">Smart</span>
                  <span className="hidden sm:inline">Fix</span>
                  <span className={`flex items-center justify-center min-w-[16px] h-4 sm:min-w-[18px] sm:h-[18px] text-xs rounded-full font-semibold bg-white/20 text-white`}>
                    {stats.overdue}
                  </span>
                </button>
              )}
              
              {/* Clear Low Priority */}
              <button
                onClick={bulkMarkLowPriorityComplete}
                className="group flex items-center justify-center gap-1.5 h-9 sm:h-10 lg:h-11 px-2 sm:px-3 lg:px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all duration-200 hover:scale-105 shadow-lg font-medium text-xs sm:text-sm"
              >
                <Check size={14} className="sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden min-[380px]:inline">Clear</span>
                <span className="hidden sm:inline">Low</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className={`${isDark ? 'bg-gray-900/30' : 'bg-gray-50/30'} backdrop-blur-xl border-b ${isDark ? 'border-gray-700/30' : 'border-gray-200/30'} px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex-shrink-0`}>
        <div className={`${isMobile ? 'flex overflow-x-auto gap-2 sm:gap-3 pb-2' : 'flex flex-wrap gap-2 sm:gap-3 justify-center'} scrollbar-none`}>
          {filters.map((filter) => (
            <div key={filter.id} className={isMobile ? 'flex-shrink-0' : ''}>
              <FilterButton
                filter={filter}
                isActive={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              />
            </div>
          ))}
        </div>
        
        {/* Filter Description */}
        <div className="mt-2 px-2">
          <p className="text-xs text-gray-500">
            {filters.find(f => f.id === activeFilter)?.description}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">          
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {/* Content based on active filter */}
            {activeFilter === 'insights' ? (
              <div className="p-3 sm:p-4 lg:p-6 pb-20 sm:pb-24">
                <AIInsightsSection />
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 sm:p-12">
                <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6">
                  <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-400" />
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {activeFilter === 'intervention' ? 'All Under Control!' : 'Nothing Here!'}
                </h3>
                <p className={`text-center text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {activeFilter === 'intervention' 
                    ? 'No critical tasks need immediate attention.' 
                    : `No ${filters.find(f => f.id === activeFilter)?.label.toLowerCase()} tasks found.`}
                  <br />
                  You're staying organized like a pro!
                </p>
              </div>
            ) : (
              <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 pb-20 sm:pb-24">
                {filteredTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Desktop Sidebar - Only show for task lists, not insights */}
        {!isMobile && activeFilter !== 'insights' && (
          <div className={`w-80 ${isDark ? 'bg-gray-900/30' : 'bg-gray-50/30'} backdrop-blur-xl border-l ${isDark ? 'border-gray-700/30' : 'border-gray-200/30'} flex flex-col overflow-hidden`}>
            <div className="p-6">
              {/* <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Quick Actions
                </h3>
              </div> */}
              
              {/* Quick Action Buttons */}
              {/* <div className="space-y-3 mb-6">
                {stats.overdue > 0 && (
                  <button
                    onClick={handleIntelligentReschedule}
                    className="w-full p-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <RotateCcw className="w-5 h-5" />
                      <div className="text-left">
                        <div className="text-sm font-bold">Smart Reschedule</div>
                        <div className="text-xs text-blue-100">Fix {stats.overdue} overdue tasks</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
                
                <button
                  onClick={bulkMarkLowPriorityComplete}
                  className="w-full p-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-sm font-bold">Clear Low Priority</div>
                      <div className="text-xs text-emerald-100">Bulk complete tasks</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div> */}

              {/* Best Reschedule Days Preview */}
              <div className="mb-6">
                <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Best Reschedule Days
                </h4>
                
                <div className="space-y-3 max-h-90 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                  {suggestedDates.slice(0, 5).map((suggestion, index) => (
                    <div
                      key={suggestion.date}
                      className={`group p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] cursor-default ${
                        isDark ? 'border-gray-700/50 bg-gray-800/20 hover:bg-gray-800/40' : 'border-gray-200/50 bg-white/40 hover:bg-white/70'
                      } backdrop-blur-sm`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            index === 0 ? 'bg-emerald-400' : index < 3 ? 'bg-blue-400' : 'bg-gray-400'
                          }`} />
                          <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {suggestion.displayDate}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1 text-xs font-semibold rounded-full border ${getWorkloadStyles(suggestion.workload)}`}>
                            {suggestion.workload}
                          </div>
                          {index === 0 && (
                            <div className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30 font-semibold">
                              Best
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            {suggestion.tasksCount} tasks
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock3 className="w-3 h-3 text-gray-400" />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            {suggestion.totalHours}h total
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Reschedule Modal */}
      <RescheduleModal 
        task={showReschedule}
        onClose={() => setShowReschedule(null)}
      />

      <style jsx>{`
        /* Custom breakpoint utilities */
        @media (min-width: 360px) {
          .min-\[360px\]\:hidden {
            display: none;
          }
          .min-\[360px\]\:inline {
            display: inline;
          }
        }

        @media (min-width: 380px) {
          .min-\[380px\]\:hidden {
            display: none;
          }
          .min-\[380px\]\:inline {
            display: inline;
          }
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-none {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        /* Thin scrollbar for sidebar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }

        .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 2px;
        }

        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }

        /* Line clamp utility */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default NotificationsView;
import { useCallback } from 'react';
import { useApp } from '../context/AppProvider';
import { useUI } from '../context/UIProvider'; 

export const useNotificationManager = () => {
  const { categories, setCategories } = useApp();
  const { toast, confirm } = useUI(); // NEW

  const findTaskById = useCallback((taskId) => {
    for (const category of categories) {
      const task = category.tasks.find(t => t.id === taskId);
      if (task) {
        return { task, categoryId: category.id };
      }
    }
    return null;
  }, [categories]);

  const updateTask = useCallback((taskId, updates) => {
    setCategories(prevCategories => {
      const newCategories = prevCategories.map(category => ({
        ...category,
        tasks: category.tasks.map(task =>
          task.id === taskId ? { ...task, ...updates } : task
        )
      }));
      return [...newCategories];
    });
  }, [setCategories]);
  const getDailyWorkload = useCallback((targetDate) => {
    const tasksOnDate = categories.flatMap(cat => 
      cat.tasks.filter(task => task.date === targetDate && !task.completed)
    );
    
    const totalHours = tasksOnDate.reduce((sum, task) => {
      return sum + (task.estimatedTime ? Math.ceil(task.estimatedTime / 60) : 1);
    }, 0);
    
    return {
      tasks: tasksOnDate,
      totalHours,
      tasksCount: tasksOnDate.length,
      workload: totalHours <= 2 ? 'light' : totalHours <= 4 ? 'medium' : 'heavy'
    };
  }, [categories]);

  const toggleTaskComplete =  useCallback(async (taskId) => {
    const taskData = findTaskById(taskId);
    const confirmed = await confirm.custom({
      title: 'Complete Task',
      message: `Mark "${taskData.task.title}" as complete`,
      confirmText: 'Complete It',
      cancelText: 'Cancel',
      type: 'primary'
    });

    
    if (taskData && confirmed) {
      updateTask(taskId, { completed: !taskData.task.completed });
      
      // NEW: Show success toast
      if (!taskData.task.completed) {
        toast.success(`Task "${taskData.task.title}" completed!`, {
          duration: 3000
        });
      } else {
        toast.info(`Task "${taskData.task.title}" reopened`, {
          duration: 3000
        });
      }
    }
  }, [findTaskById, updateTask, toast]);

  const rescheduleTask = useCallback(async (taskId, newDate) => {
    const taskData = findTaskById(taskId);
    if (!taskData) return false;

    // NEW: Ask for confirmation
    const confirmed = await confirm.custom({
      title: 'Reschedule Task',
      message: `Move "${taskData.task.title}" to ${new Date(newDate).toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      })}?`,
      confirmText: 'Reschedule',
      cancelText: 'Keep Current Date',
      type: 'primary'
    });

    if (confirmed) {
      console.log('Rescheduling task:', taskId, 'to date:', newDate);
      
      setCategories(prevCategories => {
        const newCategories = prevCategories.map(category => ({
          ...category,
          tasks: category.tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, date: newDate };
            }
            return task;
          })
        }));
        return [...newCategories];
      });

      // NEW: Show success toast
      toast.success(`Task rescheduled successfully!`, {
        message: `"${taskData.task.title}" moved to ${new Date(newDate).toLocaleDateString()}`,
        duration: 4000
      });
      
      return true;
    }
    
    return false;
  }, [setCategories, findTaskById, confirm, toast]);

  const intelligentRescheduleOverdue = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0];
    const overdueTasks = categories.flatMap(cat => 
      cat.tasks.filter(task => !task.completed && task.date < today)
    );

    if (overdueTasks.length === 0) {
      toast.info('No overdue tasks to reschedule!');
      return;
    }

    // NEW: Ask for confirmation
    const confirmed = await confirm.custom({
      title: 'Smart Reschedule',
      message: `Automatically reschedule ${overdueTasks.length} overdue task${overdueTasks.length > 1 ? 's' : ''} across the next 14 days?`,
      confirmText: 'Reschedule All',
      cancelText: 'Cancel',
      type: 'primary'
    });

    if (!confirmed) return;

    // ... existing intelligent reschedule logic ...
    const sortedTasks = overdueTasks.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority] || 2;
      const bPriority = priorityOrder[b.priority] || 2;
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      const aTime = a.estimatedTime || 60;
      const bTime = b.estimatedTime || 60;
      return aTime - bTime;
    });

    // Generate available dates and distribute tasks (existing logic)
    const availableDates = [];
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      const workload = getDailyWorkload(dateString);
      availableDates.push({
        date: dateString,
        ...workload
      });
    }

    availableDates.sort((a, b) => {
      if (a.totalHours !== b.totalHours) {
        return a.totalHours - b.totalHours;
      }
      return a.date.localeCompare(b.date);
    });

    const updates = [];
    let dateIndex = 0;
    const maxTasksPerDay = 3;
    const maxHoursPerDay = 5;
    
    for (const task of sortedTasks) {
      const taskHours = Math.ceil((task.estimatedTime || 60) / 60);
      let placed = false;
      
      for (let i = dateIndex; i < availableDates.length && !placed; i++) {
        const currentDate = availableDates[i];
        
        if (currentDate.tasksCount < maxTasksPerDay && 
            (currentDate.totalHours + taskHours) <= maxHoursPerDay) {
          
          updates.push({
            taskId: task.id,
            newDate: currentDate.date
          });
          
          currentDate.tasksCount += 1;
          currentDate.totalHours += taskHours;
          currentDate.workload = currentDate.totalHours <= 2 ? 'light' : 
                                currentDate.totalHours <= 4 ? 'medium' : 'heavy';
          
          placed = true;
          
          if (currentDate.totalHours >= 4) {
            dateIndex = i + 1;
          }
        }
      }
      
      if (!placed && dateIndex < availableDates.length) {
        const fallbackDate = availableDates[dateIndex];
        updates.push({
          taskId: task.id,
          newDate: fallbackDate.date
        });
        
        fallbackDate.tasksCount += 1;
        fallbackDate.totalHours += taskHours;
        dateIndex++;
      }
    }

    // Apply updates
    setCategories(prevCategories => {
      const newCategories = prevCategories.map(category => ({
        ...category,
        tasks: category.tasks.map(task => {
          const update = updates.find(u => u.taskId === task.id);
          return update ? { ...task, date: update.newDate } : task;
        })
      }));
      return [...newCategories];
    });

    // NEW: Show success toast
    toast.success('Smart reschedule completed!', {
      message: `${updates.length} tasks redistributed across ${new Set(updates.map(u => u.newDate)).size} days`,
      duration: 5000
    });
  }, [categories, setCategories, getDailyWorkload, confirm, toast]);

  const bulkMarkLowPriorityComplete = useCallback(async () => {
    const lowPriorityTasks = categories.flatMap(cat => 
      cat.tasks.filter(task => !task.completed && task.priority === 'low')
    );

    if (lowPriorityTasks.length === 0) {
      toast.info('No low priority tasks to complete!');
      return;
    }

    // NEW: Ask for confirmation
    const confirmed = await confirm.delete(
      'Complete Low Priority Tasks',
      `Mark all ${lowPriorityTasks.length} low priority task${lowPriorityTasks.length > 1 ? 's' : ''} as complete?`
    );

    if (!confirmed) return;

    setCategories(prevCategories => {
      const newCategories = prevCategories.map(category => ({
        ...category,
        tasks: category.tasks.map(task =>
          (!task.completed && task.priority === 'low')
            ? { ...task, completed: true }
            : task
        )
      }));
      return [...newCategories];
    });

    // NEW: Show success toast
    toast.success('Low priority tasks completed!', {
      message: `${lowPriorityTasks.length} tasks marked as complete`,
      duration: 4000
    });
  }, [setCategories, categories, confirm, toast]);

  // ... rest of existing methods remain the same
  

  const getTasksByFilter = useCallback((filter) => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    
    const allTasks = categories.flatMap(cat => 
      cat.tasks.map(task => ({
        ...task,
        categoryId: cat.id,
        categoryName: cat.name,
        categoryColor: cat.color,
        categoryIcon: cat.icon
      }))
    );

    const incompleteTasks = allTasks.filter(task => !task.completed);
    
    let filteredResults;
    switch (filter) {
      case 'overdue':
        filteredResults = incompleteTasks.filter(task => task.date < today);
        break;
      case 'today':
        filteredResults = incompleteTasks.filter(task => task.date === today);
        break;
      case 'upcoming':
        filteredResults = incompleteTasks.filter(task => task.date >= tomorrowString);
        break;
      case 'high':
        filteredResults = incompleteTasks.filter(task => task.priority === 'high');
        break;
      case 'all':
      default:
        filteredResults = incompleteTasks;
        break;
    }
    
    return filteredResults;
  }, [categories]);

  const getOptimalRescheduleDates = useCallback(() => {
    const suggestions = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      const workload = getDailyWorkload(dateString);
      
      suggestions.push({
        date: dateString,
        displayDate: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        ...workload
      });
    }
    
    return suggestions.sort((a, b) => {
      const workloadOrder = { light: 1, medium: 2, heavy: 3 };
      const aWorkload = workloadOrder[a.workload];
      const bWorkload = workloadOrder[b.workload];
      
      if (aWorkload !== bWorkload) {
        return aWorkload - bWorkload;
      }
      
      return a.date.localeCompare(b.date);
    });
  }, [getDailyWorkload]);

  const getTaskStats = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    
    const allTasks = categories.flatMap(cat => cat.tasks);
    const incompleteTasks = allTasks.filter(task => !task.completed);
    
    return {
      total: incompleteTasks.length,
      overdue: incompleteTasks.filter(task => task.date < today).length,
      today: incompleteTasks.filter(task => task.date === today).length,
      upcoming: incompleteTasks.filter(task => task.date >= tomorrowString).length,
      highPriority: incompleteTasks.filter(task => task.priority === 'high').length
    };
  }, [categories]);

  return {
    toggleTaskComplete,
    rescheduleTask,
    intelligentRescheduleOverdue,
    bulkMarkLowPriorityComplete,
    getTasksByFilter,
    getOptimalRescheduleDates,
    getTaskStats,
    getDailyWorkload,
    updateTask,
    findTaskById
  };
};

export default useNotificationManager;
// hooks/useTaskManager.js - Task management logic
import { useApp } from '../context/AppProvider';
import { useUI } from '../context/UIProvider';
import { dateUtils } from '../utils/dateUtils';

export const useTaskManager = () => {
  const { 
    categories, 
    setCategories, 
    openModal, 
    closeModal,
    editingTask,
    selectedDate
  } = useApp();
  const { toast, confirm } = useUI();

  // Add new task
  const handleAddTask = (dateString = null) => {
    const date = dateString || dateUtils.formatDate(new Date());
    
    openModal('isTaskModalOpen', { 
      selectedDate: date,
      editingTask: null 
    });
  };

  // Edit existing task
  const handleEditTask = (task) => {
    const taskCategory = categories.find(cat => 
      cat.tasks.some(t => t.id === task.id)
    );
    
    const editingTaskData = {
      ...task,
      categoryId: taskCategory?.id || categories[0]?.id
    };

    openModal('isTaskModalOpen', {
      editingTask: editingTaskData,
      selectedDate: task.date
    });
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    const taskData = findTaskById(taskId);
    if (!taskData) return;

    // Ask for confirmation
    const confirmed = await confirm.delete(
      'Delete Task',
      `Are you sure you want to delete "${taskData.task.title}"?`
    );

    if (!confirmed) return;

    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        tasks: category.tasks.filter(task => task.id !== taskId)
      }))
    );

    // Show success toast
    toast.success(`Task "${taskData.task.title}" deleted`, {
      duration: 3000
    });
  };

  // Toggle task completion
  const handleToggleTask = (taskId) => {
    const taskData = findTaskById(taskId);
    if (!taskData) return;

    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        tasks: category.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      }))
    );

    // Show appropriate toast
    if (!taskData.task.completed) {
      toast.success(`Task "${taskData.task.title}" completed!`, {
        duration: 3000
      });
    } else {
      toast.info(`Task "${taskData.task.title}" reopened`, {
        duration: 3000
      });
    }
  };

  // Save task (create or update)
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      updateExistingTask(taskData);
    } else {
      createNewTask(taskData);
    }
    
    closeModal('isTaskModalOpen');
  };

  // Update existing task
  const updateExistingTask = (taskData) => {
    const oldTaskData = findTaskById(editingTask.id);
    if (!oldTaskData) return;

    // First, update the task data
    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        tasks: category.tasks.map(task => {
          if (task.id === editingTask.id) {
            return {
              ...task,
              ...taskData
            };
          }
          return task;
        })
      }))
    );

    // Handle category change if needed
    const currentCategory = categories.find(cat => 
      cat.tasks.some(t => t.id === editingTask.id)
    );

    if (currentCategory && currentCategory.id !== taskData.categoryId) {
      setCategories(prevCategories => {
        // Remove task from old category
        const withTaskRemoved = prevCategories.map(category => ({
          ...category,
          tasks: category.tasks.filter(task => task.id !== editingTask.id)
        }));

        // Add task to new category
        return withTaskRemoved.map(category => {
          if (category.id === taskData.categoryId) {
            return {
              ...category,
              tasks: [...category.tasks, {
                id: editingTask.id,
                ...taskData,
                completed: editingTask.completed
              }]
            };
          }
          return category;
        });
      });
    }

    // Show success toast
    toast.success(`Task "${taskData.title}" updated successfully!`, {
      duration: 3000
    });
  };

  // Create new task
  const createNewTask = (taskData) => {
    const newTask = {
      id: `t${Date.now()}`,
      ...taskData,
      completed: false
    };

    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === taskData.categoryId
          ? { ...category, tasks: [...category.tasks, newTask] }
          : category
      )
    );

    // Show success toast
    toast.success(`Task "${taskData.title}" created successfully!`, {
      duration: 3000
    });
  };

  // Duplicate task
  const handleDuplicateTask = async (taskId) => {
    const taskData = findTaskById(taskId);
    if (!taskData) return;

    const confirmed = await confirm.custom({
      title: 'Duplicate Task',
      message: `Create a copy of "${taskData.task.title}"?`,
      confirmText: 'Duplicate',
      cancelText: 'Cancel',
      type: 'primary'
    });

    if (!confirmed) return;

    const duplicatedTask = {
      ...taskData.task,
      id: `t${Date.now()}`,
      title: `${taskData.task.title} (Copy)`,
      completed: false
    };

    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === taskData.categoryId
          ? { ...category, tasks: [...category.tasks, duplicatedTask] }
          : category
      )
    );

    // Show success toast
    toast.success(`Task duplicated successfully!`, {
      message: `Created "${duplicatedTask.title}"`,
      duration: 3000
    });
  };

  // Mark multiple tasks as complete
  const handleBulkComplete = async (taskIds) => {
    if (taskIds.length === 0) return;

    const confirmed = await confirm.custom({
      title: 'Complete Multiple Tasks',
      message: `Mark ${taskIds.length} task${taskIds.length > 1 ? 's' : ''} as complete?`,
      confirmText: 'Complete All',
      cancelText: 'Cancel',
      type: 'primary'
    });

    if (!confirmed) return;

    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        tasks: category.tasks.map(task =>
          taskIds.includes(task.id) ? { ...task, completed: true } : task
        )
      }))
    );

    // Show success toast
    toast.success(`${taskIds.length} task${taskIds.length > 1 ? 's' : ''} completed!`, {
      duration: 4000
    });
  };

  // Delete multiple tasks
  const handleBulkDelete = async (taskIds) => {
    if (taskIds.length === 0) return;

    const confirmed = await confirm.delete(
      'Delete Multiple Tasks',
      `Are you sure you want to delete ${taskIds.length} task${taskIds.length > 1 ? 's' : ''}?`
    );

    if (!confirmed) return;

    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        tasks: category.tasks.filter(task => !taskIds.includes(task.id))
      }))
    );

    // Show success toast
    toast.success(`${taskIds.length} task${taskIds.length > 1 ? 's' : ''} deleted`, {
      duration: 4000
    });
  };

  // Helper function to find task by ID
  const findTaskById = (taskId) => {
    for (const category of categories) {
      const task = category.tasks.find(t => t.id === taskId);
      if (task) {
        return { task, categoryId: category.id };
      }
    }
    return null;
  };

  // Update task
  const updateTask = (taskId, updates) => {
    setCategories(prevCategories => {
      const newCategories = prevCategories.map(category => ({
        ...category,
        tasks: category.tasks.map(task =>
          task.id === taskId ? { ...task, ...updates } : task
        )
      }));
      return [...newCategories];
    });
  };

  return {
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleToggleTask,
    handleSaveTask,
    handleDuplicateTask,
    handleBulkComplete,
    handleBulkDelete,
    findTaskById,
    updateTask
  };
};
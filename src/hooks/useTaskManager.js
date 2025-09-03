// hooks/useTaskManager.js - Task management logic
import { useApp } from '../context/AppProvider';
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
  const handleDeleteTask = (taskId) => {
    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        tasks: category.tasks.filter(task => task.id !== taskId)
      }))
    );
  };

  // Toggle task completion
  const handleToggleTask = (taskId) => {
    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        tasks: category.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      }))
    );
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
  };

  return {
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleToggleTask,
    handleSaveTask
  };
};
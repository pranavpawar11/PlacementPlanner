// hooks/useCategoryManager.js - Category management logic
import { useApp } from '../context/AppProvider';
import { useUI } from '../context/UIProvider';

export const useCategoryManager = () => {
  const { 
    categories, 
    setCategories, 
    openModal, 
    closeModal,
    setSelectedCategory,
    selectedCategory
  } = useApp();
  const { toast, confirm } = useUI();

  // Add new category
  const handleAddCategory = () => {
    openModal('isCategoryModalOpen');
  };

  // Save category
  const handleSaveCategory = (categoryData) => {
    const newCategory = {
      id: `c${Date.now()}`,
      name: categoryData.name,
      color: categoryData.color,
      icon: categoryData.icon || '📁',
      tasks: []
    };

    setCategories(prevCategories => [...prevCategories, newCategory]);
    closeModal('isCategoryModalOpen');
    
    // Show success toast
    toast.success(`Category "${categoryData.name}" created successfully!`, {
      duration: 3000
    });
  };

  // Select/deselect category for filtering
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    
    if (categoryId === 'all') {
      toast.info('Showing all categories', { duration: 2000 });
    } else {
      const category = getCategoryById(categoryId);
      if (category) {
        toast.info(`Filtered by "${category.name}"`, { duration: 2000 });
      }
    }
  };

  // Delete category
  const handleDeleteCategory = async (categoryId) => {
    const category = getCategoryById(categoryId);
    if (!category) return;

    const taskCount = category.tasks.length;
    const hasIncompleteTasks = category.tasks.some(task => !task.completed);

    // Ask for confirmation
    const confirmed = await confirm.delete(
      'Delete Category',
      `Are you sure you want to delete "${category.name}"? ${
        taskCount > 0 
          ? `This will also delete ${taskCount} task${taskCount > 1 ? 's' : ''}${
              hasIncompleteTasks ? ' (including incomplete ones)' : ''
            }.`
          : ''
      }`
    );

    if (!confirmed) return;

    setCategories(prevCategories =>
      prevCategories.filter(cat => cat.id !== categoryId)
    );
    
    // Reset selected category if the deleted one was selected
    if (selectedCategory === categoryId) {
      setSelectedCategory('all');
    }

    // Show success toast
    toast.success(`Category "${category.name}" deleted`, {
      message: taskCount > 0 ? `${taskCount} task${taskCount > 1 ? 's' : ''} also removed` : undefined,
      duration: 4000
    });
  };

  // Update category
  const handleUpdateCategory = async (categoryId, updates) => {
    const category = getCategoryById(categoryId);
    if (!category) return;

    setCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.id === categoryId
          ? { ...cat, ...updates }
          : cat
      )
    );

    // Show success toast
    toast.success(`Category "${updates.name || category.name}" updated!`, {
      duration: 3000
    });
  };

  // Duplicate category
  const handleDuplicateCategory = async (categoryId) => {
    const category = getCategoryById(categoryId);
    if (!category) return;

    const confirmed = await confirm.custom({
      title: 'Duplicate Category',
      message: `Create a copy of "${category.name}" with all its tasks?`,
      confirmText: 'Duplicate',
      cancelText: 'Cancel',
      type: 'primary'
    });

    if (!confirmed) return;

    const duplicatedCategory = {
      id: `c${Date.now()}`,
      name: `${category.name} (Copy)`,
      color: category.color,
      icon: category.icon,
      tasks: category.tasks.map(task => ({
        ...task,
        id: `t${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        completed: false // Reset completion status for duplicated tasks
      }))
    };

    setCategories(prevCategories => [...prevCategories, duplicatedCategory]);

    // Show success toast
    toast.success(`Category duplicated successfully!`, {
      message: `Created "${duplicatedCategory.name}" with ${category.tasks.length} task${category.tasks.length > 1 ? 's' : ''}`,
      duration: 4000
    });
  };

  // Get category by ID
  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.id === categoryId);
  };

  // Get tasks by category
  const getTasksByCategory = (categoryId) => {
    const category = getCategoryById(categoryId);
    return category ? category.tasks : [];
  };

  // Get category statistics
  const getCategoryStats = (categoryId) => {
    const category = getCategoryById(categoryId);
    if (!category) return null;

    const tasks = category.tasks;
    const completed = tasks.filter(task => task.completed).length;
    const incomplete = tasks.length - completed;
    const highPriority = tasks.filter(task => task.priority === 'high' && !task.completed).length;

    return {
      total: tasks.length,
      completed,
      incomplete,
      highPriority,
      completionRate: tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0
    };
  };

  return {
    categories,
    handleAddCategory,
    handleSaveCategory,
    handleSelectCategory,
    handleDeleteCategory,
    handleUpdateCategory,
    handleDuplicateCategory,
    getCategoryById,
    getTasksByCategory,
    getCategoryStats
  };
};
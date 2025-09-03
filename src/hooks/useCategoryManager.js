// hooks/useCategoryManager.js - Category management logic
import { useApp } from '../context/AppProvider';

export const useCategoryManager = () => {
  const { 
    categories, 
    setCategories, 
    openModal, 
    closeModal,
    setSelectedCategory,
    selectedCategory
  } = useApp();

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
  };

  // Select/deselect category for filtering
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Delete category (optional - you might want to add this)
  const handleDeleteCategory = (categoryId) => {
    setCategories(prevCategories =>
      prevCategories.filter(category => category.id !== categoryId)
    );
    
    // Reset selected category if the deleted one was selected
    if (selectedCategory === categoryId) {
      setSelectedCategory('all');
    }
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

  return {
    categories,
    handleAddCategory,
    handleSaveCategory,
    handleSelectCategory,
    handleDeleteCategory,
    getCategoryById,
    getTasksByCategory
  };
};
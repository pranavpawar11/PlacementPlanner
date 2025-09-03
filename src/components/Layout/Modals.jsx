// components/Layout/Modals.jsx - Modal management component
import React from 'react';
import { useApp } from '../../context/AppProvider';
import { useTaskManager } from '../../hooks/useTaskManager';
import { useCategoryManager } from '../../hooks/useCategoryManager';
import TaskModal from '../TaskModal';
import CategoryModal from '../CategoryModal';

const Modals = () => {
  const { 
    isTaskModalOpen, 
    isCategoryModalOpen, 
    editingTask, 
    selectedDate, 
    isDark,
    closeModal,
    categories
  } = useApp();
  
  const { handleSaveTask } = useTaskManager();
  const { handleSaveCategory } = useCategoryManager();

  return (
    <>
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => closeModal('isTaskModalOpen')}
        onSave={handleSaveTask}
        editingTask={editingTask}
        categories={categories}
        selectedDate={selectedDate}
        isDark={isDark}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => closeModal('isCategoryModalOpen')}
        onSave={handleSaveCategory}
        isDark={isDark}
      />
    </>
  );
};

export default Modals;
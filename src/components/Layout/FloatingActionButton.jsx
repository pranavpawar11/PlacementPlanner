// components/Layout/FloatingActionButton.jsx - Floating action button
import React from 'react';
import { Plus } from 'lucide-react';
import { useTaskManager } from '../../hooks/useTaskManager';

const FloatingActionButton = () => {
  const { handleAddTask } = useTaskManager();

  return (
    <button
      onClick={() => handleAddTask()}
      className="fixed bottom-25 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center z-40"
      style={{
        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.5)'
      }}
      aria-label="Add new task"
    >
      <Plus size={28} />
    </button>
  );
};

export default FloatingActionButton;
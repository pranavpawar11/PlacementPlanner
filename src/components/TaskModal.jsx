import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { dateUtils } from '../utils/dateUtils';

const TaskModal = ({ isOpen, onClose, onSave, editingTask, categories, isDark }) => {
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    date: dateUtils.formatDate(new Date())
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        categoryId: editingTask.categoryId,
        date: editingTask.date
      });
    } else {
      setFormData({
        title: '',
        categoryId: categories[0]?.id || '',
        date: dateUtils.formatDate(new Date())
      });
    }
  }, [editingTask, categories, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.categoryId) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-2xl p-6 w-full max-w-md shadow-2xl border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-gray-100 ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-500'} transition-colors`}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Task Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-gray-100' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Enter task title..."
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Category
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-gray-100' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-gray-100' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${
                isDark 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
            >
              {editingTask ? 'Update' : 'Add'} Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
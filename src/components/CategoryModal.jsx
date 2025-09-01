import React, { useState } from 'react';
import { X } from 'lucide-react';
import { theme } from '../utils/theme';

const CategoryModal = ({ isOpen, onClose, onSave, isDark }) => {
  const [formData, setFormData] = useState({
    name: '',
    color: 'bg-blue-500'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
      setFormData({ name: '', color: 'bg-blue-500' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-2xl p-6 w-full max-w-md shadow-2xl border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            Add New Category
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
              Category Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-gray-100' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="e.g., DSA, System Design..."
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {theme.categoryColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({...formData, color})}
                  className={`w-12 h-12 ${color} rounded-lg border-2 transition-all ${
                    formData.color === color 
                      ? 'border-white shadow-lg scale-110' 
                      : 'border-gray-300 hover:scale-105'
                  }`}
                />
              ))}
            </div>
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
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
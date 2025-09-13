import React from 'react';
import { BookOpen, X } from 'lucide-react';
import ResourceSection from './ResourceSection';
import EmptyResourcesState from './EmptyResourcesState';

const MobileResourcesOverlay = ({ resourcesByType, isDark, onClose }) => {
  const getResourceIcon = (type) => {
    const icons = {
      practice: '💻',
      tutorial: '📚',
      video: '🎥',
      article: '📄',
      course: '🎓',
      platform: '👥',
      guide: '📋'
    };
    return icons[type] || '🔗';
  };

  const totalResources = Object.values(resourcesByType).flat().length;

  return (
    <div className={`fixed inset-0 z-50 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl animate-in slide-in-from-right-2 duration-300`}>
      {/* Fixed Header */}
      <div className={`sticky top-0 px-4 py-4 border-b ${isDark ? 'border-gray-700/50 bg-gray-900/90' : 'border-gray-200/50 bg-white/90'} backdrop-blur-xl z-10`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
              <BookOpen size={18} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'} leading-tight`}>
                Learning Resources
              </h3>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
                {totalResources} study materials for today
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-110 ${
              isDark ? 'hover:bg-gray-800 text-gray-300 hover:text-gray-100' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            } border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin h-[calc(100vh-80px)]">
        <div className="p-4">
          {Object.keys(resourcesByType).length === 0 ? (
            <EmptyResourcesState isDark={isDark} />
          ) : (
            <div className="space-y-6">
              {Object.entries(resourcesByType).map(([type, resources]) => (
                <ResourceSection
                  key={type}
                  type={type}
                  resources={resources}
                  icon={getResourceIcon(type)}
                  isDark={isDark}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileResourcesOverlay;
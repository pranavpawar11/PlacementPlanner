import React from 'react';
import { BookOpen, X } from 'lucide-react';
import ResourceSection from './ResourceSection';
import EmptyResourcesState from './EmptyResourcesState';

const ResourcesSidebar = ({ resourcesByType, isDark, onClose }) => {
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
    <div className={`w-80 xl:w-96 border-l overflow-y-auto scrollbar-thin ${isDark ? 'border-gray-700/30 bg-gray-900/60' : 'border-gray-200/30 bg-gray-50/60'} backdrop-blur-xl animate-in slide-in-from-right-2 duration-300`}>
      {/* Header */}
      <div className={`sticky top-0 p-4 sm:p-6 border-b ${isDark ? 'border-gray-700/30 bg-gray-900/80' : 'border-gray-200/30 bg-gray-50/80'} backdrop-blur-xl z-10`}>
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
                Today's study materials
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              isDark ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-blue-50 text-blue-600 border border-blue-200'
            }`}>
              {totalResources} total
            </div>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
                isDark ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-200' : 'hover:bg-white text-gray-500 hover:text-gray-700'
              }`}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-6">
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
  );
};

export default ResourcesSidebar;
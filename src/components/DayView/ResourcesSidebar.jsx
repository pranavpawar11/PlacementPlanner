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
  const typeCount = Object.keys(resourcesByType).length;

  return (
    <div className={`w-80 xl:w-96 border-l overflow-hidden flex flex-col ${isDark ? 'border-gray-700/30 bg-gray-900/70' : 'border-gray-200/30 bg-gray-50/70'} backdrop-blur-2xl animate-in slide-in-from-right-2 duration-300`}>
      {/* Enhanced Header */}
      <div className={`p-6 border-b ${isDark ? 'border-gray-700/30 bg-gray-900/80' : 'border-gray-200/30 bg-gray-50/80'} backdrop-blur-xl flex-shrink-0`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-2xl shadow-lg ${isDark ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30' : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200/60'}`}>
              <BookOpen size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'} leading-tight`}>
                Learning Hub
              </h3>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
                Today's study materials
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
              isDark ? 'hover:bg-gray-800/80 text-gray-400 hover:text-gray-200' : 'hover:bg-white/80 text-gray-500 hover:text-gray-700'
            } border ${isDark ? 'border-gray-700/40' : 'border-gray-200/40'}`}
          >
            <X size={16} />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-3 rounded-xl border backdrop-blur-sm ${
            isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
          }`}>
            <div className={`text-lg font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {totalResources}
            </div>
            <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wide`}>
              Total Resources
            </div>
          </div>
          <div className={`p-3 rounded-xl border backdrop-blur-sm ${
            isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
          }`}>
            <div className={`text-lg font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {typeCount}
            </div>
            <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wide`}>
              Categories
            </div>
          </div>
        </div>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-6">
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

export default ResourcesSidebar;
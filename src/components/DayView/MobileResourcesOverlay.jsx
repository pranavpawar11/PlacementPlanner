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
    <div className={`fixed inset-0 z-50 ${isDark ? 'bg-gray-900/98' : 'bg-white/98'} backdrop-blur-2xl animate-in slide-in-from-right-2 duration-300`}>
      {/* Enhanced Header */}
      <div className={`sticky top-0 px-4 py-4 border-b ${isDark ? 'border-gray-700/40 bg-gray-900/95' : 'border-gray-200/40 bg-white/95'} backdrop-blur-2xl z-10`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-2xl shadow-lg ${isDark ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30' : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200/60'}`}>
              <BookOpen size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent' : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'} leading-tight`}>
                Learning Hub
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
                {totalResources} study resources available
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg ${
              isDark ? 'hover:bg-gray-800/80 text-gray-300 hover:text-gray-100 border border-gray-700/50' : 'hover:bg-gray-100/80 text-gray-600 hover:text-gray-900 border border-gray-200/50'
            } backdrop-blur-sm`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Resource Summary Pills */}
        {Object.keys(resourcesByType).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(resourcesByType).map(([type, resources]) => (
              <div key={type} className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-medium border backdrop-blur-sm ${
                isDark ? 'bg-gray-800/60 border-gray-700/50 text-gray-300' : 'bg-white/80 border-gray-200/60 text-gray-600'
              }`}>
                <span>{getResourceIcon(type)}</span>
                <span className="capitalize">{type.replace('-', ' ')}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                  isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  {resources.length}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin h-[calc(100vh-140px)]">
        <div className="p-4 pb-8">
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
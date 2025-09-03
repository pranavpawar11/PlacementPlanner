// components/Sidebar/Sidebar.jsx - Corrected sidebar using context
import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useApp } from '../../context/AppProvider';
import { useCategoryManager } from '../../hooks/useCategoryManager';
import { useProgressTracker } from '../../hooks/useProgressTracker';

const Sidebar = () => {
  // Get state and actions from context
  const {
    categories,
    isDark,
    isMobile,
    selectedCategory
  } = useApp();

  // Get category management functions
  const { handleAddCategory, handleSelectCategory } = useCategoryManager();

  // Get progress tracking data
  const categoriesWithProgress = useProgressTracker(categories);

  // Local state for sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (isMobile) {
    // Mobile layout - horizontal scrolling categories at bottom
    return (
      <div className={`w-full ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md p-4`}>
        <div className="flex items-center space-x-4 overflow-x-auto scrollbar-thin pb-2">
          {/* Add Category Button */}
          <button
            onClick={handleAddCategory}
            className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            aria-label="Add new category"
          >
            <Plus size={20} />
            <span className="text-xs mt-1 font-medium">Add</span>
          </button>

          {/* All Categories Filter */}
          <button
            onClick={() => handleSelectCategory('all')}
            className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all ${
              selectedCategory === 'all'
                ? `${isDark ? 'bg-blue-900/50 border-2 border-blue-500' : 'bg-blue-100 border-2 border-blue-500'}`
                : `${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`
            }`}
            aria-label="Show all categories"
          >
            <div className="w-6 h-6 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mb-1"></div>
            <span className={`text-xs font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              All
            </span>
          </button>

          {/* Category Items */}
          {categoriesWithProgress.map((category) => (
            <button
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all ${
                selectedCategory === category.id
                  ? `${isDark ? 'bg-blue-900/50 border-2 border-blue-500' : 'bg-blue-100 border-2 border-blue-500'}`
                  : `${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`
              }`}
              aria-label={`Select ${category.name} category`}
            >
              <div className={`w-6 h-6 ${category.color} rounded-full mb-1 relative`}>
                {/* Progress ring */}
                <svg className="absolute inset-0 w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={isDark ? '#374151' : '#E5E7EB'}
                    strokeWidth="2"
                    fill="none"
                    className="opacity-50"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 10}`}
                    strokeDashoffset={`${2 * Math.PI * 10 * (1 - category.progress / 100)}`}
                    className="text-white opacity-80 transition-all duration-300"
                  />
                </svg>
              </div>
              <span className={`text-xs font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} truncate max-w-full px-1`}>
                {category.name.length > 6 ? category.name.substring(0, 6) + '...' : category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Desktop layout - collapsible vertical sidebar
  return (
    <aside 
      className={`${isCollapsed ? 'w-20' : 'w-80'} ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm border-r ${isDark ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 ease-in-out relative z-10`}
    >
      {/* Modern Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`absolute ${isCollapsed ? '-right-4 top-2' : '-right-4 top-2'} z-20 w-8 h-8 rounded-full shadow-lg border-2 transition-all duration-300 hover:scale-110 group ${
          isDark 
            ? 'bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300 hover:text-white' 
            : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-600 hover:text-gray-800'
        }`}
        style={{
          boxShadow: isDark 
            ? '0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)' 
            : '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <div className="flex items-center justify-center w-full h-full">
          {isCollapsed ? (
            <ChevronRight 
              size={16} 
              className="transition-transform duration-200 group-hover:translate-x-0.5" 
            />
          ) : (
            <ChevronLeft 
              size={16} 
              className="transition-transform duration-200 group-hover:-translate-x-0.5" 
            />
          )}
        </div>
      </button>

      <div className={`overflow-y-auto scrollbar-thin h-full transition-all duration-300 ${isCollapsed ? 'px-3 pt-8 pb-6' : 'px-6 pt-6 pb-6'}`}>
        {/* Header */}
        <div className={`flex items-center mb-6 ${isCollapsed ? 'flex-col space-y-4' : 'justify-between'}`}>
          {!isCollapsed && (
            <h2 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} pr-8`}>
              Categories
            </h2>
          )}
          <button
            onClick={handleAddCategory}
            className={`${isCollapsed ? 'w-12 h-12 p-0' : 'p-2.5'} bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center`}
            title={isCollapsed ? "Add Category" : "Add new category"}
            aria-label="Add new category"
          >
            <Plus size={isCollapsed ? 24 : 18} />
          </button>
        </div>

        {/* All Categories Filter */}
        <div
          onClick={() => handleSelectCategory('all')}
          className={`${isCollapsed ? 'p-3' : 'p-4'} rounded-xl transition-all cursor-pointer hover:shadow-md mb-4 group ${
            selectedCategory === 'all'
              ? `${isDark ? 'bg-blue-900/30 border-blue-500' : 'bg-blue-50 border-blue-500'} border-2`
              : `${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`
          }`}
          title={isCollapsed ? "All Categories" : "Show all categories"}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleSelectCategory('all');
            }
          }}
        >
          {isCollapsed ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                <Menu size={16} className="text-white" />
              </div>
              <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} text-center`}>
                All
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
                <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  All Categories
                </span>
              </div>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {categoriesWithProgress.reduce((total, cat) => total + cat.totalTasks, 0)} tasks
              </span>
            </div>
          )}
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          {categoriesWithProgress.map((category, index) => (
            <div
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
              className={`${isCollapsed ? 'p-3' : 'p-4'} rounded-xl transition-all cursor-pointer hover:shadow-md transform hover:scale-[1.02] group ${
                selectedCategory === category.id
                  ? `${isDark ? 'bg-blue-900/30 border-blue-500 shadow-lg' : 'bg-blue-50 border-blue-500 shadow-lg'} border-2`
                  : `${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
              title={isCollapsed ? `${category.name} - ${category.completedTasks}/${category.totalTasks} (${category.progress}%)` : ""}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectCategory(category.id);
                }
              }}
            >
              {isCollapsed ? (
                // Collapsed view
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-8 h-8 ${category.color} rounded-full relative flex items-center justify-center`}>
                    {/* Progress ring for collapsed view */}
                    <svg className="absolute inset-0 w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke={isDark ? '#374151' : '#E5E7EB'}
                        strokeWidth="2"
                        fill="none"
                        className="opacity-50"
                      />
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 14}`}
                        strokeDashoffset={`${2 * Math.PI * 14 * (1 - category.progress / 100)}`}
                        className="text-white opacity-90 transition-all duration-300"
                      />
                    </svg>
                    <span className="text-xs font-bold text-white z-10">
                      {Math.round(category.progress)}
                    </span>
                  </div>
                  <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} text-center truncate w-full`}>
                    {category.name.length > 8 ? category.name.substring(0, 8) + '...' : category.name}
                  </span>
                </div>
              ) : (
                // Expanded view
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 ${category.color} rounded-full shadow-sm`}></div>
                      <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {category.name}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {category.completedTasks}/{category.totalTasks}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {category.progress}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className={`w-full ${isDark ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2.5 overflow-hidden`}>
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out shadow-inner"
                        style={{ 
                          width: `${category.progress}%`,
                          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                        }}
                      ></div>
                    </div>
                    
                    {/* Task Status Indicators */}
                    {category.totalTasks > 0 && (
                      <div className="flex justify-between items-center pt-1">
                        <div className="flex space-x-1">
                          {Array.from({ length: Math.min(category.totalTasks, 5) }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < category.completedTasks 
                                  ? 'bg-green-500' 
                                  : isDark ? 'bg-gray-600' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                          {category.totalTasks > 5 && (
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} ml-1`}>
                              +{category.totalTasks - 5}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {categoriesWithProgress.length === 0 && !isCollapsed && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <div className="mb-4">
              <div className={`w-16 h-16 mx-auto rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
                <Plus size={24} className="opacity-50" />
              </div>
            </div>
            <p className="text-lg font-medium mb-2">No categories yet</p>
            <p className="text-sm mb-4">Create your first category to get started</p>
            <button
              onClick={handleAddCategory}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              Add Category
            </button>
          </div>
        )}

        {/* Collapsed Empty State */}
        {categoriesWithProgress.length === 0 && isCollapsed && (
          <div className="text-center py-8">
            <div className={`w-12 h-12 mx-auto rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
              <Plus size={20} className={`${isDark ? 'text-gray-400' : 'text-gray-500'} opacity-50`} />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
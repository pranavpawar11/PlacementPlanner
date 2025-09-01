import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

// Import components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CalendarBoard from './components/CalendarBoard';
import DayView from './components/DayView';
import TaskModal from './components/TaskModal';
import CategoryModal from './components/CategoryModal';

// Import hooks
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';

// Import utils
import { dateUtils } from './utils/dateUtils';
import { theme } from './utils/theme';

const App = () => {
  const { isDark, toggleTheme } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [currentView, setCurrentView] = useState('calendar'); // 'calendar' or 'day'
  const [selectedDayData, setSelectedDayData] = useState(null);
  
  // Modal states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // Enhanced sample data with resource links
  const [categories, setCategories] = useLocalStorage('categories', [
    {
      id: 'c1',
      name: 'DSA',
      color: 'bg-blue-500',
      icon: '🧮',
      tasks: [
        {
          id: 't1',
          title: 'Solve 5 Array Problems',
          date: '2025-08-31',
          completed: false,
          description: 'Focus on sliding window and two-pointer techniques',
          priority: 'high',
          resources: [
            {
              type: 'practice',
              title: 'LeetCode Array Problems',
              url: 'https://leetcode.com/tag/array/',
              icon: '💻'
            },
            {
              type: 'tutorial',
              title: 'Array Algorithms Guide',
              url: 'https://www.geeksforgeeks.org/array-data-structure/',
              icon: '📚'
            }
          ],
          estimatedTime: 120,
          tags: ['arrays', 'sliding-window', 'two-pointers']
        },
        {
          id: 't2',
          title: 'Practice Binary Search',
          date: '2025-09-01',
          completed: true,
          description: 'Master binary search variations',
          priority: 'medium',
          resources: [
            {
              type: 'practice',
              title: 'Binary Search Problems',
              url: 'https://leetcode.com/tag/binary-search/',
              icon: '💻'
            }
          ],
          estimatedTime: 90,
          tags: ['binary-search', 'algorithms']
        },
        {
          id: 't5',
          title: 'Study Dynamic Programming',
          date: '2025-08-31',
          completed: false,
          description: 'Learn DP patterns and memoization',
          priority: 'high',
          resources: [
            {
              type: 'tutorial',
              title: 'DP Patterns Guide',
              url: 'https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews',
              icon: '📖'
            },
            {
              type: 'video',
              title: 'DP Video Series',
              url: 'https://www.youtube.com/playlist?list=PLrmLmBdmIlpsHaNTPP_jHHDx_os9ItYXr',
              icon: '🎥'
            }
          ],
          estimatedTime: 180,
          tags: ['dynamic-programming', 'memoization']
        }
      ]
    },
    {
      id: 'c2',
      name: 'System Design',
      color: 'bg-purple-500',
      icon: '🏗️',
      tasks: [
        {
          id: 't3',
          title: 'Study Load Balancers',
          date: '2025-08-31',
          completed: false,
          description: 'Understand different load balancing strategies',
          priority: 'medium',
          resources: [
            {
              type: 'article',
              title: 'Load Balancing Concepts',
              url: 'https://aws.amazon.com/what-is/load-balancing/',
              icon: '📄'
            },
            {
              type: 'course',
              title: 'System Design Course',
              url: 'https://www.educative.io/courses/grokking-the-system-design-interview',
              icon: '🎓'
            }
          ],
          estimatedTime: 120,
          tags: ['load-balancing', 'scalability']
        }
      ]
    },
    {
      id: 'c3',
      name: 'Mock Interviews',
      color: 'bg-green-500',
      icon: '🎯',
      tasks: [
        {
          id: 't4',
          title: 'Practice with peer',
          date: '2025-09-02',
          completed: false,
          description: 'Focus on behavioral questions and coding',
          priority: 'high',
          resources: [
            {
              type: 'platform',
              title: 'Pramp - Mock Interviews',
              url: 'https://www.pramp.com/',
              icon: '👥'
            },
            {
              type: 'guide',
              title: 'Interview Prep Guide',
              url: 'https://www.crackingthecodinginterview.com/',
              icon: '📋'
            }
          ],
          estimatedTime: 60,
          tags: ['interview', 'behavioral', 'coding']
        }
      ]
    }
  ]);

  // Check for mobile screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Navigation functions
  const handleViewDay = (day) => {
    setSelectedDayData(day);
    setCurrentView('day');
  };

  const handleBackToCalendar = () => {
    setCurrentView('calendar');
    setSelectedDayData(null);
  };

  // Task management functions
  const handleAddTask = (dateString = null) => {
    setSelectedDate(dateString || dateUtils.formatDate(new Date()));
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    const taskCategory = categories.find(cat => 
      cat.tasks.some(t => t.id === task.id)
    );
    
    setEditingTask({
      ...task,
      categoryId: taskCategory?.id || categories[0]?.id
    });
    setSelectedDate(task.date);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        tasks: category.tasks.filter(task => task.id !== taskId)
      }))
    );
  };

  const handleToggleTask = (taskId) => {
    setCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        tasks: category.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      }))
    );
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Update existing task
      setCategories(prevCategories =>
        prevCategories.map(category => ({
          ...category,
          tasks: category.tasks.map(task => {
            if (task.id === editingTask.id) {
              return {
                ...task,
                ...taskData
              };
            }
            return task;
          })
        }))
      );

      // Handle category change
      const currentCategory = categories.find(cat => 
        cat.tasks.some(t => t.id === editingTask.id)
      );

      if (currentCategory && currentCategory.id !== taskData.categoryId) {
        setCategories(prevCategories => {
          const withTaskRemoved = prevCategories.map(category => ({
            ...category,
            tasks: category.tasks.filter(task => task.id !== editingTask.id)
          }));

          return withTaskRemoved.map(category => {
            if (category.id === taskData.categoryId) {
              return {
                ...category,
                tasks: [...category.tasks, {
                  id: editingTask.id,
                  ...taskData,
                  completed: editingTask.completed
                }]
              };
            }
            return category;
          });
        });
      }
    } else {
      // Add new task
      const newTask = {
        id: `t${Date.now()}`,
        ...taskData,
        completed: false
      };

      setCategories(prevCategories =>
        prevCategories.map(category =>
          category.id === taskData.categoryId
            ? { ...category, tasks: [...category.tasks, newTask] }
            : category
        )
      );
    }
  };

  // Category management functions
  const handleAddCategory = () => {
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (categoryData) => {
    const newCategory = {
      id: `c${Date.now()}`,
      name: categoryData.name,
      color: categoryData.color,
      icon: categoryData.icon || '📁',
      tasks: []
    };

    setCategories(prevCategories => [...prevCategories, newCategory]);
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? 'all' : categoryId);
  };

  return (
    <div className={`min-h-screen ${isDark ? theme.colors.background.dark : theme.colors.background.light} transition-all duration-300`}>
      {/* Custom styles */}
      <style jsx global>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: ${isDark ? 'rgba(156, 163, 175, 0.5) transparent' : 'rgba(209, 213, 219, 0.8) transparent'};
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: ${isDark ? 'rgba(156, 163, 175, 0.5)' : 'rgba(209, 213, 219, 0.8)'};
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: ${isDark ? 'rgba(156, 163, 175, 0.7)' : 'rgba(209, 213, 219, 1)'};
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in {
          from { transform: scale(0.95); }
          to { transform: scale(1); }
        }
        @keyframes slide-in-from-left {
          from { transform: translateX(-10px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-from-right {
          from { transform: translateX(10px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .animate-in {
          animation: fade-in 0.2s ease-out;
        }
        .fade-in-0 {
          animation: fade-in 0.2s ease-out;
        }
        .zoom-in-95 {
          animation: zoom-in 0.2s ease-out;
        }
        .slide-in-from-left-2 {
          animation: slide-in-from-left 0.2s ease-out;
        }
        .slide-in-from-right-2 {
          animation: slide-in-from-right 0.2s ease-out;
        }
        
        @media (max-width: 768px) {
          .mobile-scroll::-webkit-scrollbar {
            display: none;
          }
          .mobile-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        }
      `}</style>
      
      <div className="flex flex-col h-screen">
        <Header
          isDark={isDark}
          toggleTheme={toggleTheme}
          onSearch={setSearchTerm}
          searchTerm={searchTerm}
          currentView={currentView}
          onBackToCalendar={handleBackToCalendar}
          selectedDayData={selectedDayData}
        />

        <div className="flex flex-1 overflow-hidden">
          {!isMobile &&  (
            <Sidebar
              categories={categories}
              onAddCategory={handleAddCategory}
              isDark={isDark}
              isMobile={isMobile}
              onSelectCategory={handleSelectCategory}
              selectedCategory={selectedCategory}
            />
          )}

          {currentView === 'calendar' ? (
            <CalendarBoard
              categories={categories}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onToggleTask={handleToggleTask}
              onViewDay={handleViewDay}
              isDark={isDark}
              isMobile={isMobile}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
            />
          ) : (
            <DayView
              categories={categories}
              selectedDayData={selectedDayData}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onToggleTask={handleToggleTask}
              onBackToCalendar={handleBackToCalendar}
              isDark={isDark}
              isMobile={isMobile}
            />
          )}
        </div>

        {/* Mobile sidebar for calendar view */}
        {isMobile && currentView === 'calendar' && (
          <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md`}>
            <Sidebar
              categories={categories}
              onAddCategory={handleAddCategory}
              isDark={isDark}
              isMobile={isMobile}
              onSelectCategory={handleSelectCategory}
              selectedCategory={selectedCategory}
            />
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile Calendar View */}
      {isMobile && currentView === 'calendar' && (
        <button
          onClick={() => handleAddTask()}
          className="fixed bottom-25 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center z-40"
          style={{
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.5)'
          }}
        >
          <Plus size={28} />
        </button>
      )}

      {/* Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
          setSelectedDate(null);
        }}
        onSave={handleSaveTask}
        editingTask={editingTask}
        categories={categories}
        selectedDate={selectedDate}
        isDark={isDark}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleSaveCategory}
        isDark={isDark}
      />
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Search, Moon, Sun, CheckCircle, Circle, Calendar, Target, BookOpen, Code, Brain, Cloud } from 'lucide-react';

const PlacementPrepPlanner = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('dsa');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  
  // Initial data structure
  const [categories, setCategories] = useState({
    dsa: {
      name: 'DSA',
      icon: Code,
      color: 'from-blue-500 to-purple-600',
      weeks: {
        'week1': {
          name: 'Week 1 - Arrays & Strings',
          topics: {
            'arrays': {
              name: 'Arrays',
              tasks: [
                { id: '1', text: 'Two Sum Problem', completed: false },
                { id: '2', text: 'Maximum Subarray', completed: false },
                { id: '3', text: 'Rotate Array', completed: false }
              ]
            },
            'strings': {
              name: 'Strings',
              tasks: [
                { id: '4', text: 'Valid Palindrome', completed: false },
                { id: '5', text: 'Longest Substring', completed: false }
              ]
            }
          }
        },
        'week2': {
          name: 'Week 2 - Linked Lists',
          topics: {
            'linkedlists': {
              name: 'Linked Lists',
              tasks: [
                { id: '6', text: 'Reverse Linked List', completed: false },
                { id: '7', text: 'Merge Two Lists', completed: false }
              ]
            }
          }
        }
      }
    },
    core: {
      name: 'Core Subjects',
      icon: BookOpen,
      color: 'from-green-500 to-teal-600',
      weeks: {
        'week1': {
          name: 'Week 1 - Java Fundamentals',
          topics: {
            'java': {
              name: 'Java',
              tasks: [
                { id: '8', text: 'OOP Concepts Review', completed: false },
                { id: '9', text: 'Collections Framework', completed: false },
                { id: '10', text: 'Multithreading Basics', completed: false }
              ]
            },
            'dbms': {
              name: 'DBMS',
              tasks: [
                { id: '11', text: 'Normalization Rules', completed: false },
                { id: '12', text: 'SQL Queries Practice', completed: false }
              ]
            }
          }
        }
      }
    },
    aptitude: {
      name: 'Aptitude & Communication',
      icon: Brain,
      color: 'from-orange-500 to-red-600',
      weeks: {
        'week1': {
          name: 'Week 1 - Quantitative Aptitude',
          topics: {
            'quant': {
              name: 'Quantitative',
              tasks: [
                { id: '13', text: 'Time & Work Problems', completed: false },
                { id: '14', text: 'Percentage & Profit Loss', completed: false }
              ]
            },
            'logical': {
              name: 'Logical Reasoning',
              tasks: [
                { id: '15', text: 'Blood Relations', completed: false },
                { id: '16', text: 'Series & Patterns', completed: false }
              ]
            }
          }
        }
      }
    },
    system: {
      name: 'System Design',
      icon: Target,
      color: 'from-purple-500 to-pink-600',
      weeks: {
        'week1': {
          name: 'Week 1 - System Design Basics',
          topics: {
            'basics': {
              name: 'Fundamentals',
              tasks: [
                { id: '17', text: 'Scalability Concepts', completed: false },
                { id: '18', text: 'Load Balancing', completed: false }
              ]
            }
          }
        }
      }
    },
    cloud: {
      name: 'Cloud Fundamentals',
      icon: Cloud,
      color: 'from-cyan-500 to-blue-600',
      weeks: {
        'week1': {
          name: 'Week 1 - Cloud Basics',
          topics: {
            'aws': {
              name: 'AWS Basics',
              tasks: [
                { id: '19', text: 'EC2 & S3 Overview', completed: false },
                { id: '20', text: 'IAM Concepts', completed: false }
              ]
            }
          }
        }
      }
    }
  });

  const [newTaskText, setNewTaskText] = useState('');
  const [newTopicName, setNewTopicName] = useState('');
  const [newWeekName, setNewWeekName] = useState('');
  const [showAddWeek, setShowAddWeek] = useState(false);
  const [showAddTopic, setShowAddTopic] = useState('');

  // Calculate progress for a category
  const calculateProgress = (category) => {
    let totalTasks = 0;
    let completedTasks = 0;
    
    Object.values(category.weeks).forEach(week => {
      Object.values(week.topics).forEach(topic => {
        totalTasks += topic.tasks.length;
        completedTasks += topic.tasks.filter(task => task.completed).length;
      });
    });
    
    return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  };

  // Toggle task completion
  const toggleTask = (weekId, topicId, taskId) => {
    setCategories(prev => ({
      ...prev,
      [activeCategory]: {
        ...prev[activeCategory],
        weeks: {
          ...prev[activeCategory].weeks,
          [weekId]: {
            ...prev[activeCategory].weeks[weekId],
            topics: {
              ...prev[activeCategory].weeks[weekId].topics,
              [topicId]: {
                ...prev[activeCategory].weeks[weekId].topics[topicId],
                tasks: prev[activeCategory].weeks[weekId].topics[topicId].tasks.map(task =>
                  task.id === taskId ? { ...task, completed: !task.completed } : task
                )
              }
            }
          }
        }
      }
    }));
  };

  // Add new task
  const addTask = (weekId, topicId) => {
    if (!newTaskText.trim()) return;
    
    const newTask = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false
    };
    
    setCategories(prev => ({
      ...prev,
      [activeCategory]: {
        ...prev[activeCategory],
        weeks: {
          ...prev[activeCategory].weeks,
          [weekId]: {
            ...prev[activeCategory].weeks[weekId],
            topics: {
              ...prev[activeCategory].weeks[weekId].topics,
              [topicId]: {
                ...prev[activeCategory].weeks[weekId].topics[topicId],
                tasks: [...prev[activeCategory].weeks[weekId].topics[topicId].tasks, newTask]
              }
            }
          }
        }
      }
    }));
    
    setNewTaskText('');
  };

  // Delete task
  const deleteTask = (weekId, topicId, taskId) => {
    setCategories(prev => ({
      ...prev,
      [activeCategory]: {
        ...prev[activeCategory],
        weeks: {
          ...prev[activeCategory].weeks,
          [weekId]: {
            ...prev[activeCategory].weeks[weekId],
            topics: {
              ...prev[activeCategory].weeks[weekId].topics,
              [topicId]: {
                ...prev[activeCategory].weeks[weekId].topics[topicId],
                tasks: prev[activeCategory].weeks[weekId].topics[topicId].tasks.filter(task => task.id !== taskId)
              }
            }
          }
        }
      }
    }));
  };

  // Add new topic
  const addTopic = (weekId) => {
    if (!newTopicName.trim()) return;
    
    const topicId = newTopicName.toLowerCase().replace(/\s+/g, '');
    
    setCategories(prev => ({
      ...prev,
      [activeCategory]: {
        ...prev[activeCategory],
        weeks: {
          ...prev[activeCategory].weeks,
          [weekId]: {
            ...prev[activeCategory].weeks[weekId],
            topics: {
              ...prev[activeCategory].weeks[weekId].topics,
              [topicId]: {
                name: newTopicName,
                tasks: []
              }
            }
          }
        }
      }
    }));
    
    setNewTopicName('');
    setShowAddTopic('');
  };

  // Add new week
  const addWeek = () => {
    if (!newWeekName.trim()) return;
    
    const weekId = `week${Object.keys(categories[activeCategory].weeks).length + 1}`;
    
    setCategories(prev => ({
      ...prev,
      [activeCategory]: {
        ...prev[activeCategory],
        weeks: {
          ...prev[activeCategory].weeks,
          [weekId]: {
            name: newWeekName,
            topics: {}
          }
        }
      }
    }));
    
    setNewWeekName('');
    setShowAddWeek(false);
  };

  // Filter tasks based on search
  const filterTasks = (tasks) => {
    if (!searchTerm) return tasks;
    return tasks.filter(task => 
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const currentCategory = categories[activeCategory];
  const progress = calculateProgress(currentCategory);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-4xl font-bold bg-gradient-to-r ${currentCategory.color} bg-clip-text text-transparent`}>
              Placement Prep Planner
            </h1>
            <p className={`text-lg mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Track your preparation progress across all domains
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 `}
              />
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-600'
              } hover:scale-110 transition-transform duration-200`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(categories).map(([key, category]) => {
            const IconComponent = category.icon;
            const categoryProgress = calculateProgress(category);
            
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === key
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                    : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.name}</span>
                <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                  {categoryProgress}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Progress Overview */}
        <div className={`bg-gradient-to-r ${currentCategory.color} rounded-xl p-6 mb-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{currentCategory.name}</h2>
              <p className="text-white/80">Overall Progress</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{progress}%</div>
              <div className="w-32 bg-white/20 rounded-full h-2 mt-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Week Button */}
        <div className="mb-6">
          {!showAddWeek ? (
            <button
              onClick={() => setShowAddWeek(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <Plus className="w-4 h-4" />
              Add New Week
            </button>
          ) : (
            <div className={`flex items-center gap-2 p-4 rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
            }`}>
              <input
                type="text"
                placeholder="Week name..."
                value={newWeekName}
                onChange={(e) => setNewWeekName(e.target.value)}
                className={`flex-1 px-3 py-2 rounded border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300'
                } focus:outline-none focus:ring-2 `}
              />
              <button
                onClick={addWeek}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddWeek(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Weeks and Topics */}
        <div className="space-y-6">
          {Object.entries(currentCategory.weeks).map(([weekId, week]) => (
            <div key={weekId} className={`rounded-xl overflow-hidden ${
              darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
            }`}>
              <div className={`bg-gradient-to-r ${currentCategory.color} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{week.name}</h3>
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
              
              <div className="p-6">
                {/* Topics */}
                <div className="space-y-4">
                  {Object.entries(week.topics).map(([topicId, topic]) => {
                    const filteredTasks = filterTasks(topic.tasks);
                    const topicProgress = topic.tasks.length > 0 
                      ? Math.round((topic.tasks.filter(t => t.completed).length / topic.tasks.length) * 100)
                      : 0;

                    return (
                      <div key={topicId} className={`border rounded-lg p-4 ${
                        darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className={`text-lg font-medium ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>{topic.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{topicProgress}% Complete</span>
                            <div className="w-20 bg-gray-300 rounded-full h-2">
                              <div 
                                className={`bg-gradient-to-r ${currentCategory.color} rounded-full h-2 transition-all duration-300`}
                                style={{ width: `${topicProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        {/* Tasks */}
                        <div className="space-y-2 mb-4">
                          {filteredTasks.map((task) => (
                            <div key={task.id} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                              task.completed
                                ? darkMode ? 'bg-gray-700' : 'bg-green-50'
                                : darkMode ? 'bg-gray-800' : 'bg-white'
                            }`}>
                              <button
                                onClick={() => toggleTask(weekId, topicId, task.id)}
                                className={`transition-colors duration-200 ${
                                  task.completed ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
                                }`}
                              >
                                {task.completed ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                              </button>
                              <span className={`flex-1 ${
                                task.completed 
                                  ? 'line-through text-gray-500' 
                                  : darkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {task.text}
                              </span>
                              <button
                                onClick={() => deleteTask(weekId, topicId, task.id)}
                                className="text-red-400 hover:text-red-600 transition-colors duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Add Task */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add new task..."
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addTask(weekId, topicId)}
                            className={`flex-1 px-3 py-2 rounded border ${
                              darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 placeholder-gray-500'
                            } focus:outline-none focus:ring-2 `}
                          />
                          <button
                            onClick={() => addTask(weekId, topicId)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add Topic */}
                <div className="mt-4">
                  {showAddTopic !== weekId ? (
                    <button
                      onClick={() => setShowAddTopic(weekId)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      Add Topic
                    </button>
                  ) : (
                    <div className={`flex items-center gap-2 p-4 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <input
                        type="text"
                        placeholder="Topic name..."
                        value={newTopicName}
                        onChange={(e) => setNewTopicName(e.target.value)}
                        className={`flex-1 px-3 py-2 rounded border ${
                          darkMode 
                            ? 'bg-gray-600 border-gray-500 text-white' 
                            : 'bg-white border-gray-300'
                        } focus:outline-none focus:ring-2 `}
                      />
                      <button
                        onClick={() => addTopic(weekId)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowAddTopic('')}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementPrepPlanner;
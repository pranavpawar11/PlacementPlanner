// context/AppProvider.jsx - Global state management
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../hooks/useTheme';
import { dateUtils } from '../utils/dateUtils';
import { sampleData } from '../data/sampleData';

// Context
const AppContext = createContext();

// Action types
const ActionTypes = {
  SET_CURRENT_DATE: 'SET_CURRENT_DATE',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_IS_MOBILE: 'SET_IS_MOBILE',
  SET_CURRENT_VIEW: 'SET_CURRENT_VIEW',
  SET_SELECTED_DAY_DATA: 'SET_SELECTED_DAY_DATA',
  SET_MODAL_STATE: 'SET_MODAL_STATE',
  SET_EDITING_TASK: 'SET_EDITING_TASK',
  SET_SELECTED_DATE: 'SET_SELECTED_DATE',
  UPDATE_CATEGORIES: 'UPDATE_CATEGORIES'
};

// Initial state
const initialState = {
  currentDate: new Date(),
  searchTerm: '',
  selectedCategory: 'all',
  isMobile: false,
  currentView: 'calendar', // 'calendar' or 'day'
  selectedDayData: null,
  
  // Modal states
  isTaskModalOpen: false,
  isCategoryModalOpen: false,
  editingTask: null,
  selectedDate: null
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_DATE:
      return { ...state, currentDate: action.payload };
    
    case ActionTypes.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    
    case ActionTypes.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.payload };
    
    case ActionTypes.SET_IS_MOBILE:
      return { ...state, isMobile: action.payload };
    
    case ActionTypes.SET_CURRENT_VIEW:
      return { ...state, currentView: action.payload };
    
    case ActionTypes.SET_SELECTED_DAY_DATA:
      return { ...state, selectedDayData: action.payload };
    
    case ActionTypes.SET_MODAL_STATE:
      return { 
        ...state, 
        [action.payload.modal]: action.payload.isOpen,
        ...(action.payload.resetData && {
          editingTask: null,
          selectedDate: null
        })
      };
    
    case ActionTypes.SET_EDITING_TASK:
      return { ...state, editingTask: action.payload };
    
    case ActionTypes.SET_SELECTED_DATE:
      return { ...state, selectedDate: action.payload };
    
    default:
      return state;
  }
};

// Provider component
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { isDark, toggleTheme } = useTheme();
  const [categories, setCategories] = useLocalStorage('categories', sampleData.categories);

  // Check for mobile screen
  useEffect(() => {
    const checkScreenSize = () => {
      dispatch({
        type: ActionTypes.SET_IS_MOBILE,
        payload: window.innerWidth < 768
      });
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Action creators
  const actions = {
    setCurrentDate: (date) => 
      dispatch({ type: ActionTypes.SET_CURRENT_DATE, payload: date }),
    
    setSearchTerm: (term) => 
      dispatch({ type: ActionTypes.SET_SEARCH_TERM, payload: term }),
    
    setSelectedCategory: (categoryId) => 
      dispatch({ 
        type: ActionTypes.SET_SELECTED_CATEGORY, 
        payload: state.selectedCategory === categoryId ? 'all' : categoryId 
      }),
    
    setCurrentView: (view) => 
      dispatch({ type: ActionTypes.SET_CURRENT_VIEW, payload: view }),
    
    setSelectedDayData: (data) => 
      dispatch({ type: ActionTypes.SET_SELECTED_DAY_DATA, payload: data }),
    
    openModal: (modal, data = {}) => {
      dispatch({ 
        type: ActionTypes.SET_MODAL_STATE, 
        payload: { modal, isOpen: true } 
      });
      
      if (data.editingTask) {
        dispatch({ type: ActionTypes.SET_EDITING_TASK, payload: data.editingTask });
      }
      if (data.selectedDate) {
        dispatch({ type: ActionTypes.SET_SELECTED_DATE, payload: data.selectedDate });
      }
    },
    
    closeModal: (modal) => {
      dispatch({ 
        type: ActionTypes.SET_MODAL_STATE, 
        payload: { modal, isOpen: false, resetData: true } 
      });
    },

    // Navigation functions
    viewDay: (day) => {
      actions.setSelectedDayData(day);
      actions.setCurrentView('day');
    },

    backToCalendar: () => {
      actions.setCurrentView('calendar');
      actions.setSelectedDayData(null);
    }
  };

  const value = {
    // State
    ...state,
    categories,
    isDark,
    
    // Actions
    ...actions,
    toggleTheme,
    setCategories,
    
    // Computed values
    filteredCategories: state.selectedCategory === 'all' 
      ? categories 
      : categories.filter(cat => cat.id === state.selectedCategory)
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppProvider;
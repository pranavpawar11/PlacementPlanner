// context/UIProvider.js - Updated with missing methods
import React, { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext();

const UIProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState(null);

  // Toast management
  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info', // default
      title: '',
      message: '',
      duration: 5000, // 5 seconds default
      dismissible: true,
      ...toast
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-dismiss if duration is set
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Dismiss specific toast by ID
  const dismissToast = useCallback((id) => {
    removeToast(id);
  }, [removeToast]);

  // Confirmation dialog management
  const showConfirmDialog = useCallback((config) => {
    return new Promise((resolve) => {
      setConfirmDialog({
        ...config,
        onConfirm: () => {
          setConfirmDialog(null);
          resolve(true);
        },
        onCancel: () => {
          setConfirmDialog(null);
          resolve(false);
        }
      });
    });
  }, []);

  // Convenience methods for different toast types
  const toast = {
    success: (title, options = {}) => {
      // Handle both (title, options) and (options) patterns
      if (typeof title === 'object') {
        return addToast({ type: 'success', title: 'Success', ...title });
      }
      return addToast({ 
        type: 'success', 
        title: options.title || 'Success',
        message: title,
        ...options 
      });
    },
    error: (title, options = {}) => {
      if (typeof title === 'object') {
        return addToast({ type: 'error', title: 'Error', duration: 7000, ...title });
      }
      return addToast({ 
        type: 'error', 
        title: options.title || 'Error',
        message: title,
        duration: options.duration || 7000,
        ...options 
      });
    },
    warning: (title, options = {}) => {
      if (typeof title === 'object') {
        return addToast({ type: 'warning', title: 'Warning', ...title });
      }
      return addToast({ 
        type: 'warning', 
        title: options.title || 'Warning',
        message: title,
        ...options 
      });
    },
    info: (title, options = {}) => {
      if (typeof title === 'object') {
        return addToast({ type: 'info', title: 'Info', ...title });
      }
      return addToast({ 
        type: 'info', 
        title: options.title || 'Info',
        message: title,
        ...options 
      });
    },
    loading: (title, options = {}) => {
      if (typeof title === 'object') {
        return addToast({ 
          type: 'loading', 
          title: 'Loading...', 
          duration: 0, 
          dismissible: false, 
          ...title 
        });
      }
      return addToast({
        type: 'loading',
        title: options.title || 'Loading...',
        message: title,
        duration: 0, // Loading toasts don't auto-dismiss
        dismissible: false, // Can't be manually dismissed
        ...options
      });
    },
    dismiss: dismissToast, // Method to dismiss specific toasts
    dismissAll: clearAllToasts, // Method to dismiss all toasts
    custom: addToast
  };

  // Confirmation dialog convenience methods
  const confirm = {
    delete: (title, message) => showConfirmDialog({
      title: title || 'Confirm Delete',
      message: message || 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    }),
    save: (title, message) => showConfirmDialog({
      title: title || 'Save Changes',
      message: message || 'Do you want to save your changes?',
      confirmText: 'Save',
      cancelText: 'Discard',
      type: 'primary'
    }),
    custom: (config) => {
      // Enhanced custom confirmation with text confirmation support
      if (config.requireTextConfirmation) {
        return new Promise((resolve) => {
          setConfirmDialog({
            ...config,
            requireTextConfirmation: config.requireTextConfirmation,
            onConfirm: (inputValue) => {
              setConfirmDialog(null);
              // Check if the input matches the required text
              if (inputValue === config.requireTextConfirmation) {
                resolve(true);
              } else {
                // Show error toast for wrong input
                toast.error('Incorrect confirmation text', {
                  message: `Please type "${config.requireTextConfirmation}" exactly`,
                  duration: 4000
                });
                resolve(false);
              }
            },
            onCancel: () => {
              setConfirmDialog(null);
              resolve(false);
            }
          });
        });
      } else {
        return showConfirmDialog(config);
      }
    }
  };

  const value = {
    // Toast state and methods
    toasts,
    addToast,
    removeToast,
    dismissToast, // Added missing method
    clearAllToasts,
    toast,
    
    // Confirmation dialog state and methods
    confirmDialog,
    showConfirmDialog,
    confirm
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

// Hook to use the UI context
export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export default UIProvider;
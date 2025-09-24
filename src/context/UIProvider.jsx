// context/UIProvider.js
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
    success: (message, options = {}) => addToast({ 
      type: 'success', 
      message, 
      title: options.title || 'Success',
      ...options 
    }),
    error: (message, options = {}) => addToast({ 
      type: 'error', 
      message, 
      title: options.title || 'Error',
      duration: options.duration || 7000, // Errors stay longer
      ...options 
    }),
    warning: (message, options = {}) => addToast({ 
      type: 'warning', 
      message, 
      title: options.title || 'Warning',
      ...options 
    }),
    info: (message, options = {}) => addToast({ 
      type: 'info', 
      message, 
      title: options.title || 'Info',
      ...options 
    }),
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
    custom: showConfirmDialog
  };

  const value = {
    // Toast state and methods
    toasts,
    addToast,
    removeToast,
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
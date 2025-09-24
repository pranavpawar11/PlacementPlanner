// context/NotificationContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState(null);

  // Show notification function
  const showNotification = useCallback(({ 
    type = 'info', 
    title, 
    message, 
    duration = 5000,
    action = null 
  }) => {
    const id = Date.now() + Math.random();
    const notification = { id, type, title, message, duration, action };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after duration (0 means persistent)
    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, duration);
    }
    
    return id;
  }, []);

  // Remove notification
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Show confirmation dialog
  const showConfirmation = useCallback(({ 
    title, 
    message, 
    confirmText = 'Confirm', 
    cancelText = 'Cancel',
    type = 'default',
    onConfirm,
    onCancel 
  }) => {
    return new Promise((resolve) => {
      setConfirmDialog({
        title,
        message,
        confirmText,
        cancelText,
        type,
        onConfirm: () => {
          if (onConfirm) onConfirm();
          resolve(true);
        },
        onCancel: () => {
          if (onCancel) onCancel();
          resolve(false);
        }
      });
    });
  }, []);

  // Hide confirmation dialog
  const hideConfirmation = useCallback(() => {
    setConfirmDialog(null);
  }, []);

  // Convenience methods
  const success = useCallback((title, message, options = {}) => 
    showNotification({ type: 'success', title, message, ...options }), [showNotification]);
  
  const error = useCallback((title, message, options = {}) => 
    showNotification({ type: 'error', title, message, duration: 7000, ...options }), [showNotification]);
  
  const warning = useCallback((title, message, options = {}) => 
    showNotification({ type: 'warning', title, message, duration: 6000, ...options }), [showNotification]);
  
  const info = useCallback((title, message, options = {}) => 
    showNotification({ type: 'info', title, message, ...options }), [showNotification]);

  const loading = useCallback((title, message, options = {}) => 
    showNotification({ type: 'loading', title, message, duration: 0, ...options }), [showNotification]);

  const value = {
    notifications,
    confirmDialog,
    showNotification,
    removeNotification,
    showConfirmation,
    hideConfirmation,
    success,
    error,
    warning,
    info,
    loading
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook to use notifications
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};
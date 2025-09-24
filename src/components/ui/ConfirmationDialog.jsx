// components/UI/ConfirmationDialog.jsx
import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppProvider';
import { useUI } from '../../context/UIProvider';
import { AlertTriangle, HelpCircle, CheckCircle, X } from 'lucide-react';

const ConfirmationDialog = () => {
  const { isDark, isMobile } = useApp();
  const { confirmDialog } = useUI();
  const cancelButtonRef = useRef(null);
  const confirmButtonRef = useRef(null);

  // Focus management for accessibility
  useEffect(() => {
    if (confirmDialog) {
      // Focus the cancel button by default for safety
      setTimeout(() => {
        if (cancelButtonRef.current) {
          cancelButtonRef.current.focus();
        }
      }, 100);
    }
  }, [confirmDialog]);

  // Handle keyboard events
  useEffect(() => {
    if (!confirmDialog) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        confirmDialog.onCancel();
      } else if (e.key === 'Enter' && e.ctrlKey) {
        // Ctrl+Enter to confirm
        confirmDialog.onConfirm();
      } else if (e.key === 'Tab') {
        // Tab between buttons
        e.preventDefault();
        const activeElement = document.activeElement;
        if (activeElement === cancelButtonRef.current) {
          confirmButtonRef.current?.focus();
        } else {
          cancelButtonRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [confirmDialog]);

  if (!confirmDialog) return null;

  const getDialogStyles = (type) => {
    const styles = {
      danger: {
        icon: AlertTriangle,
        iconColor: 'text-red-500',
        iconBg: isDark ? 'bg-red-900/20' : 'bg-red-100',
        confirmButtonStyle: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
      },
      primary: {
        icon: CheckCircle,
        iconColor: 'text-blue-500',
        iconBg: isDark ? 'bg-blue-900/20' : 'bg-blue-100',
        confirmButtonStyle: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
      },
      warning: {
        icon: AlertTriangle,
        iconColor: 'text-amber-500',
        iconBg: isDark ? 'bg-amber-900/20' : 'bg-amber-100',
        confirmButtonStyle: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
      },
      info: {
        icon: HelpCircle,
        iconColor: 'text-blue-500',
        iconBg: isDark ? 'bg-blue-900/20' : 'bg-blue-100',
        confirmButtonStyle: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
      }
    };

    return styles[type] || styles.info;
  };

  const dialogStyle = getDialogStyles(confirmDialog.type);
  const IconComponent = dialogStyle.icon;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-message"
    >
      <div 
        className={`
          w-full max-w-md
          ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} 
          backdrop-blur-xl rounded-2xl shadow-2xl 
          border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}
          animate-in zoom-in-95 duration-200
          ${isMobile ? 'mx-2' : ''}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-4">
            <div className={`
              flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
              ${dialogStyle.iconBg}
            `}>
              <IconComponent className={`w-6 h-6 ${dialogStyle.iconColor}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 
                id="dialog-title"
                className={`
                  text-lg font-bold mb-2 leading-tight
                  ${isDark ? 'text-white' : 'text-gray-900'}
                `}
              >
                {confirmDialog.title}
              </h3>
              
              {confirmDialog.message && (
                <p 
                  id="dialog-message"
                  className={`
                    text-sm leading-relaxed
                    ${isDark ? 'text-gray-300' : 'text-gray-600'}
                  `}
                >
                  {confirmDialog.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={`
          p-6 pt-2 flex gap-3
          ${isMobile ? 'flex-col-reverse' : 'flex-row-reverse'}
        `}>
          {/* Confirm Button */}
          <button
            ref={confirmButtonRef}
            onClick={confirmDialog.onConfirm}
            className={`
              ${dialogStyle.confirmButtonStyle}
              px-6 py-3 rounded-xl font-semibold transition-all duration-200 
              hover:scale-105 active:scale-95 focus:outline-none 
              focus:ring-4 focus:ring-blue-500/20 shadow-lg
              ${isMobile ? 'w-full' : 'min-w-[100px]'}
            `}
            aria-describedby="dialog-message"
          >
            {confirmDialog.confirmText || 'Confirm'}
          </button>

          {/* Cancel Button */}
          <button
            ref={cancelButtonRef}
            onClick={confirmDialog.onCancel}
            className={`
              px-6 py-3 rounded-xl font-semibold transition-all duration-200 
              hover:scale-105 active:scale-95 focus:outline-none 
              focus:ring-4 focus:ring-gray-500/20
              ${isMobile ? 'w-full' : 'min-w-[100px]'}
              ${isDark 
                ? 'bg-gray-800/60 hover:bg-gray-800/80 text-gray-300 border border-gray-700/50' 
                : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 border border-gray-300/50'
              }
            `}
          >
            {confirmDialog.cancelText || 'Cancel'}
          </button>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className={`
          px-6 pb-4 text-xs text-center
          ${isDark ? 'text-gray-500' : 'text-gray-400'}
        `}>
          Press Esc to cancel • Tab to switch • Ctrl+Enter to confirm
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
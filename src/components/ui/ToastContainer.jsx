// components/UI/ToastContainer.jsx
import React from 'react';
import { useApp } from '../../context/AppProvider';
import { useUI } from '../../context/UIProvider';
import { 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  X 
} from 'lucide-react';

const Toast = ({ toast, onRemove }) => {
  const { isDark, isMobile } = useApp();

  const getToastStyles = (type) => {
    const baseStyles = "border backdrop-blur-sm shadow-lg";
    
    const typeStyles = {
      success: isDark 
        ? "bg-emerald-900/90 border-emerald-700/50 text-emerald-100" 
        : "bg-emerald-50/95 border-emerald-200/50 text-emerald-800",
      error: isDark 
        ? "bg-red-900/90 border-red-700/50 text-red-100" 
        : "bg-red-50/95 border-red-200/50 text-red-800",
      warning: isDark 
        ? "bg-amber-900/90 border-amber-700/50 text-amber-100" 
        : "bg-amber-50/95 border-amber-200/50 text-amber-800",
      info: isDark 
        ? "bg-blue-900/90 border-blue-700/50 text-blue-100" 
        : "bg-blue-50/95 border-blue-200/50 text-blue-800"
    };

    return `${baseStyles} ${typeStyles[type] || typeStyles.info}`;
  };

  const getIcon = (type) => {
    const iconProps = { className: "w-5 h-5 flex-shrink-0" };
    
    switch (type) {
      case 'success': return <CheckCircle {...iconProps} className={`${iconProps.className} text-emerald-500`} />;
      case 'error': return <AlertCircle {...iconProps} className={`${iconProps.className} text-red-500`} />;
      case 'warning': return <AlertTriangle {...iconProps} className={`${iconProps.className} text-amber-500`} />;
      case 'info': return <Info {...iconProps} className={`${iconProps.className} text-blue-500`} />;
      default: return <Info {...iconProps} className={`${iconProps.className} text-blue-500`} />;
    }
  };

  return (
    <div 
      className={`
        ${getToastStyles(toast.type)} 
        p-4 rounded-xl min-w-[300px] max-w-[400px] 
        animate-in slide-in-from-right-2 duration-300
        ${isMobile ? 'mx-2 text-sm' : 'text-base'}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        {getIcon(toast.type)}
        
        <div className="flex-1 min-w-0">
          {toast.title && (
            <h4 className="font-semibold mb-1 text-sm leading-tight">
              {toast.title}
            </h4>
          )}
          {toast.message && (
            <p className={`${toast.title ? 'text-sm' : 'text-base'} leading-tight opacity-90`}>
              {toast.message}
            </p>
          )}
        </div>
        
        {toast.dismissible && (
          <button
            onClick={() => onRemove(toast.id)}
            className={`
              flex-shrink-0 p-1 rounded-lg transition-colors duration-200
              hover:bg-black/10 focus:bg-black/10 focus:outline-none
              ${isDark ? 'hover:bg-white/10 focus:bg-white/10' : ''}
            `}
            aria-label="Close notification"
          >
            <X className="w-4 h-4 opacity-70" />
          </button>
        )}
      </div>
    </div>
  );
};

const ToastContainer = () => {
  const { isMobile } = useApp();
  const { toasts, removeToast } = useUI();

  if (toasts.length === 0) return null;

  return (
    <div
      className={`
        fixed z-50 pointer-events-none
        ${isMobile 
          ? 'bottom-20 left-0 right-0 flex flex-col-reverse items-center' 
          : 'top-20 right-4 flex flex-col items-end'
        }
      `}
      aria-live="polite"
      aria-label="Notifications"
    >
      <div className={`space-y-2 pointer-events-auto ${isMobile ? 'w-full' : ''}`}>
        {toasts.map((toast) => (
          <Toast 
            key={toast.id} 
            toast={toast} 
            onRemove={removeToast}
          />
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;
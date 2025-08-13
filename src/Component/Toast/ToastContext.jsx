import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from './Toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'success', duration = 5000 }) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration, show: true };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration + 300); // Add 300ms for animation
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((message, duration) => {
    addToast({ message, type: 'success', duration });
  }, [addToast]);

  const showError = useCallback((message, duration) => {
    addToast({ message, type: 'error', duration });
  }, [addToast]);

  const showWarning = useCallback((message, duration) => {
    addToast({ message, type: 'warning', duration });
  }, [addToast]);

  const showInfo = useCallback((message, duration) => {
    addToast({ message, type: 'info', duration });
  }, [addToast]);

  const value = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    addToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="animate-slide-in"
            style={{
              animationDelay: `${index * 100}ms`,
              transform: `translateY(${index * 80}px)`
            }}
          >
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              show={toast.show}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

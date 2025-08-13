import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ 
  message, 
  type = 'success', 
  duration = 5000, 
  onClose, 
  show = true 
}) => {
  const [isVisible, setIsVisible] = useState(show);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setIsVisible(show);
    if (show) {
      setProgress(100);
    }
  }, [show]);

  useEffect(() => {
    if (!isVisible) return;

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(progressInterval);
          handleClose();
          return 0;
        }
        return prev - (100 / (duration / 100));
      });
    }, 100);

    // Auto close timer
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300);
  };

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500',
          icon: <CheckCircle className="w-5 h-5 text-green-100" />,
          progress: 'bg-green-100'
        };
      case 'error':
        return {
          bg: 'bg-red-500',
          icon: <XCircle className="w-5 h-5 text-red-100" />,
          progress: 'bg-red-100'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500',
          icon: <AlertCircle className="w-5 h-5 text-yellow-100" />,
          progress: 'bg-yellow-100'
        };
      case 'info':
        return {
          bg: 'bg-blue-500',
          icon: <Info className="w-5 h-5 text-blue-100" />,
          progress: 'bg-blue-100'
        };
      default:
        return {
          bg: 'bg-green-500',
          icon: <CheckCircle className="w-5 h-5 text-green-100" />,
          progress: 'bg-green-100'
        };
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Success!';
      case 'error':
        return 'Error!';
      case 'warning':
        return 'Warning!';
      case 'info':
        return 'Info!';
      default:
        return 'Success!';
    }
  };

  const styles = getToastStyles();

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${styles.bg} text-white rounded-lg shadow-lg p-4 min-w-80 max-w-md transform transition-all duration-300 ease-in-out`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-full p-1">
              {styles.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg">{getTitle()}</h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white transition-colors duration-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message */}
        <p className="text-white/90 text-sm mb-3 ml-11">
          {message}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
          <div 
            className={`${styles.progress} h-full transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;

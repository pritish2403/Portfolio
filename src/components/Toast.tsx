import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

interface ToastProps {
  id?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  position?: ToastPosition;
  onClose?: (id: string) => void;
  className?: string;
  showCloseButton?: boolean;
  showIcon?: boolean;
  pauseOnHover?: boolean;
  autoClose?: boolean;
}

const variantIcons = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

const variantColors = {
  success: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-200',
    border: 'border-green-100 dark:border-green-800/50',
    icon: 'text-green-400',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/30',
    text: 'text-red-800 dark:text-red-200',
    border: 'border-red-100 dark:border-red-800/50',
    icon: 'text-red-400',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/30',
    text: 'text-yellow-800 dark:text-yellow-200',
    border: 'border-yellow-100 dark:border-yellow-800/50',
    icon: 'text-yellow-400',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-800 dark:text-blue-200',
    border: 'border-blue-100 dark:border-blue-800/50',
    icon: 'text-blue-400',
  },
};

const positionClasses: Record<ToastPosition, string> = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

export const Toast = ({
  id = Date.now().toString(),
  message,
  variant = 'info',
  duration = 5000,
  position = 'top-right',
  onClose,
  className = '',
  showCloseButton = true,
  showIcon = true,
  pauseOnHover = true,
  autoClose = true,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const Icon = variantIcons[variant];
  const colors = variantColors[variant];
  
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose?.(id), 300);
  }, [id, onClose]);
  
  // Auto-close functionality
  useEffect(() => {
    if (!autoClose || isPaused) return;
    
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
  }, [autoClose, duration, handleClose, isPaused]);
  
  const toastVariants = {
    hidden: (position: ToastPosition) => {
      const base = { opacity: 0, y: 0, x: 0 };
      if (position.includes('top')) return { ...base, y: -100 };
      if (position.includes('bottom')) return { ...base, y: 100 };
      if (position.includes('left')) return { ...base, x: -100 };
      if (position.includes('right')) return { ...base, x: 100 };
      return base;
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 300,
      },
    },
    exit: (position: ToastPosition) => {
      const base = { opacity: 0, y: 0, x: 0 };
      if (position.includes('top')) return { ...base, y: -50 };
      if (position.includes('bottom')) return { ...base, y: 50 };
      if (position.includes('left')) return { ...base, x: -50 };
      if (position.includes('right')) return { ...base, x: 50 };
      return base;
    },
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-50 flex items-center w-full max-w-sm p-4 space-x-4 rounded-lg shadow-lg ${colors.bg} ${colors.border} border ${positionClasses[position]} ${className}`}
          custom={position}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={toastVariants}
          onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
          onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
          role="alert"
          aria-live="assertive"
        >
          {showIcon && (
            <div className={`flex-shrink-0 ${colors.icon}`}>
              <Icon className="w-6 h-6" aria-hidden="true" />
            </div>
          )}
          
          <div className={`flex-1 text-sm font-medium ${colors.text}`}>
            {message}
          </div>
          
          {showCloseButton && (
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center text-gray-400 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-current"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toast Container Component
type ToastContainerProps = {
  toasts: ToastProps[];
  onRemoveToast: (id: string) => void;
  position?: ToastPosition;
  className?: string;
};

export const ToastContainer = ({
  toasts,
  onRemoveToast,
  position = 'top-right',
  className = '',
}: ToastContainerProps) => {
  const sortedToasts = useMemo(() => {
    if (position.includes('bottom')) {
      return [...toasts].reverse();
    }
    return toasts;
  }, [toasts, position]);
  
  const containerClasses = `fixed z-50 space-y-3 ${positionClasses[position]} ${className}`;
  
  return (
    <div className={containerClasses}>
      {sortedToasts.map((toast) => (
        <Toast
          key={toast.id}
          position={position}
          onClose={onRemoveToast}
          {...toast}
        />
      ))}
    </div>
  );
};

// Toast Hook
type ToastOptions = Omit<ToastProps, 'message' | 'id' | 'onClose'>;

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  
  const showToast = useCallback((message: string, options: ToastOptions = {}) => {
    const id = Date.now().toString();
    const newToast: ToastProps = {
      id,
      message,
      ...options,
    };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    return id;
  }, []);
  
  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);
  
  const toast = useMemo(
    () => ({
      success: (message: string, options?: Omit<ToastOptions, 'variant'>) =>
        showToast(message, { ...options, variant: 'success' }),
      error: (message: string, options?: Omit<ToastOptions, 'variant'>) =>
        showToast(message, { ...options, variant: 'error' }),
      warning: (message: string, options?: Omit<ToastOptions, 'variant'>) =>
        showToast(message, { ...options, variant: 'warning' }),
      info: (message: string, options?: Omit<ToastOptions, 'variant'>) =>
        showToast(message, { ...options, variant: 'info' }),
      custom: showToast,
      dismiss: removeToast,
    }),
    [showToast, removeToast]
  );
  
  return { toasts, toast, removeToast };
};

export default Toast;

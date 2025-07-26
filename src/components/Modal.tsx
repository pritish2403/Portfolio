import { ReactNode, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
};

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  titleClassName = '',
  bodyClassName = '',
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    },
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 500,
        mass: 1,
        delay: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      scale: 0.98,
      transition: { 
        duration: 0.15 
      } 
    },
  };

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto ${overlayClassName}`}
          onClick={handleOverlayClick}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Modal content */}
          <motion.div
            ref={modalRef}
            className={`relative w-full mx-auto my-8 ${sizeClasses[maxWidth]} ${className}`}
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden ${contentClassName}`}>
              {/* Header */}
              {(title || showCloseButton) && (
                <div className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 ${titleClassName}`}>
                  {title && (
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {title}
                    </h3>
                  )}
                  {showCloseButton && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="p-1 -mr-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                      aria-label="Close"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  )}
                </div>
              )}
              
              {/* Body */}
              <div className={`p-6 ${bodyClassName}`}>
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;

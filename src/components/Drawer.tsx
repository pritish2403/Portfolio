import { useEffect, useRef, ReactNode } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { createPortal } from 'react-dom';

type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

type DrawerProps = {
  /**
   * Whether the drawer is open
   */
  isOpen: boolean;
  
  /**
   * Callback when the drawer is closed
   */
  onClose: () => void;
  
  /**
   * The content of the drawer
   */
  children: ReactNode;
  
  /**
   * Position of the drawer
   * @default 'right'
   */
  position?: DrawerPosition;
  
  /**
   * Size of the drawer (width for left/right, height for top/bottom)
   * @default '400px'
   */
  size?: string;
  
  /**
   * Custom class for the drawer container
   */
  className?: string;
  
  /**
   * Custom class for the overlay/backdrop
   */
  overlayClassName?: string;
  
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Whether to close the drawer when clicking outside
   * @default true
   */
  closeOnOutsideClick?: boolean;
  
  /**
   * Whether to close the drawer when pressing the escape key
   * @default true
   */
  closeOnEscape?: boolean;
  
  /**
   * Custom close button
   */
  closeButton?: ReactNode;
  
  /**
   * Custom header content
   */
  header?: ReactNode;
  
  /**
   * Custom footer content
   */
  footer?: ReactNode;
};

const getDrawerStyles = (position: DrawerPosition, size: string) => {
  const baseStyles = {
    position: 'fixed',
    backgroundColor: 'white',
    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    zIndex: 50,
  };
  
  switch (position) {
    case 'left':
      return {
        ...baseStyles,
        top: 0,
        left: 0,
        height: '100vh',
        width: size,
        transform: 'translateX(-100%)',
      };
    case 'right':
      return {
        ...baseStyles,
        top: 0,
        right: 0,
        height: '100vh',
        width: size,
        transform: 'translateX(100%)',
      };
    case 'top':
      return {
        ...baseStyles,
        top: 0,
        left: 0,
        right: 0,
        height: size,
        transform: 'translateY(-100%)',
      };
    case 'bottom':
      return {
        ...baseStyles,
        bottom: 0,
        left: 0,
        right: 0,
        height: size,
        transform: 'translateY(100%)',
      };
    default:
      return {};
  }
};

const getDrawerVariants = (position: DrawerPosition) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  
  switch (position) {
    case 'left':
      return {
        ...variants,
        hidden: { x: '-100%' },
        visible: { x: 0 },
      };
    case 'right':
      return {
        ...variants,
        hidden: { x: '100%' },
        visible: { x: 0 },
      };
    case 'top':
      return {
        ...variants,
        hidden: { y: '-100%' },
        visible: { y: 0 },
      };
    case 'bottom':
      return {
        ...variants,
        hidden: { y: '100%' },
        visible: { y: 0 },
      };
    default:
      return variants;
  }
};

const Drawer = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  size = '400px',
  className = '',
  overlayClassName = '',
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  closeButton,
  header,
  footer,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayControls = useAnimation();
  const drawerControls = useAnimation();
  
  // Handle escape key press
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape]);
  
  // Handle outside click
  useEffect(() => {
    if (!closeOnOutsideClick || !isOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnOutsideClick]);
  
  // Animate drawer and overlay when isOpen changes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      overlayControls.start('visible');
      drawerControls.start('visible');
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => {
        overlayControls.start('hidden');
        drawerControls.start('hidden');
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, overlayControls, drawerControls]);
  
  const handleClose = () => {
    onClose();
  };
  
  const drawerVariants = getDrawerVariants(position);
  const drawerStyles = getDrawerStyles(position, size);
  
  // Determine content direction based on drawer position
  const isHorizontal = position === 'left' || position === 'right';
  
  if (typeof document === 'undefined') return null;
  
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className={`fixed inset-0 bg-black/50 z-40 ${overlayClassName}`}
            initial="hidden"
            animate={overlayControls}
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.2 }}
            onClick={closeOnOutsideClick ? handleClose : undefined}
            aria-hidden="true"
          />
          
          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            className={`fixed z-50 bg-white dark:bg-gray-800 ${isHorizontal ? 'h-screen' : 'w-full'} ${className}`}
            style={drawerStyles}
            initial="hidden"
            animate={drawerControls}
            exit="hidden"
            variants={drawerVariants}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
          >
            {/* Header */}
            {(header || showCloseButton) && (
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-1">
                  {typeof header === 'string' ? (
                    <h2 id="drawer-title" className="text-lg font-semibold text-gray-900 dark:text-white">
                      {header}
                    </h2>
                  ) : (
                    header
                  )}
                </div>
                
                {showCloseButton && (
                  closeButton || (
                    <button
                      type="button"
                      onClick={handleClose}
                      className="p-1 -mr-1 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white transition-colors"
                      aria-label="Close drawer"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  )
                )}
              </div>
            )}
            
            {/* Content */}
            <div 
              className="overflow-y-auto"
              style={{
                height: position === 'left' || position === 'right' 
                  ? 'calc(100% - 65px)' 
                  : 'auto',
                maxHeight: position === 'top' || position === 'bottom'
                  ? '80vh'
                  : 'none',
              }}
            >
              {children}
            </div>
            
            {/* Footer */}
            {footer && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Drawer;

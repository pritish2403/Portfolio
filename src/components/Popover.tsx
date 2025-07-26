import { ReactNode, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickAway } from 'react-use';

type PopoverPosition = 'top' | 'right' | 'bottom' | 'left' | 'auto';
type PopoverTrigger = 'click' | 'hover' | 'focus';

type PopoverProps = {
  /**
   * The content that triggers the popover
   */
  children: ReactNode;
  
  /**
   * The content to display in the popover
   */
  content: ReactNode;
  
  /**
   * Whether the popover is open (controlled mode)
   */
  isOpen?: boolean;
  
  /**
   * Callback when popover visibility changes
   */
  onOpenChange?: (isOpen: boolean) => void;
  
  /**
   * Position of the popover relative to the trigger
   * @default 'auto'
   */
  position?: PopoverPosition;
  
  /**
   * How the popover is triggered
   * @default 'click'
   */
  trigger?: PopoverTrigger;
  
  /**
   * Custom class for the popover container
   */
  className?: string;
  
  /**
   * Custom class for the popover content
   */
  contentClassName?: string;
  
  /**
   * Custom class for the arrow
   */
  arrowClassName?: string;
  
  /**
   * Offset from the trigger element
   * @default 8
   */
  offset?: number;
  
  /**
   * Whether to show an arrow pointing to the trigger
   * @default true
   */
  showArrow?: boolean;
  
  /**
   * Whether to close the popover when clicking outside
   * @default true
   */
  closeOnOutsideClick?: boolean;
  
  /**
   * Whether to close the popover when pressing escape
   * @default true
   */
  closeOnEscape?: boolean;
  
  /**
   * Whether the popover is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Animation duration in seconds
   * @default 0.2
   */
  duration?: number;
};

const ARROW_SIZE = 8;
const AUTO_POSITION_OFFSET = 8;

const Popover = ({
  children,
  content,
  isOpen: isOpenProp,
  onOpenChange,
  position: positionProp = 'auto',
  trigger = 'click',
  className = '',
  contentClassName = '',
  arrowClassName = '',
  offset = 8,
  showArrow = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  disabled = false,
  duration = 0.2,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<PopoverPosition>(positionProp);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isControlled = isOpenProp !== undefined;
  const showPopover = isControlled ? isOpenProp : isOpen;
  
  // Handle controlled vs uncontrolled state
  const setOpenState = (open: boolean) => {
    if (!isControlled) {
      setIsOpen(open);
    }
    onOpenChange?.(open);
  };
  
  // Handle click outside
  useClickAway({
    ref: contentRef,
    onClickOutside: (e) => {
      if (closeOnOutsideClick && !triggerRef.current?.contains(e.target as Node)) {
        setOpenState(false);
      }
    },
  });
  
  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !showPopover) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenState(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showPopover, closeOnEscape]);
  
  // Calculate position for the popover
  const updatePosition = () => {
    if (!triggerRef.current || !contentRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    
    // Default positions (bottom)
    let top = triggerRect.bottom + window.scrollY + offset;
    let left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
    let calculatedPosition: PopoverPosition = 'bottom';
    
    // If position is auto, determine the best position based on viewport
    if (positionProp === 'auto') {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Check if there's enough space on the right
      const spaceRight = viewportWidth - triggerRect.right;
      const spaceLeft = triggerRect.left;
      const spaceTop = triggerRect.top;
      const spaceBottom = viewportHeight - triggerRect.bottom;
      
      // Default to bottom if there's enough space
      if (spaceBottom > contentRect.height + offset) {
        calculatedPosition = 'bottom';
      } 
      // Otherwise try top
      else if (spaceTop > contentRect.height + offset) {
        calculatedPosition = 'top';
      }
      // Otherwise try right
      else if (spaceRight > contentRect.width + offset) {
        calculatedPosition = 'right';
      }
      // Otherwise try left
      else if (spaceLeft > contentRect.width + offset) {
        calculatedPosition = 'left';
      }
      // If no space anywhere, default to bottom
      else {
        calculatedPosition = 'bottom';
      }
    } else {
      calculatedPosition = positionProp;
    }
    
    // Calculate position based on the calculated position
    switch (calculatedPosition) {
      case 'top':
        top = triggerRect.top + window.scrollY - contentRect.height - offset;
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        break;
      case 'right':
        top = triggerRect.top + window.scrollY + (triggerRect.height - contentRect.height) / 2;
        left = triggerRect.right + offset;
        break;
      case 'left':
        top = triggerRect.top + window.scrollY + (triggerRect.height - contentRect.height) / 2;
        left = triggerRect.left - contentRect.width - offset;
        break;
      case 'bottom':
      default:
        top = triggerRect.bottom + window.scrollY + offset;
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        break;
    }
    
    // Adjust for viewport edges
    if (left < 0) left = AUTO_POSITION_OFFSET;
    if (left + contentRect.width > window.innerWidth) {
      left = window.innerWidth - contentRect.width - AUTO_POSITION_OFFSET;
    }
    
    if (top < 0) top = AUTO_POSITION_OFFSET;
    if (top + contentRect.height > window.innerHeight + window.scrollY) {
      top = window.innerHeight + window.scrollY - contentRect.height - AUTO_POSITION_OFFSET;
    }
    
    setPosition(calculatedPosition);
    setCoords({ top, left });
  };
  
  // Update position when popover opens or content changes
  useEffect(() => {
    if (showPopover) {
      // Use requestAnimationFrame to ensure the content is rendered
      requestAnimationFrame(() => {
        updatePosition();
      });
      
      // Update position on window resize/scroll
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }
  }, [showPopover, content, positionProp]);
  
  // Event handlers
  const handleClick = () => {
    if (trigger === 'click' && !disabled) {
      setOpenState(!showPopover);
    }
  };
  
  const handleMouseEnter = () => {
    if (trigger === 'hover' && !disabled) {
      setOpenState(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (trigger === 'hover' && !disabled) {
      setOpenState(false);
    }
  };
  
  const handleFocus = () => {
    if (trigger === 'focus' && !disabled) {
      setOpenState(true);
    }
  };
  
  const handleBlur = () => {
    if (trigger === 'focus' && !disabled) {
      setOpenState(false);
    }
  };
  
  // Render arrow
  const renderArrow = () => {
    if (!showArrow) return null;
    
    const arrowClasses = `absolute w-0 h-0 border-transparent ${arrowClassName}`;
    
    switch (position) {
      case 'top':
        return (
          <div 
            className={`${arrowClasses} border-l-8 border-r-8 border-b-8 border-b-white dark:border-b-gray-800 -bottom-2 left-1/2 -translate-x-1/2`}
            style={{
              borderLeftWidth: ARROW_SIZE,
              borderRightWidth: ARROW_SIZE,
              borderBottomWidth: ARROW_SIZE,
            }}
          />
        );
      case 'right':
        return (
          <div 
            className={`${arrowClasses} border-t-8 border-b-8 border-l-8 border-l-white dark:border-l-gray-800 -left-2 top-1/2 -translate-y-1/2`}
            style={{
              borderTopWidth: ARROW_SIZE,
              borderBottomWidth: ARROW_SIZE,
              borderLeftWidth: ARROW_SIZE,
            }}
          />
        );
      case 'left':
        return (
          <div 
            className={`${arrowClasses} border-t-8 border-r-8 border-b-8 border-r-white dark:border-r-gray-800 -right-2 top-1/2 -translate-y-1/2`}
            style={{
              borderTopWidth: ARROW_SIZE,
              borderRightWidth: ARROW_SIZE,
              borderBottomWidth: ARROW_SIZE,
            }}
          />
        );
      case 'bottom':
      default:
        return (
          <div 
            className={`${arrowClasses} border-l-8 border-r-8 border-t-8 border-t-white dark:border-t-gray-800 -top-2 left-1/2 -translate-x-1/2`}
            style={{
              borderLeftWidth: ARROW_SIZE,
              borderRightWidth: ARROW_SIZE,
              borderTopWidth: ARROW_SIZE,
            }}
          />
        );
    }
  };
  
  return (
    <div 
      className={`relative inline-block ${className}`}
      ref={triggerRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role={trigger === 'click' ? 'button' : undefined}
      tabIndex={trigger === 'focus' ? 0 : undefined}
    >
      {children}
      
      <AnimatePresence>
        {showPopover && !disabled && (
          <motion.div
            ref={contentRef}
            className={`fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 ${contentClassName}`}
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: 'max-content',
              maxWidth: 'calc(100vw - 32px)',
            }}
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration }}
            role="tooltip"
          >
            {renderArrow()}
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Popover;

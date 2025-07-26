import { ReactNode, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  tooltipClassName?: string;
  disabled?: boolean;
};

const Tooltip = ({
  content,
  children,
  position = 'top',
  delay = 0,
  className = '',
  tooltipClassName = '',
  disabled = false,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  let timeoutId: NodeJS.Timeout;

  const positionTooltip = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const trigger = triggerRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = trigger.top - tooltip.height - 8 + scrollY;
        left = trigger.left + trigger.width / 2 - tooltip.width / 2 + scrollX;
        break;
      case 'right':
        top = trigger.top + trigger.height / 2 - tooltip.height / 2 + scrollY;
        left = trigger.right + 8 + scrollX;
        break;
      case 'bottom':
        top = trigger.bottom + 8 + scrollY;
        left = trigger.left + trigger.width / 2 - tooltip.width / 2 + scrollX;
        break;
      case 'left':
        top = trigger.top + trigger.height / 2 - tooltip.height / 2 + scrollY;
        left = trigger.left - tooltip.width - 8 + scrollX;
        break;
    }

    // Adjust for viewport edges
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left + tooltip.width > viewportWidth) {
      left = viewportWidth - tooltip.width - 16;
    } else if (left < 0) {
      left = 16;
    }

    if (top + tooltip.height > viewportHeight) {
      top = viewportHeight - tooltip.height - 16;
    } else if (top < 0) {
      top = 16;
    }

    setTooltipPosition({ top, left });
  };

  const showTooltip = () => {
    if (disabled) return;
    
    timeoutId = setTimeout(() => {
      setIsVisible(true);
      // Position after the tooltip is rendered
      requestAnimationFrame(() => {
        positionTooltip();
      });
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutId);
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      positionTooltip();
      window.addEventListener('resize', positionTooltip);
      window.addEventListener('scroll', positionTooltip, true);
    }

    return () => {
      window.removeEventListener('resize', positionTooltip);
      window.removeEventListener('scroll', positionTooltip, true);
    };
  }, [isVisible, position]);

  const tooltipVariants = {
    hidden: { opacity: 0, y: position === 'bottom' ? -10 : 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 400,
      },
    },
    exit: { 
      opacity: 0, 
      y: position === 'bottom' ? -10 : 10,
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  const arrowPosition = {
    top: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45',
    right: 'left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45',
    bottom: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45',
    left: 'right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45',
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      ref={triggerRef}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            className={`fixed z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-lg ${tooltipClassName}`}
            style={tooltipPosition}
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="tooltip"
          >
            {content}
            <div 
              className={`absolute w-3 h-3 bg-gray-900 dark:bg-gray-700 ${arrowPosition[position]}`}
              style={{
                boxShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;

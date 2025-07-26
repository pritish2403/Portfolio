import { ReactNode, useState, Children, cloneElement, isValidElement, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TabProps = {
  label: string;
  children: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
};

type TabsProps = {
  children: ReactNode;
  defaultActiveTab?: number;
  onChange?: (index: number) => void;
  variant?: 'underline' | 'pills' | 'cards';
  fullWidth?: boolean;
  className?: string;
  tabListClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  disabledTabClassName?: string;
  contentClassName?: string;
  indicatorClassName?: string;
};

const Tabs = ({
  children,
  defaultActiveTab = 0,
  onChange,
  variant = 'underline',
  fullWidth = false,
  className = '',
  tabListClassName = '',
  tabClassName = '',
  activeTabClassName = '',
  disabledTabClassName = '',
  contentClassName = '',
  indicatorClassName = '',
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const [indicator, setIndicator] = useState({ width: 0, left: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabListRef = useRef<HTMLDivElement>(null);

  const tabs = Children.toArray(children).filter((child) => 
    isValidElement(child) && (child.type as any).displayName === 'Tab'
  ) as React.ReactElement<TabProps>[];

  const updateIndicator = (element: HTMLButtonElement) => {
    if (!element || !tabListRef.current) return;
    
    const tabListRect = tabListRef.current.getBoundingClientRect();
    const tabRect = element.getBoundingClientRect();
    
    setIndicator({
      width: tabRect.width,
      left: tabRect.left - tabListRect.left,
    });
  };

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      updateIndicator(tabRefs.current[activeTab]!);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      if (tabRefs.current[activeTab]) {
        updateIndicator(tabRefs.current[activeTab]!);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const handleTabClick = (index: number, tab: React.ReactElement<TabProps>) => {
    if (tab.props.disabled) return;
    
    setActiveTab(index);
    onChange?.(index);
  };

  const getVariantClasses = (isActive: boolean, isDisabled: boolean) => {
    const baseClasses = {
      underline: `px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive 
          ? 'text-olive dark:text-mustard' 
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
      }`,
      pills: `px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
        isActive 
          ? 'bg-olive/10 text-olive dark:bg-mustard/10 dark:text-mustard' 
          : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50'
      }`,
      cards: `px-4 py-2 text-sm font-medium border rounded-t-lg transition-colors duration-200 ${
        isActive 
          ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-olive dark:text-mustard' 
          : 'border-transparent text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/30'
      }`,
    };

    return baseClasses[variant];
  };

  const getIndicatorClasses = () => {
    const baseClasses = {
      underline: 'h-0.5 bg-olive dark:bg-mustard',
      pills: 'h-8 bg-olive/10 dark:bg-mustard/10 rounded-full',
      cards: '',
    };

    return baseClasses[variant];
  };

  const getContentClasses = () => {
    const baseClasses = {
      underline: 'mt-4',
      pills: 'mt-4',
      cards: 'bg-white dark:bg-gray-800 border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-lg p-6',
    };

    return baseClasses[variant];
  };

  return (
    <div className={`w-full ${className}`}>
      <div 
        ref={tabListRef}
        className={`relative flex ${variant === 'cards' ? 'gap-2' : 'gap-6'} ${
          fullWidth ? 'w-full justify-between' : 'w-auto'
        } border-b border-gray-200 dark:border-gray-700 ${tabListClassName}`}
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          const isDisabled = tab.props.disabled;
          
          return (
            <button
              key={index}
              ref={(el) => (tabRefs.current[index] = el)}
              className={`relative z-10 flex items-center justify-center whitespace-nowrap ${
                fullWidth ? 'flex-1' : ''
              } ${getVariantClasses(isActive, isDisabled)} ${
                isActive ? activeTabClassName : ''
              } ${isDisabled ? `opacity-50 cursor-not-allowed ${disabledTabClassName}` : 'cursor-pointer'} ${
                tabClassName
              } ${tab.props.className || ''}`}
              onClick={() => handleTabClick(index, tab)}
              disabled={isDisabled}
              aria-selected={isActive}
              role="tab"
            >
              {tab.props.icon && <span className="mr-2">{tab.props.icon}</span>}
              {tab.props.label}
            </button>
          );
        })}
        
        {variant !== 'cards' && (
          <motion.div
            className={`absolute bottom-0 ${getIndicatorClasses()} ${indicatorClassName}`}
            style={{
              width: indicator.width,
              x: indicator.left,
            }}
            initial={false}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
          />
        )}
      </div>
      
      <div className={`${getContentClasses()} ${contentClassName}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {tabs[activeTab]?.props.children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const Tab = ({ children, className = '' }: TabProps) => {
  return <div className={className}>{children}</div>;
};

Tab.displayName = 'Tab';

export { Tabs, Tab };
export type { TabProps, TabsProps };

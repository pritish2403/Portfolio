import { Fragment, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

type BreadcrumbItem = {
  /**
   * The display text for the breadcrumb item
   */
  label: string;
  
  /**
   * The URL path for the breadcrumb item
   */
  path?: string;
  
  /**
   * Custom icon for the breadcrumb item
   */
  icon?: ReactNode;
  
  /**
   * Whether the breadcrumb item is the current page
   */
  isCurrent?: boolean;
};

type BreadcrumbProps = {
  /**
   * Array of breadcrumb items
   */
  items?: BreadcrumbItem[];
  
  /**
   * Custom separator between breadcrumb items
   * @default <ChevronRightIcon className="w-4 h-4" />
   */
  separator?: ReactNode;
  
  /**
   * Show home icon as the first breadcrumb
   * @default true
   */
  showHome?: boolean;
  
  /**
   * Custom class for the breadcrumb container
   */
  className?: string;
  
  /**
   * Custom class for breadcrumb items
   */
  itemClassName?: string;
  
  /**
   * Custom class for the active breadcrumb item
   */
  activeItemClassName?: string;
  
  /**
   * Custom class for the separator
   */
  separatorClassName?: string;
  
  /**
   * Enable animations
   * @default true
   */
  animate?: boolean;
};

const Breadcrumb = ({
  items = [],
  separator = <ChevronRightIcon className="w-4 h-4 text-gray-400" aria-hidden="true" />,
  showHome = true,
  className = '',
  itemClassName = 'text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
  activeItemClassName = 'text-gray-600 dark:text-gray-200',
  separatorClassName = 'text-gray-400',
  animate = true,
}: BreadcrumbProps) => {
  const location = useLocation();
  
  // Generate breadcrumbs from the current route if no items are provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items.length > 0) return items;
    
    const pathParts = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    let currentPath = '';
    
    pathParts.forEach((part, index) => {
      currentPath += `/${part}`;
      const isLast = index === pathParts.length - 1;
      
      breadcrumbs.push({
        label: part
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        path: isLast ? undefined : currentPath,
        isCurrent: isLast,
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbItems = generateBreadcrumbs();
  
  // Add home breadcrumb if enabled
  const homeBreadcrumb: BreadcrumbItem = {
    label: 'Home',
    path: '/',
    icon: <HomeIcon className="w-4 h-4" />,
  };
  
  const allBreadcrumbs = showHome ? [homeBreadcrumb, ...breadcrumbItems] : breadcrumbItems;
  
  const renderBreadcrumbItem = (item: BreadcrumbItem, index: number) => {
    const isLast = index === allBreadcrumbs.length - 1;
    const isHome = showHome && index === 0;
    const itemKey = `${item.label}-${index}`;
    
    const itemContent = (
      <span className="flex items-center">
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {item.label}
      </span>
    );
    
    const itemElement = item.path && !isLast ? (
      <Link
        to={item.path}
        className={`${itemClassName} transition-colors duration-200`}
        aria-current={isLast ? 'page' : undefined}
      >
        {itemContent}
      </Link>
    ) : (
      <span 
        className={`${itemClassName} ${isLast ? activeItemClassName : ''}`}
        aria-current={isLast ? 'page' : undefined}
      >
        {itemContent}
      </span>
    );
    
    const breadcrumbItem = (
      <li key={itemKey} className="flex items-center">
        {index > 0 && (
          <span 
            className={`mx-2 ${separatorClassName}`} 
            aria-hidden="true"
          >
            {separator}
          </span>
        )}
        {itemElement}
      </li>
    );
    
    if (!animate) return breadcrumbItem;
    
    return (
      <motion.li 
        key={itemKey}
        className="flex items-center"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          delay: index * 0.1,
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      >
        {index > 0 && (
          <motion.span 
            className={`mx-2 ${separatorClassName}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.1 }}
            aria-hidden="true"
          >
            {separator}
          </motion.span>
        )}
        <motion.div
          whileHover={!isLast ? { x: 2 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {itemElement}
        </motion.div>
      </motion.li>
    );
  };
  
  return (
    <nav className={`${className}`} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center">
        {allBreadcrumbs.map((item, index) => (
          <Fragment key={`${item.label}-${index}`}>
            {renderBreadcrumbItem(item, index)}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

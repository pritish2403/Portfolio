import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

type PaginationProps = {
  /**
   * Total number of items
   */
  totalItems: number;
  
  /**
   * Number of items per page
   * @default 10
   */
  itemsPerPage?: number;
  
  /**
   * Number of page buttons to show (excluding ellipsis and arrows)
   * @default 5
   */
  maxVisiblePages?: number;
  
  /**
   * Current active page (1-based index)
   */
  currentPage?: number;
  
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;
  
  /**
   * Show first and last page buttons
   * @default true
   */
  showFirstLastButtons?: boolean;
  
  /**
   * Show previous and next buttons
   * @default true
   */
  showPrevNextButtons?: boolean;
  
  /**
   * Show page numbers
   * @default true
   */
  showPageNumbers?: boolean;
  
  /**
   * Show total items info
   * @default false
   */
  showTotalItems?: boolean;
  
  /**
   * Custom class for the pagination container
   */
  className?: string;
  
  /**
   * Custom class for page buttons
   */
  buttonClassName?: string;
  
  /**
   * Custom class for active button
   */
  activeButtonClassName?: string;
  
  /**
   * Custom class for disabled buttons
   */
  disabledButtonClassName?: string;
  
  /**
   * Enable animations
   * @default true
   */
  animate?: boolean;
};

const Pagination = ({
  totalItems,
  itemsPerPage = 10,
  maxVisiblePages = 5,
  currentPage: externalCurrentPage = 1,
  onPageChange,
  showFirstLastButtons = true,
  showPrevNextButtons = true,
  showPageNumbers = true,
  showTotalItems = false,
  className = '',
  buttonClassName = '',
  activeButtonClassName = '',
  disabledButtonClassName = '',
  animate = true,
}: PaginationProps) => {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const isControlled = externalCurrentPage !== undefined && onPageChange !== undefined;
  const currentPage = isControlled ? externalCurrentPage : internalCurrentPage;
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Calculate the range of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();
  const showStartEllipsis = pageNumbers[0] > 2;
  const showEndEllipsis = pageNumbers[pageNumbers.length - 1] < totalPages - 1;
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    if (!isControlled) {
      setInternalCurrentPage(page);
    }
    
    onPageChange?.(page);
  };
  
  // Reset to first page if totalItems changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      handlePageChange(1);
    }
  }, [totalItems, itemsPerPage]);
  
  if (totalPages <= 1) {
    return null;
  }
  
  const renderPageButton = (page: number, label?: string | number) => {
    const isActive = page === currentPage;
    const isDisabled = page < 1 || page > totalPages;
    
    const baseClasses = `min-w-[2.5rem] h-10 flex items-center justify-center px-2 mx-0.5 rounded-md font-medium transition-colors duration-200 ${
      isActive
        ? `bg-olive text-white dark:bg-mustard dark:text-gray-900 ${activeButtonClassName}`
        : `bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 ${buttonClassName}`
    } ${
      isDisabled ? `opacity-50 cursor-not-allowed ${disabledButtonClassName}` : 'cursor-pointer'
    }`;
    
    const content = label !== undefined ? label : page;
    
    const button = (
      <button
        type="button"
        className={baseClasses}
        onClick={() => handlePageChange(page)}
        disabled={isDisabled || isActive}
        aria-current={isActive ? 'page' : undefined}
        aria-label={typeof label === 'string' ? label : `Go to page ${page}`}
      >
        {content}
      </button>
    );
    
    if (!animate) return button;
    
    return (
      <motion.div
        key={page}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {button}
      </motion.div>
    );
  };
  
  const renderEllipsis = (key: string) => (
    <span 
      key={key}
      className="flex items-end px-2 text-gray-500 dark:text-gray-400"
      aria-hidden="true"
    >
      <EllipsisHorizontalIcon className="w-5 h-5" />
    </span>
  );
  
  const paginationContent = (
    <div className={`flex flex-wrap items-center justify-center gap-1 ${className}`}>
      {showTotalItems && (
        <div className="mr-4 text-sm text-gray-600 dark:text-gray-400">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </div>
      )}
      
      {showFirstLastButtons && renderPageButton(1, 'First')}
      
      {showPrevNextButtons && renderPageButton(
        currentPage - 1, 
        <>
          <ChevronLeftIcon className="w-4 h-4" />
          <span className="sr-only">Previous</span>
        </>
      )}
      
      {showPageNumbers && (
        <>
          {showStartEllipsis && (
            <>
              {renderPageButton(1)}
              {pageNumbers[0] > 2 && renderEllipsis('start-ellipsis')}
            </>
          )}
          
          <AnimatePresence mode="wait">
            {pageNumbers.map((page) => renderPageButton(page))}
          </AnimatePresence>
          
          {showEndEllipsis && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && 
                renderEllipsis('end-ellipsis')}
              {renderPageButton(totalPages)}
            </>
          )}
        </>
      )}
      
      {showPrevNextButtons && renderPageButton(
        currentPage + 1,
        <>
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="w-4 h-4" />
        </>
      )}
      
      {showFirstLastButtons && renderPageButton(totalPages, 'Last')}
    </div>
  );
  
  if (!animate) {
    return paginationContent;
  }
  
  return (
    <motion.nav 
      className="w-full"
      aria-label="Pagination"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {paginationContent}
    </motion.nav>
  );
};

export default Pagination;

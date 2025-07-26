import { ReactNode, useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';

type SortDirection = 'asc' | 'desc' | null;

type Column<T> = {
  /**
   * Unique key for the column
   */
  key: string;
  
  /**
   * Column header text
   */
  header: string;
  
  /**
   * Custom render function for cell content
   */
  render?: (value: any, row: T, index: number) => ReactNode;
  
  /**
   * Whether the column is sortable
   * @default false
   */
  sortable?: boolean;
  
  /**
   * Custom sort function
   */
  sortFn?: (a: any, b: any) => number;
  
  /**
   * Column width (e.g., '100px', '20%')
   */
  width?: string;
  
  /**
   * Text alignment
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  
  /**
   * Whether the column is sticky
   */
  sticky?: boolean;
  
  /**
   * Custom class for header cell
   */
  headerClassName?: string;
  
  /**
   * Custom class for data cells
   */
  cellClassName?: string;
};

type TableProps<T> = {
  /**
   * Array of data objects to display in the table
   */
  data: T[];
  
  /**
   * Column configuration
   */
  columns: Column<T>[];
  
  /**
   * Key to use for React's key prop when rendering rows
   * @default 'id'
   */
  rowKey?: string | ((row: T) => string | number);
  
  /**
   * Whether to show a loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Loading component to display when loading is true
   */
  loadingComponent?: ReactNode;
  
  /**
   * Message to display when there's no data
   * @default 'No data available'
   */
  emptyText?: string | ReactNode;
  
  /**
   * Whether to show a border around the table
   * @default true
   */
  bordered?: boolean;
  
  /**
   * Whether to show row hover effects
   * @default true
   */
  hoverable?: boolean;
  
  /**
   * Whether to show striped rows
   * @default false
   */
  striped?: boolean;
  
  /**
   * Height of the table container (for scrollable tables)
   */
  height?: string;
  
  /**
   * Custom class for the table container
   */
  className?: string;
  
  /**
   * Custom class for the table element
   */
  tableClassName?: string;
  
  /**
   * Custom class for table header
   */
  headerClassName?: string;
  
  /**
   * Custom class for table rows
   */
  rowClassName?: string | ((row: T, index: number) => string);
  
  /**
   * Callback when a row is clicked
   */
  onRowClick?: (row: T, index: number) => void;
  
  /**
   * Callback when sorting changes
   */
  onSort?: (key: string, direction: SortDirection) => void;
};

const Table = <T extends Record<string, any>>({
  data = [],
  columns = [],
  rowKey = 'id',
  loading = false,
  loadingComponent,
  emptyText = 'No data available',
  bordered = true,
  hoverable = true,
  striped = false,
  height,
  className = '',
  tableClassName = '',
  headerClassName = '',
  rowClassName = '',
  onRowClick,
  onSort,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  } | null>(null);
  
  // Handle sorting
  const handleSort = useCallback((key: string, sortable?: boolean, customSortFn?: (a: any, b: any) => number) => {
    if (!sortable) return;
    
    let direction: SortDirection = 'asc';
    
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      } else {
        direction = 'asc';
      }
    }
    
    const newSortConfig = direction ? { key, direction } : null;
    setSortConfig(newSortConfig);
    onSort?.(key, direction);
  }, [sortConfig, onSort]);
  
  // Sort data if sortConfig is set
  const sortedData = useMemo(() => {
    if (!sortConfig || !sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const column = columns.find(col => col.key === sortConfig.key);
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      // Use custom sort function if provided
      if (column?.sortFn) {
        return sortConfig.direction === 'asc' 
          ? column.sortFn(aValue, bValue) 
          : -column.sortFn(aValue, bValue);
      }
      
      // Default sorting for numbers and strings
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig, columns]);
  
  // Get row key
  const getRowKey = useCallback((row: T, index: number) => {
    if (typeof rowKey === 'function') {
      return rowKey(row);
    }
    return row[rowKey] || `row-${index}`;
  }, [rowKey]);
  
  // Get row class name
  const getRowClassName = useCallback((row: T, index: number) => {
    const baseClasses = [
      'transition-colors',
      hoverable && 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
      striped && index % 2 === 1 ? 'bg-gray-50/50 dark:bg-gray-800/30' : '',
      onRowClick && 'cursor-pointer',
    ].filter(Boolean).join(' ');
    
    if (typeof rowClassName === 'function') {
      return `${baseClasses} ${rowClassName(row, index)}`;
    }
    
    return `${baseClasses} ${rowClassName}`;
  }, [hoverable, striped, onRowClick, rowClassName]);
  
  // Render loading state
  if (loading) {
    return loadingComponent || (
      <div className={`flex items-center justify-center p-8 text-gray-500 ${className}`}>
        Loading...
      </div>
    );
  }
  
  // Render empty state
  if (sortedData.length === 0) {
    return (
      <div className={`flex items-center justify-center p-8 text-gray-500 ${className}`}>
        {emptyText}
      </div>
    );
  }
  
  return (
    <div 
      className={`relative overflow-hidden ${bordered ? 'border border-gray-200 dark:border-gray-700 rounded-lg' : ''} ${className}`}
      style={{ height }}
    >
      <div className="overflow-x-auto">
        <table 
          className={`w-full text-sm text-left text-gray-700 dark:text-gray-300 ${tableClassName}`}
        >
          <thead className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300 ${headerClassName}`}>
            <tr>
              {columns.map((column) => {
                const isSorted = sortConfig?.key === column.key;
                const sortDirection = isSorted ? sortConfig.direction : null;
                
                return (
                  <th 
                    key={column.key}
                    scope="col"
                    className={`px-4 py-3 ${column.sticky ? 'sticky left-0 bg-inherit' : ''} ${column.headerClassName || ''}`}
                    style={{
                      width: column.width,
                      textAlign: column.align || 'left',
                    }}
                  >
                    <div 
                      className={`flex items-center ${column.sortable ? 'cursor-pointer select-none' : ''}`}
                      onClick={() => handleSort(column.key, column.sortable, column.sortFn)}
                    >
                      {column.header}
                      {column.sortable && (
                        <span className="ml-1">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ChevronUpIcon className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDownIcon className="w-3.5 h-3.5" />
                            )
                          ) : (
                            <ArrowsUpDownIcon className="w-3.5 h-3.5 opacity-30" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <motion.tr
                key={getRowKey(row, rowIndex)}
                className={getRowClassName(row, rowIndex)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: rowIndex * 0.02 }}
                onClick={() => onRowClick?.(row, rowIndex)}
              >
                {columns.map((column) => (
                  <td 
                    key={`${getRowKey(row, rowIndex)}-${column.key}`}
                    className={`px-4 py-3 ${column.sticky ? 'sticky left-0 bg-inherit' : ''} ${column.cellClassName || ''}`}
                    style={{
                      textAlign: column.align || 'left',
                    }}
                  >
                    {column.render 
                      ? column.render(row[column.key], row, rowIndex)
                      : String(row[column.key] ?? '')
                    }
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

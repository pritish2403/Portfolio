import { format, parseISO, formatDistanceToNow, differenceInDays, isBefore, addDays } from 'date-fns';

// Common date formats
export const DATE_FORMATS = {
  // Date formats
  DATE_SHORT: 'MM/dd/yyyy',
  DATE_MEDIUM: 'MMM d, yyyy',
  DATE_LONG: 'MMMM d, yyyy',
  DATE_FULL: 'EEEE, MMMM d, yyyy',
  
  // Time formats
  TIME_12: 'h:mm a',
  TIME_24: 'HH:mm',
  
  // Date & Time formats
  DATETIME_SHORT: 'MM/dd/yyyy h:mm a',
  DATETIME_MEDIUM: 'MMM d, yyyy h:mm a',
  DATETIME_LONG: 'EEEE, MMMM d, yyyy h:mm a',
  
  // ISO formats
  ISO_DATE: 'yyyy-MM-dd',
  ISO_DATETIME: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  
  // File system safe
  FILESYSTEM: 'yyyy-MM-dd_HH-mm-ss',
} as const;

// Format a date string or Date object
export const formatDate = (
  date: string | Date | null | undefined,
  dateFormat: string = DATE_FORMATS.DATE_MEDIUM,
  options?: {
    defaultText?: string;
    timeZone?: string;
  }
): string => {
  if (!date) return options?.defaultText || '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, dateFormat, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return options?.defaultText || 'Invalid date';
  }
};

// Format a date as a relative time (e.g., "2 days ago")
export const formatRelativeTime = (
  date: string | Date,
  options?: {
    addSuffix?: boolean;
    includeSeconds?: boolean;
  }
): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(dateObj, {
      addSuffix: options?.addSuffix ?? true,
      includeSeconds: options?.includeSeconds ?? false,
    });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return '';
  }
};

// Calculate the difference in days between two dates
export const daysBetween = (
  startDate: string | Date,
  endDate: string | Date = new Date()
): number => {
  try {
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
    return differenceInDays(end, start);
  } catch (error) {
    console.error('Error calculating days between dates:', error);
    return 0;
  }
};

// Check if a date is in the past
export const isPastDate = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isBefore(dateObj, new Date());
  } catch (error) {
    console.error('Error checking if date is in past:', error);
    return false;
  }
};

// Add days to a date
export const addDaysToDate = (
  date: string | Date,
  days: number
): Date => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return addDays(dateObj, days);
  } catch (error) {
    console.error('Error adding days to date:', error);
    return new Date();
  }
};

// Format a date range
export const formatDateRange = (
  startDate: string | Date,
  endDate: string | Date | null = null,
  options?: {
    format?: string;
    separator?: string;
    currentText?: string;
  }
): string => {
  const {
    format: dateFormat = DATE_FORMATS.DATE_MEDIUM,
    separator = ' - ',
    currentText = 'Present',
  } = options || {};
  
  const start = formatDate(startDate, dateFormat);
  
  if (!endDate) {
    return `${start} ${separator} ${currentText}`;
  }
  
  const end = formatDate(endDate, dateFormat);
  
  // If both dates are the same, just return one
  if (start === end) {
    return start;
  }
  
  return `${start} ${separator} ${end}`;
};

// Get the current year
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

// Get the start and end of a month
export const getMonthRange = (date: Date = new Date()): { start: Date; end: Date } => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  return {
    start: new Date(year, month, 1),
    end: new Date(year, month + 1, 0, 23, 59, 59, 999),
  };
};

// Format a duration in milliseconds to a human-readable format
export const formatDuration = (ms: number): string => {
  if (ms < 0) ms = -ms;
  
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  };
  
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
    .join(', ');
};

// Get the age from a birth date
export const getAge = (birthDate: string | Date): number => {
  try {
    const birthDateObj = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    
    return age;
  } catch (error) {
    console.error('Error calculating age:', error);
    return 0;
  }
};

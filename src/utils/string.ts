/**
 * String utility functions for common string operations
 */

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Converts a string to title case
 */
export const toTitleCase = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Converts a string to kebab-case
 */
export const toKebabCase = (str: string): string => {
  if (!str) return '';
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map(x => x.toLowerCase())
    .join('-') || '';
};

/**
 * Converts a string to camelCase
 */
export const toCamelCase = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (_, c) => c.toLowerCase());
};

/**
 * Converts a string to PascalCase
 */
export const toPascalCase = (str: string): string => {
  if (!str) return '';
  return capitalize(toCamelCase(str));
};

/**
 * Converts a string to snake_case
 */
export const toSnakeCase = (str: string): string => {
  if (!str) return '';
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map(x => x.toLowerCase())
    .join('_') || '';
};

/**
 * Truncates a string to a specified length and adds an ellipsis if truncated
 */
export const truncate = (str: string, maxLength: number, ellipsis: string = '...'): string => {
  if (!str || str.length <= maxLength) return str || '';
  return `${str.substring(0, maxLength)}${ellipsis}`;
};

/**
 * Removes all HTML tags from a string
 */
export const stripHtml = (html: string): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
};

/**
 * Converts a string to a URL-friendly slug
 */
export const slugify = (str: string): string => {
  if (!str) return '';
  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

/**
 * Converts a string to a URL-friendly parameter
 */
export const toUrlParam = (str: string): string => {
  return encodeURIComponent(slugify(str));
};

/**
 * Escapes a string for use in a regular expression
 */
export const escapeRegExp = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Replaces all occurrences of a substring in a string
 */
export const replaceAll = (str: string, search: string, replacement: string): string => {
  if (!str) return '';
  return str.replace(new RegExp(escapeRegExp(search), 'g'), replacement);
};

/**
 * Counts the number of words in a string
 */
export const countWords = (str: string): number => {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(word => word.length > 0).length;
};

/**
 * Counts the number of characters in a string (excluding spaces)
 */
export const countChars = (str: string, includeSpaces: boolean = false): number => {
  if (!str) return 0;
  return includeSpaces ? str.length : str.replace(/\s/g, '').length;
};

/**
 * Generates a random string of specified length
 */
export const generateRandomString = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Checks if a string is a valid email address
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Checks if a string is a valid URL
 */
export const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Formats a number with commas as thousands separators
 */
export const formatNumber = (num: number | string): string => {
  if (typeof num === 'string') {
    num = parseFloat(num);
  }
  return isNaN(num) ? '0' : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Converts a string to a boolean
 */
export const toBoolean = (value: any): boolean => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  return Boolean(value);
};

/**
 * Removes diacritics (accents) from a string
 */
export const removeDiacritics = (str: string): string => {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Generates initials from a name
 */
export const getInitials = (name: string, maxLength: number = 2): string => {
  if (!name) return '';
  
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return '';
  
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  return words
    .slice(0, maxLength)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

/**
 * Masks part of a string (e.g., for hiding sensitive data)
 */
export const maskString = (
  str: string, 
  options: {
    start?: number;
    end?: number;
    maskChar?: string;
    showLast?: number;
  } = {}
): string => {
  if (!str) return '';
  
  const {
    start = 0,
    end = str.length - 1,
    maskChar = '*',
    showLast = 0,
  } = options;
  
  const visibleEnd = showLast > 0 ? str.length - showLast : end;
  
  return str
    .split('')
    .map((char, index) => {
      if (index >= start && index <= visibleEnd) {
        return maskChar;
      }
      return char;
    })
    .join('');
};

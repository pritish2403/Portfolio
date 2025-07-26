import { z } from 'zod';
import { toast } from 'react-hot-toast';

// Common form validation schemas
export const validationSchemas = {
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  phone: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/,
      'Please enter a valid phone number'
    )
    .optional(),
  url: z
    .string()
    .url('Please enter a valid URL')
    .startsWith('https://', { message: 'URL must be secure (https://)' })
    .or(z.literal('')),
  requiredString: z.string().min(1, 'This field is required'),
  optionalString: z.string().optional(),
  checkbox: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
};

// Common form error handling
export const handleFormError = (error: unknown, defaultMessage = 'An error occurred') => {
  if (error instanceof z.ZodError) {
    // Handle Zod validation errors
    const errorMessages = error.errors.map((err) => err.message).join('\n');
    toast.error(errorMessages || 'Validation failed');
    return errorMessages;
  } else if (error instanceof Error) {
    // Handle standard errors
    toast.error(error.message || defaultMessage);
    return error.message;
  } else if (typeof error === 'string') {
    // Handle string errors
    toast.error(error || defaultMessage);
    return error;
  } else {
    // Handle unknown errors
    toast.error(defaultMessage);
    return defaultMessage;
  }
};

// Form field props type
export type FormFieldProps<T> = {
  name: keyof T;
  label: string;
  placeholder?: string;
  description?: string;
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'textarea';
  required?: boolean;
  disabled?: boolean;
  options?: { value: string; label: string }[];
  multiple?: boolean;
};

// Format form data for submission
export const formatFormData = <T extends Record<string, any>>(
  formData: T,
  fields: (keyof T)[]
): Partial<T> => {
  const result: Partial<T> = {};
  
  fields.forEach((field) => {
    if (field in formData) {
      const value = formData[field];
      
      // Skip undefined values
      if (value === undefined) return;
      
      // Convert empty strings to null for optional fields
      if (value === '') {
        result[field] = null as any;
      } else {
        result[field] = value;
      }
    }
  });
  
  return result;
};

// Create form initial values with types
export const createFormInitialValues = <T extends Record<string, any>>(
  defaultValues: T,
  overrides: Partial<T> = {}
): T => {
  return {
    ...defaultValues,
    ...overrides,
  };
};

// Handle form submission with loading state
export const handleSubmit = async <T>(
  submitFn: () => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: unknown) => void;
    successMessage?: string;
    errorMessage?: string;
  }
): Promise<{ data: T | null; error: unknown }> => {
  const {
    onSuccess,
    onError,
    successMessage = 'Operation completed successfully',
    errorMessage = 'An error occurred',
  } = options || {};

  try {
    const result = await submitFn();
    
    if (successMessage) {
      toast.success(successMessage);
    }
    
    if (onSuccess) {
      onSuccess(result);
    }
    
    return { data: result, error: null };
  } catch (error) {
    const errorMsg = handleFormError(error, errorMessage);
    
    if (onError) {
      onError(error);
    }
    
    return { data: null, error: errorMsg };
  }
};

// Format form errors from API response
export const formatApiErrors = (errors: Record<string, string[]>): Record<string, string> => {
  const result: Record<string, string> = {};
  
  Object.entries(errors).forEach(([field, messages]) => {
    if (Array.isArray(messages) && messages.length > 0) {
      result[field] = messages.join(' ');
    } else if (typeof messages === 'string') {
      result[field] = messages;
    }
  });
  
  return result;
};

// Debounce function for form inputs
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<F>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

type BadgeVariant = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
type BadgeRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: BadgeRounded;
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  animateOnHover?: boolean;
  animateOnTap?: boolean;
  pulse?: boolean;
  outline?: boolean;
  removeButton?: boolean;
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  removeButtonAriaLabel?: string;
};

const variantStyles: Record<BadgeVariant, { bg: string; text: string; border: string; hover?: string }> = {
  primary: {
    bg: 'bg-olive/10 dark:bg-mustard/10',
    text: 'text-olive dark:text-mustard',
    border: 'border border-olive/20 dark:border-mustard/20',
    hover: 'hover:bg-olive/20 dark:hover:bg-mustard/20',
  },
  secondary: {
    bg: 'bg-gray-100 dark:bg-gray-700',
    text: 'text-gray-800 dark:text-gray-200',
    border: 'border border-gray-200 dark:border-gray-600',
    hover: 'hover:bg-gray-200 dark:hover:bg-gray-600',
  },
  success: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-300',
    border: 'border border-green-200 dark:border-green-800/50',
    hover: 'hover:bg-green-200 dark:hover:bg-green-800/50',
  },
  danger: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-800 dark:text-red-300',
    border: 'border border-red-200 dark:border-red-800/50',
    hover: 'hover:bg-red-200 dark:hover:bg-red-800/50',
  },
  warning: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-800 dark:text-yellow-300',
    border: 'border border-yellow-200 dark:border-yellow-800/50',
    hover: 'hover:bg-yellow-200 dark:hover:bg-yellow-800/50',
  },
  info: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-800 dark:text-blue-300',
    border: 'border border-blue-200 dark:border-blue-800/50',
    hover: 'hover:bg-blue-200 dark:hover:bg-blue-800/50',
  },
  light: {
    bg: 'bg-gray-50 dark:bg-gray-800',
    text: 'text-gray-800 dark:text-gray-200',
    border: 'border border-gray-200 dark:border-gray-700',
    hover: 'hover:bg-gray-100 dark:hover:bg-gray-700',
  },
  dark: {
    bg: 'bg-gray-800 dark:bg-gray-700',
    text: 'text-white dark:text-gray-100',
    border: 'border border-gray-700 dark:border-gray-600',
    hover: 'hover:bg-gray-700 dark:hover:bg-gray-600',
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: 'text-xs px-1.5 py-0.5',
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-sm px-3 py-1.5',
};

const roundedStyles: Record<BadgeRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

const iconSizeStyles: Record<BadgeSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-4 h-4',
};

const removeButtonStyles: Record<BadgeSize, string> = {
  xs: 'ml-0.5 -mr-1 h-3.5 w-3.5',
  sm: 'ml-0.5 -mr-1 h-4 w-4',
  md: 'ml-0.5 -mr-1.5 h-4 w-4',
  lg: 'ml-1 -mr-2 h-4 w-4',
};

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  className = '',
  icon,
  iconPosition = 'left',
  onClick,
  as: Component = 'span',
  animateOnHover = false,
  animateOnTap = false,
  pulse = false,
  outline = false,
  removeButton = false,
  onRemove,
  removeButtonAriaLabel = 'Remove',
  ...props
}: BadgeProps) => {
  const variantStyle = variantStyles[variant];
  const isClickable = Boolean(onClick || onRemove);
  const showRemoveButton = removeButton && onRemove;
  
  const baseClasses = [
    'inline-flex items-center font-medium transition-colors duration-200',
    sizeStyles[size],
    roundedStyles[rounded],
    outline 
      ? `bg-transparent ${variantStyle.text} ${variantStyle.border}`
      : `${variantStyle.bg} ${variantStyle.text} ${variantStyle.border}`,
    isClickable && 'cursor-pointer',
    animateOnHover && variantStyle.hover,
    pulse && 'animate-pulse',
    className,
  ].filter(Boolean).join(' ');

  const iconClasses = [
    iconSizeStyles[size],
    'flex-shrink-0',
    iconPosition === 'left' ? 'mr-1' : 'ml-1',
  ].join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={iconClasses} aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={iconClasses} aria-hidden="true">
          {icon}
        </span>
      )}
      {showRemoveButton && (
        <button
          type="button"
          onClick={onRemove}
          className={`inline-flex items-center justify-center rounded-full ${variantStyle.text} hover:bg-opacity-30 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-current ${removeButtonStyles[size]}`}
          aria-label={removeButtonAriaLabel}
        >
          <span className="sr-only">{removeButtonAriaLabel}</span>
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      )}
    </>
  );

  const motionProps = {
    whileHover: animateOnHover ? { scale: 1.05 } : undefined,
    whileTap: animateOnTap ? { scale: 0.95 } : undefined,
  };

  if (Component === 'button' || onClick) {
    return (
      <motion.button
        type={Component === 'button' ? 'button' : undefined}
        className={baseClasses}
        onClick={onClick}
        {...motionProps}
        {...props}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.span
      className={baseClasses}
      {...motionProps}
      {...props}
    >
      {content}
    </motion.span>
  );
};

export default Badge;

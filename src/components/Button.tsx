import { motion, Variants } from 'framer-motion';
import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  rounded?: 'full' | 'lg' | 'md' | 'none';
};

type ButtonProps = ButtonBaseProps &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' })
    | (AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string })
  );

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-olive hover:bg-olive/90 dark:bg-mustard dark:hover:bg-mustard/90 text-white focus:ring-olive dark:focus:ring-mustard',
  secondary:
    'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white focus:ring-gray-400 dark:focus:ring-gray-500',
  outline:
    'border border-olive dark:border-mustard text-olive dark:text-mustard hover:bg-olive/10 dark:hover:bg-mustard/10 focus:ring-olive/50 dark:focus:ring-mustard/50',
  ghost:
    'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-gray-300 dark:focus:ring-gray-600',
  link: 'text-olive dark:text-mustard hover:underline focus:ring-0 p-0 h-auto',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

const buttonRounded: Record<NonNullable<ButtonBaseProps['rounded']>, string> = {
  full: 'rounded-full',
  lg: 'rounded-xl',
  md: 'rounded-lg',
  none: 'rounded-none',
};

const buttonBaseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed';

const buttonHoverScale: Variants = {
  hover: {
    scale: 1.05,
    transition: { type: 'spring', stiffness: 400, damping: 10 },
  },
  tap: {
    scale: 0.98,
  },
};

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  isLoading = false,
  rounded = 'lg',
  ...props
}: ButtonProps) => {
  const classes = `
    ${buttonBaseClasses}
    ${buttonVariants[variant]}
    ${buttonSizes[size]}
    ${buttonRounded[rounded]}
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${variant === 'link' ? '' : 'shadow-sm hover:shadow-md'}
    ${className}
  `;

  const content = (
    <>
      {isLoading && (
        <span className={`inline-flex items-center ${iconPosition === 'right' ? 'order-2' : 'mr-2'}`}>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
        </span>
      )}
      {!isLoading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  if (props.as === 'a') {
    const { as, href, ...rest } = props;
    return (
      <Link href={href} passHref>
        <motion.a
          className={classes}
          whileHover={variant === 'link' ? {} : 'hover'}
          whileTap={variant === 'link' ? {} : 'tap'}
          variants={buttonHoverScale}
          {...rest}
        >
          {content}
        </motion.a>
      </Link>
    );
  }

  const { as, ...rest } = props;
  return (
    <motion.button
      className={classes}
      whileHover={variant === 'link' ? {} : 'hover'}
      whileTap={variant === 'link' ? {} : 'tap'}
      variants={buttonHoverScale}
      {...rest}
    >
      {content}
    </motion.button>
  );
};

export default Button;

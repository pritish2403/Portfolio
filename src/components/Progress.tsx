import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

type ProgressVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
type ProgressSize = 'sm' | 'md' | 'lg';
type ProgressType = 'line' | 'circle';

const sizeClasses = {
  sm: {
    line: 'h-1.5',
    circle: 'w-16 h-16',
    text: 'text-xs',
    strokeWidth: 6,
  },
  md: {
    line: 'h-2.5',
    circle: 'w-24 h-24',
    text: 'text-sm',
    strokeWidth: 8,
  },
  lg: {
    line: 'h-3.5',
    circle: 'w-32 h-32',
    text: 'text-base',
    strokeWidth: 10,
  },
};

const variantClasses: Record<ProgressVariant, string> = {
  primary: 'bg-olive dark:bg-mustard',
  secondary: 'bg-gray-400',
  success: 'bg-green-500',
  danger: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
  light: 'bg-gray-200',
  dark: 'bg-gray-800',
};

const variantBgClasses: Record<ProgressVariant, string> = {
  primary: 'bg-olive/20 dark:bg-mustard/20',
  secondary: 'bg-gray-200',
  success: 'bg-green-100',
  danger: 'bg-red-100',
  warning: 'bg-yellow-100',
  info: 'bg-blue-100',
  light: 'bg-gray-100',
  dark: 'bg-gray-700',
};

const strokeColors: Record<ProgressVariant, string> = {
  primary: '#606C38', // olive
  secondary: '#6B7280', // gray-500
  success: '#10B981', // green-500
  danger: '#EF4444', // red-500
  warning: '#F59E0B', // yellow-500
  info: '#3B82F6', // blue-500
  light: '#E5E7EB', // gray-200
  dark: '#1F2937', // gray-800
};

interface ProgressProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  type?: ProgressType;
  showLabel?: boolean;
  labelPosition?: 'inside' | 'outside';
  labelFormatter?: (value: number, percentage: number) => string;
  className?: string;
  trackClassName?: string;
  indicatorClassName?: string;
  labelClassName?: string;
  animateOnView?: boolean;
  withAnimation?: boolean;
}

const Progress = ({
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  type = 'line',
  showLabel = true,
  labelPosition = 'outside',
  labelFormatter,
  className = '',
  trackClassName = '',
  indicatorClassName = '',
  labelClassName = '',
  animateOnView = true,
  withAnimation = true,
}: ProgressProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  // Calculate percentage
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  const normalizedValue = Math.min(Math.max(0, value), max);
  
  // Animation variants
  const lineVariants = {
    initial: { width: '0%' },
    animate: { 
      width: `${percentage}%`,
      transition: { 
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };
  
  const circleVariants = {
    initial: { strokeDashoffset: 440 },
    animate: (custom: number) => ({
      strokeDashoffset: 440 - (440 * custom) / 100,
      transition: {
        duration: 1.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };
  
  // Animate when in view
  useEffect(() => {
    if ((animateOnView && isInView) || !animateOnView) {
      controls.start('animate');
    }
  }, [controls, isInView, animateOnView]);
  
  // Format label
  const formatLabel = () => {
    if (labelFormatter) {
      return labelFormatter(normalizedValue, percentage);
    }
    return `${Math.round(percentage)}%`;
  };
  
  // Line progress
  if (type === 'line') {
    return (
      <div className={`w-full ${className}`} ref={ref}>
        <div className="flex items-center justify-between mb-1">
          {showLabel && labelPosition === 'outside' && (
            <span className={`text-sm font-medium ${variantClasses[variant].replace('bg-', 'text-')} ${labelClassName}`}>
              {formatLabel()}
            </span>
          )}
        </div>
        <div 
          className={`w-full rounded-full overflow-hidden ${variantBgClasses[variant]} ${trackClassName}`}
          style={{ height: sizeClasses[size].line }}
        >
          <motion.div
            className={`h-full rounded-full ${variantClasses[variant]} ${indicatorClassName}`}
            initial={withAnimation ? 'initial' : false}
            animate={withAnimation ? controls : false}
            variants={withAnimation ? lineVariants : undefined}
            style={withAnimation ? {} : { width: `${percentage}%` }}
            aria-valuenow={normalizedValue}
            aria-valuemin={0}
            aria-valuemax={max}
            role="progressbar"
          >
            {showLabel && labelPosition === 'inside' && (
              <span className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-white ${labelClassName}`}>
                {formatLabel()}
              </span>
            )}
          </motion.div>
        </div>
      </div>
    );
  }
  
  // Circle progress
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`} ref={ref}>
      <svg 
        className={`transform -rotate-90 ${sizeClasses[size].circle}`} 
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={sizeClasses[size].strokeWidth}
          className="text-gray-200 dark:text-gray-700"
          stroke="currentColor"
          fill="transparent"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={sizeClasses[size].strokeWidth}
          className={`${variantClasses[variant].replace('bg-', 'text-')} ${indicatorClassName}`}
          stroke="currentColor"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={withAnimation ? 'initial' : false}
          animate={withAnimation ? controls : false}
          custom={percentage}
          variants={withAnimation ? circleVariants : undefined}
          style={
            withAnimation 
              ? undefined 
              : { 
                  strokeDasharray: circumference, 
                  strokeDashoffset: strokeDashoffset 
                }
          }
        />
      </svg>
      
      {showLabel && (
        <div className={`absolute inset-0 flex items-center justify-center ${sizeClasses[size].text} font-semibold ${variantClasses[variant].replace('bg-', 'text-')} ${labelClassName}`}>
          {formatLabel()}
        </div>
      )}
    </div>
  );
};

export default Progress;
